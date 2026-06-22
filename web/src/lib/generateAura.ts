import { VIBE_TEMPLATES, type VibeTemplate } from "./data";

export interface AuraInput {
  hasPhoto: boolean;
  musicTaste: string[];
  artistNames: string[];
  interests: string[];
}

export interface AuraResult extends VibeTemplate {
  score: number;
}

function hashString(input: string): number {
  let hash = 7;
  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function generateAuraResult(input: AuraInput): AuraResult {
  const seedKey =
    [...input.interests].sort().join("|") +
    [...input.musicTaste].sort().join("|") +
    (input.hasPhoto ? "photo" : "");
  const seed = hashString(seedKey || "default-aura-seed");
  const rng = mulberry32(seed);

  const template = VIBE_TEMPLATES[Math.floor(rng() * VIBE_TEMPLATES.length)];

  const jitter = (base: number) => clamp(Math.round(base + (rng() - 0.5) * 14), 5, 99);

  const stats = {
    streetEnergy: jitter(template.stats.streetEnergy),
    midnightVibes: jitter(template.stats.midnightVibes),
    luxuryEnergy: jitter(template.stats.luxuryEnergy),
    creativeAura: jitter(template.stats.creativeAura),
  };

  const avg = (stats.streetEnergy + stats.midnightVibes + stats.luxuryEnergy + stats.creativeAura) / 4;
  const score = clamp(Math.round(avg * 0.55 + 38 + rng() * 6), 64, 99);

  const realArtist = input.artistNames.find(
    (name) => !template.similarArtists.some((a) => a.toLowerCase() === name.toLowerCase()),
  );
  const similarArtists = realArtist
    ? [realArtist, ...template.similarArtists.slice(0, 2)]
    : template.similarArtists;

  return { ...template, stats, score, similarArtists };
}
