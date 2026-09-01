import Link from "next/link";
import { prisma } from "@/lib/prisma";

const statusLabels: Record<string, string> = {
  FORESLATT: "Foreslått",
  SENDT_TIL_KUNDE: "Sendt til kunde",
  INTERVJU_BOOKET: "Intervju booket",
  ANSATT: "Ansatt",
  AVSLATT: "Avslått",
};

export default async function AdminOverviewPage() {
  const [candidateCount, activeJobCount, matchCount, recentJobs, recentMatches] =
    await Promise.all([
      prisma.candidate.count(),
      prisma.job.count(),
      prisma.match.count(),
      prisma.job.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { _count: { select: { matches: true } } },
      }),
      prisma.match.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        include: { candidate: true, job: true },
      }),
    ]);

  const stats = [
    { label: "Kandidater", value: candidateCount },
    { label: "Registrerte oppdrag", value: activeJobCount },
    { label: "Matcher gjort", value: matchCount },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Oversikt</h1>
        <p className="mt-1 text-sm text-muted">Status for NordicKrafts kandidater og oppdrag.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border p-5">
            <p className="text-sm text-muted">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Nyeste oppdrag</h2>
            <Link href="/admin/oppdrag" className="text-sm text-accent hover:underline">
              Se alle
            </Link>
          </div>
          {recentJobs.length === 0 ? (
            <p className="text-sm text-muted">Ingen oppdrag registrert ennå.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {recentJobs.map((job) => (
                <li key={job.id} className="py-3">
                  <Link href={`/admin/oppdrag/${job.id}`} className="block hover:text-accent">
                    <p className="font-medium">
                      {job.companyName} · {job.roleType}
                    </p>
                    <p className="text-sm text-muted">
                      {job.location} · {job._count.matches} matcher
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl border border-border p-5">
          <h2 className="mb-3 font-semibold">Siste matcher</h2>
          {recentMatches.length === 0 ? (
            <p className="text-sm text-muted">Ingen matcher gjort ennå.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {recentMatches.map((match) => (
                <li key={match.id} className="py-3">
                  <Link
                    href={`/admin/oppdrag/${match.jobId}`}
                    className="flex items-center justify-between hover:text-accent"
                  >
                    <span>
                      <span className="font-medium">{match.candidate.name}</span>
                      <span className="text-muted"> → {match.job.roleType}</span>
                    </span>
                    <span className="flex items-center gap-2 text-sm text-muted">
                      {match.score}%
                      <span className="rounded-full bg-accent-light px-2 py-0.5 text-xs text-accent">
                        {statusLabels[match.status]}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
