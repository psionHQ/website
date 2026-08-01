# Development

This document describes the current development status, technical details, and setup instructions for the PSIONHQ website.

---

## Table of Contents

- [Development Status](#development-status)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Development Server](#development-server)
- [Building](#building)
- [Linting](#linting)
- [Environment Variables](#environment-variables)
- [Project Conventions](#project-conventions)
- [Known Limitations](#known-limitations)
- [Technical Debt](#technical-debt)

---

## Development Status

### Current Phase: 5.0 — Production Dashboard Platform

**Overall maturity:** The public marketing website is production-quality and now includes production-ready platform foundation architecture. Authentication providers, backend APIs, and database persistence are intentionally deferred to future phases.

### Feature Status

| Feature | Status | Notes |
|---|---|---|
| Public marketing website | ✅ Complete | All pages, sections, and components implemented |
| Responsive design | ✅ Complete | Mobile hamburger menu, adaptive layouts |
| Scroll animations | ✅ Complete | Framer Motion, triggered once per session |
| SEO metadata | ✅ Complete | Per-page metadata, OG tags, Twitter cards |
| robots.txt | ✅ Complete | Disallows auth and dashboard routes |
| sitemap.xml | ✅ Complete | 8 public marketing routes |
| 404 page | ✅ Complete | Styled with back-to-home |
| Design system | ✅ Complete | Tokens, components, variants |
| Home page (10 sections) | ✅ Complete | Hero through Footer |
| Product page | ✅ Complete | 4 product cards |
| Platform page | ✅ Complete | 5-layer stack + stats |
| Pricing page | ✅ Complete | Monthly/annual toggle, 3 tiers, comparison table |
| Developers page | ✅ Complete | Quickstart, 4 SDKs, resources |
| Company page | ✅ Complete | Values, team, milestones |
| Blog listing | ✅ Complete | Featured article, category filter, newsletter UI |
| Blog article page | ⚠️ Partial | Metadata rendered; body always "coming soon" |
| Contact page | ⚠️ Partial | Form UI complete; no submit logic |
| Sign in page | ⚠️ Partial | Form UI complete; no auth logic |
| Sign up page | ⚠️ Partial | Form UI complete; no auth logic |
| Dashboard | ✅ Production shell complete | Shared layout, routed modules, responsive navigation, and mock data architecture are live |
| OG image | ❌ Missing | Referenced in metadata, file absent |
| Custom fonts | ❌ Missing | System fallbacks in use |
| /changelog route | ❌ Missing | Linked from footer and developers page |
| /status route | ❌ Missing | Linked from footer and developers page |
| /privacy route | ❌ Missing | Linked from footer |
| /forgot-password route | ❌ Missing | Linked from sign-in form |
| Platform foundation (config/types/services/providers/validation) | ✅ Complete | Ready for auth and database integration |
| Authentication provider integration | ❌ Not started | No Clerk/Auth.js provider installed yet |
| Server actions / backend integration | ❌ Not started | Service contracts exist, API implementation pending |
| API routes | ❌ Not started | API client and service layer added; route handlers pending |
| Database implementation | ❌ Not started | Database client abstraction added; no adapter configured |
| CMS | ❌ Not started | Blog content is hardcoded |
| Tests | ❌ Not started | No test runner configured |
| CI/CD | ❌ Not started | No deployment pipeline |

---

## Prerequisites

| Requirement | Version |
|---|---|
| Node.js | 18.17 or later |
| npm | 9 or later |
| Git | 2.x or later |

---

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/psionhq/website.git
cd website

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start the development server
npm run dev
```

---

## Development Server

```bash
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000). The server uses Next.js Fast Refresh for instant HMR.

---

## Building

```bash
# Production build
npm run build

# Start the production server locally
npm start
```

The production build runs Next.js static generation for all pages. Ensure all environment variables are set before building.

---

## Linting

```bash
npm run lint
```

Uses ESLint 9 with `eslint-config-next/flat`. The configuration is in `eslint.config.mjs`.

---

## Environment Variables

Copy `.env.example` to `.env.local` and populate the values. See `.env.example` for descriptions of each variable.

For production deployment, set environment variables in your hosting platform (e.g. Vercel environment settings).

**Important:** Never commit `.env.local` or any file containing real secrets. `.env.local` is included in `.gitignore`.

---

## Project Conventions

### File Naming

- **Pages:** `page.tsx` (Next.js App Router convention)
- **Layouts:** `layout.tsx`
- **Components:** `PascalCase.tsx` (e.g. `HeroTitle.tsx`, `PricingCards.tsx`)
- **Utility files:** `camelCase.ts` (e.g. `motion.ts`)
- **Token files:** `camelCase.ts` (e.g. `colors.ts`, `spacing.ts`)

### Component Conventions

- Server Components by default — no directive needed
- Client components require explicit `"use client"` directive at the top of the file
- Props interfaces are defined at the top of the file using TypeScript `interface`
- Inline data constants use `SCREAMING_SNAKE_CASE` (e.g. `FEATURES`, `FAQ_ITEMS`)
- All decorative inline SVGs include `aria-hidden="true"`

### Styling Conventions

- Tailwind CSS utility classes are the primary styling mechanism
- No CSS Modules or styled-components
- Dark background, light foreground: `bg-foreground/[0.02]` surface, `border-foreground/10` borders
- Brand blue: `bg-[#0066FF]`, `text-[#0066FF]` (Tailwind arbitrary values)
- Hover blue: `hover:bg-[#0040CC]`
- Buttons use `rounded-full` (pill shape) consistently
- Section vertical rhythm: `py-20 sm:py-24 lg:py-32`
- Container: `max-w-7xl px-4 sm:px-6 lg:px-8` via `<Container>`

### Animation Conventions

- All scroll animations use Framer Motion `whileInView` with `viewport={{ once: true }}`
- Animation variants are imported from `src/lib/motion.ts`
- Never add `motion.*` to elements that don't need animation — keep the DOM clean
- Decorative animated elements use `aria-hidden="true"`

### Import Aliases

The `@` alias resolves to `src/`. Use it for all cross-directory imports:

```ts
import Container from "@/components/layout/Container";
import { fadeUp } from "@/lib/motion";
import { ARTICLES } from "@/constants/articles";
```

---

## Known Limitations

### Dashboard uses mock services only

The dashboard shell, routing, and shared UI architecture are production-ready, but all module data remains mock-driven. Future AI, Memory, Vault, and Wallet backends can attach to the existing service and component contracts without structural rewrites.

### Forms are foundation-wired, backend-pending

The contact/sign-in/sign-up forms now use shared validation and service-layer abstractions, but no production backend endpoints are enabled yet. Contact submission remains feature-flagged, and auth flows return non-destructive placeholder states until an auth provider is integrated.

### Blog article body is absent

`src/constants/articles.ts` defines the `Article` type without a `body` field. The blog article page (`/blog/[slug]`) renders article metadata but always displays "Full article coming soon." for the body.

### Fonts are not loaded

The design system references `--font-inter` and `--font-space-grotesk` CSS custom properties, but neither font is loaded via `next/font`. The site renders with system font fallbacks.

### OG image is missing

`/og-image.png` is referenced in `src/app/layout.tsx` metadata but the file does not exist in `public/`. Social sharing previews are broken.

### Several linked routes return 404

The following routes are linked from the live site but have no corresponding page files:

- `/changelog`
- `/status`
- `/privacy`
- `/forgot-password`

---

## Technical Debt

| Item | Impact | Location |
|---|---|---|
| Hardcoded hex colour strings | Design tokens are not yet fully single source of truth | Components still using `#0066FF`, `#0040CC` directly |
| Two Footer components | Confusing — `layout/Footer.tsx` is unused | `src/components/layout/Footer.tsx` |
| No error boundaries | No graceful degradation for runtime errors | Global |
| Limited loading coverage | Global loading state exists; route-specific loading states still absent | App routes |
| `src/app/home/` directory | Empty directory with only `.gitkeep` | `src/app/home/` |
| `src/sections/pricing/` directory | Empty directory with only `.gitkeep` | `src/sections/pricing/` |
| All `src/assets/` subdirs | Empty with `.gitkeep` — assets not yet added | `src/assets/` |
| Inline SVG repetition | Same icon SVGs copy-pasted across components | Multiple files |
