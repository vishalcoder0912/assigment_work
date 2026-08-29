import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { RingConfiguration } from "@/types/domain";
import { mapConfigurationToThree } from "@/lib/three/mapping";
import { createGemGeometry } from "./geometry";

const TAU = Math.PI * 2;

interface RingModelProps {
  configuration: RingConfiguration;
  /** Cursor-driven tilt, normalised -1..1 */
  pointer?: { x: number; y: number };
  autoRotate?: boolean;
  wireframe?: boolean;
}

export function RingModel({
  configuration,
  pointer = { x: 0, y: 0 },
  autoRotate = true,
  wireframe = false,
}: RingModelProps) {
  const group = useRef<THREE.Group>(null);
  const bandMaterial = useRef<THREE.MeshPhysicalMaterial>(null);
  const gemMaterial = useRef<THREE.MeshPhysicalMaterial>(null);

  const targets = useMemo(() => mapConfigurationToThree(configuration), [configuration]);

  const gemGeometry = useMemo(
    () => createGemGeometry(targets.gemstone.segments),
    [targets.gemstone.segments],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (g) {
      if (autoRotate) g.rotation.y += delta * 0.16;
      const targetX = -0.12 + pointer.y * 0.16;
      const targetZ = pointer.x * 0.12;
      g.rotation.x += (targetX - g.rotation.x) * Math.min(1, delta * 2.4);
      g.rotation.z += (targetZ - g.rotation.z) * Math.min(1, delta * 2.4);
      g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.014;
    }
    const lerp = Math.min(1, delta * 3);
    if (bandMaterial.current) {
      bandMaterial.current.color.lerp(targets.metal.color, lerp);
      bandMaterial.current.roughness +=
        (targets.metal.roughness - bandMaterial.current.roughness) * lerp;
    }
    if (gemMaterial.current) {
      gemMaterial.current.color.lerp(targets.gemstone.color, lerp);
      gemMaterial.current.transmission +=
        (targets.gemstone.transmission - gemMaterial.current.transmission) * lerp;
    }
  });

  const prongs = useMemo(() => [0, 1, 2, 3].map((i) => (i * TAU) / 4 + Math.PI / 4), []);

  return (
    <group ref={group} rotation={[-0.12, 0, 0]}>
      {/* band */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.105, 48, 160]} />
        <meshPhysicalMaterial
          ref={bandMaterial}
          color={targets.metal.color}
          metalness={targets.metal.metalness}
          roughness={targets.metal.roughness}
          envMapIntensity={targets.metal.envMapIntensity}
          clearcoat={targets.metal.clearcoat}
          clearcoatRoughness={targets.metal.clearcoatRoughness}
          wireframe={wireframe}
        />
      </mesh>

      {/* setting head */}
      <group position={[0, 1.06, 0]}>
        <mesh>
          <cylinderGeometry args={[0.2, 0.14, 0.16, 32]} />
          <meshPhysicalMaterial
            color={targets.metal.color}
            metalness={targets.metal.metalness}
            roughness={targets.metal.roughness}
            envMapIntensity={targets.metal.envMapIntensity}
            wireframe={wireframe}
          />
        </mesh>

        {prongs.map((angle, index) => (
          <mesh
            key={index}
            position={[Math.cos(angle) * 0.235, 0.2, Math.sin(angle) * 0.235]}
            rotation={[Math.cos(angle) * 0.16, 0, -Math.sin(angle) * 0.16]}
          >
            <capsuleGeometry args={[0.026, 0.26, 4, 10]} />
            <meshPhysicalMaterial
              color={targets.metal.color}
              metalness={targets.metal.metalness}
              roughness={targets.metal.roughness}
              envMapIntensity={targets.metal.envMapIntensity}
              wireframe={wireframe}
            />
          </mesh>
        ))}

        {/* gemstone */}
        <mesh
          geometry={gemGeometry}
          position={[0, 0.3, 0]}
          scale={[targets.gemstone.oval, 1, 1]}
          rotation={[0, targets.gemstone.rotate, 0]}
        >
          <meshPhysicalMaterial
            ref={gemMaterial}
            color={targets.gemstone.color}
            metalness={targets.gemstone.metalness}
            roughness={targets.gemstone.roughness}
            transmission={targets.gemstone.transmission}
            thickness={targets.gemstone.thickness}
            ior={targets.gemstone.ior}
            reflectivity={targets.gemstone.reflectivity}
            envMapIntensity={targets.gemstone.envMapIntensity}
            flatShading
            wireframe={wireframe}
          />
        </mesh>
      </group>
    </group>
  );
}
