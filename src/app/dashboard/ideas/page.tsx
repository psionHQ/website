import type { Metadata } from "next";
import PageContainer from "@/components/dashboard/PageContainer";
import IdeasCard from "@/components/dashboard/IdeasCard";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";

export const metadata: Metadata = DASHBOARD_PAGE_META.ideas;

export default function IdeasPage() {
  return (
    <PageContainer>
      <div className="mx-auto w-full max-w-2xl">
        <IdeasCard />
      </div>
    </PageContainer>
  );
}
