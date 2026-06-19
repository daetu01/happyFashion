import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Camera, Check, Search, X, Loader2, ArrowRight } from "lucide-react";
import PageShell from "../components/PageShell";
import GlassCard from "../components/GlassCard";
import Button from "../components/Button";
import Chip from "../components/Chip";
import { useAura } from "../lib/AuraContext";
import { INTEREST_TAGS } from "../lib/data";
import { searchMusic, type ItunesTrack } from "../lib/musicApi";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const } }),
};

export default function Upload() {
  const navigate = useNavigate();
  const { photoPreview, setPhotoPreview, selectedTracks, addTrack, removeTrack, interests, toggleInterest } =
    useAura();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ItunesTrack[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const tracks = await searchMusic(query);
        setSearchResults(tracks);
        setSearchError(null);
      } catch {
        setSearchError("Couldn't reach the music search. Is the backend running?");
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
  };

  const handleAddTrack = (track: ItunesTrack) => {
    addTrack(track);
    setQuery("");
    setSearchResults([]);
  };

  const canContinue = !!photoPreview && interests.length > 0;

  return (
    <PageShell back>
      <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp} className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Build your aura</h1>
        <p className="mt-2 text-sm text-white/55">Three quick steps. We only use this to generate your vibe.</p>
      </motion.div>

      <div className="space-y-6">
        {/* Step 1: Photo */}
        <motion.div initial="hidden" animate="show" custom={0.05} variants={fadeUp}>
          <SectionLabel step={1} title="Upload your photo" />
          <GlassCard className="p-5">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
            {photoPreview ? (
              <div className="flex items-center gap-4">
                <img
                  src={photoPreview}
                  alt="Your upload"
                  className="h-20 w-20 rounded-2xl object-cover ring-2 ring-aura-400/40"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">Photo added</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-1 text-xs text-aura-300 hover:text-aura-200"
                  >
                    Change photo
                  </button>
                </div>
                <Check size={20} className="text-aura-300" />
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 py-10 text-white/50 transition-colors hover:border-aura-400/40 hover:text-white/80"
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/5">
                  <Camera size={20} />
                </span>
                <span className="text-sm">
                  <span className="font-medium text-white/80">Tap to upload</span> or drag a photo here
                </span>
              </button>
            )}
          </GlassCard>
        </motion.div>

        {/* Step 2: Music taste */}
        <motion.div initial="hidden" animate="show" custom={0.1} variants={fadeUp}>
          <SectionLabel step={2} title="Search your music taste" optional />
          <GlassCard className="p-5">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a song or artist..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-9 text-sm text-white placeholder:text-white/35 outline-none focus:border-aura-400/50"
              />
              {searching && (
                <Loader2 size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-white/35" />
              )}
            </div>

            {searchError && <p className="mt-2 text-xs text-rose-400">{searchError}</p>}

            {searchResults.length > 0 && (
              <div className="mt-3 max-h-56 space-y-1 overflow-y-auto">
                {searchResults.map((track) => (
                  <button
                    key={track.trackViewUrl}
                    onClick={() => handleAddTrack(track)}
                    className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-white/5"
                  >
                    <img
                      src={track.artworkUrl100}
                      alt=""
                      className="h-10 w-10 flex-shrink-0 rounded-lg object-cover bg-white/5"
                    />
                    <span className="flex-1 overflow-hidden">
                      <span className="block truncate text-sm text-white/90">{track.trackName}</span>
                      <span className="block truncate text-xs text-white/45">{track.artistName}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {selectedTracks.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                {selectedTracks.map((track) => (
                  <span
                    key={track.trackViewUrl}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 pl-1 pr-2 py-1"
                  >
                    <img src={track.artworkUrl100} alt="" className="h-6 w-6 rounded-full object-cover" />
                    <span className="max-w-[120px] truncate text-xs text-white/80">{track.trackName}</span>
                    <button onClick={() => removeTrack(track.trackViewUrl)} className="text-white/35 hover:text-white">
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {selectedTracks.length === 0 && searchResults.length === 0 && !query && (
              <p className="mt-3 text-xs text-white/35">
                Powered by iTunes — search lets us match real artists to your vibe.
              </p>
            )}
          </GlassCard>
        </motion.div>

        {/* Step 3: Interests */}
        <motion.div initial="hidden" animate="show" custom={0.15} variants={fadeUp}>
          <SectionLabel step={3} title="Pick your interests" />
          <GlassCard className="p-5">
            <p className="mb-4 text-xs text-white/45">Games, genres, aesthetics — anything that's you.</p>
            <div className="flex flex-wrap gap-2">
              {INTEREST_TAGS.map((tag) => (
                <Chip
                  key={tag.id}
                  selected={interests.includes(tag.id)}
                  onClick={() => toggleInterest(tag.id)}
                >
                  {tag.label}
                </Chip>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <motion.div initial="hidden" animate="show" custom={0.2} variants={fadeUp} className="mt-8">
        <Button
          size="lg"
          className="w-full"
          disabled={!canContinue}
          onClick={() => navigate("/analysis")}
          icon={<ArrowRight size={18} />}
        >
          Analyze My Aura
        </Button>
        {!canContinue && (
          <p className="mt-2 text-center text-xs text-white/35">
            Add a photo and at least one interest to continue
          </p>
        )}
      </motion.div>
    </PageShell>
  );
}

function SectionLabel({ step, title, optional }: { step: number; title: string; optional?: boolean }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="grid h-5 w-5 place-items-center rounded-full bg-aura-500/25 text-[11px] font-semibold text-aura-200">
        {step}
      </span>
      <span className="text-sm font-medium text-white/85">{title}</span>
      {optional && <span className="text-xs text-white/35">optional</span>}
    </div>
  );
}
