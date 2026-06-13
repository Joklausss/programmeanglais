/* ============================================================
   app.js — routing, rendering & interactivity (vanilla JS)
   ============================================================ */
const app = document.getElementById('app');
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

let TOKENS = 5;

/* ============================================================
   COMPTE LOCAL (persistant via localStorage)
   ============================================================ */
const ACCOUNT_KEY = 'lingualab_account';
let ACCOUNT = null;

function loadAccount() {
  try { ACCOUNT = JSON.parse(localStorage.getItem(ACCOUNT_KEY)); } catch (e) { ACCOUNT = null; }
  if (ACCOUNT && ACCOUNT.plan !== 'unlimited') TOKENS = ACCOUNT.tokens ?? TOKENS;
  updateHeaderAccount();
}
function saveAccount() { if (ACCOUNT) localStorage.setItem(ACCOUNT_KEY, JSON.stringify(ACCOUNT)); else localStorage.removeItem(ACCOUNT_KEY); }
const isUnlimited = () => ACCOUNT && ACCOUNT.plan === 'unlimited';

function activateUnlimited(name, email) {
  ACCOUNT = { name: name || 'Professeur', email: email || 'prof@lingualab.local', plan: 'unlimited', tokens: Infinity, since: Date.now() };
  saveAccount(); updateHeaderAccount(); closeModal();
  toast('Compte illimité activé ✓ — téléchargements sans limite');
}
function logoutAccount() { ACCOUNT = null; saveAccount(); TOKENS = 5; updateHeaderAccount(); closeModal(); toast('Déconnecté'); }

function updateHeaderAccount() {
  const pill = $('#tokenCount'), btn = $('#accountBtn'), pillWrap = $('#tokenPill');
  if (isUnlimited()) {
    pillWrap.title = 'Compte illimité';
    pillWrap.style.background = '#ecfdf5'; pillWrap.style.borderColor = '#a7f3d0'; pillWrap.style.color = '#047857';
    pillWrap.firstChild.textContent = '∞ ';
    pill.textContent = 'Illimité';
    btn.textContent = '👤 ' + (ACCOUNT.name.split(' ')[0] || 'Compte');
  } else {
    pillWrap.firstChild.textContent = '🪙 ';
    pill.textContent = TOKENS;
    pillWrap.style.background = ''; pillWrap.style.borderColor = ''; pillWrap.style.color = '';
    btn.textContent = ACCOUNT ? '👤 ' + (ACCOUNT.name.split(' ')[0]) : 'Se connecter';
  }
}

function openAccountModal() {
  if (ACCOUNT) {
    const plan = isUnlimited() ? 'Illimité ∞' : `Gratuit · ${TOKENS} tokens`;
    openModal(`<div class="big-ic">👤</div><h2>${esc(ACCOUNT.name)}</h2>
      <p class="muted">${esc(ACCOUNT.email)}</p>
      <div class="gen-prob" style="font-style:normal">Formule : <b>${plan}</b></div>
      ${isUnlimited() ? '<p class="muted small">Téléchargements illimités actifs sur ce poste. Vos téléchargements génèrent de vrais fichiers (.zip, .docx).</p>'
        : '<button class="btn btn-accent btn-block" onclick="activateUnlimited(ACCOUNT.name, ACCOUNT.email)">⭐ Passer en illimité (local)</button>'}
      <button class="btn btn-ghost btn-block" style="margin-top:10px" onclick="logoutAccount()">Se déconnecter</button>`);
    return;
  }
  openModal(`<div class="big-ic">🔑</div><h2>Connexion / Compte local</h2>
    <p class="muted">Vos données restent sur cet appareil (aucun serveur). Idéal pour un usage perso conforme RGPD.</p>
    <div class="field"><label>Nom affiché</label><input class="wiz-input" id="acName" placeholder="Mme / M. ..." value="Professeur"></div>
    <div class="field"><label>E-mail</label><input class="wiz-input" id="acMail" placeholder="prenom.nom@ac-...fr" value="prof@lingualab.local"></div>
    <button class="btn btn-primary btn-block" onclick="activateUnlimited($('#acName').value,$('#acMail').value)">⭐ Créer mon compte illimité</button>
    <p class="muted small" style="text-align:center;margin:12px 0 0">Téléchargements illimités · de vrais fichiers Word + images + références dans un .zip</p>`);
}

/* ---------- small helpers ---------- */
const axeName = (n, niveau) => getAxis(niveau, n).title || '';
const axeShort = n => `Axe ${n}`;
const axeShortName = t => (t || '').split('(')[0].split(':')[0].trim();
const stars = note => note ? '★'.repeat(Math.round(note)) + `<span class="muted"> ${note.toFixed(1)}</span>` : '';
const badgeHTML = key => { const b = BADGES[key]; return b ? `<span class="badge ${b.cls}">${b.label}</span>` : ''; };

/* Séquences générées par l'assistant (en mémoire pour la session) */
let GENERATED = [];

/* ============================================================
   BIBLIOTHÈQUE COMPLÈTE — matrice niveau × voie × axe
   Chaque séquence de base (1 par niveau×axe) est déclinée en
   LVA / LVB / LVC avec le niveau CECRL visé correspondant.
   3 niveaux × 3 voies × 6 axes = 54 ressources.
   ============================================================ */
const STATUTS = ['LVA', 'LVB', 'LVC'];
const LIBRARY = (() => {
  const out = [];
  SEQUENCES.forEach(base => {
    STATUTS.forEach(st => {
      out.push(Object.assign({}, base, {
        id: `${base.id}-${st.toLowerCase()}`,
        statut: st,
        cecrl: CECRL[base.niveau][st],
        variant: true,
        baseId: base.id,
        baseStatut: base.statut,
      }));
    });
  });
  return out;
})();

const EXTRA = (typeof EXTRA_MODULES !== 'undefined') ? EXTRA_MODULES : [];
const findSeq = id => LIBRARY.find(x => x.id === id) || SEQUENCES.find(x => x.id === id) || EXTRA.find(x => x.id === id) || GENERATED.find(x => x.id === id);

/* ---------- Favoris & séquences générées (persistés) ---------- */
const FAV_KEY = 'lingualab_favorites', GEN_KEY = 'lingualab_generated';
let FAVORITES = (() => { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; } })();
/* Endpoint de la fonction IA (Cloudflare Worker). Vide = génération locale uniquement.
   Configurable sans toucher au code : collé par le prof dans l'assistant, stocké en local. */
const AI_KEY = 'lingualab_ai_endpoint';
let AI_ENDPOINT = (() => { try { return localStorage.getItem(AI_KEY) || ''; } catch (e) { return ''; } })();
const isFav = id => FAVORITES.includes(id);
function saveFav() { localStorage.setItem(FAV_KEY, JSON.stringify(FAVORITES)); }
function toggleFav(id) {
  const i = FAVORITES.indexOf(id);
  if (i < 0) { FAVORITES.push(id); toast('Ajouté aux favoris ★'); } else { FAVORITES.splice(i, 1); toast('Retiré des favoris'); }
  saveFav();
}
function saveGenerated() { try { localStorage.setItem(GEN_KEY, JSON.stringify(GENERATED)); } catch (e) {} }
(() => { try { const g = JSON.parse(localStorage.getItem(GEN_KEY)); if (Array.isArray(g)) GENERATED = g; } catch (e) {} })();

/* ---------- Adaptation automatique selon la voie (LVA/LVB/LVC) ---------- */
const STATUT_FACTOR = { LVA: 1, LVB: 0.8, LVC: 0.55 };
function scaleWords(str, f) {
  return String(str).replace(/(\d+)(\s*(?:mots|words))/gi, (m, n, u) => Math.max(20, Math.round(+n * f / 10) * 10) + u);
}
function adaptForStatut(seq) {
  const f = STATUT_FACTOR[seq.statut] || 1;
  if (f === 1) return seq; // LVA = contenu de référence
  const c = JSON.parse(JSON.stringify(seq));
  if (c.tacheFinale) c.tacheFinale.consigne = scaleWords(c.tacheFinale.consigne, f);
  (c.seancesDetail || []).forEach(se => se.phases.forEach(p => p.desc = scaleWords(p.desc, f)));
  if (c.objectifs && c.objectifs.langagiers) Object.keys(c.objectifs.langagiers).forEach(k => c.objectifs.langagiers[k] = scaleWords(c.objectifs.langagiers[k], f));
  if (c.evaluation) c.evaluation.sommative = scaleWords(c.evaluation.sommative, f);
  c.adaptation = seq.statut === 'LVC'
    ? "Version LVC : productions raccourcies, phrases courtes, supports « scaffolded » par défaut, étayage lexical systématique avant chaque document."
    : "Version LVB : productions et exigences légèrement allégées par rapport à la LVA ; étayage proposé selon les besoins.";
  return c;
}

function toast(msg) {
  const t = $('#toast'); t.hidden = false; t.textContent = msg;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(t._t); t._t = setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.hidden = true, 300); }, 2400);
}
function setTokens(n) {
  if (isUnlimited()) { updateHeaderAccount(); return; }
  TOKENS = n;
  if (ACCOUNT) { ACCOUNT.tokens = n; saveAccount(); }
  updateHeaderAccount();
}

/* ---------- Modal ---------- */
function openModal(html) { $('#modalBody').innerHTML = html; $('#modal').hidden = false; }
function closeModal() { $('#modal').hidden = true; }
$('#modalClose').onclick = closeModal;
$('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ---------- Mobile nav & account ---------- */
$('#navToggle').onclick = () => $('#mainNav').classList.toggle('open');
$('#accountBtn').onclick = openAccountModal;
loadAccount();

/* ============================================================
   ROUTER
   ============================================================ */
const routes = {
  '/accueil': renderHome,
  '/bibliotheque': renderLibrary,
  '/programmation': renderProgrammation,
  '/assistant': renderAssistant,
  '/exercices': renderExercises,
  '/mon-espace': renderMonEspace,
  '/actualite': renderNews,
  '/premium': renderPremium,
};

/* Accessibilité : rend les cartes activables au clavier + déplace le focus */
function enhanceA11y() {
  app.querySelectorAll('.res-card,.axe-card,.prog-row,.hero-card,.seance-head').forEach(el => {
    if (el.dataset.a11y) return; el.dataset.a11y = '1';
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
  });
}

function router() {
  const hash = location.hash.replace(/^#/, '') || '/accueil';
  const [path, query] = hash.split('?');
  // resource detail: /sequence/<id>
  if (path.startsWith('/sequence/')) {
    renderDetail(path.split('/')[2]);
  } else {
    (routes[path] || renderHome)(new URLSearchParams(query || ''));
  }
  // nav active state + aria-current
  $$('.main-nav a').forEach(a => { const on = a.getAttribute('href') === '#' + path; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
  $('#mainNav').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  // a11y : focus sur le titre de page pour les lecteurs d'écran
  enhanceA11y();
  const h1 = app.querySelector('h1'); if (h1) { h1.setAttribute('tabindex', '-1'); try { h1.focus({ preventScroll: true }); } catch (e) {} }
}
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

/* ============================================================
   COMPONENTS
   ============================================================ */
function resourceCard(s, opts) {
  opts = opts || {};
  const voies = opts.allVoies;
  const coverTag = voies ? `${s.niveau} · LVA·LVB·LVC · ${axeShort(s.axe)}` : `${s.niveau} · ${s.statut} · ${axeShort(s.axe)}`;
  const sub = voies ? `${s.niveau} · 3 voies disponibles · ${s.seances} séances` : `${s.niveau} · ${s.statut} · CECRL ${s.cecrl} · ${s.seances} séances`;
  const metaVoie = voies ? 'LVA·LVB·LVC' : s.statut;
  return `<article class="res-card axe-c${s.axe}" onclick="location.hash='#/sequence/${s.id}'">
    <span class="seq-banner"></span>
    <div class="res-body">
      <div class="res-meta"><span class="chip"><span class="axe-dot"></span>${s.niveau} · ${axeShort(s.axe)}</span></div>
      <h3>${esc(s.title)}</h3>
      <p class="res-sub">${metaVoie} · ${s.seances} séances · ${esc(s.cecrl)}</p>
      <div class="res-tags">${(s.badges || []).slice(0, 2).map(badgeHTML).join('')}</div>
      <div class="res-foot">
        <span class="rating"><span class="stars">${stars(s.note)}</span></span>
        <span class="res-sub">${s.telechargements ? '↓ ' + s.telechargements.toLocaleString('fr-FR') : (s.extra ? 'Module extra' : '')}</span>
      </div>
    </div>
  </article>`;
}

/* ============================================================
   PAGE: HOME
   ============================================================ */
function renderHome() {
  const featured = SEQUENCES.slice(0, 3);
  app.innerHTML = `
  <section class="hero">
    <div class="wrap hero-inner">
      <div>
        <span class="eyebrow">✨ Conforme aux programmes officiels · Lycée</span>
        <h1 class="display">Préparez une séquence d'anglais <em>en moins de 90 secondes</em>.</h1>
        <p class="hero-lead">Séquences et séances clés en main, structurées et alignées sur les 6 axes du programme. Aperçu complet avant tout téléchargement.</p>
        <div class="hero-cta">
          <a class="btn btn-primary" href="#/bibliotheque">Explorer la bibliothèque</a>
          <a class="btn btn-ghost" href="#/assistant">🪄 Lancer l'assistant</a>
        </div>
        <div class="hero-trust">
          <span><b>6</b> axes couverts</span>
          <span><b>${LIBRARY.length}</b> séquences</span>
          <span><b>A1→B2</b> CECRL</span>
          <span><b>★ 4.8</b> note moyenne</span>
        </div>
      </div>
      <div class="hero-card axe-c${SEQUENCES[1].axe}" onclick="location.hash='#/sequence/${SEQUENCES[1].id}'" style="cursor:pointer">
        <div class="hc-cover">
          <span class="hc-axe chip"><span class="axe-dot"></span>${SEQUENCES[1].niveau} · ${axeShort(SEQUENCES[1].axe)} · ${esc(axeShortName(axeName(SEQUENCES[1].axe, SEQUENCES[1].niveau)))}</span>
        </div>
        <div class="hc-body">
          <h3>${esc(SEQUENCES[1].title)}</h3>
          <p class="res-sub">${SEQUENCES[1].niveau} · ${SEQUENCES[1].statut} · CECRL ${SEQUENCES[1].cecrl} · ${SEQUENCES[1].seances} séances</p>
          <div class="chips">${SEQUENCES[1].badges.map(badgeHTML).join('')}</div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section-head">
        <h2 class="display">Tout ce qu'il faut, déjà prêt</h2>
        <p>Pas un simple dépôt de fichiers : chaque ressource est structurée — objectifs, déroulé, évaluation, différenciation.</p>
      </div>
      <div class="grid grid-4">
        ${[
          ['🎯', 'Aligné au programme', 'Axes culturels, niveaux CECRL et activités langagières référencés.'],
          ['🧩', 'Différenciation incluse', 'Paliers, aides et prolongements pensés pour toute la classe.'],
          ['📊', 'Évaluations & grilles', 'Diagnostique, formative, sommative — grilles aux descripteurs CECRL.'],
          ['📁', 'Exports modifiables', 'Fiches, diaporamas, traces écrites en Word / PPT / PDF.'],
        ].map(([i, t, d]) => `<div class="card" style="padding:24px"><div style="font-size:1.8rem">${i}</div><h3 style="font-size:1.05rem;margin:.4em 0 .3em">${t}</h3><p class="muted small" style="margin:0">${d}</p></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="section-head"><h2 class="display">Les axes du programme, par niveau</h2><p>Chaque niveau a ses 6 axes propres. Le 6ᵉ, spécifique à une aire anglophone, est obligatoire chaque année.</p></div>
      <div class="level-tabs" id="levelTabs">
        ${['Seconde', 'Première', 'Terminale'].map((lv, i) => `<button class="level-tab ${i === 1 ? 'active' : ''}" data-level="${lv}">${lv}</button>`).join('')}
      </div>
      <div class="axes-grid" id="axesGrid"></div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="section-head"><h2 class="display">Sélection du moment</h2><p>Cliquez pour découvrir l'aperçu complet — gratuit, sans token.</p></div>
      <div class="grid grid-3">${featured.map(resourceCard).join('')}</div>
      <div style="text-align:center;margin-top:32px"><a class="btn btn-ghost" href="#/bibliotheque">Voir toute la bibliothèque →</a></div>
    </div>
  </section>

  <section class="section" style="padding-top:0">
    <div class="wrap">
      <div class="section-head"><h2 class="display">Comment ça marche</h2><p>De votre besoin à la séance prête, en suivant la démarche actionnelle.</p></div>
      <div class="steps">
        <div class="step"><h3>Décrivez votre besoin</h3><p>Niveau, statut (LVA/LVB/LVC), axe, thématique et durée — l'assistant collecte l'essentiel.</p></div>
        <div class="step"><h3>Validez la problématique</h3><p>Nous proposons une problématique et l'architecture de la séquence, ancrées dans le programme.</p></div>
        <div class="step"><h3>Téléchargez & adaptez</h3><p>Fiches, supports, diaporamas, grilles et corrigés — modifiables et prêts à l'emploi.</p></div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="cta-band">
        <h2 class="display">Gagnez du temps dès cette semaine</h2>
        <p>Inscrivez-vous : 5 tokens offerts, aperçu riche de toutes les ressources et un assistant qui conçoit votre séquence avec vous.</p>
        <a class="btn btn-accent" href="#/assistant">🪄 Concevoir ma séquence</a>
      </div>
    </div>
  </section>`;

  // --- Axes par niveau (onglets) ---
  const renderAxes = lv => {
    $('#axesGrid').innerHTML = AXES_BY_LEVEL[lv].map(a => `
      <div class="axe-card ${a.n === 6 ? 'is6' : ''}" onclick="location.hash='#/bibliotheque?niveau=${lv}&axe=${a.n}'">
        <div class="axe-ic">${a.icon}</div>
        <span class="axe-n">${lv.toUpperCase()} · AXE ${a.n}</span>
        <h3>${esc(a.title)}</h3>
        <p class="muted small" style="margin:0">${esc(a.desc)}</p>
      </div>`).join('');
  };
  $$('#levelTabs .level-tab').forEach(btn => btn.onclick = () => {
    $$('#levelTabs .level-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderAxes(btn.dataset.level);
  });
  renderAxes('Première');
}

/* ============================================================
   PAGE: LIBRARY (filters)
   ============================================================ */
function renderLibrary(params) {
  const preNiveau = params && params.get('niveau') ? params.get('niveau') : '';
  const preAxe = params && params.get('axe') ? +params.get('axe') : '';
  app.innerHTML = `
  <div class="page"><div class="wrap">
    <div class="page-head">
      <span class="eyebrow">Bibliothèque</span>
      <h1 class="display">Trouvez votre séquence</h1>
      <p>${LIBRARY.length} ressources : chaque combinaison <b>niveau × voie (LVA / LVB / LVC) × axe</b> est couverte. Choisissez un niveau et une voie pour filtrer. L'aperçu complet est toujours gratuit.</p>
    </div>
    <div class="filters">
      <div class="search">🔎 <input id="fSearch" placeholder="Rechercher un titre, une thématique…" /></div>
      <select id="fNiveau"><option value="">Tous niveaux</option><option>Seconde</option><option>Première</option><option>Terminale</option></select>
      <select id="fAxe"><option value="">Tous les axes</option></select>
      <select id="fStatut"><option value="">LVA / LVB / LVC</option><option>LVA</option><option>LVB</option><option>LVC</option></select>
      <select id="fSort"><option value="pop">Tri : popularité</option><option value="note">Mieux notées</option><option value="seances">Nb de séances</option></select>
    </div>
    <p class="result-count" id="resCount"></p>
    <div class="grid grid-3" id="resGrid"></div>
  </div></div>`;

  const populateAxes = (niveau, keep) => {
    const sel = $('#fAxe');
    if (!niveau) {
      sel.innerHTML = `<option value="">Tous les axes (choisir un niveau)</option>`;
      sel.disabled = false; return;
    }
    sel.disabled = false;
    sel.innerHTML = `<option value="">Tous les axes — ${niveau}</option>` +
      AXES_BY_LEVEL[niveau].map(a => `<option value="${a.n}" ${a.n === keep ? 'selected' : ''}>Axe ${a.n} — ${esc(axeShortName(a.title))}</option>`).join('');
  };

  const applyFilters = () => {
    const q = $('#fSearch').value.toLowerCase().trim();
    const axe = $('#fAxe').value, niv = $('#fNiveau').value, st = $('#fStatut').value, sort = $('#fSort').value;
    let list = LIBRARY.filter(s =>
      (!q || (s.title + s.resume + s.objet).toLowerCase().includes(q)) &&
      (!niv || s.niveau === niv) &&
      (!axe || s.axe == axe) &&
      (!st || s.statut === st));
    // Sans voie ni recherche : regroupe les 3 déclinaisons en 1 carte (lisibilité)
    const collapsed = !st && !q;
    if (collapsed) { const seen = new Set(); list = list.filter(s => seen.has(s.baseId) ? false : seen.add(s.baseId)); }
    if (sort === 'note') list.sort((a, b) => b.note - a.note);
    else if (sort === 'seances') list.sort((a, b) => b.seances - a.seances);
    else list.sort((a, b) => b.telechargements - a.telechargements);
    $('#resCount').textContent = collapsed
      ? `${list.length} séquences × 3 voies (LVA · LVB · LVC) = ${list.length * 3} ressources — choisissez une voie pour les distinguer`
      : `${list.length} ressource${list.length > 1 ? 's' : ''} trouvée${list.length > 1 ? 's' : ''}`;
    $('#resGrid').innerHTML = list.length ? list.map(s => resourceCard(s, { allVoies: collapsed })).join('')
      : `<p class="muted" style="grid-column:1/-1">Aucune ressource ne correspond. Essayez l'<a href="#/assistant" style="color:var(--brand)">assistant de création</a>.</p>`;
  };

  // niveau change repopulates the axes of that level
  $('#fNiveau').addEventListener('change', e => { populateAxes(e.target.value); applyFilters(); });
  ['fSearch', 'fAxe', 'fStatut', 'fSort'].forEach(id =>
    $('#' + id).addEventListener(id === 'fSearch' ? 'input' : 'change', applyFilters));

  // initial state (supports deep-links from the homepage axes)
  if (preNiveau) $('#fNiveau').value = preNiveau;
  populateAxes(preNiveau, preAxe);
  applyFilters();
}

/* ============================================================
   PAGE: RESOURCE DETAIL (rich preview)
   ============================================================ */
function renderDetail(id) {
  const s = findSeq(id);
  if (!s) { app.innerHTML = `<div class="page"><div class="wrap"><p>Ressource introuvable. <a href="#/bibliotheque">Retour</a></p></div></div>`; return; }

  // Catalogue-only items (no full detail): show a "coming soon" rich preview.
  const detailed = !!s.seancesDetail;

  const head = `
  <div class="detail-hero axe-c${s.axe}">
    <div class="dh-pad">
      <div class="dh-tags">
        <span class="chip">${s.niveau} · ${axeShort(s.axe)} ${esc(axeShortName(axeName(s.axe, s.niveau)))}</span>
        <span class="chip">${s.statut}</span>
        <span class="chip">CECRL ${s.cecrl}</span>
        <span class="chip">${s.seances} séances · ${esc(s.duree)}</span>
      </div>
      <h1 class="display">${esc(s.title)}</h1>
      ${s.problematique ? `<p class="dh-prob">« ${esc(s.problematique)} »</p>` : ''}
    </div>
  </div>`;

  const buybox = `
  <aside>
    <div class="panel buybox">
      <div class="price"><b>${s.tokens}</b> <span class="muted">tokens · séquence complète</span></div>
      <div class="chips">${(s.badges || []).map(badgeHTML).join('')}</div>
      <div class="preview-note">👁 <b>Aperçu gratuit</b> — vous consultez l'intégralité de la structure. Le téléchargement des fichiers modifiables consomme des tokens.</div>
      <button class="btn btn-primary btn-block" onclick="buyResource('${s.id}', ${s.tokens})">⬇ Télécharger (${s.tokens} 🪙)</button>
      <button class="btn btn-ghost btn-block" style="margin-top:8px" onclick="toggleFav('${s.id}');renderDetail('${s.id}')">${isFav(s.id) ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}</button>
      <button class="btn btn-ghost btn-block no-print" style="margin-top:8px" onclick="downloadPdf('${s.id}')">⬇ Fiche en PDF</button>
      <button class="btn btn-ghost btn-block no-print" style="margin-top:8px" onclick="window.print()">🖨️ Imprimer</button>
      ${s.livrables ? `<ul class="livrables">${s.livrables.map(l => `<li><span>${esc(l.nom)}</span><span class="fmt">${l.type}</span></li>`).join('')}</ul>` : ''}
      <div class="res-foot" style="margin-top:14px">${s.generated ? '<span class="muted small">✨ Généré par l\'assistant</span>' : `<span class="stars">${stars(s.note)}</span><span class="muted small">⬇ ${s.telechargements.toLocaleString('fr-FR')} profs</span>`}</div>
    </div>
  </aside>`;

  let main = `<div class="panel"><h2><span class="ic">📌</span> En bref</h2><p>${esc(s.resume)}</p>
    <dl class="kv">
      <dt>Axe culturel</dt><dd>${s.niveau} · ${axeShort(s.axe)} — ${esc(axeName(s.axe, s.niveau))}</dd>
      <dt>Objet(s) d'étude</dt><dd>${esc(s.objet)}</dd>
      <dt>Niveau / statut / voie</dt><dd>${s.niveau} · ${s.statut} · ${s.voie || 'Générale'}</dd>
      <dt>Niveau CECRL visé</dt><dd>${s.cecrl}</dd>
      <dt>Durée</dt><dd>${s.seances} séances · ${esc(s.duree)}</dd>
    </dl></div>`;

  if (!detailed) {
    main += `<div class="panel" style="text-align:center">
      <div style="font-size:2rem">🛠️</div>
      <h2>Séquence détaillée bientôt disponible</h2>
      <p class="muted">L'architecture complète (séances, supports, grilles) est en cours de validation par le comité éditorial.</p>
      <p>En attendant, découvrez la séquence phare entièrement détaillée :</p>
      <a class="btn btn-primary" href="#/sequence/am-dream">Voir « The American Dream »</a>
    </div>`;
    app.innerHTML = `<div class="page"><div class="wrap">${head}<div class="detail-grid"><div>${main}</div>${buybox}</div></div></div>`;
    return;
  }

  /* --- Œuvres & documents authentiques phares --- */
  if (s.ancrage && s.ancrage.length) {
    main += `<div class="panel"><h2><span class="ic">🎬</span> Œuvres &amp; documents authentiques phares</h2>
      <p class="muted small">Documents réels et vérifiables pour ancrer la séquence (à exploiter selon vos droits d'usage en classe).</p>
      <ul class="tick" style="margin-top:8px">${s.ancrage.map(a => `<li><b>${esc(a.oeuvre)}</b> <span class="chip amber">${esc(a.type)}</span><br><span class="muted small">${esc(a.source)}</span></li>`).join('')}</ul>
    </div>`;
  }

  /* --- Objectifs --- */
  const o = s.objectifs;
  main += `<div class="panel"><h2><span class="ic">🎯</span> Objectifs d'apprentissage</h2>
    <h3>Objectifs culturels</h3><ul class="tick">${o.culturels.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
    <h3>Par activité langagière</h3>
    <table class="grille"><tbody>${Object.entries(o.langagiers).map(([k, v]) => `<tr><th style="width:42%">${k}</th><td>${esc(v)}</td></tr>`).join('')}</tbody></table>
    <h3>Grammaire</h3><div class="chips">${o.grammaire.map(g => `<span class="chip">${esc(g)}</span>`).join('')}</div>
    <h3>Lexique</h3><div class="chips">${o.lexique.map(g => `<span class="chip amber">${esc(g)}</span>`).join('')}</div>
    <h3>Phonologie</h3><ul class="tick">${o.phonologie.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
  </div>`;

  /* --- Tâche finale --- */
  const tf = s.tacheFinale;
  main += `<div class="panel" style="background:linear-gradient(180deg,var(--brand-soft),#fff)">
    <h2><span class="ic">🏁</span> Tâche finale actionnelle</h2>
    <h3 style="margin-top:.3em">${esc(tf.titre)}</h3>
    <p>${esc(tf.consigne)}</p>
    <div class="chips">${tf.activites.map(a => `<span class="chip">${esc(a)}</span>`).join('')}</div>
    <p class="muted small" style="margin-top:12px">💡 ${esc(tf.perspective)}</p>
  </div>`;

  /* --- Séances accordion --- */
  main += `<div class="panel"><h2><span class="ic">📚</span> Déroulé séance par séance</h2>
    <p class="muted small">Cliquez sur une séance pour déplier ses phases et ses supports.</p>
    ${s.seancesDetail.map((se, i) => `
      <div class="seance ${i === 0 ? 'open' : ''}" data-seance>
        <div class="seance-head" onclick="this.parentElement.classList.toggle('open')">
          <span class="seance-n">${se.n}</span>
          <h3>${esc(se.titre)}</h3>
          <span class="caret">▶</span>
        </div>
        <div class="seance-body">
          <p class="muted small"><b>Objectif :</b> ${esc(se.objectif)}</p>
          ${se.phases.map(p => `<div class="phase">
            <span class="ph-name">${esc(p.nom)}</span>
            <span class="ph-min">${esc(p.min)}</span>
            <span class="ph-desc">${esc(p.desc)}</span>
          </div>`).join('')}
          <div class="supports">${se.supports.map(su => `<span class="support"><span class="stype">${esc(su.type)}</span><br><b>${esc(su.titre)}</b><br><span class="muted">${esc(su.src)}</span></span>`).join('')}</div>
        </div>
      </div>`).join('')}
  </div>`;

  /* --- Évaluation --- */
  const ev = s.evaluation;
  main += `<div class="panel"><h2><span class="ic">📊</span> Évaluation</h2>
    <h3>Diagnostique</h3><p>${esc(ev.diagnostique)}</p>
    <h3>Formative</h3><ul class="tick">${ev.formative.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
    <h3>Sommative</h3><p>${esc(ev.sommative)}</p>
    <h3>Grille — tâche finale (sur 20)</h3>
    <table class="grille"><thead><tr><th>Critère</th><th>Descripteur</th><th>Points</th></tr></thead>
    <tbody>${ev.grille.map(g => `<tr><td><b>${esc(g.critere)}</b></td><td class="muted">${esc(g.desc)}</td><td>${g.points}</td></tr>`).join('')}</tbody></table>
  </div>`;

  /* --- Différenciation & prolongements --- */
  const d = s.differenciation;
  main += `<div class="panel"><h2><span class="ic">🧩</span> Différenciation</h2>
    <div class="grid grid-2" style="gap:18px">
      <div><h3 style="margin-top:0">🟢 Soutien</h3><ul class="tick">${d.soutien.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
      <div><h3 style="margin-top:0">🔵 Approfondissement</h3><ul class="tick">${d.approfondissement.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
    </div>
    <h3>Modalités de travail</h3><div class="chips">${d.modalites.map(m => `<span class="chip">${esc(m)}</span>`).join('')}</div>
  </div>
  <div class="panel"><h2><span class="ic">🚀</span> Prolongements & ressources prof</h2>
    <h3>Prolongements suggérés</h3><ul class="tick">${(s.prolongements || []).map(p => `<li>${esc(p)}</li>`).join('')}</ul>
    ${(s.ressourcesProf && s.ressourcesProf.length) ? `<h3>Ressources pour le professeur</h3><ul class="tick">${s.ressourcesProf.map(p => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}
  </div>`;

  if (s.idees && s.idees.length) main += `<div class="panel"><h2><span class="ic">💡</span> Banque d'idées de thèmes <span class="muted" style="font-weight:400;font-size:.62em">(à piocher / varier)</span></h2>
    <p class="muted small">Pistes populaires ou connexes pour décliner, varier ou prolonger la séquence — servez-vous.</p>
    <div class="chips" style="margin-top:10px;gap:8px">${s.idees.map((i, idx) => `<button class="chip chip-btn" onclick="useIdeaByIdx('${s.id}',${idx})" title="Générer une séquence sur ce thème">${esc(i)} <span style="opacity:.6">→</span></button>`).join('')}</div>
    <p class="muted small" style="margin-top:10px">👉 Cliquez une idée pour la générer avec l'assistant (niveau & axe pré-remplis).</p></div>`;

  const genBanner = s.aiGenerated
    ? `<div class="preview-note" style="margin:16px 0 0">✨ <b>Séquence générée par l'IA</b> à partir d'articles réels (recherche web). <b>Vérifiez les liens et le contenu</b> avant usage en classe — les URLs des sources figurent dans les supports. Téléchargez le dossier (.zip) pour l'éditer.</div>`
    : s.generated
    ? `<div class="preview-note" style="margin:16px 0 0">✨ <b>Séquence générée par l'assistant</b> à partir de votre cahier des charges. Les emplacements de documents notés « à sélectionner » sont à compléter avec vos supports authentiques. Téléchargez le dossier (.zip) pour l'éditer.</div>`
    : '';
  const variantBanner = s.variant
    ? `<div class="preview-note" style="margin:16px 0 0">ℹ️ Déclinaison <b>${s.statut}</b> · cible CECRL <b>${s.cecrl}</b>. ${s.statut === 'LVA' ? "Contenu de référence." : esc(adaptForStatut(s).adaptation)} <b>Le téléchargement ajuste automatiquement la longueur des productions à la voie.</b></div>`
    : '';
  const extraBanner = s.extra
    ? `<div class="preview-note" style="margin:16px 0 0;background:#fff7ed;border-color:#fed7aa;color:#9a3412">🚀 <b>Module extra — ${esc(s.moduleType)}.</b> ${esc(s.bridge)}</div>`
    : '';
  app.innerHTML = `<div class="page"><div class="wrap">
    <a href="#/${s.generated ? 'assistant' : (s.extra ? 'programmation' : 'bibliotheque')}" class="muted small">← ${s.generated ? 'Relancer l\'assistant' : (s.extra ? 'Retour à la programmation' : 'Retour à la bibliothèque')}</a>
    ${head}${variantBanner}${extraBanner}${genBanner}
    <div class="detail-grid"><div>${main}</div>${buybox}</div>
  </div></div>`;
}

/* Téléchargement de la fiche en PDF natif (adapté à la voie) */
window.downloadPdf = (id) => {
  const s = findSeq(id); if (!s) return;
  try {
    const pdf = LinguaExport.buildSequencePdf(adaptForStatut(s), axeName);
    LinguaExport.downloadBytes(pdf, `${s.id}.pdf`, 'application/pdf');
    toast('Fiche PDF téléchargée ✓');
  } catch (e) { toast('Erreur PDF : ' + e.message); }
};

/* download / token spend — génère un VRAI fichier .zip */
window.buyResource = async (id, cost) => {
  const seq = findSeq(id);
  if (!seq) return;
  // Pas de compte → on propose d'en créer un (illimité) avant de télécharger
  if (!ACCOUNT) {
    openModal(`<div class="big-ic">🔑</div><h2>Un compte pour télécharger</h2>
      <p class="muted">Créez votre compte local (gratuit, sans serveur) pour récupérer le dossier .zip de la séquence.</p>
      <button class="btn btn-primary btn-block" onclick="closeModal();openAccountModal()">Créer mon compte illimité</button>`);
    return;
  }
  // Compte gratuit sans tokens suffisants
  if (!isUnlimited() && TOKENS < cost) {
    openModal(`<div class="big-ic">🪙</div><h2>Plus assez de tokens</h2>
      <p class="muted">Il vous faut ${cost} tokens (solde : ${TOKENS}). Passez en illimité ou rechargez.</p>
      <button class="btn btn-accent btn-block" onclick="activateUnlimited(ACCOUNT.name,ACCOUNT.email);buyResource('${id}',${cost})">⭐ Passer illimité & télécharger</button>
      <a class="btn btn-ghost btn-block" style="margin-top:8px" href="#/premium" onclick="closeModal()">Voir les offres</a>`);
    return;
  }
  // Génération + téléchargement réel (la génération du diaporama est asynchrone)
  toast('Génération du dossier en cours…');
  try {
    const zip = await LinguaExport.buildSequenceBundle(adaptForStatut(seq), axeName);
    LinguaExport.downloadBytes(zip, `${seq.id}-sequence.zip`, 'application/zip');
  } catch (e) {
    toast('Erreur de génération : ' + e.message); return;
  }
  if (!isUnlimited()) setTokens(TOKENS - cost);
  const solde = isUnlimited() ? '∞ (illimité)' : TOKENS;
  openModal(`<div class="big-ic">✅</div><h2>Dossier téléchargé</h2>
    <p class="muted">Le fichier <b>${esc(seq.id)}-sequence.zip</b> est dans vos téléchargements. Il contient :</p>
    <ul class="tick" style="text-align:left;max-width:340px;margin:0 auto 14px">
      <li>Fiche-sequence.docx (Word, modifiable)</li>
      <li>Cours-et-traces-ecrites.docx</li>
      <li>references.md (sources + licence)</li>
      <li>images/ (visuels SVG libres de droit)</li>
    </ul>
    <p class="muted small">Solde de tokens : ${solde}</p>
    <button class="btn btn-primary btn-block" onclick="closeModal()">Parfait, merci !</button>`);
};

/* ============================================================
   PAGE: PROGRAMMATION ANNUELLE (LVA)
   ============================================================ */
const PROG_PERIODS = ["Sept. – oct.", "Nov. – déc.", "Janv. – févr.", "Mars – avril", "Mai", "Juin"];
const ALL_ACTIVITES = ["Compréhension de l'oral", "Compréhension de l'écrit", "Expression orale en continu", "Expression écrite", "Interaction orale et écrite", "Médiation"];

function progSequences(niveau) {
  return SEQUENCES.filter(s => s.niveau === niveau && !s.generated).sort((a, b) => a.axe - b.axe);
}

let PROG_LV = 'Seconde', PROG_ST = 'LVA';
function renderProgrammation() {
  app.innerHTML = `
  <div class="page"><div class="wrap">
    <div class="page-head">
      <span class="eyebrow">Programmation annuelle</span>
      <h1 class="display">Le programme de l'année, clé en main</h1>
      <p>Progression finalisée par <b>niveau</b> et par <b>voie (LVA / LVB / LVC)</b> : 6 axes couverts (≥ 5 requis, dont l'axe 6 obligatoire), équilibre des 6 activités langagières et progression spiralaire. Cliquez une séquence pour ouvrir sa fiche.</p>
    </div>
    <div class="level-tabs" id="progTabs">${['Seconde', 'Première', 'Terminale'].map(lv => `<button class="level-tab ${lv === PROG_LV ? 'active' : ''}" data-level="${lv}">${lv}</button>`).join('')}</div>
    <div class="level-tabs" id="progStatut" style="margin-top:-12px">${STATUTS.map(st => `<button class="level-tab ${st === PROG_ST ? 'active' : ''}" data-st="${st}" style="padding:.45em 1.1em;font-size:.88rem">${st}</button>`).join('')}</div>
    <div id="progBody"></div>
  </div></div>`;

  const render = () => {
    const lv = PROG_LV, st = PROG_ST;
    const seqs = progSequences(lv);
    const cecrl = CECRL[lv][st];
    const totalSeances = seqs.reduce((n, s) => n + s.seances, 0);
    const axesCount = new Set(seqs.map(s => s.axe)).size;
    const hasAxe6 = seqs.some(s => s.axe === 6);
    const adaptNote = st === 'LVA' ? '' : (st === 'LVC'
      ? "Voie LVC : productions raccourcies, supports « scaffolded » par défaut, étayage lexical systématique. Le téléchargement ajuste automatiquement les longueurs."
      : "Voie LVB : productions et exigences légèrement allégées par rapport à la LVA. Le téléchargement ajuste automatiquement les longueurs.");

    $('#progBody').innerHTML = `
      <div class="grid grid-4" style="margin-bottom:26px">
        <div class="statcard"><b>${cecrl}</b><span>CECRL visé · ${lv} ${st}</span></div>
        <div class="statcard"><b>${seqs.length}</b><span>séquences sur l'année</span></div>
        <div class="statcard"><b>${totalSeances}</b><span>séances (≈ ${totalSeances} h)</span></div>
        <div class="statcard"><b>${axesCount}/6</b><span>axes couverts ${hasAxe6 ? '· axe 6 ✓' : ''}</span></div>
      </div>

      ${adaptNote ? `<div class="preview-note" style="margin-bottom:20px">ℹ️ ${adaptNote}</div>` : ''}

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px">
        <h2 style="margin:0;font-size:1.3rem">Déroulé de l'année — ${lv} ${st}</h2>
        <button class="btn btn-primary btn-sm" onclick="downloadProgrammation('${lv}','${st}')">⬇ Télécharger la programmation (Word)</button>
      </div>

      ${seqs.map((s, i) => `
        <div class="prog-row" onclick="location.hash='#/sequence/${s.id}-${st.toLowerCase()}'">
          <div class="prog-period">${PROG_PERIODS[i] || ('Période ' + (i + 1))}<span>Séquence ${i + 1}</span></div>
          <div class="prog-main">
            <div class="chips" style="margin-bottom:6px">
              <span class="chip">Axe ${s.axe} — ${esc(axeShortName(axeName(s.axe, lv)))}</span>
              <span class="chip amber">${s.seances} séances</span>
              ${s.axe === 6 ? '<span class="badge b-amber">axe 6 obligatoire</span>' : ''}
            </div>
            <h3>${esc(s.title)}</h3>
            <p class="muted small" style="margin:.1em 0 .4em">« ${esc(s.problematique)} »</p>
            <p class="small" style="margin:0"><b>Tâche finale :</b> ${esc(s.tacheFinale.titre)}</p>
          </div>
        </div>`).join('')}

      <div class="panel" style="margin-top:22px"><h2><span class="ic">🔁</span> Progression grammaticale spiralaire</h2>
        <p class="muted small">Les structures sont introduites puis réactivées et complexifiées au fil de l'année.</p>
        <ol style="margin:8px 0 0;padding-left:1.2em">${seqs.map((s, i) => `<li style="margin-bottom:.4em"><b>Séq. ${i + 1} — ${esc(axeShortName(axeName(s.axe, lv)))}</b> : ${esc(s.objectifs.grammaire.join(' · '))}</li>`).join('')}</ol>
      </div>

      <div class="panel"><h2><span class="ic">⚖️</span> Équilibre des 6 activités langagières</h2>
        <p class="muted small">La compréhension (orale & écrite) est travaillée dans chaque séquence ; les tâches finales répartissent production, interaction et médiation sur l'année.</p>
        <table class="grille" style="margin-top:8px"><tbody>${ALL_ACTIVITES.map(a => {
          const inTask = seqs.filter(s => s.tacheFinale.activites.includes(a)).length;
          const everywhere = (a === "Compréhension de l'oral" || a === "Compréhension de l'écrit");
          return `<tr><th style="width:46%">${a}</th><td>${everywhere ? 'Travaillée dans chaque séquence' : (inTask ? `Dominante de ${inTask} tâche${inTask > 1 ? 's' : ''} finale${inTask > 1 ? 's' : ''}` : 'Travaillée dans les séances')}</td></tr>`;
        }).join('')}</tbody></table>
      </div>

      ${(() => { const extras = EXTRA.filter(m => m.niveau === lv); if (!extras.length) return ''; return `
      <div class="panel" style="margin-top:22px;background:linear-gradient(180deg,#fff7ed,#fff)">
        <h2><span class="ic">🚀</span> Modules extra — aller plus loin &amp; préparer l'année suivante</h2>
        <p class="muted small">Deux modules bonus (hors programme obligatoire) : un pour <b>approfondir</b>, un pour faire la <b>passerelle</b> vers le niveau supérieur. Cliquez pour ouvrir la fiche.</p>
        <div class="grid grid-2" style="margin-top:10px">${extras.map(m => `
          <div class="card res-card" style="padding:18px" onclick="location.hash='#/sequence/${m.id}'">
            <div class="chips" style="margin-bottom:8px"><span class="chip ${m.moduleType === 'Passerelle' ? 'amber' : ''}">${m.moduleType}</span><span class="chip">CECRL ${m.cecrl}</span><span class="chip">${m.seances} séances</span></div>
            <h3 style="font-size:1.05rem;margin:.1em 0 .3em">${esc(m.title)}</h3>
            <p class="muted small" style="margin:0 0 .5em">${esc(m.resume)}</p>
            <p class="small" style="margin:0;color:#9a3412">🔗 ${esc(m.bridge)}</p>
          </div>`).join('')}</div>
      </div>`; })()}

      <div class="panel" style="background:var(--brand-soft);border-color:#bfdbfe">
        <p class="small" style="margin:0 0 8px;color:var(--brand-dk)">✅ <b>Conformité (voie générale) :</b> ${axesCount} axes couverts (minimum 5 requis), dont l'axe 6 obligatoire. Les 6 activités langagières sont équilibrées et la progression est spiralaire.</p>
        <p class="small" style="margin:0;color:var(--brand-dk)">🛠️ <b>Voie technologique :</b> au moins 3 axes dans l'année (axe 6 vivement recommandé) — retenez par exemple les séquences 1, 4 et 6 ; allégez les tâches et envisagez l'ETLV.</p>
      </div>`;
  };

  $$('#progTabs .level-tab').forEach(b => b.onclick = () => {
    $$('#progTabs .level-tab').forEach(x => x.classList.remove('active')); b.classList.add('active');
    PROG_LV = b.dataset.level; render();
  });
  $$('#progStatut .level-tab').forEach(b => b.onclick = () => {
    $$('#progStatut .level-tab').forEach(x => x.classList.remove('active')); b.classList.add('active');
    PROG_ST = b.dataset.st; render();
  });
  render();
}

window.downloadProgrammation = (lv, st) => {
  const seqs = progSequences(lv);
  try {
    const docx = LinguaExport.buildProgrammationDocx(lv, st, CECRL[lv][st], seqs, axeName, PROG_PERIODS);
    LinguaExport.downloadBytes(docx, `programmation-${st}-${lv}.docx`, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    toast('Programmation téléchargée ✓');
  } catch (e) { toast('Erreur : ' + e.message); }
};

/* ============================================================
   PAGE: MON ESPACE (favoris + séquences générées, persistés)
   ============================================================ */
function renderMonEspace() {
  const favs = FAVORITES.map(findSeq).filter(Boolean);
  const gens = GENERATED.slice().reverse();
  app.innerHTML = `
  <div class="page"><div class="wrap">
    <div class="page-head"><span class="eyebrow">Mon espace</span>
      <h1 class="display">Mes favoris &amp; mes séquences</h1>
      <p>Vos ressources sauvegardées sur cet appareil (localStorage — aucune donnée envoyée).</p></div>

    <h2 style="font-size:1.3rem">★ Favoris <span class="muted" style="font-size:.7em;font-weight:400">(${favs.length})</span></h2>
    ${favs.length ? `<div class="grid grid-3" style="margin-bottom:34px">${favs.map(s => resourceCard(s)).join('')}</div>`
      : `<p class="muted" style="margin-bottom:34px">Aucun favori pour l'instant. Ouvrez une fiche et cliquez « ☆ Ajouter aux favoris ».</p>`}

    <h2 style="font-size:1.3rem">🪄 Mes séquences générées <span class="muted" style="font-size:.7em;font-weight:400">(${gens.length})</span></h2>
    ${gens.length ? `<div class="grid grid-3">${gens.map(s => resourceCard(s)).join('')}</div>
      <button class="btn btn-ghost btn-sm" style="margin-top:16px" onclick="if(confirm('Supprimer toutes les séquences générées ?')){GENERATED=[];saveGenerated();renderMonEspace();}">Tout supprimer</button>`
      : `<p class="muted">Aucune séquence générée. <a href="#/assistant" style="color:var(--brand)">Lancez l'assistant</a> pour en créer une — elle sera sauvegardée ici.</p>`}
  </div></div>`;
}

/* ============================================================
   PAGE: ASSISTANT (wizard following the workflow)
   ============================================================ */
const WSTATE = { niveau: 'Première', statut: 'LVA', voie: 'Générale', axe: 6, theme: '', duree: '6', diff: 'Oui' };
let WSTEP = 0;
const WSTEPS = ['Niveau', 'Statut', 'Axe', 'Thème & durée', 'Problématique'];

function renderAssistant() {
  WSTEP = 0;
  app.innerHTML = `
  <div class="page"><div class="wrap">
    <div class="page-head" style="text-align:center;margin:0 auto 32px">
      <span class="eyebrow">Assistant de conception</span>
      <h1 class="display">Concevons votre séquence ensemble</h1>
      <p>L'assistant suit la démarche du programme : collecte des informations → problématique → architecture.</p>
    </div>
    <div class="wizard">
      <div class="wiz-rail" id="wizRail">${WSTEPS.map((s, i) => `<div class="wr ${i === 0 ? 'active' : ''}" data-wr="${i}"><span>${i + 1}</span>${s}</div>`).join('')}</div>
      <div class="wiz-body" id="wizBody"></div>
    </div>
  </div></div>`;
  renderWizStep();
}

function wizPills(field, options) {
  return `<div class="opt-row">${options.map(o =>
    `<div class="opt ${WSTATE[field] == o ? 'sel' : ''}" onclick="pickWiz('${field}','${o}')">${o}</div>`).join('')}</div>`;
}
window.pickWiz = (field, val) => { WSTATE[field] = val; renderWizStep(); };

function renderWizStep() {
  // rail state
  $$('#wizRail .wr').forEach((el, i) => {
    el.classList.toggle('active', i === WSTEP);
    el.classList.toggle('done', i < WSTEP);
  });
  const body = $('#wizBody');
  let html = '';
  if (WSTEP === 0) {
    html = `<div class="wiz-step active"><h2>1 · Pour quel niveau ?</h2><p class="help">Le niveau CECRL visé en découlera automatiquement (cf. programme).</p>
      <div class="field"><label>Classe</label>${wizPills('niveau', ['Seconde', 'Première', 'Terminale'])}</div>
      <div class="field"><label>Voie</label>${wizPills('voie', ['Générale', 'Technologique'])}</div></div>`;
  } else if (WSTEP === 1) {
    const cec = CECRL[WSTATE.niveau][WSTATE.statut];
    html = `<div class="wiz-step active"><h2>2 · Statut de la langue</h2><p class="help">LVA, LVB ou LVC — cela fixe le niveau CECRL attendu.</p>
      <div class="field"><label>Statut</label>${wizPills('statut', ['LVA', 'LVB', 'LVC'])}</div>
      <div class="gen-prob" style="font-style:normal">🎯 Niveau CECRL visé pour <b>${WSTATE.niveau} · ${WSTATE.statut}</b> : <b>${cec}</b></div></div>`;
  } else if (WSTEP === 2) {
    const axes = AXES_BY_LEVEL[WSTATE.niveau];
    if (!axes.find(a => a.n == WSTATE.axe)) WSTATE.axe = 6; // garde un axe valide pour le niveau
    html = `<div class="wiz-step active"><h2>3 · Axe culturel — ${WSTATE.niveau}</h2><p class="help">Voici les 6 axes <b>propres au programme de ${WSTATE.niveau}</b>. L'axe 6 (aire anglophone) est obligatoire dans l'année.</p>
      <div class="axe-pick">${axes.map(a => `<div class="opt ${WSTATE.axe == a.n ? 'sel' : ''}" onclick="pickWiz('axe','${a.n}')"><span class="ic">${a.icon}</span><span><b>Axe ${a.n}</b> — ${esc(axeShortName(a.title))}</span></div>`).join('')}</div></div>`;
  } else if (WSTEP === 3) {
    html = `<div class="wiz-step active"><h2>4 · Thématique & durée</h2><p class="help">Une thématique précise nous aide à proposer la bonne problématique.</p>
      <div class="field"><label>Thématique / objet d'étude souhaité</label>
        <input class="wiz-input" id="wTheme" placeholder="ex : le rêve américain, la surveillance numérique, l'art de la contestation…" value="${esc(WSTATE.theme)}" /></div>
      <div class="field"><label>Durée de la séquence</label>${wizPills('duree', ['4', '5', '6', '8'])} <span class="muted small">séances</span></div>
      <div class="field"><label>Différenciation à prévoir ?</label>${wizPills('diff', ['Oui', 'Standard'])}</div></div>`;
  } else if (WSTEP === 4) {
    const theme = WSTATE.theme.trim();
    if (!WSTATE.theme && $('#wTheme')) WSTATE.theme = $('#wTheme').value;
    const cec = CECRL[WSTATE.niveau][WSTATE.statut];
    const prob = generateProblematique(WSTATE);
    html = `<div class="wiz-step active"><h2>5 · Votre proposition de séquence</h2><p class="help">Voici l'architecture proposée à partir de vos réponses. Validez ou ajustez.</p>
      <div class="brief">
        <div class="brief-row"><span class="bl">Niveau / statut / voie</span><span>${WSTATE.niveau} · ${WSTATE.statut} · ${WSTATE.voie}</span></div>
        <div class="brief-row"><span class="bl">Niveau CECRL visé</span><span>${cec}</span></div>
        <div class="brief-row"><span class="bl">Axe culturel</span><span>${WSTATE.niveau} · Axe ${WSTATE.axe} — ${esc(axeName(+WSTATE.axe, WSTATE.niveau))}</span></div>
        <div class="brief-row"><span class="bl">Thématique</span><span>${esc(WSTATE.theme || '—')}</span></div>
        <div class="brief-row"><span class="bl">Durée</span><span>${WSTATE.duree} séances</span></div>
        <div class="brief-row"><span class="bl">Différenciation</span><span>${WSTATE.diff === 'Oui' ? 'Soutien + approfondissement inclus' : 'Standard'}</span></div>
      </div>
      <div class="gen-prob">💬 <b>Problématique proposée :</b><br>« ${esc(prob)} »</div>
      <p class="muted small">Architecture générée : ${WSTATE.duree} séances (anticipation → compréhension → production → trace écrite), tâche finale actionnelle, évaluations (diagnostique / formative / sommative) et grille CECRL ${cec}.</p>
      <button class="btn btn-primary btn-block" onclick="validateBrief()">✅ Valider et générer la séquence</button>
      <div style="margin-top:14px;padding-top:14px;border-top:1px solid var(--rule)">
        ${AI_ENDPOINT ? `
          <button class="btn btn-ghost btn-block" onclick="generateWithAI()">✨ Générer avec l'IA — vrais articles</button>
          <p class="muted small" style="margin:.5em 0 0">L'IA cherche 2-3 articles réels sur « ${esc(WSTATE.theme || 'le thème')} » (sources web vérifiées) et rédige la séquence autour, au même format. Compter <b>1 à 3 min</b>.</p>
        ` : `
          <details><summary class="muted small" style="cursor:pointer;list-style:none">✨ Activer la génération par IA (articles réels)…</summary>
            <p class="muted small" style="margin:.6em 0 .4em">Collez l'URL de votre fonction Cloudflare Worker (voir <code>worker/README.md</code>) :</p>
            <div style="display:flex;gap:8px">
              <input class="wiz-input" id="aiEndpoint" placeholder="https://lingualab-ia.votre-compte.workers.dev" style="flex:1" />
              <button class="btn btn-ghost btn-sm" onclick="saveAiEndpoint()">Enregistrer</button>
            </div>
          </details>
        `}
      </div>
    </div>`;
  }
  body.innerHTML = html + wizNav();
  if (WSTEP === 3) { const t = $('#wTheme'); if (t) t.addEventListener('input', e => WSTATE.theme = e.target.value); }
}

function wizNav() {
  return `<div class="wiz-nav">
    <button class="btn btn-ghost" ${WSTEP === 0 ? 'disabled style="opacity:.4"' : ''} onclick="wizGo(-1)">← Précédent</button>
    ${WSTEP < WSTEPS.length - 1 ? `<button class="btn btn-primary" onclick="wizGo(1)">Suivant →</button>` : ''}
  </div>`;
}
window.wizGo = d => {
  if (WSTEP === 3) { const t = $('#wTheme'); if (t) WSTATE.theme = t.value; }
  WSTEP = Math.max(0, Math.min(WSTEPS.length - 1, WSTEP + d));
  renderWizStep();
};

function generateProblematique(s) {
  const t = (s.theme || '').trim();
  // Si le thème est en français, on ne l'injecte pas dans la phrase anglaise
  // (il reste dans le titre/objet) — évite le franglais dans la problématique.
  const looksFrench = /[éèêëàâäçùûüôîï«»]/.test(t) || /\b(le|la|les|des|du|une?|et|aux|aux?|d'|l'|sur|dans)\b/i.test(t);
  const subj = (t && !looksFrench) ? t : 'this theme';
  const title = (axeName(+s.axe, s.niveau) || '').toLowerCase();
  // Problématique dérivée du LIBELLÉ de l'axe (qui dépend du niveau)
  const rules = [
    [/repr.sentation de soi|rapport . autrui/, `How do we build our image of ourselves and others through ${subj}?`],
    [/g.n.rations/, `What does ${subj} reveal about the ties between generations?`],
    [/pass. dans le pr.sent/, `How does the past still shape the present through ${subj}?`],
    [/d.fis et transitions/, `Can ${subj} help us face the challenges of a changing world?`],
    [/cr.er et recr.er/, `How does ${subj} let us create — and recreate — the world around us?`],
    [/commonwealth/, `What heritage unites the Commonwealth through ${subj}?`],
    [/identit.s et .changes/, `To what extent does ${subj} reshape identities and exchanges?`],
    [/diversit. et inclusion/, `How can ${subj} promote diversity and inclusion?`],
    [/art et pouvoir/, `Can ${subj} challenge — or serve — those in power?`],
    [/innovations scientifiques/, `Should science be allowed to reshape our world through ${subj}?`],
    [/.tre humain et la nature/, `What does ${subj} tell us about our bond with nature?`],
    [/aires anglophones am.ricaines/, `To what extent does ${subj} reveal the promises and fractures of America?`],
    [/espace priv. et espace public/, `Where should the line be drawn between private and public when it comes to ${subj}?`],
    [/territoire et m.moire/, `How does ${subj} shape our memory of a place or a nation?`],
    [/fictions et r.alit.s/, `What truth about reality does the fiction of ${subj} reveal?`],
    [/enjeux et formes de la communication/, `How does ${subj} change the way we communicate and inform?`],
    [/citoyennet. et mondes virtuels/, `Does ${subj} strengthen or threaten citizenship in a connected world?`],
    [/royaume-uni et ses nations/, `What unites and what divides the nations of the UK through ${subj}?`],
  ];
  for (const [re, q] of rules) if (re.test(title)) return q;
  return `How does ${subj} matter in the English-speaking world?`;
}

/* Cliquer une idée de la banque → pré-remplit l'assistant et y saute */
window.useIdeaByIdx = (id, idx) => {
  const s = findSeq(id); if (!s) return;
  const idea = (s.idees || [])[idx] || '';
  WSTATE.niveau = s.niveau;
  WSTATE.statut = s.statut;
  WSTATE.voie = s.voie || 'Générale';
  WSTATE.axe = String(s.axe);
  WSTATE.theme = idea;
  WSTATE.duree = ['4', '5', '6', '8'].includes(String(s.seances)) ? String(s.seances) : '5';
  WSTATE.diff = 'Oui';
  location.hash = '#/assistant';
  setTimeout(() => { WSTEP = 3; renderWizStep(); toast('Thème pré-rempli : « ' + idea + ' » — ajustez puis générez'); }, 70);
};

window.validateBrief = () => {
  const t = $('#wTheme'); if (t) WSTATE.theme = t.value;
  const seq = buildGeneratedSequence(WSTATE);
  GENERATED.push(seq); saveGenerated();
  closeModal();
  location.hash = '#/sequence/' + seq.id;
  toast('Séquence générée ✓ — sauvegardée dans « Mon espace »');
};

/* ---- Génération par IA (via Cloudflare Worker → API Claude) ---- */
window.saveAiEndpoint = () => {
  const el = $('#aiEndpoint'); const v = el ? el.value.trim() : '';
  if (!/^https?:\/\//.test(v)) { toast('URL invalide (doit commencer par https://)'); return; }
  AI_ENDPOINT = v; localStorage.setItem(AI_KEY, v);
  toast('Endpoint IA enregistré ✓'); renderWizStep();
};

function assembleAiSequence(state, ai) {
  const base = buildGeneratedSequence(state); // scaffold + métadonnées (visuel, badges, livrables…)
  ['title', 'objet', 'problematique', 'resume', 'objectifs', 'tacheFinale',
    'seancesDetail', 'evaluation', 'differenciation', 'prolongements', 'ancrage', 'idees']
    .forEach(k => { if (ai[k] != null) base[k] = ai[k]; });
  base.id = 'gen-' + Date.now();
  base.aiGenerated = true;
  if (Array.isArray(base.seancesDetail) && base.seancesDetail.length) {
    base.seances = base.seancesDetail.length;
    base.duree = `≈ ${base.seances} × 55 min`;
  }
  return base;
}

window.generateWithAI = async () => {
  const t = $('#wTheme'); if (t) WSTATE.theme = t.value;
  if (!AI_ENDPOINT) { toast("Configurez d'abord l'endpoint IA"); return; }
  openModal(`<div style="text-align:center;padding:8px 4px">
    <div style="font-size:2.4em">✨</div>
    <h2 style="margin:.2em 0">Génération par l'IA…</h2>
    <p class="muted">Recherche d'articles réels, puis rédaction de la séquence au format attendu. Comptez <b>1 à 3 minutes</b> — ne fermez pas la page.</p>
    <div class="spinner" style="margin:14px auto"></div></div>`);
  try {
    const res = await fetch(AI_ENDPOINT, {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        niveau: WSTATE.niveau, statut: WSTATE.statut, voie: WSTATE.voie,
        axe: +WSTATE.axe, axeName: axeName(+WSTATE.axe, WSTATE.niveau),
        cecrl: CECRL[WSTATE.niveau][WSTATE.statut],
        theme: WSTATE.theme || '', duree: +WSTATE.duree || 5,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok || !data.sequence) throw new Error(data.error || ('HTTP ' + res.status));
    const seq = assembleAiSequence(WSTATE, data.sequence);
    GENERATED.push(seq); saveGenerated();
    closeModal();
    location.hash = '#/sequence/' + seq.id;
    toast('Séquence IA générée ✓ — articles réels inclus');
  } catch (err) {
    openModal(`<div style="text-align:center;padding:8px 4px">
      <div style="font-size:2.4em">⚠️</div>
      <h2 style="margin:.2em 0">Échec de la génération IA</h2>
      <p class="muted">${esc(String(err.message || err))}</p>
      <button class="btn btn-primary btn-block" style="margin-top:12px" onclick="closeModal();validateBrief()">Générer la version locale (instantanée)</button>
      <button class="btn btn-ghost btn-block" style="margin-top:8px" onclick="closeModal()">Fermer</button></div>`);
  }
};

/* ============================================================
   Générateur de séquence (à partir du cahier des charges)
   Produit un objet conforme au schéma des séquences, donc
   directement affichable ET téléchargeable (ZIP/Word/PPTX).
   ============================================================ */
const GRAM_BY_LEVEL = {
  Seconde:   ["Le présent simple et le présent en be + -ing", "Le prétérit (récit au passé)", "Les comparatifs et « there is / there are »"],
  Première:  ["Le present perfect (bilan et changement)", "Les modaux (opinion, obligation, déduction)", "Les propositions relatives"],
  Terminale: ["Les temps du récit et le present perfect", "Les modaux de déduction (must have, might have)", "La voix passive et les structures complexes"],
};
const EE_LEN = { Seconde: "≈ 80 mots", Première: "≈ 150 mots", Terminale: "≈ 200 mots" };
const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

function genTask(axisTitle, theme, cecrl) {
  const t = theme || "le thème";
  const T = (axisTitle || "").toLowerCase();
  const persp = "L'élève agit avec la langue : il réalise une production authentique destinée à un public réel (la classe / l'ENT).";
  const mk = (titre, consigne, activites) => ({ titre, consigne, activites, perspective: persp, cecrl });
  if (/art|créer|recréer/.test(T)) return mk("Concevoir et présenter une œuvre engagée", `En binôme, créez une production visuelle (affiche, œuvre) sur « ${t} » et présentez-la à l'oral en expliquant votre message.`, ["Expression orale en continu", "Expression écrite", "Interaction orale et écrite"]);
  if (/fiction/.test(T)) return mk("Écrire et lire un court récit", `Écrivez puis lisez à voix haute un court texte de fiction inspiré de « ${t} ». La classe identifie les procédés et le sens.`, ["Expression écrite", "Expression orale en continu", "Interaction orale et écrite"]);
  if (/innovation|scientifique/.test(T)) return mk("Débattre et prendre position", `Préparez et tenez un débat sur un dilemme lié à « ${t} », puis rédigez votre prise de position argumentée.`, ["Interaction orale et écrite", "Expression écrite", "Expression orale en continu"]);
  if (/communication|citoyennet|espace (priv|public)|virtuel/.test(T)) return mk("Enregistrer un podcast / une tribune", `Réalisez un podcast (ou une tribune écrite) défendant un point de vue argumenté sur « ${t} », avec exemples.`, ["Expression orale en continu", "Expression écrite", "Compréhension de l'écrit"]);
  if (/nature|défis|transition/.test(T)) return mk("Créer une campagne de sensibilisation", `En binôme, créez une campagne (affiche + appel) pour sensibiliser à « ${t} ».`, ["Expression écrite", "Expression orale en continu", "Interaction orale et écrite"]);
  if (/représentation de soi|autrui|générations|passé/.test(T)) return mk("Réaliser un portrait / témoignage", `Réalisez un portrait, un témoignage ou une interview autour de « ${t} » et présentez-le à la classe.`, ["Expression écrite", "Expression orale en continu", "Médiation"]);
  return mk("Réaliser une présentation culturelle", `En binôme, préparez une présentation (exposé ou vlog) faisant découvrir un aspect de « ${t} » dans l'aire anglophone.`, ["Expression orale en continu", "Expression écrite", "Interaction orale et écrite"]);
}

function genSeance(n, titre, objectif, o) {
  const t = o.theme || "le thème";
  const compType = o.focus === "CO" ? "Compréhension de l'oral" : o.focus === "MED" ? "Médiation" : "Compréhension de l'écrit";
  const compDesc = o.focus === "CO"
    ? `Écoute d'un document audio/vidéo authentique sur « ${t} ». Consigne : repérer les informations clés (qui, quoi, point de vue) et compléter une grille. Modalité : écoute fractionnée, individuel puis binôme. Production attendue : grille renseignée et corrigée.`
    : o.focus === "MED"
      ? `Médiation : restituer en anglais l'essentiel d'un document en français lié à « ${t} ». Consigne : dégager 3 idées clés et les reformuler. Modalité : binôme. Production attendue : restitution en anglais.`
      : `Lecture d'un document écrit authentique sur « ${t} ». Consigne : repérer la thèse, les arguments et le lexique clé. Modalité : individuel puis mise en commun. Production attendue : carte des idées principales.`;
  const prod = (n % 2 === 0)
    ? { nom: "Production écrite", min: "16 min", desc: `Réinvestissement à l'écrit. Consigne : rédiger un court texte (${o.eeLen}) en lien avec le document. Modalité : individuel. Production attendue : écrit structuré (premier jet).` }
    : { nom: "Production orale", min: "16 min", desc: `Réinvestissement à l'oral. Consigne : présenter ou réagir en justifiant son point de vue. Modalité : binôme. Production attendue : prise de parole d'1 à 2 minutes.` };
  const phases = [
    { nom: "Anticipation / Lead-in", min: "8 min", desc: `Mise en route à partir d'un document déclencheur (image, citation, mot-clé) sur « ${t} ». Consigne : « What do you already know or think about it? » Modalité : classe entière. Production attendue : hypothèses et lexique émergent.` },
    { nom: compType, min: "26 min", desc: compDesc },
    prod,
    { nom: "Trace écrite", min: "7 min", desc: `Synthèse co-construite + point de langue : ${o.gram}. Devoir : préparer l'étape suivante (réactivation / courte recherche). Modalité : classe entière.` },
  ];
  const supports = o.focus === "CO"
    ? [{ type: "Vidéo", titre: `Document audio/vidéo sur « ${t} » (à sélectionner)`, src: "BBC / reportage / podcast — source à préciser" }, { type: "Image", titre: "Visuel d'accroche", src: "Banque libre de droits (Wikimedia, Library of Congress)" }]
    : o.focus === "MED"
      ? [{ type: "Infographie", titre: `Document chiffré en français sur « ${t} »`, src: "Médiation FR→EN (à sélectionner)" }, { type: "Document", titre: "Note de contexte", src: "Ressource enseignant" }]
      : [{ type: "Article", titre: `Article / texte authentique sur « ${t} » (à sélectionner)`, src: "The Guardian / BBC / NYT — source à préciser" }, { type: "Image", titre: "Document iconographique", src: "Banque libre de droits" }];
  return { n, titre, objectif, phases, supports };
}

function buildGeneratedSequence(st) {
  const niveau = st.niveau, statut = st.statut, voie = st.voie, axeN = +st.axe;
  const axisTitle = axeName(axeN, niveau);
  const cecrl = CECRL[niveau][statut];
  const N = Math.max(3, +st.duree || 5);
  const theme = (st.theme || "").trim();
  const themeLabel = theme || axisTitle.toLowerCase();
  const eeLen = EE_LEN[niveau];
  const gram = GRAM_BY_LEVEL[niveau];
  const palette = [
    "linear-gradient(135deg,#1d4ed8,#7c3aed)", "linear-gradient(135deg,#0f766e,#22c55e)",
    "linear-gradient(135deg,#b91c1c,#f59e0b)", "linear-gradient(135deg,#312e81,#9333ea)",
    "linear-gradient(135deg,#0f172a,#0891b2)", "linear-gradient(135deg,#134e4a,#ca8a04)",
  ];
  const task = genTask(axisTitle, theme, cecrl);

  // Séances : lead-in → arc de découverte → tâche finale
  const seances = [];
  seances.push(genSeance(1, `Discovering « ${cap(themeLabel)} »`, "Entrer dans le thème et formuler des hypothèses.",
    { focus: "CE", theme, gram: gram[0], eeLen }));
  const foci = ["CO", "CE", "MED", "CE", "CO", "MED"];
  const titles = { CO: "Listening to voices", CE: "Reading into the theme", MED: "Bridging two languages" };
  for (let n = 2; n <= N - 1; n++) {
    const f = foci[(n - 2) % foci.length];
    seances.push(genSeance(n, titles[f], "Approfondir la compréhension et réinvestir.",
      { focus: f, theme, gram: gram[(n - 1) % gram.length], eeLen }));
  }
  seances.push({
    n: N, titre: `Tâche finale — ${task.titre}`, objectif: "Réaliser et évaluer la tâche finale actionnelle.",
    phases: [
      { nom: "Préparation", min: "15 min", desc: "Consigne : relire la grille d'évaluation, planifier et répéter. Modalité : binôme. Production attendue : production prête à finaliser." },
      { nom: "Production", min: "30 min", desc: `Consigne : réaliser la tâche finale (${task.titre.toLowerCase()}). Modalité : individuel / binôme, professeur en appui. Production attendue : production finale.` },
      { nom: "Co-évaluation", min: "10 min", desc: "Consigne : « 2 réussites + 1 conseil » à l'aide de la grille. Modalité : binômes croisés. Production attendue : feedback constructif." },
    ],
    supports: [{ type: "Grille", titre: `Grille d'évaluation (CECRL ${cecrl})`, src: "Ressource enseignant (créée)" }],
  });

  return {
    id: "gen-" + Date.now(), generated: true,
    title: theme ? `${cap(theme)} — ${axeShortName(axisTitle)}` : axisTitle,
    axe: axeN, axeAlt: null, niveau, statut, voie, cecrl,
    objet: `${axisTitle}${theme ? " · " + cap(theme) : ""}`,
    seances: N, duree: `≈ ${N} × 55 min`, tokens: 3, note: 0, telechargements: 0,
    badges: ["conforme", "diff", "eval"], visuel: palette[(axeN - 1) % palette.length],
    resume: `Séquence générée par l'assistant à partir de votre cahier des charges : « ${themeLabel} », axe « ${axisTitle} » (${niveau} · ${statut} · CECRL ${cecrl}). ${N} séances suivant la démarche actionnelle — tâche finale, évaluations et différenciation incluses. Architecture à enrichir avec vos documents.`,
    problematique: generateProblematique({ niveau, axe: axeN, theme }),
    objectifs: {
      culturels: [
        `Découvrir « ${themeLabel} » dans le contexte de l'aire anglophone.`,
        `Relier le thème à l'axe « ${axisTitle} » et à ses enjeux.`,
        "Développer un regard interculturel et un esprit critique sur le sujet.",
      ],
      langagiers: {
        "Compréhension de l'oral": `Comprendre l'essentiel d'un document audio/vidéo authentique sur le thème (niveau ${cecrl}).`,
        "Compréhension de l'écrit": "Repérer les informations clés et le point de vue dans un document écrit.",
        "Expression orale en continu": "Présenter et justifier un point de vue lié au thème.",
        "Expression écrite": `Produire un écrit structuré (${eeLen}).`,
        "Interaction orale et écrite": "Réagir et dialoguer dans un échange réglé.",
        "Médiation": "Restituer ou reformuler l'essentiel d'un document pour un pair.",
      },
      grammaire: gram.slice(),
      lexique: [`Champ lexical lié à « ${themeLabel} »`, "Connecteurs logiques et expressions d'opinion"],
      phonologie: ["Accentuation des mots clés du thème", "Intonation expressive selon l'intention de communication"],
    },
    tacheFinale: { titre: task.titre, consigne: task.consigne, activites: task.activites, perspective: task.perspective },
    seancesDetail: seances,
    evaluation: {
      diagnostique: `Recueil des représentations sur « ${themeLabel} » en séance 1 pour ajuster les apports.`,
      formative: [`Production intermédiaire — feedback ciblé sur « ${gram[0].toLowerCase()} »`, "Prise de parole en interaction — observation", "Auto-évaluation à mi-parcours (check-list compétences)"],
      sommative: `Tâche finale évaluée à la grille CECRL ${cecrl}.`,
      grille: [
        { critere: "Réalisation de la tâche & pertinence", desc: "Répond à la consigne et à la problématique", points: 6 },
        { critere: "Étendue & maîtrise du lexique", desc: `Champ lexical de « ${themeLabel} » réinvesti`, points: 5 },
        { critere: "Correction grammaticale", desc: "Structures de la séquence mobilisées", points: 5 },
        { critere: "Recevabilité phonologique & fluidité", desc: "Accentuation, intonation, débit", points: 4 },
      ],
    },
    differenciation: {
      soutien: ["Banque de vocabulaire fournie avant chaque document", "Amorces de phrases pour les productions", "Documents en version « scaffolded »"],
      approfondissement: ["Document complémentaire pour les élèves avancés", "Tâche complexifiée (objection, nuance, comparaison)"],
      modalites: ["Individuel (écrits)", "Binôme (oral & tâche)", "Groupe (échanges)", "Classe entière (mises en commun)"],
    },
    prolongements: [
      ...(voie === 'Technologique' ? ["Voie technologique : 3 axes/an suffisent (axe 6 vivement recommandé) ; tâches allégées et co-enseignement ETLV envisageable."] : []),
      "Associer un second axe relié par une problématique commune.",
      `Lecture cursive ou document complémentaire sur « ${themeLabel} ».`,
      "Prolongement interdisciplinaire (EMC, histoire, arts…).",
    ],
    ressourcesProf: [
      `Eduscol — Programme LV de ${niveau}, axe « ${axisTitle} ».`,
      "Sources authentiques : The Guardian, BBC, The New York Times, Library of Congress.",
      "Banques d'images libres de droits (Wikimedia Commons).",
    ],
    livrables: [
      { nom: "Fiche séquence (synthèse 2 p.)", type: "PDF" },
      { nom: `${N} fiches de séance détaillées`, type: "PDF" },
      { nom: "Supports élèves + corrigés", type: "PDF" },
      { nom: "Diaporama de présentation par séance", type: "PPT" },
      { nom: "Traces écrites structurées", type: "Word" },
      { nom: "Grilles d'évaluation (tâche finale)", type: "PDF" },
      { nom: "Annexes : lexique & points de grammaire", type: "PDF" },
    ],
  };
}

/* ============================================================
   PAGE: EXERCISES
   ============================================================ */
function renderExercises() {
  app.innerHTML = `
  <div class="page"><div class="wrap">
    <div class="page-head"><span class="eyebrow">Banque d'exercices</span>
      <h1 class="display">${EXERCICES.length} exercices, prêts à imprimer</h1>
      <p>QCM, textes à trous, jeux de rôle, médiation, phonologie… Chaque exercice contient sa <b>consigne, ses items et son corrigé</b> — téléchargeables en Word (.docx). Filtrez par niveau, compétence et difficulté.</p></div>
    <div class="filters">
      <div class="search">🔎 <input id="eSearch" placeholder="Rechercher un exercice…" /></div>
      <select id="eNiveau"><option value="">Tous niveaux</option><option>Seconde</option><option>Première</option><option>Terminale</option></select>
      <select id="eComp"><option value="">Toutes compétences</option>${[...new Set(EXERCICES.map(e => e.competence))].map(c => `<option>${c}</option>`).join('')}</select>
      <select id="eDiff"><option value="">Toute difficulté</option><option value="★">★ Facile</option><option value="★★">★★ Moyen</option><option value="★★★">★★★ Avancé</option></select>
    </div>
    <p class="result-count" id="eCount"></p>
    <div class="grid grid-3" id="eGrid"></div>
  </div></div>`;

  const apply = () => {
    const q = $('#eSearch').value.toLowerCase().trim(), c = $('#eComp').value, d = $('#eDiff').value, niv = $('#eNiveau').value;
    const list = EXERCICES.filter(e =>
      (!q || (e.titre + e.desc + e.type + e.competence).toLowerCase().includes(q)) &&
      (!niv || e.niveau === niv) && (!c || e.competence === c) && (!d || e.difficulte === d));
    $('#eCount').textContent = `${list.length} exercice${list.length > 1 ? 's' : ''}`;
    $('#eGrid').innerHTML = list.length ? list.map(e => `
      <article class="card" style="padding:20px;cursor:pointer" onclick="exDownload('${e.id}', ${e.tokens})">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
          <span class="chip">${esc(e.competence)}</span>
          <span class="${e.tokens === 0 ? 'badge b-green' : 'res-tokens'}" style="position:static">${e.tokens === 0 ? 'Gratuit' : '🪙 ' + e.tokens}</span>
        </div>
        <h3 style="font-size:1.02rem;margin:.6em 0 .2em">${esc(e.titre)}</h3>
        <p class="muted small" style="margin:0 0 .8em">${esc(e.desc)}</p>
        <div class="chips" style="margin-bottom:10px"><span class="chip">${esc(e.niveau)}</span>${e.corrige ? '<span class="chip amber">corrigé inclus</span>' : ''}</div>
        <div class="res-foot"><span>${esc(e.type)}</span><span class="stars">${e.difficulte}</span></div>
      </article>`).join('') : `<p class="muted" style="grid-column:1/-1">Aucun exercice ne correspond à ces filtres.</p>`;
  };
  ['eSearch', 'eNiveau', 'eComp', 'eDiff'].forEach(id => $('#' + id).addEventListener(id === 'eSearch' ? 'input' : 'change', apply));
  apply();
}
window.exDownload = (id, cost) => {
  const e = EXERCICES.find(x => x.id === id);
  if (cost > 0 && !isUnlimited() && TOKENS < cost) {
    if (!ACCOUNT) { openAccountModal(); return; }
    location.hash = '#/premium'; return;
  }
  try {
    const docx = LinguaExport.buildExerciseDocx(e, axeName);
    LinguaExport.downloadBytes(docx, `${e.id}-${e.titre.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.docx`,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  } catch (err) { toast('Erreur : ' + err.message); return; }
  if (cost > 0 && !isUnlimited()) setTokens(TOKENS - cost);
  openModal(`<div class="big-ic">✅</div><h2>Exercice téléchargé</h2><p class="muted">« ${esc(e.titre)} » — fichier Word (.docx) avec corrigé.${cost > 0 && !isUnlimited() ? ' ' + cost + ' token débité.' : ''}</p><button class="btn btn-primary btn-block" onclick="closeModal()">Fermer</button>`);
};

/* ============================================================
   PAGE: NEWS
   ============================================================ */
function renderNews() {
  const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  app.innerHTML = `
  <div class="page"><div class="wrap">
    <div class="page-head"><span class="eyebrow">Actualité · Veille éducation</span>
      <h1 class="display">Ce qui change pour vous</h1>
      <p>Une sélection courte et actionnable : l'essentiel + « ce que ça change pour un prof ».</p></div>
    <div class="grid" style="grid-template-columns:1fr;max-width:780px">
      ${ACTUS.map(a => { const dt = new Date(a.date); return `
        <article class="actu">
          <div class="actu-date"><div class="d">${dt.getDate()}</div><div class="m">${months[dt.getMonth()]}</div></div>
          <div>
            <span class="actu-tag">${esc(a.tag)}</span>
            <h3>${esc(a.titre)}</h3>
            <p class="muted" style="margin:0">${esc(a.resume)}</p>
            <div class="pourleprof">👉 <b>Ce que ça change :</b> ${esc(a.pourleprof)}</div>
            <p class="muted small" style="margin:.6em 0 0">Source : ${esc(a.source)}</p>
          </div>
        </article>`; }).join('')}
    </div>
    <div class="panel" style="max-width:780px;margin-top:24px;text-align:center">
      <h2 style="font-size:1.2rem">📬 Newsletter hebdo personnalisée</h2>
      <p class="muted">Recevez la sélection filtrée par niveau et discipline.</p>
      <div style="display:flex;gap:8px;max-width:420px;margin:0 auto">
        <input class="wiz-input" id="nlMail" placeholder="votre.email@ac-...fr" />
        <button class="btn btn-primary" onclick="if($('#nlMail').value){toast('Inscription enregistrée ✉️')}else{toast('Saisissez un email')}">S'abonner</button>
      </div>
    </div>
  </div></div>`;
}

/* ============================================================
   PAGE: PREMIUM
   ============================================================ */
function renderPremium() {
  app.innerHTML = `
  <div class="page"><div class="wrap">
    <div class="page-head" style="text-align:center;margin:0 auto 36px"><span class="eyebrow">Offres & tokens</span>
      <h1 class="display">Vous évaluez toujours la valeur avant de payer</h1>
      <p>Aperçu riche gratuit pour tout le monde. Les tokens servent à télécharger les fichiers modifiables.</p></div>
    <div class="price-grid">
      ${OFFRES.map(o => `<div class="price-card ${o.highlight ? 'feat' : ''}">
        <h3>${esc(o.nom)}</h3>
        <div class="amt">${esc(o.prix)} <small>${esc(o.periode)}</small></div>
        <div class="val">${esc(o.valeur)}</div>
        <ul class="tick">${o.inclus.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
        <button class="btn ${o.highlight ? 'btn-primary' : 'btn-ghost'} btn-block" onclick="toast('Maquette : flux de paiement non connecté')">${esc(o.cta)}</button>
      </div>`).join('')}
    </div>

    <div class="grid grid-2" style="margin-top:40px;align-items:start">
      <div class="panel">
        <h2><span class="ic">🪙</span> Coût indicatif en tokens</h2>
        <table class="cost-table"><tbody>${COUTS.map(c => `<tr><td>${esc(c.item)}</td><td>${esc(c.cout)}</td></tr>`).join('')}</tbody></table>
        <p class="muted small" style="margin-top:14px">La prévisualisation ne consomme jamais de token.</p>
      </div>
      <div class="panel">
        <h2><span class="ic">🎁</span> Gagner des tokens</h2>
        <ul class="tick">
          <li><b>Contribuer</b> une ressource validée : +2 à +6 tokens selon la complétude.</li>
          <li><b>Parrainage</b> : +3 pour vous, +3 pour le collègue parrainé (après activation).</li>
          <li><b>Bonus qualité</b> : excellente note & fort taux de réutilisation.</li>
          <li><b>Fidélité</b> : 1 token offert chaque semaine de connexion.</li>
        </ul>
        <button class="btn btn-accent btn-block" onclick="setTokens(TOKENS+3);toast('+3 tokens — merci de contribuer ! 🎉')">Simuler une contribution validée (+3 🪙)</button>
      </div>
    </div>

    <div class="panel" style="margin-top:22px">
      <h2><span class="ic">🛡️</span> Qualité, conformité & confiance</h2>
      <div class="grid grid-4" style="gap:14px;margin-top:8px">
        ${Object.values(BADGES).map(b => `<div style="text-align:center"><span class="badge ${b.cls}">${b.label}</span></div>`).join('')}
      </div>
      <p class="muted small" style="margin-top:16px">Statuts éditoriaux : Brouillon → En revue → Validée → Validée+. Pas de scans de manuels, respect du droit d'auteur, aucune donnée élève nominative (RGPD). Licence des ressources : Creative Commons (BY).</p>
    </div>
  </div></div>`;
}
