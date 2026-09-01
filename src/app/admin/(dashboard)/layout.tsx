import Link from "next/link";
import { Logo } from "@/components/Logo";
import { logoutAdmin } from "../login/actions";

export const dynamic = "force-dynamic";

const navItems = [
  { href: "/admin", label: "Oversikt" },
  { href: "/admin/kandidater", label: "Kandidater" },
  { href: "/admin/oppdrag", label: "Oppdrag" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden gap-5 text-sm sm:flex">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-foreground/80 hover:text-accent">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground/80 hover:border-accent hover:text-accent"
            >
              Logg ut
            </button>
          </form>
        </div>
        <nav className="flex gap-4 overflow-x-auto border-t border-border px-4 py-2 text-sm sm:hidden">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="whitespace-nowrap text-foreground/80 hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
