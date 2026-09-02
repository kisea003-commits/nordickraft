"use client";

import { motion } from "framer-motion";

export type MatchStatusValue =
  | "FORESLATT"
  | "SENDT_TIL_KUNDE"
  | "INTERVJU_BOOKET"
  | "ANSATT"
  | "AVSLATT";

const PIPELINE_STEPS: { value: MatchStatusValue; label: string }[] = [
  { value: "FORESLATT", label: "Foreslått" },
  { value: "SENDT_TIL_KUNDE", label: "Sendt til kunde" },
  { value: "INTERVJU_BOOKET", label: "Intervju booket" },
  { value: "ANSATT", label: "Ansatt" },
];

export const STATUS_OPTIONS: { value: MatchStatusValue; label: string }[] = [
  ...PIPELINE_STEPS,
  { value: "AVSLATT", label: "Avslått" },
];

export function StatusPipeline({ status }: { status: MatchStatusValue }) {
  if (status === "AVSLATT") {
    return (
      <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs text-red-600">
          ✕
        </span>
        <span className="text-sm font-medium text-red-600">Avslått</span>
      </div>
    );
  }

  const currentIndex = PIPELINE_STEPS.findIndex((s) => s.value === status);

  return (
    <div className="flex items-center">
      {PIPELINE_STEPS.map((step, i) => {
        const isDone = i < currentIndex;
        const isCurrent = i === currentIndex;
        const isFuture = i > currentIndex;

        return (
          <div key={step.value} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.15 : 1,
                  backgroundColor: isFuture ? "#ffffff" : "var(--accent)",
                  borderColor: isFuture ? "var(--border)" : "var(--accent)",
                }}
                transition={{ duration: 0.3 }}
                className="flex h-5 w-5 items-center justify-center rounded-full border-2 text-[10px] font-bold text-white"
              >
                {isDone && "✓"}
              </motion.div>
              <span
                className={`w-20 text-center text-[11px] leading-tight ${
                  isCurrent ? "font-semibold text-accent" : "text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < PIPELINE_STEPS.length - 1 && (
              <motion.div
                initial={false}
                animate={{ backgroundColor: isDone ? "var(--accent)" : "var(--border)" }}
                transition={{ duration: 0.3 }}
                className="mb-4 h-0.5 w-6 sm:w-10"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
