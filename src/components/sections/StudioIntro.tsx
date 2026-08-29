import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Container, SectionLabel } from "@/components/ui/lux";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import craftFacets from "@/assets/craft-facets.jpg";

export function StudioIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="py-32 md:py-44" ref={ref}>
      <Container>
        <SectionLabel>The Studio</SectionLabel>

        <div className="mt-12 grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <h2 className="display text-[clamp(2.6rem,7vw,6.2rem)] text-ivory">
            <SplitLines lines={["Where precision", "meets brilliance."]} />
          </h2>

          <Reveal delay={0.2}>
            <p className="text-base leading-relaxed text-muted-foreground">
              Bambral Studio brings together jewelry CAD, 3D modeling, photorealistic rendering,
              animation and digital product experiences. Every piece begins as intent and ends as a
              file a bench can build from — and an image a brand can sell with.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 overflow-hidden">
          <motion.div style={{ y: reduced ? "0%" : y }} className="relative">
            <img
              src={craftFacets}
              alt="Macro study of diamond facets returning studio light"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-[46svh] w-full object-cover md:h-[72svh]"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
