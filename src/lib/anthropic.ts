import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";

const client = new Anthropic();

const MODEL = "claude-opus-5";

const CandidateProfileSchema = z.object({
  keySkills: z
    .array(z.string())
    .describe("3-8 konkrete nøkkelferdigheter, korte stikkord på norsk"),
  experienceLevel: z
    .enum(["NYUTDANNET", "JUNIOR", "ERFAREN", "SENIOR"])
    .describe("Vurdert erfaringsnivå basert på tekst/CV"),
  suggestedRoles: z
    .array(z.string())
    .describe(
      "Hvilke type roller kandidaten passer for, f.eks 'sosialrådgiver', 'miljøarbeider', 'miljøterapeut'",
    ),
  summary: z.string().describe("1-2 setninger som oppsummerer kandidaten"),
});

export type CandidateProfile = z.infer<typeof CandidateProfileSchema>;

export async function parseCandidateProfile(input: {
  education: string;
  skillsText: string;
  aboutMe: string | null;
  cvBase64?: string;
}): Promise<CandidateProfile> {
  const textParts = [
    `Utdanning: ${input.education}`,
    `Ferdigheter (fritekst fra kandidat): ${input.skillsText}`,
    input.aboutMe ? `Om meg: ${input.aboutMe}` : null,
    "Les informasjonen (og CV-vedlegget hvis det finnes) og strukturer kandidatens profil for et bemanningsbyrå som formidler sosialrådgivere, miljøarbeidere og miljøterapeuter til skoler og andre virksomheter.",
  ].filter(Boolean);

  const content: Anthropic.Messages.ContentBlockParam[] = [];
  if (input.cvBase64) {
    content.push({
      type: "document",
      source: {
        type: "base64",
        media_type: "application/pdf",
        data: input.cvBase64,
      },
    });
  }
  content.push({ type: "text", text: textParts.join("\n\n") });

  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 4000,
    system:
      "Du er en HR-assistent hos det norske bemanningsbyrået NordicKraft. Du strukturerer kandidatprofiler nøyaktig og nøkternt, uten å finne på informasjon som ikke er nevnt.",
    messages: [{ role: "user", content }],
    output_config: { format: zodOutputFormat(CandidateProfileSchema) },
  });

  if (!response.parsed_output) {
    throw new Error("Klarte ikke å strukturere kandidatprofilen (tomt AI-svar).");
  }
  return response.parsed_output;
}

const MatchResultSchema = z.object({
  matches: z
    .array(
      z.object({
        candidateId: z.string().describe("Må være en av de oppgitte kandidat-IDene"),
        score: z.number().int().min(0).max(100),
        reasoning: z
          .string()
          .describe(
            "Konkret, personlig begrunnelse på norsk, 2-3 setninger. Skal nevne spesifikke, faktiske detaljer fra kandidatens profil (navngitt utdanning/institusjon, konkret erfaring, språk/kulturkompetanse når det er relevant for elevgruppen, geografisk nærhet) - ikke generiske fraser som 'har relevant erfaring'.",
          ),
      }),
    )
    .max(5)
    .describe("Topp 5 kandidater rangert fra best til dårligst match"),
});

export type MatchResult = z.infer<typeof MatchResultSchema>["matches"];

export interface CandidateForMatching {
  id: string;
  name: string;
  education: string;
  location: string;
  availability: string;
  aiKeySkills: string[] | null;
  aiExperienceLevel: string | null;
  aiSuggestedRoles: string[] | null;
  aiSummary: string | null;
  skillsText: string;
  aboutMe: string | null;
}

export async function matchCandidatesToJob(
  job: {
    roleType: string;
    description: string;
    location: string;
    duration: string;
  },
  candidates: CandidateForMatching[],
): Promise<MatchResult> {
  const candidateBlock = candidates
    .map((c) =>
      [
        `ID: ${c.id}`,
        `Navn: ${c.name}`,
        `Utdanning: ${c.education}`,
        `Sted: ${c.location}`,
        `Tilgjengelighet: ${c.availability}`,
        `Nøkkelferdigheter (AI): ${c.aiKeySkills?.join(", ") ?? "ukjent"}`,
        `Erfaringsnivå (AI): ${c.aiExperienceLevel ?? "ukjent"}`,
        `Foreslåtte roller (AI): ${c.aiSuggestedRoles?.join(", ") ?? "ukjent"}`,
        `Sammendrag: ${c.aiSummary ?? c.skillsText}`,
      ].join("\n"),
    )
    .join("\n---\n");

  const prompt = [
    `Oppdrag hos kunde:`,
    `Type rolle som trengs: ${job.roleType}`,
    `Sted: ${job.location}`,
    `Varighet: ${job.duration}`,
    `Beskrivelse: ${job.description}`,
    ``,
    `Tilgjengelige kandidater:`,
    candidateBlock,
    ``,
    `Rangér de 5 beste kandidatene for dette oppdraget. Gi hver en matchscore fra 0-100 og en begrunnelse på norsk som starter med "Denne kandidaten passer fordi...", på 2-3 setninger. Begrunnelsen skal være konkret og personlig - trekk frem spesifikke, faktiske detaljer fra kandidatens profil under (navngitt utdanning/institusjon, konkret erfaring som er relevant for akkurat denne rollen, språk- eller kulturkompetanse når det er relevant for elevgruppen/oppdraget, og geografisk nærhet til oppdragsstedet). Unngå generiske formuleringer som "har relevant erfaring" - vis konkret hvorfor. Bruk kun candidateId fra listen over.`,
  ].join("\n");

  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 4000,
    system:
      "Du er en erfaren rekrutterer hos det norske bemanningsbyrået NordicKraft, som matcher kandidater mot oppdrag fra skoler og andre virksomheter. Vurder relevans av utdanning, ferdigheter, erfaringsnivå, sted og tilgjengelighet. Når oppdraget gjelder en skole med en flerkulturell eller flerspråklig elevgruppe (fremgår ofte av stedet eller beskrivelsen), skal du aktivt vektlegge kandidater med relevant språkkompetanse eller kulturkompetanse - dette er en reell styrke i sosialrådgiver- og miljøarbeiderroller, ikke en bonus som skal nevnes i forbifarten. Begrunnelsene dine skal alltid være konkrete og etterprøvbare ut fra kandidatprofilene du får oppgitt, aldri oppdiktet informasjon.",
    messages: [{ role: "user", content: prompt }],
    output_config: { format: zodOutputFormat(MatchResultSchema) },
  });

  if (!response.parsed_output) {
    throw new Error("Klarte ikke å generere matcher (tomt AI-svar).");
  }
  return response.parsed_output.matches;
}

const ScreeningQuestionsSchema = z.object({
  questions: z
    .array(z.string())
    .min(2)
    .max(3)
    .describe("2-3 korte, konkrete kvalifiserende spørsmål på norsk"),
});

export async function generateScreeningQuestions(job: {
  roleType: string;
  description: string;
}): Promise<string[]> {
  const response = await client.messages.parse({
    model: MODEL,
    max_tokens: 1500,
    system:
      "Du er en rekrutterer hos NordicKraft som lager korte kvalifiserende screeningspørsmål til kandidater.",
    messages: [
      {
        role: "user",
        content: `Lag 2-3 korte kvalifiserende spørsmål til kandidater for dette oppdraget:\n\nRolle: ${job.roleType}\nBeskrivelse: ${job.description}`,
      },
    ],
    output_config: { format: zodOutputFormat(ScreeningQuestionsSchema) },
  });

  if (!response.parsed_output) return [];
  return response.parsed_output.questions;
}
