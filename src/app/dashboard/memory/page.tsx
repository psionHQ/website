import type { Metadata } from "next";
import PageContainer from "@/components/dashboard/PageContainer";
import MemoryCard from "@/components/dashboard/MemoryCard";
import { DASHBOARD_PAGE_META } from "@/constants/dashboard";

export const metadata: Metadata = DASHBOARD_PAGE_META.memory;

export default function MemoryPage() {
  return (
    <PageContainer>
      <div className="mx-auto w-full max-w-2xl">
        <MemoryCard />
      </div>
    </PageContainer>
  );
}
