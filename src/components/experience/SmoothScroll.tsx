import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotionPref } from "@/hooks/use-reduced-motion-pref";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reduced = useReducedMotionPref();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || reduced) {
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      infinite: false,
    });

    setLenis(instance);

    function onRaf(time: number) {
      instance.raf(time);
      rafRef.current = requestAnimationFrame(onRaf);
    }

    rafRef.current = requestAnimationFrame(onRaf);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
