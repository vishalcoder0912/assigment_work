import { Container, LuxLink, SectionLabel } from "@/components/ui/lux";
import { useProjects } from "@/hooks/useProjects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectSkeleton } from "./ProjectSkeleton";

export function SelectedWork() {
  const { data: projects = [], isLoading } = useProjects({ limit: 5 });
  const featured = projects.slice(0, 5);

  return (
    <section className="py-28 md:py-36">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <SectionLabel>Selected work</SectionLabel>
            <h2 className="display mt-8 text-[clamp(2.4rem,6vw,5rem)] text-ivory">
              Pieces, in sequence.
            </h2>
          </div>
          <LuxLink to="/projects" variant="ghost">
            All projects
          </LuxLink>
        </div>

        {isLoading && featured.length === 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12">
            {[...Array(4)].map((_, i) => (
              <ProjectSkeleton key={i} scale={i === 0 ? "lg" : "md"} />
            ))}
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12">
            {featured.map((project, index) => (
              <Reveal
                key={project.id}
                delay={index * 0.05}
                className={
                  project.scale === "sm"
                    ? "md:col-span-4"
                    : project.scale === "lg"
                      ? "md:col-span-8"
                      : project.scale === "full"
                        ? "md:col-span-12"
                        : "md:col-span-6"
                }
              >
                <ProjectCard project={project} offset={index === 2} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
