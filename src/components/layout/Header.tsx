"use client";

import { usePathname } from "next/navigation";
import { DASHBOARD_ROOT_ROUTE } from "@/constants/routes";
import Navbar from "@/components/navbar/Navbar";
import Container from "./Container";

export default function Header() {
  const pathname = usePathname();

  if (pathname.startsWith(DASHBOARD_ROOT_ROUTE)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <Navbar />
      </Container>
    </header>
  );
}
