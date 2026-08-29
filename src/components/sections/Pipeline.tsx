import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Container, SectionLabel } from "@/components/ui/lux";
import { Reveal } from "@/components/motion/Reveal";
import cadWireframe from "@/assets/cad-wireframe.jpg";
import finalRender from "@/assets/final-render.jpg";
import craftMetal from "@/assets/craft-metal.jpg";
import heroRing from "@/assets/hero-ring.jpg";
import workEternity from "@/assets/work-eternity.jpg";
import craftFacets from "@/assets/craft-facets.jpg";

interface Stage {
  index: string;
  title: string;
  note: string;
  image: { src: string; alt: string };
}

const stages: Stage[] = [
  {
    index: "01",
    title: "Idea",
    note: "Sketch, reference, intent.",
    image: { src: craftFacets, alt: "Diamond facet study" },
  },
  {
    index: "02",
    title: "CAD",
    note: "Parametric geometry and tolerances.",
    image: { src: cadWireframe, alt: "CAD wireframe of a ring" },
  },
  {
    index: "03",
    title: "Model",
    note: "Clean topology, production ready.",
    image: { src: cadWireframe, alt: "Wireframe topology" },
  },
  {
    index: "04",
    title: "Material",
    note: "Metal, finish, surface behaviour.",
    image: { src: craftMetal, alt: "Brushed gold surface" },
  },
  {
    index: "05",
    title: "Light",
    note: "Studio key, rim, contact shadow.",
    image: { src: heroRing, alt: "Studio-lit ring" },
  },
  {
    index: "06",
    title: "Render",
    note: "Photorealistic final frames.",
    image: { src: finalRender, alt: "Photorealistic ring render" },
  },
  {
    index: "07",
    title: "Deliver",
    note: "Files, loops, web-ready assets.",
    image: { src: workEternity, alt: "Finished jewelry set" },
  },
];

export function Pipeline() {
  const [active, setActive] = useState(1);
  const stage = stages[active] ?? stages[0]!;

  return (
    <section className="hairline-t hairline-b py-28 md:py-36">
      <Container>
        <SectionLabel>The digital jewelry pipeline</SectionLabel>

        <div className="mt-14 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ol className="relative">
            <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-hairline" />
            {stages.map((item, index) => {
              const isActive = index === active;
              return (
                <li key={item.index}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    aria-current={isActive}
                    className="group flex w-full items-baseline gap-6 py-4 pl-6 text-left transition-colors duration-500"
                  >
                    <span
                      aria-hidden
                      className={`absolute left-0 h-8 w-px transition-all duration-700 ease-lux ${
                        isActive ? "bg-champagne" : "bg-transparent"
                      }`}
                    />
                    <span className={`label-tech ${isActive ? "text-champagne" : ""}`}>
                      {item.index}
                    </span>
                    <span
                      className={`display text-3xl transition-colors duration-500 md:text-4xl ${
                        isActive ? "text-ivory" : "text-muted-foreground"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`ml-auto hidden text-xs text-muted-foreground transition-opacity duration-500 md:block ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.note}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <Reveal className="relative aspect-4/3 overflow-hidden bg-surface">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={stage.title}
                src={stage.image.src}
                alt={stage.image.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-[var(--scrim-soft)] px-5 py-4 backdrop-blur-sm">
              <span className="label-tech text-champagne">{stage.index}</span>
              <span className="label-tech">{stage.note}</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
