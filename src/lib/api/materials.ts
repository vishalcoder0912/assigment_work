import type { Material } from "@/types/domain";
import { apiClient } from "./client";

export async function getMaterials(): Promise<Material[]> {
  const response = await apiClient.get<Material[]>("/materials");
  return response as Material[];
}

export async function getMaterial(id: string): Promise<Material | null> {
  try {
    const response = await apiClient.get<Material>(`/materials/${id}`);
    return response as Material;
  } catch (error) {
    const apiError = error as { statusCode?: number };
    if (apiError.statusCode === 404) {
      return null;
    }
    throw error;
  }
}
