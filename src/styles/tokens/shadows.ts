/**
 * PSIONHQ shadow tokens.
 * On a dark background, shadows are primarily expressed as
 * subtle border highlights and coloured glow effects.
 */
export const shadows = {
  /** Subtle 1 px inset border highlight for cards */
  card: "0 0 0 1px rgba(255,255,255,0.05)",
  cardHover: "0 0 0 1px rgba(255,255,255,0.10)",
  /** Brand-blue ambient glow — use on hero / CTA backgrounds */
  glow: {
    blue:        "0 0  80px rgba(0,102,255,0.12)",
    blueStrong:  "0 0 120px rgba(0,102,255,0.22)",
  },
  /** Dropdown / floating element */
  popover: "0 8px 32px rgba(0,0,0,0.6)",
} as const;
