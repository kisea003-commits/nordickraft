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
  {
    name: "Mohammed Farah",
    email: "mohammed.farah@example.no",
    phone: "412 90 887",
    education: "Bachelor i barnevern, OsloMet",
    skillsText:
      "4 års erfaring som miljøarbeider ved ungdomsskole på Stovner. Flytende somali og arabisk i tillegg til norsk og engelsk, mye brukt i foreldresamarbeid og konfliktmegling i flerkulturelle miljøer.",
    availability: Availability.HELTID,
    location: "Oslo",
    aboutMe:
      "Vokste opp i Groruddalen og kjenner lokalmiljøet godt. Brenner for å være en tydelig og trygg rollemodell for gutter med minoritetsbakgrunn.",
    aiKeySkills: JSON.stringify([
      "Somali (flytende)",
      "Arabisk",
      "Foreldresamarbeid",
      "Konfliktmegling",
      "Flerkulturell kompetanse",
    ]),
    aiExperienceLevel: ExperienceLevel.ERFAREN,
    aiSuggestedRoles: JSON.stringify(["Miljøarbeider", "Miljøterapeut"]),
    aiSummary:
      "Erfaren miljøarbeider fra Groruddalen med somalisk og arabisk språkkompetanse, sterk på foreldresamarbeid i flerkulturelle miljøer.",
  },
  {
    name: "Yasmin Haidari",
    email: "yasmin.haidari@example.no",
    phone: "930 44 217",
    education: "Bachelor i psykologi, Universitetet i Oslo",
    skillsText:
      "Praksis fra flyktninghelsetjenesten og skolehelsetjenesten. Snakker dari og farsi flytende i tillegg til norsk og engelsk. Erfaring med å møte elever og familier med traumebakgrunn.",
    availability: Availability.HELTID,
    location: "Oslo",
    aboutMe:
      "Nyutdannet psykolog(bachelor) med sterkt ønske om å jobbe forebyggende med ungdom i flerkulturelle bydeler.",
    aiKeySkills: JSON.stringify([
      "Dari/farsi (flytende)",
      "Traumeforståelse",
      "Flyktninghelsearbeid",
      "Psykisk helse",
    ]),
    aiExperienceLevel: ExperienceLevel.NYUTDANNET,
    aiSuggestedRoles: JSON.stringify(["Sosialrådgiver", "Miljøterapeut"]),
    aiSummary:
      "Nyutdannet psykologistudent med dari/farsi-kompetanse og praksis fra flyktninghelsetjenesten.",
  },
  {
    name: "Ibrahim Nur",
    email: "ibrahim.nur@example.no",
    phone: "462 18 305",
    education: "Bachelor i vernepleie, VID vitenskapelige høgskole",
    skillsText:
      "6 års erfaring som miljøterapeut ved ungdomsskoler i Oslo øst. Somali og arabisk i tillegg til norsk. Solid på lavaffektiv tilnærming og tett oppfølging av gutter med skolevegring.",
    availability: Availability.HELTID,
    location: "Oslo",
    aboutMe:
      "Erfaren miljøterapeut som har jobbet mye med gutter i risikosonen for frafall. Opptatt av tydelige rammer kombinert med varme.",
    aiKeySkills: JSON.stringify([
      "Somali",
      "Arabisk",
      "Lavaffektiv tilnærming",
      "Skolevegring",
      "Guttegrupper",
    ]),
    aiExperienceLevel: ExperienceLevel.SENIOR,
    aiSuggestedRoles: JSON.stringify(["Miljøterapeut", "Miljøarbeider"]),
    aiSummary:
      "Senior miljøterapeut med seks års erfaring fra Oslo øst, somali- og arabisktalende, spesialist på skolevegring hos gutter.",
  },
  {
    name: "Selma Berisha",
    email: "selma.berisha@example.no",
    phone: "959 27 641",
    education: "Master i sosialt arbeid, OsloMet",
    skillsText:
      "Erfaring fra skolehelsetjenesten på Furuset og Holmlia. Snakker albansk flytende i tillegg til norsk og engelsk. Spesialisert på jentegrupper og forebygging av negativ sosial kontroll.",
    availability: Availability.HELTID,
    location: "Oslo",
    aboutMe:
      "Masterutdannet sosionom med et sterkt engasjement for jenter og unge kvinner i flerkulturelle miljøer.",
    aiKeySkills: JSON.stringify([
      "Albansk",
      "Jentegrupper",
      "Negativ sosial kontroll",
      "Skolehelsetjeneste",
      "Forebyggende arbeid",
    ]),
    aiExperienceLevel: ExperienceLevel.ERFAREN,
    aiSuggestedRoles: JSON.stringify(["Sosialrådgiver", "Miljøterapeut"]),
    aiSummary:
      "Erfaren sosionom med albansk språkkompetanse og spesialisering på jentegrupper og forebygging av negativ sosial kontroll.",
  },
  {
    name: "Fatima Al-Amin",
    email: "fatima.al-amin@example.no",
    phone: "406 73 552",
    education: "Bachelor i sosialt arbeid, OsloMet",
    skillsText:
      "2 års erfaring som sosialrådgiver-vikar på ungdomsskole på Mortensrud. Arabisk morsmål, god kjennskap til somali fra oppveksten. Sterk på kartleggingssamtaler og samarbeid med barnevernstjenesten.",
    availability: Availability.BEGGE,
    location: "Oslo",
    aboutMe:
      "Engasjert sosionom som ønsker å bidra til at flere elever med minoritetsbakgrunn fullfører skolegangen.",
    aiKeySkills: JSON.stringify([
      "Arabisk (morsmål)",
      "Kartleggingssamtaler",
      "Barnevernssamarbeid",
      "Flerkulturell kompetanse",
    ]),
    aiExperienceLevel: ExperienceLevel.JUNIOR,
    aiSuggestedRoles: JSON.stringify(["Sosialrådgiver"]),
    aiSummary:
      "Sosionom med arabisk morsmål og to års erfaring som sosialrådgiver-vikar i Oslo sør.",
  },
  {
    name: "Amara Osei",
    email: "amara.osei@example.no",
    phone: "913 58 274",
    education: "Bachelor i barnevern, VID vitenskapelige høgskole",
    skillsText:
      "3 år som miljøarbeider i bofellesskap for enslige mindreårige flyktninger. Snakker twi og litt fransk i tillegg til norsk og engelsk. Erfaring med traumebevisst omsorg og nettverksarbeid.",
    availability: Availability.HELTID,
    location: "Oslo",
    aboutMe: "Varm og strukturert miljøarbeider med solid erfaring fra arbeid med enslige mindreårige.",
    aiKeySkills: JSON.stringify([
      "Twi",
      "Traumebevisst omsorg",
      "Nettverksarbeid",
      "Enslige mindreårige flyktninger",
    ]),
    aiExperienceLevel: ExperienceLevel.ERFAREN,
    aiSuggestedRoles: JSON.stringify(["Miljøarbeider", "Miljøterapeut"]),
    aiSummary:
      "Erfaren miljøarbeider med bakgrunn fra arbeid med enslige mindreårige flyktninger, snakker twi og fransk.",
  },
  {
    name: "Leon Dahl",
    email: "leon.dahl@example.no",
    phone: "976 40 118",
    education: "Bachelor i psykologi, Universitetet i Oslo",
    skillsText:
      "Praksis fra PPT og videregående skole. God på individuelle samtaler og kartlegging av lærevansker. Interessert i digital ungdomskultur og forebyggende arbeid mot nettmobbing.",
    availability: Availability.DELTID,
    location: "Oslo",
    aboutMe: "Nyutdannet med interesse for krysningspunktet mellom psykisk helse og digital hverdag hos ungdom.",
    aiKeySkills: JSON.stringify([
      "PPT-erfaring",
      "Kartlegging av lærevansker",
      "Nettmobbing",
      "Individuelle samtaler",
    ]),
    aiExperienceLevel: ExperienceLevel.NYUTDANNET,
    aiSuggestedRoles: JSON.stringify(["Sosialrådgiver"]),
    aiSummary: "Nyutdannet psykologistudent med praksis fra PPT, interessert i digital ungdomskultur.",
  },
  {
    name: "Layla Chaudhry",
    email: "layla.chaudhry@example.no",
    phone: "482 61 930",
    education: "Bachelor i pedagogikk, Universitetet i Oslo",
    skillsText:
      "5 år som miljøarbeider og assistent ved ungdomsskole på Grorud. Urdu og panjabi i tillegg til norsk og engelsk. Erfaring med tilrettelegging for flerspråklige elever og foreldremøter på flere språk.",
    availability: Availability.HELTID,
    location: "Oslo",
    aboutMe:
      "Erfaren pedagog som er opptatt av at flerspråklighet er en ressurs, ikke en utfordring, i klasserommet.",
    aiKeySkills: JSON.stringify([
      "Urdu",
      "Panjabi",
      "Flerspråklig tilrettelegging",
      "Foreldresamarbeid",
      "Pedagogikk",
    ]),
    aiExperienceLevel: ExperienceLevel.ERFAREN,
    aiSuggestedRoles: JSON.stringify(["Miljøarbeider", "Sosialrådgiver"]),
    aiSummary:
      "Erfaren pedagog med urdu- og panjabi-kompetanse, fem års praksis fra ungdomsskole på Grorud.",
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
  {
    companyName: "Stovner skole",
    contactName: "Mari Lien",
    contactEmail: "mari.lien@stovner-skole.no",
    roleType: "Miljøarbeider",
    description:
      "Stovner skole søker miljøarbeider i 100% stilling til å følge opp gutter i risikosonen for frafall og skolevegring. Elevgruppen er flerkulturell, og erfaring med og forståelse for somalisk og arabisktalende familier er en klar fordel. Tett samarbeid med sosiallærer og hjemmene.",
    location: "Oslo",
    duration: Duration.VIKARIAT,
  },
  {
    companyName: "Holmlia skole",
    contactName: "Thomas Berg",
    contactEmail: "thomas.berg@holmlia-skole.no",
    roleType: "Sosialrådgiver",
    description:
      "Holmlia skole trenger en sosialrådgiver i 80% stilling. Skolen har en svært sammensatt elevgruppe med mange flerspråklige familier. Vi ser etter noen med god kompetanse på kartleggingssamtaler, foreldresamarbeid og gjerne relevant språkkompetanse ut over norsk og engelsk.",
    location: "Oslo",
    duration: Duration.FAST,
  },
  {
    companyName: "Mortensrud skole",
    contactName: "Ingvild Sæther",
    contactEmail: "ingvild.saether@mortensrud-skole.no",
    roleType: "Miljøterapeut",
    description:
      "Vi søker en miljøterapeut til å jobbe tett med en gruppe elever med sammensatte utfordringer, blant annet skolevegring og traumebakgrunn. Ønsker noen med erfaring fra traumebevisst omsorg og gjerne kjennskap til flyktning- eller migrasjonsbakgrunn.",
    location: "Oslo",
    duration: Duration.VIKARIAT,
  },
  {
    companyName: "Furuset skole",
    contactName: "Anders Vik",
    contactEmail: "anders.vik@furuset-skole.no",
    roleType: "Sosialrådgiver",
    description:
      "Furuset skole søker sosialrådgiver som kan jobbe forebyggende med jentegrupper og negativ sosial kontroll, i tillegg til ordinær oppfølging av elever med sosiale utfordringer. Vi ønsker sterkt en kandidat med flerkulturell kompetanse.",
    location: "Oslo",
    duration: Duration.FAST,
  },
  {
    companyName: "Grorud skole",
    contactName: "Silje Amundsen",
    contactEmail: "silje.amundsen@grorud-skole.no",
    roleType: "Miljøarbeider",
    description:
      "Grorud skole trenger en miljøarbeider i 100% stilling med gode ferdigheter i tilrettelegging for flerspråklige elever og foreldresamarbeid på tvers av språk. Turnus med noe kveldsarbeid ved foreldremøter.",
    location: "Oslo",
    duration: Duration.VIKARIAT,
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
