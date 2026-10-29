import { RoundedBox, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { skillCategories } from "../data/skills";
import { timeline } from "../data/timeline";
import {
  createCodeScreen,
  createDakarTexture,
  createLabelTexture,
  createNotebookPage,
  createPhoneScreen,
} from "./textures";

const DESK_TOP = 0.75;

const colors = {
  wall: "#f1e8da",
  floor: "#b48659",
  desk: "#7a5134",
  metal: "#2a2725",
  device: "#1c1c1f",
  cork: "#b98a5c",
  frame: "#5e4130",
};

/* ------------------------------------------------------------------ */
/* Pièce                                                               */
/* ------------------------------------------------------------------ */

export const Room: React.FC = () => (
  <group>
    {/* Sol */}
    <mesh rotation-x={-Math.PI / 2} position={[0.8, 0, 1.4]} receiveShadow>
      <planeGeometry args={[4.8, 4.6]} />
      <meshStandardMaterial color={colors.floor} roughness={0.85} />
    </mesh>

    {/* Tapis */}
    <mesh rotation-x={-Math.PI / 2} position={[0.1, 0.004, 0.55]} receiveShadow>
      <circleGeometry args={[0.85, 48]} />
      <meshStandardMaterial color="#c9b79c" roughness={1} />
    </mesh>

    {/* Mur du fond */}
    <mesh position={[0.8, 1.4, -0.85]} receiveShadow>
      <boxGeometry args={[4.8, 2.8, 0.05]} />
      <meshStandardMaterial color={colors.wall} roughness={0.95} />
    </mesh>

    {/* Plinthe */}
    <mesh position={[0.8, 0.04, -0.82]}>
      <boxGeometry args={[4.8, 0.08, 0.02]} />
      <meshStandardMaterial color="#d6c9b4" />
    </mesh>

    {/* Mur gauche, percé pour la fenêtre (ouverture z ∈ [-0.2, 0.9], y ∈ [1.0, 1.9]) */}
    {[
      { position: [-1.6, 0.5, 0.8], size: [0.05, 1.0, 3.3] },
      { position: [-1.6, 2.35, 0.8], size: [0.05, 0.9, 3.3] },
      { position: [-1.6, 1.45, -0.525], size: [0.05, 0.9, 0.65] },
      { position: [-1.6, 1.45, 1.675], size: [0.05, 0.9, 1.55] },
    ].map(({ position, size }) => (
      <mesh key={position.join()} position={position as [number, number, number]} receiveShadow>
        <boxGeometry args={size as [number, number, number]} />
        <meshStandardMaterial color={colors.wall} roughness={0.95} />
      </mesh>
    ))}
  </group>
);

/* ------------------------------------------------------------------ */
/* Fenêtre sur Dakar                                                   */
/* ------------------------------------------------------------------ */

export const DakarWindow: React.FC<{ night: boolean }> = ({ night }) => {
  const dayTexture = useMemo(() => createDakarTexture(false), []);
  const nightTexture = useMemo(() => createDakarTexture(true), []);
  const frameMaterial = <meshStandardMaterial color="#f4efe5" roughness={0.6} />;

  return (
    <group>
      {/* Paysage, placé loin derrière l'ouverture pour l'effet de profondeur */}
      <mesh position={[-1.95, 1.47, 0.35]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[1.9, 1.42]} />
        <meshBasicMaterial map={night ? nightTexture : dayTexture} toneMapped={false} />
      </mesh>

      {/* Cadre et croisillons */}
      <group position={[-1.6, 1.45, 0.35]}>
        {[
          { position: [0, 0.46, 0], size: [0.09, 0.04, 1.14] },
          { position: [0, -0.46, 0], size: [0.09, 0.04, 1.14] },
          { position: [0, 0, 0.56], size: [0.09, 0.96, 0.04] },
          { position: [0, 0, -0.56], size: [0.09, 0.96, 0.04] },
          { position: [0, 0, 0], size: [0.06, 0.92, 0.025] },
          { position: [0, 0.05, 0], size: [0.06, 0.025, 1.1] },
        ].map(({ position, size }) => (
          <mesh key={position.join()} position={position as [number, number, number]}>
            <boxGeometry args={size as [number, number, number]} />
            {frameMaterial}
          </mesh>
        ))}
        {/* Rebord */}
        <mesh position={[0.08, -0.49, 0]}>
          <boxGeometry args={[0.2, 0.03, 1.22]} />
          {frameMaterial}
        </mesh>
      </group>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Bureau et chaise                                                    */
/* ------------------------------------------------------------------ */

export const Desk: React.FC = () => (
  <group>
    <RoundedBox args={[1.8, 0.05, 0.8]} radius={0.012} position={[0, DESK_TOP - 0.025, 0]} castShadow receiveShadow>
      <meshStandardMaterial color={colors.desk} roughness={0.55} />
    </RoundedBox>
    {[
      [-0.85, 0.35],
      [0.85, 0.35],
      [-0.85, -0.35],
      [0.85, -0.35],
    ].map(([x, z]) => (
      <mesh key={`${x}${z}`} position={[x, (DESK_TOP - 0.05) / 2, z]} castShadow>
        <boxGeometry args={[0.04, DESK_TOP - 0.05, 0.04]} />
        <meshStandardMaterial color={colors.metal} roughness={0.4} metalness={0.6} />
      </mesh>
    ))}
  </group>
);

export const Chair: React.FC = () => (
  <group position={[0.05, 0, 0.72]} rotation-y={0.25} scale={0.92}>
    <RoundedBox args={[0.46, 0.07, 0.44]} radius={0.03} position={[0, 0.48, 0]} castShadow>
      <meshStandardMaterial color="#3d3a37" roughness={0.8} />
    </RoundedBox>
    <RoundedBox args={[0.44, 0.5, 0.06]} radius={0.03} position={[0, 0.8, 0.22]} rotation-x={-0.12} castShadow>
      <meshStandardMaterial color="#3d3a37" roughness={0.8} />
    </RoundedBox>
    <mesh position={[0, 0.24, 0]}>
      <cylinderGeometry args={[0.025, 0.025, 0.44]} />
      <meshStandardMaterial color={colors.metal} metalness={0.7} roughness={0.3} />
    </mesh>
    {[0, 1, 2, 3, 4].map((i) => (
      <mesh key={i} position={[Math.sin((i * Math.PI * 2) / 5) * 0.12, 0.03, Math.cos((i * Math.PI * 2) / 5) * 0.12]} rotation-y={(i * Math.PI * 2) / 5}>
        <boxGeometry args={[0.025, 0.02, 0.24]} />
        <meshStandardMaterial color={colors.metal} metalness={0.7} roughness={0.3} />
      </mesh>
    ))}
  </group>
);

/* ------------------------------------------------------------------ */
/* Écran principal : affiche la capture du projet courant              */
/* ------------------------------------------------------------------ */

const SCREEN = { width: 0.76, height: 0.428 };

export const Monitor: React.FC<{ image: string; night: boolean }> = ({ image, night }) => {
  const texture = useTexture(image);

  // Recadrage façon "cover" : la capture remplit l'écran sans être déformée.
  useMemo(() => {
    const img = texture.image as { width: number; height: number };
    const imageRatio = img.width / img.height;
    const screenRatio = SCREEN.width / SCREEN.height;
    texture.colorSpace = THREE.SRGBColorSpace;
    if (imageRatio > screenRatio) {
      texture.repeat.set(screenRatio / imageRatio, 1);
      texture.offset.set(0, 0);
    } else {
      texture.repeat.set(1, imageRatio / screenRatio);
      texture.offset.set(0, 1 - imageRatio / screenRatio);
    }
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <group position={[0, DESK_TOP, -0.2]}>
      <RoundedBox args={[0.24, 0.015, 0.16]} radius={0.006} position={[0, 0.008, -0.02]} castShadow>
        <meshStandardMaterial color={colors.device} metalness={0.4} roughness={0.4} />
      </RoundedBox>
      <mesh position={[0, 0.13, -0.05]} castShadow>
        <boxGeometry args={[0.045, 0.24, 0.025]} />
        <meshStandardMaterial color={colors.device} metalness={0.4} roughness={0.4} />
      </mesh>
      <RoundedBox args={[0.8, 0.47, 0.03]} radius={0.012} position={[0, 0.33, 0]} castShadow>
        <meshStandardMaterial color={colors.device} metalness={0.3} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.335, 0.0155]}>
        <planeGeometry args={[SCREEN.width, SCREEN.height]} />
        <meshBasicMaterial map={texture} toneMapped={false} color={night ? "#d9d4ff" : "#ffffff"} />
      </mesh>
    </group>
  );
};

export const Keyboard: React.FC = () => (
  <group position={[0, DESK_TOP, 0.16]}>
    <RoundedBox args={[0.42, 0.016, 0.13]} radius={0.006} position={[0, 0.008, 0]} castShadow>
      <meshStandardMaterial color="#e9e6e1" roughness={0.6} />
    </RoundedBox>
    <RoundedBox args={[0.06, 0.02, 0.1]} radius={0.01} position={[0.3, 0.01, 0.02]} castShadow>
      <meshStandardMaterial color="#e9e6e1" roughness={0.6} />
    </RoundedBox>
  </group>
);

/* ------------------------------------------------------------------ */
/* Portable : du code qui défile                                       */
/* ------------------------------------------------------------------ */

export const Laptop: React.FC = () => {
  const { texture, draw } = useMemo(createCodeScreen, []);
  const offset = useRef(0);

  useFrame((_, delta) => {
    offset.current += delta * 0.9;
    draw(offset.current);
  });

  return (
    <group position={[0.52, DESK_TOP, 0.08]} rotation-y={-0.5}>
      <RoundedBox args={[0.36, 0.016, 0.25]} radius={0.006} position={[0, 0.008, 0]} castShadow>
        <meshStandardMaterial color="#9a9ca3" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      <group position={[0, 0.016, -0.125]} rotation-x={-0.28}>
        <RoundedBox args={[0.36, 0.24, 0.01]} radius={0.004} position={[0, 0.12, 0]} castShadow>
          <meshStandardMaterial color="#9a9ca3" metalness={0.6} roughness={0.35} />
        </RoundedBox>
        <mesh position={[0, 0.12, 0.0055]}>
          <planeGeometry args={[0.33, 0.215]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Téléphone                                                           */
/* ------------------------------------------------------------------ */

export const Phone: React.FC = () => {
  const texture = useMemo(createPhoneScreen, []);
  return (
    <group position={[-0.33, DESK_TOP, 0.2]} rotation-y={0.35}>
      <RoundedBox args={[0.085, 0.012, 0.17]} radius={0.005} position={[0, 0.006, 0]} castShadow>
        <meshStandardMaterial color={colors.device} metalness={0.5} roughness={0.3} />
      </RoundedBox>
      <mesh position={[0, 0.0125, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.076, 0.158]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Carnet ouvert : le parcours                                          */
/* ------------------------------------------------------------------ */

export const Notebook: React.FC = () => {
  const [left, right] = useMemo(() => {
    const steps = timeline.map((step) => `${step.periode.slice(-4)} · ${step.acquis}`);
    return [
      createNotebookPage("Parcours", steps.slice(0, 3)),
      createNotebookPage("→ GATS", steps.slice(3)),
    ];
  }, []);

  return (
    <group position={[-0.62, DESK_TOP, -0.02]} rotation-y={0.18}>
      <RoundedBox args={[0.38, 0.012, 0.26]} radius={0.004} position={[0, 0.006, 0]} castShadow>
        <meshStandardMaterial color="#9b3b2a" roughness={0.7} />
      </RoundedBox>
      {[
        { x: -0.092, map: left, tilt: 0.04 },
        { x: 0.092, map: right, tilt: -0.04 },
      ].map(({ x, map, tilt }) => (
        <mesh key={x} position={[x, 0.016, 0]} rotation={[-Math.PI / 2, tilt, 0]}>
          <planeGeometry args={[0.175, 0.245]} />
          <meshStandardMaterial map={map} roughness={0.9} />
        </mesh>
      ))}
      {/* Stylo */}
      <mesh position={[0.21, 0.01, 0.02]} rotation={[0, 0.3, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.005, 0.005, 0.15]} />
        <meshStandardMaterial color="#f0b35a" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Tableau en liège : les compétences en post-it                       */
/* ------------------------------------------------------------------ */

const postItColors = ["#fde68a", "#bfdbfe", "#bbf7d0"];

export const Corkboard: React.FC = () => {
  const notes = useMemo(
    () =>
      skillCategories.flatMap((category, row) =>
        category.skills.map((skill, col) => ({
          key: skill,
          map: createLabelTexture(skill, postItColors[row % postItColors.length]),
          x: -0.36 + col * 0.144,
          y: 0.19 - row * 0.19,
          tilt: ((col * 7 + row * 3) % 5) * 0.025 - 0.05,
        })),
      ),
    [],
  );

  return (
    <group position={[1.0, 1.7, -0.82]}>
      <RoundedBox args={[0.98, 0.66, 0.025]} radius={0.01} castShadow>
        <meshStandardMaterial color={colors.frame} roughness={0.7} />
      </RoundedBox>
      <mesh position={[0, 0, 0.013]}>
        <planeGeometry args={[0.92, 0.6]} />
        <meshStandardMaterial color={colors.cork} roughness={1} />
      </mesh>
      {notes.map((note) => (
        <group key={note.key} position={[note.x, note.y, 0.016]} rotation-z={note.tilt}>
          <mesh>
            <planeGeometry args={[0.12, 0.12]} />
            <meshStandardMaterial map={note.map} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.048, 0.006]}>
            <sphereGeometry args={[0.007, 12, 12]} />
            <meshStandardMaterial color="#c2410c" roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Photo encadrée et tasse : à propos                                  */
/* ------------------------------------------------------------------ */

export const PhotoAndMug: React.FC = () => {
  const photo = useTexture("/icon.png");
  photo.colorSpace = THREE.SRGBColorSpace;

  return (
    <group>
      <group position={[0.8, DESK_TOP, -0.3]} rotation-y={-0.35}>
        <group rotation-x={-0.12}>
          <RoundedBox args={[0.2, 0.25, 0.018]} radius={0.006} position={[0, 0.125, 0]} castShadow>
            <meshStandardMaterial color="#e9dfcf" roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, 0.125, 0.01]}>
            <planeGeometry args={[0.16, 0.2]} />
            <meshStandardMaterial map={photo} color="#ffffff" roughness={0.8} />
          </mesh>
        </group>
      </group>

      <group position={[0.6, DESK_TOP, -0.34]}>
        <mesh position={[0, 0.05, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.036, 0.1, 32]} />
          <meshStandardMaterial color="#f0b35a" roughness={0.5} />
        </mesh>
        <mesh position={[0.045, 0.05, 0]} rotation-z={Math.PI / 2}>
          <torusGeometry args={[0.022, 0.007, 12, 24]} />
          <meshStandardMaterial color="#f0b35a" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.092, 0]} rotation-x={-Math.PI / 2}>
          <circleGeometry args={[0.034, 24]} />
          <meshStandardMaterial color="#3b2416" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Décor : lampe et plante                                             */
/* ------------------------------------------------------------------ */

export const DeskLamp: React.FC<{ night: boolean }> = ({ night }) => (
  <group position={[-0.8, DESK_TOP, -0.3]} rotation-y={0.6}>
    <mesh position={[0, 0.01, 0]} castShadow>
      <cylinderGeometry args={[0.07, 0.08, 0.02, 32]} />
      <meshStandardMaterial color={colors.metal} metalness={0.6} roughness={0.35} />
    </mesh>
    <mesh position={[0, 0.2, 0]} rotation-z={0.2} castShadow>
      <cylinderGeometry args={[0.008, 0.008, 0.4]} />
      <meshStandardMaterial color={colors.metal} metalness={0.6} roughness={0.35} />
    </mesh>
    <group position={[-0.04, 0.4, 0]} rotation-z={-0.9}>
      <mesh position={[0, -0.04, 0]} castShadow>
        <coneGeometry args={[0.07, 0.12, 32, 1, true]} />
        <meshStandardMaterial color="#f0b35a" roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.07, 0]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial
          color="#fff1cf"
          emissive="#ffd28a"
          emissiveIntensity={night ? 3 : 0.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  </group>
);

export const Plant: React.FC = () => {
  const leaves = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => {
        const angle = (i / 9) * Math.PI * 2;
        return {
          key: i,
          position: [Math.cos(angle) * 0.12, 0.62 + (i % 3) * 0.1, Math.sin(angle) * 0.12] as [number, number, number],
          rotation: [Math.sin(angle) * 0.6, angle, Math.cos(angle) * 0.6] as [number, number, number],
        };
      }),
    [],
  );

  return (
    <group position={[-1.25, 0, -0.5]}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.12, 0.4, 32]} />
        <meshStandardMaterial color="#d9cbb5" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.42, 0]}>
        <cylinderGeometry args={[0.012, 0.015, 0.25]} />
        <meshStandardMaterial color="#4d6b3c" />
      </mesh>
      {leaves.map((leaf) => (
        <mesh key={leaf.key} position={leaf.position} rotation={leaf.rotation} scale={[0.09, 0.2, 0.03]} castShadow>
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color={leaf.key % 2 ? "#4f7a43" : "#5f8f4e"} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
};
