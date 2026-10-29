import { Html } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { getStation, type StationId } from "./stations";

interface InteractiveProps {
  station: StationId;
  active: StationId | null;
  onSelect: (station: StationId) => void;
  /** Hauteur de l'étiquette au-dessus de l'objet. */
  labelOffset?: [number, number, number];
  /** Soulèvement au survol (0 pour les objets fixés au mur). */
  lift?: number;
  children: ReactNode;
}

/** Rend un objet du bureau cliquable : soulèvement au survol, étiquette et curseur. */
const Interactive: React.FC<InteractiveProps> = ({
  station,
  active,
  onSelect,
  labelOffset = [0, 0.25, 0],
  lift = 0.03,
  children,
}) => {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const highlighted = hovered && active === null;

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = highlighted ? lift : 0;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, target, 10, delta);
  });

  function setHover(value: boolean) {
    return (event: ThreeEvent<PointerEvent>) => {
      event.stopPropagation();
      setHovered(value);
      document.body.style.cursor = value && active === null ? "pointer" : "";
    };
  }

  return (
    <group
      ref={group}
      onPointerOver={setHover(true)}
      onPointerOut={setHover(false)}
      onClick={(event) => {
        event.stopPropagation();
        document.body.style.cursor = "";
        onSelect(station);
      }}
    >
      {children}
      {highlighted && (
        <Html position={labelOffset} center distanceFactor={2.4} zIndexRange={[20, 0]}>
          <span className="desk-tag">{getStation(station).label}</span>
        </Html>
      )}
    </group>
  );
};

export default Interactive;
