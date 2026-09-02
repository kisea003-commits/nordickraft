import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/serialize";
import { Availability, type Prisma } from "@prisma/client";

const availabilityLabels: Record<string, string> = {
  HELTID: "Heltid",
  DELTID: "Deltid",
  BEGGE: "Fleksibel",
};

const inputClass =
  "rounded-md border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent";

export default async function AdminKandidaterPage({
  searchParams,
}: {
  searchParams: Promise<{ utdanning?: string; sted?: string; tilgjengelighet?: string }>;
}) {
  const params = await searchParams;

  const where: Prisma.CandidateWhereInput = {};
  if (params.utdanning) {
    where.education = { contains: params.utdanning };
  }
  if (params.sted) {
    where.location = { contains: params.sted };
  }
  if (
    params.tilgjengelighet &&
    params.tilgjengelighet !== "ALLE" &&
    params.tilgjengelighet in Availability
  ) {
    where.availability = params.tilgjengelighet as Availability;
  }

  const candidates = await prisma.candidate.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Kandidater</h1>
        <p className="mt-1 text-sm text-muted">{candidates.length} kandidater i basen.</p>
      </div>

      <form className="flex flex-wrap gap-3" method="get">
        <input
          name="utdanning"
          defaultValue={params.utdanning}
          placeholder="Filtrer på utdanning"
          className={inputClass}
        />
        <input
          name="sted"
          defaultValue={params.sted}
          placeholder="Filtrer på sted"
          className={inputClass}
        />
        <select
          name="tilgjengelighet"
          defaultValue={params.tilgjengelighet ?? "ALLE"}
          className={inputClass}
        >
          <option value="ALLE">Alle tilgjengeligheter</option>
          <option value="HELTID">Heltid</option>
          <option value="DELTID">Deltid</option>
          <option value="BEGGE">Fleksibel</option>
        </select>
        <button
          type="submit"
          className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
        >
          Filtrer
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-border bg-accent-light/40 text-left text-muted">
              <th className="px-4 py-3 font-medium">Navn</th>
              <th className="px-4 py-3 font-medium">Utdanning</th>
              <th className="px-4 py-3 font-medium">Sted</th>
              <th className="px-4 py-3 font-medium">Tilgjengelighet</th>
              <th className="px-4 py-3 font-medium">AI-roller</th>
              <th className="px-4 py-3 font-medium">Nivå</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr
                key={c.id}
                className="border-b border-border transition-colors last:border-0 hover:bg-accent-light/25"
              >
                <td className="px-4 py-3">
                  <p className="font-medium">{c.name}</p>
                  <p className="text-muted">{c.email}</p>
                </td>
                <td className="px-4 py-3">{c.education}</td>
                <td className="px-4 py-3">{c.location}</td>
                <td className="px-4 py-3">{availabilityLabels[c.availability]}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {parseJsonArray(c.aiSuggestedRoles).map((role) => (
                      <span
                        key={role}
                        className="whitespace-nowrap rounded-full bg-accent-light px-2 py-0.5 text-xs text-accent"
                      >
                        {role}
                      </span>
                    ))}
                    {parseJsonArray(c.aiSuggestedRoles).length === 0 && (
                      <span className="text-xs text-muted">Ikke analysert</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">{c.aiExperienceLevel ?? "–"}</td>
              </tr>
            ))}
            {candidates.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Ingen kandidater matcher filteret.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
