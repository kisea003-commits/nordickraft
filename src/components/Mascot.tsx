"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationControls, useInView, useReducedMotion } from "framer-motion";

const MESSAGES = [
  "Klar for å finne din perfekte match?",
  "Hei! 👋 Trenger dere bemanning?",
  "La oss koble deg med rett kandidat!",
];

const WAVE = { rotate: [0, 18, -8, 18, -4, 12, 0] };
const BIG_WAVE = { rotate: [0, 26, -14, 26, -14, 22, -6, 0] };

export function Mascot({ className = "", size = 220 }: { className?: string; size?: number }) {
  const armControls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [messageIndex, setMessageIndex] = useState<number | null>(null);

  function wave(keyframes: { rotate: number[] } = WAVE, duration = 1.6) {
    if (reduceMotion) return;
    armControls.start({ ...keyframes, transition: { duration, ease: "easeInOut" } });
  }

  useEffect(() => {
    const t = setTimeout(() => wave(), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inView) wave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    if (messageIndex === null) return;
    const t = setTimeout(() => setMessageIndex(null), 2600);
    return () => clearTimeout(t);
  }, [messageIndex]);

  function handleActivate() {
    wave(BIG_WAVE, 1.1);
    setMessageIndex((i) => ((i ?? -1) + 1) % MESSAGES.length);
  }

  return (
    <motion.div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="NordicKraft-maskot, klikk for en hilsen"
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      onHoverStart={() => wave()}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-block cursor-pointer select-none outline-none ${className}`}
      style={{ width: size, height: size }}
    >
      <AnimatePresence>
        {messageIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="absolute -top-3 left-1/2 z-10 w-max max-w-[220px] -translate-x-[38%] -translate-y-full rounded-2xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground shadow-lg"
          >
            {MESSAGES[messageIndex]}
            <span className="absolute -bottom-1.5 left-[42%] h-3 w-3 rotate-45 border-b border-r border-border bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width={size} height={size} viewBox="0 0 200 240" fill="none">
          <defs>
            <linearGradient id="mascot-chrome-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="22%" stopColor="#eef2f0" />
              <stop offset="46%" stopColor="#aeb9b4" />
              <stop offset="62%" stopColor="#e9eeec" />
              <stop offset="100%" stopColor="#828e89" />
            </linearGradient>
            <linearGradient id="mascot-chrome-head" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="32%" stopColor="#e4e9e7" />
              <stop offset="58%" stopColor="#a7b2ad" />
              <stop offset="100%" stopColor="#78847f" />
            </linearGradient>
            <linearGradient id="mascot-chrome-limb" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4f7f6" />
              <stop offset="50%" stopColor="#a3aeaa" />
              <stop offset="100%" stopColor="#727e7a" />
            </linearGradient>
            <linearGradient id="mascot-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--gold-light)" />
              <stop offset="55%" stopColor="var(--gold)" />
              <stop offset="100%" stopColor="#8f6a19" />
            </linearGradient>
            <linearGradient id="mascot-accent-plate" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-light)" />
              <stop offset="45%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent-dark)" />
            </linearGradient>
            <radialGradient id="mascot-eye-glow" cx="50%" cy="42%" r="65%">
              <stop offset="0%" stopColor="#eafeff" />
              <stop offset="45%" stopColor="#4fd3e8" />
              <stop offset="100%" stopColor="#1c8ea3" />
            </radialGradient>
            <filter id="mascot-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* legs + feet */}
          <rect x="80" y="196" width="14" height="22" rx="4" fill="url(#mascot-chrome-limb)" />
          <rect x="106" y="196" width="14" height="22" rx="4" fill="url(#mascot-chrome-limb)" />
          <rect x="70" y="215" width="30" height="14" rx="5" fill="url(#mascot-accent-plate)" />
          <rect x="100" y="215" width="30" height="14" rx="5" fill="url(#mascot-accent-plate)" />

          {/* torso, tapered plated chassis */}
          <path
            d="M56 100 Q56 88 68 88 L132 88 Q144 88 144 100 L137 186 Q135 197 124 197 L76 197 Q65 197 63 186 Z"
            fill="url(#mascot-chrome-body)"
            stroke="#828e89"
            strokeWidth="2"
          />
          <ellipse
            cx="84"
            cy="108"
            rx="9"
            ry="30"
            fill="#ffffff"
            opacity="0.32"
            transform="rotate(-18 84 108)"
          />

          {/* shoulder plates */}
          <rect x="36" y="94" width="24" height="18" rx="6" fill="url(#mascot-accent-plate)" />
          <rect x="140" y="94" width="24" height="18" rx="6" fill="url(#mascot-accent-plate)" />

          {/* static left arm */}
          <line x1="44" y1="108" x2="38" y2="150" stroke="url(#mascot-chrome-limb)" strokeWidth="13" strokeLinecap="round" />
          <circle cx="38" cy="150" r="9" fill="url(#mascot-accent-plate)" />

          {/* chest plate + glowing core */}
          <rect x="74" y="106" width="52" height="58" rx="14" fill="url(#mascot-accent-plate)" />
          <circle cx="100" cy="136" r="15" fill="var(--accent-dark)" stroke="#4fd3e8" strokeWidth="2.5" />
          <motion.path
            d="M100 127 L103 134 L110 136 L103 138 L100 146 L97 138 L90 136 L97 134 Z"
            fill="url(#mascot-eye-glow)"
            filter="url(#mascot-glow)"
            animate={{ opacity: [1, 0.55, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* neck */}
          <rect x="90" y="78" width="20" height="14" fill="url(#mascot-chrome-limb)" />

          {/* head */}
          <rect x="62" y="28" width="76" height="56" rx="20" fill="url(#mascot-chrome-head)" stroke="#828e89" strokeWidth="2" />
          <ellipse
            cx="80"
            cy="40"
            rx="8"
            ry="14"
            fill="#ffffff"
            opacity="0.4"
            transform="rotate(-12 80 40)"
          />

          {/* visor */}
          <rect x="74" y="48" width="52" height="18" rx="9" fill="var(--accent-dark)" />
          <motion.ellipse
            cx="88"
            cy="57"
            rx="7.5"
            ry="5"
            fill="url(#mascot-eye-glow)"
            filter="url(#mascot-glow)"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="112"
            cy="57"
            rx="7.5"
            ry="5"
            fill="url(#mascot-eye-glow)"
            filter="url(#mascot-glow)"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
          />

          {/* side audio vents */}
          <rect x="54" y="46" width="6" height="20" rx="3" fill="url(#mascot-accent-plate)" />
          <rect x="140" y="46" width="6" height="20" rx="3" fill="url(#mascot-accent-plate)" />

          {/* waving mechanical arm, pivoting at the shoulder */}
          <motion.g animate={armControls} style={{ originX: 0.1, originY: 0.9 }}>
            <line
              x1="150"
              y1="104"
              x2="168"
              y2="76"
              stroke="url(#mascot-chrome-limb)"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <circle cx="168" cy="76" r="8" fill="url(#mascot-gold)" />
            <line
              x1="168"
              y1="76"
              x2="188"
              y2="48"
              stroke="url(#mascot-chrome-limb)"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <circle cx="188" cy="48" r="10" fill="url(#mascot-accent-plate)" />
            {/* claw prongs */}
            <line x1="188" y1="48" x2="198" y2="37" stroke="url(#mascot-gold)" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="188" y1="48" x2="202" y2="48" stroke="url(#mascot-gold)" strokeWidth="4.5" strokeLinecap="round" />
            <line x1="188" y1="48" x2="198" y2="59" stroke="url(#mascot-gold)" strokeWidth="4.5" strokeLinecap="round" />
          </motion.g>
        </svg>
      </motion.div>
    </motion.div>
  );
}
