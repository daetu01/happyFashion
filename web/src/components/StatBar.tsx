import { motion } from "framer-motion";

interface StatBarProps {
  label: string;
  value: number;
  delay?: number;
}

export default function StatBar({ label, value, delay = 0 }: StatBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-white/80">{label}</span>
        <span className="font-display text-sm font-semibold text-aura-300 tabular-nums">{value}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-aura-400 via-aura-500 to-pink-glow"
          style={{ boxShadow: "0 0 12px rgba(139,61,255,0.6)" }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] as const }}
        />
      </div>
    </div>
  );
}
