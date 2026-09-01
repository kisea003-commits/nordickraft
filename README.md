# NordicKraft

MVP for et bemanningsbyrå-system med AI-matching. Bygget med Next.js (App Router),
TypeScript, Tailwind CSS og Prisma + SQLite. AI-drevet CV-parsing og kandidatmatching
kjører server-side via Claude API (Anthropic).

## Kom i gang

```bash
npm install
cp .env.example .env   # fyll inn ANTHROPIC_API_KEY, sett gjerne egne admin-passord
npx prisma migrate deploy
npx tsx prisma/seed.ts  # seeder 10 demo-kandidater og 2 demo-oppdrag
npm run dev
```

Appen kjører på http://localhost:3000.

## Miljøvariabler

Se `.env.example`:

- `DATABASE_URL` – peker til den lokale SQLite-filen (`file:./dev.db`)
- `ANTHROPIC_API_KEY` – **påkrevd** for at AI-strukturering av kandidatprofiler,
  AI-matching og screeningspørsmål skal fungere. Uten nøkkel lagres fortsatt
  kandidater/oppdrag normalt, men AI-feltene forblir tomme (feilen logges server-side).
- `ADMIN_PASSWORD` – passordet for `/admin`-innlogging (enkel passordbeskyttelse, ikke
  fullt auth-system)
- `ADMIN_SESSION_SECRET` – tilfeldig streng brukt til å signere admin-sesjonscookien

## Struktur

- `/` – forside med tre innganger: kandidat, oppdrag, admin
- `/kandidat` – offentlig registreringsskjema for kandidater (med valgfri CV-opplasting i PDF)
- `/oppdrag` – registreringsskjema for bedriftskunder, trigger AI-matching automatisk
- `/admin` – passordbeskyttet dashboard: oversikt, kandidatliste m/filter, oppdragsliste,
  og per oppdrag: AI-matchforslag med score/begrunnelse, statussporing
  (Foreslått → Sendt til kunde → Intervju booket → Ansatt/Avslått), og mulighet til å
  kjøre AI-matching på nytt.

Opplastede CV-er lagres lokalt i `/uploads` (gitignored) og serveres kun via en
admin-autentisert API-rute (`/api/admin/cv/[candidateId]`) – de er ikke offentlig
tilgjengelige.

## Database

Prisma-modeller: `Candidate`, `Job`, `Match` (se `prisma/schema.prisma`). SQLite-filen
opprettes lokalt og er gitignored – kjør migrasjonene over for å sette den opp på nytt.

## Deploy til Railway

`npm start` kjører `prisma migrate deploy && tsx prisma/seed.ts && next start -p $PORT`,
så en frisk deploy migrerer, seeder og starter appen i ett steg – ingen manuelle steg
etter at tjenesten er koblet til.

1. Gå til [railway.app](https://railway.app) og logg inn med GitHub.
2. **New Project → Deploy from GitHub repo** → velg `kisea003-commits/nordickraft`.
   Railway kjenner igjen Next.js automatisk (Nixpacks) og bruker `npm run build` /
   `npm run start` fra `package.json`.
3. Under **Variables**, legg inn:
   - `ANTHROPIC_API_KEY`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET`
   - `DATABASE_URL` = `file:./dev.db` (fungerer uten volum – se under)
4. Deploy. Railway gir deg en `*.up.railway.app`-URL – den kan du åpne fra hvilken som
   helst enhet, inkludert telefon.

**Om persistens:** Uten et Railway Volume ligger SQLite-filen på tjenestens vanlige
disk, som består mellom vanlige restarts, men nullstilles ved ny deploy (siden
`npm start` kjører seed på nytt uansett, er det uansett aldri tomt for demo-data).
Vil du beholde data på tvers av deploys: legg til en **Volume** på tjenesten
(f.eks. mountet på `/data`), og sett `DATABASE_URL=file:/data/dev.db` i Variables.
