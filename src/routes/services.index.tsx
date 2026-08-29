import { createFileRoute } from "@tanstack/react-router";
import { Container, SectionLabel } from "@/components/ui/lux";
import { SplitLines } from "@/components/motion/Reveal";
import { ServicesList } from "@/components/services/ServicesList";
import { Pipeline } from "@/components/sections/Pipeline";
import { CTA } from "@/components/sections/CTA";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "What We Create — Bambral 3D Studio" },
      {
        name: "description",
        content:
          "Jewelry CAD, 3D modeling, product visualization, 3D animation and AR/VR services for jewelry brands.",
      },
      { property: "og:title", content: "What We Create — Bambral 3D Studio" },
      {
        property: "og:description",
        content: "Five disciplines, one jewelry pipeline.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="pt-40 pb-8 md:pt-52">
        <Container>
          <SectionLabel>Services</SectionLabel>
          <h1 className="display mt-10 max-w-4xl text-[clamp(2.8rem,8vw,7rem)] text-ivory">
            <SplitLines lines={["What we create."]} />
          </h1>
        </Container>
      </section>
      <ServicesList />
      <Pipeline />
      <CTA />
    </>
  );
}
