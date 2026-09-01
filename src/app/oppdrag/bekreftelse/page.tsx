import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function OppdragBekreftelsePage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-2xl text-accent">
          ✓
        </div>
        <h1 className="text-3xl font-semibold tracking-tight">Takk for oppdraget!</h1>
        <p className="mt-3 max-w-md text-muted">
          Vi har mottatt oppdraget og AI-modellen vår har allerede foreslått aktuelle
          kandidater. NordicKraft-teamet kvalitetssikrer forslagene og tar kontakt med deg
          innen kort tid.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
        >
          Tilbake til forsiden
        </Link>
      </main>
    </div>
  );
}
