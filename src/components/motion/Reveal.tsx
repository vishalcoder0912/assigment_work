import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

export function Reveal({ children, className, delay = 0, y = 24, duration = 1 }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

interface SplitLinesProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

/** Editorial line-by-line mask reveal for display headlines. */
export function SplitLines({ lines, className, lineClassName, delay = 0 }: SplitLinesProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span className={cn("block", className)}>
        {lines.map((line, index) => (
          <span key={line + index} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={cn("block", className)}>
      {lines.map((line, index) => (
        <span key={line + index} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={cn("block", lineClassName)}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.3, delay: delay + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
