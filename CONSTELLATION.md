# Portfolio Constellation

Portfolio interactif inspiré d'une navigation spatiale type "constellation". 

## 🌟 Concept

Le portfolio fonctionne comme une carte étoilée avec trois niveaux de navigation :

1. **Intro** - Page d'accueil avec présentation
2. **Hub** - Point central qui révèle les 5 sections principales
3. **Mondes** - Chaque section s'ouvre comme un monde explorable

## 🎨 Caractéristiques

### Navigation
- **Point central** : Clic pour ouvrir la constellation
- **5 nœuds principaux** : À propos, Compétences, Projets, Parcours, Contact
- **Lignes animées** : Connexions SVG avec animations Framer Motion
- **Zoom/Pan spatial** : Transitions fluides entre sections

### Design
- **Glassmorphism** : Cartes avec backdrop-blur
- **Palette sombre** : Fond #0c0c0b avec accents colorés
- **Typographie Georgia** : Titres serif pour contraste
- **Gradients subtils** : Effets de lumière en arrière-plan

### Sections

#### À propos
- Présentation philosophie
- Stats clés (3+ ans, 15+ projets)
- Méthode de travail en 3 étapes

#### Compétences
- Frontend, Backend, Outils organisés
- Badges interactifs par techno
- Focus et philosophie technique

#### Projets
- **Filtres par catégorie** : Sites web, Apps web, Mobile
- Grille de projets avec cartes
- Modales détaillées par projet

#### Parcours
- Timeline verticale avec points colorés
- Distinction formation/expérience/actuel
- Cards objectif et apprentissage

#### Contact
- Liens directs (email, téléphone, LinkedIn, GitHub)
- Formulaire avec EmailJS
- Status de disponibilité

### Contrôles
- **Bouton retour** : Revenir au hub
- **Navigation suivante** : Passer à la section suivante
- **Orbit dots** : Indicateurs de position

## 🛠️ Technologies

- React + TypeScript
- Framer Motion (animations)
- Tailwind CSS (utility)
- CSS Custom Properties (thème)
- EmailJS (formulaire contact)

## 📁 Structure

```
src/
├── App.tsx                    # Orchestration principale
├── components/
│   ├── Constellation.tsx      # Hub central + nodes
│   ├── WorldShell.tsx         # Container pour sections
│   ├── WorldAbout.tsx         # Section À propos
│   ├── WorldSkills.tsx        # Section Compétences
│   ├── WorldWork.tsx          # Section Projets
│   ├── WorldPath.tsx          # Section Parcours
│   └── WorldContact.tsx       # Section Contact
├── data/
│   └── portfolioData.ts       # Données du portfolio
└── index.css                  # Variables CSS + animations
```

## 🎯 Points clés

### Espacement et clarté
- Padding généreux (p-8, pt-20 sur sections)
- Marges entre blocs (mb-16)
- Séparateurs visuels (lignes gradient)
- Titres aérés avec max-width

### Animations
- Lignes constellation avec strokeDashoffset
- Fade in / scale sur cartes
- Hover effects subtils (y: -4)
- Transitions easing [0.2, 0.9, 0.2, 1]

### Responsive
- Breakpoints Tailwind (md:, lg:)
- Grids adaptatifs
- Text clamp pour titres
- Padding variable selon écran

## 🚀 Lancer le projet

```bash
npm install
npm run dev
```

## 📝 Personnalisation

### Couleurs
Modifier les variables CSS dans `src/index.css` :
```css
:root {
  --bg: #0c0c0b;
  --ink: #f4efe5;
  --amber: #f0b35a;
  --green: #7bd3a3;
  --blue: #78b7ff;
  --rose: #ff8aa6;
  --violet: #a993ff;
  --cyan: #71e4df;
}
```

### Données
Modifier `src/data/portfolioData.ts` avec vos informations

### Positions des nœuds
Dans `src/components/Constellation.tsx`, ajuster les coordonnées x/y des sections

---

**Fait avec ❤️ en React + Framer Motion**
