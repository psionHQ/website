"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <motion.p
      variants={fadeUp}
      className={`text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50 ${className}`}
    >
      {children}
    </motion.p>
  );
}
