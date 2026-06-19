import { motion } from "framer-motion";
import clsx from "clsx";
import type { ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  icon?: ReactNode;
}

export default function Chip({ children, selected, onClick, icon }: ChipProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        selected
          ? "border-aura-400/60 bg-aura-500/20 text-white glow-aura-sm"
          : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25 hover:text-white/90",
      )}
    >
      {icon}
      {children}
    </motion.button>
  );
}
