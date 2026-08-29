import { Link } from "@tanstack/react-router";
import type { Project } from "@/types/domain";
import { cn } from "@/lib/utils";

const spanClass: Record<NonNullable<Project["scale"]>, string> = {
  sm: "md:col-span-4",
  md: "md:col-span-6",
  lg: "md:col-span-8",
  full: "md:col-span-12",
};

const aspectClass: Record<NonNullable<Project["scale"]>, string> = {
  sm: "aspect-3/4",
  md: "aspect-4/3",
  lg: "aspect-16/10",
  full: "aspect-16/7",
};

export function ProjectCard({ project, offset = false }: { project: Project; offset?: boolean }) {
  const scale = project.scale ?? "md";

  return (
    <article className={cn("col-span-1", spanClass[scale], offset && "md:mt-16")}>
      <Link
        to="/projects/$slug"
        params={{ slug: project.slug }}
        data-cursor="view"
        className="group block"
      >
        <div className={cn("relative overflow-hidden bg-surface", aspectClass[scale])}>
          <img
            src={project.image.src}
            alt={project.image.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-lux group-hover:scale-[1.035]"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: "var(--gradient-caption)",
            }}
          />
        </div>
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3 className="display text-2xl text-ivory md:text-3xl">{project.title}</h3>
          <span className="label-tech shrink-0 transition-colors duration-500 group-hover:text-champagne">
            {project.category}
          </span>
        </div>
      </Link>
    </article>
  );
}
