import * as THREE from "three";

/** Merge simple non-indexed position/normal geometries without the addons bundle. */
export function mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];

  for (const geometry of geometries) {
    const source = geometry.index ? geometry.toNonIndexed() : geometry;
    const position = source.getAttribute("position");
    const normal = source.getAttribute("normal");
    if (position) positions.push(...Array.from(position.array as Float32Array));
    if (normal) normals.push(...Array.from(normal.array as Float32Array));
  }

  const merged = new THREE.BufferGeometry();
  merged.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  if (normals.length === positions.length) {
    merged.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  } else {
    merged.computeVertexNormals();
  }
  merged.computeBoundingSphere();
  return merged;
}

/** Faceted gemstone: crown + pavilion, facet count driven by the selected cut. */
export function createGemGeometry(segments: number): THREE.BufferGeometry {
  const crown = new THREE.ConeGeometry(0.3, 0.16, segments, 1);
  crown.translate(0, 0.08, 0);
  const pavilion = new THREE.ConeGeometry(0.3, 0.34, segments, 1);
  pavilion.rotateX(Math.PI);
  pavilion.translate(0, -0.17, 0);
  const merged = mergeGeometries([crown, pavilion]);
  crown.dispose();
  pavilion.dispose();
  return merged;
}
