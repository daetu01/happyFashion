export interface InterestTag {
  id: string;
  label: string;
  group: "music" | "games" | "aesthetic";
}

export const INTEREST_TAGS: InterestTag[] = [
  { id: "hyperpop", label: "Hyperpop", group: "music" },
  { id: "drill", label: "Drill", group: "music" },
  { id: "rnb", label: "R&B", group: "music" },
  { id: "lofi", label: "Lo-fi", group: "music" },
  { id: "afrobeats", label: "Afrobeats", group: "music" },
  { id: "phonk", label: "Phonk", group: "music" },
  { id: "indie", label: "Indie", group: "music" },
  { id: "kpop", label: "K-pop", group: "music" },
  { id: "valorant", label: "Valorant", group: "games" },
  { id: "lol", label: "League of Legends", group: "games" },
  { id: "genshin", label: "Genshin Impact", group: "games" },
  { id: "minecraft", label: "Minecraft", group: "games" },
  { id: "fortnite", label: "Fortnite", group: "games" },
  { id: "eldenring", label: "Elden Ring", group: "games" },
  { id: "anime", label: "Anime", group: "aesthetic" },
  { id: "streetwear", label: "Streetwear", group: "aesthetic" },
  { id: "skating", label: "Skateboarding", group: "aesthetic" },
  { id: "photography", label: "Photography", group: "aesthetic" },
  { id: "cars", label: "Car Culture", group: "aesthetic" },
  { id: "gym", label: "Gym Rat", group: "aesthetic" },
];

export interface VibeTemplate {
  id: string;
  vibeType: string;
  tagline: string;
  description: string;
  stats: {
    streetEnergy: number;
    midnightVibes: number;
    luxuryEnergy: number;
    creativeAura: number;
  };
  similarArtists: string[];
  fashionMatch: string[];
  colorPalette: string[];
}

export const VIBE_TEMPLATES: VibeTemplate[] = [
  {
    id: "midnight-rebel",
    vibeType: "Midnight Rebel",
    tagline: "you move different after dark",
    description:
      "You radiate restless, magnetic energy — equal parts chaos and control. People feel your presence before they see you. Your aura thrives in low light, fast tempos, and rooms that don't make the guest list.",
    stats: { streetEnergy: 92, midnightVibes: 88, luxuryEnergy: 41, creativeAura: 79 },
    similarArtists: ["Travis Scott", "The Weeknd", "Central Cee"],
    fashionMatch: ["Streetwear", "Techwear", "Minimal Dark"],
    colorPalette: ["#0a0014", "#6d28d9", "#a855f7", "#ec4899", "#1f0a2e"],
  },
  {
    id: "cyber-romantic",
    vibeType: "Cyber Romantic",
    tagline: "soft core, hard drive",
    description:
      "You're a glitch in the algorithm with a soft heart — sentimental but online. Your aura blends nostalgia with neon, like a love letter sent through a broken router. Sad bangers hit different in your world.",
    stats: { streetEnergy: 58, midnightVibes: 81, luxuryEnergy: 54, creativeAura: 90 },
    similarArtists: ["Lana Del Rey", "Bladee", "Beabadoobee"],
    fashionMatch: ["Y2K Revival", "Cybercore", "Soft Grunge"],
    colorPalette: ["#02030f", "#3b82f6", "#a76dff", "#f5d0fe", "#0e1b3d"],
  },
  {
    id: "golden-main-character",
    vibeType: "Golden Hour Main Character",
    tagline: "the world is your backdrop",
    description:
      "Warm, confident, impossible to look away from. Your aura is built for slow-motion walking shots and group chats that go quiet when you post. You don't chase trends — you start them.",
    stats: { streetEnergy: 64, midnightVibes: 47, luxuryEnergy: 88, creativeAura: 73 },
    similarArtists: ["Dominic Fike", "Doja Cat", "Tyler, The Creator"],
    fashionMatch: ["Old Money", "Coastal Grandchild", "Elevated Basics"],
    colorPalette: ["#1a0f02", "#f59e0b", "#fde68a", "#ec4899", "#3d1f08"],
  },
  {
    id: "feral-gremlin",
    vibeType: "Feral Gremlin Energy",
    tagline: "unhinged but make it cute",
    description:
      "Chaotic good, terminally online, allergic to a normal Tuesday. Your aura is loud, fast, and a little unpredictable — like seven energy drinks and a group project. People keep you around because you make everything funnier.",
    stats: { streetEnergy: 71, midnightVibes: 69, luxuryEnergy: 22, creativeAura: 95 },
    similarArtists: ["100 gecs", "Ice Spice", "Rico Nasty"],
    fashionMatch: ["Maximalist", "Y2K Chaos", "DIY Punk"],
    colorPalette: ["#0a0d02", "#84cc16", "#facc15", "#a855f7", "#1a1f08"],
  },
  {
    id: "quiet-luxury-ghost",
    vibeType: "Quiet Luxury Ghost",
    tagline: "expensive silence",
    description:
      "Understated, unbothered, never overexplaining. Your aura whispers instead of shouts — and somehow that's louder than everyone else in the room. You read as old money even if your bank app disagrees.",
    stats: { streetEnergy: 39, midnightVibes: 60, luxuryEnergy: 94, creativeAura: 56 },
    similarArtists: ["Frank Ocean", "Sade", "James Blake"],
    fashionMatch: ["Minimal Dark", "Quiet Luxury", "Tailored Neutrals"],
    colorPalette: ["#070708", "#3f3f46", "#a1a1aa", "#8b3dff", "#18181b"],
  },
  {
    id: "dream-pop-drifter",
    vibeType: "Dream Pop Drifter",
    tagline: "lives in the in-between",
    description:
      "Hazy, introspective, a little ethereal. Your aura floats somewhere between a memory and a daydream — comfortable in silence, fluent in eye contact across a room. You feel things in widescreen.",
    stats: { streetEnergy: 33, midnightVibes: 76, luxuryEnergy: 48, creativeAura: 87 },
    similarArtists: ["Clairo", "Boy Pablo", "Mitski"],
    fashionMatch: ["Soft Grunge", "Indie Sleaze", "Vintage Layers"],
    colorPalette: ["#0c0a14", "#818cf8", "#fbcfe8", "#a76dff", "#1e1b3a"],
  },
];

export const LOADING_MESSAGES = [
  "Analyzing facial energy...",
  "Reading your color signature...",
  "Comparing music patterns...",
  "Cross-referencing 40,000 vibes...",
  "Calculating aura signature...",
  "Detecting main character frequency...",
  "Generating vibe profile...",
];
