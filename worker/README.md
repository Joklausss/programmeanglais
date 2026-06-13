# LinguaLab — Fonction IA (Cloudflare Worker)

Génère une **vraie séquence** à partir de la thématique saisie dans l'assistant :

1. **Recherche web** (outil `web_search` de l'API Claude) → 2-3 **articles réels** récents sur le thème, propices au débat, sources vérifiables.
2. **Sortie structurée** (`output_config.format` + JSON Schema) → une séquence **au format exact attendu par le site**, construite autour de ces articles.

La clé API Anthropic reste **côté serveur** (secret du Worker) — jamais dans le navigateur.

> Deux appels distincts (et non un seul) car le mode JSON garanti est incompatible avec les citations web dans le même appel.

---

## Prérequis

- Un compte **Cloudflare** (gratuit) → https://dash.cloudflare.com
- Une **clé API Anthropic** → https://console.anthropic.com (rubrique API Keys)
- **Node.js** installé (pour `npx wrangler`)

## Déploiement (5 minutes)

```bash
cd worker

# 1. Connecter le compte Cloudflare (ouvre le navigateur)
npx wrangler login

# 2. Enregistrer la clé API comme SECRET (collez-la quand demandé)
npx wrangler secret put ANTHROPIC_API_KEY

# 3. (Optionnel) restreindre l'origine autorisée dans wrangler.toml
#    ALLOWED_ORIGIN = "https://joklausss.github.io"

# 4. Déployer
npx wrangler deploy
```

À la fin, Wrangler affiche l'URL publique, par ex. :

```
https://lingualab-ia.VOTRE-COMPTE.workers.dev
```

## Brancher le site

1. Ouvrez le site → **Assistant** → allez jusqu'à l'étape 4 (récapitulatif).
2. Dépliez **« ✨ Activer la génération par IA »**, collez l'URL du Worker, **Enregistrer**.
   (L'URL est mémorisée en local dans le navigateur.)
3. Le bouton **« ✨ Générer avec l'IA — vrais articles »** apparaît. Cliquez.

En cas d'échec (réseau, quota…), un repli **« version locale instantanée »** est proposé.

## Test rapide (sans le site)

```bash
curl -X POST https://lingualab-ia.VOTRE-COMPTE.workers.dev \
  -H "content-type: application/json" \
  -d '{"niveau":"Première","statut":"LVA","voie":"Générale","axe":3,"axeName":"Le passé dans le présent","cecrl":"B1+","theme":"fake news","duree":5}'
```

## Coût & modèle

- Modèle : **`claude-opus-4-8`** (modifiable dans `worker.js`, constante `MODEL` ; ex. `claude-sonnet-4-6` moins cher).
- Recherche web + rédaction : quelques **centimes** par séquence.
- Latence : **~1 à 3 min** (recherche web + rédaction en streaming). La requête est *streamée* côté serveur pour éviter la coupure à 100 s (erreur 524).

## Paramètres reçus (POST JSON)

| champ      | exemple                        |
|------------|--------------------------------|
| `niveau`   | `"Première"`                   |
| `statut`   | `"LVA"` / `"LVB"` / `"LVC"`    |
| `voie`     | `"Générale"`                   |
| `axe`      | `3`                            |
| `axeName`  | `"Le passé dans le présent"`   |
| `cecrl`    | `"B1+"`                        |
| `theme`    | `"fake news"`                  |
| `duree`    | `5`                            |

Réponse : `{ "ok": true, "sequence": { … }, "articles": "…" }`.
