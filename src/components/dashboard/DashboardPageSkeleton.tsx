import LoadingCard from "@/components/dashboard/LoadingCard";
import PageContainer from "@/components/dashboard/PageContainer";

interface DashboardPageSkeletonProps {
  variant?: "overview" | "module" | "settings";
}

export default function DashboardPageSkeleton({ variant = "module" }: DashboardPageSkeletonProps) {
  if (variant === "settings") {
    return (
      <PageContainer>
        <div className="h-12 w-full max-w-3xl animate-pulse rounded-2xl border border-foreground/10 bg-foreground/[0.03]" />
        <LoadingCard rows={8} />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <LoadingCard key={index} rows={2} />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <LoadingCard rows={variant === "overview" ? 6 : 5} />
        <LoadingCard rows={5} />
      </div>
      <LoadingCard rows={6} />
    </PageContainer>
  );
}
