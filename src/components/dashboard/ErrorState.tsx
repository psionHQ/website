"use client";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

/**
 * Error panel shown when a dashboard section fails to load.
 */
export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-red-500/20 bg-red-500/[0.04] px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 text-red-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold text-foreground/80">{title}</h3>
        <p className="max-w-xs text-sm leading-relaxed text-foreground/50">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-lg border border-foreground/15 px-4 py-2 text-xs font-medium text-foreground/70 transition-colors hover:border-foreground/25 hover:text-foreground"
        >
          Try again
        </button>
      )}
    </div>
  );
}
