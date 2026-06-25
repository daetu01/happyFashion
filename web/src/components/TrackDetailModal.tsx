import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, ExternalLink, Disc3 } from "lucide-react";
import type { ItunesTrack } from "../lib/musicApi";

interface TrackDetailModalProps {
  track: ItunesTrack | null;
  onClose: () => void;
}

export default function TrackDetailModal({ track, onClose }: TrackDetailModalProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setPlaying(false);
    audioRef.current?.pause();
  }, [track]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const releaseYear = track?.releaseDate ? new Date(track.releaseDate).getFullYear() : null;

  return (
    <AnimatePresence>
      {track && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-sm overflow-hidden rounded-t-3xl glass-strong p-6 sm:rounded-3xl"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-end">
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-white/40 hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <img
                src={track.artworkUrl100?.replace("100x100", "600x600") ?? undefined}
                alt=""
                className="h-44 w-44 rounded-2xl bg-white/5 object-cover shadow-2xl ring-1 ring-white/10 glow-aura-sm"
              />
              <h2 className="font-display mt-5 text-xl font-bold text-white">{track.trackName}</h2>
              <p className="mt-1 text-sm text-white/55">{track.artistName}</p>

              {track.previewUrl && (
                <>
                  <button
                    onClick={togglePlay}
                    className="mt-5 flex items-center gap-2 rounded-full bg-gradient-to-r from-aura-400 via-aura-500 to-pink-glow px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    {playing ? <Pause size={16} /> : <Play size={16} />}
                    {playing ? "Pause preview" : "Play preview"}
                  </button>
                  <audio
                    ref={audioRef}
                    src={track.previewUrl}
                    onEnded={() => setPlaying(false)}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <div className="mt-6 space-y-2.5 border-t border-white/5 pt-5">
              {track.collectionName && (
                <DetailRow icon={<Disc3 size={14} />} label="Album" value={track.collectionName} />
              )}
              {track.primaryGenreName && <DetailRow label="Genre" value={track.primaryGenreName} />}
              {releaseYear && <DetailRow label="Released" value={String(releaseYear)} />}
            </div>

            {track.trackViewUrl && (
              <a
                href={track.trackViewUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 flex items-center justify-center gap-1.5 rounded-full border border-white/10 py-2.5 text-sm text-white/70 hover:border-white/25 hover:text-white"
              >
                Open in Apple Music
                <ExternalLink size={13} />
              </a>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailRow({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-1.5 text-white/40">
        {icon}
        {label}
      </span>
      <span className="text-white/80">{value}</span>
    </div>
  );
}
