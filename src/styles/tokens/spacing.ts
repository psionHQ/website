/**
 * PSIONHQ spacing tokens.
 * These mirror the Tailwind spacing scale used throughout the project
 * so that non-Tailwind contexts (e.g. CSS-in-JS) stay consistent.
 */
export const spacing = {
  /** Section vertical padding */
  section: {
    sm: "5rem",  // py-20  (80px)
    md: "6rem",  // py-24  (96px)
    lg: "8rem",  // py-32 (128px)
  },
  /** Container */
  container: {
    maxWidth: "80rem", // max-w-7xl (1280px)
    px: {
      sm: "1rem",    // px-4
      md: "1.5rem",  // px-6
      lg: "2rem",    // px-8
    },
  },
  /** Layout gaps */
  gap: {
    xs:  "0.75rem", // gap-3
    sm:  "1rem",    // gap-4
    md:  "1.5rem",  // gap-6
    lg:  "2rem",    // gap-8
    xl:  "3rem",    // gap-12
    "2xl": "5rem",  // gap-20
  },
} as const;
