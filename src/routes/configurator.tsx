import { createFileRoute } from "@tanstack/react-router";
import { Container, SectionLabel } from "@/components/ui/lux";
import { SplitLines } from "@/components/motion/Reveal";
import { JewelryConfigurator } from "@/components/studio/JewelryConfigurator";
import { Materials } from "@/components/studio/Materials";
import { CTA } from "@/components/sections/CTA";

export const Route = createFileRoute("/configurator")({
  head: () => ({
    meta: [
      { title: "Design Your Ring — Bambral 3D Studio" },
      {
        name: "description",
        content:
          "Configure metal, gemstone, cut and finish in a real-time 3D jewelry viewer built by Bambral 3D Studio.",
      },
      { property: "og:title", content: "Design Your Ring — Bambral 3D Studio" },
      {
        property: "og:description",
        content: "A real-time jewelry configurator: metal, gemstone, cut, finish.",
      },
    ],
  }),
  component: ConfiguratorPage,
});

function ConfiguratorPage() {
  return (
    <>
      <section className="pt-40 pb-4 md:pt-52">
        <Container>
          <SectionLabel>Configurator</SectionLabel>
          <h1 className="display mt-10 text-[clamp(2.8rem,8vw,7rem)] text-ivory">
            <SplitLines lines={["Design your ring."]} />
          </h1>
        </Container>
      </section>
      <JewelryConfigurator compact />
      <Materials />
      <CTA />
    </>
  );
}
