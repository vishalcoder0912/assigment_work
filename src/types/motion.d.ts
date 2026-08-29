declare module "motion/react" {
  import * as React from "react";

  export const motion: any;
  export const m: any;
  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    mode?: "sync" | "wait" | "popLayout";
    initial?: boolean;
    onExitComplete?: () => void;
    custom?: any;
  }>;
  export function useReducedMotion(): boolean;
  export function useScroll(options?: any): {
    scrollX: any;
    scrollY: any;
    scrollXProgress: any;
    scrollYProgress: any;
  };
  export function useTransform<I, O>(
    value: any,
    input: readonly I[],
    output: readonly O[],
    options?: any,
  ): any;
  export function useMotionValueEvent(
    value: any,
    event: string,
    callback: (latest: any) => void,
  ): void;
}
