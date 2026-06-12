# LinguaLab — Programme d'anglais (Lycée)

Plateforme de ressources pédagogiques d'anglais pour le lycée français (Seconde, Première, Terminale — voies LVA / LVB / LVC). Séquences clés en main conformes au programme officiel, banque d'exercices, programmation annuelle, et un assistant qui génère des séquences à la demande.

**100 % statique, sans dépendance, sans serveur ni base de données.** Tout fonctionne dans le navigateur — y compris la génération de fichiers **ZIP, Word (.docx), PowerPoint (.pptx) et PDF**, écrite en JavaScript pur.

---

## ✨ Fonctionnalités

- **Bibliothèque** : 54 ressources (3 niveaux × 3 voies × 6 axes), chaque axe couvert pour chaque combinaison niveau/voie. Filtres niveau / voie / axe / difficulté.
- **Fiches de séquence détaillées** : cadrage, objectifs par activité langagière, tâche finale actionnelle, déroulé séance par séance (phases minutées, consignes, supports), évaluation + grille, différenciation, **œuvres authentiques nommées**, banque d'idées de thèmes cliquables.
- **Assistant** : génère une séquence complète à partir d'un cahier des charges (niveau, voie, axe, thème, durée) ; séquences sauvegardées dans « Mon espace ».
- **Banque d'exercices** : 24 exercices (6 activités langagières + grammaire/lexique/phonologie), chacun avec **consigne, items et corrigé**, téléchargeables en Word.
- **Programmation annuelle** : progression clé en main par niveau **et par voie (LVA/LVB/LVC)** — axes couverts, équilibre des activités langagières, progression spiralaire, export Word.
- **Exports** : dossier ZIP (fiche Word + diaporama PPTX avec couverture image + traces écrites + références + visuels SVG), **PDF natif** de la fiche, ou impression (Ctrl+P).
- **Mon espace** : favoris et séquences générées, **persistés localement** (localStorage).
- **Compte illimité local** (démo freemium/tokens) — aucune donnée envoyée, conforme RGPD.
- **Accessibilité** : navigation clavier, focus géré, `aria-current`, respect de `prefers-reduced-motion`, feuille d'impression.

---

## 🚀 Installation & lancement

L'application ne nécessite **aucune installation de dépendances** ni étape de build.

### Option A — Ouvrir directement (le plus simple)

Double-cliquez sur **`index.html`** : l'application s'ouvre dans votre navigateur et fonctionne **hors-ligne**.

> Les téléchargements (ZIP, Word, PPTX, PDF) et le compte local fonctionnent aussi en mode `file://`.

### Option B — Serveur local (recommandé)

Servir les fichiers via un petit serveur HTTP évite toute restriction de cache et reproduit le comportement « production ». Au choix :

**Avec Python (déjà présent sur la plupart des postes)**
```bash
cd programmeanglais
python -m http.server 5173
```
Puis ouvrez <http://localhost:5173>

**Avec Node.js**
```bash
cd programmeanglais
npx serve .            # ou : npx http-server -p 5173
```

**Avec VS Code** : extension *Live Server* → clic droit sur `index.html` → « Open with Live Server ».

### Navigateurs supportés
Tout navigateur moderne récent (Chrome, Edge, Firefox, Safari). Pas d'Internet Explorer.

---

## 🗂️ Structure du projet

```
programmeanglais/
├── index.html                      # Point d'entrée (charge les scripts dans l'ordre)
├── README.md
├── LICENSE
└── assets/
    ├── css/
    │   └── style.css               # Styles + responsive + impression + accessibilité
    └── js/
        ├── data.js                 # Configuration : axes par niveau, CECRL, badges
        ├── sequences-seconde.js    # 6 séquences de Seconde  (SEQ_SECONDE)
        ├── sequences-premiere.js   # 6 séquences de Première  (SEQ_PREMIERE)
        ├── sequences-terminale.js  # 6 séquences de Terminale (SEQ_TERMINALE + assemblage SEQUENCES)
        ├── data-bank.js            # Exercices, actualité, offres/tokens
        ├── export.js               # Génération ZIP / DOCX / PPTX / PDF / SVG (JS pur)
        └── app.js                  # Routeur SPA, pages, compte, assistant, bibliothèque
```

**Ordre de chargement** (défini dans `index.html`) :
`data.js → sequences-seconde → premiere → terminale → data-bank → export.js → app.js`

Les scripts classiques partagent la portée globale : `data.js` définit la config, les fichiers de séquences assemblent `const SEQUENCES`, puis `app.js` consomme le tout.

---

## ✏️ Modifier le contenu

- **Ajouter / éditer une séquence** : ouvrez le fichier du niveau concerné (`sequences-<niveau>.js`) et modifiez l'objet correspondant (un objet = une séquence).
- **Ajouter un exercice** : ajoutez un objet au tableau `EXERCICES` dans `data-bank.js` (champs `consigne`, `items`, `corrige`).
- **Axes / CECRL** : `data.js`.

Aucune recompilation : enregistrez et rechargez la page (**Ctrl + F5** pour ignorer le cache).

---

## 🔒 Données & vie privée

- Aucun serveur, aucune base de données : **toutes les données restent dans le navigateur** (`localStorage` : compte, favoris, séquences générées).
- Aucune donnée élève nominative (conforme RGPD).
- Pour repartir d'un état vierge : console (`F12`) → `localStorage.clear()` → recharger.

---

## 📄 Licence & droits

- **Code** : licence MIT (voir `LICENSE`).
- **Ressources pédagogiques** : Creative Commons **CC BY 4.0**.
- Les **œuvres et documents authentiques cités** (films, chansons, articles, images) sont mentionnés à titre de référence et **doivent être exploités selon vos droits d'usage en classe** (exception pédagogique, domaine public, ou source libre indiquée). Pas de scan de manuel.

---

## ⚠️ Statut

Projet **front-end haute-fidélité** (MVP). Les briques « vrai produit » décrites dans le concept (communauté, dépôts de contributeurs, paiement, modération) nécessiteraient un backend (authentification + base de données + paiement + stockage) et ne sont pas incluses ici.
