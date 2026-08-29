import { useEffect, useState } from "react";

/** True once hydrated on the client. Safe for browser-only rendering. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

export function useIsPointerFine() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(query.matches);
    const onChange = () => setFine(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return fine;
}

export function useWebGLSupported() {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      setSupported(Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl")));
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

/**
 * Client-side reduced-motion preference. Unlike motion's useReducedMotion, this
 * always re-reads matchMedia after hydration, so SSR never leaves it stuck on.
 */
export function useReducedMotionPref() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
