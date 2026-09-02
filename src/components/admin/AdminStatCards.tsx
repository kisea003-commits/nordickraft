"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/motion/CountUp";

export function AdminStatCards({
  stats,
}: {
  stats: { label: string; value: number }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ y: -3 }}
          className="rounded-xl border border-border p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
        >
          <p className="text-sm text-muted">{stat.label}</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight text-accent tabular-nums">
            <CountUp value={stat.value} duration={1} delay={i * 0.1} triggerOnMount />
          </p>
        </motion.div>
      ))}
    </div>
  );
}
