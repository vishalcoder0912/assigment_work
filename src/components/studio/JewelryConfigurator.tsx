import { useState } from "react";
import { toast } from "sonner";
import { Container, LuxButton, SectionLabel } from "@/components/ui/lux";
import { LazyJewelryViewer } from "@/components/three/LazyViewer";
import {
  useMaterials,
  useGemstones,
  useCuts,
  useFinishes,
  useSaveConfiguration,
  type RingConfiguration,
  defaultConfiguration,
} from "@/hooks/useConfigurations";
import { Skeleton } from "@/components/ui/skeleton";
import heroRing from "@/assets/hero-ring.jpg";
import { cn } from "@/lib/utils";

interface OptionRowProps {
  label: string;
  options: ReadonlyArray<{ id: string; label: string; color?: string | undefined }>;
  value: string;
  onChange: (value: string) => void;
}

function OptionRow({ label, options, value, onChange }: OptionRowProps) {
  return (
    <fieldset className="border-t border-hairline py-6">
      <legend className="label-tech mb-5">{label}</legend>
      <div className="flex flex-wrap gap-x-7 gap-y-4">
        {options.map((option) => {
          const selected = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.id)}
              className="group flex items-center gap-3 text-left"
            >
              <span
                aria-hidden
                className={cn(
                  "relative flex size-4 items-center justify-center rounded-full border transition-all duration-500 ease-lux",
                  selected
                    ? "border-champagne"
                    : "border-border group-hover:border-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "block rounded-full transition-all duration-500 ease-lux",
                    selected ? "size-2" : "size-1.5 opacity-60",
                  )}
                  style={{ background: option.color ?? "var(--color-champagne)" }}
                />
              </span>
              <span
                className={cn(
                  "text-[0.6875rem] uppercase tracking-[0.18em] transition-colors duration-500",
                  selected ? "text-ivory" : "text-muted-foreground group-hover:text-ivory",
                )}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function JewelryConfigurator({ compact = false }: { compact?: boolean }) {
  const { data: materials = [], isLoading: materialsLoading } = useMaterials();
  const { data: gemstones = [], isLoading: gemstonesLoading } = useGemstones();
  const { data: cuts = [], isLoading: cutsLoading } = useCuts();
  const { data: finishes = [], isLoading: finishesLoading } = useFinishes();
  const saveMutation = useSaveConfiguration();

  const [configuration, setConfiguration] = useState<RingConfiguration>(defaultConfiguration);

  const isLoading = materialsLoading || gemstonesLoading || cutsLoading || finishesLoading;
  const isSaving = saveMutation.isPending;

  const update =
    <K extends keyof RingConfiguration>(key: K) =>
    (value: string) =>
      setConfiguration((current: RingConfiguration) => ({ ...current, [key]: value }));

  const onSave = async () => {
    try {
      const saved = await saveMutation.mutateAsync(configuration);
      toast.success("Design saved", { description: `Reference ${saved.reference}` });
    } catch {
      toast.error("We couldn't save this design", { description: "Please try again." });
    }
  };

  if (isLoading) {
    return (
      <section className={cn("hairline-t", compact ? "py-20" : "py-28 md:py-36")}>
        <Container>
          <SectionLabel>The configurator</SectionLabel>
          <h2 className="display mt-8 text-[clamp(2.4rem,6vw,5rem)] text-ivory">
            Design your ring
          </h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative aspect-square w-full bg-[image:var(--gradient-pedestal)] lg:aspect-auto lg:min-h-[68svh]">
              <div className="flex h-full w-full items-center justify-center">
                <span className="label-tech">Loading studio...</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="border-t border-hairline py-6">
                <span className="label-tech mb-5 block">Loading materials...</span>
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="border-t border-hairline py-6">
                <span className="label-tech mb-5 block">Loading gemstones...</span>
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="border-t border-hairline py-6">
                <span className="label-tech mb-5 block">Loading cuts...</span>
                <Skeleton className="h-8 w-full" />
              </div>
              <div className="border-t border-hairline py-6">
                <span className="label-tech mb-5 block">Loading finishes...</span>
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const metalOptions = materials.map((m) => ({
    id: m.id,
    label: m.label || m.name,
    color: m.color,
  }));
  const gemstoneOptions = gemstones.map((g) => ({
    id: g.id,
    label: g.label || g.name,
    color: g.color,
  }));
  const cutOptions = cuts.map((c) => ({ id: c.id, label: c.label }));
  const finishOptions = finishes.map((f) => ({ id: f.id, label: f.label }));

  return (
    <section className={cn("hairline-t", compact ? "py-20" : "py-28 md:py-36")}>
      <Container>
        <SectionLabel>The configurator</SectionLabel>
        <h2 className="display mt-8 text-[clamp(2.4rem,6vw,5rem)] text-ivory">Design your ring</h2>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative aspect-square w-full bg-[image:var(--gradient-pedestal)] lg:aspect-auto lg:min-h-[68svh]">
            <LazyJewelryViewer
              configuration={configuration}
              cameraDistance={configuration.gemstone === "diamond" ? 4.1 : 3.7}
              fallbackImage={heroRing}
              fallbackAlt="Configured solitaire ring"
            />
            <span className="label-tech absolute bottom-4 left-4">Drag to rotate</span>
          </div>

          <div>
            <OptionRow
              label="Metal"
              options={metalOptions}
              value={configuration.metal}
              onChange={update("metal")}
            />
            <OptionRow
              label="Gemstone"
              options={gemstoneOptions}
              value={configuration.gemstone}
              onChange={update("gemstone")}
            />
            <OptionRow
              label="Cut"
              options={cutOptions}
              value={configuration.cut}
              onChange={update("cut")}
            />
            <OptionRow
              label="Finish"
              options={finishOptions}
              value={configuration.finish}
              onChange={update("finish")}
            />

            <div className="mt-8 flex flex-wrap gap-4">
              <LuxButton variant="solid" onClick={onSave} disabled={isSaving}>
                {isSaving ? "Saving" : "Save design"}
              </LuxButton>
              <LuxButton
                variant="outline"
                onClick={() =>
                  toast("Inquiry ready", {
                    description: "Send this configuration from the contact page.",
                  })
                }
              >
                Request this design
              </LuxButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
