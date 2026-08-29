import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Container, SectionLabel } from "@/components/ui/lux";
import { SplitLines } from "@/components/motion/Reveal";
import heroRing from "@/assets/hero-ring.jpg";
import cadWireframe from "@/assets/cad-wireframe.jpg";
import finalRender from "@/assets/final-render.jpg";
import craftMetal from "@/assets/craft-metal.jpg";
import craftFacets from "@/assets/craft-facets.jpg";
import workEternity from "@/assets/work-eternity.jpg";

const steps = [
  {
    index: "01",
    title: "Discover",
    copy: "We review references, sketches and production intent.",
    image: craftFacets,
  },
  {
    index: "02",
    title: "Define",
    copy: "Scope, format and delivery are agreed before modelling starts.",
    image: craftMetal,
  },
  {
    index: "03",
    title: "Design",
    copy: "Proportion, silhouette and stone layout are resolved.",
    image: cadWireframe,
  },
  {
    index: "04",
    title: "Model",
    copy: "Geometry is built to casting and setting tolerances.",
    image: cadWireframe,
  },
  {
    index: "05",
    title: "Visualize",
    copy: "Studio lighting, materials and final frames.",
    image: finalRender,
  },
  {
    index: "06",
    title: "Deliver",
    copy: "Files, loops and web-ready assets handed over.",
    image: workEternity,
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (value: number) => {
    const next = Math.min(steps.length - 1, Math.floor(value * steps.length));
    setActive(next);
  });

  const current = steps[active] ?? steps[0]!;

  return (
    <section ref={ref} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <img
          src={current.image ?? heroRing}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25 transition-opacity duration-1000"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: "var(--gradient-fade-right)",
          }}
        />
        <Container className="relative flex h-full flex-col justify-center">
          <SectionLabel>Process</SectionLabel>
          <h2 className="display mt-8 text-[clamp(2.3rem,6vw,5.4rem)] text-ivory">
            <SplitLines lines={["From concept", "to creation."]} />
          </h2>

          <ol className="mt-14 max-w-2xl">
            {steps.map((step, index) => {
              const isActive = index === active;
              return (
                <li
                  key={step.index}
                  className="flex items-baseline gap-5 border-t border-hairline py-4 transition-opacity duration-700"
                  style={{ opacity: isActive ? 1 : 0.36 }}
                >
                  <span className={`label-tech ${isActive ? "text-champagne" : ""}`}>
                    {step.index}
                  </span>
                  <span className="display text-2xl text-ivory md:text-3xl">{step.title}</span>
                  <span className="ml-auto hidden max-w-xs text-right text-xs text-muted-foreground md:block">
                    {step.copy}
                  </span>
                </li>
              );
            })}
          </ol>
        </Container>
      </div>
      <div className="h-[240svh]" aria-hidden />
    </section>
  );
}
