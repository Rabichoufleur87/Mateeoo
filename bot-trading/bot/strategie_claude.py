"""Stratégie qui demande à Claude, une fois par jour, quelle part investir.

Nécessite le paquet `anthropic` (pip install anthropic) et une clé API dans la
variable d'environnement ANTHROPIC_API_KEY. Chaque décision coûte environ 1 à 3
centimes. Réservée au mode papier : sur l'historique, Claude connaît déjà la
suite des événements, le test serait truqué.
"""

import json

from .strategies import moyenne, rsi

MODELE = "claude-opus-5-5"

CONSIGNES = """Tu gères un portefeuille FICTIF d'entraînement pour un étudiant qui apprend l'investissement.
Chaque jour, tu reçois un résumé chiffré du marché et tu choisis la part du portefeuille à investir
dans l'actif (0 = tout en espèces, 1 = tout investi). Tu raisonnes en investisseur prudent à long terme :
tu évites les allers-retours fréquents, qui coûtent des frais, et tu ne changes d'avis que pour une raison claire.
Réponds en français. La raison tient en une ou deux phrases simples."""

FORMAT = {
    "type": "json_schema",
    "schema": {
        "type": "object",
        "properties": {
            "allocation": {
                "type": "number",
                "description": "Part à investir, entre 0 et 1",
            },
            "raison": {"type": "string"},
        },
        "required": ["allocation", "raison"],
        "additionalProperties": False,
    },
}


def variation(clotures, jours):
    if len(clotures) <= jours:
        return None
    return clotures[-1] / clotures[-1 - jours] - 1


def pourcent(valeur):
    return "n/d" if valeur is None else f"{valeur * 100:+.1f} %"


class StrategieClaude:
    nom = "claude"
    titre = "Claude"
    description = "Claude lit un résumé du marché chaque jour et choisit la part à investir."

    def __init__(self):
        try:
            import anthropic
        except ImportError as erreur:
            raise RuntimeError("Installe d'abord le paquet : pip install anthropic") from erreur
        self.anthropic = anthropic
        try:
            self.client = anthropic.Anthropic()
        except anthropic.AnthropicError as erreur:
            raise RuntimeError(
                "Aucune clé API trouvée. Crée une clé sur console.anthropic.com "
                "puis enregistre-la dans la variable d'environnement ANTHROPIC_API_KEY."
            ) from erreur
        self.contexte = {}
        self.derniere_raison = ""

    def resume(self, clotures, allocation_actuelle):
        derniere_annee = clotures[-252:]
        mm50 = moyenne(clotures[-50:]) if len(clotures) >= 50 else None
        mm200 = moyenne(clotures[-200:]) if len(clotures) >= 200 else None
        valeur_rsi = rsi(clotures)
        lignes = [
            f"Actif : {self.contexte.get('symbole', 'inconnu')}",
            f"Date : {self.contexte.get('date', 'inconnue')}",
            f"Dernier cours : {clotures[-1]:.2f}",
            f"Variation 1 semaine : {pourcent(variation(clotures, 5))}",
            f"Variation 1 mois : {pourcent(variation(clotures, 21))}",
            f"Variation 3 mois : {pourcent(variation(clotures, 63))}",
            f"Variation 1 an : {pourcent(variation(clotures, 252))}",
            f"Écart au plus haut sur 1 an : {pourcent(clotures[-1] / max(derniere_annee) - 1)}",
            f"Moyenne mobile 50 jours : {mm50:.2f}" if mm50 else "Moyenne mobile 50 jours : n/d",
            f"Moyenne mobile 200 jours : {mm200:.2f}" if mm200 else "Moyenne mobile 200 jours : n/d",
            f"RSI 14 jours : {valeur_rsi:.0f}" if valeur_rsi is not None else "RSI 14 jours : n/d",
            f"Part actuellement investie : {allocation_actuelle * 100:.0f} %",
            f"Valeur du portefeuille : {self.contexte.get('valeur', 0):.2f} €",
        ]
        return "\n".join(lignes)

    def decider(self, clotures, allocation_actuelle):
        resume = self.resume(clotures, allocation_actuelle)
        try:
            reponse = self.client.beta.messages.create(
                model=MODELE,
                max_tokens=4000,
                system=CONSIGNES,
                messages=[{"role": "user", "content": resume}],
                output_config={"effort": "medium", "format": FORMAT},
                betas=["server-side-fallback-2026-07-01"],
                fallbacks="default",
            )
        except (self.anthropic.AuthenticationError, TypeError):
            raise RuntimeError(
                "Clé API absente ou refusée. Crée une clé sur console.anthropic.com "
                "puis enregistre-la dans la variable d'environnement ANTHROPIC_API_KEY."
            )
        except self.anthropic.RateLimitError:
            self.derniere_raison = "Limite d'appels atteinte, aucune décision aujourd'hui."
            return None
        except self.anthropic.APIConnectionError:
            self.derniere_raison = "Pas de connexion à l'API, aucune décision aujourd'hui."
            return None

        if reponse.stop_reason == "refusal":
            self.derniere_raison = "Claude n'a pas répondu, position conservée."
            return None
        texte = next((b.text for b in reponse.content if b.type == "text"), "")
        try:
            decision = json.loads(texte)
        except json.JSONDecodeError:
            self.derniere_raison = "Réponse illisible, position conservée."
            return None

        self.derniere_raison = decision["raison"]
        return min(1.0, max(0.0, float(decision["allocation"])))
