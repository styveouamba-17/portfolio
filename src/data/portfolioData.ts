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
    titre: "Nzoko Transport",
    description:
      "Site web professionnel pour une entreprise de transport, conçu pour présenter les services, renforcer la crédibilité de la marque et faciliter la prise de contact.",
    technologies: ["React", "Tailwind CSS"],
    image: "nzoko.png",
    lien: "https://nzoko-transport-black.vercel.app/",
    code: "#",
    categorie: "site-web",
  },
  {
    id: 2,
    titre: "Santé Pour Tous",
    description:
      "Site web orienté santé permettant de présenter une initiative, ses services et ses informations clés à travers une interface claire et accessible.",
    technologies: ["React", "Tailwind CSS"],
    image: "sante.png",
    lien: "https://santepourtous.vercel.app/",
    code: "#",
    categorie: "site-web",
  },
  {
    id: 3,
    titre: "Adorna",
    description:
      "Site vitrine moderne pour une marque, pensé pour valoriser l'identité visuelle, présenter les offres et offrir une navigation fluide.",
    technologies: ["React", "Tailwind CSS"],
    image: "adorna.png",
    lien: "https://adorna.vercel.app/",
    code: "#",
    categorie: "site-web",
  },
  {
    id: 4,
    titre: "Ekolis Website",
    description:
      "Site institutionnel de présentation pour Ekolis, mettant en avant les services, la proposition de valeur et les points de contact.",
    technologies: ["React", "Tailwind CSS"],
    image: "ekolis.png",
    lien: "https://ekolis-website.vercel.app/",
    code: "#",
    categorie: "site-web",
  },
  {
    id: 5,
    titre: "Elegance",
    description:
      "Site vitrine e-commerce spécialisé dans la présentation de vêtements pour hommes, femmes et enfants, avec une interface moderne et responsive.",
    technologies: ["React"],
    image: "Elegance.png",
    lien: "https://elegance-beryl.vercel.app/",
    code: "https://github.com/Styveouamba/Elegance",
    categorie: "site-web",
  },
  {
    id: 6,
    titre: "Plateforme de réservation BoomParty",
    description:
      "Application web complète permettant aux utilisateurs de découvrir, réserver et gérer des billets pour divers événements culturels et festifs.",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "boomParty.png",
    lien: "https://boom-party.vercel.app/",
    code: "https://github.com/Styveouamba/Boom-Party",
    categorie: "app-web",
  },
  {
    id: 7,
    titre: "Ekolis App",
    description:
      "Application web métier avec authentification, pensée pour gérer des opérations internes à travers une interface structurée et sécurisée.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "ekolis.png",
    lien: "https://ekolis-phi.vercel.app/login",
    code: "#",
    categorie: "app-web",
  },
  {
    id: 8,
    titre: "Dashboard PayPen",
    description:
      "Tableau de bord web permettant de suivre, visualiser et gérer des données opérationnelles à travers une interface claire et orientée décision.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "dashboard.png",
    lien: "https://dashboardpaypen.vercel.app/",
    code: "#",
    categorie: "app-web",
  },
  {
    id: 9,
    titre: "Mes Délices",
    description:
      "Application mobile culinaire offrant une bibliothèque de recettes catégorisées, avec recherche, favoris et instructions étape par étape.",
    technologies: ["React Native", "RESTful API"],
    image: "delices.png",
    lien: "https://expo.dev/accounts/styve_ouamba/projects/Mes_Delices/builds/fd5e1304-a2a1-4fcd-abae-0ecb1f0ed5ca",
    code: "https://github.com/Styveouamba/Delices",
    categorie: "mobile",
  },
  {
    id: 10,
    titre: "FixSen",
    description:
      "Application mobile de services de proximité connectant les utilisateurs à des professionnels locaux pour des besoins du quotidien.",
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB"],
    image: "fixSen.png",
    lien: "#",
    code: "#",
    categorie: "mobile",
  },
  {
    id: 11,
    titre: "Lokky",
    description:
      "Application mobile pensée pour simplifier une expérience utilisateur locale, avec une interface fluide et des fonctionnalités adaptées au mobile.",
    technologies: ["React Native", "TypeScript"],
    image: "lokky.png",
    lien: "#",
    code: "#",
    categorie: "mobile",
  },
],
  contact: {
    email: "styveouamba@gmail.com",
    telephone: "+221 77 123 45 67",
    linkedin: "https://www.linkedin.com/in/styve-ouamba",
    github: "https://github.com/Styveouamba",
  },
};
