import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Wraps each dashboard page with consistent padding and max-width constraints.
 */
export default function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`flex flex-1 flex-col gap-8 p-6 sm:p-8 lg:p-10 ${className}`}>
      {children}
    </div>
  );
}
