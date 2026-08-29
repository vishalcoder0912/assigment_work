import type { Gemstone } from "@/types/domain";
import { apiClient } from "./client";

export async function getGemstones(): Promise<Gemstone[]> {
  const response = await apiClient.get<Gemstone[]>("/gemstones");
  return response as Gemstone[];
}

export async function getGemstone(id: string): Promise<Gemstone | null> {
  try {
    const response = await apiClient.get<Gemstone>(`/gemstones/${id}`);
    return response as Gemstone;
  } catch (error) {
    const apiError = error as { statusCode?: number };
    if (apiError.statusCode === 404) {
      return null;
    }
    throw error;
  }
}
