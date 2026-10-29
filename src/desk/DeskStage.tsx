import { useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { webProjects } from "../data/projects";
import Loader from "./Loader";
import Scene from "./Scene";
import { overview, type StationId } from "./stations";

webProjects.forEach((projet) => useTexture.preload(`/images/${projet.image}`));

interface DeskStageProps {
  active: StationId | null;
  onSelect: (station: StationId) => void;
  onBackgroundClick: () => void;
  night: boolean;
  monitorImage: string;
  reduceMotion: boolean;
}

/** Tout ce qui dépend de Three.js, chargé à part pour que la version classique s'en passe. */
const DeskStage: React.FC<DeskStageProps> = ({ onBackgroundClick, ...sceneProps }) => (
  <>
    <Canvas
      className="desk-canvas"
      shadows
      dpr={[1, 2]}
      camera={{ fov: 38, near: 0.05, far: 30, position: overview.position }}
      onPointerMissed={onBackgroundClick}
    >
      <Suspense fallback={null}>
        <Scene {...sceneProps} />
      </Suspense>
    </Canvas>
    <Loader />
  </>
);

export default DeskStage;
