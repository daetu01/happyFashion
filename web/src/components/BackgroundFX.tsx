export default function BackgroundFX() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-aura-600/30 blur-[120px] animate-float" />
        <div
          className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-pink-glow/20 blur-[120px] animate-float"
          style={{ animationDelay: "-2.5s" }}
        />
        <div
          className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-blue-glow/15 blur-[130px] animate-float"
          style={{ animationDelay: "-4.5s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 80%)",
          }}
        />
      </div>
      <div className="grain" />
    </>
  );
}
