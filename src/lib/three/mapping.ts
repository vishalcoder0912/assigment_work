import * as THREE from "three";
import type { Material, Gemstone, RingConfiguration } from "@/types/domain";

export interface ThreeMetalProperties {
  color: THREE.Color;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  envMapIntensity: number;
}

export interface ThreeGemProperties {
  color: THREE.Color;
  roughness: number;
  metalness: number;
  transmission: number;
  thickness: number;
  ior: number;
  reflectivity: number;
  envMapIntensity: number;
  isDiamond: boolean;
  segments: number;
  oval: number;
  rotate: number;
}

export const DEFAULT_METALS: Record<
  string,
  { color: string; roughness: number; metalness: number }
> = {
  gold: { color: "#A88D62", roughness: 0.22, metalness: 1 },
  "rose-gold": { color: "#B98A72", roughness: 0.24, metalness: 1 },
  platinum: { color: "#C9C7C1", roughness: 0.16, metalness: 1 },
  silver: { color: "#D6D3CC", roughness: 0.12, metalness: 1 },
};

export const DEFAULT_GEMSTONES: Record<
  string,
  { color: string; transmission: number; ior: number; isDiamond: boolean }
> = {
  diamond: { color: "#EDEAE3", transmission: 0.95, ior: 2.417, isDiamond: true },
  ruby: { color: "#8E1F2B", transmission: 0.55, ior: 1.77, isDiamond: false },
  emerald: { color: "#1E5B45", transmission: 0.52, ior: 1.58, isDiamond: false },
  sapphire: { color: "#1B3A67", transmission: 0.58, ior: 1.77, isDiamond: false },
};

export const DEFAULT_CUTS: Record<string, { segments: number; oval: number; rotate: number }> = {
  round: { segments: 24, oval: 1, rotate: 0 },
  princess: { segments: 4, oval: 1, rotate: Math.PI / 4 },
  emerald: { segments: 8, oval: 1, rotate: 0 },
  radiant: { segments: 6, oval: 1, rotate: 0 },
  oval: { segments: 20, oval: 1.25, rotate: 0 },
};

export const DEFAULT_FINISHES: Record<string, { roughnessOffset: number }> = {
  polished: { roughnessOffset: 0.0 },
  satin: { roughnessOffset: 0.18 },
  brushed: { roughnessOffset: 0.32 },
};

/**
 * Maps domain Material data into Three.js MeshPhysicalMaterial properties
 */
export function mapMaterialToThree(
  material?: Material | string | null,
  finish?: string | null,
): ThreeMetalProperties {
  let hex = "#A88D62";
  let baseRoughness = 0.22;
  let metalness = 1.0;

  if (typeof material === "string") {
    const preset = DEFAULT_METALS[material.toLowerCase()] ?? DEFAULT_METALS["gold"]!;
    hex = preset.color;
    baseRoughness = preset.roughness;
    metalness = preset.metalness;
  } else if (material && typeof material === "object") {
    hex = material.color || hex;
    baseRoughness = typeof material.roughness === "number" ? material.roughness : baseRoughness;
    metalness = typeof material.metalness === "number" ? material.metalness : metalness;
  }

  const finishOffset =
    finish && DEFAULT_FINISHES[finish.toLowerCase()]
      ? DEFAULT_FINISHES[finish.toLowerCase()]!.roughnessOffset
      : 0;

  return {
    color: new THREE.Color(hex),
    roughness: Math.min(0.8, Math.max(0.04, baseRoughness + finishOffset)),
    metalness,
    clearcoat: 0.35,
    clearcoatRoughness: 0.25,
    envMapIntensity: 1.5,
  };
}

/**
 * Maps domain Gemstone and Cut data into Three.js physical material and geometry properties
 */
export function mapGemstoneToThree(
  gemstone?: Gemstone | string | null,
  cut?: string | null,
): ThreeGemProperties {
  let hex = "#EDEAE3";
  let transmission = 0.95;
  let ior = 2.417;
  let isDiamond = true;

  if (typeof gemstone === "string") {
    const key = gemstone.toLowerCase();
    const preset = DEFAULT_GEMSTONES[key] ?? DEFAULT_GEMSTONES["diamond"]!;
    hex = preset.color;
    transmission = preset.transmission;
    ior = preset.ior;
    isDiamond = preset.isDiamond;
  } else if (gemstone && typeof gemstone === "object") {
    hex = gemstone.color || hex;
    isDiamond = gemstone.name.toLowerCase().includes("diamond");
    transmission = isDiamond ? 0.95 : 0.55;
    ior = isDiamond ? 2.417 : 1.77;
  }

  const cutKey = (cut || (typeof gemstone === "object" && gemstone?.cut) || "round").toLowerCase();
  const cutConfig = DEFAULT_CUTS[cutKey] ?? DEFAULT_CUTS["round"]!;

  return {
    color: new THREE.Color(hex),
    roughness: 0.02,
    metalness: 0,
    transmission,
    thickness: 1.1,
    ior,
    reflectivity: 1,
    envMapIntensity: 2.2,
    isDiamond,
    segments: cutConfig.segments,
    oval: cutConfig.oval,
    rotate: cutConfig.rotate,
  };
}

/**
 * Maps a full RingConfiguration into complete Three.js render targets
 */
export function mapConfigurationToThree(config: RingConfiguration) {
  const metalProps = mapMaterialToThree(config.metal, config.finish);
  const gemProps = mapGemstoneToThree(config.gemstone, config.cut);

  return {
    metal: metalProps,
    gemstone: gemProps,
  };
}
