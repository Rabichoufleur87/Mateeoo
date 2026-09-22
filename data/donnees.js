/* ==========================================================================
   DONNEES DU SITE DE SAINT-MATHIEU (87440)
   --------------------------------------------------------------------------
   C'est le SEUL fichier a modifier pour mettre le site a jour :
   actualites, agenda, elus, demarches, annuaire, coordonnees de la mairie.

   Regles simples :
     - le texte va toujours entre guillemets droits : "comme ceci"
     - chaque element se termine par une virgule, sauf le dernier de la liste
     - les dates s'ecrivent annee-mois-jour : "2026-12-31"
     - pour retirer un element, supprimez le bloc entre accolades { ... }
     - apres modification, enregistrez puis rechargez la page du site

   En cas de doute, copiez un bloc existant et modifiez son contenu.
   ========================================================================== */

window.DONNEES = {
  "commune": {
    "_commentaire": "Fiche d'identite de la commune. Modifiez ce fichier pour mettre a jour les informations affichees sur le site.",
    "nom": "Saint-Mathieu",
    "codePostal": "87440",
    "codeInsee": "87168",
    "gentile": "Mathuséens, Mathuséennes",
    "departement": "Haute-Vienne (87)",
    "region": "Nouvelle-Aquitaine",
    "intercommunalite": "Communauté de communes Ouest Limousin",
    "population": 1081,
    "superficieKm2": 40.74,
    "altitudeMin": 225,
    "altitudeMax": 435,
    "latitude": 45.7092,
    "longitude": 0.7581,
    "mairie": {
      "adresse": "1 place du Docteur-Hugonneau",
      "codePostal": "87440",
      "ville": "Saint-Mathieu",
      "telephone": "05 55 00 30 26",
      "telephoneLien": "+33555003026",
      "email": "mairie@st-mathieu.fr",
      "horaires": [
        {
          "jours": "Lundi",
          "creneaux": [
            "08:30-12:00",
            "13:30-17:30"
          ]
        },
        {
          "jours": "Mardi",
          "creneaux": [
            "08:30-12:00",
            "13:30-17:30"
          ]
        },
        {
          "jours": "Mercredi",
          "creneaux": [
            "08:30-12:00",
            "13:30-17:30"
          ]
        },
        {
          "jours": "Jeudi",
          "creneaux": [
            "08:30-12:00",
            "13:30-17:30"
          ]
        },
        {
          "jours": "Vendredi",
          "creneaux": [
            "08:30-12:00",
            "13:30-17:00"
          ]
        },
        {
          "jours": "Samedi",
          "creneaux": [
            "08:30-12:00"
          ]
        },
        {
          "jours": "Dimanche",
          "creneaux": []
        }
      ]
    }
  },
  "actualites": [
    {
      "id": "collecte-dechets-calendrier",
      "titre": "Calendrier de collecte des ordures ménagères",
      "date": "2026-09-15",
      "categorie": "Services",
      "chapo": "La collecte a lieu tous les 15 jours sur l'ensemble de la commune, très tôt le matin. Pensez à sortir votre bac la veille au soir.",
      "corps": "La Communauté de communes Ouest Limousin assure la collecte des ordures ménagères sur les 16 communes du territoire. À Saint-Mathieu, le ramassage est effectué tous les quinze jours, toute l'année.\n\nLe tri sélectif (emballages, papier, verre) se dépose dans les points d'apport volontaire répartis dans le bourg et les villages. La déchèterie des Flamanchies accueille gratuitement les particuliers pour les encombrants, déchets verts, gravats et déchets dangereux.\n\nLe calendrier annuel est disponible en mairie et sur le site de la Communauté de communes.",
      "epingle": true
    },
    {
      "id": "inscriptions-scolaires",
      "titre": "Inscriptions scolaires : la marche à suivre",
      "date": "2026-09-01",
      "categorie": "Enfance & scolarité",
      "chapo": "Nouvelle famille sur la commune ? L'inscription à l'école se fait en deux temps : en mairie, puis auprès de la direction de l'école.",
      "corps": "L'inscription d'un enfant à l'école de Saint-Mathieu se déroule en deux étapes.\n\n1. En mairie : présentez le livret de famille, un justificatif de domicile de moins de trois mois et le carnet de santé de l'enfant (vaccinations à jour). Un certificat d'inscription vous est remis.\n\n2. À l'école : prenez rendez-vous avec la direction pour finaliser l'admission, muni du certificat délivré par la mairie.\n\nLe secrétariat de mairie vous accompagne dans ces démarches aux horaires d'ouverture.",
      "epingle": false
    },
    {
      "id": "travaux-voirie-bourg",
      "titre": "Travaux de voirie dans le bourg",
      "date": "2026-08-20",
      "categorie": "Travaux",
      "chapo": "Des travaux de réfection de chaussée sont programmés. La circulation sera adaptée pendant la durée du chantier.",
      "corps": "Un chantier de réfection de la voirie communale est engagé dans le bourg. La circulation est maintenue mais peut être ponctuellement alternée aux abords du chantier.\n\nLe stationnement sera interdit sur les sections en travaux, signalées 48 heures à l'avance par arrêté municipal affiché en mairie.\n\nNous remercions les riverains pour leur compréhension. Pour toute question, contactez le secrétariat de mairie.",
      "epingle": false
    },
    {
      "id": "recensement-citoyen",
      "titre": "Recensement citoyen : pensez-y à 16 ans",
      "date": "2026-07-04",
      "categorie": "Démarches",
      "chapo": "Tout jeune Français doit se faire recenser entre ses 16 ans et les trois mois qui suivent. Une démarche obligatoire et rapide.",
      "corps": "Le recensement citoyen est obligatoire pour tous les jeunes Français, filles et garçons, dès l'âge de 16 ans.\n\nPrésentez-vous en mairie avec votre carte d'identité, le livret de famille des parents et un justificatif de domicile. L'attestation de recensement qui vous est remise est indispensable pour vous inscrire aux examens (baccalauréat, permis de conduire) avant 25 ans.\n\nElle permet également votre convocation à la Journée défense et citoyenneté et votre inscription automatique sur les listes électorales à 18 ans.",
      "epingle": false
    },
    {
      "id": "saison-baignade-etang",
      "titre": "Base de loisirs : bilan de la saison estivale",
      "date": "2026-06-12",
      "categorie": "Vie locale",
      "chapo": "Le complexe touristique et son plan d'eau de 14 hectares ont accueilli visiteurs et familles tout au long de l'été.",
      "corps": "Situé au cœur d'un domaine de 22 hectares, le complexe touristique de Saint-Mathieu s'organise autour d'un plan d'eau de 14 hectares.\n\nBaignade surveillée en saison, sentiers de promenade, pêche et aires de pique-nique : le site est l'un des atouts majeurs de la commune, au sein du Parc naturel régional Périgord-Limousin.\n\nLes dates et horaires de surveillance de la baignade sont affichés sur place et en mairie avant chaque saison.",
      "epingle": false
    }
  ],
  "agenda": [
    {
      "id": "conseil-municipal-octobre",
      "titre": "Conseil municipal",
      "date": "2026-10-09",
      "heure": "20:30",
      "lieu": "Salle du conseil, mairie",
      "categorie": "Vie municipale",
      "description": "Séance publique du conseil municipal. L'ordre du jour est affiché en mairie cinq jours francs avant la séance. Les séances sont ouvertes au public."
    },
    {
      "id": "marche-hebdomadaire",
      "titre": "Marché hebdomadaire",
      "date": "2026-09-25",
      "heure": "08:00",
      "lieu": "Place du bourg",
      "categorie": "Vie locale",
      "description": "Producteurs et commerçants locaux. Rendez-vous hebdomadaire au cœur du bourg.",
      "recurrent": "Chaque semaine"
    },
    {
      "id": "permanence-decheterie",
      "titre": "Déchèterie des Flamanchies — ouverture",
      "date": "2026-09-26",
      "heure": "09:00",
      "lieu": "Les Flamanchies",
      "categorie": "Services",
      "description": "Accès gratuit pour les particuliers de la Communauté de communes Ouest Limousin. Horaires détaillés affichés à l'entrée du site."
    },
    {
      "id": "ceremonie-11-novembre",
      "titre": "Cérémonie du 11 novembre",
      "date": "2026-11-11",
      "heure": "11:00",
      "lieu": "Monument aux morts",
      "categorie": "Cérémonie",
      "description": "Commémoration de l'Armistice de 1918. Rassemblement devant la mairie, dépôt de gerbe au monument aux morts, suivi d'un verre de l'amitié."
    },
    {
      "id": "telethon",
      "titre": "Téléthon",
      "date": "2026-12-05",
      "heure": "10:00",
      "lieu": "Salle des fêtes et bourg",
      "categorie": "Associations",
      "description": "Animations organisées par les associations de la commune au profit du Téléthon. Programme détaillé communiqué en novembre."
    }
  ],
  "annuaire": {
    "_commentaire": "Annuaire des services, commerces et associations. Ajoutez, modifiez ou supprimez des entrees librement.",
    "sante": [
      {
        "nom": "Pharmacie",
        "detail": "28 rue de Nontron, 87440 Saint-Mathieu",
        "telephone": "05 55 00 31 80",
        "categorie": "Pharmacie"
      },
      {
        "nom": "Cabinet infirmier",
        "detail": "Soins à domicile et au cabinet",
        "telephone": "05 55 00 34 35",
        "categorie": "Infirmiers"
      },
      {
        "nom": "Urgences médicales",
        "detail": "SAMU 15 · Pompiers 18 · Numéro d'urgence européen 112",
        "telephone": "15",
        "categorie": "Urgences"
      },
      {
        "nom": "Médecin de garde",
        "detail": "Service de garde départemental, en dehors des heures d'ouverture des cabinets",
        "telephone": "116 117",
        "categorie": "Garde"
      }
    ],
    "servicesPublics": [
      {
        "nom": "Mairie de Saint-Mathieu",
        "detail": "1 place du Docteur-Hugonneau — état civil, urbanisme, cimetière, location de salles",
        "telephone": "05 55 00 30 26",
        "categorie": "Administration"
      },
      {
        "nom": "Communauté de communes Ouest Limousin",
        "detail": "Ordures ménagères, déchèteries, SPANC, développement économique",
        "lien": "https://www.ouestlimousin.com/",
        "categorie": "Intercommunalité"
      },
      {
        "nom": "Déchèterie des Flamanchies",
        "detail": "Les Flamanchies, 87440 Saint-Mathieu — accès gratuit pour les particuliers",
        "categorie": "Déchets"
      },
      {
        "nom": "École de Saint-Mathieu",
        "detail": "Inscription en mairie puis auprès de la direction de l'école",
        "categorie": "Scolarité"
      },
      {
        "nom": "Collège",
        "detail": "Établissement du second degré implanté sur la commune",
        "categorie": "Scolarité"
      }
    ],
    "commerces": [
      {
        "nom": "Commerces de proximité du bourg",
        "detail": "Alimentation, boulangerie, café-restaurant, artisans. La liste détaillée est tenue à jour par la mairie — signalez-nous toute création ou fermeture.",
        "categorie": "Proximité"
      },
      {
        "nom": "Marché hebdomadaire",
        "detail": "Producteurs et commerçants locaux, place du bourg",
        "categorie": "Marché"
      },
      {
        "nom": "Hébergements touristiques",
        "detail": "Gîtes, chambres d'hôtes et camping à proximité du plan d'eau",
        "categorie": "Tourisme"
      }
    ],
    "associations": [
      {
        "nom": "Comité des fêtes",
        "detail": "Organisation des animations et manifestations communales",
        "categorie": "Animation"
      },
      {
        "nom": "Associations sportives",
        "detail": "La commune dispose de plusieurs équipements sportifs ouverts aux clubs et aux scolaires",
        "categorie": "Sport"
      },
      {
        "nom": "Club des aînés",
        "detail": "Rencontres, sorties et activités conviviales",
        "categorie": "Lien social"
      },
      {
        "nom": "Association de pêche",
        "detail": "Gestion et animation autour du plan d'eau et des cours d'eau communaux",
        "categorie": "Nature"
      }
    ]
  },
  "elus": {
    "_commentaire": "Composition du conseil municipal. Laissez le champ \"nom\" vide pour afficher \"À compléter\".",
    "mandat": "2026 — 2032",
    "nombreConseillers": 15,
    "avertissement": "Composition issue des élections municipales de mars 2026. Les noms et délégations doivent être confirmés et complétés par le secrétariat de mairie avant mise en ligne.",
    "membres": [
      {
        "fonction": "Maire",
        "nom": "Jacques Lacroix",
        "delegation": "Représentation de la commune, police municipale, direction générale des services"
      },
      {
        "fonction": "1er adjoint·e",
        "nom": "",
        "delegation": "Travaux, voirie et bâtiments communaux"
      },
      {
        "fonction": "2e adjoint·e",
        "nom": "",
        "delegation": "Finances et administration générale"
      },
      {
        "fonction": "3e adjoint·e",
        "nom": "",
        "delegation": "Vie scolaire, enfance et jeunesse"
      },
      {
        "fonction": "4e adjoint·e",
        "nom": "",
        "delegation": "Vie associative, culture et animation"
      },
      {
        "fonction": "Conseiller·ère municipal·e",
        "nom": "",
        "delegation": "Environnement et cadre de vie"
      },
      {
        "fonction": "Conseiller·ère municipal·e",
        "nom": "",
        "delegation": "Tourisme et plan d'eau"
      },
      {
        "fonction": "Conseiller·ère municipal·e",
        "nom": "",
        "delegation": "Action sociale et solidarités"
      },
      {
        "fonction": "Conseiller·ère municipal·e",
        "nom": "",
        "delegation": "Communication"
      },
      {
        "fonction": "Conseiller·ère municipal·e",
        "nom": "",
        "delegation": "Agriculture et forêt"
      },
      {
        "fonction": "Conseiller·ère municipal·e",
        "nom": "",
        "delegation": ""
      },
      {
        "fonction": "Conseiller·ère municipal·e",
        "nom": "",
        "delegation": ""
      },
      {
        "fonction": "Conseiller·ère municipal·e",
        "nom": "",
        "delegation": ""
      },
      {
        "fonction": "Conseiller·ère municipal·e",
        "nom": "",
        "delegation": ""
      },
      {
        "fonction": "Conseiller·ère municipal·e",
        "nom": "",
        "delegation": ""
      }
    ],
    "commissions": [
      {
        "nom": "Finances",
        "objet": "Budget, comptes administratifs, fiscalité locale"
      },
      {
        "nom": "Travaux et voirie",
        "objet": "Entretien des routes communales, bâtiments, réseaux"
      },
      {
        "nom": "Vie scolaire",
        "objet": "École, cantine, transport scolaire, périscolaire"
      },
      {
        "nom": "Environnement et cadre de vie",
        "objet": "Espaces verts, fleurissement, Parc naturel régional"
      },
      {
        "nom": "Vie associative et animation",
        "objet": "Soutien aux associations, salle des fêtes, manifestations"
      },
      {
        "nom": "CCAS",
        "objet": "Centre communal d'action sociale — aide et accompagnement social"
      }
    ]
  },
  "demarches": [
    {
      "categorie": "État civil",
      "icone": "identite",
      "items": [
        {
          "titre": "Acte de naissance, mariage ou décès",
          "ou": "En mairie ou par courrier",
          "pieces": [
            "Pièce d'identité du demandeur",
            "Indication des noms et prénoms des parents (acte de naissance)"
          ],
          "detail": "La demande concerne uniquement les actes établis à Saint-Mathieu. Pour un acte dressé dans une autre commune, adressez-vous à la mairie du lieu de l'événement. Délivrance gratuite.",
          "lien": "https://www.service-public.fr/particuliers/vosdroits/N359",
          "delai": "Immédiat au guichet, sous quelques jours par courrier"
        },
        {
          "titre": "Reconnaissance d'un enfant",
          "ou": "En mairie, sans rendez-vous",
          "pieces": [
            "Pièce d'identité",
            "Justificatif de domicile de moins de 3 mois"
          ],
          "detail": "La reconnaissance peut être faite avant la naissance par l'un ou les deux parents, dans n'importe quelle mairie.",
          "lien": "https://www.service-public.fr/particuliers/vosdroits/F887",
          "delai": "Immédiat"
        },
        {
          "titre": "Mariage, PACS",
          "ou": "En mairie, sur rendez-vous",
          "pieces": [
            "Pièces d'identité",
            "Justificatifs de domicile",
            "Actes de naissance de moins de 3 mois",
            "Informations sur les témoins"
          ],
          "detail": "Le dossier complet doit être déposé en mairie plusieurs semaines avant la date envisagée. Le PACS est également enregistré en mairie.",
          "lien": "https://www.service-public.fr/particuliers/vosdroits/N142",
          "delai": "Dépôt du dossier au moins 1 mois avant"
        }
      ]
    },
    {
      "categorie": "Papiers d'identité",
      "icone": "carte",
      "items": [
        {
          "titre": "Carte nationale d'identité et passeport",
          "ou": "Mairie équipée d'un dispositif de recueil (pas à Saint-Mathieu)",
          "pieces": [
            "Pré-demande en ligne (ANTS)",
            "Photo d'identité conforme",
            "Justificatif de domicile",
            "Timbre fiscal pour le passeport"
          ],
          "detail": "Saint-Mathieu n'est pas équipée du dispositif de recueil des empreintes. La demande se fait dans une mairie habilitée du département, sur rendez-vous. Effectuez d'abord la pré-demande en ligne sur le site de l'ANTS, puis prenez rendez-vous.",
          "lien": "https://www.service-public.fr/particuliers/vosdroits/N358",
          "delai": "Variable selon les délais de rendez-vous"
        },
        {
          "titre": "Recensement citoyen (16 ans)",
          "ou": "En mairie",
          "pieces": [
            "Carte d'identité du jeune",
            "Livret de famille des parents",
            "Justificatif de domicile"
          ],
          "detail": "Obligatoire dans les trois mois qui suivent le 16e anniversaire. L'attestation est exigée pour s'inscrire aux examens et au permis de conduire avant 25 ans.",
          "lien": "https://www.service-public.fr/particuliers/vosdroits/F870",
          "delai": "Immédiat"
        },
        {
          "titre": "Inscription sur les listes électorales",
          "ou": "En mairie ou en ligne",
          "pieces": [
            "Pièce d'identité en cours de validité",
            "Justificatif de domicile de moins de 3 mois"
          ],
          "detail": "L'inscription est possible toute l'année. Pour voter à un scrutin, elle doit intervenir au plus tard le 6e vendredi précédant le scrutin.",
          "lien": "https://www.service-public.fr/particuliers/vosdroits/N47",
          "delai": "Immédiat"
        }
      ]
    },
    {
      "categorie": "Urbanisme",
      "icone": "maison",
      "items": [
        {
          "titre": "Déclaration préalable de travaux",
          "ou": "En mairie ou en ligne",
          "pieces": [
            "Formulaire Cerfa complété",
            "Plan de situation",
            "Plan de masse",
            "Photographies et croquis"
          ],
          "detail": "Requise pour les petits travaux : abri de jardin, clôture, ravalement, changement de menuiseries, panneaux solaires, piscine de moins de 100 m². Le délai d'instruction est majoré en secteur protégé.",
          "lien": "https://www.service-public.fr/particuliers/vosdroits/F17578",
          "delai": "1 mois d'instruction"
        },
        {
          "titre": "Permis de construire",
          "ou": "En mairie ou en ligne",
          "pieces": [
            "Formulaire Cerfa",
            "Plans (situation, masse, coupe, façades)",
            "Notice descriptive",
            "Insertion paysagère"
          ],
          "detail": "Obligatoire pour toute construction neuve et pour les extensions dépassant les seuils réglementaires. Le recours à un architecte est requis au-delà de 150 m² de surface de plancher.",
          "lien": "https://www.service-public.fr/particuliers/vosdroits/F1986",
          "delai": "2 à 3 mois d'instruction"
        },
        {
          "titre": "Certificat d'urbanisme",
          "ou": "En mairie",
          "pieces": [
            "Formulaire Cerfa",
            "Plan de situation",
            "Note descriptive du projet (CU opérationnel)"
          ],
          "detail": "Le certificat d'information indique les règles applicables au terrain. Le certificat opérationnel précise si le terrain peut accueillir le projet envisagé.",
          "lien": "https://www.service-public.fr/particuliers/vosdroits/F1633",
          "delai": "1 à 2 mois"
        },
        {
          "titre": "Assainissement non collectif (SPANC)",
          "ou": "Communauté de communes Ouest Limousin",
          "pieces": [
            "Formulaire de demande",
            "Étude de sol",
            "Plan d'implantation"
          ],
          "detail": "Le contrôle des installations d'assainissement non collectif est assuré par la Communauté de communes Ouest Limousin, y compris lors des ventes immobilières.",
          "lien": "https://www.ouestlimousin.com/environnement/",
          "delai": "Selon planning du service"
        }
      ]
    },
    {
      "categorie": "Logement et vie quotidienne",
      "icone": "cle",
      "items": [
        {
          "titre": "Location d'une salle communale",
          "ou": "En mairie",
          "pieces": [
            "Attestation d'assurance responsabilité civile",
            "Pièce d'identité",
            "Chèque de caution"
          ],
          "detail": "La salle des fêtes et les salles communales sont mises à disposition des habitants et des associations. Réservation auprès du secrétariat de mairie, selon disponibilités et tarifs votés par le conseil municipal.",
          "delai": "Réservation conseillée plusieurs semaines à l'avance"
        },
        {
          "titre": "Concession au cimetière",
          "ou": "En mairie",
          "pieces": [
            "Pièce d'identité",
            "Justificatif de domicile"
          ],
          "detail": "Attribution et renouvellement des concessions funéraires, plan du cimetière et registre consultables en mairie.",
          "delai": "Sur rendez-vous"
        },
        {
          "titre": "Déchets et encombrants",
          "ou": "Déchèterie des Flamanchies",
          "pieces": [
            "Justificatif de domicile sur le territoire de la Communauté de communes"
          ],
          "detail": "Ordures ménagères collectées tous les 15 jours. Tri sélectif en points d'apport volontaire. Déchèterie gratuite pour les particuliers : encombrants, déchets verts, gravats, déchets dangereux.",
          "lien": "https://www.ouestlimousin.com/environnement/",
          "delai": "Aux horaires d'ouverture de la déchèterie"
        },
        {
          "titre": "Signaler un problème (voirie, éclairage, dépôt sauvage)",
          "ou": "Mairie — téléphone, courriel ou formulaire",
          "pieces": [
            "Localisation précise",
            "Photo si possible"
          ],
          "detail": "Nid-de-poule, panneau abîmé, point lumineux en panne, dépôt sauvage : signalez-le à la mairie, qui transmet au service compétent.",
          "delai": "Prise en compte sous quelques jours"
        }
      ]
    }
  ]
};
