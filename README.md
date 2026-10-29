# Portfolio — Styve Ouamba

Portfolio de Styve Ouamba, développeur full stack web et mobile basé à Dakar, présenté comme **un bureau de développeur en 3D**.
Chaque objet du bureau ouvre une section : la caméra glisse vers lui et le contenu s'affiche en HTML à côté.

| Objet | Section |
|---|---|
| L'écran | Projets web (la capture du projet choisi s'affiche sur l'écran) |
| Le téléphone | Applications mobiles |
| Le carnet | Parcours |
| Le tableau en liège | Compétences |
| La photo et la tasse | À propos |
| La fenêtre sur Dakar | Contact |

Un bouton jour / nuit change l'éclairage (soleil couchant sur l'océan ou lampe allumée), et une **version classique** affiche tout le contenu sur une page simple. Elle s'active automatiquement si le navigateur ne gère pas WebGL.

## Stack

- React 19 + TypeScript, Vite
- Three.js via React Three Fiber et drei
- Framer Motion pour l'interface HTML
- EmailJS pour le formulaire (chargé uniquement à l'envoi)

Toute la scène est construite en code (formes et textures dessinées sur canvas) : aucun modèle 3D à télécharger.

## Démarrer

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Navigation

- Ancres partageables : `#projets`, `#mobile`, `#parcours`, `#competences`, `#a-propos`, `#contact`
- `Échap`, la croix du panneau ou un clic dans le vide ramènent à la vue d'ensemble
- Le dock en bas donne accès à chaque section sans passer par la 3D

## Mettre à jour le contenu

Tout le contenu se trouve dans `src/data/` : `profile.ts`, `projects.ts`, `skills.ts`, `timeline.ts`.
Les captures de projets vont dans `public/images/` au format WebP.

## Structure

```
src/
├── desk/
│   ├── DeskApp.tsx     # Canvas, interface HTML, version classique
│   ├── Scene.tsx       # Composition de la scène et lumières jour / nuit
│   ├── Objects.tsx     # Pièce, bureau et objets
│   ├── Interactive.tsx # Survol, étiquette et clic sur un objet
│   ├── CameraRig.tsx   # Déplacements de caméra
│   ├── Panels.tsx      # Contenu de chaque section
│   ├── textures.ts     # Textures dessinées (vue sur Dakar, code, post-it...)
│   └── stations.ts     # Sections, ancres et cadrages caméra
├── data/               # Contenu du portfolio
├── hooks/useHashRoute.ts
└── index.css
```
