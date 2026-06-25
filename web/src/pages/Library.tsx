import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ChevronRight, Plus, Loader2, ListMusic } from "lucide-react";
import PageShell from "../components/PageShell";
import GlassCard from "../components/GlassCard";
import AddToPlaylistMenu from "../components/AddToPlaylistMenu";
import TrackDetailModal from "../components/TrackDetailModal";
import { useAuth } from "../lib/AuthContext";
import { getLikedMusics, unlikeMusic, type LikedMusic } from "../lib/musicApi";
import { createPlaylist, getMyPlaylists, type Playlist } from "../lib/playlistApi";
import { ApiError } from "../lib/apiClient";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const } }),
};

export default function Library() {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [liked, setLiked] = useState<LikedMusic[] | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<LikedMusic | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate("/login", { replace: true });
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (!isAuthenticated) return;
    getLikedMusics().then(setLiked).catch(() => setLiked([]));
    getMyPlaylists().then(setPlaylists).catch(() => setPlaylists([]));
  }, [isAuthenticated]);

  const handleUnlike = async (likedMusicId: number) => {
    try {
      await unlikeMusic(likedMusicId);
      setLiked((prev) => prev?.filter((l) => l.likedMusicId !== likedMusicId) ?? null);
    } catch {
      setError("Couldn't remove like. Try again.");
    }
  };

  const handleCreatePlaylist = async () => {
    if (!newName.trim() || creating) return;
    setCreating(true);
    setError(null);
    try {
      await createPlaylist(newName.trim());
      setNewName("");
      const updated = await getMyPlaylists();
      setPlaylists(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't create playlist.");
    } finally {
      setCreating(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <PageShell back>
      <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp} className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your library</h1>
        <p className="mt-2 text-sm text-white/55">Liked songs and playlists, saved to your account.</p>
      </motion.div>

      {error && <p className="mb-4 text-sm text-rose-400">{error}</p>}

      <motion.div initial="hidden" animate="show" custom={0.05} variants={fadeUp} className="mb-6">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
          <Heart size={14} /> Liked Songs
        </h2>
        <GlassCard className="p-3">
          {liked === null && (
            <div className="flex items-center justify-center py-8 text-white/40">
              <Loader2 size={18} className="animate-spin" />
            </div>
          )}
          {liked?.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-white/35">
              No liked songs yet — search for music in Upload to like some.
            </p>
          )}
          <div className="space-y-1">
            {liked?.map((track) => (
              <div key={track.likedMusicId} className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-white/5">
                <button
                  onClick={() => setSelectedTrack(track)}
                  className="flex flex-1 items-center gap-2 overflow-hidden text-left"
                >
                  <img
                    src={track.artworkUrl100 ?? undefined}
                    alt=""
                    className="h-11 w-11 flex-shrink-0 rounded-lg bg-white/5 object-cover"
                  />
                  <span className="flex-1 overflow-hidden">
                    <span className="block truncate text-sm text-white/90">{track.trackName}</span>
                    <span className="block truncate text-xs text-white/45">{track.artistName}</span>
                  </span>
                </button>
                <AddToPlaylistMenu track={track} />
                <button
                  onClick={() => handleUnlike(track.likedMusicId)}
                  className="flex-shrink-0 rounded-full p-2 text-pink-glow hover:bg-white/5"
                >
                  <Heart size={16} className="fill-pink-glow" />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial="hidden" animate="show" custom={0.1} variants={fadeUp}>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-white/40">
          <ListMusic size={14} /> Playlists
        </h2>
        <GlassCard className="p-3">
          <div className="mb-2 flex items-center gap-1.5 border-b border-white/5 px-1 pb-3">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) handleCreatePlaylist();
              }}
              placeholder="New playlist name..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-aura-400/50"
            />
            <button
              onClick={handleCreatePlaylist}
              disabled={!newName.trim() || creating}
              className="flex-shrink-0 rounded-xl bg-aura-500/25 p-2.5 text-white/85 disabled:opacity-40"
            >
              {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            </button>
          </div>

          {playlists === null && (
            <div className="flex items-center justify-center py-8 text-white/40">
              <Loader2 size={18} className="animate-spin" />
            </div>
          )}
          {playlists?.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-white/35">No playlists yet — create your first one above.</p>
          )}
          <div className="space-y-1">
            {playlists?.map((p) => (
              <Link
                key={p.playlistId}
                to={`/library/playlists/${p.playlistId}`}
                className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-white/5"
              >
                <span className="text-sm font-medium text-white/85">{p.name}</span>
                <ChevronRight size={16} className="text-white/30" />
              </Link>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <TrackDetailModal track={selectedTrack} onClose={() => setSelectedTrack(null)} />
    </PageShell>
  );
}
