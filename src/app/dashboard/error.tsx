"use client";

import ErrorState from "@/components/dashboard/ErrorState";
import PageContainer from "@/components/dashboard/PageContainer";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageContainer>
      <ErrorState
        title="Dashboard unavailable"
        message="We were unable to load your dashboard. Please try again."
        onRetry={reset}
      />
    </PageContainer>
  );
}
