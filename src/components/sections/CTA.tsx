import { Container, LuxLink } from "@/components/ui/lux";
import { SplitLines } from "@/components/motion/Reveal";
import { studio } from "@/data/studio";

export function CTA() {
  return (
    <section className="grain hairline-t relative overflow-hidden py-32 md:py-44">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "var(--gradient-cta)",
        }}
      />
      <Container>
        <h2 className="display text-[clamp(2.6rem,8vw,7rem)] text-ivory">
          <SplitLines lines={["Have a piece", "in mind?"]} />
        </h2>
        <p className="mt-10 max-w-lg text-base leading-relaxed text-muted-foreground">
          Let's transform your jewelry concept into a precise digital experience.
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <LuxLink to="/contact" variant="solid">
            Start a project
          </LuxLink>
          <a
            href={studio.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 border border-border px-7 py-4 text-[0.6875rem] uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:border-champagne"
          >
            WhatsApp the studio
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
