"""Portefeuille fictif et simulation sur l'historique (backtest)."""

from dataclasses import dataclass, field


@dataclass
class Frais:
    pourcentage: float = 0.2  # % du montant de chaque ordre
    minimum: float = 1.0  # € minimum par ordre

    def calculer(self, montant):
        return max(self.minimum, abs(montant) * self.pourcentage / 100) if montant else 0.0


@dataclass
class Portefeuille:
    especes: float
    parts: float = 0.0
    total_verse: float = 0.0
    frais_payes: float = 0.0
    journal: list = field(default_factory=list)

    def valeur(self, prix):
        return self.especes + self.parts * prix

    def allocation(self, prix):
        total = self.valeur(prix)
        return self.parts * prix / total if total > 0 else 0.0

    def verser(self, montant):
        self.especes += montant
        self.total_verse += montant

    def viser(self, cible, prix, jour, frais, seuil=0.05, raison=""):
        """Achète ou vend pour atteindre la part investie visée. Renvoie l'ordre passé ou None."""
        cible = min(1.0, max(0.0, cible))
        total = self.valeur(prix)
        if total <= 0 or abs(cible - self.allocation(prix)) < seuil:
            return None

        montant = cible * total - self.parts * prix  # > 0 achat, < 0 vente
        cout = frais.calculer(montant)
        if montant > 0:
            montant = min(montant, self.especes - cout)
            if montant <= 0:
                return None
            self.especes -= montant + cout
            self.parts += montant / prix
        else:
            montant = max(montant, -self.parts * prix)
            self.parts += montant / prix
            self.especes += -montant - cout
        if self.parts < 1e-9:
            self.parts = 0.0
        self.frais_payes += cout

        ordre = {
            "date": jour.isoformat(),
            "sens": "achat" if montant > 0 else "vente",
            "montant": round(abs(montant), 2),
            "prix": round(prix, 4),
            "frais": round(cout, 2),
            "valeur_apres": round(self.valeur(prix), 2),
            "raison": raison,
        }
        self.journal.append(ordre)
        return ordre


def backtest(serie, strategie, capital=1000.0, apport_mensuel=0.0, frais=None, seuil=0.05):
    """Rejoue l'historique jour par jour.

    La décision prise sur la clôture d'un jour est exécutée à la clôture suivante,
    pour ne jamais profiter d'une information qu'on n'aurait pas eue.
    """
    frais = frais or Frais()
    pf = Portefeuille(especes=0.0)
    pf.verser(capital)
    clotures, courbe = [], []
    indice, valeur_precedente = 100.0, None
    decision_en_attente, mois_courant = None, None

    for cours in serie:
        prix = cours.cloture
        if valeur_precedente:
            indice *= pf.valeur(prix) / valeur_precedente

        mois = (cours.jour.year, cours.jour.month)
        if mois_courant and mois != mois_courant and apport_mensuel:
            pf.verser(apport_mensuel)
        mois_courant = mois

        if decision_en_attente is not None:
            pf.viser(decision_en_attente, prix, cours.jour, frais, seuil)

        clotures.append(prix)
        decision_en_attente = strategie.decider(clotures, pf.allocation(prix))
        valeur_precedente = pf.valeur(prix)
        courbe.append((cours.jour, round(valeur_precedente, 2), indice))

    return resumer(strategie, pf, courbe, serie)


def resumer(strategie, pf, courbe, serie):
    indices = [i for _, _, i in courbe]
    plus_haut, pire_baisse = indices[0], 0.0
    for i in indices:
        plus_haut = max(plus_haut, i)
        pire_baisse = min(pire_baisse, i / plus_haut - 1)

    annees = max((serie[-1].jour - serie[0].jour).days / 365.25, 1 / 365)
    valeur_finale = courbe[-1][1]
    return {
        "strategie": strategie.nom,
        "titre": strategie.titre,
        "valeur_finale": valeur_finale,
        "total_verse": round(pf.total_verse, 2),
        "gain": round(valeur_finale - pf.total_verse, 2),
        "rendement_annuel": (indices[-1] / 100) ** (1 / annees) - 1,
        "pire_baisse": pire_baisse,
        "nb_ordres": len(pf.journal),
        "frais": round(pf.frais_payes, 2),
        "courbe": [(j, v) for j, v, _ in courbe],
        "journal": pf.journal,
    }
