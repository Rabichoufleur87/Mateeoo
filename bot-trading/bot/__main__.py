"""Point d'entrée : python -m bot <commande>. Lance « python -m bot --help » pour l'aide."""

import argparse
import sys
from datetime import date
from pathlib import Path

from . import donnees, papier, rapport, strategies
from .simulateur import Frais, backtest

RACINE = Path(__file__).resolve().parent.parent


def jour(texte):
    return date.fromisoformat(texte)


def charger_serie(args):
    if args.demo:
        return donnees.filtrer(donnees.simulees(), args.debut, args.fin), "Données simulées"
    if args.csv:
        return donnees.depuis_csv(args.csv, args.debut, args.fin), Path(args.csv).name
    return donnees.depuis_yahoo(args.symbole, args.debut, args.fin), args.symbole


def options_communes(p):
    source = p.add_argument_group("source des cours")
    source.add_argument("--symbole", default="CW8.PA", help="symbole Yahoo Finance (défaut : CW8.PA, ETF MSCI World)")
    source.add_argument("--csv", help="fichier CSV avec les colonnes date et cloture")
    source.add_argument("--demo", action="store_true", help="cours simulés, sans connexion")
    source.add_argument("--debut", type=jour, help="date de début AAAA-MM-JJ")
    source.add_argument("--fin", type=jour, help="date de fin AAAA-MM-JJ")
    p.add_argument("--capital", type=float, default=1000, help="capital fictif de départ en € (défaut : 1000)")
    p.add_argument("--apport", type=float, default=0, help="versement fictif chaque mois en € (défaut : 0)")
    p.add_argument("--frais", type=float, default=0.2, help="frais par ordre en %% (défaut : 0.2, minimum 1 €)")
    p.add_argument("--courte", type=int, default=50, help="moyenne mobile courte (défaut : 50)")
    p.add_argument("--longue", type=int, default=200, help="moyenne mobile longue (défaut : 200)")


def cmd_backtest(args):
    noms = args.strategies or strategies.CLASSIQUES
    if "claude" in noms:
        sys.exit(
            "La stratégie claude n'est pas testable sur l'historique : Claude connaît déjà ce qui s'est passé, "
            "le résultat serait truqué. Utilise-la en mode papier (python -m bot papier --strategie claude)."
        )
    serie, source = charger_serie(args)
    if len(serie) < 30:
        sys.exit("Pas assez de cours pour simuler (minimum 30).")

    frais = Frais(pourcentage=args.frais)
    resultats = [
        backtest(serie, strategies.creer(n, args.courte, args.longue), args.capital, args.apport, frais)
        for n in noms
    ]

    print(f"\n{source} · du {serie[0].jour:%d/%m/%Y} au {serie[-1].jour:%d/%m/%Y} · {len(serie)} cours")
    print(f"Capital {args.capital:.0f} € + {args.apport:.0f} €/mois · frais {args.frais} %\n")
    print(f"{'Stratégie':<30}{'Valeur finale':>15}{'Gain':>13}{'Rdt/an':>9}{'Pire baisse':>13}{'Ordres':>8}")
    for r in sorted(resultats, key=lambda r: -r["valeur_finale"]):
        print(
            f"{r['titre']:<30}{r['valeur_finale']:>13.2f} €{r['gain']:>11.2f} €"
            f"{r['rendement_annuel'] * 100:>8.1f}%{r['pire_baisse'] * 100:>12.1f}%{r['nb_ordres']:>8}"
        )

    chemin = Path(args.rapport)
    rapport.generer(
        resultats,
        f"Simulation · {source}",
        f"Du {serie[0].jour:%d/%m/%Y} au {serie[-1].jour:%d/%m/%Y} · {args.capital:.0f} € de départ"
        + (f" + {args.apport:.0f} € par mois" if args.apport else "")
        + f" · frais {args.frais} % par ordre",
        chemin,
    )
    print(f"\nRapport détaillé : {chemin.resolve()}")


def cmd_papier(args):
    strategie = strategies.creer(args.strategie, args.courte, args.longue)
    serie, source = charger_serie(args)
    origine = "demo" if args.demo else Path(args.csv).stem if args.csv else args.symbole
    nom = args.nom or f"{args.strategie}_{origine}".replace(".", "_").lower()
    etat = None if args.reinitialiser else papier.charger_etat(nom)
    if etat is None:
        etat = papier.nouvel_etat(source, args.strategie, args.capital, args.apport)
        print(f"Nouveau portefeuille fictif « {nom} » : {args.capital:.0f} € de départ.")
    elif etat["strategie"] != args.strategie:
        sys.exit(
            f"Le portefeuille « {nom} » suit la stratégie {etat['strategie']}. "
            "Choisis un autre --nom ou ajoute --reinitialiser."
        )

    message = papier.seance(etat, serie, strategie, Frais(args.frais))
    papier.enregistrer_etat(nom, etat)
    print(message)


def cmd_etat(args):
    fichiers = sorted(papier.DOSSIER.glob("*.json")) if papier.DOSSIER.exists() else []
    if not fichiers:
        print("Aucun portefeuille fictif pour l'instant. Lance : python -m bot papier")
        return
    for f in fichiers:
        etat = papier.charger_etat(f.stem)
        print(f"\n{f.stem} · {etat['strategie']} sur {etat['symbole']} · depuis le {etat['cree_le']}")
        print("  " + papier.bilan(etat))
        for ordre in etat["journal"][-5:]:
            print(f"  {ordre['date']} {ordre['sens']:<6} {ordre['montant']:>9.2f} €  {ordre['raison'][:70]}")


def cmd_strategies(args):
    for nom in strategies.CLASSIQUES + ["claude"]:
        if nom == "claude":
            from .strategie_claude import StrategieClaude as s
        else:
            s = strategies.creer(nom)
        print(f"{nom:<16}{s.description}")


def main():
    parseur = argparse.ArgumentParser(prog="python -m bot", description="Bot de trading fictif pour apprendre.")
    sous = parseur.add_subparsers(dest="commande", required=True)

    p = sous.add_parser("backtest", help="tester les stratégies sur l'historique")
    options_communes(p)
    p.add_argument("--strategies", nargs="+", help=f"stratégies à comparer (défaut : {' '.join(strategies.CLASSIQUES)})")
    p.add_argument("--rapport", default=str(RACINE / "rapport.html"), help="fichier du rapport HTML")
    p.set_defaults(fonction=cmd_backtest)

    p = sous.add_parser("papier", help="jouer une séance avec le portefeuille fictif")
    options_communes(p)
    p.add_argument("--strategie", default="croisement_mm", help="stratégie suivie (défaut : croisement_mm)")
    p.add_argument("--nom", help="nom du portefeuille (un fichier par portefeuille)")
    p.add_argument("--reinitialiser", action="store_true", help="repartir de zéro")
    p.set_defaults(fonction=cmd_papier)

    p = sous.add_parser("etat", help="afficher les portefeuilles fictifs")
    p.set_defaults(fonction=cmd_etat)

    p = sous.add_parser("strategies", help="lister les stratégies disponibles")
    p.set_defaults(fonction=cmd_strategies)

    args = parseur.parse_args()
    try:
        args.fonction(args)
    except (RuntimeError, ValueError) as erreur:
        sys.exit(f"Erreur : {erreur}")


if __name__ == "__main__":
    main()
