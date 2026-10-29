import type { SectionId, SectionMeta } from "../types";

export const sections: SectionMeta[] = [
  {
    id: "about",
    hash: "a-propos",
    label: "À propos",
    eyebrow: "Identité",
    description: "Qui je suis, comment je travaille",
    accent: "var(--green)",
    node: { x: 24, y: 28 },
    line: "M50 52 C38 42 28 35 18 28",
    pan: { x: "34vw", y: "23vh" },
  },
  {
    id: "skills",
    hash: "competences",
    label: "Compétences",
    eyebrow: "Stack",
    description: "Les outils avec lesquels je construis",
    accent: "var(--blue)",
    node: { x: 76, y: 22 },
    line: "M50 52 C62 40 70 31 82 22",
    pan: { x: "-34vw", y: "25vh" },
  },
  {
    id: "work",
    hash: "projets",
    label: "Projets",
    eyebrow: "Réalisations",
    description: "Sites, applications web et mobiles",
    accent: "var(--amber)",
    node: { x: 24, y: 78 },
    line: "M50 52 C36 58 26 68 16 78",
    pan: { x: "34vw", y: "-33vh" },
  },
  {
    id: "path",
    hash: "parcours",
    label: "Parcours",
    eyebrow: "Trajet",
    description: "Formation et expériences",
    accent: "var(--rose)",
    node: { x: 76, y: 78 },
    line: "M50 52 C63 59 72 70 84 78",
    pan: { x: "-34vw", y: "-33vh" },
  },
  {
    id: "contact",
    hash: "contact",
    label: "Contact",
    eyebrow: "Signal",
    description: "Discutons de votre projet",
    accent: "var(--violet)",
    node: { x: 50, y: 15 },
    line: "M50 52 C50 38 50 26 50 15",
    pan: { x: "0vw", y: "33vh" },
  },
];

export function getSection(id: SectionId): SectionMeta {
  return sections.find((section) => section.id === id)!;
}

export function getNextSection(id: SectionId): SectionMeta {
  const index = sections.findIndex((section) => section.id === id);
  return sections[(index + 1) % sections.length];
}
