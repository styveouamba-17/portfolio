import type { Profile } from "../types";

export const profile: Profile = {
  nom: "Styve Ouamba",
  titre: "Développeur Full Stack Web & Mobile",
  accroche:
    "Je conçois et livre des applications web et mobiles de bout en bout, de l'interface React à l'API Node.js.",
  ville: "Dakar",
  pays: "Sénégal",
  disponibilite: "Ouvert aux missions freelance web, mobile et full stack.",
  debutPro: 2023,
  // Déposer le PDF dans /public puis renseigner le chemin, ex. "/cv-styve-ouamba.pdf".
  cv: "",
  contact: {
    email: "styveouamba@gmail.com",
    // L'ancien numéro (+221 77 123 45 67) ressemblait à un exemple : renseigner le vrai numéro ici.
    telephone: "",
    linkedin: "https://www.linkedin.com/in/styve-ouamba",
    github: "https://github.com/Styveouamba",
  },
};
