# PsionHQ Roadmap

## Overview

This roadmap describes the development direction of PsionHQ.

PsionHQ is being developed progressively, with priority given to a stable application foundation, security, data ownership, scalable backend architecture, and reliable infrastructure.

The roadmap distinguishes between:

- completed foundation;
- current development;
- next implementation stages;
- long-term infrastructure.

Features listed in future stages are not considered implemented until they are actually delivered and verified in the repository.

---

# Current Foundation

The following areas are already part of the current PsionHQ application foundation.

### Web Application

- Next.js application;
- React application layer;
- TypeScript;
- Tailwind CSS;
- responsive interface;
- public website;
- dashboard application;
- reusable component system;
- shared layouts;
- navigation;
- loading states;
- error handling;
- validation foundations.

### Authentication

- Clerk integration;
- registration;
- sign-in;
- authenticated sessions;
- protected application environment;
- user identity handling.

### Backend Foundation

- Supabase integration;
- Supabase client/server integration foundation;
- database connectivity foundation;
- service architecture;
- environment configuration.

### Platform Modules

The application currently contains the main platform areas:

- AI;
- Memory;
- Vault;
- Wallet;
- Settings;
- Overview.

These modules currently represent the application architecture and user experience.

Not every backend service behind these modules is production-complete.

---

# Phase 1 — Stabilize the Core

## Status

**Current priority**

The first priority is to establish a reliable foundation before expanding the platform.

### Goals

- stabilize the Next.js application;
- maintain strict TypeScript;
- remove unnecessary technical debt;
- keep the repository structure clean;
- synchronize documentation with implementation;
- establish consistent error handling;
- establish consistent validation;
- verify authentication flows;
- verify protected routes;
- verify environment configuration;
- maintain responsive behavior.

### Verification

The application should consistently pass:

```bash
npm run lint
npm run build
before major changes are considered complete.

⸻

Phase 2 — Authentication and Authorization

Status

Authentication implemented; authorization being strengthened

Clerk provides the authentication foundation.

The next objective is to make authorization consistent across all protected resources.

Goals

* centralize authentication;
* verify authenticated sessions;
* establish resource ownership rules;
* prevent cross-user data access;
* implement server-side authorization;
* integrate authorization with Supabase;
* establish Row Level Security;
* prevent reliance on client-provided user IDs;
* document access-control rules.
Target Architecture
User
 │
 ▼
Clerk
 │
 ▼
Authenticated Identity
 │
 ▼
Authorization
 │
 ▼
Supabase RLS / Backend
 │
 ▼
User-Owned Resources
Phase 3 — Database Architecture

Status

In development

Supabase is already part of the project foundation.

The next stage is to establish a stable production data model.

Goals

* define core database schema;
* define user ownership relationships;
* define platform module tables;
* establish indexes;
* establish constraints;
* establish Row Level Security;
* define migrations;
* define database naming conventions;
* define data lifecycle rules;
* document schema ownership.
Core Data Areas
User
 │
 ├── Profile
 ├── Settings
 ├── AI Data
 ├── Memory
 ├── Vault
 │     └── Files
 └── Wallet
The actual database schema remains the source of truth.

⸻

Phase 4 — Backend and API

Status

Next major development stage

The platform requires a stable backend service layer connecting the frontend to databases and external infrastructure.

Goals

* define API boundaries;
* establish service interfaces;
* implement server-side operations;
* standardize validation;
* standardize errors;
* establish authorization middleware;
* establish rate limiting where required;
* implement logging;
* establish monitoring;
* keep external API credentials server-side.
Target Flow
Frontend
   ↓
Application Logic
   ↓
Service Layer
   ↓
API / Server
   ↓
Authorization
   ↓
Supabase / External Services
Phase 5 — Vault

Status

Application layer exists; production infrastructure in development

Vault is intended to become the secure file and data layer of PsionHQ.

Goals

* database-backed file metadata;
* secure storage;
* private file access;
* upload authorization;
* download authorization;
* file ownership;
* file validation;
* file lifecycle management;
* deletion;
* recovery strategy;
* encryption architecture;
* key management;
* audit logging.
Target Flow
User
 ↓
Vault
 ↓
Authentication
 ↓
Authorization
 ↓
Storage Service
 ↓
Private Storage
Vault should not be considered production-ready until the complete security model is implemented and verified.

⸻

Phase 6 — Memory

Status

Application layer exists; backend in development

Memory is intended to provide persistent context for users and future AI services.

Goals

* persistent memory storage;
* user ownership;
* memory metadata;
* permissions;
* retrieval;
* updates;
* deletion;
* retention rules;
* privacy controls;
* integration with AI;
* scalable storage architecture.
Target Flow
User
 ↓
Memory Service
 ↓
Authorization
 ↓
Memory Storage
 ↓
Retrieval
 ↓
AI / User
Memory must remain user-controlled and access-controlled.

⸻

Phase 7 — AI Infrastructure

Status

Application layer exists; production infrastructure in development

The AI workspace is already part of the PsionHQ application.

The next stage is connecting it to reliable backend AI services.

Goals

* secure AI service layer;
* provider abstraction;
* server-side API keys;
* request validation;
* usage controls;
* error handling;
* context management;
* Memory integration;
* conversation persistence;
* scalable AI infrastructure;
* observability.

Target Architecture
User
 ↓
AI Workspace
 ↓
AI Service
 ↓
Authentication
 ↓
Authorization
 ↓
Memory / Context
 ↓
AI Provider
AI provider credentials must never be exposed to the browser.

⸻

Phase 8 — Wallet and Payments

Status

Application layer exists; production infrastructure in development

Wallet is intended to become the digital asset and payment layer of PsionHQ.

Goals

* define wallet architecture;
* define asset ownership;
* secure transaction model;
* transaction history;
* payment infrastructure;
* authorization;
* fraud and abuse protection;
* transaction validation;
* auditing;
* recovery procedures.

Wallet infrastructure must be treated as security-critical.

⸻

Phase 9 — PSI Infrastructure

Status

Long-term development

PSI (Ψ) is the internal token/coin associated with the Psion ecosystem.

PSI is not intended to be a stablecoin.

The long-term concept is to connect PSI with Psion services and infrastructure.

Potential use cases include:

* payments;
* computational resources;
* data storage;
* infrastructure services;
* access to Psion network resources.

Future Areas

* blockchain architecture;
* network architecture;
* token infrastructure;
* transaction infrastructure;
* wallet integration;
* infrastructure payments;
* economic model;
* security model.

These components are not considered implemented in the current website repository.

⸻

Phase 10 — Psion Infrastructure

Status

Long-term development

The long-term Psion architecture extends beyond the web application.

The target infrastructure may include:
PsionHQ
   │
   ├── AI
   ├── Memory
   ├── Vault
   └── Wallet
          │
          ▼
   Psion Infrastructure
          │
     ┌────┼────┐
     │    │    │
  Compute Storage Network
Future Goals

* compute infrastructure;
* storage infrastructure;
* network infrastructure;
* scalable data services;
* distributed services;
* infrastructure monitoring;
* capacity management;
* service orchestration.

This is a long-term architectural direction, not a statement of current implementation.
Security Roadmap

Security is developed alongside every platform stage.

Current

* Clerk authentication;
* protected application environment;
* environment variable separation;
* typed application architecture;
* validation foundations.

Next

* authorization model;
* Supabase Row Level Security;
* resource ownership;
* server-side validation;
* secure service boundaries;
* audit logging.

Later

* Vault encryption architecture;
* key management;
* wallet security;
* infrastructure security;
* advanced monitoring;
* security audits.

⸻

Testing Roadmap

Current

Basic build and lint validation.

Next

Introduce:

* unit tests;
* service tests;
* database tests;
* authentication tests;
* authorization tests;
* API tests.

Later

Introduce:

* end-to-end testing;
* security testing;
* performance testing;
* load testing;
* infrastructure testing.

Critical functionality should have automated coverage before being considered production-ready.

⸻

Infrastructure Roadmap

The infrastructure roadmap is intentionally separated from the web application.
Web Application
      ↓
Backend
      ↓
Database
      ↓
Storage
      ↓
AI / Memory
      ↓
Wallet / Payments
      ↓
Compute
      ↓
Network
      ↓
PSI Ecosystem
Each layer should be established only when the previous architectural boundaries are stable enough to support it.

⸻

Documentation Roadmap

Documentation must remain synchronized with the actual repository.

Required documentation areas include:
Architecture
Development
Roadmap
Security
Vision
Brand
Documentation must distinguish between:
Implemented
Connected
Under Development
Planned
Long-Term Concept
Future concepts must never be presented as completed functionality.

⸻

Current Priority Order

The current development priority is:
1. Application stability
        ↓
2. Authentication
        ↓
3. Authorization
        ↓
4. Database
        ↓
5. Backend / API
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
Security, user control, data ownership, scalability, and maintainability remain priorities throughout the roadmap.

⸻

Definition of Done

A feature should not be considered complete merely because its UI exists.

A production feature should have, where applicable:

* frontend implementation;
* backend implementation;
* authentication;
* authorization;
* database persistence;
* validation;
* error handling;
* security controls;
* tests;
* monitoring;
* deployment configuration;
* documentation.

The implementation status must be reflected accurately in the repository documentation.

⸻

Roadmap Principle

PsionHQ is being developed progressively.

The objective is not to add the largest number of features as quickly as possible.

The objective is to build a stable foundation that can support a much larger platform without repeated architectural rewrites.
Stable Foundation
        ↓
Secure Backend
        ↓
Reliable Platform Services
        ↓
Scalable Infrastructure
        ↓
Psion Ecosystem
PsionHQ

Infrastructure for Intelligence
Ψ