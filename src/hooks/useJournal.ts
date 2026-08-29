import { useQuery } from "@tanstack/react-query";
import {
  getJournal,
  getJournalPost,
  getJournalCategories,
  type JournalPost,
  type JournalQueryParams,
  type JournalCategory,
} from "@/lib/api/journal";

export function useJournal(params: JournalQueryParams = {}) {
  return useQuery({
    queryKey: ["journal", params],
    queryFn: () => getJournal(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useJournalPost(slug: string) {
  return useQuery({
    queryKey: ["journal", "post", slug],
    queryFn: () => getJournalPost(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}

export function useJournalCategories() {
  return useQuery({
    queryKey: ["journal", "categories"],
    queryFn: getJournalCategories,
    staleTime: 30 * 60 * 1000,
  });
}

export type { JournalPost, JournalQueryParams, JournalCategory };
