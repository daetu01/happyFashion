import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  strong?: boolean;
  glow?: boolean;
  interactive?: boolean;
}

export default function GlassCard({
  strong,
  glow,
  interactive,
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={clsx(
        "rounded-3xl",
        strong ? "glass-strong" : "glass",
        glow && "glow-aura",
        interactive && "transition-transform hover:-translate-y-1 cursor-pointer",
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
