"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { saveCvFile } from "@/lib/uploads";
import { parseCandidateProfile } from "@/lib/anthropic";
import { Availability } from "@prisma/client";

const CandidateFormSchema = z.object({
  name: z.string().trim().min(2, "Skriv inn fullt navn"),
  email: z.string().trim().email("Ugyldig e-postadresse"),
  phone: z.string().trim().min(6, "Skriv inn et gyldig telefonnummer"),
  education: z.string().trim().min(2, "Fortell hva du har studert"),
  skillsText: z.string().trim().min(2, "Beskriv ferdighetene dine"),
  availability: z.nativeEnum(Availability),
  availableFrom: z.string().optional(),
  location: z.string().trim().min(2, "Skriv inn sted/by"),
  aboutMe: z.string().trim().optional(),
});

export type CandidateFormState = {
  error: string | null;
};

export async function registerCandidate(
  _prevState: CandidateFormState,
  formData: FormData,
): Promise<CandidateFormState> {
  const parsed = CandidateFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    education: formData.get("education"),
    skillsText: formData.get("skillsText"),
    availability: formData.get("availability"),
    availableFrom: formData.get("availableFrom") || undefined,
    location: formData.get("location"),
    aboutMe: formData.get("aboutMe") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Ugyldig skjema" };
  }

  const data = parsed.data;
  const cvFile = formData.get("cv");
  const hasCv = cvFile instanceof File && cvFile.size > 0;

  if (hasCv && cvFile.type !== "application/pdf") {
    return { error: "CV må lastes opp som PDF" };
  }

  const existing = await prisma.candidate.findUnique({ where: { email: data.email } });
  if (existing) {
    return {
      error: "Det finnes allerede en registrering med denne e-postadressen.",
    };
  }

  const candidate = await prisma.candidate.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      education: data.education,
      skillsText: data.skillsText,
      availability: data.availability,
      availableFrom: data.availableFrom ? new Date(data.availableFrom) : null,
      location: data.location,
      aboutMe: data.aboutMe || null,
    },
  });

  let cvBase64: string | undefined;
  if (hasCv && cvFile instanceof File) {
    await saveCvFile(candidate.id, cvFile);
    cvBase64 = Buffer.from(await cvFile.arrayBuffer()).toString("base64");
    await prisma.candidate.update({
      where: { id: candidate.id },
      data: { cvFileName: cvFile.name },
    });
  }

  try {
    const profile = await parseCandidateProfile({
      education: data.education,
      skillsText: data.skillsText,
      aboutMe: data.aboutMe || null,
      cvBase64,
    });
    await prisma.candidate.update({
      where: { id: candidate.id },
      data: {
        aiKeySkills: JSON.stringify(profile.keySkills),
        aiExperienceLevel: profile.experienceLevel,
        aiSuggestedRoles: JSON.stringify(profile.suggestedRoles),
        aiSummary: profile.summary,
        aiProcessedAt: new Date(),
      },
    });
  } catch (err) {
    console.error("AI-strukturering av kandidatprofil feilet:", err);
  }

  redirect("/kandidat/bekreftelse");
}
