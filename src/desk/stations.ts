export type StationId = "work" | "mobile" | "path" | "skills" | "about" | "contact";

type Vec3 = [number, number, number];

export interface Station {
  id: StationId;
  /** Ancre utilisée dans l'URL (ex. #projets). */
  hash: string;
  label: string;
  /** Objet du bureau qui représente la section. */
  object: string;
  /** Cadrage caméra centré sur l'objet ; le décalage pour le panneau est ajouté par CameraRig. */
  camera: { position: Vec3; target: Vec3 };
}

export const stations: Station[] = [
  {
    id: "work",
    hash: "projets",
    label: "Projets web",
    object: "L'écran",
    camera: { position: [0.05, 1.14, 1.3], target: [0.05, 1.08, -0.2] },
  },
  {
    id: "mobile",
    hash: "mobile",
    label: "Apps mobiles",
    object: "Le téléphone",
    camera: { position: [-0.33, 1.2, 0.62], target: [-0.33, 0.77, 0.2] },
  },
  {
    id: "path",
    hash: "parcours",
    label: "Parcours",
    object: "Le carnet",
    camera: { position: [-0.62, 1.32, 0.5], target: [-0.62, 0.77, -0.02] },
  },
  {
    id: "skills",
    hash: "competences",
    label: "Compétences",
    object: "Le tableau",
    camera: { position: [1.0, 1.72, 0.85], target: [1.0, 1.7, -0.84] },
  },
  {
    id: "about",
    hash: "a-propos",
    label: "À propos",
    object: "La photo",
    camera: { position: [0.8, 1.22, 0.42], target: [0.72, 0.88, -0.3] },
  },
  {
    id: "contact",
    hash: "contact",
    label: "Contact",
    object: "La fenêtre",
    camera: { position: [-0.35, 1.5, 0.9], target: [-1.6, 1.45, 0.35] },
  },
];

export const overview = {
  position: [3.1, 2.55, 3.9] as Vec3,
  target: [-0.15, 0.95, 0] as Vec3,
};

export function getStation(id: StationId): Station {
  return stations.find((station) => station.id === id)!;
}
