import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import { useReducedMotionPref } from "@/hooks/use-reduced-motion-pref";
import * as THREE from "three";
import { RingModel } from "./RingModel";
import { StudioLighting } from "./StudioLighting";
import { defaultConfiguration } from "@/lib/api/configurations";

function ArchitecturalForms() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.02;
  });

  const columns = [-3.4, -2.1, 2.1, 3.4];

  return (
    <group ref={group} position={[0, 0, -3]}>
      {columns.map((x, index) => (
        <mesh key={x} position={[x, index % 2 === 0 ? -0.4 : 0.3, index % 2 === 0 ? -1 : -2.4]}>
          <boxGeometry args={[0.5, 5 + index * 0.6, 0.5]} />
          <meshStandardMaterial color="#181411" roughness={0.85} metalness={0.15} />
        </mesh>
      ))}
      <mesh position={[0, 2.6, -2]} rotation={[0, 0, 0]}>
        <boxGeometry args={[9, 0.12, 0.6]} />
        <meshStandardMaterial color="#12100e" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function AtelierScene() {
  const reduced = useReducedMotionPref();

  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? "demand" : "always"}
    >
      <PerspectiveCamera makeDefault fov={34} position={[0, 0.4, 6]} />
      <StudioLighting />
      <ArchitecturalForms />
      <Float speed={reduced ? 0 : 1} rotationIntensity={0.14} floatIntensity={0.5}>
        <group scale={0.95} position={[0, 0.35, 0]}>
          <RingModel configuration={defaultConfiguration} autoRotate={!reduced} />
        </group>
      </Float>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0b0a09" roughness={0.25} metalness={0.6} />
      </mesh>
      <ContactShadows position={[0, -1.48, 0]} opacity={0.7} scale={12} blur={3} far={4} />
    </Canvas>
  );
}
