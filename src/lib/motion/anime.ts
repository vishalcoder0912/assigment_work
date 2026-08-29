import { animate, createTimeline, stagger } from "animejs";

/**
 * Animates a numeric counter smoothly from start to target value
 */
export function animateCounter(
  target: { value: number } | HTMLElement,
  endValue: number,
  options: {
    duration?: number;
    easing?: string;
    onUpdate?: (val: number) => void;
  } = {},
) {
  const { duration = 1200, easing = "outExpo", onUpdate } = options;

  if (target instanceof HTMLElement) {
    const obj = { val: parseFloat(target.innerText) || 0 };
    return animate(obj, {
      val: endValue,
      duration,
      ease: easing,
      onUpdate: () => {
        target.innerText = String(Math.round(obj.val));
        onUpdate?.(obj.val);
      },
    });
  }

  return animate(target, {
    value: endValue,
    duration,
    ease: easing,
    onUpdate: () => {
      onUpdate?.(target.value);
    },
  });
}

/**
 * Animates elements with luxury stagger entrance
 */
export function animateStaggerFade(
  targets: HTMLElement[] | NodeListOf<Element> | string,
  options: {
    delay?: number;
    staggerDelay?: number;
    translateY?: number;
    duration?: number;
  } = {},
) {
  const { delay = 0, staggerDelay = 80, translateY = 24, duration = 900 } = options;

  return animate(targets, {
    opacity: [0, 1],
    translateY: [translateY, 0],
    delay: stagger(staggerDelay, { start: delay }),
    duration,
    ease: "outCubic",
  });
}

/**
 * Creates an elegant glow/pulse effect on luxury UI accents
 */
export function animateAccentGlow(
  targets: HTMLElement | string,
  options: {
    scale?: number;
    duration?: number;
  } = {},
) {
  const { scale = 1.05, duration = 1400 } = options;

  return animate(targets, {
    scale: [1, scale, 1],
    opacity: [0.7, 1, 0.7],
    duration,
    ease: "inOutSine",
    loop: true,
  });
}

export { animate, createTimeline, stagger };
