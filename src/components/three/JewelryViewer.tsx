import { useTheme } from "@/components/theme/ThemeProvider";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { useCallback, useRef, useState } from "react";
import { useReducedMotionPref } from "@/hooks/use-reduced-motion-pref";
import { RingModel } from "./RingModel";
import { StudioLighting } from "./StudioLighting";
import { defaultConfiguration, type RingConfiguration } from "@/lib/api/configurations";
import { cn } from "@/lib/utils";

interface JewelryViewerProps {
  configuration?: RingConfiguration;
  className?: string;
  cameraDistance?: number;
  wireframe?: boolean;
  showPedestal?: boolean;
}

export default function JewelryViewer({
  configuration = defaultConfiguration,
  className,
  cameraDistance = 4.2,
  wireframe = false,
  showPedestal = true,
}: JewelryViewerProps) {
  const { theme } = useTheme();
  const reduced = useReducedMotionPref();
  const pointer = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current = {
      x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
    };
  }, []);

  return (
    <div
      className={cn("relative h-full w-full", className)}
      onPointerMove={onPointerMove}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => {
        setActive(false);
        pointer.current = { x: 0, y: 0 };
      }}
      data-cursor="drag"
      role="img"
      aria-label="Interactive 3D view of a solitaire ring"
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced && !active ? "demand" : "always"}
      >
        <PerspectiveCamera makeDefault fov={30} position={[0, 0.55, cameraDistance]} />
        <StudioLighting />
        <group position={[0, -0.35, 0]}>
          <RingModel
            configuration={configuration}
            pointer={pointer.current}
            autoRotate={!reduced}
            wireframe={wireframe}
          />
          {showPedestal ? (
            <>
              <mesh position={[0, -1.32, 0]} receiveShadow>
                <cylinderGeometry args={[1.5, 1.6, 0.18, 64]} />
                <meshStandardMaterial
                  color={theme === "light" ? "#ded7cc" : "#15120f"}
                  roughness={0.55}
                  metalness={0.2}
                />
              </mesh>
              <ContactShadows
                position={[0, -1.22, 0]}
                opacity={0.6}
                scale={6}
                blur={2.6}
                far={3}
                color={theme === "light" ? "#8a8378" : "#000000"}
              />
            </>
          ) : null}
        </group>
      </Canvas>
    </div>
  );
}
