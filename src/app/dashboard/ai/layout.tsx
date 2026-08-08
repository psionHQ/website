import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AILayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {children}
    </div>
  );
}
