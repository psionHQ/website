import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Enable hover border/background transition */
  hover?: boolean;
  /** Apply the elevated surface background instead of subtle overlay */
  elevated?: boolean;
}

/**
 * PSIONHQ base card — a rounded container with the brand border and
 * optional hover effect, following the dark design system.
 */
export default function Card({
  children,
  className = "",
  hover = true,
  elevated = false,
}: CardProps) {
  const base = "rounded-2xl border border-foreground/10";
  const bg = elevated ? "bg-[#0D0D0D]" : "bg-foreground/[0.02]";
  const hoverClass = hover
    ? "transition-colors hover:border-foreground/20 hover:bg-foreground/[0.04]"
    : "";

  return (
    <div className={`${base} ${bg} ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
