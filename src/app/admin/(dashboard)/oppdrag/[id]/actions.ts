"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/serialize";
import { matchCandidatesToJob, type CandidateForMatching } from "@/lib/anthropic";
import { MatchStatus } from "@prisma/client";
import type { MatchCardData } from "@/components/matching/MatchResultCard";

export interface AdminMatchCardData extends MatchCardData {
  candidateId: string;
  status: MatchStatus;
  cvFileName: string | null;
  email: string;
  phone: string;
}

async function loadJobMatches(jobId: string): Promise<AdminMatchCardData[]> {
  const matches = await prisma.match.findMany({
    where: { jobId },
    orderBy: { score: "desc" },
    include: { candidate: true },
  });

  return matches.map((m) => ({
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
    email: m.candidate.email,
    phone: m.candidate.phone,
  }));
}

export async function updateMatchStatus(
  matchId: string,
  jobId: string,
  status: MatchStatus,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!(status in MatchStatus)) {
    return { ok: false, error: "Ugyldig status" };
  }
  try {
    await prisma.match.update({ where: { id: matchId }, data: { status } });
  } catch (err) {
    console.error("Kunne ikke oppdatere matchstatus:", err);
    return { ok: false, error: "Kunne ikke oppdatere status" };
  }
  revalidatePath(`/admin/oppdrag/${jobId}`);
  revalidatePath("/admin");
  return { ok: true };
}

export async function rerunMatching(
  jobId: string,
): Promise<{ ok: true; matches: AdminMatchCardData[] } | { ok: false; error: string }> {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return { ok: false, error: "Fant ikke oppdraget" };

  const candidates = await prisma.candidate.findMany();
  const candidatesForMatching: CandidateForMatching[] = candidates.map((c) => ({
    id: c.id,
    name: c.name,
    education: c.education,
    location: c.location,
    availability: c.availability,
    aiKeySkills: parseJsonArray(c.aiKeySkills),
    aiExperienceLevel: c.aiExperienceLevel,
    aiSuggestedRoles: parseJsonArray(c.aiSuggestedRoles),
    aiSummary: c.aiSummary,
    skillsText: c.skillsText,
    aboutMe: c.aboutMe,
  }));

  if (candidatesForMatching.length === 0) {
    return { ok: false, error: "Ingen kandidater i databasen å matche mot ennå." };
  }

  try {
    const matches = await matchCandidatesToJob(
      {
        roleType: job.roleType,
        description: job.description,
        location: job.location,
        duration: job.duration,
      },
      candidatesForMatching,
    );

    await Promise.all(
      matches.map((m) =>
        prisma.match.upsert({
          where: { candidateId_jobId: { candidateId: m.candidateId, jobId: job.id } },
          update: { score: m.score, reasoning: m.reasoning },
          create: {
            candidateId: m.candidateId,
            jobId: job.id,
            score: m.score,
            reasoning: m.reasoning,
          },
        }),
      ),
    );
  } catch (err) {
    console.error("AI-matching feilet:", err);
    return {
      ok: false,
      error: "AI-matching feilet. Sjekk at ANTHROPIC_API_KEY er satt riktig i miljøvariablene.",
    };
  }

  revalidatePath(`/admin/oppdrag/${jobId}`);
  revalidatePath("/admin");

  const updated = await loadJobMatches(jobId);
  return { ok: true, matches: updated };
}
