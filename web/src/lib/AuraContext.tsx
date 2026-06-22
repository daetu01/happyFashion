import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { generateAuraResult, type AuraResult } from "./generateAura";
import type { ItunesTrack } from "./musicApi";

interface AuraContextValue {
  photoPreview: string | null;
  setPhotoPreview: (value: string | null) => void;
  selectedTracks: ItunesTrack[];
  addTrack: (track: ItunesTrack) => void;
  removeTrack: (trackId: number) => void;
  interests: string[];
  toggleInterest: (id: string) => void;
  result: AuraResult | null;
  runAnalysis: () => AuraResult;
}

const AuraContext = createContext<AuraContextValue | null>(null);

export function AuraProvider({ children }: { children: ReactNode }) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [selectedTracks, setSelectedTracks] = useState<ItunesTrack[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [result, setResult] = useState<AuraResult | null>(null);

  const toggleInterest = (id: string) => {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const addTrack = (track: ItunesTrack) => {
    setSelectedTracks((prev) => (prev.some((t) => t.trackId === track.trackId) ? prev : [...prev, track]));
  };

  const removeTrack = (trackId: number) => {
    setSelectedTracks((prev) => prev.filter((t) => t.trackId !== trackId));
  };

  const runAnalysis = () => {
    const generated = generateAuraResult({
      hasPhoto: !!photoPreview,
      musicTaste: selectedTracks.map((t) => `${t.trackName}-${t.artistName}`),
      artistNames: [...new Set(selectedTracks.map((t) => t.artistName))],
      interests,
    });
    setResult(generated);
    return generated;
  };

  const value = useMemo(
    () => ({
      photoPreview,
      setPhotoPreview,
      selectedTracks,
      addTrack,
      removeTrack,
      interests,
      toggleInterest,
      result,
      runAnalysis,
    }),
    [photoPreview, selectedTracks, interests, result],
  );

  return <AuraContext.Provider value={value}>{children}</AuraContext.Provider>;
}

export function useAura() {
  const ctx = useContext(AuraContext);
  if (!ctx) throw new Error("useAura must be used within AuraProvider");
  return ctx;
}
