import type { JournalPost, JournalCategory } from "@/types/domain";
import type { JournalQueryParams } from "@/types/api";
import { apiClient } from "./client";

export type { JournalPost, JournalCategory, JournalQueryParams };

function mapCategory(category: string): JournalCategory {
  const map: Record<string, JournalCategory> = {
    CAD: "CAD",
    MARKETING: "Marketing",
    MANUFACTURING: "Manufacturing",
    THREE_D: "3D",
    TECHNOLOGY: "Technology",
  };
  return map[category] || "CAD";
}

function transformPost(post: JournalPost): JournalPost {
  return {
    ...post,
    category: mapCategory(post.category),
  };
}

export async function getJournal(params: JournalQueryParams = {}): Promise<JournalPost[]> {
  const queryParams: Record<string, string | number | boolean | undefined> = {
    category: params.category === "All" ? undefined : params.category,
    search: params.search?.trim() ? params.search.trim() : undefined,
    page: params.page,
    limit: params.limit,
  };

  const response = await apiClient.get<JournalPost[]>("/journal", queryParams);
  return (response as JournalPost[]).map(transformPost);
}

export async function getJournalPost(slug: string): Promise<JournalPost | null> {
  try {
    const response = await apiClient.get<JournalPost>(`/journal/${slug}`);
    return transformPost(response as JournalPost);
  } catch (error) {
    const apiError = error as { statusCode?: number };
    if (apiError.statusCode === 404) {
      return null;
    }
    throw error;
  }
}

export async function getJournalCategories(): Promise<JournalCategory[]> {
  const response =
    await apiClient.get<{ category: JournalCategory; count: number }[]>("/journal/categories");
  return (response as { category: JournalCategory; count: number }[]).map((c) => c.category);
}
