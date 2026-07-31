/**
 * PSIONHQ animation tokens.
 * Used directly in framer-motion variants and CSS transitions.
 */
export const animations = {
  duration: {
    fast:   0.3,
    normal: 0.5,
    slow:   0.7,
  },
  /** Custom cubic-bezier easing curves */
  ease: {
    /** Snappy deceleration — default for enter animations */
    out:   [0.22, 1, 0.36, 1] as [number, number, number, number],
    /** Standard material-style ease */
    inOut: [0.4, 0, 0.2, 1]   as [number, number, number, number],
  },
  /** Stagger children delay (seconds) */
  stagger: 0.1,
  /** Delay before first child animates */
  delayChildren: 0.1,
} as const;
