import { Environment, Lightformer } from "@react-three/drei";

/**
 * Cinematic Studio Lighting Rig:
 * - High-angle key softbox with natural decay
 * - Anamorphic warm rim edge for metal contours
 * - Balanced fill & caustic sparkles on gemstone facets
 */
export function StudioLighting() {
  return (
    <>
      {/* Base cinematic ambiance */}
      <ambientLight intensity={0.2} color="#f5eee6" />

      {/* Main key soft light */}
      <directionalLight
        position={[3.5, 6, 2.5]}
        intensity={1.8}
        color="#fff5e8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Cinematic cool-warm counter rim */}
      <directionalLight position={[-4.5, 2.8, -3.2]} intensity={0.9} color="#d8c5ad" />

      {/* High-intensity overhead spotlight creating gemstone dispersion */}
      <spotLight
        position={[0, 7.5, 0.5]}
        angle={0.42}
        penumbra={0.9}
        intensity={1.2}
        color="#ffffff"
      />

      {/* Procedural High-Dynamic-Range studio environment map */}
      <Environment resolution={512}>
        {/* Overhead large softbox */}
        <Lightformer
          form="rect"
          intensity={4.2}
          position={[0, 4.5, 2.5]}
          scale={[10, 5, 1]}
          color="#fff8f0"
        />

        {/* Lateral fill lightformer */}
        <Lightformer
          form="rect"
          intensity={2.2}
          position={[-6, 1.5, 2]}
          scale={[6, 7, 1]}
          color="#d2c1aa"
        />

        {/* Back rim lightformer for crisp metal bevel definition */}
        <Lightformer
          form="rect"
          intensity={1.8}
          position={[5.5, 0.5, -3.5]}
          scale={[6, 7, 1]}
          color="#a0988e"
        />

        {/* Ground golden kicker ring */}
        <Lightformer
          form="ring"
          intensity={3.0}
          position={[0, -2.2, 4]}
          scale={[3.5, 3.5, 1]}
          color="#b98a72"
        />

        {/* High specular pinlight for facet fire */}
        <Lightformer
          form="circle"
          intensity={5.0}
          position={[1.5, 3, 2]}
          scale={[0.8, 0.8, 1]}
          color="#ffffff"
        />
      </Environment>
    </>
  );
}
