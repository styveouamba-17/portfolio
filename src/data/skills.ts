import type { SkillCategory } from "../types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    eyebrow: "Interface",
    description: "Interfaces web et mobiles, composants réutilisables, animations et expérience utilisateur.",
    skills: ["React", "React Native", "TypeScript", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    eyebrow: "Logique",
    description: "APIs REST, authentification, modélisation et gestion des données.",
    skills: ["Node.js", "Express", "MongoDB", "Firebase", "API REST"],
  },
  {
    id: "outils",
    label: "Outils",
    eyebrow: "Workflow",
    description: "Maquettes, versioning, suivi de projet et livraison.",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Jira"],
  },
];

export const allSkills = [...new Set(skillCategories.flatMap((category) => category.skills))];
