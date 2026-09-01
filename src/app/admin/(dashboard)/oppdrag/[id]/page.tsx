import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/serialize";
import { rerunMatching, updateMatchStatus } from "./actions";

const durationLabels: Record<string, string> = {
  FAST: "Fast",
  VIKARIAT: "Vikariat",
  PROSJEKT: "Prosjekt",
};

const statusOptions = [
  { value: "FORESLATT", label: "Foreslått" },
  { value: "SENDT_TIL_KUNDE", label: "Sendt til kunde" },
  { value: "INTERVJU_BOOKET", label: "Intervju booket" },
  { value: "ANSATT", label: "Ansatt" },
  { value: "AVSLATT", label: "Avslått" },
];

const errorMessages: Record<string, string> = {
  ingen_kandidater: "Ingen kandidater i databasen å matche mot ennå.",
  ai_feilet:
    "AI-matching feilet. Sjekk at ANTHROPIC_API_KEY er satt riktig i miljøvariablene.",
};

export default async function AdminOppdragDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { id } = await params;
  const { error, success } = await searchParams;

  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      matches: {
        orderBy: { score: "desc" },
        include: { candidate: true },
      },
    },
  });

  if (!job) notFound();

  const boundRerun = rerunMatching.bind(null, job.id);
  const screeningQuestions = parseJsonArray(job.screeningQuestions);

  return (
    <div className="flex flex-col gap-8">
      {error && (
        <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessages[error] ?? "Noe gikk galt."}
        </p>
      )}
      {success && (
        <p className="rounded-md bg-accent-light px-4 py-3 text-sm text-accent">
          AI-matching oppdatert.
        </p>
      )}
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
        <form action={boundRerun}>
          <button
            type="submit"
            className="rounded-md border border-accent px-4 py-2 text-sm font-medium text-accent hover:bg-accent-light"
          >
            Kjør AI-matching på nytt
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-border p-5">
        <h2 className="mb-2 font-semibold">Beskrivelse</h2>
        <p className="whitespace-pre-line text-sm text-foreground/90">{job.description}</p>
      </div>

      {screeningQuestions.length > 0 && (
        <div className="rounded-xl border border-border p-5">
          <h2 className="mb-2 font-semibold">AI-genererte screeningspørsmål</h2>
          <ul className="list-disc space-y-1 pl-5 text-sm text-foreground/90">
            {screeningQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="mb-4 text-lg font-semibold">
          AI-matchforslag ({job.matches.length})
        </h2>
        {job.matches.length === 0 ? (
          <p className="text-sm text-muted">
            Ingen matcher generert ennå. Klikk &quot;Kjør AI-matching på nytt&quot; over.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {job.matches.map((match) => {
              const boundUpdateStatus = updateMatchStatus.bind(null, match.id, job.id);
              return (
                <div key={match.id} className="rounded-xl border border-border p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{match.candidate.name}</p>
                      <p className="text-sm text-muted">
                        {match.candidate.education} · {match.candidate.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-accent-light px-3 py-1 text-sm font-medium text-accent">
                        {match.score}% match
                      </span>
                      {match.candidate.cvFileName && (
                        <a
                          href={`/api/admin/cv/${match.candidate.id}`}
                          target="_blank"
                          className="text-sm text-accent hover:underline"
                        >
                          Se CV
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-foreground/90">{match.reasoning}</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {parseJsonArray(match.candidate.aiKeySkills).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <form
                    action={boundUpdateStatus}
                    className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3"
                  >
                    <label className="text-sm text-muted" htmlFor={`status-${match.id}`}>
                      Status:
                    </label>
                    <select
                      id={`status-${match.id}`}
                      name="status"
                      defaultValue={match.status}
                      className="rounded-md border border-border bg-white px-2 py-1.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-dark"
                    >
                      Oppdater status
                    </button>
                  </form>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
