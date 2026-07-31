"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

interface DividerProps {
  className?: string;
}

export default function Divider({ className = "" }: DividerProps) {
  return (
    <motion.hr
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`border-t border-foreground/10 ${className}`}
    />
  );
}
