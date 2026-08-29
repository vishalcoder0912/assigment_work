import { createFileRoute, notFound } from "@tanstack/react-router";
import { Container, LuxLink, Meta, SectionLabel } from "@/components/ui/lux";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { LazyJewelryViewer } from "@/components/three/LazyViewer";
import { getProject, getRelatedProjects } from "@/lib/api/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/types/domain";
import cadWireframe from "@/assets/cad-wireframe.jpg";
import finalRender from "@/assets/final-render.jpg";

export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }: { params: { slug: string } }) => {
    const [project, related] = await Promise.all([
      getProject(params.slug),
      getRelatedProjects(params.slug, 2),
    ]);

    if (!project) throw notFound();
    return { project, related };
  },
  head: ({ loaderData }: { loaderData?: { project: Project; related: Project[] } | undefined }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Project unavailable — Bambral 3D Studio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { project } = loaderData;
    return {
      meta: [
        { title: `${project.title} — Bambral 3D Studio` },
        { name: "description", content: project.description },
        { property: "og:title", content: `${project.title} — Bambral 3D Studio` },
        { property: "og:description", content: project.description },
      ],
    };
  },
  component: ProjectDetail,
  notFoundComponent: () => (
    <div className="flex min-h-[70svh] items-center justify-center px-6 text-center">
      <div>
        <h1 className="display text-3xl text-ivory">This project isn't in the archive.</h1>
        <div className="mt-8 flex justify-center">
          <LuxLink to="/projects" variant="outline">
            Back to projects
          </LuxLink>
        </div>
      </div>
    </div>
  ),
});

function ProjectDetail() {
  const { project, related } = Route.useLoaderData() as { project: Project; related: Project[] };

  return (
    <article>
      <section className="pt-40 md:pt-52">
        <Container>
          <SectionLabel>{project.category}</SectionLabel>
          <h1 className="display mt-10 text-[clamp(2.6rem,7.5vw,6.4rem)] text-ivory">
            <SplitLines lines={[project.title]} />
          </h1>
        </Container>

        <div className="mt-16 overflow-hidden">
          <img
            src={project.image.src}
            alt={project.image.alt}
            width={project.image.width}
            height={project.image.height}
            className="h-[52svh] w-full object-cover md:h-[78svh]"
          />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <p className="text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="grid grid-cols-2 gap-6">
                <Meta label="Category" value={project.category} />
                <Meta label="Service" value={project.service} />
                <Meta label="Format" value={project.format} />
                <Meta label="Year" value={project.year} />
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="hairline-t hairline-b py-20">
        <Container>
          <SectionLabel>Interactive view</SectionLabel>
          <div className="mt-10 aspect-16/10 w-full bg-[image:var(--gradient-pedestal)]">
            <LazyJewelryViewer fallbackImage={project.image.src} fallbackAlt={project.image.alt} />
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <SectionLabel>Process</SectionLabel>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <img
              src={cadWireframe}
              alt="CAD stage of the project"
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
            <img
              src={finalRender}
              alt="Final render stage of the project"
              loading="lazy"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <section className="hairline-t py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <h2 className="display text-[clamp(1.9rem,4.6vw,3.6rem)] text-ivory">Next pieces</h2>
            <LuxLink to="/contact" variant="outline">
              Start a similar project
            </LuxLink>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {related.map((item: Project) => (
              <ProjectCard key={item.id} project={{ ...item, scale: "md" }} />
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
