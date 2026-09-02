import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/home/Hero";
import { StatsRow } from "@/components/home/StatsRow";
import { CtaCards } from "@/components/home/CtaCards";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />

      <main className="flex flex-1 flex-col">
        <Hero />
        <StatsRow />
        <CtaCards />
      </main>

      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-5xl px-4 text-sm text-muted sm:px-6">
          © {new Date().getFullYear()} NordicKraft. Alle rettigheter reservert.
        </div>
      </footer>
    </div>
  );
}
