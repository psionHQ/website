export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Primary brand-blue radial glow — top centre */}
      <div className="absolute top-0 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#0066FF]/[0.10] blur-[140px]" />
      {/* Secondary mid-glow — centred */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/[0.06] blur-[100px]" />
      {/* Accent orb bottom-right */}
      <div className="absolute right-0 bottom-0 h-[420px] w-[420px] translate-x-1/3 translate-y-1/4 rounded-full bg-[#0066FF]/[0.12] blur-[110px]" />
      {/* Soft neutral orb bottom-left */}
      <div className="absolute left-0 bottom-1/4 h-80 w-80 -translate-x-1/2 rounded-full bg-foreground/[0.03] blur-[90px]" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
