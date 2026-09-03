"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SchoolPreviewModal, type SchoolPreviewData } from "./SchoolPreviewModal";

export function ConnectButton({
  alreadyConnected,
  data,
  onConnect,
}: {
  /** True once status is SENDT_TIL_KUNDE or further along the pipeline. */
  alreadyConnected: boolean;
  data: SchoolPreviewData;
  /** Performs the real status update. Only called the first time (not on re-opens). */
  onConnect: () => Promise<void>;
}) {
  const [connecting, setConnecting] = useState(false);
  const [justConnected, setJustConnected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  async function handleClick() {
    if (alreadyConnected) {
      setModalOpen(true);
      return;
    }
    setConnecting(true);
    try {
      await onConnect();
      setJustConnected(true);
      setModalOpen(true);
    } finally {
      setConnecting(false);
    }
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        disabled={connecting}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${
          alreadyConnected
            ? "border border-accent text-accent hover:bg-accent-light"
            : "bg-accent text-white hover:bg-accent-dark"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {connecting ? (
            <motion.span key="connecting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Kobler sammen…
            </motion.span>
          ) : justConnected ? (
            <motion.span
              key="done"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1.5"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                ✓
              </motion.span>
              Sendt til skole!
            </motion.span>
          ) : alreadyConnected ? (
            <motion.span key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Se hva skolen mottok
            </motion.span>
          ) : (
            <motion.span key="connect" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Koble sammen →
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <SchoolPreviewModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={data}
        justSent={justConnected}
      />
    </>
  );
}
