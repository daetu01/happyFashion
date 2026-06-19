import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface ScoreRingProps {
  score: number;
  size?: number;
  label?: string;
}

export default function ScoreRing({ score, size = 240, label = "Aura Score" }: ScoreRingProps) {
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const [display, setDisplay] = useState(0);
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, score, {
      duration: 1.8,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1] as const,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [score, progress]);

  const offset = circumference - (display / 100) * circumference;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute -rotate-90">
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c39bff" />
            <stop offset="55%" stopColor="#8b3dff" />
            <stop offset="100%" stopColor="#ff5fae" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={10}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ filter: "drop-shadow(0 0 12px rgba(139,61,255,0.65))" }}
        />
      </svg>
      <div className="flex flex-col items-center">
        <span className="font-display text-6xl font-bold text-shimmer tabular-nums">{display}</span>
        <span className="mt-1 text-xs uppercase tracking-[0.2em] text-white/50">{label}</span>
      </div>
    </div>
  );
}
