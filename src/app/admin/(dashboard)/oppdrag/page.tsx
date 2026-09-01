import Link from "next/link";
import { prisma } from "@/lib/prisma";

const durationLabels: Record<string, string> = {
  FAST: "Fast",
  VIKARIAT: "Vikariat",
  PROSJEKT: "Prosjekt",
};

export default async function AdminOppdragPage() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { matches: true } } },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Oppdrag</h1>
        <p className="mt-1 text-sm text-muted">{jobs.length} registrerte oppdrag.</p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border bg-accent-light/40 text-left text-muted">
              <th className="px-4 py-3 font-medium">Bedrift</th>
              <th className="px-4 py-3 font-medium">Rolle</th>
              <th className="px-4 py-3 font-medium">Sted</th>
              <th className="px-4 py-3 font-medium">Varighet</th>
              <th className="px-4 py-3 font-medium">Matcher</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <p className="font-medium">{job.companyName}</p>
                  <p className="text-muted">{job.contactName}</p>
                </td>
                <td className="px-4 py-3">{job.roleType}</td>
                <td className="px-4 py-3">{job.location}</td>
                <td className="px-4 py-3">{durationLabels[job.duration]}</td>
                <td className="px-4 py-3">{job._count.matches}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/oppdrag/${job.id}`} className="text-accent hover:underline">
                    Se matcher →
                  </Link>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Ingen oppdrag registrert ennå.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
