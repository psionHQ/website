import LoadingCard from "@/components/dashboard/LoadingCard";
import PageContainer from "@/components/dashboard/PageContainer";

export default function Loading() {
  return (
    <PageContainer>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-6 w-36 animate-pulse rounded-full bg-foreground/[0.08]" />
        <LoadingCard rows={5} />
      </div>
    </PageContainer>
  );
}
