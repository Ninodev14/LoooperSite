# Loooper! — Site Astro

Projet Astro généré depuis le site HTML statique original.

## 🚀 Démarrage rapide

```bash
npm install
npm run dev       # → http://localhost:4321
npm run build     # build de production dans /dist
npm run preview   # aperçu du build
```

## 📁 Structure du projet

```
src/
├── components/
│   ├── Header.astro        ← navigation PC + mobile (burger)
│   ├── Footer.astro        ← pied de page + réseaux sociaux
│   ├── SEOHead.astro       ← balises meta SEO / OG / Twitter Card
│   ├── ContactSection.astro ← bloc CTA "Un projet en tête ?"
│   └── BesoinCard.astro    ← carte pour la page /besoins
│
├── layouts/
│   └── BaseLayout.astro    ← layout racine (<html>, head, header, footer)
│
├── pages/
│   ├── index.astro                   ← Accueil
│   ├── formats.astro                 ← Nos formats
│   ├── besoins.astro                 ← Hub Vos besoins
│   ├── apprendre-ludique.astro       ┐
│   ├── sensibiliser-reflechir.astro  │
│   ├── creer-interaction-sociale.astro│ Sous-pages besoins
│   ├── renforcer-cohesion.astro      │
│   ├── engager-motiver.astro         │
│   ├── former-efficacement.astro     │
│   ├── communiquer-autrement.astro   ┘
│   ├── projets.astro                 ← Nos projets
│   ├── equipe.astro                  ← Notre équipe
│   ├── contact.astro                 ← Formulaire de contact (unifié)
│   ├── mentions-legales.astro
│   ├── plan-du-site.astro
│   └── 404.astro
│
└── styles/
    └── global.css          ← Styles header, footer, composants partagés
```

## ✍️ Comment ajouter votre contenu HTML existant

Pour chaque page, ouvrez le fichier `.astro` correspondant et remplacez le
commentaire `[Contenu à compléter]` par le HTML de votre fichier `.html`
original, **en excluant** :

1. Tout le bloc `<head>…</head>` (géré par `BaseLayout` + `SEOHead`)
2. Tout le bloc `<header>…</header>` (remplacé par le composant `Header.astro`)
3. Tout le bloc `<footer>…</footer>` (remplacé par le composant `Footer.astro`)
4. Le snippet GTM noscript (déjà dans `BaseLayout`)

**Exemple pour `formats.astro` :**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ContactSection from '../components/ContactSection.astro';
---

<BaseLayout title="Nos formats" description="..." currentPage="formats">
  <!-- ↓ Collez ici le contenu de formats.html ↓ -->
  <section class="hero-formats">…</section>
  <section class="formats-grid">…</section>
  <!-- ↑ Fin du contenu copié ↑ -->

  <ContactSection />
</BaseLayout>
```

## ⚙️ Props disponibles par layout / composant

### `BaseLayout.astro`
| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Titre de la page |
| `description` | `string` | Meta description |
| `ogImage` | `string?` | URL image OG |
| `ogUrl` | `string?` | URL canonique |
| `currentPage` | `string?` | Slug pour l'état actif du menu |
| `noIndex` | `boolean?` | Désactive l'indexation |
| `schemaJson` | `object?` | Données Schema.org JSON-LD |

### `Header.astro`
| Prop | Type | Description |
|------|------|-------------|
| `currentPage` | `string?` | Ex: `"formats"`, `"besoins"`, `"apprendre-ludique"` |

### `ContactSection.astro`
| Prop | Type | Défaut |
|------|------|--------|
| `title` | `string?` | `"Un projet en tête ?"` |
| `subtitle` | `string?` | Texte descriptif |
| `btnLabel` | `string?` | `"Prendre contact"` |

### `BesoinCard.astro`
| Prop | Type | Description |
|------|------|-------------|
| `href` | `string` | URL de la page besoin |
| `title` | `string` | Titre |
| `desc` | `string` | Description courte |
| `icon` | `string?` | Nom de fichier dans `/src/img/ico/` |
| `color` | `'purple'\|'orange'\|'yellow'\|'green'?` | Couleur d'accentuation |

## 🎨 CSS

- `src/css/style.css` — **votre CSS existant** (non modifié, copier-coller)
- `src/styles/global.css` — styles des nouveaux composants Astro (header mobile, footer, cartes)

Importez `global.css` dans `BaseLayout.astro` si nécessaire :
```astro
<link rel="stylesheet" href="/src/styles/global.css" />
```

## 📦 Déploiement Netlify

Votre `netlify.toml` et les fonctions dans `netlify/functions/` restent dans le
dossier racine. Ajoutez dans `astro.config.mjs` :

```js
import netlify from '@astrojs/netlify';
export default defineConfig({ adapter: netlify() });
```

Et dans `netlify.toml` :
```toml
[build]
  command = "npm run build"
  publish = "dist"
```
