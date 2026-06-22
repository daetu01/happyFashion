import { useEffect, useRef, useState } from "react";
import { Plus, Check, Loader2 } from "lucide-react";
import type { ItunesTrack } from "../lib/musicApi";
import { addMusicToPlaylist, createPlaylist, getMyPlaylists, type Playlist } from "../lib/playlistApi";
import { ApiError } from "../lib/apiClient";

interface AddToPlaylistMenuProps {
  track: ItunesTrack;
}

export default function AddToPlaylistMenu({ track }: AddToPlaylistMenuProps) {
  const [open, setOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const [busyId, setBusyId] = useState<number | "new" | null>(null);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickAway = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [open]);

  const loadPlaylists = () => {
    getMyPlaylists()
      .then(setPlaylists)
      .catch(() => setPlaylists([]));
  };

  const handleOpen = () => {
    setOpen((v) => !v);
    setError(null);
    if (!playlists) loadPlaylists();
  };

  const handleAdd = async (playlistId: number) => {
    setBusyId(playlistId);
    setError(null);
    try {
      await addMusicToPlaylist(playlistId, track);
      setAddedId(playlistId);
      setTimeout(() => setOpen(false), 700);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't add to playlist.");
    } finally {
      setBusyId(null);
    }
  };

  const handleCreateAndAdd = async () => {
    if (!newName.trim()) return;
    setBusyId("new");
    setError(null);
    try {
      await createPlaylist(newName.trim());
      const updated = await getMyPlaylists();
      setPlaylists(updated);
      const created = updated.find((p) => p.name === newName.trim());
      setNewName("");
      if (created) await handleAdd(created.playlistId);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't create playlist.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleOpen}
        className="flex-shrink-0 rounded-full p-2 text-white/35 transition-colors hover:text-aura-300"
      >
        <Plus size={16} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-2xl glass-strong p-2 shadow-xl">
          <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-white/35">Add to playlist</p>
          <div className="max-h-40 overflow-y-auto">
            {playlists === null && (
              <div className="flex items-center justify-center py-3 text-white/40">
                <Loader2 size={14} className="animate-spin" />
              </div>
            )}
            {playlists?.length === 0 && <p className="px-2 py-2 text-xs text-white/35">No playlists yet</p>}
            {playlists?.map((p) => (
              <button
                key={p.playlistId}
                onClick={() => handleAdd(p.playlistId)}
                disabled={busyId === p.playlistId}
                className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm text-white/85 hover:bg-white/5 disabled:opacity-60"
              >
                <span className="truncate">{p.name}</span>
                {busyId === p.playlistId ? (
                  <Loader2 size={13} className="animate-spin text-white/40" />
                ) : addedId === p.playlistId ? (
                  <Check size={13} className="text-aura-300" />
                ) : null}
              </button>
            ))}
          </div>

          {error && <p className="px-2 py-1 text-[11px] text-rose-400">{error}</p>}

          <div className="mt-1 flex items-center gap-1 border-t border-white/5 pt-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New playlist name"
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5 text-xs text-white placeholder:text-white/30 outline-none focus:border-aura-400/50"
            />
            <button
              onClick={handleCreateAndAdd}
              disabled={!newName.trim() || busyId === "new"}
              className="flex-shrink-0 rounded-lg bg-aura-500/25 px-2 py-1.5 text-white/85 disabled:opacity-40"
            >
              {busyId === "new" ? <Loader2 size={13} className="animate-spin" /> : <Plus size={13} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
