import { createFileRoute } from "@tanstack/react-router";
import { Container, Meta, SectionLabel } from "@/components/ui/lux";
import { SplitLines, Reveal } from "@/components/motion/Reveal";
import { Pipeline } from "@/components/sections/Pipeline";
import { Craft } from "@/components/sections/Craft";
import { CinematicFrame } from "@/components/sections/CinematicFrame";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { studio } from "@/data/studio";
import finalRender from "@/assets/final-render.jpg";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "The Studio — Bambral 3D Studio" },
      {
        name: "description",
        content:
          "Inside Bambral Studio: jewelry CAD, 3D modeling, materials, studio lighting and photorealistic rendering.",
      },
      { property: "og:title", content: "The Studio — Bambral 3D Studio" },
      {
        property: "og:description",
        content: "Where precision meets brilliance — the Bambral jewelry pipeline.",
      },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <>
      <section className="pt-40 pb-24 md:pt-52">
        <Container>
          <SectionLabel>The Studio</SectionLabel>
          <h1 className="display mt-10 text-[clamp(2.8rem,8vw,7rem)] text-ivory">
            <SplitLines lines={["Where precision", "meets brilliance."]} />
          </h1>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1fr_1fr]">
            <Reveal className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                Bambral Studio works at the intersection of jewelry and computation. We model pieces
                that can be cast, and we light them so they can be sold.
              </p>
              <p>
                Every project runs through one pipeline — idea, CAD, model, material, light, render,
                delivery — so the file a manufacturer receives and the image a brand publishes come
                from the same source of truth.
              </p>
              <dl className="grid grid-cols-2 gap-6 pt-6">
                <Meta label="Disciplines" value={studio.disciplines.join(" / ")} />
                <Meta label="Based in" value={studio.location} />
              </dl>
            </Reveal>

            <Reveal delay={0.15} className="overflow-hidden">
              <img
                src={finalRender}
                alt="Photorealistic render of an engraved gold solitaire ring"
                loading="lazy"
                width={1408}
                height={1056}
                className="h-full w-full object-cover"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <Pipeline />
      <Craft />
      <CinematicFrame />
      <Process />
      <CTA />
    </>
  );
}
