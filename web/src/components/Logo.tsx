import { Link } from "react-router-dom";
import clsx from "clsx";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={clsx("inline-flex items-center gap-2 select-none", className)}>
      <span className="relative h-7 w-7 rounded-full bg-gradient-to-br from-aura-300 via-aura-500 to-pink-glow glow-aura-sm" />
      <span className="font-display text-lg font-bold tracking-tight text-white">aura</span>
    </Link>
  );
}
