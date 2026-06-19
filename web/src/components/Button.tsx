import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "ghost" | "outline";
  size?: "md" | "lg";
  icon?: ReactNode;
  children?: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors disabled:opacity-50 disabled:pointer-events-none";

  const sizes = {
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-aura-400 via-aura-500 to-pink-glow text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:brightness-110",
    ghost: "text-white/80 hover:text-white hover:bg-white/5",
    outline: "border border-white/15 text-white hover:bg-white/5",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {icon}
      {children}
    </motion.button>
  );
}
