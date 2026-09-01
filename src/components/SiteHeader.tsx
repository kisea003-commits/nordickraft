import Link from "next/link";
import { Logo } from "./Logo";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-3 text-sm sm:gap-5">
          <Link href="/kandidat" className="hidden text-foreground/80 hover:text-accent sm:inline">
            Jeg er kandidat
          </Link>
          <Link href="/oppdrag" className="hidden text-foreground/80 hover:text-accent sm:inline">
            Jeg trenger bemanning
          </Link>
          <Link
            href="/admin"
            className="rounded-md border border-border px-3 py-1.5 text-foreground/80 hover:border-accent hover:text-accent"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
