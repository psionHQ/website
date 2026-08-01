# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- Repository professionalization: professional README, docs/, LICENSE, CONTRIBUTING.md, SECURITY.md, CODE_OF_CONDUCT.md, CHANGELOG.md, .env.example
- `docs/Architecture.md` — complete repository and application architecture documentation
- `docs/Vision.md` — mission, vision, and product philosophy
- `docs/Roadmap.md` — full development roadmap with prioritised milestones
- `docs/Development.md` — development status, setup instructions, conventions, and known limitations
- `docs/Brand.md` — brand guidelines and design system documentation
- `docs/Security.md` — security practices and vulnerability reporting process

---

## [0.1.0] — 2026-07-01

### Added

**Public marketing website — initial implementation**

- Root layout with sticky blur-backdrop header and global metadata (OG, Twitter, icons, title template)
- `robots.ts` disallowing `/dashboard/`, `/signin`, `/signup`
- `sitemap.ts` for 8 public marketing routes
- 404 (`not-found.tsx`) page with styled error state and back-to-home link

**Home page (`/`)**
- Hero section: animated Ψ logomark with pulsing glow rings, headline, subtitle, dual CTA buttons
- Features section: 6-card grid (Secure AI Infrastructure, Sovereign Identity, Encrypted Vault, Digital Wallet, Developer APIs, Privacy by Default)
- AI section: private inference capabilities list with animated pipeline diagram
- Vault section: zero-knowledge storage features with mock file browser UI
- Wallet section: non-custodial wallet features with mock wallet UI
- Ecosystem section: cryptographic standards cards (TEE, HSM, DID, VC, TLS, ZK) and compatibility table
- Testimonials section: 3 customer testimonial cards
- FAQ section: interactive accordion with 6 questions and sticky heading layout
- CTA section: branded call-to-action block
- Footer section: 5-column footer with 16 navigation links

**Inner pages**
- `/product` — 4-product suite overview (PSIONHQ AI, ID, Vault, Wallet)
- `/platform` — 5-layer stack architecture with NetworkVisual illustration and 6 stat tiles
- `/pricing` — Monthly/annual toggle, 3-tier cards (Free/Pro/Enterprise), plan comparison table, FAQ accordion
- `/developers` — 3-step quickstart with syntax-highlighted code blocks, 4 SDK cards, 6 resource links
- `/company` — Company values, 6-person team, 4-milestone timeline
- `/blog` — Featured article card, 5-category client-side filter, newsletter signup UI
- `/blog/[slug]` — Dynamic article page with static param generation from `ARTICLES` constant
- `/contact` — Contact form UI with subject selector and 3 contact channel cards
- `/dashboard` — Dashboard shell with sidebar nav, topbar, usage stats, and activity feed (mock data)
- `/signin` — Sign in form with password visibility toggle and OAuth stubs (Google, GitHub)
- `/signup` — Sign up form with password visibility toggle and OAuth stubs (Google, GitHub)

**Component library**
- `Container` — max-w-7xl centred layout wrapper
- `Header` — sticky blur-backdrop header
- `Navbar` — responsive navigation with mobile hamburger menu
- `Logo` — inline SVG Ψ logomark + wordmark
- `DesktopMenu` / `MobileMenu` — platform navigation links
- `Button` / `ButtonLink` — 4 variants (primary, secondary, ghost, link) × 2 sizes (sm, md)
- `Card` — base card with optional hover and elevated variants
- `Badge` — animated badge (3 variants: default, muted, brand)
- `Divider` — animated `<hr>`
- `PageHero` — reusable page hero (eyebrow, h1, subtitle, optional CTAs)
- `SectionLabel` — uppercase section label with animation
- `ContactForm`, `SignInForm`, `SignUpForm` — form UI components (local state)
- `BlogFilter` — category tab filter with client-side article filtering
- `PricingCards` — pricing tier cards with monthly/annual toggle and comparison table
- `PricingFAQ` — pricing FAQ accordion
- `DashboardShell` — dashboard sidebar, topbar, and content layout
- `NetworkVisual` — SVG network architecture illustration

**Design system**
- CSS custom properties for brand palette, surfaces, and typography font stacks
- Tailwind CSS v4 `@theme inline` mapping
- TypeScript token constants: `colors.ts`, `animations.ts`, `radius.ts`, `shadows.ts`, `spacing.ts`
- Framer Motion variant presets: `fadeUp`, `fadeIn`, `slideFromLeft`, `slideFromRight`, `staggerContainer`, `scaleIn`

**Data**
- `src/constants/articles.ts` — `Article` type definition and `ARTICLES` array (1 article)

---

[Unreleased]: https://github.com/psionhq/website/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/psionhq/website/releases/tag/v0.1.0
