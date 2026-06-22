import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Star, LogOut } from "lucide-react";
import Logo from "../components/Logo";
import Button from "../components/Button";
import GlassCard from "../components/GlassCard";
import StatBar from "../components/StatBar";
import { useAuth } from "../lib/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const } }),
};

const PREVIEW_STATS = [
  { label: "Street Energy", value: 92 },
  { label: "Midnight Vibes", value: 88 },
  { label: "Creative Aura", value: 79 },
];

const TESTIMONIALS = [
  { handle: "@mira.codes", quote: "got 94 and a vibe type that's scarily accurate 😭" },
  { handle: "@kjvibes", quote: "posted my aura card and it got 40k views overnight" },
  { handle: "@theo_skts", quote: "this is the new MBTI for my friend group fr" },
  { handle: "@nyx.png", quote: "the color palette matched my entire closet??" },
];

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 sm:px-8">
      <header className="flex items-center justify-between py-6">
        <Logo />
        <div className="flex items-center gap-4">
          <a
            href="#proof"
            className="hidden text-sm text-white/60 hover:text-white transition-colors sm:inline-block"
          >
            2.4M auras generated
          </a>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70">{user?.email}</span>
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/25 transition-colors"
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-white/70 hover:text-white hover:border-white/25 transition-colors"
            >
              Log in
            </Link>
          )}
        </div>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-8 pt-10 pb-20 text-center sm:pt-16">
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-aura-200"
        >
          <Sparkles size={14} className="text-aura-300" />
          AI-powered aura analysis
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          custom={0.1}
          variants={fadeUp}
          className="font-display max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl"
        >
          What's Your{" "}
          <span className="text-aura-gradient">Aura?</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          custom={0.2}
          variants={fadeUp}
          className="max-w-md text-base text-white/60 sm:text-lg"
        >
          Upload a photo, search your music taste, and let AI decode your aura score, vibe type, and
          personality signature in seconds.
        </motion.p>

        <motion.div initial="hidden" animate="show" custom={0.3} variants={fadeUp}>
          <Button size="lg" onClick={() => navigate("/upload")} icon={<ArrowRight size={18} />}>
            Analyze My Aura
          </Button>
          <p className="mt-3 text-xs text-white/40">Takes 30 seconds · No login required</p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          custom={0.45}
          variants={fadeUp}
          className="relative mt-6 w-full max-w-sm"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-aura-600/20 blur-3xl" />
          <GlassCard strong glow className="rotate-2 p-6 text-left sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                Sample Result
              </span>
              <span className="rounded-full bg-aura-500/20 px-2.5 py-1 text-xs font-semibold text-aura-200">
                Midnight Rebel
              </span>
            </div>
            <div className="mb-5 flex items-end gap-3">
              <span className="font-display text-5xl font-bold text-shimmer">87</span>
              <span className="pb-1.5 text-sm text-white/50">/ 100 aura score</span>
            </div>
            <div className="space-y-3.5">
              {PREVIEW_STATS.map((s, i) => (
                <StatBar key={s.label} label={s.label} value={s.value} delay={0.6 + i * 0.15} />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </section>

      <section id="proof" className="border-t border-white/5 py-14">
        <div className="mb-10 grid grid-cols-3 gap-4 text-center sm:gap-8">
          {[
            ["2.4M+", "auras generated"],
            ["180K+", "shared on TikTok"],
            ["4.9", "average rating"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-3xl font-bold text-white sm:text-4xl">{value}</p>
              <p className="mt-1 text-xs text-white/50 sm:text-sm">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] sm:grid sm:grid-cols-4 sm:overflow-visible">
          {TESTIMONIALS.map((t) => (
            <GlassCard key={t.handle} className="min-w-[230px] flex-shrink-0 p-4 sm:min-w-0">
              <div className="mb-2 flex gap-0.5 text-aura-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm text-white/80">"{t.quote}"</p>
              <p className="mt-2 text-xs text-white/40">{t.handle}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/30">
        Aura · made for the main characters
      </footer>
    </div>
  );
}
