"""Chargement des cours : Yahoo Finance, fichier CSV ou données simulées."""

import csv
import json
import math
import random
import urllib.request
from dataclasses import dataclass
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

DOSSIER_CACHE = Path(__file__).resolve().parent.parent / "donnees"


@dataclass
class Cours:
    jour: date
    cloture: float


def depuis_yahoo(symbole, debut=None, fin=None):
    """Télécharge les clôtures journalières d'un actif (ex. CW8.PA, BTC-EUR) sur Yahoo Finance."""
    debut = debut or date.today() - timedelta(days=365 * 10)
    fin = fin or date.today()
    p1 = int(datetime(debut.year, debut.month, debut.day, tzinfo=timezone.utc).timestamp())
    p2 = int(datetime(fin.year, fin.month, fin.day, tzinfo=timezone.utc).timestamp()) + 86400
    url = (
        f"https://query1.finance.yahoo.com/v8/finance/chart/{symbole}"
        f"?period1={p1}&period2={p2}&interval=1d"
    )
    requete = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(requete, timeout=30) as reponse:
            contenu = json.load(reponse)
    except Exception as erreur:
        raise RuntimeError(
            f"Impossible de récupérer {symbole} sur Yahoo Finance ({erreur}). "
            "Vérifie ta connexion et le symbole, ou utilise --csv / --demo."
        ) from erreur

    resultat = (contenu.get("chart") or {}).get("result")
    if not resultat:
        raise RuntimeError(f"Symbole inconnu ou sans données : {symbole}")
    horodatages = resultat[0].get("timestamp") or []
    clotures = resultat[0]["indicators"]["quote"][0].get("close") or []

    serie = [
        Cours(datetime.fromtimestamp(t, tz=timezone.utc).date(), float(c))
        for t, c in zip(horodatages, clotures)
        if c is not None
    ]
    if not serie:
        raise RuntimeError(f"Aucun cours reçu pour {symbole}")
    sauvegarder_csv(serie, DOSSIER_CACHE / f"{symbole.replace('/', '_')}.csv")
    return serie


def depuis_csv(chemin, debut=None, fin=None):
    """Lit un CSV avec une colonne date et une colonne de prix (cloture, Close, Adj Close…)."""
    noms_date = ("date", "Date", "jour")
    noms_prix = ("cloture", "Close", "close", "Adj Close", "Prix", "prix", "SP500")
    serie = []
    with open(chemin, newline="", encoding="utf-8-sig") as fichier:
        lecteur = csv.DictReader(fichier)
        col_date = next((n for n in noms_date if n in lecteur.fieldnames), None)
        col_prix = next((n for n in noms_prix if n in lecteur.fieldnames), None)
        if not col_date or not col_prix:
            raise RuntimeError(
                f"{chemin} : colonnes attendues « date » et « cloture » "
                f"(trouvées : {', '.join(lecteur.fieldnames or [])})"
            )
        for ligne in lecteur:
            try:
                jour = date.fromisoformat(ligne[col_date][:10])
                prix = float(ligne[col_prix])
            except (ValueError, TypeError):
                continue
            if prix > 0:
                serie.append(Cours(jour, prix))
    serie.sort(key=lambda c: c.jour)
    return filtrer(serie, debut, fin)


def simulees(jours=2520, graine=7, rendement_annuel=0.07, volatilite=0.18):
    """Génère un cours fictif réaliste (marche aléatoire) pour tester sans connexion."""
    hasard = random.Random(graine)
    dt = 1 / 252
    prix, jour = 100.0, date.today() - timedelta(days=int(jours * 7 / 5))
    serie = []
    while len(serie) < jours:
        jour += timedelta(days=1)
        if jour.weekday() >= 5:
            continue
        choc = hasard.gauss(0, 1)
        prix *= math.exp((rendement_annuel - volatilite**2 / 2) * dt + volatilite * math.sqrt(dt) * choc)
        serie.append(Cours(jour, round(prix, 4)))
    return serie


def filtrer(serie, debut=None, fin=None):
    return [c for c in serie if (not debut or c.jour >= debut) and (not fin or c.jour <= fin)]


def sauvegarder_csv(serie, chemin):
    chemin.parent.mkdir(parents=True, exist_ok=True)
    with open(chemin, "w", newline="", encoding="utf-8") as fichier:
        ecrivain = csv.writer(fichier)
        ecrivain.writerow(["date", "cloture"])
        for c in serie:
            ecrivain.writerow([c.jour.isoformat(), c.cloture])
