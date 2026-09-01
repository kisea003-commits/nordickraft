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
