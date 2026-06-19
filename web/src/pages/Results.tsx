import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Share2, Music2, Shirt } from "lucide-react";
import PageShell from "../components/PageShell";
import GlassCard from "../components/GlassCard";
import ScoreRing from "../components/ScoreRing";
import StatBar from "../components/StatBar";
import Button from "../components/Button";
import { useAura } from "../lib/AuraContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const } }),
};

export default function Results() {
  const navigate = useNavigate();
  const { result, photoPreview } = useAura();

  useEffect(() => {
    if (!result) navigate("/upload", { replace: true });
  }, [result, navigate]);

  if (!result) return null;

  return (
    <PageShell back rightSlot={<span className="text-xs text-white/40">{result.vibeType}</span>}>
      <motion.div
        initial="hidden"
        animate="show"
        custom={0}
        variants={fadeUp}
        className="flex flex-col items-center text-center"
      >
        {photoPreview && (
          <img
            src={photoPreview}
            alt=""
            className="mb-4 h-16 w-16 rounded-full object-cover ring-2 ring-aura-400/40"
          />
        )}
        <ScoreRing score={result.score} />
        <h1 className="font-display mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
          {result.vibeType}
        </h1>
        <p className="mt-1 text-sm text-white/50">{result.tagline}</p>
      </motion.div>

      <motion.div initial="hidden" animate="show" custom={0.1} variants={fadeUp} className="mt-8">
        <GlassCard className="p-5 sm:p-6">
          <p className="text-[15px] leading-relaxed text-white/75">{result.description}</p>
        </GlassCard>
      </motion.div>

      <motion.div initial="hidden" animate="show" custom={0.18} variants={fadeUp} className="mt-6">
        <GlassCard className="p-5 sm:p-6">
          <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            Personality Breakdown
          </h2>
          <div className="space-y-4">
            <StatBar label="Street Energy" value={result.stats.streetEnergy} delay={0.2} />
            <StatBar label="Midnight Vibes" value={result.stats.midnightVibes} delay={0.3} />
            <StatBar label="Luxury Energy" value={result.stats.luxuryEnergy} delay={0.4} />
            <StatBar label="Creative Aura" value={result.stats.creativeAura} delay={0.5} />
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial="hidden" animate="show" custom={0.26} variants={fadeUp} className="mt-6">
        <GlassCard className="p-5 sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            <Music2 size={14} /> Similar Artists
          </h2>
          <div className="flex flex-wrap gap-2">
            {result.similarArtists.map((artist) => (
              <span
                key={artist}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-white/85"
              >
                {artist}
              </span>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial="hidden" animate="show" custom={0.34} variants={fadeUp} className="mt-6">
        <GlassCard className="p-5 sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            <Shirt size={14} /> Fashion Match
          </h2>
          <div className="flex flex-wrap gap-2">
            {result.fashionMatch.map((style) => (
              <span
                key={style}
                className="rounded-full bg-aura-500/15 px-3.5 py-1.5 text-sm font-medium text-aura-200"
              >
                {style}
              </span>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial="hidden" animate="show" custom={0.42} variants={fadeUp} className="mt-6">
        <GlassCard className="p-5 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
            Color Palette
          </h2>
          <div className="flex gap-3">
            {result.colorPalette.map((color) => (
              <div key={color} className="flex-1">
                <div
                  className="aspect-square w-full rounded-xl ring-1 ring-white/10"
                  style={{ backgroundColor: color }}
                />
                <p className="mt-1.5 text-center text-[11px] text-white/35">{color}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial="hidden" animate="show" custom={0.5} variants={fadeUp} className="mt-8">
        <Button size="lg" className="w-full" onClick={() => navigate("/share")} icon={<Share2 size={18} />}>
          Share My Aura
        </Button>
      </motion.div>
    </PageShell>
  );
}
