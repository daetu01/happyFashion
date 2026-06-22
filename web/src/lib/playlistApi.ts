import { apiFetch } from "./apiClient";
import { toTrackPayload, type ItunesTrack } from "./musicApi";

export interface Playlist {
  playlistId: number;
  name: string;
}

export interface PlaylistMusic extends ItunesTrack {
  playlistMusicId: number;
  musicId: number;
}

export interface PlaylistDetail extends Playlist {
  musics: PlaylistMusic[];
}

export function createPlaylist(name: string): Promise<void> {
  return apiFetch<void>("/api/playlists", { method: "POST", body: JSON.stringify({ name }) });
}

export function getMyPlaylists(): Promise<Playlist[]> {
  return apiFetch<Playlist[]>("/api/playlists");
}

export function getPlaylistDetail(playlistId: number): Promise<PlaylistDetail> {
  return apiFetch<PlaylistDetail>(`/api/playlists/${playlistId}`);
}

export function addMusicToPlaylist(playlistId: number, track: ItunesTrack): Promise<void> {
  return apiFetch<void>(`/api/playlists/${playlistId}/musics`, {
    method: "POST",
    body: JSON.stringify(toTrackPayload(track)),
  });
}

export function removeMusicFromPlaylist(playlistId: number, playlistMusicId: number): Promise<void> {
  return apiFetch<void>(`/api/playlists/${playlistId}/musics/${playlistMusicId}`, { method: "DELETE" });
}

export function deletePlaylist(playlistId: number): Promise<void> {
  return apiFetch<void>(`/api/playlists/${playlistId}`, { method: "DELETE" });
}
