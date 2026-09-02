"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnalyzingState } from "./AnalyzingState";
import { MatchResultCard, type MatchCardData } from "./MatchResultCard";

export type MatchingPhase = "idle" | "analyzing" | "results";

export function MatchingSequence<T extends MatchCardData>({
  phase,
  matches,
  candidatePoolNames,
  heading,
  renderCard,
}: {
  phase: MatchingPhase;
  matches: T[];
  candidatePoolNames: string[];
  heading?: string;
  /** Override the default card render, e.g. to inject admin-only controls. */
  renderCard?: (match: T, rank: number, delay: number) => ReactNode;
}) {
  return (
    <div className="min-h-[240px]">
      <AnimatePresence mode="wait">
        {phase === "analyzing" && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <AnalyzingState candidateNames={candidatePoolNames} />
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {heading && (
              <motion.h3
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-sm font-medium text-muted"
              >
                {heading}
              </motion.h3>
            )}
            <div className="flex flex-col gap-4">
              {matches.map((match, i) =>
                renderCard ? (
                  <div key={match.id}>{renderCard(match, i + 1, i * 0.18)}</div>
                ) : (
                  <MatchResultCard key={match.id} match={match} rank={i + 1} delay={i * 0.18} />
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export type { MatchCardData };
