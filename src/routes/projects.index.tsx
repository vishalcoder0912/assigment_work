import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { Container, SectionLabel } from "@/components/ui/lux";
import { SplitLines } from "@/components/motion/Reveal";
import { ProjectFilter, type CategoryFilter } from "@/components/projects/ProjectFilter";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { CTA } from "@/components/sections/CTA";
import { ProjectSkeleton } from "@/components/projects/ProjectSkeleton";
import { useProjects, type ProjectQuery } from "@/hooks/useProjects";
import { useDebounce } from "@/hooks/useDebounce";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Selected Work — Bambral 3D Studio" },
      {
        name: "description",
        content:
          "Jewelry CAD, product visualization, 3D animation and AR/VR projects from Bambral 3D Studio.",
      },
      { property: "og:title", content: "Selected Work — Bambral 3D Studio" },
      {
        property: "og:description",
        content: "An editorial archive of jewelry CAD and visualization projects.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const query: ProjectQuery = {
    category: category === "All" ? undefined : category,
    search: debouncedSearch || undefined,
  };

  const { data: projects = [], isLoading, isError, refetch } = useProjects(query);

  const handleReset = useCallback(() => {
    setCategory("All");
    setSearch("");
  }, []);

  if (isLoading && projects.length === 0) {
    return (
      <>
        <section className="pt-40 pb-20 md:pt-52">
          <Container>
            <SectionLabel>Archive</SectionLabel>
            <h1 className="display mt-10 text-[clamp(2.8rem,8vw,7rem)] text-ivory">
              <SplitLines lines={["Selected work."]} />
            </h1>
            <div className="mt-16">
              <ProjectFilter
                category={category}
                search={search}
                onCategoryChange={setCategory}
                onSearchChange={setSearch}
              />
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12">
              {[...Array(6)].map((_, i) => (
                <ProjectSkeleton key={i} scale="md" />
              ))}
            </div>
          </Container>
        </section>
        <CTA />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <section className="pt-40 pb-20 md:pt-52">
          <Container>
            <SectionLabel>Archive</SectionLabel>
            <h1 className="display mt-10 text-[clamp(2.8rem,8vw,7rem)] text-ivory">
              <SplitLines lines={["Selected work."]} />
            </h1>
            <div className="mt-16">
              <ProjectFilter
                category={category}
                search={search}
                onCategoryChange={setCategory}
                onSearchChange={setSearch}
              />
            </div>
            <div className="mt-10 text-center py-20 border-t border-hairline">
              <p className="text-muted-foreground">Studio services are temporarily unavailable.</p>
              <button
                onClick={() => refetch()}
                className="mt-4 text-champagne hover:text-ivory underline cursor-pointer"
              >
                Retry
              </button>
            </div>
          </Container>
        </section>
        <CTA />
      </>
    );
  }

  return (
    <>
      <section className="pt-40 pb-20 md:pt-52">
        <Container>
          <SectionLabel>Archive</SectionLabel>
          <h1 className="display mt-10 text-[clamp(2.8rem,8vw,7rem)] text-ivory">
            <SplitLines lines={["Selected work."]} />
          </h1>

          <div className="mt-16">
            <ProjectFilter
              category={category}
              search={search}
              onCategoryChange={setCategory}
              onSearchChange={setSearch}
            />
          </div>

          <p className="label-tech mt-8">
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </p>

          <div className="mt-10">
            <ProjectGrid projects={projects} onReset={handleReset} />
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
