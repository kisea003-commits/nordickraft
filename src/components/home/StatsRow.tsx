"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/motion/CountUp";

const stats = [
  { value: 540, suffix: "+", label: "kandidater i poolen" },
  { value: 128, suffix: "+", label: "oppdrag fullført" },
  { value: 97, suffix: "%", label: "gjennomsnittlig matchscore" },
];

export function StatsRow() {
  return (
    <section className="border-y border-border bg-white">
      <div className="mx-auto grid w-full max-w-5xl grid-cols-3 gap-4 px-4 py-8 sm:px-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-2xl font-bold text-accent tabular-nums sm:text-3xl">
              <CountUp value={stat.value} suffix={stat.suffix} delay={i * 0.15} />
            </p>
            <p className="mt-1 text-xs text-muted sm:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
