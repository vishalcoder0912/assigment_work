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

export interface RingConfiguration {
  metal: MetalId;
  gemstone: GemstoneId;
  cut: CutId;
  finish: FinishId;
}

export const defaultConfiguration: RingConfiguration = {
  metal: "gold",
  gemstone: "diamond",
  cut: "round",
  finish: "polished",
};

export interface SavedConfiguration extends RingConfiguration {
  reference: string;
}
