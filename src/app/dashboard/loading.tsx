import LoadingCard from "@/components/dashboard/LoadingCard";
import PageContainer from "@/components/dashboard/PageContainer";

export default function DashboardLoading() {
  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-6 w-32 animate-pulse rounded-full bg-foreground/[0.08]" />
        <LoadingCard rows={6} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-6 w-28 animate-pulse rounded-full bg-foreground/[0.08]" />
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <LoadingCard key={i} rows={3} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
