# Portfolio — Styve Ouamba

Portfolio interactif de Styve Ouamba, développeur full stack web et mobile basé à Dakar.
La navigation prend la forme d'une constellation : un point central ouvre une carte de cinq sections (À propos, Compétences, Projets, Parcours, Contact), et chaque section s'ouvre comme un « monde » à explorer.

## Stack

- React 19 + TypeScript, Vite
- Framer Motion (animations, respect de `prefers-reduced-motion`)
- Tailwind CSS 4 + CSS sur mesure (`src/index.css`)
- EmailJS pour le formulaire de contact (chargé uniquement à l'envoi)
- Déploiement Vercel

## Démarrer

```bash
npm install
npm run dev      # serveur de développement
npm run build    # vérification TypeScript + build de production
npm run lint
```

## Navigation

- L'accueil ouvre automatiquement la carte ; le bouton « Voir mes projets » mène directement aux réalisations.
- Chaque section a son ancre : `#a-propos`, `#competences`, `#projets`, `#parcours`, `#contact` (lien partageable, bouton retour du navigateur fonctionnel).
- `Échap` ramène à la carte depuis une section.

## Mettre à jour le contenu

Tout le contenu se trouve dans `src/data/`, sans toucher aux composants :

| Fichier | Contenu |
|---|---|
| `profile.ts` | Nom, accroche, disponibilité, CV, coordonnées |
| `projects.ts` | Catégories et projets (capture, liens, `aLaUne`, `etudeDeCas`) |
| `skills.ts` | Pôles de compétences |
| `timeline.ts` | Étapes du parcours |
| `sections.ts` | Sections de la carte : libellés, couleurs, positions |

Les captures de projets vont dans `public/images/` au format WebP (environ 1400 px de large).
Les statistiques (années d'expérience, nombre de projets et de technologies) sont calculées à partir de ces données.

## Structure

```
src/
├── App.tsx                  # Vues (accueil, carte, sections) et transitions
├── data/                    # Contenu du portfolio
├── hooks/
│   ├── useParallax.ts       # Décalage léger qui suit la souris
│   └── useSectionRoute.ts   # Ancres d'URL, historique et touche Échap
├── components/
│   ├── constellation/       # Carte centrale et cartes de section
│   ├── world/               # Cadre commun des sections, lignes animées
│   └── sections/            # About, Skills, Work, Path, Contact
├── types.ts
└── index.css                # Variables de thème et styles des sections
```
