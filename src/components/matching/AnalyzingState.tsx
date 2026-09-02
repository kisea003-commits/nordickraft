"use client";

import { motion } from "framer-motion";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AnalyzingState({ candidateNames }: { candidateNames: string[] }) {
  const row = candidateNames.length > 0 ? candidateNames : ["Kandidat"];

  return (
    <div className="flex flex-col items-center gap-8 py-16">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full bg-accent/15"
          animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full bg-accent/25"
          animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0.1, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/30">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="text-lg"
          >
            ✦
          </motion.span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-lg font-medium text-foreground">
          AI analyserer kandidater
          <AnimatedEllipsis />
        </p>
        <p className="mt-1 text-sm text-muted">
          Vurderer utdanning, ferdigheter, sted og tilgjengelighet mot oppdraget
        </p>
      </div>

      <div className="relative w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-center gap-3">
          {row.slice(0, 7).map((name, i) => (
            <motion.div
              key={`${name}-${i}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-white text-xs font-semibold text-muted shadow-sm"
              animate={{
                scale: [1, 1.18, 1],
                boxShadow: [
                  "0 0 0 0 rgba(11,61,46,0)",
                  "0 0 0 6px rgba(11,61,46,0.12)",
                  "0 0 0 0 rgba(11,61,46,0)",
                ],
                color: ["#667066", "#0b3d2e", "#667066"],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.18,
              }}
            >
              {initials(name)}
            </motion.div>
          ))}
        </div>
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
