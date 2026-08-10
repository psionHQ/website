# PsionHQ Development

## Project Status

**Project:** PsionHQ  
**Repository:** `psionHQ/website`  
**Status:** Active development  
**Application:** PsionHQ web platform

PsionHQ is being developed as a unified technology platform for intelligence, secure data, computation, digital assets, and future Psion infrastructure.

This repository contains the web application layer of PsionHQ.

The project already includes the public website, authentication foundation, dashboard architecture, Supabase integration foundation, shared services, design system, validation, error handling, and the main platform modules.

Production backend and infrastructure services are being connected progressively.

---

## Current Technology Architecture

```text
                         PsionHQ
                            │
                    Next.js Application
                            │
             ┌──────────────┴──────────────┐
             │                             │
       Public Website                  Dashboard
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                   AI                   Memory                  Vault
                                           │
                                         Wallet
                                           │
                                      Settings
                                           │
                                  Authentication
                                        Clerk
                                           │
                                      Services
                                           │
                                      Supabase
                                           │
                              Database / Backend
This represents the current application foundation.

Not every platform module is production-complete.

⸻

Implemented Foundation

The repository currently contains:

* Next.js application;
* React application layer;
* TypeScript;
* Tailwind CSS v4;
* Framer Motion;
* Clerk authentication integration;
* Supabase integration foundation;
* protected dashboard architecture;
* dashboard layouts;
* AI workspace;
* Memory workspace;
* Vault workspace;
* Wallet workspace;
* Settings workspace;
* shared UI components;
* reusable layout components;
* shared validation;
* service abstractions;
* typed configuration;
* error handling;
* loading states;
* responsive navigation;
* responsive layouts;
* public marketing pages;
* product pages;
* platform pages;
* pricing pages;
* developer pages;
* company pages;
* blog interface;
* contact interface;
* SEO metadata;
* sitemap;
* robots configuration;
* PsionHQ branding;
* official logo assets.
Authentication

Authentication is implemented using Clerk.

Clerk is the current authentication provider for PsionHQ.

The authentication layer provides:

* user registration;
* user sign-in;
* authenticated sessions;
* protected application access;
* user identity;
* authentication state;
* account-related functionality.

Authentication logic should remain centralized and should not be duplicated inside individual dashboard modules.

⸻

Database and Backend Foundation

PsionHQ uses Supabase as part of the current database and backend foundation.

The project includes:
@supabase/supabase-js
@supabase/ssr
Supabase is intended to provide the foundation for:

* application data;
* user-associated records;
* platform module data;
* database access;
* server-side database operations;
* future storage integration;
* Row Level Security;
* backend data services.

The database architecture is still being expanded.

Supabase being connected does not mean that every planned PsionHQ backend service is already production-ready.

⸻

Dashboard

The authenticated application contains the following areas:
/dashboard
/dashboard/overview
/dashboard/ai
/dashboard/memory
/dashboard/vault
/dashboard/wallet
/dashboard/settings
The dashboard is the primary authenticated environment of PsionHQ.

Additional internal modules may be introduced as the platform develops.

⸻

AI

The AI workspace is part of the PsionHQ platform architecture.

The current repository contains the AI workspace interface and application structure.

The production AI infrastructure is still under development.

Future AI services must operate through authenticated and authorized backend services and must not expose private provider credentials to the client.

⸻

Memory

Memory is a core PsionHQ platform module.

It is intended to provide persistent context for users and future AI services.

The current repository contains the Memory workspace architecture.

The production Memory backend, persistence model, retrieval system, permissions, and long-term storage are still under development.

⸻

Vault

Vault is the secure data and file layer of PsionHQ.

It is intended to provide users with a controlled environment for storing and managing files and protected data.

The current repository contains the Vault application architecture.

Production storage, encryption, authorization, file lifecycle management, database integration, and security controls are still under development.

Vault must not be described as a fully production-ready secure storage system until those backend controls are implemented and verified.

⸻

Wallet

Wallet is the digital asset and payment layer planned for PsionHQ.

The current repository contains the Wallet application area and interface architecture.

Production wallet infrastructure, asset management, payment processing, transaction infrastructure, and related security systems are still under development.

⸻

PSI

PSI (Ψ) is the internal token/coin associated with the Psion ecosystem.

PSI is not intended to be a stablecoin.

The long-term concept includes using PSI for:

* payments;
* computational resources;
* data storage;
* infrastructure services;
* access to Psion network resources.

Blockchain infrastructure, token infrastructure, network architecture, economics, and production PSI services are separate development areas.

They must not be represented as already implemented inside this website repository.

⸻

Public Website

The public PsionHQ application contains the main product and company experience.

Major areas include:
/
/product
/platform
/pricing
/developers
/company
/blog
/contact
/signin
/signup
The actual source code remains the source of truth for available routes.

⸻

Design System

PsionHQ uses a custom dark interface designed around a minimal technical and infrastructure-oriented visual language.

Design principles

* dark foundation;
* high contrast;
* blue primary accent;
* minimal visual noise;
* technical aesthetic;
* responsive layouts;
* reusable components;
* consistent spacing;
* subtle animation;
* accessible interaction states.
Brand direction
Primary Blue: #0066FF
Deep Blue:    #0040CC
Background:   #000000
Surface:      #0D0D0D
Border:       #1A1A1A
Foreground:   #FFFFFF
Silver:       #C0C0C0
Purple is not part of the current PsionHQ visual direction.

The official PsionHQ companion is Psi, an original black cat with blue/electric-blue eyes, blue glow, and the Ψ symbol.

⸻

Technology Stack
Layer

Technology

Framework

Next.js 16

UI

React 19

Language

TypeScript

Styling

Tailwind CSS v4

Animation

Framer Motion

Authentication

Clerk

Database / Backend Foundation

Supabase

Package Manager

npm
The installed dependencies in package.json remain the source of truth for exact versions.

⸻

Repository Structure
website/
├── public/
│   ├── logo-icon.png
│   └── ...
│
├── src/
│   ├── app/
│   │   ├── blog/
│   │   ├── company/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   │   ├── ai/
│   │   │   ├── ideas/
│   │   │   ├── memory/
│   │   │   ├── overview/
│   │   │   ├── settings/
│   │   │   ├── vault/
│   │   │   └── wallet/
│   │   ├── developers/
│   │   ├── platform/
│   │   ├── pricing/
│   │   ├── product/
│   │   ├── signin/
│   │   └── signup/
│   │
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   ├── sections/
│   ├── services/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   └── proxy.ts
│
├── docs/
├── .env.example
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
The architecture is modular so production backend services can be introduced without rebuilding the entire frontend.

⸻

Environment Configuration

Environment variables are documented in:
.env.example
Current configuration areas include:

* application URL;
* API base URL;
* Clerk;
* Supabase;
* database configuration;
* AI provider configuration;
* encryption configuration;
* email configuration;
* analytics;
* feature flags.

Create a local environment file with:
cp .env.example .env.local
Never commit real secrets.

Sensitive server-side values must never be exposed through NEXT_PUBLIC_* variables.

Examples of sensitive values include:
CLERK_SECRET_KEY
AUTH_SECRET
DATABASE_URL
ANTHROPIC_API_KEY
ENCRYPTION_KEY
Local Development

Requirements

* Node.js 18.17 or later;
* npm 9 or later;
* Git.

Installation
git clone https://github.com/psionHQ/website.git
cd website
npm install
Environment
cp .env.example .env.local
Configure the required environment variables.
Development
npm run dev
Open:
http://localhost:3000
Production Build
npm run build
Production Start
npm start
Lint
npm run lint
Development Conventions

TypeScript

TypeScript is used throughout the application.

Strict typing should be preserved.

Avoid unnecessary use of:
any
Shared types should be placed in src/types or an appropriate module-specific location.

Components

React components should remain modular and reusable.

Server Components are the default.

Client Components should use:
"use client";
only when client-side behavior is required.

Styling

Tailwind CSS is the primary styling system.

Existing design tokens and shared components should be reused instead of creating duplicate styling systems.

Animation

Framer Motion is used for interface animation.

Animations should remain subtle and should not interfere with accessibility, navigation, or interaction.

Services

Backend functionality should be accessed through service abstractions where appropriate.

The intended structure is:
UI
 ↓
Application Logic
 ↓
Services
 ↓
Backend / Database
Security Principles

Security is a core architectural requirement.

The application must follow these principles:

1. Never expose server secrets to the client.
2. Never place secret keys inside NEXT_PUBLIC_* variables.
3. Authenticate users through Clerk.
4. Authorize access at the backend and database layers.
5. Use Row Level Security where applicable.
6. Never trust client-provided user IDs.
7. Validate external input.
8. Keep sensitive operations server-side.
9. Do not store sensitive credentials in browser storage.
10. Encrypt sensitive data where required.
11. Keep encryption keys separate from encrypted data.
12. Avoid logging secrets or sensitive user information.
13. Treat Vault and Wallet as security-critical systems.
14. Do not describe a security feature as production-ready until it is implemented and verified.

⸻

Current Limitations

The following areas remain under development:

AI Backend

The AI interface exists, but the production AI infrastructure is not fully implemented.

Memory Backend

The Memory workspace exists, but the complete production memory system is still being developed.

Vault Infrastructure

The Vault interface exists, but production storage, encryption, authorization, and file lifecycle systems are still being developed.

Wallet Infrastructure

The Wallet interface exists, but production asset, payment, and transaction infrastructure is still being developed.

PSI Infrastructure

PSI blockchain and network infrastructure are separate development areas.

Production API

The service architecture exists, but not every planned backend endpoint is implemented.

Production Database

Supabase is part of the current backend foundation, but the complete production data model continues to evolve.

Testing

Unit, integration, and end-to-end testing should continue to expand as backend functionality is implemented.

CI/CD

Automated build, test, and deployment workflows should be expanded as the production architecture stabilizes.
Development Priorities

The current development order is:
1. Stable web application
        ↓
2. Authentication
        ↓
3. Authorization
        ↓
4. Database
        ↓
5. Backend API
        ↓
6. Vault
        ↓
7. Memory
        ↓
8. AI
        ↓
9. Wallet / Payments
        ↓
10. Psion Infrastructure
        ↓
11. PSI Ecosystem
Security, user control, data ownership, and scalability must remain priorities throughout every stage.

⸻

Documentation Rules

Documentation must clearly distinguish between:
Implemented
Connected
Under Development
Planned
Long-Term Concept
A planned feature must never be documented as an implemented production feature.

Documentation must be updated whenever a major architectural decision changes.

The source code remains the source of truth for implemented behavior.
Git Workflow

Before committing significant changes, run:
npm run lint
npm run build
Verify:

* TypeScript compilation;
* ESLint;
* routes;
* authentication;
* environment configuration;
* dashboard navigation;
* responsive behavior.

Recommended commit message format:
fix: correct authentication error handling
feat: connect Vault database layer
feat: add Memory persistence
fix: update dashboard authorization
docs: synchronize architecture documentation
Production Readiness

A module is not considered production-ready simply because its user interface exists.

A production module should include, where applicable:

* authentication;
* authorization;
* database persistence;
* server-side validation;
* error handling;
* security controls;
* logging;
* monitoring;
* testing;
* deployment configuration;
* recovery strategy;
* documented operational behavior.

This applies especially to:

* AI;
* Memory;
* Vault;
* Wallet;
* payments;
* PSI infrastructure.
Source of Truth

When documentation and implementation differ, use the following order:
1. Source code
2. Database schema and infrastructure
3. Environment configuration
4. Tests
5. Documentation
6. Product vision
Documentation must be corrected whenever it becomes inconsistent with the implementation.

⸻

Next Development Stage

The next stage is to connect the existing PsionHQ application foundation to reliable backend infrastructure without changing the established product architecture unnecessarily.

The intended progression is:
Authentication
      ↓
Authorization
      ↓
Database
      ↓
API
      ↓
Vault
      ↓
Memory
      ↓
AI
      ↓
Wallet
Each layer should be implemented and verified before higher-level services depend on it.

⸻

PsionHQ Principle

PsionHQ is being built as a unified technology platform.

The website is the application layer.

The backend provides platform services.

The infrastructure provides compute, storage, and network capabilities.

PSI is intended to become part of the broader Psion ecosystem.

The architecture must remain:

* secure;
* modular;
* scalable;
* maintainable;
* transparent.

⸻

PsionHQ

Infrastructure for Intelligence
Ψ