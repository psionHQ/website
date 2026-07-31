"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "muted" | "brand";
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "border-foreground/15 bg-foreground/[0.04] text-foreground/70",
  muted:   "border-foreground/10 bg-transparent text-foreground/50",
  brand:   "border-[#0066FF]/30 bg-[#0066FF]/[0.08] text-[#0066FF]",
};

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <motion.span
      variants={fadeIn}
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
}
