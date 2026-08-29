import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bambral-intro-seen";

export function IntroLoader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setVisible(true);
    const timer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
    }, 2300);
    return () => window.clearTimeout(timer);
  }, [reduced]);

  const skip = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="grain fixed inset-0 z-[90] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="display text-[clamp(2.5rem,9vw,6rem)] text-ivory"
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            BAMBRAL
          </motion.span>

          <motion.span
            aria-hidden
            className="mt-6 h-px bg-gold"
            initial={{ width: 0 }}
            animate={{ width: "min(280px, 42vw)" }}
            transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.span
            className="label-tech mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            3D / CAD / Visualization
          </motion.span>

          <button
            type="button"
            onClick={skip}
            className="label-tech absolute bottom-10 transition-colors hover:text-ivory"
          >
            Skip intro
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
