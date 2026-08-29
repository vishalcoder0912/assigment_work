import { useState } from "react";
import { Container, SectionLabel } from "@/components/ui/lux";
import { Reveal } from "@/components/motion/Reveal";
import craftFacets from "@/assets/craft-facets.jpg";
import craftMetal from "@/assets/craft-metal.jpg";
import cadWireframe from "@/assets/cad-wireframe.jpg";
import workEternity from "@/assets/work-eternity.jpg";

const details = [
  {
    src: craftFacets,
    alt: "Diamond facets catching studio light",
    caption: "Facet geometry",
    span: "row-span-2",
  },
  {
    src: craftMetal,
    alt: "Brushed antique gold surface detail",
    caption: "Surface finish",
    span: "",
  },
  { src: cadWireframe, alt: "CAD topology of a jewelry model", caption: "CAD topology", span: "" },
  {
    src: workEternity,
    alt: "Pavé setting detail on an eternity band",
    caption: "Setting detail",
    span: "md:col-span-2",
  },
];

export function Craft() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-36">
      <Container>
        <SectionLabel>Craft</SectionLabel>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="display max-w-2xl text-[clamp(2.2rem,5.4vw,4.6rem)] text-ivory">
            Detail examined at millimetre scale.
          </h2>
          <span className="label-tech">Click to enlarge</span>
        </div>

        <div className="mt-14 grid auto-rows-[minmax(180px,26svh)] grid-cols-2 gap-3 md:grid-cols-3">
          {details.map((item, index) => (
            <Reveal
              key={item.caption}
              delay={index * 0.08}
              className={`group relative overflow-hidden ${item.span}`}
            >
              <button
                type="button"
                data-cursor="explore"
                onClick={() => setOpen(index)}
                className="h-full w-full"
                aria-label={`Enlarge ${item.caption}`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-lux group-hover:scale-[1.04]"
                />
                <span className="label-tech absolute bottom-4 left-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {item.caption}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={details[open]?.caption}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[var(--scrim-strong)] p-6"
          onClick={() => setOpen(null)}
        >
          <img
            src={details[open]?.src}
            alt={details[open]?.alt ?? ""}
            className="max-h-[86svh] max-w-full object-contain"
          />
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="label-tech absolute right-6 top-6 hover:text-ivory"
          >
            Close
          </button>
        </div>
      ) : null}
    </section>
  );
}
