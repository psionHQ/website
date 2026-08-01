# Brand Guidelines

This document describes the PSIONHQ brand identity and design system as implemented in the website codebase.

---

## Table of Contents

- [Brand Identity](#brand-identity)
- [Logo and Wordmark](#logo-and-wordmark)
- [Colour System](#colour-system)
- [Typography](#typography)
- [Design Principles](#design-principles)
- [Component Patterns](#component-patterns)
- [Animation Language](#animation-language)
- [Iconography](#iconography)
- [Tone of Voice](#tone-of-voice)

---

## Brand Identity

**Name:** PSIONHQ

**Symbol:** Ψ (Psi — the Greek letter representing mind, psyche, and intelligence)

**Primary tagline:** The Operating System for Intelligence

**Secondary tagline:** The Infrastructure for Human Intelligence

**Secondary brand descriptors:**
- Your second brain. Built for you.
- Sovereign AI, encrypted vaults, digital identity, and self-custodied wallets — unified into one platform built for the future of secure infrastructure.

---

## Logo and Wordmark

### Logomark

The PSIONHQ logomark is a Ψ (Psi) symbol rendered in white on a brand-blue rounded square (`rx="7"`, 32×32 viewBox).

The Ψ is composed of three elements:
- **Stem:** A vertical line from top to bottom centre
- **Arch:** A curved path forming the arms of Ψ (from x=10 to x=22, peaking at y=12 and reaching to y=19.5 at centre)
- **Base serif:** A horizontal line at the base of the stem

Implementation: `src/components/navbar/Logo.tsx` (28px rendered size) and `src/sections/footer/FooterSection.tsx` (22px rendered size).

### Wordmark

The wordmark is the text **PSIONHQ** rendered in:
- Font: `font-semibold tracking-tight` (heading font stack)
- Size: `text-base` (navbar), `text-sm` (footer)
- Colour: `text-foreground` with `group-hover:text-foreground/90` transition

### Hero Ψ Symbol

On the home page hero, the Ψ is rendered as a large text character:
- Size: `text-4xl sm:text-5xl`
- Colour: `text-[#0066FF]`
- Text shadow: `0 0 24px #0066FF, 0 0 48px #0066FF80`
- Container: 80×80px (96×96 on sm+) rounded circle with brand-blue border and background
- Animated glow rings surround it (Framer Motion, continuous pulse)

### OG / Social Image

Dimensions: 1200 × 630px  
Referenced in metadata: `/og-image.png`  
**Status: Not yet created.** The file is referenced in `src/app/layout.tsx` but does not exist in `public/`.

---

## Colour System

### Brand Palette

| Token | Hex | Usage |
|---|---|---|
| `--brand-blue` | `#0066FF` | Primary action colour, accent, links, brand elements |
| `--brand-deep-blue` | `#0040CC` | Hover/active state of primary blue |
| `--background` | `#000000` | Page background — pure black |
| `--surface` | `#0D0D0D` | Elevated surfaces (cards on modal, elevated cards) |
| `--border` | `#1A1A1A` | Subtle borders |
| `--foreground` | `#FFFFFF` | Primary text — pure white |
| `--brand-silver` | `#C0C0C0` | Neutral accent / metallic |

### Opacity Modifiers

Tailwind CSS opacity modifiers are used extensively to create the visual hierarchy on the black background:

| Class | Usage |
|---|---|
| `bg-foreground/[0.02]` | Default card background |
| `bg-foreground/[0.03]–[0.06]` | Subtle elevated surfaces |
| `border-foreground/10` | Default border (5% white) |
| `border-foreground/15–/20` | Hover border states |
| `text-foreground/60` | Secondary body text |
| `text-foreground/50` | Tertiary / label text |
| `text-foreground/40–/30` | Muted / timestamp text |
| `bg-[#0066FF]/[0.04]–/[0.12]` | Brand-tinted surfaces |
| `border-[#0066FF]/20–/40` | Brand-tinted borders |

### Glow Effects

Blue radial glow effects are used as decorative background elements:

```css
/* Hero section — primary glow */
bg-[#0066FF]/[0.10] blur-[140px] — 1100×700px, top centre

/* Sections — ambient glow */
bg-[#0066FF]/[0.07] blur-[120px] — 800×500px

/* CTA section — featured glow */
bg-[#0066FF]/[0.15] blur-[80px] — 288×288px
```

---

## Typography

### Font Stack

The design system defines three font families as CSS custom properties:

| Variable | Description | Tailwind class |
|---|---|---|
| `--font-sans` | Body copy — Inter-style sans-serif | Default (body) |
| `--font-heading` | Headings — Space Grotesk-style geometric | `font-heading` |
| `--font-mono` | Code and technical labels | `font-mono` |

**Current status:** Both `--font-inter` and `--font-space-grotesk` are referenced in the font stacks but neither is loaded. The site currently renders with system font fallbacks. Loading these fonts via `next/font/google` is a planned improvement.

### Type Scale

| Usage | Classes |
|---|---|
| Hero headline | `text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight` |
| Section headline | `text-3xl sm:text-4xl font-semibold tracking-tight` |
| Page hero headline | `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight` |
| Card headline | `text-xl font-semibold tracking-tight` |
| Body | `text-base leading-relaxed` |
| Secondary body | `text-sm leading-relaxed` |
| Label / eyebrow | `text-xs font-semibold uppercase tracking-[0.2em]` |
| Monospace tag | `font-mono text-xs` |

### Text Colour

- Primary: `text-foreground` (white)
- Secondary: `text-foreground/80` (80% white)
- Body copy: `text-foreground/60` (60% white)
- Muted: `text-foreground/50` (50% white)
- Disabled / timestamp: `text-foreground/40–/30`
- Brand accent text: `text-[#0066FF]` (section eyebrows, labels)

---

## Design Principles

### Dark-First

The entire site is designed for a pure black background. There is no light mode implementation. All colour decisions, opacity modifiers, and glow effects are calibrated for dark backgrounds.

### Glassmorphism (Subtle)

Cards use a very subtle frosted-glass aesthetic: near-transparent backgrounds (`bg-foreground/[0.02]`) with thin borders (`border-foreground/10`). The effect is intentionally restrained — sophisticated rather than heavy.

### Glow Architecture

Blue radial gradients (`bg-[#0066FF]/[0.07-0.15] blur-[80-140px]`) are used as page-level decorative lighting rather than as UI elements. They appear behind hero sections, page heroes, and CTA blocks.

### Grid Overlay

A subtle 80×80px line grid is applied to hero backgrounds and page hero backgrounds at very low opacity (`opacity-[0.022-0.025]`), adding depth without visual noise.

### Pill Buttons

All interactive buttons use `rounded-full` (pill shape). There are no rectangular buttons in the design system. This is a hard design rule enforced by the `Button` component's `VARIANTS` map.

---

## Component Patterns

### Cards

Standard card pattern:
```
rounded-2xl border border-foreground/10 bg-foreground/[0.02]
```

Hover card pattern:
```
transition-colors hover:border-foreground/20 hover:bg-foreground/[0.04]
```

Brand-accented card (pricing highlighted tier):
```
border-[#0066FF]/30 bg-[#0066FF]/[0.04]
```

### Section Structure

Every major section follows this pattern:

```
<section className="py-20 sm:py-24 lg:py-32">
  <Container>
    <!-- Content -->
  </Container>
</section>
```

### Section Eyebrow

Every section heading is preceded by a small uppercase label:

```tsx
<p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0066FF]">
  Platform
</p>
```

On inner pages where the label is not brand-blue, it uses `text-foreground/50` instead.

### Feature Lists

Feature/benefit lists use custom check icons (circle with checkmark SVG) rather than Tailwind's built-in list bullets:

```tsx
<span className="flex h-5 w-5 items-center justify-center rounded-full border border-foreground/20 bg-foreground/[0.03]">
  <svg><!-- checkmark --></svg>
</span>
```

### Badges / Pills

Tags and badges use:
```
rounded-full border border-foreground/10 bg-foreground/[0.04] px-2.5 py-0.5
text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/50
```

---

## Animation Language

All animations use Framer Motion. Variants are defined in `src/lib/motion.ts`.

| Variant | Effect | Typical use |
|---|---|---|
| `fadeUp` | Fade in + Y: 24→0, 0.6s | Section headings, body text, cards |
| `fadeIn` | Fade in only, 0.5s | Badges, dividers, footer |
| `slideFromLeft` | Fade in + X: -32→0, 0.7s | Left-panel illustrations |
| `slideFromRight` | Fade in + X: +32→0, 0.7s | Right-panel illustrations |
| `staggerContainer` | Staggers children 0.1s | Wraps lists of items |
| `scaleIn` | Fade in + scale: 0.95→1, 0.6s | Feature cards, CTA block |

**Key rule:** All scroll animations use `whileInView` with `viewport={{ once: true }}`. Animations trigger once and do not repeat on scroll-back.

Easing: `[0.22, 1, 0.36, 1]` — a snappy deceleration curve for enter animations.

---

## Iconography

All icons in the codebase are inline SVGs from the Lucide icon set (or Lucide-compatible designs). They are rendered inline — no icon library is imported.

SVG attributes used consistently:
- `xmlns="http://www.w3.org/2000/svg"`
- `fill="none"`
- `stroke="currentColor"`
- `strokeWidth={1.5}` (UI icons) or `strokeWidth={2}` (CTA arrows)
- `strokeLinecap="round"`
- `strokeLinejoin="round"`
- `aria-hidden="true"` on all decorative icons

---

## Tone of Voice

### Principles

- **Direct.** State facts clearly. Don't hedge technical claims.
- **Technical.** Use the correct terminology (TEE, HSM, DID, VC, ZK). Our audience understands it.
- **Confident but not arrogant.** We believe in what we build. We don't need to disparage competitors.
- **Privacy-centric.** Privacy language is structural, not aspirational. We say "structurally impossible" not "we promise not to."

### Examples

✅ "Data is encrypted client-side before it ever reaches our infrastructure. We cannot read what you store."
❌ "We take your privacy seriously and do our best to protect your data."

✅ "Every AI response is cryptographically signed and auditable."
❌ "Our AI is secure and trustworthy."

✅ "AES-256-GCM encryption, client-side keying."
❌ "Bank-level encryption."

### Numbers and Claims

All numbers and technical specifications mentioned on the site are aspirational at this stage. When actual metrics are available (uptime, latency, compliance certifications), update the relevant sections with verified values.
