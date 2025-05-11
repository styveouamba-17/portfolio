import type { PortfolioData } from "../types";

export const portfolioData: PortfolioData = {
  nom: "Styve Ouamba",
  titre: "Développeur Full Stack Web & Mobile",
  description: "Je conçois et développe des applications web et mobiles modernes et performantes.",
  competences: {
    frontend: ["React", "React Native", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
    backend: ["Node.js", "Express", "MongoDB", "Firebase", "RESTful API"],
    outils: ["Git", "GitHub", "VS Code", "Figma", "Jira"],
  },
  projets: [
    {
      id: 1,
      titre: "Application E-commerce",
      description: "Une plateforme e-commerce complète avec paiement en ligne et gestion des stocks.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "projet1.jpg",
      lien: "#",
    },
    {
      id: 2,
      titre: "Application Mobile de Livraison",
      description: "Application mobile permettant de commander et suivre des livraisons en temps réel.",
      technologies: ["React Native", "Firebase", "Google Maps API"],
      image: "projet2.jpg",
      lien: "#",
    },
    {
      id: 3,
      titre: "Dashboard Administrateur",
      description: "Interface d'administration pour gérer les utilisateurs, produits et commandes.",
      technologies: ["React", "TypeScript", "Chart.js", "Material UI"],
      image: "projet3.jpg",
      lien: "#",
    },
  ],
  contact: {
    email: "styveouamba@gmail.com",
    telephone: "+221 77 812 00 53",
    linkedin: "https://linkedin.com/in/votrenom",
    github: "https://github.com/Styveouamba",
  },
};