import { createFileRoute, notFound } from "@tanstack/react-router";
import { Container, LuxLink, SectionLabel } from "@/components/ui/lux";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import { CTA } from "@/components/sections/CTA";
import { services, type Service } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }: { params: { slug: string } }) => {
    const service = services.find((item) => item.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }: { loaderData?: { service: Service } | undefined }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Service unavailable — Bambral 3D Studio" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} — Bambral 3D Studio` },
        { name: "description", content: service.detail },
        { property: "og:title", content: `${service.title} — Bambral 3D Studio` },
        { property: "og:description", content: service.detail },
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <div className="flex min-h-[70svh] items-center justify-center px-6 text-center">
      <div>
        <h1 className="display text-3xl text-ivory">We don't offer that (yet).</h1>
        <div className="mt-8 flex justify-center">
          <LuxLink to="/services" variant="outline">
            All services
          </LuxLink>
        </div>
      </div>
    </div>
  ),
});

function ServiceDetail() {
  const { service } = Route.useLoaderData() as { service: Service };

  return (
    <>
      <section className="pt-40 pb-16 md:pt-52">
        <Container>
          <SectionLabel>Service {service.index}</SectionLabel>
          <h1 className="display mt-10 text-[clamp(2.6rem,7.5vw,6.4rem)] text-ivory">
            <SplitLines lines={[service.title]} />
          </h1>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1fr]">
            <Reveal className="space-y-6">
              <p className="display text-2xl text-ivory md:text-3xl">{service.summary}</p>
              <p className="text-base leading-relaxed text-muted-foreground">{service.detail}</p>
              <ul className="pt-4">
                {service.deliverables.map((item: string) => (
                  <li
                    key={item}
                    className="flex items-center justify-between border-t border-hairline py-4 text-sm text-ivory"
                  >
                    {item}
                    <span aria-hidden className="text-champagne">
                      ·
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <img
                src={service.image.src}
                alt={service.image.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </Reveal>
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
