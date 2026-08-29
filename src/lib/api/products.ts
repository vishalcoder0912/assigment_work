import type { Product } from "@/types/domain";
import { apiClient } from "./client";

export async function getProducts(): Promise<Product[]> {
  const response = await apiClient.get<Product[]>("/products");
  return response as Product[];
}

export async function getProduct(idOrSlug: string): Promise<Product | null> {
  try {
    const response = await apiClient.get<Product>(`/products/${idOrSlug}`);
    return response as Product;
  } catch (error) {
    const apiError = error as { statusCode?: number };
    if (apiError.statusCode === 404) {
      return null;
    }
    throw error;
  }
}

export async function createProduct(payload: Omit<Product, "id">): Promise<Product> {
  const response = await apiClient.post<Product>("/products", payload);
  return response as Product;
}

export async function updateProduct(id: string, payload: Partial<Product>): Promise<Product> {
  const response = await apiClient.patch<Product>(`/products/${id}`, payload);
  return response as Product;
}

export async function deleteProduct(id: string): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}
