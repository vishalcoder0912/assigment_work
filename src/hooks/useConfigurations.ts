import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getMaterials,
  getGemstones,
  getCuts,
  getFinishes,
  saveConfiguration,
  getConfiguration,
  type MaterialOption,
  type GemstoneOption,
  type CutOption,
  type FinishOption,
  type RingConfiguration,
  type SavedConfiguration,
  defaultConfiguration,
} from "@/lib/api/configurations";
import { getProducts, getProduct } from "@/lib/api/products";
import type { Product } from "@/types/domain";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 30 * 60 * 1000,
  });
}

export function useProduct(idOrSlug: string) {
  return useQuery<Product | null>({
    queryKey: ["product", idOrSlug],
    queryFn: () => getProduct(idOrSlug),
    enabled: !!idOrSlug,
    staleTime: 30 * 60 * 1000,
  });
}

export function useMaterials() {
  return useQuery<MaterialOption[]>({
    queryKey: ["materials"],
    queryFn: getMaterials,
    staleTime: 30 * 60 * 1000,
  });
}

export function useGemstones() {
  return useQuery<GemstoneOption[]>({
    queryKey: ["gemstones"],
    queryFn: getGemstones,
    staleTime: 30 * 60 * 1000,
  });
}

export function useCuts() {
  return useQuery<CutOption[]>({
    queryKey: ["cuts"],
    queryFn: getCuts,
    staleTime: 30 * 60 * 1000,
  });
}

export function useFinishes() {
  return useQuery<FinishOption[]>({
    queryKey: ["finishes"],
    queryFn: getFinishes,
    staleTime: 30 * 60 * 1000,
  });
}

export function useSaveConfiguration() {
  const queryClient = useQueryClient();

  return useMutation<SavedConfiguration, Error, RingConfiguration>({
    mutationFn: (config: RingConfiguration) => saveConfiguration(config),
    onSuccess: (saved) => {
      queryClient.setQueryData(["configuration", saved.id], saved);
    },
  });
}

export function useConfiguration(id: string) {
  return useQuery<SavedConfiguration | null>({
    queryKey: ["configuration", id],
    queryFn: () => getConfiguration(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export { defaultConfiguration };
export type {
  MaterialOption,
  GemstoneOption,
  CutOption,
  FinishOption,
  RingConfiguration,
  SavedConfiguration,
};
