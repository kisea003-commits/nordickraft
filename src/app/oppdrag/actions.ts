"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { parseJsonArray } from "@/lib/serialize";
import {
  matchCandidatesToJob,
  generateScreeningQuestions,
  type CandidateForMatching,
} from "@/lib/anthropic";
import { Duration } from "@prisma/client";

const JobFormSchema = z.object({
  companyName: z.string().trim().min(2, "Skriv inn bedriftsnavn"),
  contactName: z.string().trim().min(2, "Skriv inn kontaktperson"),
  contactEmail: z.string().trim().email("Ugyldig e-postadresse"),
  roleType: z.string().trim().min(2, "Skriv inn hvilken rolle dere trenger"),
  description: z.string().trim().min(10, "Beskriv oppdraget litt nærmere"),
  location: z.string().trim().min(2, "Skriv inn sted"),
  desiredStart: z.string().optional(),
  duration: z.nativeEnum(Duration),
});

export type JobFormState = {
  error: string | null;
};

export async function registerJob(
  _prevState: JobFormState,
  formData: FormData,
): Promise<JobFormState> {
  const parsed = JobFormSchema.safeParse({
    companyName: formData.get("companyName"),
    contactName: formData.get("contactName"),
    contactEmail: formData.get("contactEmail"),
    roleType: formData.get("roleType"),
    description: formData.get("description"),
    location: formData.get("location"),
    desiredStart: formData.get("desiredStart") || undefined,
    duration: formData.get("duration"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Ugyldig skjema" };
  }

  const data = parsed.data;

  const job = await prisma.job.create({
    data: {
      companyName: data.companyName,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      roleType: data.roleType,
      description: data.description,
      location: data.location,
      desiredStart: data.desiredStart ? new Date(data.desiredStart) : null,
      duration: data.duration,
    },
  });

  try {
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

    if (candidatesForMatching.length > 0) {
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
    }

    const questions = await generateScreeningQuestions({
      roleType: job.roleType,
      description: job.description,
    });
    if (questions.length > 0) {
      await prisma.job.update({
        where: { id: job.id },
        data: { screeningQuestions: JSON.stringify(questions) },
      });
    }
  } catch (err) {
    console.error("AI-matching for oppdrag feilet:", err);
  }

  redirect("/oppdrag/bekreftelse");
}
