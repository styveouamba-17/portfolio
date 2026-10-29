export interface Profile {
  nom: string;
  titre: string;
  accroche: string;
  ville: string;
  pays: string;
  disponibilite: string;
  /** Année du premier poste en entreprise, pour calculer l'expérience. */
  debutPro: number;
  /** Chemin du CV dans /public. Laisser vide pour masquer le bouton. */
  cv: string;
  contact: {
    email: string;
    /** Format international sans espaces, ex. +221771234567. Laisser vide pour masquer. */
    telephone: string;
    linkedin: string;
    github: string;
  };
}

export interface SkillCategory {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  skills: string[];
}

export type ProjectCategoryId = "site-web" | "app-web" | "mobile";

export interface ProjectCategory {
  id: ProjectCategoryId;
  label: string;
  eyebrow: string;
  description: string;
}

export interface CaseStudy {
  role: string;
  defi: string;
  resultat: string;
}

export interface Projet {
  id: number;
  titre: string;
  description: string;
  technologies: string[];
  image: string;
  categorie: ProjectCategoryId;
  lien?: string;
  code?: string;
  /** Projet mis en avant : affiché en premier avec un badge. */
  aLaUne?: boolean;
  etudeDeCas?: CaseStudy;
}

export interface TimelineStep {
  periode: string;
  titre: string;
  lieu: string;
  description: string;
  acquis: string;
  type: "formation" | "experience" | "actuel";
}
