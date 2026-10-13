"""Stratégies : chacune renvoie la part du portefeuille à investir (0 = tout en espèces, 1 = tout investi).

Renvoyer None signifie « ne rien changer ». Une stratégie ne voit que les cours
passés : elle n'a jamais accès au futur.
"""


def moyenne(valeurs):
    return sum(valeurs) / len(valeurs)


def rsi(clotures, periode=14):
    """Indice de force relative : sous 30 = survendu, au-dessus de 70 = suracheté."""
    if len(clotures) <= periode:
        return None
    hausses, baisses = 0.0, 0.0
    for avant, apres in zip(clotures[-periode - 1:-1], clotures[-periode:]):
        ecart = apres - avant
        if ecart > 0:
            hausses += ecart
        else:
            baisses -= ecart
    if baisses == 0:
        return 100.0
    return 100 - 100 / (1 + hausses / baisses)


class AchatConserve:
    nom = "achat_conserve"
    titre = "Achat et conservation"
    description = "Tout investi en permanence. C'est la référence à battre."

    def decider(self, clotures, allocation_actuelle):
        return 1.0


class CroisementMoyennes:
    nom = "croisement_mm"
    titre = "Croisement de moyennes mobiles"
    description = "Investi quand la moyenne courte passe au-dessus de la longue, en espèces sinon."

    def __init__(self, courte=50, longue=200):
        if courte >= longue:
            raise ValueError("La moyenne courte doit être plus petite que la longue.")
        self.courte, self.longue = courte, longue
        self.titre = f"Moyennes mobiles {courte}/{longue}"

    def decider(self, clotures, allocation_actuelle):
        if len(clotures) < self.longue:
            return None
        return 1.0 if moyenne(clotures[-self.courte:]) > moyenne(clotures[-self.longue:]) else 0.0


class RebondRSI:
    nom = "rsi"
    titre = "Rebond RSI"
    description = "Achète quand le marché est survendu (RSI < 30), vend quand il est suracheté (RSI > 70)."

    def __init__(self, periode=14, bas=30, haut=70):
        self.periode, self.bas, self.haut = periode, bas, haut

    def decider(self, clotures, allocation_actuelle):
        valeur = rsi(clotures, self.periode)
        if valeur is None:
            return None
        if valeur < self.bas:
            return 1.0
        if valeur > self.haut:
            return 0.0
        return None


class Hasard:
    nom = "hasard"
    titre = "Pile ou face"
    description = "Décide au hasard chaque semaine. Utile pour voir ce que vaut une stratégie « sans cerveau »."

    def __init__(self, graine=42, tous_les=5):
        import random

        self.hasard, self.tous_les, self.compteur = random.Random(graine), tous_les, 0

    def decider(self, clotures, allocation_actuelle):
        self.compteur += 1
        if self.compteur % self.tous_les:
            return None
        return float(self.hasard.random() < 0.5)


CLASSIQUES = ["achat_conserve", "croisement_mm", "rsi", "hasard"]


def creer(nom, courte=50, longue=200):
    if nom == "achat_conserve":
        return AchatConserve()
    if nom == "croisement_mm":
        return CroisementMoyennes(courte, longue)
    if nom == "rsi":
        return RebondRSI()
    if nom == "hasard":
        return Hasard()
    if nom == "claude":
        from .strategie_claude import StrategieClaude

        return StrategieClaude()
    raise ValueError(f"Stratégie inconnue : {nom} (choix : {', '.join(CLASSIQUES + ['claude'])})")
