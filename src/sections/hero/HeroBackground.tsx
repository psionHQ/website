export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-foreground/5 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-72 w-72 translate-x-1/4 rounded-full bg-foreground/5 blur-3xl" />
    </div>
  );
}
