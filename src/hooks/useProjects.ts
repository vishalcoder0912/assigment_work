import { useQuery } from "@tanstack/react-query";
import {
  getProjects,
  getProject,
  getFeaturedProjects,
  getRelatedProjects,
  type Project,
  type ProjectQuery,
} from "@/lib/api/projects";

export function useProjects(query: ProjectQuery = {}) {
  return useQuery({
    queryKey: ["projects", query],
    queryFn: () => getProjects(query),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ["project", slug],
    queryFn: () => getProject(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: ["projects", "featured"],
    queryFn: getFeaturedProjects,
    staleTime: 10 * 60 * 1000,
  });
}

export function useRelatedProjects(slug: string, limit = 2) {
  return useQuery({
    queryKey: ["projects", "related", slug],
    queryFn: () => getRelatedProjects(slug, limit),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export type { Project, ProjectQuery };
