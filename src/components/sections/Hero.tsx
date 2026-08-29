import { motion, useReducedMotion } from "motion/react";
import { Container, LuxLink } from "@/components/ui/lux";
import { SplitLines } from "@/components/motion/Reveal";
import { LazyJewelryViewer } from "@/components/three/LazyViewer";
import { studio } from "@/data/studio";
import heroRing from "@/assets/hero-ring.jpg";
import heroLoop from "@/assets/hero-ring-loop.mp4.asset.json";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="grain vignette relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "var(--gradient-hero)",
        }}
      />

      <div className="absolute inset-x-0 top-[8svh] bottom-[16svh] -z-[5] md:left-auto md:right-0 md:w-[52%]">
        <LazyJewelryViewer
          fallbackImage={heroRing}
          fallbackVideo={heroLoop.url}
          priority
          fallbackAlt="Solitaire diamond ring in antique gold on a dark pedestal"
        />
      </div>

      <Container className="relative z-10">
        <motion.p
          className="label-tech"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          Bambral Studio — From idea to brilliance
        </motion.p>

        <h1 className="display mt-8 text-[clamp(3.2rem,12vw,10.5rem)] text-ivory">
          <SplitLines lines={["Jewelry,", "built in 3D."]} delay={0.3} />
        </h1>

        <div className="mt-10 grid gap-10 md:max-w-md">
          <p className="text-base leading-relaxed text-muted-foreground">
            CAD precision. Photorealistic visualization. Digital experiences for modern jewelry
            brands.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <LuxLink to="/studio" variant="solid">
              Explore the studio
            </LuxLink>
            <LuxLink to="/projects" variant="outline">
              View projects
            </LuxLink>
          </div>
        </div>

        <div className="mt-16 flex items-end justify-between border-t border-hairline pt-6">
          <span className="label-tech">{studio.disciplines.join(" / ")}</span>
          <span className="label-tech">{studio.location}</span>
        </div>
      </Container>
    </section>
  );
}
