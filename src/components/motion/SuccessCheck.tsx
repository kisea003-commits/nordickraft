"use client";

import { motion } from "framer-motion";

export function SuccessCheck() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
      className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-light text-2xl text-accent"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0.8 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
        className="absolute inset-0 rounded-full bg-accent-light"
      />
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 14 }}
        className="relative"
      >
        ✓
      </motion.span>
    </motion.div>
  );
}
