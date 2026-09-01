"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/serialize";
import { matchCandidatesToJob, type CandidateForMatching } from "@/lib/anthropic";
import { MatchStatus } from "@prisma/client";

export async function updateMatchStatus(matchId: string, jobId: string, formData: FormData) {
  const status = formData.get("status");
  if (typeof status !== "string" || !(status in MatchStatus)) {
    return;
  }
  await prisma.match.update({
    where: { id: matchId },
    data: { status: status as MatchStatus },
  });
  revalidatePath(`/admin/oppdrag/${jobId}`);
  revalidatePath("/admin");
}

export async function rerunMatching(jobId: string) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return;

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
    redirect(`/admin/oppdrag/${jobId}?error=ingen_kandidater`);
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
    redirect(`/admin/oppdrag/${jobId}?error=ai_feilet`);
  }

  revalidatePath(`/admin/oppdrag/${jobId}`);
  revalidatePath("/admin");
  redirect(`/admin/oppdrag/${jobId}?success=1`);
}
