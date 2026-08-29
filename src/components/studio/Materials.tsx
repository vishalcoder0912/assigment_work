import { useState } from "react";
import { Container, SectionLabel } from "@/components/ui/lux";
import { LazyJewelryViewer } from "@/components/three/LazyViewer";
import { useMaterials, defaultConfiguration, type MaterialOption } from "@/hooks/useConfigurations";
import { Skeleton } from "@/components/ui/skeleton";
import craftMetal from "@/assets/craft-metal.jpg";
import { cn } from "@/lib/utils";

const descriptions: Record<string, string> = {
  gold: "Warm, high-value and forgiving under studio light. Reads best against dark surroundings.",
  "rose-gold":
    "Copper-alloyed warmth. Reflections skew pink, so surrounding light must stay neutral.",
  platinum: "Dense, cool and almost achromatic. Shows scratches — and shows precision.",
  silver: "Bright and highly reflective. The most demanding metal to light convincingly.",
};

export function Materials() {
  const { data: materials = [], isLoading } = useMaterials();
  const [metal, setMetal] = useState<string>("gold");

  if (isLoading) {
    return (
      <section className="hairline-t py-28 md:py-36">
        <Container>
          <SectionLabel>Material experience</SectionLabel>
          <h2 className="display mt-8 max-w-2xl text-[clamp(2.2rem,5.4vw,4.4rem)] text-ivory">
            Metal is a lighting decision.
          </h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border-t border-hairline py-6">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
            <div className="aspect-square w-full bg-[image:var(--gradient-pedestal)]">
              <div className="flex h-full w-full items-center justify-center">
                <span className="label-tech">Loading materials...</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="hairline-t py-28 md:py-36">
      <Container>
        <SectionLabel>Material experience</SectionLabel>
        <h2 className="display mt-8 max-w-2xl text-[clamp(2.2rem,5.4vw,4.4rem)] text-ivory">
          Metal is a lighting decision.
        </h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <ul>
            {materials.map((item: MaterialOption) => {
              const selected = item.id === metal;
              return (
                <li key={item.id} className="border-t border-hairline">
                  <button
                    type="button"
                    onClick={() => setMetal(item.id)}
                    onMouseEnter={() => setMetal(item.id)}
                    aria-pressed={selected}
                    className="flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-8 rounded-full border transition-all duration-500",
                        selected ? "border-champagne" : "border-transparent",
                      )}
                      style={{ background: item.color }}
                    />
                    <span
                      className={cn(
                        "display text-2xl transition-colors duration-500 md:text-3xl",
                        selected ? "text-ivory" : "text-muted-foreground",
                      )}
                    >
                      {item.name}
                    </span>
                    <span className="ml-auto hidden max-w-xs text-right text-xs text-muted-foreground md:block">
                      {selected ? descriptions[item.id] : ""}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="aspect-square w-full bg-[image:var(--gradient-pedestal)]">
            <LazyJewelryViewer
              configuration={{ ...defaultConfiguration, metal: metal as MaterialOption["id"] }}
              fallbackImage={craftMetal}
              fallbackAlt="Brushed metal surface study"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
