/* ============================================================
   Séquences — classe de Terminale (6 séquences)
   Généré depuis data.js (point 7 : modularisation par niveau).
   À éditer ici : un objet = une séquence.
   ============================================================ */
const SEQ_TERMINALE = [
  {
    "id": "surveillance",
    "title": "Watching You — Privacy in the Digital Age",
    "axe": 5,
    "axeAlt": 1,
    "niveau": "Terminale",
    "statut": "LVA",
    "voie": "Générale",
    "cecrl": "B2",
    "objet": "Citoyenneté et mondes virtuels · Surveillance, données et libertés",
    "seances": 5,
    "duree": "≈ 5 × 55 min",
    "tokens": 3,
    "note": 4.6,
    "telechargements": 870,
    "badges": [
      "conforme",
      "diff",
      "eval"
    ],
    "visuel": "linear-gradient(135deg,#0f172a,#0891b2)",
    "resume": "Surveillance de masse, données personnelles et libertés : de l'univers de 1984 aux caméras et à la reconnaissance faciale d'aujourd'hui, les élèves construisent un point de vue argumenté et le défendent dans un TED-style talk.",
    "problematique": "How far should a society go in the name of security?",
    "idees": [
      "Surveillance de masse et CCTV",
      "La reconnaissance faciale",
      "Données personnelles et big tech",
      "Le scandale Cambridge Analytica",
      "Réseaux sociaux et démocratie",
      "Le droit à l'oubli",
      "Les lanceurs d'alerte (Snowden)",
      "La citoyenneté numérique"
    ],
    "ancrage": [
      {
        "type": "Texte",
        "oeuvre": "« 1984 » — George Orwell",
        "source": "Œuvre (extrait pédagogique)"
      },
      {
        "type": "Documentaire",
        "oeuvre": "The Great Hack (2019) — Cambridge Analytica",
        "source": "Netflix / référence pédagogique"
      },
      {
        "type": "Vidéo",
        "oeuvre": "TED Talk sur la vie privée (au choix)",
        "source": "TED.com (sous-titré)"
      }
    ],
    "objectifs": {
      "culturels": [
        "L'imaginaire dystopique de la surveillance : Orwell, 1984 et « Big Brother ».",
        "Le Royaume-Uni, pays le plus vidéosurveillé d'Europe (CCTV) ; la reconnaissance faciale.",
        "L'économie des données personnelles (data brokers, publicité ciblée) et la régulation (RGPD, ICO au R.-U.)."
      ],
      "langagiers": {
        "Compréhension de l'oral": "Comprendre le détail d'un reportage et d'un extrait de TED talk au débit naturel (B2).",
        "Compréhension de l'écrit": "Dégager la thèse, les arguments et les nuances d'un éditorial.",
        "Expression orale en continu": "Tenir un discours argumenté et nuancé de 3 minutes, avec exemples.",
        "Expression écrite": "Structurer un paragraphe d'opinion avec concession et réfutation.",
        "Interaction orale et écrite": "Débattre en réagissant aux arguments adverses.",
        "Médiation": "Restituer en anglais les chiffres clés d'une infographie française sur la protection des données."
      },
      "grammaire": [
        "La voix passive (be watched, be tracked, be stored)",
        "Les modaux d'obligation et de permission (must, should, be allowed to)",
        "Les conditionnels (type 1 et 2 : if we gave up… we would…)"
      ],
      "lexique": [
        "surveillance, privacy, data, to track, to monitor, consent, breach, to opt out",
        "champ lexical de la liberté et du contrôle"
      ],
      "phonologie": [
        "Formes faibles des modaux et auxiliaires dans le débit fluide",
        "Intonation des questions rhétoriques et de l'emphase"
      ]
    },
    "tacheFinale": {
      "titre": "Deliver a 3-minute TED-style talk",
      "consigne": "Préparez et enregistrez un mini-TED talk (3 min) répondant à la problématique. Prenez position, appuyez-vous sur au moins trois documents de la séquence, anticipez une objection et concluez par un appel à la réflexion.",
      "activites": [
        "Expression orale en continu",
        "Expression écrite",
        "Compréhension de l'écrit"
      ],
      "perspective": "L'élève agit : il s'adresse à un public réel (la classe / l'ENT) pour le convaincre, dans un format médiatique authentique."
    },
    "seancesDetail": [
      {
        "n": 1,
        "titre": "Big Brother is watching you",
        "objectif": "Entrer dans la thématique par la fiction et formuler des hypothèses.",
        "phases": [
          {
            "nom": "Anticipation / Lead-in",
            "min": "8 min",
            "desc": "Photo de caméras de surveillance à Londres. Consigne : « Where is it? How does it feel to be watched? » Modalité : classe entière. Production attendue : ressentis et lexique émergent au tableau."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "26 min",
            "desc": "Extrait de 1984 (la télécran). Consigne : repérer le dispositif de surveillance et inférer le ton à partir du lexique. Modalité : individuel puis binôme. Production attendue : dispositif décrit + registre identifié."
          },
          {
            "nom": "Production orale",
            "min": "14 min",
            "desc": "Consigne : « Is Orwell's world pure fiction in 2026? » Modalité : binôme. Production attendue : prise de position nuancée en 2-3 phrases."
          },
          {
            "nom": "Trace écrite",
            "min": "7 min",
            "desc": "Synthèse + lexique de la surveillance + passif (citizens are watched). Devoir : relever un exemple réel de surveillance dans l'actualité. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Texte",
            "titre": "George Orwell, 1984 (extrait — la télécran)",
            "src": "Œuvre étudiée — extrait pédagogique"
          },
          {
            "type": "Image",
            "titre": "CCTV cameras, London",
            "src": "Wikimedia Commons (CC)"
          }
        ]
      },
      {
        "n": 2,
        "titre": "Your data, their gold",
        "objectif": "Comprendre l'économie des données personnelles.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Consigne : « What did you accept today without reading? » Modalité : classe entière. Production attendue : prise de conscience des CGU."
          },
          {
            "nom": "Compréhension de l'oral",
            "min": "26 min",
            "desc": "Reportage sur les data brokers et la publicité ciblée. Consigne : compléter « qui collecte / quoi / pourquoi ». Modalité : écoute fractionnée, individuel. Production attendue : tableau renseigné."
          },
          {
            "nom": "Production écrite",
            "min": "16 min",
            "desc": "Consigne : rédiger un paragraphe « Are free apps really free? » (passif + modaux). Modalité : individuel. Production attendue : paragraphe (premier jet)."
          },
          {
            "nom": "Trace écrite",
            "min": "6 min",
            "desc": "Lexique data / consent + modaux d'obligation. Devoir : finaliser le paragraphe. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Vidéo",
            "titre": "How your data is bought and sold (reportage, extrait)",
            "src": "BBC / The Guardian — adapté"
          },
          {
            "type": "Infographie",
            "titre": "Where your data goes",
            "src": "Adapté ICO (médiation possible)"
          }
        ]
      },
      {
        "n": 3,
        "titre": "Faces in the crowd",
        "objectif": "Confronter sécurité et libertés autour de la reconnaissance faciale.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "7 min",
            "desc": "Image d'une foule scannée par reconnaissance faciale. Consigne : « What is happening? Is it reassuring or worrying? » Modalité : classe entière. Production attendue : hypothèses et premières réactions."
          },
          {
            "nom": "Médiation",
            "min": "22 min",
            "desc": "Consigne : restituer en anglais une infographie française (taux d'erreur, usages) puis classer arguments pour/contre. Modalité : binôme. Production attendue : 3 données restituées + tri d'arguments."
          },
          {
            "nom": "Interaction orale",
            "min": "19 min",
            "desc": "Consigne : débat réglé « Should facial recognition be banned in public spaces? » Modalité : groupes, prise de notes des arguments adverses. Production attendue : 2 arguments + 1 réfutation."
          },
          {
            "nom": "Trace écrite",
            "min": "7 min",
            "desc": "Connecteurs de concession (although, even if) + conditionnels. Devoir : préparer sa position pour le TED talk. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Infographie",
            "titre": "La reconnaissance faciale en chiffres (FR)",
            "src": "Médiation FR→EN (créée)"
          },
          {
            "type": "Article",
            "titre": "Facial recognition: progress or threat? (adapté)",
            "src": "BBC News"
          }
        ]
      },
      {
        "n": 4,
        "titre": "The price of safety",
        "objectif": "Analyser un éditorial et affiner l'argumentation nuancée.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Citation projetée (« Those who would give up liberty for safety… »). Consigne : « Do you agree? » Modalité : classe entière. Production attendue : réaction argumentée."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "25 min",
            "desc": "Éditorial d'opinion. Consigne : repérer thèse / arguments / concession / réfutation. Modalité : individuel, version scaffolded disponible. Production attendue : structure argumentative cartographiée."
          },
          {
            "nom": "Production orale",
            "min": "17 min",
            "desc": "Consigne : « Convince your neighbour of the opposite of what you think. » Modalité : binôme. Production attendue : entraînement à la nuance (2 min)."
          },
          {
            "nom": "Trace écrite",
            "min": "7 min",
            "desc": "Boîte à outils argumentatifs (admittedly, however, that said). Devoir : plan du TED talk. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Article",
            "titre": "Security vs. liberty: where is the line? (opinion, adapté)",
            "src": "The Guardian"
          },
          {
            "type": "Document",
            "titre": "Argumentation toolkit — concession & rebuttal",
            "src": "Ressource enseignant (créée)"
          }
        ]
      },
      {
        "n": 5,
        "titre": "Final task — your TED-style talk",
        "objectif": "Réaliser et évaluer la tâche finale actionnelle.",
        "phases": [
          {
            "nom": "Préparation",
            "min": "15 min",
            "desc": "Consigne : relire la grille, répéter, travailler l'intonation et les pauses. Modalité : individuel / binôme. Production attendue : talk prêt à enregistrer."
          },
          {
            "nom": "Production",
            "min": "30 min",
            "desc": "Consigne : enregistrer le talk (3 min) avec position, exemples et objection anticipée. Modalité : individuel (smartphone / ENT), professeur en appui. Production attendue : talk enregistré."
          },
          {
            "nom": "Co-évaluation",
            "min": "10 min",
            "desc": "Consigne : écouter un talk et donner « 2 réussites + 1 conseil ». Modalité : binômes croisés. Production attendue : feedback à la grille."
          }
        ],
        "supports": [
          {
            "type": "Grille",
            "titre": "Grille d'évaluation EOC (CECRL B2)",
            "src": "Ressource enseignant (créée)"
          }
        ]
      }
    ],
    "evaluation": {
      "diagnostique": "Échelle d'accord projetée (S1) : « I have nothing to hide » → repère les représentations à travailler.",
      "formative": [
        "Paragraphe « free apps » (S2) — feedback sur le passif",
        "Débat (S3) — observation de l'interaction",
        "Auto-évaluation à mi-parcours (check-list B2)"
      ],
      "sommative": "TED talk (S5) évalué à la grille CECRL B2 : richesse argumentative, nuance, correction, recevabilité phonologique.",
      "grille": [
        {
          "critere": "Pertinence & argumentation",
          "desc": "Position claire, ≥ 3 documents, objection anticipée",
          "points": 6
        },
        {
          "critere": "Richesse & précision lexicale",
          "desc": "Lexique surveillance/liberté maîtrisé",
          "points": 5
        },
        {
          "critere": "Correction grammaticale",
          "desc": "Passif, modaux, conditionnels",
          "points": 5
        },
        {
          "critere": "Recevabilité phonologique & impact",
          "desc": "Intonation, pauses, fluidité",
          "points": 4
        }
      ]
    },
    "differenciation": {
      "soutien": [
        "Script lacunaire pour la CO (S2)",
        "Banque d'arguments imagée avant le débat",
        "Trame guidée pour le plan du TED talk"
      ],
      "approfondissement": [
        "Document complémentaire sur l'affaire Cambridge Analytica (S4)",
        "Tâche complexifiée : intégrer une contre-objection chiffrée"
      ],
      "modalites": [
        "Individuel (écrits)",
        "Binôme (oral)",
        "Groupe (débat)",
        "Classe entière (mises en commun)"
      ]
    },
    "prolongements": [
      "Filer vers l'axe 1 (espace privé / public) avec une séquence sur la liberté de la presse.",
      "Lecture cursive : nouvelle d'anticipation (Black Mirror novelization).",
      "EMI / EMC : atelier paramétrage de la vie privée sur un smartphone."
    ],
    "ressourcesProf": [
      "Eduscol — Programme LV de Terminale, axe « Citoyenneté et mondes virtuels ».",
      "ICO (UK Information Commissioner's Office) — ressources sur la protection des données.",
      "TED.com — talks sur la vie privée (sous-titrés anglais)."
    ],
    "livrables": [
      {
        "nom": "Fiche séquence (synthèse 2 p.)",
        "type": "PDF"
      },
      {
        "nom": "5 fiches de séance détaillées",
        "type": "PDF"
      },
      {
        "nom": "Supports élèves + corrigés",
        "type": "PDF"
      },
      {
        "nom": "Diaporama de présentation par séance",
        "type": "PPT"
      },
      {
        "nom": "Traces écrites structurées",
        "type": "Word"
      },
      {
        "nom": "Grilles d'évaluation (tâche finale)",
        "type": "PDF"
      },
      {
        "nom": "Annexes : lexique & points de grammaire",
        "type": "PDF"
      }
    ]
  },
  {
    "id": "windrush",
    "title": "The Windrush Generation — Belonging in Britain",
    "axe": 6,
    "axeAlt": 2,
    "niveau": "Terminale",
    "statut": "LVA",
    "voie": "Générale",
    "cecrl": "B2",
    "objet": "Le Royaume-Uni et ses nations · Mémoire de l'immigration et appartenance",
    "seances": 5,
    "duree": "≈ 5 × 55 min",
    "tokens": 3,
    "note": 4.9,
    "telechargements": 640,
    "badges": [
      "conforme",
      "diff",
      "eval",
      "cle"
    ],
    "visuel": "linear-gradient(135deg,#134e4a,#ca8a04)",
    "resume": "Du débarquement de l'Empire Windrush en 1948 au scandale de 2018, en passant par la littérature et la poésie caribéo-britanniques : les élèves explorent l'appartenance et conçoivent un panneau d'exposition « Voices of Windrush ».",
    "problematique": "What does it really mean to belong to a nation?",
    "idees": [
      "L'Empire Windrush (1948)",
      "Le scandale Windrush (2018)",
      "La Grande-Bretagne multiculturelle",
      "L'Écosse et l'indépendance",
      "L'Irlande du Nord et les Troubles",
      "Langue galloise et identité",
      "Le Commonwealth aujourd'hui",
      "Brexit et identité"
    ],
    "ancrage": [
      {
        "type": "Texte",
        "oeuvre": "« Small Island » — Andrea Levy",
        "source": "Œuvre (extrait pédagogique)"
      },
      {
        "type": "Poème",
        "oeuvre": "« Hurricane Hits England » — Grace Nichols",
        "source": "Poetry Archive"
      },
      {
        "type": "Série",
        "oeuvre": "Small Axe — Steve McQueen (2020)",
        "source": "BBC / référence pédagogique"
      },
      {
        "type": "Événement",
        "oeuvre": "Le scandale Windrush",
        "source": "The Guardian, 2018"
      }
    ],
    "objectifs": {
      "culturels": [
        "L'Empire Windrush (1948) et l'immigration caribéenne d'après-guerre au Royaume-Uni.",
        "L'expérience de l'altérité et du préjugé : voix littéraires (Andrea Levy, Grace Nichols).",
        "Le scandale Windrush (2018) : citoyenneté, mémoire et reconnaissance."
      ],
      "langagiers": {
        "Compréhension de l'oral": "Comprendre un témoignage et un reportage d'archive au débit naturel (B2).",
        "Compréhension de l'écrit": "Analyser un extrait littéraire et un article de presse (point de vue, registre).",
        "Expression orale en continu": "Présenter un panneau d'exposition de façon structurée et incarnée.",
        "Expression écrite": "Rédiger un témoignage à la première personne et une note de cadrage.",
        "Interaction orale et écrite": "Mener et relancer un échange autour d'une question sensible.",
        "Médiation": "Restituer en anglais l'essentiel d'un repère chronologique en français."
      },
      "grammaire": [
        "Les temps du récit (preterit, past perfect)",
        "Le present perfect (conséquences présentes : they have never been recognised)",
        "Le discours rapporté ; les propositions relatives"
      ],
      "lexique": [
        "belonging, identity, citizenship, heritage, roots, prejudice, deportation, generation",
        "champ lexical de l'appartenance et de l'exil"
      ],
      "phonologie": [
        "Connected speech et formes faibles dans le récit",
        "Lecture expressive d'un poème : rythme et pauses"
      ]
    },
    "tacheFinale": {
      "titre": "Create a « Voices of Windrush » museum panel",
      "consigne": "En binôme, réalisez un panneau d'exposition : un témoignage fictif mais documenté à la première personne (≈ 150 mots) + une courte note curatoriale de cadrage. Présentez-le oralement comme un·e guide de musée.",
      "activites": [
        "Expression écrite",
        "Expression orale en continu",
        "Médiation"
      ],
      "perspective": "L'élève agit en passeur de mémoire : il donne voix à une expérience et la transmet à un public de visiteurs."
    },
    "seancesDetail": [
      {
        "n": 1,
        "titre": "1948 — a ship called Empire Windrush",
        "objectif": "Contextualiser l'arrivée et formuler des hypothèses.",
        "phases": [
          {
            "nom": "Anticipation / Lead-in",
            "min": "8 min",
            "desc": "Photo d'archive (Tilbury, 1948). Consigne : « Who are they? What are they hoping for? » Modalité : classe entière. Production attendue : hypothèses sur l'origine et les espoirs."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "25 min",
            "desc": "Texte d'archive (appel à reconstruire la Grande-Bretagne). Consigne : repérer qui ? pourquoi ? quelle promesse ? Modalité : individuel. Production attendue : promesse et contexte reformulés."
          },
          {
            "nom": "Production orale",
            "min": "14 min",
            "desc": "Consigne : « Why would you leave the Caribbean for a cold, unknown country? » Modalité : binôme. Production attendue : 2 raisons énoncées."
          },
          {
            "nom": "Trace écrite",
            "min": "8 min",
            "desc": "Synthèse + lexique de l'appartenance + temps du récit. Devoir : relever 2 faits sur le Commonwealth. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Image",
            "titre": "Arrival of HMT Empire Windrush, Tilbury, 1948",
            "src": "Imperial War Museum (archive)"
          },
          {
            "type": "Texte",
            "titre": "Post-war recruitment notice (extrait adapté)",
            "src": "British Library — archives"
          }
        ]
      },
      {
        "n": 2,
        "titre": "New lives, old prejudices",
        "objectif": "Lire l'expérience du préjugé dans la fiction.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Pancarte d'époque (« No Irish, No Blacks, No Dogs »). Consigne : « What does it reveal about welcome? » Modalité : classe entière. Production attendue : contexte du préjugé formulé."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "26 min",
            "desc": "Extrait de Small Island (Andrea Levy). Consigne : repérer le point de vue, le ressenti et le registre. Modalité : individuel, version scaffolded disponible. Production attendue : ressenti du personnage analysé."
          },
          {
            "nom": "Production écrite",
            "min": "16 min",
            "desc": "Consigne : réécrire une scène du point de vue de l'autre personnage (preterit / past perfect). Modalité : individuel. Production attendue : réécriture (premier jet)."
          },
          {
            "nom": "Trace écrite",
            "min": "6 min",
            "desc": "Discours rapporté + lexique du préjugé. Devoir : finaliser la réécriture. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Texte",
            "titre": "Andrea Levy, Small Island (extrait)",
            "src": "Œuvre intégrale — extrait pédagogique"
          },
          {
            "type": "Image",
            "titre": "Affiche de location, Londres années 1950",
            "src": "Museum of London (archive)"
          }
        ]
      },
      {
        "n": 3,
        "titre": "Belonging in verse",
        "objectif": "Explorer l'identité à travers la poésie.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Mot « home » au tableau. Consigne : « Where is 'home' when you have two countries? » Modalité : classe entière. Production attendue : nuage d'idées."
          },
          {
            "nom": "Compréhension de l'oral",
            "min": "22 min",
            "desc": "Écoute de « Hurricane Hits England » (Grace Nichols). Consigne : repérer les images de double appartenance. Modalité : écoute guidée, individuel. Production attendue : 3 images relevées et interprétées."
          },
          {
            "nom": "Phonologie / Oral",
            "min": "19 min",
            "desc": "Consigne : lire une strophe de façon expressive (rythme, pauses, intonation). Modalité : répétition chorale puis binôme. Production attendue : lecture expressive."
          },
          {
            "nom": "Trace écrite",
            "min": "8 min",
            "desc": "Procédés poétiques (métaphore, répétition). Devoir : préparer l'angle de son témoignage. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Audio",
            "titre": "Grace Nichols, « Hurricane Hits England »",
            "src": "Poetry Archive (lecture autrice)"
          },
          {
            "type": "Texte",
            "titre": "Texte du poème (annoté)",
            "src": "Poetry Foundation"
          }
        ]
      },
      {
        "n": 4,
        "titre": "The Windrush scandal",
        "objectif": "Comprendre la trahison de l'appartenance en 2018.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Titre de presse 2018 projeté. Consigne : « What could the 'scandal' be? » Modalité : classe entière. Production attendue : hypothèses."
          },
          {
            "nom": "Médiation",
            "min": "22 min",
            "desc": "Consigne : restituer en anglais une frise chronologique française du scandale, puis dégager la responsabilité. Modalité : binôme. Production attendue : chronologie restituée + responsabilité formulée."
          },
          {
            "nom": "Interaction orale",
            "min": "19 min",
            "desc": "Consigne : « Can you stop belonging to a country you helped build? » Modalité : débat réglé. Production attendue : 2 arguments + 1 réfutation."
          },
          {
            "nom": "Trace écrite",
            "min": "8 min",
            "desc": "Present perfect (they have never been compensated). Devoir : rédiger le témoignage (tâche finale). Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Article",
            "titre": "The Windrush scandal explained (adapté)",
            "src": "The Guardian (2018)"
          },
          {
            "type": "Infographie",
            "titre": "Chronologie du scandale (FR)",
            "src": "Médiation FR→EN (créée)"
          }
        ]
      },
      {
        "n": 5,
        "titre": "Final task — your museum panel",
        "objectif": "Finaliser et présenter le panneau d'exposition.",
        "phases": [
          {
            "nom": "Préparation",
            "min": "15 min",
            "desc": "Consigne : mettre au propre le témoignage + la note curatoriale ; répéter la présentation. Modalité : binôme. Production attendue : panneau prêt."
          },
          {
            "nom": "Production / Présentation",
            "min": "30 min",
            "desc": "Consigne : présenter le panneau façon guide de musée. Modalité : groupe / classe (enregistrement possible). Production attendue : présentation orale incarnée."
          },
          {
            "nom": "Co-évaluation",
            "min": "10 min",
            "desc": "Consigne : visite croisée des panneaux + « 2 réussites + 1 conseil ». Modalité : classe entière. Production attendue : feedback à la grille."
          }
        ],
        "supports": [
          {
            "type": "Grille",
            "titre": "Grille d'évaluation EE/EOC (CECRL B2)",
            "src": "Ressource enseignant (créée)"
          }
        ]
      }
    ],
    "evaluation": {
      "diagnostique": "Nuage de mots autour de « belonging » (S1) pour révéler les représentations.",
      "formative": [
        "Réécriture de scène (S2) — feedback sur les temps du récit",
        "Lecture expressive (S3) — co-évaluation phonologique",
        "Auto-évaluation à mi-parcours (check-list B2)"
      ],
      "sommative": "Panneau « Voices of Windrush » (S5) évalué à la grille B2 : qualité du témoignage, mise en contexte, correction, présentation.",
      "grille": [
        {
          "critere": "Témoignage : crédibilité & ancrage",
          "desc": "Première personne documentée, émotion juste",
          "points": 6
        },
        {
          "critere": "Mise en contexte & médiation",
          "desc": "Note curatoriale claire et exacte",
          "points": 5
        },
        {
          "critere": "Correction grammaticale",
          "desc": "Temps du récit, present perfect, relatives",
          "points": 5
        },
        {
          "critere": "Présentation orale & recevabilité",
          "desc": "Incarnation, fluidité, phonologie",
          "points": 4
        }
      ]
    },
    "differenciation": {
      "soutien": [
        "Version simplifiée de l'extrait de Small Island",
        "Banque de connecteurs et amorces pour le témoignage",
        "Frise pré-traduite pour la médiation"
      ],
      "approfondissement": [
        "Extrait complémentaire du discours d'excuses gouvernemental (2018)",
        "Témoignage intégrant deux générations (parent / enfant)"
      ],
      "modalites": [
        "Individuel (écrits)",
        "Binôme (panneau)",
        "Groupe (débat)",
        "Classe entière (visite des panneaux)"
      ]
    },
    "prolongements": [
      "Filer vers l'axe 2 (Territoire et mémoire) avec la décolonisation et le Commonwealth.",
      "Lecture cursive : Small Island (Andrea Levy) en œuvre intégrale ou adaptée.",
      "Projet interdisciplinaire avec l'histoire : empire et immigrations."
    ],
    "ressourcesProf": [
      "Eduscol — Programme LV de Terminale, axe « Le Royaume-Uni et ses nations ».",
      "British Library / Imperial War Museum — archives Windrush.",
      "Poetry Archive — lectures d'auteurs caribéo-britanniques."
    ],
    "livrables": [
      {
        "nom": "Fiche séquence (synthèse 2 p.)",
        "type": "PDF"
      },
      {
        "nom": "5 fiches de séance détaillées",
        "type": "PDF"
      },
      {
        "nom": "Supports élèves + corrigés",
        "type": "PDF"
      },
      {
        "nom": "Diaporama de présentation par séance",
        "type": "PPT"
      },
      {
        "nom": "Traces écrites structurées",
        "type": "Word"
      },
      {
        "nom": "Grilles d'évaluation (tâche finale)",
        "type": "PDF"
      },
      {
        "nom": "Annexes : lexique & points de grammaire",
        "type": "PDF"
      }
    ]
  },
  {
    "id": "gothic",
    "title": "Monsters in the Mirror — Fiction's Dark Reflection",
    "axe": 3,
    "axeAlt": 5,
    "niveau": "Terminale",
    "statut": "LVA",
    "voie": "Générale",
    "cecrl": "B2",
    "objet": "Fictions et réalités · Les monstres gothiques, miroir de nos peurs",
    "seances": 5,
    "duree": "≈ 5 × 55 min",
    "tokens": 3,
    "note": 4.7,
    "telechargements": 720,
    "badges": [
      "conforme",
      "diff",
      "eval",
      "cle"
    ],
    "visuel": "linear-gradient(135deg,#1f2937,#7f1d1d)",
    "resume": "De Frankenstein à Dracula, le roman gothique britannique met en scène des monstres qui sont d'abord nos peurs. Les élèves analysent ces figures classiques et leurs avatars contemporains, puis réalisent un podcast littéraire révélant la peur réelle derrière un monstre.",
    "problematique": "What do our monsters reveal about us?",
    "idees": [
      "Frankenstein et le savant fou",
      "Les vampires : de Dracula à Twilight",
      "Les zombies comme métaphore sociale",
      "Les décors gothiques (châteaux, landes)",
      "Le cinéma d'horreur et nos peurs",
      "L'IA, enfant de Frankenstein",
      "Histoires de fantômes et l'inquiétant",
      "Le monstre comme « l'Autre »"
    ],
    "ancrage": [
      {
        "type": "Texte",
        "oeuvre": "« Frankenstein » — Mary Shelley",
        "source": "Œuvre (extrait pédagogique)"
      },
      {
        "type": "Texte",
        "oeuvre": "« The Strange Case of Dr Jekyll and Mr Hyde » — R.L. Stevenson",
        "source": "Œuvre (extrait)"
      },
      {
        "type": "Texte",
        "oeuvre": "« Dracula » — Bram Stoker",
        "source": "Œuvre (extrait)"
      },
      {
        "type": "Ressource",
        "oeuvre": "British Library — Discovering Literature: the Gothic",
        "source": "bl.uk"
      }
    ],
    "objectifs": {
      "culturels": [
        "Le roman gothique britannique : Frankenstein (M. Shelley), Dr Jekyll & Mr Hyde (Stevenson), Dracula (Stoker).",
        "Le monstre comme miroir des peurs d'une société : science sans limite, double nature, peur de l'étranger.",
        "Les avatars contemporains du monstre (zombies, vampires, IA) dans la culture populaire anglophone."
      ],
      "langagiers": {
        "Compréhension de l'oral": "Comprendre un extrait de documentaire et un podcast littéraire au débit naturel (B2).",
        "Compréhension de l'écrit": "Analyser un extrait romanesque (point de vue, atmosphère, symbolique).",
        "Expression orale en continu": "Présenter et interpréter un monstre dans un podcast structuré de 3 min.",
        "Expression écrite": "Rédiger l'incipit d'un récit gothique ou l'analyse d'un monstre.",
        "Interaction orale et écrite": "Débattre du sens d'une figure monstrueuse et relancer.",
        "Médiation": "Restituer en anglais l'essentiel d'une note critique en français."
      },
      "grammaire": [
        "Les temps du récit (preterit, past perfect)",
        "Les modaux de déduction (must have, might have, can't have)",
        "Les propositions relatives et la voix passive (a creature that was rejected)"
      ],
      "lexique": [
        "monster, fear, the Other, duality, uncanny, threat, humanity, to haunt",
        "champ lexical de la peur et de l'altérité"
      ],
      "phonologie": [
        "Intonation de suspense et lecture expressive",
        "Accentuation pour l'emphase dramatique"
      ]
    },
    "tacheFinale": {
      "titre": "Write & record a 3-minute literary podcast",
      "consigne": "Réalisez un épisode de podcast littéraire (3 min) : présentez un monstre gothique (classique ou inventé) et révélez la peur humaine réelle qu'il incarne. Appuyez-vous sur au moins deux œuvres de la séquence.",
      "activites": [
        "Expression orale en continu",
        "Expression écrite",
        "Compréhension de l'écrit"
      ],
      "perspective": "L'élève agit en critique-passeur : il interprète une œuvre et la rend audible à un public, dans un format médiatique réel."
    },
    "seancesDetail": [
      {
        "n": 1,
        "titre": "The birth of the monster — Frankenstein",
        "objectif": "Découvrir le monstre créé et la responsabilité du créateur.",
        "phases": [
          {
            "nom": "Anticipation / Lead-in",
            "min": "8 min",
            "desc": "Image de la créature (adaptation). Consigne : « Monster or victim? Justify. » Modalité : classe entière. Production attendue : hypothèses + lexique de la peur."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "26 min",
            "desc": "Extrait de Frankenstein (la créature rejetée s'adresse à Victor). Consigne : repérer le point de vue et le ressenti de la créature. Modalité : individuel, version scaffolded disponible. Production attendue : réponse à « qui est vraiment le monstre ? »."
          },
          {
            "nom": "Production orale",
            "min": "14 min",
            "desc": "Consigne : « Who is responsible — the creature or its creator? » Modalité : binôme. Production attendue : position argumentée en 2 phrases."
          },
          {
            "nom": "Trace écrite",
            "min": "7 min",
            "desc": "Lexique peur / humanité + temps du récit. Devoir : relever une peur de 1818 (la science sans limite). Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Texte",
            "titre": "Mary Shelley, Frankenstein (extrait)",
            "src": "Œuvre intégrale — extrait pédagogique"
          },
          {
            "type": "Image",
            "titre": "The Creature (adaptation, illustration)",
            "src": "Wikimedia Commons (domaine public)"
          }
        ]
      },
      {
        "n": 2,
        "titre": "The beast within — Jekyll & Hyde",
        "objectif": "Explorer la double nature humaine.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Consigne : « Do we all have a hidden side? » Modalité : classe entière. Production attendue : réactions et premières idées."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "26 min",
            "desc": "Extrait de Dr Jekyll & Mr Hyde (la transformation). Consigne : repérer les marqueurs de la dualité. Modalité : individuel. Production attendue : champ lexical du double relevé."
          },
          {
            "nom": "Production écrite",
            "min": "16 min",
            "desc": "Consigne : écrire la pensée secrète d'un personnage à double face (≈ 60 mots). Modalité : individuel. Production attendue : court texte introspectif."
          },
          {
            "nom": "Trace écrite",
            "min": "6 min",
            "desc": "Modaux de déduction (he must have changed) + passif. Devoir : finaliser le texte. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Texte",
            "titre": "R.L. Stevenson, The Strange Case of Dr Jekyll and Mr Hyde (extrait)",
            "src": "Œuvre intégrale — extrait pédagogique"
          },
          {
            "type": "Image",
            "titre": "Victorian illustration of the transformation",
            "src": "Wikimedia Commons (domaine public)"
          }
        ]
      },
      {
        "n": 3,
        "titre": "Fear made flesh — Dracula & the Other",
        "objectif": "Comprendre le monstre comme peur de l'étranger et de la contagion.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "7 min",
            "desc": "Carte (Transylvanie → Londres) + image de Dracula. Consigne : « Why does the monster come from 'abroad'? » Modalité : classe entière. Production attendue : hypothèses."
          },
          {
            "nom": "Médiation",
            "min": "22 min",
            "desc": "Consigne : restituer en anglais une note critique française (Dracula et la peur victorienne de l'étranger / de la maladie). Modalité : binôme. Production attendue : 3 idées clés restituées."
          },
          {
            "nom": "Interaction orale",
            "min": "19 min",
            "desc": "Consigne : débat « Are monsters always 'the Other'? » Modalité : groupes. Production attendue : 2 arguments + 1 réfutation."
          },
          {
            "nom": "Trace écrite",
            "min": "7 min",
            "desc": "Propositions relatives + lexique de l'altérité. Devoir : choisir son monstre pour la tâche finale. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Texte",
            "titre": "Bram Stoker, Dracula (extrait)",
            "src": "Œuvre intégrale — extrait pédagogique"
          },
          {
            "type": "Document",
            "titre": "Note critique (FR) — Dracula et la peur de l'autre",
            "src": "Médiation FR→EN (créée)"
          }
        ]
      },
      {
        "n": 4,
        "titre": "Monsters today",
        "objectif": "Relier les monstres classiques aux peurs contemporaines.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Galerie (zombie, vampire moderne, IA). Consigne : « Which real fear does each one embody? » Modalité : classe entière. Production attendue : appariement monstre → peur."
          },
          {
            "nom": "Compréhension de l'oral",
            "min": "24 min",
            "desc": "Extrait de documentaire / podcast sur les monstres de la pop culture. Consigne : compléter le tableau « monstre / peur actuelle ». Modalité : écoute fractionnée, individuel. Production attendue : tableau renseigné."
          },
          {
            "nom": "Production orale",
            "min": "17 min",
            "desc": "Consigne : pitcher en 1 min un monstre moderne et la peur qu'il incarne. Modalité : binôme. Production attendue : pitch oral."
          },
          {
            "nom": "Trace écrite",
            "min": "8 min",
            "desc": "Structurer un propos (intro / argument / exemple). Devoir : préparer le script du podcast. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Vidéo",
            "titre": "Why we love monsters (documentaire, extrait)",
            "src": "BBC / TED-Ed (sous-titré)"
          },
          {
            "type": "Image",
            "titre": "Modern monsters — film stills (référence)",
            "src": "Référence — usage pédagogique en classe"
          }
        ]
      },
      {
        "n": 5,
        "titre": "Final task — your literary podcast",
        "objectif": "Réaliser et évaluer le podcast littéraire.",
        "phases": [
          {
            "nom": "Préparation",
            "min": "15 min",
            "desc": "Consigne : relire la grille, répéter, travailler l'intonation de suspense. Modalité : individuel / binôme. Production attendue : script prêt à enregistrer."
          },
          {
            "nom": "Production",
            "min": "30 min",
            "desc": "Consigne : enregistrer l'épisode (3 min) en mobilisant ≥ 2 œuvres. Modalité : individuel (ENT), professeur en appui. Production attendue : épisode enregistré."
          },
          {
            "nom": "Co-évaluation",
            "min": "10 min",
            "desc": "Consigne : écouter un épisode et donner « 2 réussites + 1 conseil ». Modalité : binômes croisés. Production attendue : feedback à la grille."
          }
        ],
        "supports": [
          {
            "type": "Grille",
            "titre": "Grille d'évaluation EOC (CECRL B2)",
            "src": "Ressource enseignant (créée)"
          }
        ]
      }
    ],
    "evaluation": {
      "diagnostique": "Nuage « What makes a monster scary? » (S1) pour révéler les représentations.",
      "formative": [
        "Pensée du double (S2) — feedback sur les temps et les modaux",
        "Pitch (S4) — feedback sur la structure",
        "Auto-évaluation à mi-parcours (check-list B2)"
      ],
      "sommative": "Podcast littéraire (S5) évalué à la grille CECRL B2 : interprétation, richesse, correction, recevabilité phonologique.",
      "grille": [
        {
          "critere": "Pertinence & interprétation",
          "desc": "Lien monstre ↔ peur réelle, ≥ 2 œuvres",
          "points": 6
        },
        {
          "critere": "Richesse & précision lexicale",
          "desc": "Lexique de la peur / altérité maîtrisé",
          "points": 5
        },
        {
          "critere": "Correction grammaticale",
          "desc": "Récit, modaux de déduction, relatives",
          "points": 5
        },
        {
          "critere": "Recevabilité phonologique & impact",
          "desc": "Suspense, intonation, fluidité",
          "points": 4
        }
      ]
    },
    "differenciation": {
      "soutien": [
        "Extrait simplifié de Frankenstein",
        "Banque lexicale de la peur et de l'altérité",
        "Trame de script pour le podcast"
      ],
      "approfondissement": [
        "Comparaison de deux monstres / deux époques",
        "Intégrer et analyser une citation de l'œuvre"
      ],
      "modalites": [
        "Individuel (écrits)",
        "Binôme (oral)",
        "Groupe (débat)",
        "Classe entière (mises en commun)"
      ]
    },
    "prolongements": [
      "Filer vers l'axe 5 (Citoyenneté et mondes virtuels) avec l'IA comme « monstre » moderne.",
      "Lecture cursive : Frankenstein ou Dr Jekyll and Mr Hyde (version adaptée).",
      "HLP / cinéma : le gothique au cinéma britannique."
    ],
    "ressourcesProf": [
      "Eduscol — Programme LV de Terminale, axe « Fictions et réalités ».",
      "British Library — Discovering Literature: the Gothic.",
      "BBC — adaptations et ressources sur le roman gothique."
    ],
    "livrables": [
      {
        "nom": "Fiche séquence (synthèse 2 p.)",
        "type": "PDF"
      },
      {
        "nom": "5 fiches de séance détaillées",
        "type": "PDF"
      },
      {
        "nom": "Supports élèves + corrigés",
        "type": "PDF"
      },
      {
        "nom": "Diaporama de présentation par séance",
        "type": "PPT"
      },
      {
        "nom": "Traces écrites structurées",
        "type": "Word"
      },
      {
        "nom": "Grilles d'évaluation (tâche finale)",
        "type": "PDF"
      },
      {
        "nom": "Annexes : lexique & points de grammaire",
        "type": "PDF"
      }
    ]
  },
  {
    "id": "women-voices",
    "title": "Out of the Shadows — Women in the Public Sphere",
    "axe": 1,
    "axeAlt": 2,
    "niveau": "Terminale",
    "statut": "LVA",
    "voie": "Générale",
    "cecrl": "B2",
    "objet": "Espace privé et espace public · Les femmes et la conquête de l'espace public",
    "seances": 5,
    "duree": "≈ 5 × 55 min",
    "tokens": 3,
    "note": 4.8,
    "telechargements": 760,
    "badges": [
      "conforme",
      "diff",
      "eval",
      "cle"
    ],
    "visuel": "linear-gradient(135deg,#5b21b6,#db2777)",
    "resume": "Des suffragettes au plafond de verre : comment des combats nés dans la sphère privée ont transformé l'espace public. Les élèves analysent discours et trajectoires, puis prononcent un discours sur une femme qui a changé le monde public.",
    "problematique": "How did the private struggles of women reshape the public world?",
    "idees": [
      "Les suffragettes",
      "Le mouvement #MeToo",
      "Le plafond de verre",
      "Femmes en politique / premières dirigeantes",
      "Femmes de science (hidden figures)",
      "Le débat sur les droits reproductifs",
      "Sport et égalité salariale",
      "Pionnières et exploratrices"
    ],
    "ancrage": [
      {
        "type": "Discours",
        "oeuvre": "Emmeline Pankhurst — « Freedom or Death »",
        "source": "1913 (texte)"
      },
      {
        "type": "Discours",
        "oeuvre": "Malala Yousafzai — discours à l'ONU",
        "source": "2013 (vidéo sous-titrée)"
      },
      {
        "type": "Film",
        "oeuvre": "Suffragette (2015) / Made in Dagenham (2010)",
        "source": "Référence — usage pédagogique"
      }
    ],
    "objectifs": {
      "culturels": [
        "Le mouvement des suffragettes au Royaume-Uni (« Deeds not words ») et le droit de vote.",
        "Les femmes dans la vie publique : politique, sciences, travail, plafond de verre.",
        "Du privé au public : comment des combats intimes deviennent des enjeux de société (#MeToo)."
      ],
      "langagiers": {
        "Compréhension de l'oral": "Comprendre le détail d'un discours et d'un témoignage (B2).",
        "Compréhension de l'écrit": "Analyser un texte argumentatif et un discours historique.",
        "Expression orale en continu": "Prononcer un discours argumenté et incarné (3 min).",
        "Expression écrite": "Rédiger un paragraphe argumentatif nuancé.",
        "Interaction orale et écrite": "Débattre des frontières du privé et du public.",
        "Médiation": "Restituer en anglais l'essentiel d'un repère historique en français."
      },
      "grammaire": [
        "Les temps du récit et le present perfect",
        "La voix passive (women were denied…)",
        "Les modaux et les structures d'insistance (it was only when…)"
      ],
      "lexique": [
        "rights, suffrage, equality, the public sphere, glass ceiling, to campaign, to speak out",
        "champ lexical de l'engagement et de l'égalité"
      ],
      "phonologie": [
        "Formes faibles et accentuation rhétorique",
        "Intonation du discours engagé"
      ]
    },
    "tacheFinale": {
      "titre": "Deliver a 3-minute tribute speech",
      "consigne": "Préparez et prononcez un discours (3 min) rendant hommage à une femme qui a fait passer une cause de la sphère privée à la sphère publique. Présentez son combat, ses obstacles et son héritage, en mobilisant au moins deux documents de la séquence.",
      "activites": [
        "Expression orale en continu",
        "Expression écrite",
        "Compréhension de l'écrit"
      ],
      "perspective": "L'élève agit en orateur : il s'adresse à un public pour faire reconnaître un combat et son héritage."
    },
    "seancesDetail": [
      {
        "n": 1,
        "titre": "Deeds not words",
        "objectif": "Découvrir les suffragettes et leur combat.",
        "phases": [
          {
            "nom": "Anticipation / Lead-in",
            "min": "8 min",
            "desc": "Affiche / photo de suffragettes. Consigne : « What were they fighting for, and how? » Modalité : classe entière. Production attendue : hypothèses."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "26 min",
            "desc": "Texte sur le mouvement (WSPU, « Deeds not words »). Consigne : repérer revendications, méthodes, obstacles. Modalité : individuel puis binôme. Production attendue : carte du combat."
          },
          {
            "nom": "Production orale",
            "min": "14 min",
            "desc": "Consigne : « Were militant methods justified? » Modalité : binôme. Production attendue : avis nuancé."
          },
          {
            "nom": "Trace écrite",
            "min": "7 min",
            "desc": "Lexique de l'engagement + voix passive. Devoir : relever une autre pionnière. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Texte",
            "titre": "The suffragettes: deeds not words (adapté)",
            "src": "Adapté — British Library"
          },
          {
            "type": "Image",
            "titre": "Suffragette march, early 1900s",
            "src": "Library of Congress (domaine public)"
          }
        ]
      },
      {
        "n": 2,
        "titre": "Breaking the ceiling",
        "objectif": "Comprendre la place des femmes dans la vie publique.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Métaphore du « glass ceiling ». Consigne : « What does this image mean? » Modalité : classe entière. Production attendue : interprétation."
          },
          {
            "nom": "Compréhension de l'oral",
            "min": "26 min",
            "desc": "Témoignage / portrait audio (femme en politique ou science). Consigne : compléter « obstacle / stratégie / impact ». Modalité : écoute fractionnée, individuel. Production attendue : grille renseignée."
          },
          {
            "nom": "Production écrite",
            "min": "16 min",
            "desc": "Consigne : paragraphe « The glass ceiling still exists because… » Modalité : individuel. Production attendue : paragraphe argumentatif."
          },
          {
            "nom": "Trace écrite",
            "min": "6 min",
            "desc": "Connecteurs argumentatifs + present perfect. Devoir : finaliser le paragraphe. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Audio",
            "titre": "Breaking the glass ceiling (portrait, extrait)",
            "src": "BBC / TED (adapté)"
          },
          {
            "type": "Image",
            "titre": "Woman leader at a podium",
            "src": "Wikimedia Commons (CC)"
          }
        ]
      },
      {
        "n": 3,
        "titre": "Private struggles, public change",
        "objectif": "Comprendre le passage du privé au public.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Citation « The personal is political ». Consigne : « What does it mean? » Modalité : classe entière. Production attendue : interprétation."
          },
          {
            "nom": "Médiation",
            "min": "22 min",
            "desc": "Consigne : restituer en anglais une frise française (avancées des droits des femmes), puis relier au mouvement #MeToo. Modalité : binôme. Production attendue : repères restitués + un lien."
          },
          {
            "nom": "Interaction orale",
            "min": "19 min",
            "desc": "Consigne : débat « Where is the line between private and public? » Modalité : petits groupes. Production attendue : 2 arguments + 1 réfutation."
          },
          {
            "nom": "Trace écrite",
            "min": "7 min",
            "desc": "Structures d'insistance + lexique privé/public. Devoir : choisir la femme du discours. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Infographie",
            "titre": "Droits des femmes : repères (FR)",
            "src": "Médiation FR→EN (créée)"
          },
          {
            "type": "Article",
            "titre": "When the personal became political (adapté)",
            "src": "The Guardian"
          }
        ]
      },
      {
        "n": 4,
        "titre": "The power of words",
        "objectif": "Analyser un discours engagé pour préparer le sien.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Court extrait d'un discours de femme célèbre. Consigne : « What makes it powerful? » Modalité : classe entière. Production attendue : premiers procédés repérés."
          },
          {
            "nom": "Compréhension de l'oral",
            "min": "24 min",
            "desc": "Discours (extrait). Consigne : repérer la structure et les procédés rhétoriques (anaphore, contraste). Modalité : écoute en deux temps + script lacunaire. Production attendue : procédés relevés."
          },
          {
            "nom": "Phonologie / Oral",
            "min": "17 min",
            "desc": "Consigne : lecture expressive d'un passage (emphase, pauses). Modalité : répétition chorale puis binôme. Production attendue : lecture travaillée."
          },
          {
            "nom": "Trace écrite",
            "min": "8 min",
            "desc": "Boîte à procédés rhétoriques. Devoir : écrire le plan du discours. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Vidéo",
            "titre": "A famous speech by a woman (extrait)",
            "src": "Domaine public / UN (sous-titré)"
          },
          {
            "type": "Texte",
            "titre": "Transcript annoté",
            "src": "Ressource enseignant (créée)"
          }
        ]
      },
      {
        "n": 5,
        "titre": "Final task — your tribute speech",
        "objectif": "Prononcer et évaluer le discours.",
        "phases": [
          {
            "nom": "Préparation",
            "min": "15 min",
            "desc": "Consigne : relire la grille, répéter, travailler l'intonation. Modalité : individuel / binôme. Production attendue : discours prêt."
          },
          {
            "nom": "Production",
            "min": "30 min",
            "desc": "Consigne : prononcer / enregistrer le discours (3 min). Modalité : individuel (ENT), professeur en appui. Production attendue : discours enregistré."
          },
          {
            "nom": "Co-évaluation",
            "min": "10 min",
            "desc": "Consigne : « 2 réussites + 1 conseil » à la grille. Modalité : binômes croisés. Production attendue : feedback."
          }
        ],
        "supports": [
          {
            "type": "Grille",
            "titre": "Grille d'évaluation EOC (CECRL B2)",
            "src": "Ressource enseignant (créée)"
          }
        ]
      }
    ],
    "evaluation": {
      "diagnostique": "« What does 'public sphere' mean? » (S1) pour révéler les représentations.",
      "formative": [
        "Paragraphe glass ceiling (S2) — feedback argumentatif",
        "Médiation (S3) — feedback sur la restitution",
        "Lecture expressive (S4) — co-évaluation phonologique"
      ],
      "sommative": "Discours (S5) évalué à la grille CECRL B2 : argumentation, incarnation, correction, recevabilité phonologique.",
      "grille": [
        {
          "critere": "Pertinence & argumentation",
          "desc": "Combat, obstacles, héritage ; ≥ 2 documents",
          "points": 6
        },
        {
          "critere": "Richesse & précision lexicale",
          "desc": "Lexique engagement / égalité maîtrisé",
          "points": 5
        },
        {
          "critere": "Correction grammaticale",
          "desc": "Récit, passif, structures d'insistance",
          "points": 5
        },
        {
          "critere": "Recevabilité phonologique & impact",
          "desc": "Emphase, intonation, fluidité",
          "points": 4
        }
      ]
    },
    "differenciation": {
      "soutien": [
        "Script lacunaire du discours (S4)",
        "Banque de procédés rhétoriques",
        "Plan guidé du discours final"
      ],
      "approfondissement": [
        "Comparer deux trajectoires (UK / USA)",
        "Intégrer une objection anticipée au discours"
      ],
      "modalites": [
        "Individuel (écrits & discours)",
        "Binôme (médiation)",
        "Groupe (débat)",
        "Classe entière (mises en commun)"
      ]
    },
    "prolongements": [
      "Filer vers l'axe 2 (Territoire et mémoire) avec la mémoire des luttes.",
      "Lecture cursive : un discours féministe (extrait).",
      "EMC : égalité femmes-hommes et droit."
    ],
    "ressourcesProf": [
      "Eduscol — Programme LV de Terminale, axe « Espace privé et espace public ».",
      "British Library — Votes for Women.",
      "UN Women / TED — discours et ressources."
    ],
    "livrables": [
      {
        "nom": "Fiche séquence (synthèse 2 p.)",
        "type": "PDF"
      },
      {
        "nom": "5 fiches de séance détaillées",
        "type": "PDF"
      },
      {
        "nom": "Supports élèves + corrigés",
        "type": "PDF"
      },
      {
        "nom": "Diaporama de présentation par séance",
        "type": "PPT"
      },
      {
        "nom": "Traces écrites structurées",
        "type": "Word"
      },
      {
        "nom": "Grilles d'évaluation (tâche finale)",
        "type": "PDF"
      },
      {
        "nom": "Annexes : lexique & points de grammaire",
        "type": "PDF"
      }
    ]
  },
  {
    "id": "native-land",
    "title": "Whose Land Is It? — Frontier, Loss & Native Memory",
    "axe": 2,
    "axeAlt": 6,
    "niveau": "Terminale",
    "statut": "LVA",
    "voie": "Générale",
    "cecrl": "B2",
    "objet": "Territoire et mémoire · La frontière américaine et la mémoire amérindienne",
    "seances": 5,
    "duree": "≈ 5 × 55 min",
    "tokens": 3,
    "note": 4.8,
    "telechargements": 690,
    "badges": [
      "conforme",
      "diff",
      "eval",
      "cle"
    ],
    "visuel": "linear-gradient(135deg,#7c2d12,#a16207)",
    "resume": "Du mythe de la frontière à la Piste des Larmes, jusqu'à Standing Rock : à qui appartient la mémoire d'une terre ? Les élèves confrontent récit national et voix amérindiennes, puis conçoivent un panneau de musée sur la mémoire d'un territoire.",
    "problematique": "Who owns the memory of a land?",
    "idees": [
      "Manifest Destiny et la frontière",
      "La Piste des Larmes",
      "Standing Rock et #NoDAPL",
      "Les réserves aujourd'hui",
      "Terres et sites sacrés",
      "Le renouveau des langues autochtones",
      "Les « land acknowledgments »",
      "Le mythe de l'Ouest au cinéma"
    ],
    "ancrage": [
      {
        "type": "Œuvre",
        "oeuvre": "« American Progress » — John Gast",
        "source": "1872 (domaine public)"
      },
      {
        "type": "Texte",
        "oeuvre": "« Bury My Heart at Wounded Knee » — Dee Brown (extrait)",
        "source": "1970"
      },
      {
        "type": "Événement",
        "oeuvre": "Standing Rock — #NoDAPL",
        "source": "Actualité, 2016 (presse / vidéo)"
      },
      {
        "type": "Document",
        "oeuvre": "The Trail of Tears",
        "source": "Smithsonian (NMAI) / Library of Congress"
      }
    ],
    "objectifs": {
      "culturels": [
        "Le mythe de la frontière et la « Destinée manifeste » aux États-Unis.",
        "La dépossession amérindienne : la Piste des Larmes (Trail of Tears).",
        "Les voix amérindiennes aujourd'hui : Standing Rock et la défense de la terre."
      ],
      "langagiers": {
        "Compréhension de l'oral": "Comprendre le détail d'un récit historique et d'un témoignage (B2).",
        "Compréhension de l'écrit": "Analyser un texte et confronter les points de vue.",
        "Expression orale en continu": "Présenter un panneau de musée de façon incarnée.",
        "Expression écrite": "Rédiger une notice et un témoignage documenté.",
        "Interaction orale et écrite": "Débattre de la mémoire et de la réparation.",
        "Médiation": "Restituer en anglais une carte ou une frise en français."
      },
      "grammaire": [
        "Les temps du récit (preterit, past perfect)",
        "La voix passive (the land was taken)",
        "Le present perfect et le discours rapporté"
      ],
      "lexique": [
        "land, frontier, removal, memory, ancestors, treaty, sacred, to dispossess",
        "champ lexical du territoire et de la mémoire"
      ],
      "phonologie": [
        "Connected speech dans le récit",
        "Lecture expressive d'un témoignage"
      ]
    },
    "tacheFinale": {
      "titre": "Create a « memory of a land » museum panel",
      "consigne": "En binôme, réalisez un panneau de musée sur la mémoire d'un territoire : une notice de cadrage + un témoignage à la première personne (≈ 150 mots), confrontant récit officiel et mémoire amérindienne. Présentez-le comme un·e guide.",
      "activites": [
        "Expression écrite",
        "Expression orale en continu",
        "Médiation"
      ],
      "perspective": "L'élève agit en passeur de mémoire : il fait entendre des voix longtemps tues."
    },
    "seancesDetail": [
      {
        "n": 1,
        "titre": "Manifest Destiny",
        "objectif": "Comprendre le mythe de la frontière.",
        "phases": [
          {
            "nom": "Anticipation / Lead-in",
            "min": "8 min",
            "desc": "Tableau « American Progress » (Gast, 1872). Consigne : « Who advances, who retreats? » Modalité : classe entière. Production attendue : lecture d'image guidée."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "26 min",
            "desc": "Texte sur la Destinée manifeste. Consigne : repérer la justification de l'expansion. Modalité : individuel puis binôme. Production attendue : logique du mythe reformulée."
          },
          {
            "nom": "Production orale",
            "min": "14 min",
            "desc": "Consigne : « Progress for whom? » Modalité : binôme. Production attendue : prise de position."
          },
          {
            "nom": "Trace écrite",
            "min": "7 min",
            "desc": "Lexique du territoire + voix passive. Devoir : relever un peuple amérindien et sa terre. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Image",
            "titre": "« American Progress », John Gast (1872)",
            "src": "Library of Congress (domaine public)"
          },
          {
            "type": "Texte",
            "titre": "Manifest Destiny explained (adapté)",
            "src": "Adapté — Smithsonian"
          }
        ]
      },
      {
        "n": 2,
        "titre": "The Trail of Tears",
        "objectif": "Comprendre la dépossession et la perte.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Carte de la Piste des Larmes. Consigne : « What does this route represent? » Modalité : classe entière. Production attendue : hypothèses."
          },
          {
            "nom": "Compréhension de l'oral",
            "min": "26 min",
            "desc": "Récit / témoignage sur le Removal. Consigne : compléter « avant / déplacement / conséquence ». Modalité : écoute fractionnée, individuel. Production attendue : grille renseignée."
          },
          {
            "nom": "Production écrite",
            "min": "16 min",
            "desc": "Consigne : écrire le témoignage d'un·e déplacé·e (≈ 100 mots, temps du récit). Modalité : individuel. Production attendue : témoignage (premier jet)."
          },
          {
            "nom": "Trace écrite",
            "min": "6 min",
            "desc": "Preterit / past perfect + lexique de la perte. Devoir : finaliser le témoignage. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Image",
            "titre": "The Trail of Tears (carte / peinture)",
            "src": "Library of Congress (domaine public)"
          },
          {
            "type": "Audio",
            "titre": "A removal testimony (adapté)",
            "src": "Ressource enseignant (créée)"
          }
        ]
      },
      {
        "n": 3,
        "titre": "Land and memory today",
        "objectif": "Découvrir les voix amérindiennes contemporaines.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Image de Standing Rock (#NoDAPL). Consigne : « Why defend this land today? » Modalité : classe entière. Production attendue : hypothèses."
          },
          {
            "nom": "Médiation",
            "min": "22 min",
            "desc": "Consigne : restituer en anglais une frise française (terres et traités), puis relier à Standing Rock. Modalité : binôme. Production attendue : repères restitués + un lien."
          },
          {
            "nom": "Interaction orale",
            "min": "19 min",
            "desc": "Consigne : débat « Can a wrong of the past be repaired? » Modalité : petits groupes. Production attendue : 2 arguments + 1 réfutation."
          },
          {
            "nom": "Trace écrite",
            "min": "7 min",
            "desc": "Present perfect + discours rapporté. Devoir : choisir le territoire du panneau. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Article",
            "titre": "Standing Rock and the fight for the land (adapté)",
            "src": "The Guardian / NYT"
          },
          {
            "type": "Infographie",
            "titre": "Terres et traités (FR)",
            "src": "Médiation FR→EN (créée)"
          }
        ]
      },
      {
        "n": 4,
        "titre": "Two stories, one land",
        "objectif": "Confronter récit officiel et mémoire amérindienne.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Deux légendes d'un même lieu (officielle / amérindienne). Consigne : « Same place, same story? » Modalité : classe entière. Production attendue : contraste relevé."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "24 min",
            "desc": "Deux courts textes opposés. Consigne : comparer points de vue et silences. Modalité : individuel, version scaffolded disponible. Production attendue : tableau comparatif."
          },
          {
            "nom": "Production écrite",
            "min": "17 min",
            "desc": "Consigne : rédiger la notice de cadrage du panneau (neutre mais juste). Modalité : binôme. Production attendue : notice."
          },
          {
            "nom": "Trace écrite",
            "min": "8 min",
            "desc": "Lexique du point de vue + connecteurs. Devoir : préparer la présentation. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Texte",
            "titre": "One land, two memories (textes adaptés)",
            "src": "Ressource enseignant (créée)"
          },
          {
            "type": "Image",
            "titre": "A contested site",
            "src": "Wikimedia Commons (CC)"
          }
        ]
      },
      {
        "n": 5,
        "titre": "Final task — your museum panel",
        "objectif": "Finaliser et présenter le panneau.",
        "phases": [
          {
            "nom": "Préparation",
            "min": "15 min",
            "desc": "Consigne : mettre au propre notice + témoignage, répéter. Modalité : binôme. Production attendue : panneau prêt."
          },
          {
            "nom": "Production / Présentation",
            "min": "30 min",
            "desc": "Consigne : présenter le panneau façon guide. Modalité : groupe / classe. Production attendue : présentation incarnée."
          },
          {
            "nom": "Co-évaluation",
            "min": "10 min",
            "desc": "Consigne : visite croisée + « 2 réussites + 1 conseil ». Modalité : classe entière. Production attendue : feedback à la grille."
          }
        ],
        "supports": [
          {
            "type": "Grille",
            "titre": "Grille d'évaluation EE/EOC (CECRL B2)",
            "src": "Ressource enseignant (créée)"
          }
        ]
      }
    ],
    "evaluation": {
      "diagnostique": "« Who writes history? » (S1) pour révéler les représentations.",
      "formative": [
        "Témoignage (S2) — feedback sur les temps du récit",
        "Médiation (S3) — feedback sur la restitution",
        "Tableau comparatif (S4) — relecture par les pairs"
      ],
      "sommative": "Panneau de musée (S5) évalué à la grille B2 : justesse historique, confrontation des points de vue, correction, présentation.",
      "grille": [
        {
          "critere": "Confrontation des mémoires & justesse",
          "desc": "Récit officiel et voix amérindienne présentés",
          "points": 6
        },
        {
          "critere": "Richesse & précision lexicale",
          "desc": "Lexique territoire / mémoire maîtrisé",
          "points": 5
        },
        {
          "critere": "Correction grammaticale",
          "desc": "Temps du récit, passif, present perfect",
          "points": 5
        },
        {
          "critere": "Présentation orale & recevabilité",
          "desc": "Incarnation, fluidité, phonologie",
          "points": 4
        }
      ]
    },
    "differenciation": {
      "soutien": [
        "Textes en version simplifiée (S4)",
        "Banque d'amorces pour le témoignage",
        "Frise pré-traduite pour la médiation"
      ],
      "approfondissement": [
        "Intégrer une citation de traité analysée",
        "Comparer deux territoires contestés"
      ],
      "modalites": [
        "Individuel (écrits)",
        "Binôme (panneau)",
        "Groupe (débat)",
        "Classe entière (visite)"
      ]
    },
    "prolongements": [
      "Filer vers l'axe 6 (Aires anglophones américaines) avec les nations amérindiennes aujourd'hui.",
      "Lecture cursive : un poème ou récit amérindien (auteur anglophone).",
      "Lien histoire-géo : conquête de l'Ouest et frontières."
    ],
    "ressourcesProf": [
      "Eduscol — Programme LV de Terminale, axe « Territoire et mémoire ».",
      "Library of Congress / Smithsonian (NMAI) — fonds amérindiens.",
      "The Guardian / NYT — dossiers Standing Rock."
    ],
    "livrables": [
      {
        "nom": "Fiche séquence (synthèse 2 p.)",
        "type": "PDF"
      },
      {
        "nom": "5 fiches de séance détaillées",
        "type": "PDF"
      },
      {
        "nom": "Supports élèves + corrigés",
        "type": "PDF"
      },
      {
        "nom": "Diaporama de présentation par séance",
        "type": "PPT"
      },
      {
        "nom": "Traces écrites structurées",
        "type": "Word"
      },
      {
        "nom": "Grilles d'évaluation (tâche finale)",
        "type": "PDF"
      },
      {
        "nom": "Annexes : lexique & points de grammaire",
        "type": "PDF"
      }
    ]
  },
  {
    "id": "media-truth",
    "title": "Read Between the Lines — Media, Truth & Manipulation",
    "axe": 4,
    "axeAlt": 5,
    "niveau": "Terminale",
    "statut": "LVA",
    "voie": "Générale",
    "cecrl": "B2",
    "objet": "Enjeux et formes de la communication · Médias, vérité et manipulation",
    "seances": 5,
    "duree": "≈ 5 × 55 min",
    "tokens": 3,
    "note": 4.7,
    "telechargements": 810,
    "badges": [
      "conforme",
      "diff",
      "eval",
      "cle"
    ],
    "visuel": "linear-gradient(135deg,#0c4a6e,#475569)",
    "resume": "Titres, fake news, publicité, deepfakes : dans un monde saturé d'informations, comment distinguer le vrai de la manipulation ? Les élèves développent leur esprit critique et produisent un podcast d'éducation aux médias.",
    "problematique": "In a world of information, how do we tell truth from manipulation?",
    "idees": [
      "Fake news et hoax viraux",
      "Deepfakes et images générées par IA",
      "Les ressorts de la publicité",
      "La propagande, hier et aujourd'hui",
      "Les théories du complot",
      "L'économie de l'attention et le clickbait",
      "Liberté de la presse et journalisme",
      "Fact-checking et éducation aux médias"
    ],
    "ancrage": [
      {
        "type": "Essai",
        "oeuvre": "« Politics and the English Language » — George Orwell",
        "source": "1946 (extrait)"
      },
      {
        "type": "Film",
        "oeuvre": "Wag the Dog (1997) — fabriquer l'information",
        "source": "Référence — usage pédagogique"
      },
      {
        "type": "Ressource",
        "oeuvre": "BBC / Full Fact — fact-checking",
        "source": "bbc.com / fullfact.org"
      }
    ],
    "objectifs": {
      "culturels": [
        "Le pouvoir des médias anglophones : titres, cadrage et « agenda ».",
        "Désinformation et fake news : mécanismes, deepfakes, viralité.",
        "L'art de persuader : publicité, propagande et rhétorique."
      ],
      "langagiers": {
        "Compréhension de l'oral": "Comprendre le détail d'un reportage sur la désinformation (B2).",
        "Compréhension de l'écrit": "Analyser le cadrage et le point de vue d'un article.",
        "Expression orale en continu": "Animer un podcast d'éducation aux médias (3 min).",
        "Expression écrite": "Rédiger une analyse critique argumentée.",
        "Interaction orale et écrite": "Débattre de la responsabilité face à l'information.",
        "Médiation": "Restituer en anglais une infographie française sur les médias."
      },
      "grammaire": [
        "Les modaux de déduction (this might be fake, it can't be true)",
        "La voix passive (the story was shared millions of times)",
        "Les conditionnels et le discours rapporté"
      ],
      "lexique": [
        "media, source, bias, fake news, to manipulate, headline, to fact-check, reliable",
        "champ lexical de l'information et de l'esprit critique"
      ],
      "phonologie": [
        "Intonation de la nuance et du doute",
        "Accentuation contrastive (REAL news / FAKE news)"
      ]
    },
    "tacheFinale": {
      "titre": "Host a media-literacy podcast",
      "consigne": "En binôme, animez un épisode de podcast (3 min) d'éducation aux médias : décryptez un exemple de désinformation (titre, image ou « fait » à vérifier), expliquez le mécanisme et donnez des conseils pour s'informer. Mobilisez au moins deux documents de la séquence.",
      "activites": [
        "Expression orale en continu",
        "Expression écrite",
        "Compréhension de l'écrit"
      ],
      "perspective": "L'élève agit en citoyen éclairé : il outille son public pour résister à la manipulation."
    },
    "seancesDetail": [
      {
        "n": 1,
        "titre": "The power of headlines",
        "objectif": "Comprendre comment les médias cadrent l'information.",
        "phases": [
          {
            "nom": "Anticipation / Lead-in",
            "min": "8 min",
            "desc": "Un même fait, trois titres différents. Consigne : « Same event — why so different? » Modalité : classe entière. Production attendue : effet de cadrage repéré."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "26 min",
            "desc": "Deux articles sur un même sujet. Consigne : repérer faits, opinions et choix de mots. Modalité : individuel puis binôme. Production attendue : grille faits/opinions."
          },
          {
            "nom": "Production orale",
            "min": "14 min",
            "desc": "Consigne : « Can a headline lie without lying? » Modalité : binôme. Production attendue : analyse en 2-3 phrases."
          },
          {
            "nom": "Trace écrite",
            "min": "7 min",
            "desc": "Lexique du cadrage + voix passive. Devoir : relever un titre orienté dans l'actualité. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Texte",
            "titre": "One event, three headlines (corpus adapté)",
            "src": "The Guardian / BBC / tabloïd — adapté"
          },
          {
            "type": "Image",
            "titre": "Front pages comparison",
            "src": "Wikimedia Commons (CC)"
          }
        ]
      },
      {
        "n": 2,
        "titre": "Fake or fact?",
        "objectif": "Comprendre les mécanismes de la désinformation.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Une image virale truquée. Consigne : « Real or fake? How can you tell? » Modalité : classe entière. Production attendue : critères de vérification."
          },
          {
            "nom": "Compréhension de l'oral",
            "min": "26 min",
            "desc": "Reportage sur fake news / deepfakes. Consigne : compléter « exemple / technique / impact ». Modalité : écoute fractionnée, individuel. Production attendue : grille renseignée."
          },
          {
            "nom": "Production écrite",
            "min": "16 min",
            "desc": "Consigne : rédiger 4 conseils « How to spot fake news ». Modalité : individuel. Production attendue : guide en 4 points."
          },
          {
            "nom": "Trace écrite",
            "min": "6 min",
            "desc": "Modaux de déduction (it might be fake). Devoir : finaliser le guide. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Vidéo",
            "titre": "How deepfakes work (reportage, extrait)",
            "src": "BBC / Reuters (adapté)"
          },
          {
            "type": "Infographie",
            "titre": "Repérer une fausse info (FR)",
            "src": "Médiation FR→EN (créée)"
          }
        ]
      },
      {
        "n": 3,
        "titre": "The art of persuasion",
        "objectif": "Décrypter publicité, propagande et rhétorique.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "7 min",
            "desc": "Une publicité et une affiche de propagande. Consigne : « How do they try to convince you? » Modalité : classe entière. Production attendue : procédés repérés."
          },
          {
            "nom": "Compréhension de l'écrit",
            "min": "23 min",
            "desc": "Texte sur les techniques de persuasion (appel à l'émotion, autorité). Consigne : associer technique / exemple. Modalité : binôme. Production attendue : appariement."
          },
          {
            "nom": "Interaction orale",
            "min": "17 min",
            "desc": "Consigne : débat « Should manipulative ads be banned? » Modalité : petits groupes. Production attendue : 2 arguments + 1 réfutation."
          },
          {
            "nom": "Trace écrite",
            "min": "8 min",
            "desc": "Lexique de la persuasion + connecteurs. Devoir : choisir l'exemple à décrypter pour le podcast. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Image",
            "titre": "Advert vs propaganda poster",
            "src": "Library of Congress (domaine public)"
          },
          {
            "type": "Article",
            "titre": "The tricks of persuasion (adapté)",
            "src": "BBC Future"
          }
        ]
      },
      {
        "n": 4,
        "titre": "Be the fact-checker",
        "objectif": "S'entraîner à vérifier et préparer le podcast.",
        "phases": [
          {
            "nom": "Anticipation",
            "min": "6 min",
            "desc": "Une affirmation douteuse projetée. Consigne : « True, false, or misleading? » Modalité : classe entière. Production attendue : hypothèses."
          },
          {
            "nom": "Médiation",
            "min": "22 min",
            "desc": "Consigne : restituer en anglais une infographie française sur la vérification, puis l'appliquer à un cas. Modalité : binôme. Production attendue : démarche de vérification restituée."
          },
          {
            "nom": "Production orale",
            "min": "17 min",
            "desc": "Consigne : préparer le script du podcast (intro, décryptage, conseils). Modalité : binôme. Production attendue : plan du podcast."
          },
          {
            "nom": "Trace écrite",
            "min": "8 min",
            "desc": "Structurer un décryptage + lexique du fact-checking. Devoir : finaliser le script. Modalité : classe entière."
          }
        ],
        "supports": [
          {
            "type": "Infographie",
            "titre": "Vérifier une information (FR)",
            "src": "Médiation FR→EN (créée)"
          },
          {
            "type": "Document",
            "titre": "Fact-checking toolkit",
            "src": "Ressource enseignant (créée)"
          }
        ]
      },
      {
        "n": 5,
        "titre": "Final task — your media-literacy podcast",
        "objectif": "Réaliser et évaluer le podcast.",
        "phases": [
          {
            "nom": "Préparation",
            "min": "15 min",
            "desc": "Consigne : relire la grille, répartir les rôles, répéter. Modalité : binôme. Production attendue : script prêt."
          },
          {
            "nom": "Production",
            "min": "30 min",
            "desc": "Consigne : enregistrer le podcast (3 min). Modalité : binôme (ENT), professeur en appui. Production attendue : épisode enregistré."
          },
          {
            "nom": "Co-évaluation",
            "min": "10 min",
            "desc": "Consigne : « 2 réussites + 1 conseil » à la grille. Modalité : binômes croisés. Production attendue : feedback."
          }
        ],
        "supports": [
          {
            "type": "Grille",
            "titre": "Grille d'évaluation EOC (CECRL B2)",
            "src": "Ressource enseignant (créée)"
          }
        ]
      }
    ],
    "evaluation": {
      "diagnostique": "« Where do you get your news, and do you trust it? » (S1) pour révéler les pratiques.",
      "formative": [
        "Guide « spot fake news » (S2) — feedback sur les modaux",
        "Médiation (S4) — feedback sur la restitution",
        "Auto-évaluation à mi-parcours (check-list B2)"
      ],
      "sommative": "Podcast (S5) évalué à la grille CECRL B2 : décryptage, esprit critique, correction, recevabilité phonologique.",
      "grille": [
        {
          "critere": "Pertinence du décryptage & esprit critique",
          "desc": "Mécanisme expliqué, conseils utiles, ≥ 2 documents",
          "points": 6
        },
        {
          "critere": "Richesse & précision lexicale",
          "desc": "Lexique des médias maîtrisé",
          "points": 5
        },
        {
          "critere": "Correction grammaticale",
          "desc": "Modaux de déduction, passif, conditionnels",
          "points": 5
        },
        {
          "critere": "Recevabilité phonologique & impact",
          "desc": "Nuance, intonation, fluidité",
          "points": 4
        }
      ]
    },
    "differenciation": {
      "soutien": [
        "Grille faits/opinions pré-structurée",
        "Banque d'amorces pour le décryptage",
        "Infographie pré-traduite pour la médiation"
      ],
      "approfondissement": [
        "Décrypter un deepfake plus complexe",
        "Intégrer une mise en perspective historique (propagande)"
      ],
      "modalites": [
        "Individuel (écrits)",
        "Binôme (podcast)",
        "Groupe (débat)",
        "Classe entière (mises en commun)"
      ]
    },
    "prolongements": [
      "Filer vers l'axe 5 (Citoyenneté et mondes virtuels) avec la surveillance et les données.",
      "Lecture cursive : un essai sur la post-vérité (extrait).",
      "EMI : atelier de fact-checking sur l'actualité."
    ],
    "ressourcesProf": [
      "Eduscol — Programme LV de Terminale, axe « Enjeux et formes de la communication ».",
      "BBC / Reuters Institute — éducation aux médias.",
      "First Draft / Full Fact — ressources de vérification."
    ],
    "livrables": [
      {
        "nom": "Fiche séquence (synthèse 2 p.)",
        "type": "PDF"
      },
      {
        "nom": "5 fiches de séance détaillées",
        "type": "PDF"
      },
      {
        "nom": "Supports élèves + corrigés",
        "type": "PDF"
      },
      {
        "nom": "Diaporama de présentation par séance",
        "type": "PPT"
      },
      {
        "nom": "Traces écrites structurées",
        "type": "Word"
      },
      {
        "nom": "Grilles d'évaluation (tâche finale)",
        "type": "PDF"
      },
      {
        "nom": "Annexes : lexique & points de grammaire",
        "type": "PDF"
      }
    ]
  }
];

/* Assemblage global (Seconde → Première → Terminale) */
const SEQUENCES = [].concat(SEQ_SECONDE, SEQ_PREMIERE, SEQ_TERMINALE);
