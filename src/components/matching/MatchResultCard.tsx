"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { CircularScore } from "@/components/motion/CircularScore";
import { Typewriter } from "@/components/motion/Typewriter";

export interface MatchCardData {
  id: string;
  name: string;
  education: string;
  location: string;
  score: number;
  reasoning: string;
  keySkills: string[];
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function MatchResultCard({
  match,
  rank,
  delay,
  headerExtra,
  footer,
}: {
  match: MatchCardData;
  rank: number;
  delay: number;
  /** Rendered next to the score, e.g. a "Se CV" link. */
  headerExtra?: ReactNode;
  /** Rendered below the skill tags, e.g. an admin status control. */
  footer?: ReactNode;
}) {
  const isTop = rank === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className={`relative overflow-hidden rounded-xl border p-5 shadow-sm transition-shadow ${
        isTop
          ? "border-gold/50 bg-gradient-to-br from-gold-light/60 via-white to-white shadow-[0_0_0_1px_rgba(184,135,43,0.15),0_8px_30px_-8px_rgba(184,135,43,0.35)]"
          : "border-border bg-white hover:shadow-md"
      }`}
    >
      {isTop && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: delay + 0.35, type: "spring", stiffness: 260, damping: 16 }}
          className="mb-3 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white shadow"
        >
          ★ Beste match
        </motion.div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
              isTop ? "bg-gold text-white" : "bg-accent-light text-accent"
            }`}
          >
            {initials(match.name)}
          </div>
          <div>
            <p className="font-semibold">{match.name}</p>
            <p className="text-sm text-muted">
              {match.education} · {match.location}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <CircularScore
            value={match.score}
            delay={delay + 0.15}
            duration={1.1}
            color={isTop ? "var(--gold)" : "var(--accent)"}
          />
          <span className="text-xs text-muted">match</span>
          {headerExtra}
        </div>
      </div>

      <p className="mt-3 min-h-[3em] text-sm text-foreground/90">
        <Typewriter text={match.reasoning} startDelay={delay * 1000 + 500} speed={10} />
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {match.keySkills.slice(0, 5).map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 + i * 0.05 }}
            className={`rounded-full border px-2 py-0.5 text-xs ${
              isTop ? "border-gold/30 text-gold" : "border-border text-muted"
            }`}
          >
            {skill}
          </motion.span>
        ))}
      </div>

      {footer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.6 }}
          className="mt-4 border-t border-border pt-3"
        >
          {footer}
        </motion.div>
      )}
    </motion.div>
  );
}
