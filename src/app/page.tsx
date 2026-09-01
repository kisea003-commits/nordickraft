import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-accent">
            Bemanning med presisjon
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Vi matcher rett kandidat med rett oppdrag – raskt, og med AI som medhjelper.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            NordicKraft kobler kvalifiserte kandidater, som sosialrådgivere og
            miljøarbeidere, med skoler og virksomheter som trenger dem. Registrer
            deg på under fem minutter.
          </p>
        </section>

        <section className="mx-auto grid w-full max-w-5xl gap-4 px-4 pb-20 sm:grid-cols-3 sm:px-6">
          <Link
            href="/kandidat"
            className="group flex flex-col justify-between rounded-xl border border-border p-6 transition-colors hover:border-accent"
          >
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-accent">
                👤
              </div>
              <h2 className="text-lg font-semibold">Jeg er kandidat</h2>
              <p className="mt-2 text-sm text-muted">
                Registrer din profil og bli synlig for relevante oppdrag.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-accent">
              Registrer deg som kandidat →
            </span>
          </Link>

          <Link
            href="/oppdrag"
            className="group flex flex-col justify-between rounded-xl border border-border p-6 transition-colors hover:border-accent"
          >
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-accent">
                🏫
              </div>
              <h2 className="text-lg font-semibold">Jeg trenger bemanning</h2>
              <p className="mt-2 text-sm text-muted">
                Beskriv oppdraget ditt, og få forslag til kvalifiserte kandidater.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-accent">
              Registrer et oppdrag →
            </span>
          </Link>

          <Link
            href="/admin"
            className="group flex flex-col justify-between rounded-xl border border-border p-6 transition-colors hover:border-accent"
          >
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-accent">
                🔐
              </div>
              <h2 className="text-lg font-semibold">Admin-innlogging</h2>
              <p className="mt-2 text-sm text-muted">
                For NordicKrafts team: se kandidater, oppdrag og AI-matcher.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-accent">
              Logg inn →
            </span>
          </Link>
        </section>
      </main>

      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-5xl px-4 text-sm text-muted sm:px-6">
          © {new Date().getFullYear()} NordicKraft. Alle rettigheter reservert.
        </div>
      </footer>
    </div>
  );
}
