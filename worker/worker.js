/* ============================================================
   LinguaLab — Cloudflare Worker
   Génère une séquence pédagogique réelle via l'API Claude :
     1) outil web_search → 2-3 vrais articles sur le thème
     2) structured output → séquence au format attendu (JSON Schema)
   La clé API reste côté serveur (secret du Worker), jamais dans le navigateur.
   ============================================================ */

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-opus-4-8';

/* Schéma de la PARTIE CONTENU d'une séquence (le site ajoute les métadonnées) */
const SEQ_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['title', 'objet', 'problematique', 'resume', 'objectifs', 'tacheFinale', 'seancesDetail', 'evaluation', 'differenciation', 'prolongements', 'ancrage', 'idees'],
  properties: {
    title: { type: 'string' },
    objet: { type: 'string' },
    problematique: { type: 'string' },
    resume: { type: 'string' },
    objectifs: {
      type: 'object', additionalProperties: false,
      required: ['culturels', 'langagiers', 'grammaire', 'lexique', 'phonologie'],
      properties: {
        culturels: { type: 'array', items: { type: 'string' } },
        langagiers: {
          type: 'object', additionalProperties: false,
          required: ["Compréhension de l'oral", "Compréhension de l'écrit", 'Expression orale en continu', 'Expression écrite', 'Interaction orale et écrite', 'Médiation'],
          properties: {
            "Compréhension de l'oral": { type: 'string' },
            "Compréhension de l'écrit": { type: 'string' },
            'Expression orale en continu': { type: 'string' },
            'Expression écrite': { type: 'string' },
            'Interaction orale et écrite': { type: 'string' },
            'Médiation': { type: 'string' },
          },
        },
        grammaire: { type: 'array', items: { type: 'string' } },
        lexique: { type: 'array', items: { type: 'string' } },
        phonologie: { type: 'array', items: { type: 'string' } },
      },
    },
    tacheFinale: {
      type: 'object', additionalProperties: false,
      required: ['titre', 'consigne', 'activites', 'perspective'],
      properties: { titre: { type: 'string' }, consigne: { type: 'string' }, activites: { type: 'array', items: { type: 'string' } }, perspective: { type: 'string' } },
    },
    seancesDetail: {
      type: 'array', items: {
        type: 'object', additionalProperties: false,
        required: ['n', 'titre', 'objectif', 'phases', 'supports'],
        properties: {
          n: { type: 'integer' }, titre: { type: 'string' }, objectif: { type: 'string' },
          phases: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['nom', 'min', 'desc'], properties: { nom: { type: 'string' }, min: { type: 'string' }, desc: { type: 'string' } } } },
          supports: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['type', 'titre', 'src'], properties: { type: { type: 'string' }, titre: { type: 'string' }, src: { type: 'string' } } } },
        },
      },
    },
    evaluation: {
      type: 'object', additionalProperties: false,
      required: ['diagnostique', 'formative', 'sommative', 'grille'],
      properties: {
        diagnostique: { type: 'string' }, formative: { type: 'array', items: { type: 'string' } }, sommative: { type: 'string' },
        grille: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['critere', 'desc', 'points'], properties: { critere: { type: 'string' }, desc: { type: 'string' }, points: { type: 'integer' } } } },
      },
    },
    differenciation: {
      type: 'object', additionalProperties: false,
      required: ['soutien', 'approfondissement', 'modalites'],
      properties: { soutien: { type: 'array', items: { type: 'string' } }, approfondissement: { type: 'array', items: { type: 'string' } }, modalites: { type: 'array', items: { type: 'string' } } },
    },
    prolongements: { type: 'array', items: { type: 'string' } },
    ancrage: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['type', 'oeuvre', 'source'], properties: { type: { type: 'string' }, oeuvre: { type: 'string' }, source: { type: 'string' } } } },
    idees: { type: 'array', items: { type: 'string' } },
  },
};

function cors(env) {
  return {
    'Access-Control-Allow-Origin': (env && env.ALLOWED_ORIGIN) || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
  };
}

async function anthropic(env, body) {
  const r = await fetch(ANTHROPIC_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  if (!r.ok) throw new Error('Anthropic ' + r.status + ' : ' + (data.error && data.error.message || ''));
  return data;
}

const textOf = (resp) => (resp.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();

/* Étape 1 — chercher 2-3 vrais articles (web search, server tool) */
async function findArticles(env, p) {
  const prompt = `Find 2 to 3 real, recent, English-language articles or documents about "${p.theme}" that are suitable for a French lycée class (${p.niveau}, level CECRL ${p.cecrl}, cultural axis "${p.axeName}") and that are good for class discussion/debate. Prefer reputable sources (The Guardian, BBC, The New York Times, NPR, etc.).
Return ONLY a short plain-text briefing, one block per article:
- Title — full URL
- One sentence: the angle and why it sparks debate.
No preamble, no conclusion.`;
  let messages = [{ role: 'user', content: prompt }];
  let resp;
  for (let i = 0; i < 4; i++) {
    resp = await anthropic(env, {
      model: MODEL, max_tokens: 3000,
      tools: [{ type: 'web_search_20260209', name: 'web_search', max_uses: 4 }],
      messages,
    });
    if (resp.stop_reason !== 'pause_turn') break;
    messages = [{ role: 'user', content: prompt }, { role: 'assistant', content: resp.content }];
  }
  return textOf(resp);
}

/* Étape 2 — rédiger la séquence au format strict (structured output) */
async function buildSequence(env, p, articles) {
  const N = Math.max(3, Math.min(8, p.duree || 5));
  const sys = `Tu es un assistant pédagogique expert pour professeurs d'anglais au lycée français. Tu produis des séquences conformes au programme officiel (Eduscol), dans la perspective actionnelle.
Règles de rédaction :
- Les champs descriptifs (objectifs, consignes, déroulé, évaluation, différenciation) sont rédigés EN FRANÇAIS, comme un·e professeur·e les écrirait. Les titres et la tâche finale peuvent être en anglais.
- Chaque séance suit la structure : Anticipation/Lead-in → Compréhension → Production → Trace écrite ; la dernière séance = Préparation → Production → Co-évaluation. Pour chaque phase : durée, consigne, modalité, production attendue.
- Place les ARTICLES RÉELS fournis comme supports centraux : reporte-les dans "supports" (avec leur URL réelle dans "src") ET dans "ancrage" (oeuvre = titre, source = média + URL).
- Niveau CECRL visé : ${p.cecrl}. Adapte la longueur des productions au niveau.`;
  const usr = `Conçois une séquence complète pour :
- Niveau : ${p.niveau} · Voie : ${p.statut} · CECRL ${p.cecrl}
- Axe : ${p.axeName}
- Thématique : « ${p.theme} »
- Durée : ${N} séances

ARTICLES RÉELS À EXPLOITER (sources web vérifiées) :
${articles || '(aucun article trouvé — propose des types de documents authentiques pertinents)'}

Produis l'objet séquence au format imposé (${N} séances, dont la dernière dédiée à la tâche finale).`;
  const resp = await anthropic(env, {
    model: MODEL, max_tokens: 16000,
    system: sys,
    output_config: { format: { type: 'json_schema', schema: SEQ_SCHEMA } },
    messages: [{ role: 'user', content: usr }],
  });
  const txt = textOf(resp);
  return JSON.parse(txt);
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors(env) });
    const H = { ...cors(env), 'content-type': 'application/json' };
    if (request.method !== 'POST') return new Response(JSON.stringify({ ok: false, error: 'POST only' }), { status: 405, headers: H });
    try {
      if (!env.ANTHROPIC_API_KEY) throw new Error('ANTHROPIC_API_KEY non configurée (wrangler secret)');
      const p = await request.json();
      if (!p.niveau || !p.statut || !p.axe) throw new Error('Paramètres manquants (niveau, statut, axe)');
      const articles = await findArticles(env, p);
      const sequence = await buildSequence(env, p, articles);
      return new Response(JSON.stringify({ ok: true, sequence, articles }), { headers: H });
    } catch (err) {
      return new Response(JSON.stringify({ ok: false, error: String(err.message || err) }), { status: 500, headers: H });
    }
  },
};
