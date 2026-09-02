import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/serialize";
import { JobMatchesPanel } from "./JobMatchesPanel";
import type { AdminMatchCardData } from "./actions";

const durationLabels: Record<string, string> = {
  FAST: "Fast",
  VIKARIAT: "Vikariat",
  PROSJEKT: "Prosjekt",
};

export default async function AdminOppdragDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [job, candidateNames] = await Promise.all([
    prisma.job.findUnique({
      where: { id },
      include: {
        matches: {
          orderBy: { score: "desc" },
          include: { candidate: true },
        },
      },
    }),
    prisma.candidate.findMany({ select: { name: true } }),
  ]);

  if (!job) notFound();

  const screeningQuestions = parseJsonArray(job.screeningQuestions);

  const initialMatches: AdminMatchCardData[] = job.matches.map((m) => ({
    id: m.id,
    candidateId: m.candidateId,
    name: m.candidate.name,
    education: m.candidate.education,
    location: m.candidate.location,
    score: m.score,
    reasoning: m.reasoning,
    keySkills: parseJsonArray(m.candidate.aiKeySkills),
    status: m.status,
    cvFileName: m.candidate.cvFileName,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            {job.roleType}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">{job.companyName}</h1>
          <p className="mt-1 text-sm text-muted">
            {job.contactName} · {job.contactEmail} · {job.location} ·{" "}
            {durationLabels[job.duration]}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border p-5 shadow-sm">
        <h2 className="mb-2 font-semibold">Beskrivelse</h2>
        <p className="whitespace-pre-line text-sm text-foreground/90">{job.description}</p>
      </div>

      {screeningQuestions.length > 0 && (
        <div className="rounded-xl border border-border p-5 shadow-sm">
          <h2 className="mb-2 font-semibold">AI-genererte screeningspørsmål</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/90">
            {screeningQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      <JobMatchesPanel
        jobId={job.id}
        initialMatches={initialMatches}
        candidatePoolNames={candidateNames.map((c) => c.name)}
      />
    </div>
  );
}
