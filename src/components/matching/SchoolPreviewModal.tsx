"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export interface SchoolPreviewData {
  candidateName: string;
  education: string;
  location: string;
  score: number;
  reasoning: string;
  keySkills: string[];
  email: string;
  phone: string;
  schoolName: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function SchoolPreviewModal({
  open,
  onClose,
  data,
  justSent,
}: {
  open: boolean;
  onClose: () => void;
  data: SchoolPreviewData;
  justSent: boolean;
}) {
  // Standard portal-mounting pattern: document.body only exists client-side,
  // so this must flip after hydration rather than during render (which would
  // desync server/client output and trigger a hydration mismatch).
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="border-b border-border bg-accent-light/40 p-5 text-center">
              {justSent && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
                  className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-lg text-white"
                >
                  ✓
                </motion.div>
              )}
              <p className="text-sm text-muted">
                {justSent ? "Sendt til" : "Delt med"} <span className="font-medium text-foreground">{data.schoolName}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted">
                Slik ser skolen kandidaten – kun grunnlaget for kontakt, ingen e-post er faktisk sendt i denne demoen.
              </p>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent text-xl font-semibold text-white">
                  {initials(data.candidateName)}
                </div>
                <div>
                  <p className="text-lg font-semibold">{data.candidateName}</p>
                  <p className="text-sm text-muted">
                    {data.education} · {data.location}
                  </p>
                  <p className="mt-1 text-sm font-medium text-accent">{data.score}% match</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  Hvorfor denne kandidaten passer
                </h3>
                <p className="text-sm text-foreground/90">{data.reasoning}</p>
              </div>

              <div className="mt-4">
                <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                  Ferdigheter
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.keySkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border px-2 py-0.5 text-xs text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-accent-light/40 p-3">
                <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
                  Kontaktinfo (via NordicKraft)
                </h3>
                <p className="text-sm text-foreground/90">{data.email}</p>
                <p className="text-sm text-foreground/90">{data.phone}</p>
              </div>

              <button
                onClick={onClose}
                className="mt-5 w-full rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground/80 hover:border-accent hover:text-accent"
              >
                Lukk
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
