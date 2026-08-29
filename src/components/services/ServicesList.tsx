import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Container, SectionLabel } from "@/components/ui/lux";
import { services } from "@/data/services";
import { useIsPointerFine } from "@/hooks/use-reduced-motion-pref";

export function ServicesList() {
  const [active, setActive] = useState<number | null>(null);
  const fine = useIsPointerFine();
  const preview = active !== null ? services[active] : null;

  return (
    <section className="hairline-t py-28 md:py-36">
      <Container>
        <SectionLabel>What we create</SectionLabel>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <ul>
            {services.map((service, index) => (
              <li key={service.id} className="border-b border-hairline">
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  data-cursor="view"
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(index)}
                  className="group flex flex-col gap-2 py-7 md:flex-row md:items-baseline md:gap-8"
                >
                  <span className="label-tech md:w-10">{service.index}</span>
                  <span className="display text-[clamp(1.9rem,4.6vw,3.4rem)] text-muted-foreground transition-colors duration-500 group-hover:text-ivory">
                    {service.title}
                  </span>
                  <span className="text-sm text-muted-foreground md:ml-auto md:max-w-[16rem] md:text-right">
                    {service.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {fine ? (
            <div className="relative hidden aspect-3/4 overflow-hidden bg-surface lg:block">
              <AnimatePresence>
                {preview ? (
                  <motion.img
                    key={preview.id}
                    src={preview.image.src}
                    alt={preview.image.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                ) : (
                  <motion.span
                    key="idle"
                    className="label-tech absolute bottom-6 left-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Hover a discipline
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
