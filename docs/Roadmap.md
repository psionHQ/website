# Roadmap

This document describes the planned development roadmap for the PSIONHQ website, based on the current repository state. Priorities are ordered from highest to lowest based on what blocks other work and what is required for a production-ready launch.

---

## Current Phase

**Phase 2.1 — Repository Professionalization**

The public marketing website is functionally complete as a production-grade static UI. The current focus is on repository quality, documentation, and developer experience before advancing to backend integration.

---

## Phase Overview

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Public marketing website (UI) | ✅ Complete |
| Phase 2.1 | Repository professionalization | 🔄 In Progress |
| Phase 2.2 | Asset integration and font loading | 📋 Planned |
| Phase 3 | Authentication and user accounts | 📋 Planned |
| Phase 4 | Blog content and CMS integration | 📋 Planned |
| Phase 5 | Platform features (AI, Vault, Wallet) | 📋 Planned |
| Phase 6 | Developer platform and API | 📋 Planned |
| Phase 7 | Mobile application | 📋 Planned |

---

## Priority 1 — Unblock Launch

These items are blocking a clean public launch. Linked pages return 404 or assets are missing.

### P1.1 — Create missing linked pages

The following routes are actively linked from the site but do not exist:

- `/changelog` — linked from FooterSection and Developers page
- `/status` — linked from FooterSection and Developers page
- `/privacy` — linked from FooterSection
- `/forgot-password` — linked from SignInForm

**Resolution:** Create placeholder pages with appropriate layout, heading, and "coming soon" messaging.

### P1.2 — Add OG image

`/og-image.png` is referenced in `layout.tsx` metadata but the file does not exist in `public/`. Every social share preview is currently broken.

**Resolution:** Create and place `public/og-image.png` (1200 × 630px) with PSIONHQ branding.

### P1.3 — Load custom fonts

The design system references `--font-inter` and `--font-space-grotesk` as CSS custom properties, but neither font is loaded. All typography currently falls back to system fonts.

**Resolution:** Install Inter and Space Grotesk via `next/font/google` and inject the variables into `<html>` in `layout.tsx`.

### P1.4 — Documentation and onboarding

**Resolution:** ✅ Complete as part of Phase 2.1 (current work).

---

## Priority 2 — Public Website Completeness

### P2.1 — Blog article content

The single existing article (`the-case-for-sovereign-ai`) renders its metadata but the article body always displays "Full article coming soon." The `Article` type in `constants/articles.ts` does not include a `body` field.

**Resolution:**
1. Add a `body` field to the `Article` type (Markdown or MDX)
2. Update `BlogArticlePage` to render article content
3. Write the first article

### P2.2 — Additional blog articles

The category filter supports 5 categories (All, AI, Security, Identity, Engineering) but only 1 article exists. The filter works correctly; it needs content.

**Resolution:** Write and publish articles across categories.

### P2.3 — Newsletter subscription

The blog page includes a functional email input form with no submit handler. Submitting does nothing.

**Resolution:** Wire the form to an email delivery service (e.g. Resend, SendGrid) via a Next.js Server Action.

### P2.4 — Contact form submission

`ContactForm` manages local state correctly but the `onSubmit` handler calls only `event.preventDefault()`. No email is sent.

**Resolution:** Implement a Server Action that forwards the submission to a delivery service.

---

## Priority 3 — Authentication

### P3.1 — Install auth provider

**Resolution:** Install and configure NextAuth.js or Clerk. Add required environment variables to `.env.example`.

### P3.2 — Sign in and sign up forms

`SignInForm` and `SignUpForm` have complete UI including password visibility toggle, but no submit logic.

**Resolution:** Wire forms to the auth provider's credential flow.

### P3.3 — Forgot password flow

`/forgot-password` is linked from `SignInForm` but the page does not exist.

**Resolution:** Create the page and implement the password reset flow.

### P3.4 — OAuth providers

Google and GitHub OAuth buttons exist in both auth forms. They are currently non-functional stubs.

**Resolution:** Configure Google and GitHub as OAuth providers with the auth library.

### P3.5 — Dashboard layout

The dashboard currently uses the same root layout as the public site, meaning the public Header is always rendered above it. This is noted as a known issue in a code comment.

**Resolution:** Create a dashboard nested layout (`src/app/dashboard/layout.tsx`) that replaces the public Header with a dashboard-specific top bar and sidebar.

---

## Priority 4 — Dashboard

### P4.1 — Loading and error states

No `loading.tsx` or `error.tsx` files exist for the dashboard route.

**Resolution:** Add `src/app/dashboard/loading.tsx` and `src/app/dashboard/error.tsx`.

### P4.2 — Dashboard routing

The sidebar in `DashboardShell` lists 6 items (Overview, AI, Vault, Wallet, API, Settings) but none navigate to sub-routes. All content is rendered in one static panel.

**Resolution:** Create sub-routes (`/dashboard/ai`, `/dashboard/vault`, etc.) with their own page files and layouts.

### P4.3 — Live data

All dashboard data is hardcoded mock values.

**Resolution:** Replace with real API calls once the backend is available.

---

## Priority 5 — Infrastructure

### P5.1 — Deployment pipeline

No deployment configuration exists in the repository. No Vercel config, no GitHub Actions workflows.

**Resolution:** Create a Vercel configuration or GitHub Actions CI/CD workflow for preview and production deployments.

### P5.2 — Environment variables

**Resolution:** ✅ `.env.example` created as part of Phase 2.1.

### P5.3 — TypeScript shared types

`src/types/` is empty. Types that will be shared across multiple files (API response shapes, user types, etc.) should live here.

**Resolution:** Populate as the backend integration progresses.

### P5.4 — Brand assets

`src/assets/fonts/`, `src/assets/icons/`, `src/assets/images/`, `src/assets/logo/`, and `src/assets/videos/` are all empty.

**Resolution:** Populate as design assets are finalised.

---

## Priority 6 — Code Quality

### P6.1 — Design token usage

Components use hardcoded hex colour strings (`#0066FF`, `#0040CC`) rather than referencing the design token CSS custom properties (`var(--brand-blue)`). This creates a disconnect between the token definitions and their usage.

**Resolution:** Replace inline hex values with Tailwind utility classes that map to token CSS custom properties.

### P6.2 — Footer component consolidation

`src/components/layout/Footer.tsx` (a minimal 1-line footer) and `src/sections/footer/FooterSection.tsx` (the full multi-column footer) serve the same role. All pages use `FooterSection`; the minimal `Footer` is unused.

**Resolution:** Remove `src/components/layout/Footer.tsx` or clearly document its intended separate purpose.

### P6.3 — Testing

No tests exist in the repository. There is no test runner configured.

**Resolution:** Add Vitest or Jest with React Testing Library. Write unit tests for utility functions and component tests for interactive components (BlogFilter, PricingCards, FAQSection, Navbar).

---

## Longer-Term Milestones

These items appear in the README roadmap and represent major platform capabilities not yet reflected in the website codebase:

- **Authentication** — User accounts, sessions, SSO (Phase 3)
- **User Dashboard** — Real AI, Vault, Wallet, and API management surfaces (Phase 4-5)
- **AI integration** — PSIONHQ AI inference API integration (Phase 5)
- **Vault integration** — File and credential management (Phase 5)
- **Wallet integration** — Digital asset management (Phase 5)
- **Developer platform** — API key management, usage metering, webhooks (Phase 6)
- **Mobile App** — iOS and Android application (Phase 7)
