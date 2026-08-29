import { useCallback, useRef, useState } from "react";
import { Container, SectionLabel } from "@/components/ui/lux";
import { SplitLines } from "@/components/motion/Reveal";
import cadWireframe from "@/assets/cad-wireframe.jpg";
import finalRender from "@/assets/final-render.jpg";

export function ComparisonSlider() {
  const [value, setValue] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <section className="py-28 md:py-40">
      <Container>
        <SectionLabel>CAD vs final render</SectionLabel>

        <h2 className="display mt-10 max-w-3xl text-[clamp(2.4rem,6.4vw,5.6rem)] text-ivory">
          <SplitLines lines={["From wireframe", "to brilliance."]} />
        </h2>

        <div
          ref={frame}
          data-cursor="drag"
          className="relative mt-14 aspect-16/10 w-full touch-none select-none overflow-hidden bg-surface"
          onPointerDown={(event) => {
            dragging.current = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            update(event.clientX);
          }}
          onPointerMove={(event) => dragging.current && update(event.clientX)}
          onPointerUp={() => (dragging.current = false)}
        >
          <img
            src={finalRender}
            alt="Final photorealistic render of the ring"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
          >
            <img
              src={cadWireframe}
              alt="CAD wireframe of the same ring"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <div
            aria-hidden
            className="absolute inset-y-0 w-px bg-champagne"
            style={{ left: `${value}%` }}
          >
            <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne bg-[var(--scrim-soft)] text-champagne backdrop-blur-sm">
              ↔
            </span>
          </div>

          <span className="label-tech absolute left-5 top-5">CAD</span>
          <span className="label-tech absolute right-5 top-5">Render</span>

          <label className="sr-only" htmlFor="comparison-range">
            Reveal the final render
          </label>
          <input
            id="comparison-range"
            type="range"
            min={0}
            max={100}
            value={Math.round(value)}
            onChange={(event) => setValue(Number(event.target.value))}
            className="absolute bottom-4 left-1/2 w-2/3 -translate-x-1/2 accent-champagne opacity-0 focus-visible:opacity-100"
          />
        </div>

        <p className="mt-6 max-w-xl text-sm text-muted-foreground">
          Drag to move between the production CAD geometry and the finished render. Both views come
          from the same model.
        </p>
      </Container>
    </section>
  );
}
