"use client";

import type { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthProvider } from "@/providers/AuthProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <AuthProvider>{children}</AuthProvider>
    </ClerkProvider>
  );
}
