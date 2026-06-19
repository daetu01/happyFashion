import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { Download, Link2, Check, Aperture, Music4 } from "lucide-react";
import clsx from "clsx";
import PageShell from "../components/PageShell";
import Button from "../components/Button";
import ShareCard, { type ShareFormat } from "../components/ShareCard";
import { useAura } from "../lib/AuraContext";

const PLATFORMS: { id: ShareFormat; label: string; icon: React.ReactNode }[] = [
  { id: "story", label: "Instagram", icon: <Aperture size={15} /> },
  { id: "story", label: "TikTok", icon: <Music4 size={15} /> },
  { id: "landscape", label: "X", icon: <span className="font-display text-[13px] font-bold">X</span> },
  { id: "square", label: "Discord", icon: <span className="font-display text-[13px] font-bold">D</span> },
];

export default function Share() {
  const navigate = useNavigate();
  const { result, photoPreview } = useAura();
  const [format, setFormat] = useState<ShareFormat>("story");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!result) navigate("/upload", { replace: true });
  }, [result, navigate]);

  if (!result) return null;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = `aura-${result.vibeType.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + "/results");
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <PageShell back>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <h1 className="font-display text-3xl font-bold tracking-tight">Share your aura</h1>
        <p className="mt-2 text-sm text-white/55">Pick a format and post it everywhere.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center gap-2"
      >
        {PLATFORMS.map((p) => (
          <button
            key={p.label}
            onClick={() => setFormat(p.id)}
            className={clsx(
              "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
              format === p.id
                ? "border-aura-400/50 bg-aura-500/15 text-white"
                : "border-white/10 text-white/55 hover:text-white/85",
            )}
          >
            {p.icon}
            {p.label}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mx-auto mt-6 max-w-[280px]"
      >
        <div className="relative">
          <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-aura-600/20 blur-3xl" />
          <ShareCard ref={cardRef} result={result} photoPreview={photoPreview} format={format} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 flex flex-col gap-3"
      >
        <Button size="lg" className="w-full" onClick={handleDownload} disabled={downloading} icon={<Download size={18} />}>
          {downloading ? "Preparing..." : "Download Image"}
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={handleCopyLink}
          icon={copied ? <Check size={18} /> : <Link2 size={18} />}
        >
          {copied ? "Link Copied" : "Copy Link"}
        </Button>
        <button
          onClick={() => navigate("/results")}
          className="mt-1 text-center text-sm text-white/40 hover:text-white/70"
        >
          Back to results
        </button>
      </motion.div>
    </PageShell>
  );
}
