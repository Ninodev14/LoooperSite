# Loooper! — Site vitrine

Site officiel de [loooper.fr](https://loooper.fr), conçu et développé avec Astro, déployé sur Netlify.

---

## Stack

- **Astro** — framework de génération de pages statiques
- **CSS / JS vanilla** — pas de framework front
- **Netlify** — hébergement + fonctions serverless (`netlify/functions`)

---

## Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
# → http://localhost:4321

# Partager sur le réseau local
npx astro dev --host
# → http://ip-locale>:4321

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## Structure

```
src/          → pages, composants, styles, scripts
netlify/      → fonctions serverless
scripts/      → scripts utilitaires
public/       → assets statiques (svg, img, fonts…)
```

---

## Déploiement

Le site est déployé automatiquement sur Netlify à chaque push sur `main`.