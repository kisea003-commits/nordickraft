"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CountUp } from "./CountUp";

export function CircularScore({
  value,
  size = 64,
  strokeWidth = 5,
  delay = 0,
  duration = 1.2,
  color = "var(--accent)",
  trackColor = "var(--border)",
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
  color?: string;
  trackColor?: string;
}) {
  const reduceMotion = useReducedMotion();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - value / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{ duration: reduceMotion ? 0 : duration, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold tabular-nums" style={{ color }}>
          <CountUp value={value} suffix="%" delay={delay} duration={duration * 0.9} triggerOnMount />
        </span>
      </div>
    </div>
  );
}
