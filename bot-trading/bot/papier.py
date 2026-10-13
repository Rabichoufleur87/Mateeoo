"""Mode papier : le bot tourne au jour le jour avec de l'argent fictif.

L'état du portefeuille est gardé dans un fichier JSON. Lance la commande une
fois par jour (à la main ou avec une tâche planifiée) : le bot lit le dernier
cours, prend sa décision et note tout dans le journal.
"""

import json
from datetime import date
from pathlib import Path

from .simulateur import Frais, Portefeuille

DOSSIER = Path(__file__).resolve().parent.parent / "portefeuilles"


def chemin_etat(nom):
    return DOSSIER / f"{nom}.json"


def charger_etat(nom):
    chemin = chemin_etat(nom)
    if not chemin.exists():
        return None
    return json.loads(chemin.read_text(encoding="utf-8"))


def enregistrer_etat(nom, etat):
    DOSSIER.mkdir(parents=True, exist_ok=True)
    chemin_etat(nom).write_text(json.dumps(etat, ensure_ascii=False, indent=2), encoding="utf-8")


def nouvel_etat(symbole, strategie, capital, apport):
    return {
        "symbole": symbole,
        "strategie": strategie,
        "capital_depart": capital,
        "apport_mensuel": apport,
        "cree_le": date.today().isoformat(),
        "especes": capital,
        "parts": 0.0,
        "total_verse": capital,
        "frais_payes": 0.0,
        "dernier_jour": None,
        "historique": [],
        "journal": [],
    }


def seance(etat, serie, strategie, frais=None):
    """Joue une séance sur le dernier cours disponible. Renvoie un message pour l'utilisateur."""
    frais = frais or Frais()
    dernier = serie[-1]
    if etat["dernier_jour"] == dernier.jour.isoformat():
        return f"Séance du {dernier.jour:%d/%m/%Y} déjà jouée. Reviens au prochain jour de bourse."

    pf = Portefeuille(
        especes=etat["especes"],
        parts=etat["parts"],
        total_verse=etat["total_verse"],
        frais_payes=etat["frais_payes"],
        journal=etat["journal"],
    )
    if etat["dernier_jour"] and etat["apport_mensuel"]:
        precedent = date.fromisoformat(etat["dernier_jour"])
        mois_ecoules = (dernier.jour.year - precedent.year) * 12 + dernier.jour.month - precedent.month
        if mois_ecoules > 0:
            pf.verser(etat["apport_mensuel"] * mois_ecoules)

    prix = dernier.cloture
    if hasattr(strategie, "contexte"):
        strategie.contexte = {
            "symbole": etat["symbole"],
            "date": dernier.jour.isoformat(),
            "valeur": pf.valeur(prix),
        }
    cible = strategie.decider([c.cloture for c in serie], pf.allocation(prix))
    raison = getattr(strategie, "derniere_raison", "") or strategie.titre
    ordre = pf.viser(cible, prix, dernier.jour, frais, raison=raison) if cible is not None else None

    etat.update(
        especes=pf.especes,
        parts=pf.parts,
        total_verse=pf.total_verse,
        frais_payes=pf.frais_payes,
        dernier_jour=dernier.jour.isoformat(),
        journal=pf.journal,
    )
    etat["historique"].append(
        {"date": dernier.jour.isoformat(), "prix": prix, "valeur": round(pf.valeur(prix), 2)}
    )

    lignes = [f"Séance du {dernier.jour:%d/%m/%Y} · cours {prix:.2f}"]
    if ordre:
        lignes.append(f"Ordre : {ordre['sens']} de {ordre['montant']:.2f} € (frais {ordre['frais']:.2f} €)")
    else:
        lignes.append("Aucun ordre aujourd'hui.")
    if raison and raison != strategie.titre:
        lignes.append(f"Raison : {raison}")
    lignes.append(bilan(etat, prix))
    return "\n".join(lignes)


def bilan(etat, prix=None):
    if prix is None:
        prix = etat["historique"][-1]["prix"] if etat["historique"] else 0.0
    valeur = etat["especes"] + etat["parts"] * prix
    gain = valeur - etat["total_verse"]
    investi = etat["parts"] * prix / valeur if valeur else 0.0
    return (
        f"Portefeuille : {valeur:.2f} € pour {etat['total_verse']:.2f} € versés "
        f"({gain:+.2f} €, {gain / etat['total_verse'] * 100:+.1f} %) · investi à {investi * 100:.0f} %"
    )
