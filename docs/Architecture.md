# PsionHQ Architecture

## Overview

PsionHQ is being developed as a modular technology platform that combines intelligence, persistent memory, secure data, digital assets, and future infrastructure services into one unified environment.

The current repository is the web application layer of PsionHQ.

The architecture is intentionally modular so that production backend services can be introduced progressively without requiring a complete rebuild of the frontend.

The current application foundation is built around:

```text
Next.js
   │
   ├── Public Website
   │
   └── Authenticated Dashboard
           │
           ├── AI
           ├── Memory
           ├── Vault
           ├── Wallet
           └── Settings
                    │
                Clerk
                    │
              Application Services
                    │
                Supabase
                    │
          Database / Backend Foundation
⸻

Architectural Principles

PsionHQ follows several core architectural principles.

Modularity

Each major platform capability should remain independently maintainable.

The primary modules are:

* AI;
* Memory;
* Vault;
* Wallet;
* Settings;
* Authentication;
* Database;
* Services.

A module should not unnecessarily contain infrastructure logic belonging to another module.

⸻

Security by Architecture

Security must be considered at every architectural layer.

Sensitive operations should remain server-side.

Authentication and authorization must be enforced independently of the user interface.

The client must never be treated as a trusted environment.

⸻

User Control

PsionHQ is designed around user control of:

* personal data;
* application data;
* stored files;
* digital assets;
* AI context;
* account access.

Backend services must associate protected resources with the authenticated user and enforce authorization at the server/database layer.

⸻

Scalability

The web application is only one layer of the larger PsionHQ architecture.

The architecture must allow future services such as:

* AI infrastructure;
* storage;
* computation;
* network services;
* payments;
* digital assets;
* PSI infrastructure;

to be introduced without restructuring the entire application.

⸻

Application Architecture

The current application is based on Next.js.

The application contains two primary environments:
                    PsionHQ
                       │
          ┌────────────┴────────────┐
          │                         │
     Public Website             Dashboard
          │                         │
     Marketing / SEO          Authenticated App
The public website provides the product and company experience.

The dashboard provides the authenticated platform environment.

⸻

Frontend Layer

Next.js

Next.js is the primary application framework.

The frontend is responsible for:

* routing;
* page rendering;
* layouts;
* user interface;
* navigation;
* dashboard presentation;
* authentication UI;
* form handling;
* loading states;
* error states;
* responsive behavior.

The frontend should not contain private backend credentials or security-sensitive business logic.

⸻

React

React provides the component architecture.

The application uses reusable components for:

* navigation;
* layouts;
* dashboard modules;
* forms;
* buttons;
* cards;
* dialogs;
* loading states;
* error states;
* product sections.

Components should remain focused and reusable.

⸻

TypeScript

TypeScript is used throughout the application.

Strict typing is preferred.

Shared application types should be centralized where appropriate.

Avoid unnecessary use of:
any
Types should be used to define boundaries between:
UI
 ↓
Application Logic
 ↓
Services
 ↓
Backend
Styling Architecture

PsionHQ uses Tailwind CSS v4 as the primary styling system.

The design system is based on:

* dark backgrounds;
* high contrast;
* blue accents;
* consistent spacing;
* reusable components;
* responsive layouts;
* controlled motion.

Primary brand direction:
Primary Blue: #0066FF
Deep Blue:    #0040CC
Background:   #000000
Surface:      #0D0D0D
Border:       #1A1A1A
Foreground:   #FFFFFF
Silver:       #C0C0C0
Purple is not part of the current PsionHQ visual direction.

⸻

Authentication Architecture

Clerk

Clerk is the current authentication provider.

The authentication layer is responsible for:

* registration;
* sign-in;
* sessions;
* user identity;
* protected routes;
* authentication state;
* account access.

The architecture is:
User
 │
 ▼
PsionHQ Authentication UI
 │
 ▼
Clerk
 │
 ▼
Authenticated User
 │
 ▼
Protected Dashboard
Authentication should remain centralized.

Individual modules must not implement their own independent authentication systems.

⸻

Authorization Architecture

Authentication and authorization are separate concepts.

Clerk establishes the authenticated identity.

Backend services and the database must determine what that user is allowed to access.

The intended model is:
User
 │
 ▼
Clerk Identity
 │
 ▼
Application Authorization
 │
 ▼
Database / Service Authorization
 │
 ▼
User-Owned Resource
The client must never be trusted to determine ownership of a resource.

For example, a user ID supplied by the browser must not be considered sufficient proof that the user owns a database record.

⸻

Supabase Architecture

Supabase is part of the current backend and database foundation.

The project includes:
@supabase/supabase-js
@supabase/ssr
Supabase is intended to provide:

* database access;
* server-side database operations;
* user-associated records;
* application data;
* platform module data;
* Row Level Security;
* future storage integration;
* backend data services.

The architecture is designed to keep database access behind application/service boundaries.

⸻

Database Architecture

The database is organized around authenticated users and platform resources.
Conceptually:
User
 │
 ├── Profile
 │
 ├── AI Data
 │
 ├── Memory
 │
 ├── Vault
 │     └── Files
 │
 ├── Wallet
 │
 └── Settings
Each protected resource must have a clear ownership relationship.

Database authorization must prevent one authenticated user from accessing another user’s private resources.

⸻

Service Layer

The service layer provides a boundary between the user interface and backend infrastructure.

The intended architecture is:
React / Next.js UI
        │
        ▼
Application Logic
        │
        ▼
Services
        │
        ├── Authentication
        ├── AI
        ├── Memory
        ├── Vault
        ├── Wallet
        └── Database
        │
        ▼
Supabase / External Infrastructure
Business logic should not be unnecessarily duplicated across UI components.

⸻

AI Architecture

AI is a core PsionHQ platform module.

The current repository contains the AI workspace and application structure.

The long-term architecture is:
User
 │
 ▼
PsionHQ AI Workspace
 │
 ▼
Authenticated AI Service
 │
 ├── User Context
 ├── Memory
 ├── Permissions
 └── AI Provider / Psion Infrastructure
AI provider credentials must remain server-side.

The production AI infrastructure is still under development.

The AI module must eventually integrate with Memory and other user-authorized services without exposing private information or credentials to the browser.

⸻

Memory Architecture

Memory provides persistent context for PsionHQ users and future AI services.

The intended architecture is:
User
 │
 ▼
Memory Service
 │
 ├── User Context
 ├── Stored Memories
 ├── Metadata
 ├── Permissions
 └── Retrieval
 │
 ▼
Supabase / Future Memory Infrastructure
Memory must be associated with the correct authenticated user.

The production persistence and retrieval architecture is still under development.

⸻

Vault Architecture

Vault is the secure data and file layer.

The intended architecture is:
User
 │
 ▼
Vault UI
 │
 ▼
Vault Service
 │
 ├── Authorization
 ├── File Metadata
 ├── Storage
 ├── Encryption
 └── Access Control
 │
 ▼
Supabase / Storage Infrastructure
Vault is considered a security-critical subsystem.

The final production architecture must define:

* file ownership;
* access permissions;
* storage lifecycle;
* encryption;
* key management;
* upload validation;
* download authorization;
* deletion;
* recovery;
* auditability.

The current repository contains the application layer, while the complete production Vault infrastructure is still under development.

⸻

Wallet Architecture

Wallet is intended to provide the digital asset and payment layer of PsionHQ.

The intended architecture is:
User
 │
 ▼
Wallet UI
 │
 ▼
Wallet Service
 │
 ├── Authentication
 ├── Authorization
 ├── Asset Management
 ├── Transactions
 └── Payment Services
 │
 ▼
Future Wallet / Payment Infrastructure
The current repository contains the Wallet application architecture.

Production wallet and payment infrastructure are still under development.

Wallet security must be treated as a critical subsystem.

⸻

PSI Architecture

PSI (Ψ) is the internal token/coin associated with the Psion ecosystem.

PSI is not intended to be a stablecoin.

The long-term concept is for PSI to interact with Psion infrastructure and services.

Potential infrastructure relationships include:
                       PSI
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       Payments      Compute        Storage
          │             │             │
          └─────────────┼─────────────┘
                        │
                 Psion Infrastructure
The blockchain, network, token economics, and production PSI infrastructure are separate development areas.

They are not represented as implemented components of this website repository.

⸻

Dashboard Architecture

The dashboard is the authenticated application environment.

Current major areas include:
/dashboard
/dashboard/overview
/dashboard/ai
/dashboard/memory
/dashboard/vault
/dashboard/wallet
/dashboard/settings
The dashboard provides a consistent shell around the platform modules.
Conceptually:
Authenticated User
       │
       ▼
Dashboard Layout
       │
       ├── Overview
       ├── AI
       ├── Memory
       ├── Vault
       ├── Wallet
       └── Settings
Each module should remain independently maintainable while sharing the same authentication, layout, design system, and service boundaries.

⸻

Public Website Architecture

The public website is separate from the authenticated platform environment.

Its responsibilities include:

* product communication;
* company information;
* platform explanation;
* developer information;
* pricing;
* blog;
* contact;
* SEO.

Conceptually:
Public User
    │
    ▼
PsionHQ Website
    │
    ├── Product
    ├── Platform
    ├── Pricing
    ├── Developers
    ├── Company
    ├── Blog
    └── Contact
The public website must not expose protected application data.

⸻

Routing Architecture

The application uses Next.js App Router conventions.

The route structure separates public and authenticated environments.
src/app/

├── Public
│   ├── blog
│   ├── company
│   ├── contact
│   ├── developers
│   ├── platform
│   ├── pricing
│   └── product
│
├── Authentication
│   ├── signin
│   └── signup
│
└── Dashboard
    └── dashboard
        ├── ai
        ├── memory
        ├── overview
        ├── settings
        ├── vault
        └── wallet
The actual source tree remains the source of truth for exact routes.

⸻

Data Flow

A normal authenticated request should follow this conceptual flow:
Browser
   │
   ▼
Next.js Application
   │
   ▼
Clerk Authentication
   │
   ▼
Authenticated User
   │
   ▼
Application Service
   │
   ▼
Authorization
   │
   ▼
Supabase / Backend
   │
   ▼
Database / Storage
   │
   ▼
Response
   │
   ▼
Next.js UI
The client should not directly perform security-sensitive operations that require trusted server credentials.

⸻

Error Handling

Errors should be handled at the appropriate layer.

The architecture should distinguish between:
Validation Error
Authentication Error
Authorization Error
Database Error
External Service Error
Configuration Error
Unexpected Application Error
User-facing errors should provide safe, understandable messages.

Internal secrets, stack traces, provider credentials, and sensitive database information must not be exposed to users.

⸻

Environment and Secrets

Environment configuration is managed through .env.local during local development.

The repository provides .env.example as the template.

Sensitive values must remain server-side.

Examples include:
CLERK_SECRET_KEY
AUTH_SECRET
DATABASE_URL
ANTHROPIC_API_KEY
ENCRYPTION_KEY
Public browser-safe values may use:
NEXT_PUBLIC_*
only when they are intentionally designed to be public.

Secrets must never be committed to Git.
Security Boundaries

The main security boundaries are:
                Browser
                   │
            Untrusted Environment
                   │
                   ▼
             Next.js Server
                   │
           Authentication
               Clerk
                   │
           Authorization
                   │
                   ▼
             Service Layer
                   │
                   ▼
        Supabase / Backend
                   │
             RLS / Access
                   │
                   ▼
          Protected Resources
Each boundary must be explicitly enforced.

⸻

File Storage Boundary

Files must not be treated as ordinary public assets when they belong to private users.

Private Vault files should follow:
User
 │
 ▼
Authenticated Upload
 │
 ▼
Authorization
 │
 ▼
Storage Service
 │
 ▼
Private Storage
Public assets such as branding images are different from private user files.

The official PsionHQ logo is currently stored in the repository as:
public/logo-icon.png
Scalability Strategy

PsionHQ is designed to scale from a web application into a larger platform.

The architecture should evolve in stages:
Web Application
      ↓
Authentication
      ↓
Database
      ↓
API
      ↓
Platform Services
      ↓
Secure Storage
      ↓
AI / Memory
      ↓
Wallet / Payments
      ↓
Compute / Storage Infrastructure
      ↓
Network Infrastructure
      ↓
PSI Ecosystem
Each stage should build on stable interfaces from the previous stage.

⸻

Separation of Concerns

The application should maintain clear boundaries between:
Presentation
     ↓
Application Logic
     ↓
Services
     ↓
Infrastructure
Presentation

Responsible for:

* UI;
* navigation;
* forms;
* display;
* interaction.

Application Logic

Responsible for:

* orchestration;
* validation;
* state;
* user workflows.

Services

Responsible for:

* AI;
* Memory;
* Vault;
* Wallet;
* authentication integration;
* database operations.

Infrastructure

Responsible for:

* database;
* storage;
* external providers;
* compute;
* network;
* future Psion infrastructure.

⸻

Production Readiness

A module is not considered production-ready simply because its frontend exists.

A production module should have:

* authentication;
* authorization;
* persistence;
* validation;
* security controls;
* error handling;
* monitoring;
* logging;
* testing;
* deployment configuration;
* recovery procedures;
* documented operational behavior.

This requirement applies especially to:

* AI;
* Memory;
* Vault;
* Wallet;
* payments;
* PSI infrastructure.

⸻

Current State

The current PsionHQ repository should be understood as:
                PsionHQ Web Platform
                         │
        ┌────────────────┼────────────────┐
        │                │                │
     Frontend        Authentication     Backend
        │                │                │
     Next.js           Clerk          Supabase
        │                                 │
        └───────────────┬─────────────────┘
                        │
                 Platform Modules
                        │
        ┌───────────────┼───────────────┐
        │               │               │
       AI            Memory           Vault
                                        │
                                      Wallet
The frontend architecture exists.

Authentication is connected through Clerk.

Supabase is part of the backend/database foundation.

The deeper production infrastructure is still being implemented.

⸻

Development Direction

The architectural development order is:
1. Web Application
        ↓
2. Authentication
        ↓
3. Authorization
        ↓
4. Database
        ↓
5. API / Services
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
The order may evolve as implementation requirements change, but new services should integrate with the existing architectural boundaries rather than bypassing them.

⸻

Architectural Rules

1. Keep authentication centralized through Clerk.
2. Keep authorization at trusted backend/database boundaries.
3. Keep Supabase access behind appropriate application/service boundaries.
4. Never trust client-provided ownership information.
5. Never expose private server credentials.
6. Keep sensitive operations server-side.
7. Reuse shared UI and design components.
8. Keep platform modules modular.
9. Do not couple unrelated services unnecessarily.
10. Prefer typed interfaces.
11. Validate external input.
12. Treat Vault and Wallet as security-critical.
13. Do not represent planned infrastructure as implemented.
14. Update documentation when architecture changes.
15. Keep the source code as the primary source of truth.
Long-Term Architecture

The long-term Psion ecosystem is intended to extend beyond the website.
                         Psion Ecosystem
                                │
                         ┌──────┴──────┐
                         │             │
                      PsionHQ          PSI
                         │
              ┌──────────┼──────────┐
              │          │          │
             AI       Memory      Vault
              │          │          │
              └──────────┼──────────┘
                         │
                       Wallet
                         │
              Psion Infrastructure
                         │
              ┌──────────┼──────────┐
              │          │          │
           Compute    Storage    Network
This is the long-term architectural direction.

It is not a statement that every component shown above is currently implemented.

⸻

Source of Truth

When architecture documentation conflicts with implementation, the following order applies:
1. Source code
2. Database schema
3. Infrastructure configuration
4. Tests
5. Environment configuration
6. Documentation
7. Product vision
Documentation must be updated when the implementation changes.

⸻

Summary

PsionHQ is being built as a modular platform rather than a collection of disconnected pages.

The current web application provides the foundation:
Next.js
   +
Clerk
   +
Supabase
   +
Service Architecture
   +
AI / Memory / Vault / Wallet Modules
The next architectural stage is to progressively connect the platform modules to production backend infrastructure while preserving:

* security;
* user control;
* modularity;
* scalability;
* maintainability;
* clear separation of responsibilities.

⸻

PsionHQ

Infrastructure for Intelligence
Ψ