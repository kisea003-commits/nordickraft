"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export function AnimatedButton({
  className = "",
  children,
  disabled,
  ...props
}: HTMLMotionProps<"button">) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.15 }}
      disabled={disabled}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
