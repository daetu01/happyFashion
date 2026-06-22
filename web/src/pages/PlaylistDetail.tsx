import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Loader2, Plus, X, Trash2 } from "lucide-react";
import PageShell from "../components/PageShell";
import GlassCard from "../components/GlassCard";
import { useAuth } from "../lib/AuthContext";
import { searchMusic, type ItunesTrack } from "../lib/musicApi";
import {
  addMusicToPlaylist,
  deletePlaylist,
  getPlaylistDetail,
  removeMusicFromPlaylist,
  type PlaylistDetail as PlaylistDetailType,
} from "../lib/playlistApi";
import { ApiError } from "../lib/apiClient";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const } }),
};

export default function PlaylistDetail() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const id = Number(playlistId);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  const [playlist, setPlaylist] = useState<PlaylistDetailType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ItunesTrack[]>([]);
  const [searching, setSearching] = useState(false);
  const [addingId, setAddingId] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate("/login", { replace: true });
  }, [authLoading, isAuthenticated, navigate]);

  const loadPlaylist = () => {
    getPlaylistDetail(id)
      .then(setPlaylist)
      .catch(() => setError("Couldn't load this playlist."));
  };

  useEffect(() => {
    if (isAuthenticated && id) loadPlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, id]);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        setSearchResults(await searchMusic(query));
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  const handleAdd = async (track: ItunesTrack) => {
    setAddingId(track.trackId);
    try {
      await addMusicToPlaylist(id, track);
      loadPlaylist();
      setQuery("");
      setSearchResults([]);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't add that song.");
    } finally {
      setAddingId(null);
    }
  };

  const handleRemove = async (playlistMusicId: number) => {
    try {
      await removeMusicFromPlaylist(id, playlistMusicId);
      setPlaylist((prev) => (prev ? { ...prev, musics: prev.musics.filter((m) => m.playlistMusicId !== playlistMusicId) } : prev));
    } catch {
      setError("Couldn't remove that song.");
    }
  };

  const handleDeletePlaylist = async () => {
    if (!window.confirm("Delete this playlist? This can't be undone.")) return;
    setDeleting(true);
    try {
      await deletePlaylist(id);
      navigate("/library", { replace: true });
    } catch {
      setError("Couldn't delete this playlist.");
      setDeleting(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <PageShell back rightSlot={<span className="text-xs text-white/40">{playlist?.name}</span>}>
      <motion.div
        initial="hidden"
        animate="show"
        custom={0}
        variants={fadeUp}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {playlist?.name ?? "Playlist"}
          </h1>
          <p className="mt-2 text-sm text-white/55">{playlist?.musics.length ?? 0} songs</p>
        </div>
        <button
          onClick={handleDeletePlaylist}
          disabled={deleting}
          className="flex-shrink-0 rounded-full border border-white/10 p-2.5 text-white/40 hover:border-rose-400/40 hover:text-rose-400 disabled:opacity-50"
        >
          {deleting ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
        </button>
      </motion.div>

      {error && <p className="mb-4 text-sm text-rose-400">{error}</p>}

      <motion.div initial="hidden" animate="show" custom={0.05} variants={fadeUp} className="mb-6">
        <GlassCard className="p-5">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a song to add..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-9 text-sm text-white placeholder:text-white/35 outline-none focus:border-aura-400/50"
            />
            {searching && (
              <Loader2 size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 animate-spin text-white/35" />
            )}
          </div>
          {searchResults.length > 0 && (
            <div className="mt-3 max-h-56 space-y-1 overflow-y-auto">
              {searchResults.map((track) => (
                <div key={track.trackId} className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-white/5">
                  <img
                    src={track.artworkUrl100 ?? undefined}
                    alt=""
                    className="h-10 w-10 flex-shrink-0 rounded-lg bg-white/5 object-cover"
                  />
                  <span className="flex-1 overflow-hidden">
                    <span className="block truncate text-sm text-white/90">{track.trackName}</span>
                    <span className="block truncate text-xs text-white/45">{track.artistName}</span>
                  </span>
                  <button
                    onClick={() => handleAdd(track)}
                    disabled={addingId === track.trackId}
                    className="flex-shrink-0 rounded-full bg-aura-500/25 p-2 text-white/85 disabled:opacity-50"
                  >
                    {addingId === track.trackId ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Plus size={14} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </motion.div>

      <motion.div initial="hidden" animate="show" custom={0.1} variants={fadeUp}>
        <GlassCard className="p-3">
          {playlist === null && (
            <div className="flex items-center justify-center py-8 text-white/40">
              <Loader2 size={18} className="animate-spin" />
            </div>
          )}
          {playlist?.musics.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-white/35">
              No songs yet — search above to add some.
            </p>
          )}
          <div className="space-y-1">
            {playlist?.musics.map((track) => (
              <div
                key={track.playlistMusicId}
                className="flex items-center gap-2 rounded-xl px-2 py-2 hover:bg-white/5"
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
                <button
                  onClick={() => handleRemove(track.playlistMusicId)}
                  className="flex-shrink-0 rounded-full p-2 text-white/35 hover:text-rose-400"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </PageShell>
  );
}
