"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SiteHeader } from "@/components/SiteHeader";
import { SuccessCheck } from "@/components/motion/SuccessCheck";

export default function OppdragBekreftelsePage() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <SuccessCheck />
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-3xl font-semibold tracking-tight"
        >
          Takk for oppdraget!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-3 max-w-md text-muted"
        >
          Vi har mottatt oppdraget og AI-modellen vår har allerede foreslått aktuelle
          kandidater. NordicKraft-teamet kvalitetssikrer forslagene og tar kontakt med deg
          innen kort tid.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Link
            href="/"
            className="mt-8 inline-block rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
          >
            Tilbake til forsiden
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
