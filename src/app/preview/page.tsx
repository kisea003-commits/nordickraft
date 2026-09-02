"use client";

import { useState, useCallback } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { MatchingSequence, type MatchingPhase } from "@/components/matching/MatchingSequence";
import type { MatchCardData } from "@/components/matching/MatchResultCard";

const MOCK_CANDIDATE_POOL = [
  "Emma Haugland",
  "Markus Berg",
  "Sara Nilsen",
  "Ali Hassan",
  "Ingrid Solberg",
  "Kevin Johansen",
  "Frida Eide",
];

const MOCK_MATCHES: MatchCardData[] = [
  {
    id: "1",
    name: "Emma Haugland",
    education: "Bachelor i sosialt arbeid, OsloMet",
    location: "Oslo",
    score: 97,
    reasoning:
      "Denne kandidaten passer fordi hun har fem års erfaring som miljøterapeut med spisskompetanse på nettopp lavaffektiv tilnærming. Hun er bosatt i Oslo og tilgjengelig heltid.",
    keySkills: ["Miljøterapi", "Lavaffektiv tilnærming", "Krisehåndtering", "Barnevern"],
  },
  {
    id: "2",
    name: "Henrik Moe",
    education: "Bachelor i vernepleie, Høgskulen på Vestlandet",
    location: "Bergen",
    score: 85,
    reasoning:
      "Erfaren vernepleier med spisskompetanse på lavaffektiv tilnærming fra barnevernsinstitusjon. Eneste minus er at han er bosatt i Bergen.",
    keySkills: ["Lavaffektiv tilnærming", "Selvregulering", "Grensesetting"],
  },
  {
    id: "3",
    name: "Frida Eide",
    education: "Master i psykososialt arbeid, OsloMet",
    location: "Oslo",
    score: 78,
    reasoning:
      "Senior miljøterapeut i Oslo med master i psykososialt arbeid og spesialisering i traumebevisst omsorg, som ligger tett opp mot lavaffektiv tilnærming.",
    keySkills: ["Traumebevisst omsorg", "Gruppeledelse", "Psykisk helse"],
  },
  {
    id: "4",
    name: "Markus Berg",
    education: "Bachelor i vernepleie, Universitetet i Bergen",
    location: "Bergen",
    score: 68,
    reasoning:
      "Erfaren vernepleier med miljøterapi, ART og krisehåndtering fra ungdomsbofellesskap, og tilgjengelig heltid. Mangler dokumentert lavaffektiv kompetanse.",
    keySkills: ["Miljøterapi", "ART", "Krisehåndtering"],
  },
  {
    id: "5",
    name: "Ingrid Solberg",
    education: "Bachelor i vernepleie, Høgskolen i Innlandet",
    location: "Lillehammer",
    score: 63,
    reasoning:
      "Erfaren miljøterapeut med sterk relasjonskompetanse og BUP-samarbeid. Erfaringen er primært fra skolesektoren og ikke barnevern.",
    keySkills: ["Individuell oppfølging", "Samarbeid med BUP", "Relasjonsbygging"],
  },
];

export default function PreviewPage() {
  const [phase, setPhase] = useState<MatchingPhase>("idle");

  const run = useCallback(() => {
    setPhase("analyzing");
    setTimeout(() => setPhase("results"), 2600);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">
          Forhåndsvisning (intern)
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">AI-matching-sekvens</h1>
        <p className="mt-3 text-muted">
          Dette er en isolert forhåndsvisning av den nye AI-matching-animasjonen, med
          eksempeldata. Ikke koblet til ekte oppdrag ennå.
        </p>

        <div className="mt-8 flex gap-3">
          <button
            onClick={run}
            disabled={phase === "analyzing"}
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
          >
            {phase === "idle" ? "Kjør AI-matching" : "Spill av på nytt"}
          </button>
          {phase !== "idle" && (
            <button
              onClick={() => setPhase("idle")}
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground/80 hover:border-accent hover:text-accent"
            >
              Nullstill
            </button>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-white/50 p-4 sm:p-6">
          {phase === "idle" ? (
            <p className="py-16 text-center text-sm text-muted">
              Trykk &quot;Kjør AI-matching&quot; for å se sekvensen.
            </p>
          ) : (
            <MatchingSequence
              phase={phase}
              matches={MOCK_MATCHES}
              candidatePoolNames={MOCK_CANDIDATE_POOL}
              heading="Topp 5 kandidater for Sosialrådgiver-oppdraget"
            />
          )}
        </div>
      </main>
    </div>
  );
}
