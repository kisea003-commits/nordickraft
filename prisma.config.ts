
// `datasource.url` reads process.env directly instead of using the `env()`
// helper from "prisma/config" - that helper throws synchronously the
// instant this file is evaluated (before any command actually needs the
// value), which is fatal on hosts where env vars aren't guaranteed present
// at that exact moment (e.g. Railway's container start). Plain property
// access just passes undefined through, and Prisma CLI still resolves it
// normally from schema.prisma's own `url = env("DATABASE_URL")` once a
// command actually connects.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  engine: "classic",
  datasource: {
    // Non-null assertion, not env(): this must not throw when the file is
    // evaluated (see note above) - if DATABASE_URL is genuinely absent,
    // Prisma reports that lazily and clearly at actual connection time.
    url: process.env.DATABASE_URL!,
  },
});
