# Architecture

This document describes the architecture of the PSIONHQ website repository as it exists today.

---

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Application Structure](#application-structure)
- [Route Architecture](#route-architecture)
- [Component Hierarchy](#component-hierarchy)
- [Design System Architecture](#design-system-architecture)
- [Data Flow](#data-flow)
- [Configuration](#configuration)

---

## Overview

The PSIONHQ website is a Next.js 16 application using the App Router. It is a statically rendered marketing site with interactive client-side components and now includes a production-ready platform foundation layer. The application uses React 19 as the UI layer, Tailwind CSS v4 for styling, and Framer Motion for animations.

The architecture follows a clear separation between:

- **Sections** — large, full-page content blocks composed directly into page files
- **Components** — reusable atoms and molecules shared across multiple pages or sections
- **Pages** — Next.js App Router route files that compose sections and components
- **Platform foundation** — shared configuration, providers, validation, API client, error handling, service abstractions, and future auth/database contracts

---

## Technology Stack

| Layer | Technology | Version | Role |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.2.12 | Routing, SSR/SSG, metadata |
| UI | React | 19.2.4 | Component model |
| Styling | Tailwind CSS | v4 | Utility-first CSS |
| CSS Processing | @tailwindcss/postcss | v4 | PostCSS integration |
| Animation | Framer Motion | 12.43 | Scroll animations, transitions |
| Language | TypeScript | 5 | Static typing |
| Linting | ESLint 9 + eslint-config-next | 9 | Code quality |
| Package Manager | npm | — | Dependency management |

---

## Repository Structure

```
psionhq/website/
│
├── public/                     # Static file serving
│   ├── icon.svg                # Site icon (Ψ logomark)
│   ├── favicon.ico
│   └── [scaffold SVGs]         # Next.js default assets
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (Header + main)
│   │   ├── page.tsx            # Home page (/)
│   │   ├── not-found.tsx       # 404 page
│   │   ├── globals.css         # Global styles + Tailwind + design tokens
│   │   ├── robots.ts           # robots.txt generation
│   │   ├── sitemap.ts          # sitemap.xml generation
│   │   ├── favicon.ico         # Favicon
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing (/blog)
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Blog article (/blog/[slug])
│   │   ├── company/page.tsx    # Company page (/company)
│   │   ├── contact/page.tsx    # Contact page (/contact)
│   │   ├── dashboard/page.tsx  # Dashboard (/dashboard)
│   │   ├── developers/page.tsx # Developers page (/developers)
│   │   ├── home/               # Reserved — not yet implemented
│   │   ├── platform/page.tsx   # Platform page (/platform)
│   │   ├── pricing/page.tsx    # Pricing page (/pricing)
│   │   ├── product/page.tsx    # Product page (/product)
│   │   ├── signin/page.tsx     # Sign in (/signin)
│   │   └── signup/page.tsx     # Sign up (/signup)
│   │
│   ├── sections/               # Full-page content sections
│   │   ├── hero/               # Hero section (6 sub-components)
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroActions.tsx
│   │   │   ├── HeroBackground.tsx
│   │   │   ├── HeroBadge.tsx
│   │   │   ├── HeroSubtitle.tsx
│   │   │   └── HeroTitle.tsx
│   │   ├── ai/AISection.tsx
│   │   ├── cta/CTASection.tsx
│   │   ├── ecosystem/EcosystemSection.tsx
│   │   ├── faq/FAQSection.tsx
│   │   ├── features/FeaturesSection.tsx
│   │   ├── footer/FooterSection.tsx
│   │   ├── pricing/            # Reserved — not yet implemented
│   │   ├── testimonials/TestimonialsSection.tsx
│   │   ├── vault/VaultSection.tsx
│   │   └── wallet/WalletSection.tsx
│   │
│   ├── components/             # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Container.tsx   # max-w-7xl centred wrapper
│   │   │   ├── Header.tsx      # Sticky header with blur backdrop
│   │   │   └── Footer.tsx      # Minimal footer (superseded by FooterSection)
│   │   ├── navbar/
│   │   │   ├── Navbar.tsx      # Client component, manages mobileOpen state
│   │   │   ├── Logo.tsx        # Inline SVG Ψ logomark + wordmark
│   │   │   ├── DesktopMenu.tsx # Desktop navigation links
│   │   │   └── MobileMenu.tsx  # Mobile navigation (conditional render)
│   │   ├── buttons/
│   │   │   └── Button.tsx      # Button + ButtonLink, 4 variants × 2 sizes
│   │   ├── cards/
│   │   │   └── Card.tsx        # Base card with hover variant
│   │   ├── ui/
│   │   │   ├── Badge.tsx       # Animated badge (3 variants)
│   │   │   ├── Divider.tsx     # Animated <hr>
│   │   │   ├── PageHero.tsx    # Reusable page hero (eyebrow/h1/subtitle/CTA)
│   │   │   └── SectionLabel.tsx # Uppercase section label
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx  # Contact form (local state)
│   │   │   ├── SignInForm.tsx   # Sign in form (local state + OAuth stubs)
│   │   │   └── SignUpForm.tsx   # Sign up form (local state + OAuth stubs)
│   │   ├── blog/
│   │   │   └── BlogFilter.tsx  # Category filter tabs + article grid
│   │   ├── pricing/
│   │   │   ├── PricingCards.tsx # Monthly/annual toggle + tier cards + table
│   │   │   └── PricingFAQ.tsx  # Pricing FAQ accordion
│   │   ├── dashboard/
│   │   │   └── DashboardShell.tsx # Dashboard sidebar + topbar + content
│   │   └── illustrations/
│   │       └── NetworkVisual.tsx  # SVG network graph (Platform page)
│   │
│   ├── lib/
│   │   ├── motion.ts           # Framer Motion variant presets
│   │   ├── api/client.ts       # Typed API client wrapper
│   │   ├── errors/index.ts     # Shared app error model + normalization
│   │   └── validation/index.ts # Shared form validation
│   │
│   ├── constants/
│   │   ├── articles.ts         # Blog article data (Article type + ARTICLES[])
│   │   ├── forms.ts            # Shared form className tokens
│   │   ├── messages.ts         # Shared UX and validation messages
│   │   └── routes.ts           # Canonical route constants
│   │
│   ├── styles/
│   │   └── tokens/             # Design system TypeScript constants
│   │       ├── colors.ts       # Brand color tokens
│   │       ├── animations.ts   # Animation duration/easing tokens
│   │       ├── radius.ts       # Border-radius tokens
│   │       ├── shadows.ts      # Shadow and glow tokens
│   │       └── spacing.ts      # Section/container spacing tokens
│   │
│   ├── assets/                 # Brand assets (in progress — all empty)
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   ├── logo/
│   │   └── videos/
│   │
│   ├── config/                 # Environment + application configuration
│   │   ├── app.ts
│   │   └── env.ts
│   ├── hooks/                  # Shared client hooks
│   │   └── useAsyncState.ts
│   ├── providers/              # Global app providers
│   │   ├── AppProviders.tsx
│   │   └── AuthProvider.tsx
│   ├── services/               # Service layer abstractions
│   │   ├── auth.ts
│   │   ├── contact.ts
│   │   └── database.ts
│   ├── types/                  # Shared TypeScript types
│   │   ├── auth.ts
│   │   ├── database.ts
│   │   ├── forms.ts
│   │   └── common.ts
│   └── utils/                  # Utility functions
│       ├── result.ts
│       └── validators.ts
│
├── docs/                       # Project documentation
├── .env.example                # Environment variable template
├── next.config.ts              # Next.js configuration (currently empty)
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS configuration (@tailwindcss/postcss)
├── eslint.config.mjs           # ESLint flat config (eslint-config-next)
├── package.json
└── package-lock.json
```

---

## Application Structure

### Root Layout

All pages share a single root layout defined in `src/app/layout.tsx`:

```
RootLayout
└── <html lang="en">
      ├── <body>
      │     ├── <Header>        ← sticky top-0, always rendered
      │     │     └── <Navbar>
      │     │           ├── <Logo>
      │     │           ├── <DesktopMenu>
      │     │           └── <MobileMenu>
      │     └── <main>          ← flex-1, renders page content
      │           └── [page]
      └── [metadata]            ← title template, OG, Twitter, icons
```

There are no nested layouts. The dashboard page uses the same root layout, meaning the public navigation header is always visible — this is a known current limitation noted in a code comment.

### Server vs. Client Components

The application defaults to React Server Components. Client components are explicitly opted in with `"use client"` only where interactivity requires it:

| Component | Directive | Reason |
|---|---|---|
| `Hero.tsx` | `"use client"` | Framer Motion animations |
| `FeaturesSection.tsx` | `"use client"` | Framer Motion animations |
| `AISection.tsx` | `"use client"` | Framer Motion animations |
| `VaultSection.tsx` | `"use client"` | Framer Motion animations |
| `WalletSection.tsx` | `"use client"` | Framer Motion animations |
| `EcosystemSection.tsx` | `"use client"` | Framer Motion animations |
| `TestimonialsSection.tsx` | `"use client"` | Framer Motion animations |
| `FAQSection.tsx` | `"use client"` | Accordion state |
| `CTASection.tsx` | `"use client"` | Framer Motion animations |
| `FooterSection.tsx` | `"use client"` | Framer Motion animations |
| `Navbar.tsx` | `"use client"` | Mobile menu state |
| `BlogFilter.tsx` | `"use client"` | Category filter state |
| `PricingCards.tsx` | `"use client"` | Monthly/annual toggle state |
| `PricingFAQ.tsx` | `"use client"` | Accordion state |
| `DashboardShell.tsx` | `"use client"` | Navigation state |
| `ContactForm.tsx` | `"use client"` | Form state |
| `SignInForm.tsx` | `"use client"` | Form state |
| `SignUpForm.tsx` | `"use client"` | Form state |
| `Badge.tsx` | `"use client"` | Framer Motion |
| `Divider.tsx` | `"use client"` | Framer Motion |
| `PageHero.tsx` | `"use client"` | Framer Motion |
| `SectionLabel.tsx` | `"use client"` | Framer Motion |

---

## Route Architecture

```
/ (Home)
  Composed of 10 sections in sequence:
  Hero → Features → AI → Vault → Wallet →
  Ecosystem → Testimonials → FAQ → CTA → Footer

/product            Product suite overview (4 product cards)
/platform           5-layer stack architecture + stats
/pricing            3-tier pricing with monthly/annual toggle
/developers         Quickstart + 4 SDKs + resource links
/company            Values + team + milestones timeline
/blog               Featured article + category filter + newsletter
/blog/[slug]        Dynamic article (static params from ARTICLES[])
/contact            Contact form + 3 channel cards
/dashboard          Dashboard shell (mock data)
/signin             Sign in form
/signup             Sign up form
* (not-found)       404 page
```

### SEO Infrastructure

- **`robots.ts`** — Disallows `/dashboard/`, `/signin`, `/signup`. Allows all other routes.
- **`sitemap.ts`** — Generates sitemap for 8 public marketing routes (priority 1.0 for home, 0.8 for others).
- **`layout.tsx`** — Sets default metadata including OG image, Twitter card, site name, description.
- **Individual pages** — Export `metadata` or `generateMetadata` for page-specific titles and descriptions.

---

## Component Hierarchy

### Home Page

```
page.tsx (Home) — Server Component
├── Hero — Client
│   ├── HeroBackground — Server
│   ├── HeroBadge — Server
│   ├── HeroTitle — Server
│   ├── HeroSubtitle — Server
│   └── HeroActions → ButtonLink — Server
├── FeaturesSection — Client
│   └── Container → FeatureCard[] (inline)
├── AISection — Client
│   └── Container
├── VaultSection — Client
│   └── Container
├── WalletSection — Client
│   └── Container
├── EcosystemSection — Client
│   └── Container
├── TestimonialsSection — Client
│   └── Container
├── FAQSection — Client
│   └── Container
├── CTASection — Client
│   └── Container → ButtonLink[]
└── FooterSection — Client
    └── Container
```

### Inner Page Pattern

All inner pages (product, platform, pricing, developers, company, blog, contact) follow this pattern:

```
page.tsx — Server Component
├── [metadata export]
├── PageHero — Client (eyebrow + h1 + subtitle + optional CTAs)
├── <section> (one or more)
│   └── Container
│       └── [page-specific content]
└── FooterSection — Client
```

---

## Design System Architecture

The design system is defined in two complementary layers:

### Layer 1: CSS Custom Properties

Defined in `src/app/globals.css` and mapped to Tailwind v4 via `@theme inline`:

```css
:root {
  --brand-blue:      #0066FF;
  --brand-deep-blue: #0040CC;
  --brand-silver:    #C0C0C0;
  --background:      #000000;
  --surface:         #0D0D0D;
  --border:          #1A1A1A;
  --foreground:      #FFFFFF;
}
```

### Layer 2: TypeScript Token Constants

Defined in `src/styles/tokens/` for use in non-Tailwind contexts (Framer Motion targets, inline styles):

| File | Contents |
|---|---|
| `colors.ts` | Brand color hex values |
| `animations.ts` | Duration, easing curves, stagger values |
| `radius.ts` | Border-radius values (sm, md, lg, full) |
| `shadows.ts` | Card highlights and glow effects |
| `spacing.ts` | Section padding, container sizing, layout gaps |

### Animation System

All scroll and entry animations use Framer Motion variants defined in `src/lib/motion.ts`:

| Variant | Effect |
|---|---|
| `fadeUp` | Fade in + translate Y 24px → 0 |
| `fadeIn` | Fade in only |
| `slideFromLeft` | Fade in + translate X -32px → 0 |
| `slideFromRight` | Fade in + translate X +32px → 0 |
| `staggerContainer` | Staggers children with 0.1s delay |
| `scaleIn` | Fade in + scale 0.95 → 1 |

All entry animations use `whileInView` with `viewport={{ once: true }}` for a single trigger per scroll session.

---

## Data Flow

At this stage, all application data is static:

| Data Source | Location | Consumed by |
|---|---|---|
| Blog articles | `src/constants/articles.ts` | BlogFilter, BlogArticlePage |
| Nav links | Inline in DesktopMenu, MobileMenu | Navbar |
| Footer links | Inline in FooterSection | FooterSection |
| Feature content | Inline in FeaturesSection | FeaturesSection |
| Pricing tiers | Inline in PricingCards | PricingCards |
| Testimonials | Inline in TestimonialsSection | TestimonialsSection |
| FAQ items | Inline in FAQSection, PricingFAQ | Respective components |
| Team members | Inline in CompanyPage | CompanyPage |

External production APIs are not integrated yet, but data flow contracts are now defined:
- Forms validate via `lib/validation` before service calls.
- Service modules call the typed API client and normalize failures into `AppError`.
- Feature flags (`NEXT_PUBLIC_CONTACT_FORM_ENABLED`, etc.) gate whether calls stay local or call remote APIs.
- Auth and database services expose forward-compatible interfaces while returning safe placeholder responses until providers are integrated.

---

## Configuration

### `next.config.ts`

Currently minimal with no custom runtime toggles.

### `tsconfig.json`

Standard Next.js TypeScript configuration with:
- `@` path alias pointing to `src/`
- Strict mode enabled
- JSX preserved for Next.js

### `postcss.config.mjs`

Single plugin: `@tailwindcss/postcss` for Tailwind CSS v4 processing.

### `eslint.config.mjs`

Uses `eslint-config-next/flat` preset via ESLint 9 flat config format.
