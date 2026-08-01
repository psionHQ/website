/**
 * Skeleton placeholder card shown while dashboard data is loading.
 * Uses a simple CSS pulse animation that matches the dark design system.
 */
export default function LoadingCard({ rows = 1 }: { rows?: number }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5">
      <div className="h-3 w-1/3 animate-pulse rounded-full bg-foreground/[0.08]" />
      <div className="h-7 w-2/5 animate-pulse rounded-full bg-foreground/[0.06]" />
      {Array.from({ length: rows - 1 }).map((_, i) => (
        <div
          key={i}
          className="h-3 animate-pulse rounded-full bg-foreground/[0.05]"
          style={{ width: `${60 + (i % 3) * 10}%` }}
        />
      ))}
    </div>
  );
}
