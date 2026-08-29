import type { Project, ProjectCategory } from "@/types/domain";
import type { ProjectQueryParams, CreateProjectDto, UpdateProjectDto } from "@/types/api";
import { apiClient } from "./client";

export type { Project, ProjectCategory };
export type ProjectQuery = ProjectQueryParams;

interface BackendProject {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  service: string;
  format: string;
  year: string;
  featured: boolean;
  scale?: string;
  modelUrl?: string;
  createdAt: string;
  updatedAt: string;
}

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

function transformProject(p: BackendProject): Project {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: mapCategory(p.category),
    image: {
      src: p.imageUrl,
      alt: p.imageAlt,
      width: p.imageWidth,
      height: p.imageHeight,
    },
    service: p.service,
    format: p.format,
    year: p.year,
    featured: p.featured,
    scale: p.scale as Project["scale"],
    modelUrl: p.modelUrl,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
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

  const response = await apiClient.get<BackendProject[]>("/projects", params);
  return (response as BackendProject[]).map(transformProject);
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await apiClient.get<BackendProject>(`/projects/${slug}`);
    return transformProject(response as BackendProject);
  } catch (error) {
    const apiError = error as { statusCode?: number };
    if (apiError.statusCode === 404) {
      return null;
    }
    throw error;
  }
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const response = await apiClient.get<BackendProject[]>("/projects", { featured: true, limit: 6 });
  return (response as BackendProject[]).map(transformProject);
}

export async function getRelatedProjects(slug: string, limit = 2): Promise<Project[]> {
  const response = await apiClient.get<BackendProject[]>(`/projects/${slug}/related`, { limit });
  return (response as BackendProject[]).map(transformProject);
}

export async function createProject(payload: CreateProjectDto): Promise<Project> {
  const response = await apiClient.post<BackendProject>("/projects", payload);
  return transformProject(response as BackendProject);
}

export async function updateProject(id: string, payload: UpdateProjectDto): Promise<Project> {
  const response = await apiClient.patch<BackendProject>(`/projects/${id}`, payload);
  return transformProject(response as BackendProject);
}

export async function deleteProject(id: string): Promise<void> {
  await apiClient.delete(`/projects/${id}`);
}
