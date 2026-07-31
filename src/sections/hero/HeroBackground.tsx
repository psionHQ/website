export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Radial gradient top-centre */}
      <div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-foreground/[0.04] blur-[120px]" />
      {/* Accent orb bottom-right */}
      <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 translate-y-1/4 rounded-full bg-foreground/[0.06] blur-[100px]" />
      {/* Accent orb bottom-left */}
      <div className="absolute left-0 bottom-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-foreground/[0.04] blur-[80px]" />
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
