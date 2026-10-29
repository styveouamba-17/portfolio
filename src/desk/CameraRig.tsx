import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { getStation, overview, type StationId } from "./stations";

interface CameraRigProps {
  active: StationId | null;
  reduceMotion: boolean;
}

const desiredPosition = new THREE.Vector3();
const desiredTarget = new THREE.Vector3();
const right = new THREE.Vector3();
const forward = new THREE.Vector3();

/**
 * Glisse la caméra vers l'objet sélectionné, ou vers la vue d'ensemble.
 * Quand un panneau est ouvert, l'objet est décalé pour rester visible à côté :
 * à gauche sur desktop (panneau à droite), en haut sur mobile (panneau en bas).
 */
const CameraRig: React.FC<CameraRigProps> = ({ active, reduceMotion }) => {
  const { camera, pointer, size } = useThree();
  const target = useRef(new THREE.Vector3(...overview.target));
  const portrait = size.width < size.height;

  useFrame((_, delta) => {
    const framing = active ? getStation(active).camera : overview;
    desiredPosition.set(...framing.position);
    desiredTarget.set(...framing.target);

    forward.subVectors(desiredTarget, desiredPosition);
    const distance = forward.length();

    if (!active) {
      // Vue d'ensemble : on recule en portrait et on suit légèrement la souris.
      if (portrait) desiredPosition.addScaledVector(forward.normalize(), -distance * 0.75);
      if (!reduceMotion) {
        desiredPosition.x += pointer.x * 0.18;
        desiredPosition.y += pointer.y * 0.1;
      }
    } else if (portrait) {
      desiredPosition.addScaledVector(forward.clone().normalize(), -distance * 0.35);
      desiredTarget.y -= distance * 0.28;
      desiredPosition.y -= distance * 0.1;
    } else {
      right.crossVectors(forward, camera.up).normalize();
      desiredPosition.addScaledVector(right, distance * 0.3);
      desiredTarget.addScaledVector(right, distance * 0.3);
    }

    const speed = reduceMotion ? 30 : 3.2;
    const t = 1 - Math.exp(-speed * delta);
    camera.position.lerp(desiredPosition, t);
    target.current.lerp(desiredTarget, t);
    camera.lookAt(target.current);
  });

  return null;
};

export default CameraRig;
