"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MatchingSequence, type MatchingPhase } from "@/components/matching/MatchingSequence";
import { MatchResultCard } from "@/components/matching/MatchResultCard";
import { ConnectButton } from "@/components/matching/ConnectButton";
import { StatusPipeline, STATUS_OPTIONS, type MatchStatusValue } from "@/components/matching/StatusPipeline";
import { rerunMatching, updateMatchStatus, type AdminMatchCardData } from "./actions";

export function JobMatchesPanel({
  jobId,
  schoolName,
  initialMatches,
  candidatePoolNames,
}: {
  jobId: string;
  schoolName: string;
  initialMatches: AdminMatchCardData[];
  candidatePoolNames: string[];
}) {
  const [matches, setMatches] = useState(initialMatches);
  const [phase, setPhase] = useState<MatchingPhase>(initialMatches.length > 0 ? "results" : "idle");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function handleRerun() {
    setError(null);
    setPhase("analyzing");
    startTransition(async () => {
      const res = await rerunMatching(jobId);
      if (res.ok) {
        setMatches(res.matches);
        setPhase("results");
      } else {
        setError(res.error);
        setPhase(matches.length > 0 ? "results" : "idle");
      }
    });
  }

  async function updateStatus(matchId: string, status: MatchStatusValue) {
    const previous = matches;
    setMatches((prev) => prev.map((m) => (m.id === matchId ? { ...m, status } : m)));
    const res = await updateMatchStatus(matchId, jobId, status);
    if (!res.ok) {
      setMatches(previous);
      setError(res.error);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">AI-matchforslag ({matches.length})</h2>
        <motion.button
          onClick={handleRerun}
          disabled={pending && phase === "analyzing"}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-md border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent-light disabled:opacity-60"
        >
          {phase === "analyzing" ? "Analyserer…" : "Kjør AI-matching på nytt"}
        </motion.button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-md bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {phase === "idle" ? (
        <p className="text-sm text-muted">
          Ingen matcher generert ennå. Klikk &quot;Kjør AI-matching på nytt&quot; over.
        </p>
      ) : (
        <MatchingSequence
          phase={phase}
          matches={matches}
          candidatePoolNames={candidatePoolNames}
          renderCard={(match, rank, delay) => (
            <MatchResultCard
              match={match}
              rank={rank}
              delay={delay}
              headerExtra={
                match.cvFileName ? (
                  <a
                    href={`/api/admin/cv/${match.candidateId}`}
                    target="_blank"
                    className="text-xs text-accent hover:underline"
                  >
                    Se CV
                  </a>
                ) : undefined
              }
              footer={
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <StatusPipeline status={match.status} />
                    {match.status !== "AVSLATT" && (
                      <ConnectButton
                        alreadyConnected={match.status !== "FORESLATT"}
                        data={{
                          candidateName: match.name,
                          education: match.education,
                          location: match.location,
                          score: match.score,
                          reasoning: match.reasoning,
                          keySkills: match.keySkills,
                          email: match.email,
                          phone: match.phone,
                          schoolName,
                        }}
                        onConnect={() => updateStatus(match.id, "SENDT_TIL_KUNDE")}
                      />
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <label className="text-xs text-muted" htmlFor={`status-${match.id}`}>
                      Sett status manuelt:
                    </label>
                    <select
                      id={`status-${match.id}`}
                      value={match.status}
                      onChange={(e) => updateStatus(match.id, e.target.value as MatchStatusValue)}
                      className="rounded-md border border-border bg-white px-2 py-1.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              }
            />
          )}
        />
      )}
    </div>
  );
}
