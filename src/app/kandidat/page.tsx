"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { AnimatedButton } from "@/components/motion/AnimatedButton";
import { registerCandidate, type CandidateFormState } from "./actions";

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent";
const labelClass = "text-sm font-medium text-foreground";

const initialState: CandidateFormState = { error: null };

export default function KandidatPage() {
  const [state, formAction, pending] = useActionState(registerCandidate, initialState);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">
          Kandidatregistrering
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Registrer deg som kandidat</h1>
        <p className="mt-3 text-muted">
          Fyll ut skjemaet under, så vurderer vi profilen din opp mot aktuelle oppdrag.
          Det tar under fem minutter.
        </p>

        <form action={formAction} className="mt-8 flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Fullt navn
              <input name="name" required className={inputClass} placeholder="Ola Nordmann" />
            </label>
            <label className={labelClass}>
              E-post
              <input
                name="email"
                type="email"
                required
                className={inputClass}
                placeholder="ola@example.no"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Telefon
              <input name="phone" required className={inputClass} placeholder="912 34 567" />
            </label>
            <label className={labelClass}>
              Sted / by
              <input name="location" required className={inputClass} placeholder="Oslo" />
            </label>
          </div>

          <label className={labelClass}>
            Utdanning / studieretning
            <input
              name="education"
              required
              className={inputClass}
              placeholder="Bachelor i sosialt arbeid, OsloMet"
            />
          </label>

          <label className={labelClass}>
            Ferdigheter
            <textarea
              name="skillsText"
              required
              rows={3}
              className={inputClass}
              placeholder="Beskriv relevante ferdigheter, praksis og erfaring"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Tilgjengelighet
              <select name="availability" required defaultValue="HELTID" className={inputClass}>
                <option value="HELTID">Heltid</option>
                <option value="DELTID">Deltid</option>
                <option value="BEGGE">Fleksibel (heltid eller deltid)</option>
              </select>
            </label>
            <label className={labelClass}>
              Tilgjengelig fra
              <input name="availableFrom" type="date" className={inputClass} />
            </label>
          </div>

          <label className={labelClass}>
            Om meg
            <textarea
              name="aboutMe"
              rows={3}
              className={inputClass}
              placeholder="Noen ord om deg selv (valgfritt)"
            />
          </label>

          <label className={labelClass}>
            Last opp CV (PDF, valgfritt)
            <input
              name="cv"
              type="file"
              accept="application/pdf"
              className={`${inputClass} cursor-pointer file:mr-3 file:rounded file:border-0 file:bg-accent-light file:px-3 file:py-1.5 file:text-accent`}
            />
          </label>

          {state.error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
            >
              {state.error}
            </motion.p>
          )}

          <AnimatedButton
            type="submit"
            disabled={pending}
            className="mt-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
          >
            {pending ? "Sender inn og analyserer profil…" : "Send inn registrering"}
          </AnimatedButton>
        </form>
      </main>
    </div>
  );
}
