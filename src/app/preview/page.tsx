"use client";

import { useState, useCallback } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { MatchingSequence, type MatchingPhase } from "@/components/matching/MatchingSequence";
import type { MatchCardData } from "@/components/matching/MatchResultCard";
import { ConnectButton } from "@/components/matching/ConnectButton";
import type { SchoolPreviewData } from "@/components/matching/SchoolPreviewModal";
import { Mascot } from "@/components/Mascot";

const MOCK_CANDIDATE_POOL = [
  "Mohammed Farah",
  "Yasmin Haidari",
  "Ibrahim Nur",
  "Selma Berisha",
  "Fatima Al-Amin",
  "Amara Osei",
  "Leon Dahl",
  "Layla Chaudhry",
  "Emma Haugland",
  "Markus Berg",
];

const MOCK_MATCHES: MatchCardData[] = [
  {
    id: "1",
    name: "Mohammed Farah",
    education: "Bachelor i barnevern, OsloMet",
    location: "Oslo",
    score: 97,
    reasoning:
      "Denne kandidaten passer fordi han har fire års erfaring som miljøarbeider nettopp på Stovner og snakker flytende somali og arabisk – en direkte styrke opp mot skolens flerkulturelle elevgruppe og foreldresamarbeid.",
    keySkills: ["Somali (flytende)", "Arabisk", "Foreldresamarbeid", "Konfliktmegling"],
  },
  {
    id: "2",
    name: "Ibrahim Nur",
    education: "Bachelor i vernepleie, VID vitenskapelige høgskole",
    location: "Oslo",
    score: 88,
    reasoning:
      "Senior miljøterapeut med seks års erfaring fra ungdomsskoler i Oslo øst og somalisk/arabisk språkkompetanse, med solid spesialisering på skolevegring hos gutter – nært beslektet med rollen.",
    keySkills: ["Somali", "Arabisk", "Lavaffektiv tilnærming", "Skolevegring"],
  },
  {
    id: "3",
    name: "Amara Osei",
    education: "Bachelor i barnevern, VID vitenskapelige høgskole",
    location: "Oslo",
    score: 74,
    reasoning:
      "Erfaren miljøarbeider med tre år fra arbeid med enslige mindreårige flyktninger og solid traumebevisst omsorgskompetanse, men mangler somali/arabisk som er nevnt som fordel for denne elevgruppen.",
    keySkills: ["Twi", "Traumebevisst omsorg", "Nettverksarbeid"],
  },
  {
    id: "4",
    name: "Emma Haugland",
    education: "Bachelor i sosialt arbeid, OsloMet",
    location: "Oslo",
    score: 65,
    reasoning:
      "Nyutdannet sosionom med praksis fra barnevernskontor og god samtaleteknikk, men uten spesifikk erfaring fra flerkulturelle miljøer eller relevant språkkompetanse.",
    keySkills: ["Samtaleteknikk", "Konflikthåndtering", "Barnevern"],
  },
  {
    id: "5",
    name: "Leon Dahl",
    education: "Bachelor i psykologi, Universitetet i Oslo",
    location: "Oslo",
    score: 58,
    reasoning:
      "Nyutdannet med praksis fra PPT og god kompetanse på kartlegging av lærevansker, men deltid-tilgjengelighet og manglende miljøarbeidererfaring trekker ned for denne heltidsrollen.",
    keySkills: ["PPT-erfaring", "Kartlegging av lærevansker", "Individuelle samtaler"],
  },
];

const SCHOOL_PREVIEW: SchoolPreviewData = {
  candidateName: MOCK_MATCHES[0].name,
  education: MOCK_MATCHES[0].education,
  location: MOCK_MATCHES[0].location,
  score: MOCK_MATCHES[0].score,
  reasoning: MOCK_MATCHES[0].reasoning,
  keySkills: MOCK_MATCHES[0].keySkills,
  email: "mohammed.farah@example.no",
  phone: "412 90 887",
  schoolName: "Stovner skole",
};

export default function PreviewPage() {
  const [phase, setPhase] = useState<MatchingPhase>("idle");
  const [connected, setConnected] = useState(false);

  const run = useCallback(() => {
    setPhase("analyzing");
    setTimeout(() => setPhase("results"), 3200);
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
          Dette er en isolert forhåndsvisning av den oppgraderte AI-matching-animasjonen
          (sekvensiell &quot;AI vurderer...&quot;-skanning + sirkulær score-indikator), med
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
              heading="Topp 5 kandidater for Miljøarbeider-oppdraget hos Stovner skole"
            />
          )}
        </div>

        <hr className="my-12 border-border" />

        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">
          &quot;Koble sammen&quot;-flyt
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">Send match til skole</h2>
        <p className="mt-3 text-muted">
          Knappen under viser hva som skjer når admin kobler en kandidat til en skole:
          statusen oppdateres, en kort suksess-animasjon vises på knappen, og en
          detaljvisning simulerer hva skolen mottar.
        </p>

        <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-light text-sm font-semibold text-accent">
            MF
          </div>
          <div className="flex-1">
            <p className="font-semibold">Mohammed Farah</p>
            <p className="text-sm text-muted">97% match · Miljøarbeider, Stovner skole</p>
          </div>
          <ConnectButton
            alreadyConnected={connected}
            data={SCHOOL_PREVIEW}
            onConnect={async () => {
              await new Promise((r) => setTimeout(r, 600));
              setConnected(true);
            }}
          />
        </div>

        <hr className="my-12 border-border" />

        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">Maskot</p>
        <h2 className="text-2xl font-semibold tracking-tight">Interaktiv hilsen-maskot</h2>
        <p className="mt-3 text-muted">
          Vinker automatisk ved lasting, vinker på nytt ved hover eller når den scrolles
          inn i synsfeltet, og reagerer med en snakkeboble ved klikk/trykk. Bytt gjerne
          fane bort og tilbake, eller scroll den ut og inn av syne, for å se
          gjeninntreden-vinket.
        </p>
        <div className="mt-6 flex justify-center rounded-xl border border-border bg-white p-10 shadow-sm">
          <Mascot />
        </div>
      </main>
    </div>
  );
}
