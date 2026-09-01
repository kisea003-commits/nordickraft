import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 font-semibold tracking-tight text-accent ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-white text-sm font-bold">
        NK
      </span>
      <span className="text-lg">NordicKraft</span>
    </Link>
  );
}
