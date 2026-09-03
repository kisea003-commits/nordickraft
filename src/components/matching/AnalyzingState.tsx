"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const CYCLE_MS = 750;

export function AnalyzingState({ candidateNames }: { candidateNames: string[] }) {
  const pool = candidateNames.length > 0 ? candidateNames.slice(0, 10) : ["Kandidat"];
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % pool.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [pool.length, reduceMotion]);

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/15"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="text-base"
          >
            ✦
          </motion.span>
        </div>
      </div>

      <div className="h-12 text-center">
        <p className="text-lg font-medium text-foreground">
          AI vurderer kandidater
          <AnimatedEllipsis />
        </p>
        <div className="mt-1 h-5 text-sm text-muted">
          <AnimatePresence mode="wait">
            <motion.p
              key={pool[current]}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              Vurderer {pool[current]} mot oppdraget…
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col gap-1.5">
        {pool.map((name, i) => {
          const isCurrent = i === current;
          return (
            <motion.div
              key={name}
              animate={{
                backgroundColor: isCurrent ? "var(--accent-light)" : "rgba(0,0,0,0)",
                scale: isCurrent ? 1.02 : 1,
              }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5"
            >
              <motion.div
                animate={{
                  backgroundColor: isCurrent ? "var(--accent)" : "var(--accent-light)",
                  color: isCurrent ? "#ffffff" : "var(--accent)",
                }}
                transition={{ duration: 0.25 }}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
              >
                {initials(name)}
              </motion.div>
              <span
                className={`text-sm transition-colors ${isCurrent ? "font-medium text-foreground" : "text-muted"}`}
              >
                {name}
              </span>
              {isCurrent && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-auto text-xs text-accent"
                >
                  ⟳
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function AnimatedEllipsis() {
  return (
    <span className="inline-flex w-6 justify-start">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}
