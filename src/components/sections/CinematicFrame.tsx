import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Container, SectionLabel } from "@/components/ui/lux";
import { SplitLines } from "@/components/motion/Reveal";
import heroRing from "@/assets/hero-ring.jpg";
import heroLoop from "@/assets/hero-ring-loop.mp4.asset.json";

/**
 * A cinematic, GPU-cheap replacement for a live 3D scene: a slow letterboxed
 * film loop with parallax and a light sweep. No WebGL, no draw calls.
 */
export function CinematicFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);
  const captionY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-background py-24 md:py-32">
      <Container>
        <SectionLabel>Reel — 01</SectionLabel>
        <h2 className="display mt-8 max-w-3xl text-[clamp(2.2rem,6vw,5rem)] text-ivory">
          <SplitLines lines={["Light is the", "only material."]} />
        </h2>
      </Container>

      <div className="relative mt-14 h-[62svh] w-full overflow-hidden md:h-[76svh]">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            src={heroLoop.url}
            poster={heroRing}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
        </motion.div>

        {/* letterbox bars */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[9%] bg-background"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[9%] bg-background"
        />

        {/* cinematic grade */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "var(--gradient-cine)",
          }}
        />
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />

        <Container className="pointer-events-none absolute inset-x-0 bottom-[14%]">
          <motion.p
            style={{ y: captionY }}
            className="max-w-sm text-sm leading-relaxed text-muted-foreground"
          >
            Shot inside the same asset pipeline that renders a campaign — one ring, one lamp, and a
            hundred slow degrees of rotation.
          </motion.p>
        </Container>
      </div>
    </section>
  );
}
