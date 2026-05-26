export interface PortfolioData {
    nom: string;
    titre: string;
    description: string;
    competences: {
      frontend: string[];
      backend: string[];
      outils: string[];
    };
    projets: Projet[];
    contact: {
      email: string;
      telephone: string;
      linkedin: string;
      github: string;
    };
  }
  
export interface Projet {
  id: number;
  titre: string;
  description: string;
  technologies: string[];
  image: string;
  lien: string;
  code: string;
  categorie: "site-web" | "app-web" | "mobile";
}