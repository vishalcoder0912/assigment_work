import type { Configuration, SavedConfiguration, RingConfiguration } from "@/types/domain";
import { apiClient } from "./client";
import { getMaterials as fetchMaterials } from "./materials";
import { getGemstones as fetchGemstones } from "./gemstones";

export const metals = [
  { id: "gold", label: "Gold", color: "#A88D62", roughness: 0.22 },
  { id: "rose-gold", label: "Rose Gold", color: "#B98A72", roughness: 0.24 },
  { id: "platinum", label: "Platinum", color: "#C9C7C1", roughness: 0.16 },
  { id: "silver", label: "Silver", color: "#D6D3CC", roughness: 0.12 },
] as const;

export const gemstones = [
  { id: "diamond", label: "Diamond", color: "#EDEAE3" },
  { id: "ruby", label: "Ruby", color: "#8E1F2B" },
  { id: "emerald", label: "Emerald", color: "#1E5B45" },
  { id: "sapphire", label: "Sapphire", color: "#1B3A67" },
] as const;

export const cuts = [
  { id: "round", label: "Round", segments: 24 },
  { id: "princess", label: "Princess", segments: 4 },
  { id: "emerald", label: "Emerald", segments: 8 },
  { id: "radiant", label: "Radiant", segments: 6 },
  { id: "oval", label: "Oval", segments: 20 },
] as const;

export const finishes = [
  { id: "polished", label: "Polished", roughness: 0.06 },
  { id: "satin", label: "Satin", roughness: 0.28 },
  { id: "brushed", label: "Brushed", roughness: 0.46 },
] as const;

export type MetalId = (typeof metals)[number]["id"];
export type GemstoneId = (typeof gemstones)[number]["id"];
export type CutId = (typeof cuts)[number]["id"];
export type FinishId = (typeof finishes)[number]["id"];

export const defaultConfiguration: RingConfiguration = {
  metal: "gold",
  gemstone: "diamond",
  cut: "round",
  finish: "polished",
};

export interface MaterialOption {
  id: string;
  label: string;
  name: string;
  color: string;
  roughness: number;
  metalness: number;
}

export interface GemstoneOption {
  id: string;
  label: string;
  name: string;
  color: string;
  cut: string;
}

export interface CutOption {
  id: string;
  label: string;
  segments: number;
}

export interface FinishOption {
  id: string;
  label: string;
  roughness: number;
}

export async function getMaterials(): Promise<MaterialOption[]> {
  const backendMaterials = await fetchMaterials();
  return backendMaterials.map((m) => ({
    id: m.id,
    label: m.name,
    name: m.name,
    color: m.color,
    roughness: m.roughness,
    metalness: m.metalness,
  }));
}

export async function getGemstones(): Promise<GemstoneOption[]> {
  const backendGemstones = await fetchGemstones();
  return backendGemstones.map((g) => ({
    id: g.id,
    label: g.name,
    name: g.name,
    color: g.color,
    cut: g.cut,
  }));
}

export async function getCuts(): Promise<CutOption[]> {
  try {
    const response = await apiClient.get<CutOption[]>("/configurations/cuts");
    return response as CutOption[];
  } catch {
    return cuts.map((c) => ({ id: c.id, label: c.label, segments: c.segments }));
  }
}

export async function getFinishes(): Promise<FinishOption[]> {
  try {
    const response = await apiClient.get<FinishOption[]>("/configurations/finishes");
    return response as FinishOption[];
  } catch {
    return finishes.map((f) => ({ id: f.id, label: f.label, roughness: f.roughness }));
  }
}

export async function saveConfiguration(
  configuration: RingConfiguration,
): Promise<SavedConfiguration> {
  const payload = {
    productId: configuration.productId || "prod-01",
    materialId: configuration.metal,
    gemstoneId: configuration.gemstone,
    metal: configuration.metal,
    gemstone: configuration.gemstone,
    cut: configuration.cut.toUpperCase(),
    finish: configuration.finish.toUpperCase(),
  };

  const response = await apiClient.post<SavedConfiguration>("/configurations", payload);
  return response as SavedConfiguration;
}

export async function getConfiguration(reference: string): Promise<SavedConfiguration | null> {
  try {
    const response = await apiClient.get<SavedConfiguration>(`/configurations/${reference}`);
    return response as SavedConfiguration;
  } catch (error) {
    const apiError = error as { statusCode?: number };
    if (apiError.statusCode === 404) {
      return null;
    }
    throw error;
  }
}

export type { RingConfiguration, Configuration, SavedConfiguration };
