import { Search } from "lucide-react";
import type { ProjectCategory } from "@/types/domain";
import { cn } from "@/lib/utils";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "3D Animation",
  "Product Visualization",
  "CAD Design",
  "AR / VR",
  "Diamond",
];

export type CategoryFilter = ProjectCategory | "All";

interface ProjectFilterProps {
  category: CategoryFilter;
  search: string;
  onCategoryChange: (category: CategoryFilter) => void;
  onSearchChange: (search: string) => void;
}

export function ProjectFilter({
  category,
  search,
  onCategoryChange,
  onSearchChange,
}: ProjectFilterProps) {
  const categories: CategoryFilter[] = ["All", ...PROJECT_CATEGORIES];

  return (
    <div className="border-t border-hairline pt-8">
      <label htmlFor="project-search" className="label-tech">
        Search projects
      </label>
      <div className="mt-4 flex items-center gap-3 border-b border-hairline pb-3 focus-within:border-champagne">
        <Search className="size-4 text-muted-foreground" strokeWidth={1.2} aria-hidden />
        <input
          id="project-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by project name..."
          className="w-full bg-transparent text-sm text-ivory placeholder:text-muted-foreground focus:outline-none"
        />
      </div>

      <div
        className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
        role="group"
        aria-label="Filter by category"
      >
        {categories.map((item) => {
          const selected = item === category;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => onCategoryChange(item)}
              className={cn(
                "text-[0.625rem] uppercase tracking-[0.2em] transition-colors duration-500",
                selected ? "text-champagne" : "text-muted-foreground hover:text-ivory",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
