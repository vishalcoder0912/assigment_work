import type { Project, ProjectCategory } from "@/types/domain";
import type { ProjectQueryParams, CreateProjectDto, UpdateProjectDto } from "@/types/api";
import { apiClient } from "./client";

export type { Project, ProjectCategory };
export type ProjectQuery = ProjectQueryParams;

function mapCategory(category: string): ProjectCategory {
  const map: Record<string, ProjectCategory> = {
    ANIMATION_3D: "3D Animation",
    PRODUCT_VISUALIZATION: "Product Visualization",
    CAD_DESIGN: "CAD Design",
    AR_VR: "AR / VR",
    DIAMOND: "Diamond",
  };
  return map[category] || "3D Animation";
}

function transformProject(p: Project): Project {
  return {
    ...p,
    category: mapCategory(p.category),
    image: {
      src: p.imageUrl,
      alt: p.imageAlt,
      width: p.imageWidth,
      height: p.imageHeight,
    },
  };
}

export async function getProjects(query: ProjectQueryParams = {}): Promise<Project[]> {
  const params: Record<string, string | number | boolean | undefined> = {
    category: query.category === "All" ? undefined : query.category,
    search: query.search?.trim() ? query.search.trim() : undefined,
    page: query.page,
    limit: query.limit,
    featured: query.featured,
  };

  const response = await apiClient.get<Project[]>("/projects", params);
  return (response as Project[]).map(transformProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await apiClient.get<Project>(`/projects/${slug}`);
    return transformProject(response as Project);
  } catch (error) {
    const apiError = error as { statusCode?: number };
    if (apiError.statusCode === 404) {
      return null;
    }
    throw error;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const response = await apiClient.get<Project[]>("/projects", { featured: true, limit: 6 });
  return (response as Project[]).map(transformProject);
}

export async function getRelatedProjects(slug: string, limit = 2): Promise<Project[]> {
  const response = await apiClient.get<Project[]>(`/projects/${slug}/related`, { limit });
  return (response as Project[]).map(transformProject);
}

export async function createProject(payload: CreateProjectDto): Promise<Project> {
  const response = await apiClient.post<Project>("/projects", payload);
  return transformProject(response as Project);
}

export async function updateProject(id: string, payload: UpdateProjectDto): Promise<Project> {
  const response = await apiClient.patch<Project>(`/projects/${id}`, payload);
  return transformProject(response as Project);
}

export async function deleteProject(id: string): Promise<void> {
  await apiClient.delete(`/projects/${id}`);
}
