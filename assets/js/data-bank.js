/* ============================================================
   BANQUE D'EXERCICES
   ============================================================ */
const EXERCICES = [
  /* ---------- GRAMMAIRE ---------- */
  { id: "e1", titre: "Present perfect vs. preterit — drill", competence: "Grammaire", difficulte: "★", type: "Texte à trous", axe: 6, niveau: "Première", tokens: 0,
    desc: "8 phrases à compléter, contexte « immigration & American Dream ». Corrigé inclus.",
    consigne: "Complétez avec le present perfect (have/has + participe) ou le prétérit, selon le contexte.",
    items: [
      "1. My great-grandfather ______ (arrive) at Ellis Island in 1912.",
      "2. Since then, our family ______ (live) in the United States.",
      "3. ______ you ever ______ (visit) New York?",
      "4. During the Great Depression, millions ______ (lose) their jobs.",
      "5. We ______ (not / finish) studying the American Dream yet.",
      "6. Martin Luther King ______ (deliver) his speech in 1963.",
      "7. The 'self-made man' ideal ______ (change) a lot since the 19th century.",
      "8. I ______ (just / read) an article about social mobility.",
    ],
    corrige: ["1. arrived", "2. has lived", "3. Have … visited", "4. lost", "5. haven't finished", "6. delivered", "7. has changed", "8. have just read"] },

  { id: "e9", titre: "Modals of deduction — must / might / can't", competence: "Grammaire", difficulte: "★★", type: "QCM", axe: 5, niveau: "Terminale", tokens: 0,
    desc: "Déduire le degré de certitude. Contexte « médias & surveillance ».",
    consigne: "Complétez avec must, might/may ou can't (déduction).",
    items: [
      "1. The pavement is wet. It ______ have rained.",
      "2. She didn't reply. She ______ be busy — I'm not certain.",
      "3. He ______ be the hacker: he had no computer access that day.",
      "4. This image looks edited. It ______ be a deepfake.",
      "5. They've been driving for ten hours; they ______ be exhausted.",
      "6. That story has no sources — it ______ be true.",
    ],
    corrige: ["1. must", "2. might / may", "3. can't", "4. might / may", "5. must", "6. can't"] },

  { id: "e10", titre: "The passive voice — transformation", competence: "Grammaire", difficulte: "★★", type: "Transformation", axe: 4, niveau: "Première", tokens: 0,
    desc: "6 phrases à transformer de l'actif au passif (tous temps).",
    consigne: "Mettez les phrases à la voix passive.",
    items: [
      "1. Scientists are developing a new vaccine. → A new vaccine ______.",
      "2. They built the bridge in 1932. → The bridge ______.",
      "3. Companies collect our data every day. → Our data ______.",
      "4. Someone has stolen my phone. → My phone ______.",
      "5. They will launch the satellite next year. → The satellite ______.",
      "6. People speak English all over the world. → English ______.",
    ],
    corrige: ["1. is being developed", "2. was built in 1932", "3. is collected every day", "4. has been stolen", "5. will be launched next year", "6. is spoken all over the world"] },

  { id: "e11", titre: "Comparatives & superlatives", competence: "Grammaire", difficulte: "★", type: "Texte à trous", axe: 1, niveau: "Seconde", tokens: 0,
    desc: "6 phrases à compléter avec le comparatif ou le superlatif.",
    consigne: "Complétez avec le comparatif ou le superlatif de l'adjectif entre parenthèses.",
    items: [
      "1. London is ______ (big) than Bristol.",
      "2. This is ______ (good) film I have ever seen.",
      "3. My grandmother is ______ (old) person in our family.",
      "4. Today is ______ (hot) than yesterday.",
      "5. Online life can be ______ (stressful) than real life.",
      "6. She is one of ______ (famous) activists in the world.",
    ],
    corrige: ["1. bigger", "2. the best", "3. the oldest", "4. hotter", "5. more stressful", "6. the most famous"] },

  /* ---------- COMPRÉHENSION DE L'ÉCRIT ---------- */
  { id: "e2", titre: "Reading: opinion article — thesis & arguments", competence: "Compréhension de l'écrit", difficulte: "★★", type: "QCM + justification", axe: 5, niveau: "Terminale", tokens: 1,
    desc: "Repérer thèse, arguments et registre dans un court éditorial. Corrigé fourni.",
    consigne: "Lisez l'extrait puis répondez (QCM et justification par une citation).",
    texte: "Every day, we hand over our personal data without a second thought. Supporters of mass surveillance argue that it keeps us safe: cameras deter crime and help catch criminals. Yet the price is high. Once collected, our data can be stored, sold and used against us. A society that watches its citizens constantly is not a free society — it is a fearful one. Security matters, but it should never become an excuse to erase our privacy.",
    items: [
      "1. What is the author's main thesis? (a) Surveillance keeps us safe (b) Surveillance threatens freedom (c) Data has no value",
      "2. Find ONE argument used by the supporters of surveillance.",
      "3. Find ONE argument the author uses against it.",
      "4. Quote the sentence that best sums up the author's opinion.",
      "5. Is the tone (a) neutral (b) critical (c) enthusiastic? Justify with one word.",
    ],
    corrige: [
      "1. (b)",
      "2. « cameras deter crime and help catch criminals »",
      "3. data « can be stored, sold and used against us »",
      "4. « A society that watches its citizens constantly is not a free society — it is a fearful one. »",
      "5. (b) critical — e.g. 'fearful' / 'excuse to erase our privacy'.",
    ] },

  { id: "e12", titre: "Reading: true/false + justification (India)", competence: "Compréhension de l'écrit", difficulte: "★", type: "Vrai / Faux", axe: 6, niveau: "Seconde", tokens: 0,
    desc: "Court texte sur l'Inde + vrai/faux justifié. Accessible A2+.",
    consigne: "Vrai ou faux ? Justifiez à chaque fois avec une citation du texte.",
    texte: "India is the largest democracy in the world. English is one of its official languages, alongside Hindi. Cricket, brought by the British, has become the country's favourite sport. Every autumn, millions of people celebrate Diwali, the festival of lights, with lamps, sweets and fireworks.",
    items: [
      "1. India is a small democracy. (True / False)",
      "2. English is spoken in India. (True / False)",
      "3. Cricket comes from India. (True / False)",
      "4. Diwali is a winter festival. (True / False)",
    ],
    corrige: [
      "1. False — « the largest democracy in the world »",
      "2. True — « English is one of its official languages »",
      "3. False — « brought by the British »",
      "4. False — « Every autumn »",
    ] },

  { id: "e13", titre: "Reading: match the headings (migration)", competence: "Compréhension de l'écrit", difficulte: "★★", type: "Appariement", axe: 1, niveau: "Première", tokens: 1,
    desc: "Associer 4 titres à 4 paragraphes sur le parcours migratoire.",
    consigne: "Lisez les paragraphes A-D et associez-les aux titres 1-4.",
    texte: "A. Many leave their country because of war or poverty, hoping for a better life.\nB. The first days in the new country are hard: a new language, new rules, often loneliness.\nC. Little by little, they find a job, friends, a place — and the new country becomes home.\nD. Yet they keep two cultures inside them, and that double identity is a strength.",
    items: ["Titres : 1) Building a new life — 2) Leaving home — 3) A double identity — 4) The first shock.", "Associez chaque paragraphe (A-D) à un titre (1-4)."],
    corrige: ["A → 2 (Leaving home)", "B → 4 (The first shock)", "C → 1 (Building a new life)", "D → 3 (A double identity)"] },

  /* ---------- COMPRÉHENSION DE L'ORAL ---------- */
  { id: "e14", titre: "Listening grid: who / what / why (transcript inside)", competence: "Compréhension de l'oral", difficulte: "★★", type: "Tableau à compléter", axe: 5, niveau: "Première", tokens: 1,
    desc: "Grille d'écoute + script à lire à voix haute si pas d'audio. Corrigé fourni.",
    consigne: "Écoutez (ou faites lire le script) et complétez la grille who / what / why / result.",
    texte: "SCRIPT — « My name is Maya. I've decided to delete my social media for a month. I felt I was wasting hours scrolling, comparing my life to others. Now I read more, I sleep better, and I talk to my friends face to face. It's the best decision I've made this year. »",
    items: ["Grille à compléter : Who is speaking? — What did she do? — Why? — What is the result?"],
    corrige: ["Who: Maya", "What: deleted her social media for a month", "Why: she was wasting hours scrolling and comparing herself to others", "Result: she reads more, sleeps better, talks to friends face to face"] },

  { id: "e15", titre: "Listening gap-fill: « The New Colossus »", competence: "Compréhension de l'oral", difficulte: "★★", type: "Texte à trous", axe: 1, niveau: "Première", tokens: 1,
    desc: "Poème de la Statue de la Liberté (domaine public) à compléter à l'écoute.",
    consigne: "Lisez le poème à voix haute (2 fois). Les élèves complètent les blancs.",
    texte: "« Give me your ______, your poor, / Your huddled ______ yearning to breathe ______, / The wretched ______ of your teeming shore. / Send these, the ______, tempest-tost to me, / I lift my lamp beside the golden ______! » — Emma Lazarus (1883)",
    items: ["Complétez les 6 mots manquants à l'écoute."],
    corrige: ["1. tired", "2. masses", "3. free", "4. refuse", "5. homeless", "6. door"] },

  /* ---------- EXPRESSION ORALE EN CONTINU ---------- */
  { id: "e4", titre: "Describing a photograph — guided frame", competence: "Expression orale en continu", difficulte: "★", type: "Production guidée", axe: 3, niveau: "Première", tokens: 0,
    desc: "Trame en 5 étapes (plans → hypothèses → interprétation) + banque lexicale.",
    consigne: "Décrivez l'image en suivant la trame, puis interprétez-la (≈ 1 min 30).",
    items: [
      "Étape 1 — Situer : « This is a photograph / a mural showing… »",
      "Étape 2 — Décrire les plans : « In the foreground… In the background… On the left/right… »",
      "Étape 3 — Émettre des hypothèses : « It may / might… The artist could be… »",
      "Étape 4 — Interpréter : « This image is about… It denounces / celebrates… »",
      "Étape 5 — Réagir : « In my opinion… What strikes me is… »",
      "Banque lexicale : foreground, background, to stand for, to denounce, striking, powerful, meaningful.",
    ],
    corrige: ["Production attendue : description structurée (plans → hypothèses → interprétation → réaction) d'env. 1 min 30, réinvestissant au moins 5 mots de la banque, sans liste plate."] },

  { id: "e16", titre: "Picture description — phrases bank (A2)", competence: "Expression orale en continu", difficulte: "★", type: "Production guidée", axe: 3, niveau: "Seconde", tokens: 0,
    desc: "Banque de phrases simples + 3 images au choix pour s'entraîner.",
    consigne: "Décrivez une image en 4-5 phrases à l'aide de la banque de phrases.",
    items: [
      "Banque : « In this picture, I can see… », « There is / There are… », « In the foreground / background… », « It looks… », « I think it is about… »",
      "Images au choix : a protest, a city street, a family meal.",
    ],
    corrige: ["Production attendue : 4-5 phrases correctes utilisant there is/are + 2 expressions de localisation + une hypothèse."] },

  { id: "e17", titre: "1-minute pitch — defend a cause", competence: "Expression orale en continu", difficulte: "★★", type: "Production guidée", axe: 2, niveau: "Première", tokens: 0,
    desc: "Structure d'un pitch d'1 minute (hook → problème → 2 arguments → appel).",
    consigne: "Préparez un pitch d'1 minute pour défendre une cause d'inclusion.",
    items: [
      "Structure : Hook (a question or figure) → The problem → Two arguments → A call to action.",
      "Connecteurs : « Did you know…? », « First… Second… », « That's why we should… »",
    ],
    corrige: ["Critères : structure respectée, deux arguments clairs, un appel à l'action, fluidité sur 1 min, 2+ connecteurs."] },

  /* ---------- INTERACTION ORALE ---------- */
  { id: "e3", titre: "Debate cards — structured speaking", competence: "Interaction orale", difficulte: "★★", type: "Jeu de rôle", axe: 1, niveau: "Terminale", tokens: 0,
    desc: "6 affirmations à débattre (for/against) + boîte à connecteurs d'interaction.",
    consigne: "À deux. Tirez une affirmation : A défend (FOR), B conteste (AGAINST). Réagissez avec les connecteurs, puis inversez les rôles.",
    items: [
      "1. Social media does more harm than good.",
      "2. Voting should be compulsory.",
      "3. Private life no longer exists online.",
      "4. Celebrities have a right to privacy.",
      "5. The press should be free to publish anything.",
      "6. Working from home is better than working at the office.",
      "Connecteurs : « I see your point, but… » / « That's true; however… » / « I couldn't agree more » / « On the contrary… » / « What about…? »",
    ],
    corrige: ["Évaluation : valoriser la relance, la réfutation et la nuance (concession) plus que le « bon » camp. Ex. (1) FOR: mental health, fake news ; AGAINST: connection, awareness."] },

  { id: "e18", titre: "Role-play — the local interview", competence: "Interaction orale", difficulte: "★★", type: "Jeu de rôle", axe: 6, niveau: "Première", tokens: 0,
    desc: "Cartes A/B : un·e journaliste interviewe un·e habitant·e.",
    consigne: "À deux. Jouez la scène, puis échangez les rôles.",
    items: [
      "Carte A (journaliste) : ask about their town, its traditions, what they are proud of, and one problem.",
      "Carte B (habitant·e) : answer, give details and examples, and react to the questions.",
    ],
    corrige: ["Évaluation : variété des questions (wh-), relances, réponses développées (pas oui/non), fluidité de l'échange."] },

  /* ---------- EXPRESSION ÉCRITE ---------- */
  { id: "e6", titre: "Writing a formal letter of complaint", competence: "Expression écrite", difficulte: "★★★", type: "Rédaction guidée", axe: 1, niveau: "Terminale", tokens: 1,
    desc: "Structure, registre formel, critères et modèle d'extrait fournis.",
    consigne: "Rédigez une lettre formelle de réclamation (≈ 180 mots) en respectant la structure et le registre.",
    items: [
      "Contexte : you ordered a product or service that was faulty. Write to complain and request a solution.",
      "Structure : 1) Dear Sir or Madam, 2) reason for writing, 3) details of the problem, 4) consequence + request, 5) Yours faithfully + name.",
      "Registre : formel — pas de contractions, modaux de politesse (would, could, should).",
      "Critères (sur 20) : structure /5 · registre formel /5 · correction /5 · clarté de la demande /5.",
    ],
    corrige: ["Modèle (extrait) : « Dear Sir or Madam, I am writing to complain about a laptop I ordered on 3 May. The item arrived with a cracked screen. As a result, I would be grateful if you could either replace it or issue a full refund. I look forward to your prompt reply. Yours faithfully, … »"] },

  { id: "e8", titre: "Imperatives & eco-pledges", competence: "Expression écrite", difficulte: "★", type: "Production guidée", axe: 4, niveau: "Seconde", tokens: 0,
    desc: "Écrire des engagements et un slogan à l'impératif (thème environnement).",
    consigne: "Écrivez 3 engagements (pledges) et 1 slogan à l'impératif pour la planète.",
    items: [
      "Amorces : « Save… », « Don't waste… », « Turn off… », « Reduce… », « Reuse… », « Recycle… »",
      "Pledges (3) : « I will… » / « We should… »",
      "Slogan : court, rythmé, à l'impératif.",
    ],
    corrige: ["Exemples — Slogan : « One planet, no plan B! » Pledges : « I will turn off the lights. We should use a refillable bottle. I will not waste food. »"] },

  { id: "e19", titre: "Opinion paragraph (PEEL method)", competence: "Expression écrite", difficulte: "★★", type: "Rédaction guidée", axe: 4, niveau: "Première", tokens: 1,
    desc: "Rédiger un paragraphe d'opinion structuré (Point-Explain-Example-Link).",
    consigne: "Rédigez un paragraphe d'opinion (≈ 120 mots) avec la méthode PEEL.",
    items: [
      "Sujet : « Should social media be banned for under-16s? »",
      "P (Point) : your opinion → E (Explain) → E (Example) → L (Link / conclusion).",
      "Connecteurs : « Firstly », « For instance », « However », « Therefore ».",
    ],
    corrige: ["Critères : opinion claire (P), explication développée (E), exemple précis (E), phrase de conclusion (L), 2+ connecteurs, ≈ 120 mots."] },

  { id: "e20", titre: "Writing a postcard from abroad", competence: "Expression écrite", difficulte: "★", type: "Rédaction guidée", axe: 6, niveau: "Seconde", tokens: 0,
    desc: "Carte postale courte (present perfect / preterit). Modèle fourni.",
    consigne: "Rédigez une carte postale (≈ 60 mots) depuis un pays anglophone.",
    items: [
      "Inclure : where you are, what you have seen/done, what you like, « See you soon! »",
      "Amorce : « Dear …, I'm writing from… »",
    ],
    corrige: ["Exemple : « Dear Léa, I'm writing from Mumbai. I have visited a temple and tried amazing street food. The festival of Diwali is incredible — so many lights! See you soon, Tom. »"] },

  /* ---------- MÉDIATION ---------- */
  { id: "e7", titre: "Mediation: FR data → EN summary", competence: "Médiation", difficulte: "★★", type: "Tâche complexe", axe: 4, niveau: "Première", tokens: 1,
    desc: "Restituer en anglais les données clés d'une « infographie » française. Modèle fourni.",
    consigne: "À partir des données françaises ci-dessous, rédigez en anglais un court résumé (≈ 60 mots) pour un·e camarade anglophone. Ne traduisez pas mot à mot.",
    texte: "DONNÉES (FR) — En 2023, 92 % des 15-24 ans utilisent les réseaux sociaux chaque jour ; temps moyen : 3 h/jour ; 1 jeune sur 3 dit se sentir « sous pression » à cause des likes ; 60 % ont déjà vu une fausse information.",
    items: ["Transmettez les 3 idées clés en anglais. Commencez par : « According to a French survey… »"],
    corrige: ["Exemple : « According to a French survey, 92% of 15-to-24-year-olds use social media every day, for about three hours. One in three feels under pressure because of likes, and 60% have already seen fake news. »"] },

  { id: "e21", titre: "Mediation: explain a FR poster (A2)", competence: "Médiation", difficulte: "★", type: "Production guidée", axe: 5, niveau: "Seconde", tokens: 0,
    desc: "Expliquer en anglais simple le sens d'une affiche française à un·e camarade.",
    consigne: "Expliquez en anglais simple à un·e camarade ce que demande l'affiche française.",
    texte: "AFFICHE (FR) — « Trie tes déchets : verre, papier, plastique. Chaque geste compte ! »",
    items: ["Dites en anglais ce qu'il faut faire (impératif + lexique du tri)."],
    corrige: ["Exemple : « This poster says we should sort our waste: glass, paper and plastic. Put each one in the right bin — every action counts! »"] },

  { id: "e22", titre: "Mediation: summarise a FR article in EN", competence: "Médiation", difficulte: "★★★", type: "Tâche complexe", axe: 4, niveau: "Terminale", tokens: 1,
    desc: "Résumer en anglais l'essentiel d'un article français (thèse + conseils).",
    consigne: "Résumez en anglais (≈ 80 mots) l'essentiel de l'article français pour un lecteur anglophone.",
    texte: "ARTICLE (FR, extrait) — Selon une étude, une fausse information se propage six fois plus vite qu'une vraie sur les réseaux. Les contenus qui suscitent la colère ou la peur sont les plus partagés. Les auteurs recommandent de vérifier la source, la date, et de croiser plusieurs médias avant de partager.",
    items: ["Transmettez la thèse + 2 conseils. Commencez par : « According to a recent study… »"],
    corrige: ["Exemple : « According to a recent study, fake news spreads six times faster than true news, because content that triggers anger or fear is shared more. To avoid being fooled, we should check the source and the date, and compare several media before sharing. »"] },

  /* ---------- PHONOLOGIE ---------- */
  { id: "e5", titre: "Word stress — 3-syllable words", competence: "Phonologie", difficulte: "★★", type: "Discrimination", axe: 6, niveau: "Première", tokens: 1,
    desc: "Classer 16 mots selon la syllabe accentuée. Corrigé avec accents marqués.",
    consigne: "Classez chaque mot selon la syllabe accentuée et marquez l'accent primaire (en MAJUSCULES).",
    items: ["Mots : opportunity, immigrant, inequality, photograph, photographer, industry, industrial, develop, government, political, economy, celebrate, celebrity, advertise, advertisement, family."],
    corrige: ["opPORtunity · IMmigrant · inequAlity · PHOtograph · phoTOgrapher · INdustry · inDUStrial · deVELop · GOVernment · poLItical · eCOnomy · CElebrate · ceLEBrity · ADvertise · adVERtisement · FAMily."] },

  { id: "e23", titre: "Pronouncing the -ed ending", competence: "Phonologie", difficulte: "★★", type: "Discrimination", axe: 2, niveau: "Seconde", tokens: 0,
    desc: "Classer des verbes au passé selon /t/, /d/ ou /ɪd/.",
    consigne: "Classez chaque verbe au passé selon la prononciation du -ed : /t/, /d/ ou /ɪd/.",
    items: ["Verbes : worked, lived, wanted, played, watched, decided, helped, arrived, visited, looked, changed, started."],
    corrige: ["/t/ : worked, watched, helped, looked", "/d/ : lived, played, arrived, changed", "/ɪd/ : wanted, decided, visited, started"] },

  /* ---------- LEXIQUE ---------- */
  { id: "e24", titre: "Collocations: environment & digital", competence: "Lexique", difficulte: "★★", type: "Appariement", axe: 5, niveau: "Première", tokens: 0,
    desc: "Associer verbes et noms pour former des collocations utiles.",
    consigne: "Associez chaque verbe au bon nom pour former une collocation correcte.",
    items: [
      "Verbes : to protect — to waste — to reduce — to share — to post — to delete",
      "Noms : energy — the planet — a photo — your account — emissions — content",
    ],
    corrige: ["to protect the planet", "to waste energy", "to reduce emissions", "to share content", "to post a photo", "to delete your account (variantes acceptées)"] },
];

/* ============================================================
   ACTUALITÉ / VEILLE ÉDUCATION
   ============================================================ */
const ACTUS = [
  { date: "2026-06-05", tag: "Programme", titre: "Langues vivantes : les axes sont propres à chaque niveau",
    resume: "Rappel : Seconde, Première et Terminale ont chacune 6 axes distincts ; le 6e est spécifique à une aire anglophone et reste obligatoire.",
    pourleprof: "Vérifiez que vos séquences sont rattachées à l'axe du bon niveau avant les conseils.", source: "Eduscol" },
  { date: "2026-05-28", tag: "Évaluation", titre: "Grand oral & LLCER : harmoniser les grilles",
    resume: "Rappel des descripteurs CECRL pour l'évaluation de l'expression orale en terminale.",
    pourleprof: "Réutilisez nos grilles alignées B2 pour gagner du temps de correction.", source: "Éduscol / Inspection" },
  { date: "2026-05-15", tag: "Ressource", titre: "Nouveaux fonds libres de droits pour la CE",
    resume: "La Library of Congress enrichit ses collections photographiques numérisées.",
    pourleprof: "Idéal pour des séquences sur l'aire américaine (Première, axe 6).", source: "Library of Congress" },
];

/* ============================================================
   OFFRES / TOKENS
   ============================================================ */
const OFFRES = [
  { nom: "Gratuit", prix: "0 €", periode: "", highlight: false,
    valeur: "Découverte + création d'habitude",
    inclus: ["2 à 5 tokens à l'inscription", "1 token / semaine offert", "Preview riche de toutes les ressources", "Accès à l'actualité & sélection d'exercices", "Favoris & collections"],
    cta: "Commencer gratuitement" },
  { nom: "Premium mensuel", prix: "X €", periode: "/ mois", highlight: true,
    valeur: "Téléchargements réguliers + gain de temps",
    inclus: ["20 tokens / mois", "Exports modifiables (Word / PPT)", "Recherche & matching avancés", "Outils de préparation (cloner, adapter)", "Recommandations personnalisées"],
    cta: "Passer Premium" },
  { nom: "Packs de tokens", prix: "10 / 30 / 100", periode: "tokens", highlight: false,
    valeur: "Flexibilité & achats ponctuels",
    inclus: ["Sans abonnement", "Tokens cumulables", "Idéal avant les vacances", "Packs séquence complète (5 tokens)"],
    cta: "Acheter des tokens" },
  { nom: "Établissement", prix: "Sur devis", periode: "", highlight: false,
    valeur: "Adoption équipe + pilotage",
    inclus: ["Tokens mutualisés", "Compte admin & bibliothèque interne", "Statistiques d'usage anonymisées", "Licence collège / lycée"],
    cta: "Demander un devis" },
];

/* Coûts indicatifs en tokens (dossier produit) */
const COUTS = [
  { item: "Séance complète", cout: "1 token" },
  { item: "Séquence complète", cout: "3 tokens" },
  { item: "Pack (séquence + séances + évaluations)", cout: "5 tokens" },
  { item: "Pack d'exercices imprimable", cout: "0 à 1 token" },
];
