import type { ProjectCategory, Projet } from "../types";

export const projectCategories: ProjectCategory[] = [
  {
    id: "site-web",
    label: "Sites web",
    eyebrow: "Vitrine",
    description: "Identité, présence en ligne et conversion.",
  },
  {
    id: "app-web",
    label: "Applications web",
    eyebrow: "Produit",
    description: "Interfaces métier, tableaux de bord, logique utilisateur et données.",
  },
  {
    id: "mobile",
    label: "Mobile",
    eyebrow: "Terrain",
    description: "Applications mobiles pensées pour l'usage au quotidien.",
  },
];

/*
 * Pour transformer un projet « à la une » en étude de cas, ajouter :
 *   etudeDeCas: {
 *     role: "Ce que j'ai fait concrètement (seul, en équipe, quelle partie)",
 *     defi: "Le problème technique le plus intéressant et comment je l'ai résolu",
 *     resultat: "Ce que ça a apporté (utilisateurs, délais, performance...)",
 *   },
 */
export const projets: Projet[] = [
  {
    id: 1,
    titre: "Nzoko Transport",
    description:
      "Site professionnel pour une entreprise de transport : présentation des services, crédibilité de la marque et prise de contact simplifiée.",
    technologies: ["React", "Tailwind CSS"],
    image: "nzoko.webp",
    lien: "https://nzoko-transport-black.vercel.app/",
    categorie: "site-web",
  },
  {
    id: 2,
    titre: "Santé Pour Tous",
    description:
      "Site d'une initiative de santé présentant ses services et ses informations clés dans une interface claire et accessible.",
    technologies: ["React", "Tailwind CSS"],
    image: "sante.webp",
    lien: "https://santepourtous.vercel.app/",
    categorie: "site-web",
  },
  {
    id: 3,
    titre: "Adorna",
    description:
      "Site vitrine de marque qui met en valeur l'identité visuelle et présente les offres.",
    technologies: ["React", "Tailwind CSS"],
    image: "adorna.webp",
    lien: "https://adorna.vercel.app/",
    categorie: "site-web",
  },
  {
    id: 4,
    titre: "Ekolis — site",
    description:
      "Site institutionnel d'Ekolis : services, proposition de valeur et points de contact.",
    technologies: ["React", "Tailwind CSS"],
    image: "ekolis.webp",
    lien: "https://ekolis-website.vercel.app/",
    categorie: "site-web",
  },
  {
    id: 5,
    titre: "Elegance",
    description:
      "Vitrine e-commerce de vêtements pour hommes, femmes et enfants, responsive du mobile au desktop.",
    technologies: ["React"],
    image: "Elegance.webp",
    lien: "https://elegance-beryl.vercel.app/",
    code: "https://github.com/Styveouamba/Elegance",
    categorie: "site-web",
  },
  {
    id: 6,
    titre: "BoomParty",
    description:
      "Plateforme de réservation pour découvrir, réserver et gérer des billets d'événements culturels et festifs.",
    technologies: ["React", "Node.js", "MongoDB"],
    image: "boomParty.webp",
    lien: "https://boom-party.vercel.app/",
    code: "https://github.com/Styveouamba/Boom-Party",
    categorie: "app-web",
    aLaUne: true,
  },
  {
    id: 7,
    titre: "Ekolis — application",
    description:
      "Application métier avec authentification pour gérer les opérations internes d'Ekolis.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    // TODO : remplacer par une capture de l'application (actuellement celle du site).
    image: "ekolis.webp",
    lien: "https://ekolis-phi.vercel.app/login",
    categorie: "app-web",
  },
  {
    id: 8,
    titre: "Dashboard PayPen",
    description:
      "Tableau de bord pour suivre, visualiser et piloter des données opérationnelles.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "dashboard.webp",
    lien: "https://dashboardpaypen.vercel.app/",
    categorie: "app-web",
    aLaUne: true,
  },
  {
    id: 9,
    titre: "Mes Délices",
    description:
      "Application de recettes catégorisées avec recherche, favoris et instructions étape par étape.",
    technologies: ["React Native", "API REST"],
    image: "delices.webp",
    lien: "https://expo.dev/accounts/styve_ouamba/projects/Mes_Delices/builds/fd5e1304-a2a1-4fcd-abae-0ecb1f0ed5ca",
    code: "https://github.com/Styveouamba/Delices",
    categorie: "mobile",
  },
  {
    id: 10,
    titre: "FixSen",
    description:
      "Application de services de proximité qui met en relation les habitants avec des professionnels locaux, avec profils prestataires et offre premium.",
    technologies: ["React Native", "TypeScript", "Node.js", "MongoDB"],
    image: "fixSen.webp",
    categorie: "mobile",
    aLaUne: true,
  },
  {
    id: 11,
    titre: "Lokky",
    description:
      "Application mobile pensée pour simplifier une expérience utilisateur locale, avec une interface fluide adaptée au mobile.",
    technologies: ["React Native", "TypeScript"],
    image: "lokky.webp",
    categorie: "mobile",
  },
];

const featuredFirst = (a: Projet, b: Projet) => Number(!!b.aLaUne) - Number(!!a.aLaUne);

/** Projets web (sites et applications), ceux « à la une » en premier. */
export const webProjects = projets.filter((projet) => projet.categorie !== "mobile").sort(featuredFirst);

/** Applications mobiles, celles « à la une » en premier. */
export const mobileProjects = projets.filter((projet) => projet.categorie === "mobile").sort(featuredFirst);
