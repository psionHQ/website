<div align="center">

<!-- PSIONHQ Ψ Logo -->
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://psionhq.com/icon.svg">
  <img src="https://psionhq.com/icon.svg" alt="PSIONHQ" width="64" height="64">
</picture>

<h1>PSIONHQ</h1>

<p><strong>The Infrastructure for Human Intelligence</strong></p>

<p>
  <a href="https://psionhq.com">Website</a> ·
  <a href="https://psionhq.com/developers">Developers</a> ·
  <a href="https://psionhq.com/blog">Blog</a> ·
  <a href="https://psionhq.com/contact">Contact</a>
</p>

<p>
  <img src="https://img.shields.io/badge/status-under%20development-blue?style=flat-square&color=0066FF" alt="Status: Under Development">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js" alt="Next.js 16.2">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4">
</p>

</div>

---

## Overview

PSIONHQ is the operating system for intelligence. It brings together sovereign AI, encrypted vaults, decentralised identity, and self-custodied digital wallets into one unified platform — built for individuals and teams who believe that privacy, control, and autonomy are fundamental rights, not features.

This repository contains the official public website for [psionhq.com](https://psionhq.com), built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and Framer Motion.

---

## Mission

> *Every person and organisation deserves infrastructure they can verify, not just infrastructure they are asked to trust.*

We build sovereign infrastructure for the next generation of secure applications.

---

## Vision

A world where AI works entirely for its user, where data is owned by the person who creates it, and where identity is portable, private, and controlled by no single authority.

---

## Product Suite

| Product | Description |
|---|---|
| **PSIONHQ AI** | Secure inference inside encrypted enclaves. Verifiable, private, and frontier-grade. |
| **PSIONHQ Vault** | Zero-knowledge document and credential storage backed by hardware security modules. |
| **PSIONHQ Wallet** | Non-custodial digital wallet for assets, credentials, and access rights. |
| **PSIONHQ ID** | Decentralised identity and portable verifiable credentials built on W3C standards. |

---

## Development Status

> **Phase 4.0 — User Authentication System**
>
> Authentication is live. Users can register, sign in with email and password, verify their email, and use Google or GitHub OAuth. The dashboard is protected and displays real authenticated user data.

| Area | Status |
|---|---|
| Public marketing website | ✅ Complete |
| Design system & component library | ✅ Complete |
| SEO, sitemap, robots | ✅ Complete |
| 404 and error pages | ✅ Complete |
| Application foundation architecture | ✅ Complete |
| Authentication (Clerk) | ✅ Complete |
| User dashboard | ✅ Connected (real user data) |
| Blog content | 🔄 In progress |
| API & backend implementation | 📋 Planned |
| Database implementation | 📋 Planned |
| Mobile app | 📋 Planned |

See [`docs/Development.md`](docs/Development.md) for the complete development status and [`docs/Roadmap.md`](docs/Roadmap.md) for the full roadmap.

---

## Technology Stack

| Category | Technology | Version |
|---|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router) | 16.2 |
| UI Library | [React](https://react.dev) | 19 |
| Styling | [Tailwind CSS](https://tailwindcss.com) | v4 |
| Animation | [Framer Motion](https://motion.dev) | 12 |
| Language | [TypeScript](https://typescriptlang.org) | 5 |
| Linting | [ESLint](https://eslint.org) | 9 |
| Package Manager | npm | — |

---

## Repository Architecture

```
psionhq/website
├── src/
│   ├── app/                # Next.js App Router — pages, layouts, metadata
│   ├── sections/           # Full-page content sections (Hero, Features, AI…)
│   ├── components/         # Reusable UI components (atoms & molecules)
│   │   ├── layout/         # Container, Header, Footer
│   │   ├── navbar/         # Navbar, Logo, DesktopMenu, MobileMenu
│   │   ├── buttons/        # Button, ButtonLink
│   │   ├── cards/          # Card
│   │   ├── ui/             # Badge, Divider, PageHero, SectionLabel
│   │   ├── forms/          # ContactForm, SignInForm, SignUpForm
│   │   ├── blog/           # BlogFilter
│   │   ├── pricing/        # PricingCards, PricingFAQ
│   │   ├── dashboard/      # DashboardShell
│   │   └── illustrations/  # NetworkVisual
│   ├── lib/                # Shared platform utilities (motion, API client, validation, errors)
│   ├── constants/          # Static data (articles.ts)
│   ├── styles/
│   │   └── tokens/         # Design system tokens (colors, spacing, etc.)
│   ├── assets/             # Brand assets (fonts, icons, images — in progress)
│   ├── config/             # Environment and application configuration
│   ├── hooks/              # Shared client hooks (async state and future auth/data hooks)
│   ├── providers/          # Global application providers (auth/session foundation)
│   ├── services/           # Service layer (auth/contact/database abstractions)
│   ├── types/              # Shared TypeScript domain and API types
│   └── utils/              # Reusable utility helpers
├── public/                 # Static assets
├── docs/                   # Project documentation
└── [config files]          # next.config.ts, tsconfig.json, etc.
```

See [`docs/Architecture.md`](docs/Architecture.md) for the complete architecture documentation.

---

## Route Structure

| Route | Page |
|---|---|
| `/` | Home — full 10-section landing page |
| `/product` | Product suite overview |
| `/platform` | Technical architecture deep-dive |
| `/pricing` | Pricing tiers and comparison |
| `/developers` | Developer quickstart and SDK documentation |
| `/company` | Team, values, and company story |
| `/blog` | Blog listing with category filtering |
| `/blog/[slug]` | Dynamic blog article |
| `/contact` | Contact form and channels |
| `/dashboard` | User dashboard (in progress) |
| `/signin` | Sign in |
| `/signup` | Sign up |

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/psionhq/website.git
cd website

# Install dependencies
npm install
```

### Environment Variables

Copy the example environment file and configure your values:

```bash
cp .env.example .env.local
```

#### Authentication (Clerk)

This project uses [Clerk](https://clerk.com) for authentication.

**Required variables:**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_AUTH_PROVIDER` | Set to `clerk` to enable authentication |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (starts with `pk_test_` or `pk_live_`) |
| `CLERK_SECRET_KEY` | Clerk secret key (starts with `sk_test_` or `sk_live_`) |

**Setup:**

1. Create a Clerk application at [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Enable **Email/Password** under User & Authentication → Email, Phone, Username
3. Enable **Google** and **GitHub** under User & Authentication → Social connections
   - **Google:** Create OAuth credentials at [Google Cloud Console](https://console.cloud.google.com) and add Client ID/Secret to Clerk Dashboard
   - **GitHub:** Create an OAuth App at [GitHub Developer Settings](https://github.com/settings/developers) and add Client ID/Secret to Clerk Dashboard
4. Copy the publishable and secret keys from the Dashboard → API Keys section
5. Set `NEXT_PUBLIC_AUTH_PROVIDER=clerk` in `.env.local`

See [`.env.example`](.env.example) for all available environment variables.

### Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
# Build
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

---

## Design System

PSIONHQ uses a custom dark design system built on Tailwind CSS v4.

| Token | Value |
|---|---|
| Primary Blue | `#0066FF` |
| Deep Blue | `#0040CC` |
| Background | `#000000` |
| Surface | `#0D0D0D` |
| Border | `#1A1A1A` |
| Foreground | `#FFFFFF` |
| Silver | `#C0C0C0` |

All tokens are defined in [`src/styles/tokens/`](src/styles/tokens/) and mapped to Tailwind CSS custom properties in [`src/app/globals.css`](src/app/globals.css).

See [`docs/Brand.md`](docs/Brand.md) for the complete brand and design system documentation.

---

## Documentation

| Document | Description |
|---|---|
| [`docs/Architecture.md`](docs/Architecture.md) | Repository and application architecture |
| [`docs/Vision.md`](docs/Vision.md) | Mission, vision, and product philosophy |
| [`docs/Roadmap.md`](docs/Roadmap.md) | Development roadmap and milestones |
| [`docs/Development.md`](docs/Development.md) | Development status and technical details |
| [`docs/Brand.md`](docs/Brand.md) | Brand guidelines and design system |
| [`docs/Security.md`](docs/Security.md) | Security practices and reporting |

---

## Contributing

We welcome contributions. Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting a pull request.

For security disclosures, please follow the process described in [`SECURITY.md`](SECURITY.md).

---

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

## Contact

| Channel | Link |
|---|---|
| Website | [psionhq.com](https://psionhq.com) |
| Email | [support@psionhq.com](mailto:support@psionhq.com) |
| Blog | [psionhq.com/blog](https://psionhq.com/blog) |
| Contact | [psionhq.com/contact](https://psionhq.com/contact) |

---

<div align="center">
  <sub>Built by the PSIONHQ team · <a href="https://psionhq.com">psionhq.com</a></sub>
</div>