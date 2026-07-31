"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "link";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF]/50 disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-[#0066FF] text-white hover:bg-[#0040CC]",
  secondary:
    "rounded-full border border-white/20 text-white hover:border-white/40 hover:bg-white/[0.06]",
  ghost:
    "rounded-full text-foreground/70 hover:bg-foreground/[0.06] hover:text-foreground",
  link:
    "text-[#0066FF] hover:text-[#0040CC] underline-offset-4 hover:underline",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-xs",
  md: "h-11 px-7 text-sm",
};

/**
 * Returns the Tailwind class string for a button variant + size.
 * Useful for applying the design system to `<Link>` or other elements.
 */
export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  const sizeClass = variant === "link" ? "" : SIZES[size];
  return [BASE, VARIANTS[variant], sizeClass, extra].filter(Boolean).join(" ");
}

// ─── Button ───────────────────────────────────────────────────────────────────

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

// ─── ButtonLink ───────────────────────────────────────────────────────────────

type ButtonLinkOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonLinkProps = ButtonLinkOwnProps & Omit<LinkProps, keyof ButtonLinkOwnProps>;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

export default Button;
