import "dotenv/config";
import { PrismaClient, Availability, ExperienceLevel, Duration } from "@prisma/client";

const prisma = new PrismaClient();

const candidates = [
  {
    name: "Emma Haugland",
    email: "emma.haugland@example.no",
    phone: "412 34 567",
    education: "Bachelor i sosialt arbeid, OsloMet",
    skillsText:
      "Erfaring fra praksis på barnevernskontor. God på samtaleteknikk, konflikthåndtering og tverrfaglig samarbeid. Snakker norsk, engelsk og litt somali.",
    availability: Availability.HELTID,
    location: "Oslo",
    aboutMe:
      "Nyutdannet sosionom med hjerte for ungdomsarbeid. Ønsker å jobbe tett med elever som trenger noen å snakke med.",
    aiKeySkills: JSON.stringify([
      "Samtaleteknikk",
      "Konflikthåndtering",
      "Tverrfaglig samarbeid",
      "Barnevern",
    ]),
    aiExperienceLevel: ExperienceLevel.NYUTDANNET,
    aiSuggestedRoles: JSON.stringify(["Sosialrådgiver", "Miljøarbeider"]),
    aiSummary:
      "Nyutdannet sosionom med praksis fra barnevern, sterk på relasjonsbygging med ungdom.",
  },
  {
    name: "Markus Berg",
    email: "markus.berg@example.no",
    phone: "930 11 223",
    education: "Bachelor i vernepleie, Universitetet i Bergen",
    skillsText:
      "3 års erfaring som miljøarbeider i bofellesskap for ungdom. Trygg i akutte situasjoner, kjennskap til ART og trygghetssirkelen.",
    availability: Availability.HELTID,
    location: "Bergen",
    aboutMe: "Erfaren vernepleier som trives med å bygge gode relasjoner i krevende miljø.",
    aiKeySkills: JSON.stringify([
      "Miljøterapi",
      "ART",
      "Trygghetssirkelen",
      "Krisehåndtering",
    ]),
    aiExperienceLevel: ExperienceLevel.ERFAREN,
    aiSuggestedRoles: JSON.stringify(["Miljøarbeider", "Miljøterapeut"]),
    aiSummary: "Erfaren vernepleier med solid praksis fra ungdomsbofellesskap.",
  },
  {
    name: "Sara Nilsen",
    email: "sara.nilsen@example.no",
    phone: "986 45 210",
    education: "Master i sosialt arbeid, NTNU",
    skillsText:
      "Spesialisering i skolebasert sosialt arbeid. Har jobbet med elever med skolevegring og psykisk helse i skolehelsetjenesten.",
    availability: Availability.DELTID,
    location: "Trondheim",
    aboutMe: "Brenner for tidlig innsats og forebyggende arbeid blant elever i ungdomsskolen.",
    aiKeySkills: JSON.stringify([
      "Skolevegring",
      "Psykisk helsearbeid",
      "Forebyggende arbeid",
      "Foreldresamarbeid",
    ]),
    aiExperienceLevel: ExperienceLevel.JUNIOR,
    aiSuggestedRoles: JSON.stringify(["Sosialrådgiver", "Miljøterapeut"]),
    aiSummary: "Masterutdannet med spesialkompetanse på skolevegring og forebyggende arbeid.",
  },
  {
    name: "Ali Hassan",
    email: "ali.hassan@example.no",
    phone: "455 67 890",
    education: "Bachelor i barnevern, VID vitenskapelige høgskole",
    skillsText:
      "Praksis fra flyktningmottak og introduksjonsprogram. Flerkulturell kompetanse, arabisk som morsmål.",
    availability: Availability.HELTID,
    location: "Drammen",
    aboutMe: "Ønsker å bidra med min flerkulturelle bakgrunn i arbeid med sårbar ungdom.",
    aiKeySkills: JSON.stringify([
      "Flerkulturell kompetanse",
      "Barnevernsfaglig arbeid",
      "Arabisk",
      "Integreringsarbeid",
    ]),
    aiExperienceLevel: ExperienceLevel.NYUTDANNET,
    aiSuggestedRoles: JSON.stringify(["Sosialrådgiver", "Miljøarbeider"]),
    aiSummary: "Nyutdannet barnevernspedagog med sterk flerkulturell kompetanse.",
  },
  {
    name: "Ingrid Solberg",
    email: "ingrid.solberg@example.no",
    phone: "928 33 445",
    education: "Bachelor i vernepleie, Høgskolen i Innlandet",
    skillsText:
      "5 år som miljøterapeut på ungdomsskole. Erfaring med individuelle oppfølgingsplaner og samarbeid med BUP.",
    availability: Availability.HELTID,
    location: "Lillehammer",
    aboutMe: "Strukturert og tålmodig miljøterapeut med god erfaring fra skolesektoren.",
    aiKeySkills: JSON.stringify([
      "Individuell oppfølging",
      "Samarbeid med BUP",
      "Miljøterapi",
      "Relasjonsbygging",
    ]),
    aiExperienceLevel: ExperienceLevel.ERFAREN,
    aiSuggestedRoles: JSON.stringify(["Miljøterapeut", "Miljøarbeider"]),
    aiSummary: "Erfaren miljøterapeut med fem års praksis direkte i skolesektoren.",
  },
  {
    name: "Kevin Johansen",
    email: "kevin.johansen@example.no",
    phone: "413 78 901",
    education: "Bachelor i sosialt arbeid, Universitetet i Stavanger",
    skillsText:
      "Praksisperiode på NAV og i videregående skole. God på kartleggingssamtaler og motiverende intervju.",
    availability: Availability.BEGGE,
    location: "Stavanger",
    aboutMe: "Engasjert og løsningsorientert, liker å jobbe der det er behov for rask innsats.",
    aiKeySkills: JSON.stringify([
      "Motiverende intervju",
      "Kartleggingssamtaler",
      "NAV-samarbeid",
      "Ungdomsarbeid",
    ]),
    aiExperienceLevel: ExperienceLevel.NYUTDANNET,
    aiSuggestedRoles: JSON.stringify(["Sosialrådgiver"]),
    aiSummary: "Nyutdannet med praksis fra NAV og videregående skole, sterk på motiverende samtaler.",
  },
  {
    name: "Frida Eide",
    email: "frida.eide@example.no",
    phone: "976 12 340",
    education: "Master i psykososialt arbeid, OsloMet",
    skillsText:
      "Erfaring som miljøterapeut i barne- og ungdomspsykiatrien. Traumebevisst omsorg, gruppeledelse.",
    availability: Availability.DELTID,
    location: "Oslo",
    aboutMe: "Mastergrad med fordypning i traumebevisst omsorg, ønsker deltidsstilling ved siden av doktorgrad.",
    aiKeySkills: JSON.stringify([
      "Traumebevisst omsorg",
      "Gruppeledelse",
      "BUP-erfaring",
      "Psykisk helse",
    ]),
    aiExperienceLevel: ExperienceLevel.SENIOR,
    aiSuggestedRoles: JSON.stringify(["Miljøterapeut", "Sosialrådgiver"]),
    aiSummary: "Erfaren miljøterapeut med mastergrad og spesialisering i traumebevisst omsorg.",
  },
  {
    name: "Oscar Lund",
    email: "oscar.lund@example.no",
    phone: "402 56 789",
    education: "Bachelor i idrett og kroppsøving + PPU, NIH",
    skillsText:
      "Erfaring som miljøarbeider gjennom idrettsbaserte tiltak for ungdom med atferdsutfordringer. Trener og mentor på fritiden.",
    availability: Availability.HELTID,
    location: "Kristiansand",
    aboutMe: "Bruker idrett og fysisk aktivitet som verktøy for å bygge relasjoner med ungdom.",
    aiKeySkills: JSON.stringify([
      "Idrettspedagogikk",
      "Mentorarbeid",
      "Relasjonsbygging",
      "Atferdsarbeid",
    ]),
    aiExperienceLevel: ExperienceLevel.JUNIOR,
    aiSuggestedRoles: JSON.stringify(["Miljøarbeider"]),
    aiSummary: "Idrettsfaglig bakgrunn kombinert med praktisk erfaring som miljøarbeider for ungdom.",
  },
  {
    name: "Nora Kristiansen",
    email: "nora.kristiansen@example.no",
    phone: "958 90 123",
    education: "Bachelor i sosialt arbeid, UiT Norges arktiske universitet",
    skillsText:
      "Praksis fra skolehelsetjenesten i Nord-Norge. Erfaring med samisk kultur og distriktsarbeid, fleksibel på reising.",
    availability: Availability.HELTID,
    location: "Tromsø",
    aboutMe: "Fleksibel og reiseglad, trives godt i tett samarbeid med lærere og foreldre.",
    aiKeySkills: JSON.stringify([
      "Skolehelsetjeneste",
      "Samisk kulturkompetanse",
      "Foreldresamarbeid",
      "Distriktsarbeid",
    ]),
    aiExperienceLevel: ExperienceLevel.NYUTDANNET,
    aiSuggestedRoles: JSON.stringify(["Sosialrådgiver"]),
    aiSummary: "Nyutdannet sosionom fra Nord-Norge med god kulturell kompetanse og fleksibilitet.",
  },
  {
    name: "Henrik Moe",
    email: "henrik.moe@example.no",
    phone: "489 22 110",
    education: "Bachelor i vernepleie, Høgskulen på Vestlandet",
    skillsText:
      "4 år i barnevernsinstitusjon, spesialkompetanse på selvregulering og lavaffektiv tilnærming.",
    availability: Availability.HELTID,
    location: "Bergen",
    aboutMe: "Rolig og tydelig voksenperson med solid erfaring fra krevende miljø.",
    aiKeySkills: JSON.stringify([
      "Lavaffektiv tilnærming",
      "Selvregulering",
      "Barnevernsinstitusjon",
      "Grensesetting",
    ]),
    aiExperienceLevel: ExperienceLevel.ERFAREN,
    aiSuggestedRoles: JSON.stringify(["Miljøarbeider", "Miljøterapeut"]),
    aiSummary: "Erfaren vernepleier med spisskompetanse på lavaffektiv tilnærming fra barnevernsinstitusjon.",
  },
];

const jobs = [
  {
    companyName: "Nordbygda ungdomsskole",
    contactName: "Kari Andersen",
    contactEmail: "kari.andersen@nordbygda-skole.no",
    roleType: "Sosialrådgiver",
    description:
      "Vi søker en sosialrådgiver i 80% stilling til å følge opp elever med skolevegring og sosiale utfordringer. Tett samarbeid med lærere, foreldre og helsesykepleier. Oppstart så snart som mulig.",
    location: "Oslo",
    duration: Duration.VIKARIAT,
  },
  {
    companyName: "Fjordheim bo- og omsorgssenter",
    contactName: "Per Olsen",
    contactEmail: "per.olsen@fjordheim.no",
    roleType: "Miljøarbeider",
    description:
      "Vi trenger en erfaren miljøarbeider til ungdomsbofellesskap. Turnusarbeid, krever erfaring med krisehåndtering og lavaffektiv tilnærming.",
    location: "Bergen",
    duration: Duration.FAST,
  },
];

async function main() {
  console.log("Seeder database...");

  for (const candidate of candidates) {
    await prisma.candidate.upsert({
      where: { email: candidate.email },
      update: {},
      create: {
        ...candidate,
        aiProcessedAt: new Date(),
      },
    });
  }
  console.log(`${candidates.length} kandidater lagt inn.`);

  for (const job of jobs) {
    const existing = await prisma.job.findFirst({
      where: { companyName: job.companyName, roleType: job.roleType },
    });
    if (!existing) {
      await prisma.job.create({ data: job });
    }
  }
  console.log(`${jobs.length} oppdrag lagt inn.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
