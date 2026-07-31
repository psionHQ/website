/**
 * PSIONHQ brand color tokens.
 * Use these constants for inline styles, framer-motion targets, or
 * any context where a Tailwind class is not available.
 * In components, prefer the corresponding Tailwind utilities or
 * the CSS custom properties (e.g. var(--brand-blue)).
 */
export const colors = {
  /** Primary action / accent — #0066FF */
  primaryBlue: "#0066FF",
  /** Hover / active state of primaryBlue — #0040CC */
  deepBlue: "#0040CC",
  /** Neutral accent / metallic — #C0C0C0 */
  silver: "#C0C0C0",
  /** Page background — pure black */
  background: "#000000",
  /** Elevated surface (cards, modals) */
  surface: "#0D0D0D",
  /** Subtle border */
  border: "#1A1A1A",
  /** Primary text */
  foreground: "#FFFFFF",
} as const;

export type ColorToken = (typeof colors)[keyof typeof colors];
