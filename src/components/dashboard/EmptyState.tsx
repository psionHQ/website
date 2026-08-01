import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

/**
 * Centered empty-state panel shown when a dashboard section has no data yet.
 */
export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-16 text-center">
      {icon && (
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-foreground/40">
          {icon}
        </span>
      )}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-foreground/80">{title}</h3>
        <p className="max-w-xs text-sm leading-relaxed text-foreground/50">{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
