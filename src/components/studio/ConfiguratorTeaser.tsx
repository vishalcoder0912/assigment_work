import { Link } from "@tanstack/react-router";
import { Container, SectionLabel, Hairline, Meta } from "@/components/ui/lux";
import { Reveal, SplitLines } from "@/components/motion/Reveal";
import finalRender from "@/assets/final-render.jpg";

/**
 * Editorial invitation into the interactive configurator, which now lives on its
 * own route so the homepage carries a single realtime scene.
 */
export function ConfiguratorTeaser() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <Container>
        <div className="grid gap-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <SectionLabel>The studio</SectionLabel>
            <h2 className="display mt-8 text-[clamp(2rem,4.4vw,3.6rem)] text-ivory">
              <SplitLines lines={["Configure it", "yourself."]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Metal, stone and cut, rendered live. Open the configurator when you want to turn the
                piece in your own hands.
              </p>
              <Link
                to="/configurator"
                className="group mt-10 inline-flex items-center gap-3 text-sm tracking-[0.18em] text-ivory uppercase"
              >
                Enter the configurator
                <span className="h-px w-10 bg-gold transition-all duration-500 group-hover:w-16" />
              </Link>
              <Hairline className="mt-12" />
              <div className="mt-8 grid grid-cols-2 gap-8">
                <Meta label="Metals" value="04" />
                <Meta label="Stone cuts" value="03" />
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <Link to="/configurator" className="group relative block overflow-hidden">
                <img
                  src={finalRender}
                  alt="Photorealistic render of a configured solitaire ring"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "var(--gradient-caption)",
                  }}
                />
                <span className="absolute bottom-6 left-6 text-xs tracking-[0.24em] text-ivory/80 uppercase">
                  Realtime · WebGL
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
