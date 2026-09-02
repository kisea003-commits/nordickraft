"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const cards = [
  {
    href: "/kandidat",
    icon: "👤",
    title: "Jeg er kandidat",
    body: "Registrer din profil og bli synlig for relevante oppdrag.",
    cta: "Registrer deg som kandidat →",
  },
  {
    href: "/oppdrag",
    icon: "🏫",
    title: "Jeg trenger bemanning",
    body: "Beskriv oppdraget ditt, og få forslag til kvalifiserte kandidater.",
    cta: "Registrer et oppdrag →",
  },
  {
    href: "/admin",
    icon: "🔐",
    title: "Admin-innlogging",
    body: "For NordicKrafts team: se kandidater, oppdrag og AI-matcher.",
    cta: "Logg inn →",
  },
];

export function CtaCards() {
  return (
    <section className="mx-auto grid w-full max-w-5xl gap-4 px-4 py-16 sm:grid-cols-3 sm:px-6 sm:py-20">
      {cards.map((card, i) => (
        <motion.div
          key={card.href}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -6 }}
        >
          <Link
            href={card.href}
            className="group flex h-full flex-col justify-between rounded-xl border border-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
          >
            <div>
              <motion.div
                whileHover={{ scale: 1.08, rotate: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent-light text-accent"
              >
                {card.icon}
              </motion.div>
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm text-muted">{card.body}</p>
            </div>
            <span className="mt-6 inline-flex items-center text-sm font-medium text-accent transition-transform duration-300 group-hover:translate-x-1">
              {card.cta}
            </span>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
