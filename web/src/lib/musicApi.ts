import { apiFetch } from "./apiClient";

export interface ItunesTrack {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string | null;
  artworkUrl100: string | null;
  previewUrl: string | null;
  trackViewUrl: string | null;
  primaryGenreName: string | null;
  releaseDate: string | null;
}

export interface LikedMusic extends ItunesTrack {
  likedMusicId: number;
  musicId: number;
}

/** Strips any extra fields (e.g. likedMusicId) so the payload matches what the backend expects. */
export function toTrackPayload(track: ItunesTrack): ItunesTrack {
  const {
    trackId,
    trackName,
    artistName,
    collectionName,
    artworkUrl100,
    previewUrl,
    trackViewUrl,
    primaryGenreName,
    releaseDate,
  } = track;
  return {
    trackId,
    trackName,
    artistName,
    collectionName,
    artworkUrl100,
    previewUrl,
    trackViewUrl,
    primaryGenreName,
    releaseDate,
  };
}

export function searchMusic(keyword: string): Promise<ItunesTrack[]> {
  if (!keyword.trim()) return Promise.resolve([]);
  return apiFetch<ItunesTrack[]>(`/api/music/search?keyword=${encodeURIComponent(keyword)}`);
}

export function likeMusic(track: ItunesTrack): Promise<void> {
  return apiFetch<void>("/api/music/likes", {
    method: "POST",
    body: JSON.stringify(toTrackPayload(track)),
  });
}

export function unlikeMusic(likedMusicId: number): Promise<void> {
  return apiFetch<void>(`/api/music/likes/${likedMusicId}`, { method: "DELETE" });
}

export function getLikedMusics(): Promise<LikedMusic[]> {
  return apiFetch<LikedMusic[]>("/api/music/likes");
}
