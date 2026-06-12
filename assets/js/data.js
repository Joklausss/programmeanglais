/* ============================================================
   data.js — Contenu de la plateforme
   Plateforme de ressources pédagogiques — Anglais Lycée
   Axes culturels conformes au programme officiel :
   ILS SONT PROPRES À CHAQUE NIVEAU (le 6e axe est spécifique
   à une aire anglophone).
   ============================================================ */

/* --- Les 6 axes culturels PAR NIVEAU (programme lycée GT) --- */
const AXES_BY_LEVEL = {
  Seconde: [
    { n: 1, title: "Représentation de soi et rapport à autrui", icon: "🪞", desc: "Image de soi, réseaux sociaux, amitié, modèles et héros du quotidien." },
    { n: 2, title: "Vivre entre générations", icon: "👵", desc: "Famille, transmission, solidarités et tensions entre âges." },
    { n: 3, title: "Le passé dans le présent", icon: "⏳", desc: "Traces de l'histoire, traditions, lieux et devoirs de mémoire." },
    { n: 4, title: "Défis et transitions", icon: "🌱", desc: "Environnement, sciences, mutations du monde et engagement." },
    { n: 5, title: "Créer et recréer", icon: "🎨", desc: "Arts, artisanat, réécritures et puissance de l'imaginaire." },
    { n: 6, title: "Les pays du Commonwealth : héritages, unité, diversité", icon: "🌏", desc: "Inde, Caraïbes, Afrique et Pacifique anglophones : héritages partagés." },
  ],
  Première: [
    { n: 1, title: "Identités et échanges", icon: "🌍", desc: "Migrations, frontières, échanges culturels et commerciaux." },
    { n: 2, title: "Diversité et inclusion", icon: "🤝", desc: "Égalité, minorités, lutte contre les discriminations." },
    { n: 3, title: "Art et pouvoir", icon: "🎭", desc: "L'art au service du pouvoir ou de la contestation." },
    { n: 4, title: "Innovations scientifiques et responsabilité", icon: "🔬", desc: "Progrès, éthique, intelligence artificielle et bioéthique." },
    { n: 5, title: "L'être humain et la nature", icon: "🌳", desc: "Rapport au vivant, écologie, exploration et limites." },
    { n: 6, title: "Les aires anglophones américaines", icon: "🦅", desc: "États-Unis, Canada anglophone, Caraïbes : rêves et fractures." },
  ],
  Terminale: [
    { n: 1, title: "Espace privé et espace public", icon: "⚖️", desc: "Vie privée, surveillance, droits, travail et engagement citoyen." },
    { n: 2, title: "Territoire et mémoire", icon: "🗺️", desc: "Frontières, héritages, conflits et constructions mémorielles." },
    { n: 3, title: "Fictions et réalités", icon: "📖", desc: "Mythes, utopies et dystopies, le réel transfiguré par la fiction." },
    { n: 4, title: "Enjeux et formes de la communication", icon: "📡", desc: "Médias, discours, propagande, désinformation et rhétorique." },
    { n: 5, title: "Citoyenneté et mondes virtuels", icon: "💻", desc: "Réseaux, données, démocratie numérique et libertés." },
    { n: 6, title: "Le Royaume-Uni et ses nations", icon: "🇬🇧", desc: "Angleterre, Écosse, Pays de Galles, Irlande du Nord : unité et diversité." },
  ],
};

/* Helper de résolution d'un axe pour un niveau donné */
function getAxis(niveau, n) {
  const list = AXES_BY_LEVEL[niveau] || AXES_BY_LEVEL["Première"];
  return list.find(a => a.n === n) || { n, title: "", icon: "•", desc: "" };
}

/* --- Niveaux CECRL visés selon le niveau de classe (cf. programme, p.2) --- */
const CECRL = {
  Seconde:   { LVA: "B1+", LVB: "A2+", LVC: "A1+" },
  Première:  { LVA: "B1+", LVB: "B1",  LVC: "A2"  },
  Terminale: { LVA: "B2",  LVB: "B1",  LVC: "A2+/B1" },
};

const ACTIVITES = [
  "Compréhension de l'oral", "Compréhension de l'écrit",
  "Expression orale en continu", "Expression écrite",
  "Interaction orale et écrite", "Médiation",
];

/* --- Badges qualité (cf. dossier produit) --- */
const BADGES = {
  conforme: { label: "Conforme programme", cls: "b-green" },
  diff:     { label: "Différenciation",    cls: "b-blue" },
  eval:     { label: "Évaluation incluse",  cls: "b-amber" },
  cle:      { label: "Clé en main",         cls: "b-violet" },
};

/* ============================================================
   SÉQUENCES
   Chaque séance est détaillée par phases : pour chaque phase,
   l'activité, la consigne, la modalité et la production attendue.
   ============================================================ */
