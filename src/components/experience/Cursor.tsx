import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useIsPointerFine } from "@/hooks/use-reduced-motion-pref";

const labels: Record<string, string> = {
  view: "View",
  explore: "Explore",
  drag: "Drag to rotate",
  open: "Open",
};

/** Desktop-only ivory dot cursor with cinematic ambient aura and contextual labels. */
export function Cursor() {
  const fine = useIsPointerFine();
  const reduced = useReducedMotion();
  const [position, setPosition] = useState({ x: -200, y: -200 });
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (!fine || reduced) return;

    const onMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      const key = target?.dataset["cursor"];
      setLabel(key ? (labels[key] ?? null) : target ? "" : null);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  const expanded = label !== null;

  return (
    <>
      {/* Cinematic ambient lighting aura that tracks the mouse */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[40] hidden lg:block opacity-60 transition-opacity duration-700"
        style={{
          transform: `translate3d(${position.x - 200}px, ${position.y - 200}px, 0)`,
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(237, 234, 227, 0.045) 0%, rgba(185, 138, 114, 0.015) 35%, transparent 70%)",
        }}
      />

      {/* Interactive precision cursor dot & lens */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      >
        <div
          className="flex items-center justify-center rounded-full bg-ivory text-[0.5rem] font-medium uppercase tracking-[0.18em] text-primary-foreground shadow-2xl backdrop-blur-xs transition-all duration-300 ease-lux"
          style={{
            width: label ? 88 : expanded ? 28 : 8,
            height: label ? 88 : expanded ? 28 : 8,
            marginLeft: label ? -44 : expanded ? -14 : -4,
            marginTop: label ? -44 : expanded ? -14 : -4,
            opacity: label ? 0.96 : 0.88,
            boxShadow: label
              ? "0 0 35px rgba(237, 234, 227, 0.25)"
              : expanded
                ? "0 0 20px rgba(168, 141, 98, 0.2)"
                : "none",
          }}
        >
          {label}
        </div>
      </div>
    </>
  );
}
