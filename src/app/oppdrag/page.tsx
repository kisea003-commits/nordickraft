"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { AnimatedButton } from "@/components/motion/AnimatedButton";
import { registerJob, type JobFormState } from "./actions";

const inputClass =
  "mt-1 w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent";
const labelClass = "text-sm font-medium text-foreground";

const initialState: JobFormState = { error: null };

export default function OppdragPage() {
  const [state, formAction, pending] = useActionState(registerJob, initialState);

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-accent">
          Oppdragsregistrering
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Registrer et oppdrag</h1>
        <p className="mt-3 text-muted">
          Fortell oss hva dere trenger, så finner vi kvalifiserte kandidater til dere.
        </p>

        <form action={formAction} className="mt-8 flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Bedrift / skole
              <input
                name="companyName"
                required
                className={inputClass}
                placeholder="Nordbygda ungdomsskole"
              />
            </label>
            <label className={labelClass}>
              Kontaktperson
              <input name="contactName" required className={inputClass} placeholder="Kari Andersen" />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              E-post
              <input
                name="contactEmail"
                type="email"
                required
                className={inputClass}
                placeholder="kari@skole.no"
              />
            </label>
            <label className={labelClass}>
              Sted
              <input name="location" required className={inputClass} placeholder="Oslo" />
            </label>
          </div>

          <label className={labelClass}>
            Type rolle som trengs
            <input
              name="roleType"
              required
              className={inputClass}
              placeholder="Sosialrådgiver"
            />
          </label>

          <label className={labelClass}>
            Beskrivelse av oppdraget
            <textarea
              name="description"
              required
              rows={4}
              className={inputClass}
              placeholder="Beskriv oppgaver, ansvar og hva dere ser etter hos kandidaten"
            />
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Ønsket oppstart
              <input name="desiredStart" type="date" className={inputClass} />
            </label>
            <label className={labelClass}>
              Varighet
              <select name="duration" required defaultValue="VIKARIAT" className={inputClass}>
                <option value="FAST">Fast stilling</option>
                <option value="VIKARIAT">Vikariat</option>
                <option value="PROSJEKT">Prosjekt</option>
              </select>
            </label>
          </div>

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
            {pending ? "Sender inn og finner kandidater…" : "Send inn oppdrag"}
          </AnimatedButton>
        </form>
      </main>
    </div>
  );
}
