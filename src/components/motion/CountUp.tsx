"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, animate } from "framer-motion";

export function CountUp({
  value,
  suffix = "",
  duration = 1.4,
  delay = 0,
  className,
  triggerOnMount = false,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  /** Start counting as soon as this mounts instead of waiting for scroll-into-view.
   * Use for content already gated behind its own reveal animation (e.g. staggered
   * list items) - use scroll-triggering (the default) for below-the-fold content. */
  triggerOnMount?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const scrolledIntoView = useInView(ref, { once: true, margin: "-10% 0px" });
  const inView = triggerOnMount || scrolledIntoView;
  const motionValue = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      motionValue.set(value);
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(motionValue, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration, delay, motionValue, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
