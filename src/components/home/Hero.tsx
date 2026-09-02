"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="hero-gradient">
      <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-sm font-medium uppercase tracking-wide text-accent"
        >
          Bemanning med presisjon
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
        >
          Vi matcher rett kandidat med rett oppdrag – raskt, og med AI som medhjelper.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-lg text-muted"
        >
          NordicKraft kobler kvalifiserte kandidater, som sosialrådgivere og
          miljøarbeidere, med skoler og virksomheter som trenger dem. Registrer
          deg på under fem minutter.
        </motion.p>
      </div>
    </section>
  );
}
