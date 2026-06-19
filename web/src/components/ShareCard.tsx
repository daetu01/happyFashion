import { forwardRef } from "react";
import type { AuraResult } from "../lib/generateAura";

export type ShareFormat = "story" | "square" | "landscape";

interface ShareCardProps {
  result: AuraResult;
  photoPreview: string | null;
  format: ShareFormat;
}

const ASPECT: Record<ShareFormat, string> = {
  story: "aspect-[9/16]",
  square: "aspect-square",
  landscape: "aspect-[16/9]",
};

const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(({ result, photoPreview, format }, ref) => {
  const isLandscape = format === "landscape";

  return (
    <div
      ref={ref}
      className={`relative w-full ${ASPECT[format]} overflow-hidden rounded-[2rem] bg-black`}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 10%, ${result.colorPalette[2]}55, transparent 55%), radial-gradient(circle at 85% 90%, ${result.colorPalette[1]}40, transparent 55%), #000000`,
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        className={`relative z-10 flex h-full w-full flex-col ${
          isLandscape ? "flex-row items-center justify-between p-8" : "justify-between p-7"
        }`}
      >
        <div className={isLandscape ? "flex flex-col items-start" : "flex items-center justify-between"}>
          <div className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 rounded-full bg-gradient-to-br from-aura-300 via-aura-500 to-pink-glow" />
            <span className="font-display text-sm font-bold tracking-tight text-white">aura</span>
          </div>
          {!isLandscape && (
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">My Aura</span>
          )}
        </div>

        <div className={isLandscape ? "flex flex-1 items-center justify-center gap-10 px-6" : "flex flex-col items-center text-center"}>
          {photoPreview && (
            <img
              src={photoPreview}
              alt=""
              className={`rounded-full object-cover ring-2 ring-white/20 ${
                isLandscape ? "h-28 w-28" : "mb-4 h-20 w-20"
              }`}
            />
          )}
          <div className="flex flex-col items-center">
            <span
              className={`font-display font-bold ${isLandscape ? "text-7xl" : "text-8xl"}`}
              style={{
                backgroundImage: "linear-gradient(90deg,#c39bff,#a76dff,#ff5fae)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {result.score}
            </span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.25em] text-white/40">Aura Score</span>
            <h2 className="font-display mt-4 text-2xl font-bold text-white">{result.vibeType}</h2>
            <p className="mt-1 max-w-[220px] text-sm text-white/55">{result.tagline}</p>
          </div>

          {isLandscape && (
            <div className="flex flex-col gap-2">
              {result.fashionMatch.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/75"
                >
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>

        {!isLandscape && (
          <div>
            <div className="mb-4 flex justify-center gap-2">
              {result.fashionMatch.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/75"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              {result.colorPalette.map((c) => (
                <span key={c} className="h-4 w-4 rounded-full ring-1 ring-white/15" style={{ backgroundColor: c }} />
              ))}
            </div>
            <p className="mt-4 text-center text-[10px] text-white/30">whatsyouraura.app</p>
          </div>
        )}
      </div>
    </div>
  );
});

ShareCard.displayName = "ShareCard";
export default ShareCard;
