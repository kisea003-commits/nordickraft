"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function Typewriter({
  text,
  speed = 14,
  startDelay = 0,
  className,
  onDone,
}: {
  /** Pass a `key` at the call site to restart the animation if this changes. */
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  onDone?: () => void;
}) {
  const [shown, setShown] = useState("");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      if (reduceMotion) {
        setShown(text);
        onDone?.();
        return;
      }

      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, reduceMotion]);

  return (
    <span className={className}>
      {shown}
      {shown.length < text.length && (
        <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-current align-middle h-[1em]" />
      )}
    </span>
  );
}
