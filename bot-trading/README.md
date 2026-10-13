# Bot de trading fictif

Un petit bot pour apprendre le trading **sans risquer un centime**. Il fait deux choses :

1. **Backtest** : il rejoue des années de cours passés et compare plusieurs stratégies à la plus simple de toutes, acheter et ne plus toucher.
2. **Mode papier** : il gère un portefeuille fictif au jour le jour, avec les vrais cours, et note chaque décision dans un journal.

Aucun ordre réel n'est jamais passé. Le bot n'est relié à aucun compte bancaire ni courtier.

## Installation (une seule fois)

1. Installe Python 3.10 ou plus récent depuis [python.org](https://www.python.org/downloads/). Sous Windows, coche « Add Python to PATH » pendant l'installation.
2. Ouvre un terminal dans le dossier `bot-trading` (sous Windows : clic droit dans le dossier, puis « Ouvrir dans le Terminal »).
3. C'est tout pour les stratégies classiques : le bot n'utilise que des outils inclus dans Python.

Sous Windows, remplace `python3` par `python` (ou `py`) dans les commandes ci-dessous.

## Premier essai, sans connexion

```bash
python3 -m bot backtest --demo --capital 1000 --apport 50
```

Le bot simule 10 ans de cours fictifs, avec 1 000 € au départ puis 50 € versés chaque mois. Il affiche un tableau et crée `rapport.html`. Ouvre ce fichier dans ton navigateur pour voir les courbes et le journal des ordres.

## Tester sur de vrais cours

```bash
# ETF MSCI World (celui qu'on achète dans un PEA), depuis 2015
python3 -m bot backtest --symbole CW8.PA --debut 2015-01-01 --capital 1000 --apport 50

# Bitcoin en euros
python3 -m bot backtest --symbole BTC-EUR --debut 2018-01-01

# S&P 500 depuis 1990, données mensuelles fournies dans le dossier (pas besoin d'internet)
python3 -m bot backtest --csv donnees/sp500_mensuel.csv --debut 1990-01-01 --courte 1 --longue 10 --apport 50
```

Les cours viennent de Yahoo Finance. Les symboles se trouvent sur [fr.finance.yahoo.com](https://fr.finance.yahoo.com) (`AIR.PA` pour Airbus, `MC.PA` pour LVMH…).

Le fichier `sp500_mensuel.csv` contient un cours par mois, sans les dividendes. Le rendement réel d'un investisseur aurait donc été plus élevé que ce qu'affiche la simulation.

## Les stratégies

| Nom | Ce qu'elle fait |
|---|---|
| `achat_conserve` | Tout investi en permanence. C'est la référence à battre. |
| `croisement_mm` | Investi quand la moyenne des 50 derniers cours dépasse celle des 200, en espèces sinon. Réglable avec `--courte` et `--longue`. |
| `rsi` | Achète quand le marché a beaucoup baissé (RSI sous 30), vend quand il a beaucoup monté (RSI au-dessus de 70). |
| `hasard` | Pile ou face chaque semaine. Si une stratégie fait à peine mieux que le hasard, elle ne vaut rien. |
| `claude` | Claude lit un résumé du marché et choisit la part à investir. Mode papier uniquement (voir plus bas). |

Pour n'en comparer que certaines : `--strategies achat_conserve rsi`.

## Mode papier : le bot au quotidien

```bash
python3 -m bot papier --symbole CW8.PA --strategie croisement_mm --capital 1000 --apport 50
```

Lance cette commande **une fois par jour de bourse**, de préférence après la fermeture (17 h 30 à Paris). Le bot récupère le dernier cours, décide, puis enregistre le portefeuille dans `portefeuilles/`. Si tu la relances le même jour, il ne fait rien.

```bash
python3 -m bot etat                 # où en sont tes portefeuilles fictifs
python3 -m bot papier ... --reinitialiser   # repartir de zéro
```

Tu peux faire tourner plusieurs portefeuilles en parallèle (une stratégie chacun) et les comparer au bout de quelques mois.

### Le lancer tout seul chaque jour (Windows)

Ouvre le **Planificateur de tâches**, puis « Créer une tâche de base ». Choisis un déclenchement quotidien à 18 h. Comme action, mets le programme `python` avec les arguments `-m bot papier --symbole CW8.PA --strategie croisement_mm`. Dans « Commencer dans », indique le chemin du dossier `bot-trading`.

## La stratégie Claude

C'est l'idée de départ : demander à une IA de gérer le portefeuille. Pour l'essayer :

1. Installe le paquet : `pip install anthropic`
2. Crée une clé API sur [console.anthropic.com](https://console.anthropic.com) et ajoute quelques euros de crédit. C'est un compte séparé de l'abonnement Claude.
3. Enregistre la clé dans la variable d'environnement `ANTHROPIC_API_KEY`. Sous Windows : `setx ANTHROPIC_API_KEY "ta-cle"`, puis rouvre le terminal.
4. Lance : `python3 -m bot papier --symbole CW8.PA --strategie claude`

Chaque décision coûte environ 1 à 3 centimes. Claude reçoit les variations récentes, les moyennes mobiles et le RSI. Il répond par une part à investir et une phrase d'explication, enregistrée dans le journal.

Elle n'est pas disponible en backtest, et c'est voulu : Claude a appris sur des textes qui racontent déjà la suite des événements (krach de 2020, reprise, etc.). Le tester sur le passé reviendrait à jouer au loto en connaissant le tirage. Le seul test honnête, c'est le mode papier, sur des jours qui n'ont pas encore eu lieu.

## Comment lire les résultats

- **Valeur finale** et **gain** : ce que tu aurais, comparé à ce que tu as versé.
- **Rendement / an** : la performance annuelle de la stratégie, sans tenir compte des versements.
- **Pire baisse** : la plus forte chute entre un sommet et un creux. C'est ce que tu aurais dû supporter sans paniquer.
- **Frais** : 0,2 % par ordre, avec un minimum de 1 € (réglable avec `--frais`). Plus une stratégie passe d'ordres, plus elle paie.

## Le défi des 3 mois

1. Fais tourner en mode papier `achat_conserve`, `croisement_mm` et `claude` sur le même actif.
2. Note chaque semaine leur valeur dans un tableau.
3. Au bout de 3 mois, regarde lequel a gagné, et surtout pourquoi (le journal explique chaque ordre).

Trois mois, c'est beaucoup trop court pour conclure qu'une stratégie « marche ». Ça suffit en revanche pour comprendre comment chacune réagit.

## À garder en tête

- Une stratégie qui a gagné sur le passé peut perdre à l'avenir. C'est même fréquent quand on a beaucoup réglé ses paramètres pour coller à l'historique.
- Ce bot est un outil d'apprentissage, pas un conseil en investissement. Avant de placer de l'argent réel, renseigne-toi auprès d'un conseiller et consulte les ressources de l'AMF.
- Si un jour tu trades pour de vrai, les plus-values sont imposables et un compte à l'étranger (plateforme crypto, par exemple) doit être déclaré aux impôts.
