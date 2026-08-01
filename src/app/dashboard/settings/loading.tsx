import LoadingCard from "@/components/dashboard/LoadingCard";
import PageContainer from "@/components/dashboard/PageContainer";

export default function Loading() {
  return (
    <PageContainer>
      <div className="h-12 w-full animate-pulse rounded-xl bg-foreground/[0.04]" />
      <LoadingCard rows={8} />
    </PageContainer>
  );
}
