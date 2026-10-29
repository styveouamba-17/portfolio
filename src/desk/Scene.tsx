import { ContactShadows } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import CameraRig from "./CameraRig";
import Interactive from "./Interactive";
import {
  Chair,
  Corkboard,
  DakarWindow,
  Desk,
  DeskLamp,
  Keyboard,
  Laptop,
  Monitor,
  Notebook,
  Phone,
  PhotoAndMug,
  Plant,
  Room,
} from "./Objects";
import type { StationId } from "./stations";

interface SceneProps {
  active: StationId | null;
  onSelect: (station: StationId) => void;
  night: boolean;
  monitorImage: string;
  reduceMotion: boolean;
}

const palette = {
  day: { background: "#efe6d8", hemiSky: "#fff4e0", hemiGround: "#b48659", hemi: 1.0, sun: 2.2, lamp: 0, screen: 0, ambient: 0.55, fill: 1.1 },
  night: { background: "#0b0d16", hemiSky: "#3a4470", hemiGround: "#1a1410", hemi: 0.3, sun: 0.25, lamp: 3.2, screen: 0.9, ambient: 0.12, fill: 0.15 },
};

const tmpColor = new THREE.Color();

/** Lumières qui glissent entre le jour (soleil couchant par la fenêtre) et la nuit (lampe et écrans). */
const Lights: React.FC<{ night: boolean }> = ({ night }) => {
  const { scene } = useThree();
  const hemi = useRef<THREE.HemisphereLight>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const lamp = useRef<THREE.PointLight>(null);
  const screen = useRef<THREE.PointLight>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const fill = useRef<THREE.DirectionalLight>(null);

  useFrame((_, delta) => {
    const p = night ? palette.night : palette.day;
    const t = 1 - Math.exp(-4 * delta);
    if (!(scene.background instanceof THREE.Color)) scene.background = new THREE.Color(p.background);
    (scene.background as THREE.Color).lerp(tmpColor.set(p.background), t);
    if (hemi.current) {
      hemi.current.intensity = THREE.MathUtils.lerp(hemi.current.intensity, p.hemi, t);
      hemi.current.color.lerp(tmpColor.set(p.hemiSky), t);
      hemi.current.groundColor.lerp(tmpColor.set(p.hemiGround), t);
    }
    if (sun.current) {
      sun.current.intensity = THREE.MathUtils.lerp(sun.current.intensity, p.sun, t);
      sun.current.color.lerp(tmpColor.set(night ? "#9fb4ff" : "#ffd2a1"), t);
    }
    if (lamp.current) lamp.current.intensity = THREE.MathUtils.lerp(lamp.current.intensity, p.lamp, t);
    if (ambient.current) ambient.current.intensity = THREE.MathUtils.lerp(ambient.current.intensity, p.ambient, t);
    if (fill.current) fill.current.intensity = THREE.MathUtils.lerp(fill.current.intensity, p.fill, t);
    if (screen.current) screen.current.intensity = THREE.MathUtils.lerp(screen.current.intensity, p.screen, t);
  });

  return (
    <>
      <hemisphereLight ref={hemi} intensity={palette.day.hemi} />
      <ambientLight ref={ambient} intensity={palette.day.ambient} />
      {/* Lumière douce de face pour déboucher les murs */}
      <directionalLight ref={fill} position={[3, 3, 5]} intensity={palette.day.fill} color="#fff6ea" />
      <directionalLight
        ref={sun}
        position={[-3.5, 3, 0.6]}
        intensity={palette.day.sun}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0005}
      />
      <pointLight ref={lamp} position={[-0.72, 1.05, -0.2]} color="#ffc983" distance={2.2} decay={1.6} intensity={0} />
      <pointLight ref={screen} position={[0, 1.1, 0.2]} color="#9db4ff" distance={1.4} decay={2} intensity={0} />
    </>
  );
};

const Scene: React.FC<SceneProps> = ({ active, onSelect, night, monitorImage, reduceMotion }) => {
  const interactive = { active, onSelect };

  return (
    <>
      <Lights night={night} />
      <CameraRig active={active} reduceMotion={reduceMotion} />

      <Room />
      <Desk />
      <Chair />
      <Plant />
      <Keyboard />
      <Laptop />
      <DeskLamp night={night} />

      <Interactive station="work" labelOffset={[0, 1.35, -0.2]} lift={0.015} {...interactive}>
        <Monitor image={monitorImage} night={night} />
      </Interactive>
      <Interactive station="mobile" labelOffset={[-0.33, 0.95, 0.2]} {...interactive}>
        <Phone />
      </Interactive>
      <Interactive station="path" labelOffset={[-0.62, 0.95, -0.02]} {...interactive}>
        <Notebook />
      </Interactive>
      <Interactive station="skills" labelOffset={[1.0, 2.13, -0.8]} lift={0} {...interactive}>
        <Corkboard />
      </Interactive>
      <Interactive station="about" labelOffset={[0.72, 1.15, -0.3]} {...interactive}>
        <PhotoAndMug />
      </Interactive>
      <Interactive station="contact" labelOffset={[-1.55, 2.02, 0.35]} lift={0} {...interactive}>
        <DakarWindow night={night} />
      </Interactive>

      <ContactShadows position={[0, 0.752, 0]} scale={[1.8, 0.8]} opacity={0.45} blur={2} far={0.6} resolution={512} />
      <ContactShadows position={[0, 0.002, 0.4]} scale={4} opacity={0.35} blur={2.5} far={1.2} resolution={512} />
    </>
  );
};

export default Scene;
