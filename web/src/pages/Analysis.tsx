import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAura } from "../lib/AuraContext";
import { LOADING_MESSAGES } from "../lib/data";

const STEP_DURATION = 850;

export default function Analysis() {
  const navigate = useNavigate();
  const { runAnalysis, photoPreview } = useAura();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!photoPreview) {
      navigate("/upload", { replace: true });
    }
  }, [photoPreview, navigate]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LOADING_MESSAGES.forEach((_, i) => {
      timers.push(setTimeout(() => setMessageIndex(i), i * STEP_DURATION));
    });
    timers.push(
      setTimeout(() => {
        runAnalysis();
        navigate("/results");
      }, LOADING_MESSAGES.length * STEP_DURATION + 400),
    );

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progress = Math.min(100, Math.round(((messageIndex + 1) / LOADING_MESSAGES.length) * 100));

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-12 h-40 w-40">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-aura-300 via-aura-500 to-pink-glow opacity-70 blur-2xl"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 180] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-3 rounded-full border border-white/15"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full glass-strong animate-pulse-glow"
          style={{ boxShadow: "0 0 60px rgba(139,61,255,0.5)" }}
        />
        {photoPreview && (
          <img
            src={photoPreview}
            alt=""
            className="absolute inset-10 h-20 w-20 rounded-full object-cover opacity-90"
          />
        )}
      </div>

      <div className="h-7">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="font-display text-base font-medium text-white/85 sm:text-lg"
          >
            {LOADING_MESSAGES[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 w-full max-w-xs">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-aura-400 via-aura-500 to-pink-glow"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
        <p className="mt-3 font-display text-sm tabular-nums text-white/40">{progress}%</p>
      </div>
    </div>
  );
}
