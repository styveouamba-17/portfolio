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
      titre: "Plateforme de réservation d'événements BoomParty",
      description: "Application web complète permettant aux utilisateurs de découvrir, réserver et gérer des billets pour divers événements culturels et festifs. Interface intuitive avec système de paiement sécurisé et gestion des réservations en temps réel.",
      technologies: ["React", "Node.js", "MongoDB"],
      image: "boomParty.png",
      lien: "https://boom-party.vercel.app/",
      code:  "https://github.com/Styveouamba/Boom-Party",
    },
    {
      id: 2,
      titre: "Mes Délices - Application culinaire mobile",
      description: "Application mobile innovante offrant une bibliothèque de recettes de cuisine catégorisées et personnalisables. Fonctionnalités de recherche avancée, favoris et instructions étape par étape pour une expérience utilisateur optimale.",
      technologies: ["React Native", "RESTful API"],
      image: "delices.png",
      lien: "https://expo.dev/accounts/styve_ouamba/projects/Mes_Delices/builds/fd5e1304-a2a1-4fcd-abae-0ecb1f0ed5ca",
      code: "https://github.com/Styveouamba/Delices",
    },
    {
      id: 3,
      titre: "FixSen - Plateforme de services de proximité",
      description: "FixSen – Votre solution rapide pour tous vos besoins du quotidien ! De la coiffure à domicile, aux plats prêts à emporter, en passant par la livraison, le pressing ou le dépannage, FixSen vous connecte en un clic avec des professionnels de confiance proches de chez vous. Simple, rapide et local. Ce projet est sous accord de confidentialité et le code source ne peut pas être partagé publiquement.",
      technologies: ["React Native", "TypeScript", "Node.js", "MangoDb"],
      image: "fixSen.png",
      lien: "https://expo.dev/accounts/styve_ouamba/projects/Fix-Sen/builds/e41e38ca-ab23-4838-be45-b6ac830788f5",
      code: "#",
    },
    {
      id: 4,
      titre: "Elegance - Site vitrine sur la vente des vetements en ligne",
      description: "Elegance est un site vitrine en ligne spécialisé dans la vente de vetements de haute qualité. Il offre une large gamme de produits pour hommes, femmes et enfants, avec des fonctionnalités de recherche avancée, un panier d'achat sécurisé et une passerelle de paiement intégrée.",
      technologies: ["React"],
      image: "Elegance.png",
      lien: "https://elegance-beryl.vercel.app/",
      code: "https://github.com/Styveouamba/Elegance",
    }
  ],
  contact: {
    email: "styveouamba@gmail.com",
    telephone: "+221 77 812 00 53",
    linkedin: "https://www.linkedin.com/feed/",
    github: "https://github.com/Styveouamba",
  },
};