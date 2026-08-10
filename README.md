<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://psionhq.com/icon.svg">
  <img src="https://psionhq.com/icon.svg" alt="PsionHQ" width="72" height="72">
</picture>

<h1>PsionHQ</h1>

<p><strong>Infrastructure for Intelligence</strong></p>

<p>
  <a href="https://psionhq.com">Website</a> ·
  <a href="https://psionhq.com/platform">Platform</a> ·
  <a href="https://psionhq.com/developers">Developers</a>
</p>

<p>
  <img src="https://img.shields.io/badge/status-in%20development-0066FF?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

</div>

---

## About PsionHQ

**PsionHQ** is a technology platform being built to bring intelligence, secure data, computation and digital infrastructure into one unified environment.

The platform is designed around a simple principle:

> **Intelligence should work for the user while the user remains in control of their data, infrastructure and digital assets.**

PsionHQ is being developed as a long-term infrastructure platform rather than a single-purpose application.

This repository contains the official PsionHQ web platform, including the public website, application interface, authentication foundation, dashboard architecture, design system and platform foundations.

---

## Core Platform

PsionHQ is being developed around several interconnected capabilities.

### AI

The AI layer is intended to provide users with an intelligent workspace for interacting with AI services and future Psion infrastructure.

The current repository contains the AI workspace interface and application architecture.

The production AI infrastructure is under development.

### Memory

Memory is intended to provide persistent context for the user's interactions and applications.

The goal is to allow users to maintain useful information across sessions while keeping ownership and control of their data within PsionHQ.

The current repository contains the Memory workspace architecture.

The production memory backend is under development.

### Vault

Vault is the secure data and file layer of PsionHQ.

It is intended to provide users with a protected environment for storing and managing their data and files.

The current repository contains the Vault workspace and its application architecture.

Production storage, encryption and backend services are under development.

### Wallet

Wallet is intended to become the user's digital asset and payment interface within PsionHQ.

The platform is being designed around user-controlled assets rather than a traditional banking model.

The production wallet and payment infrastructure are under development.

---

## PSI

**PSI (Ψ)** is the internal token/coin associated with the Psion ecosystem.

PSI is not intended to be a stablecoin.

The long-term concept is for PSI to operate within Psion infrastructure and support services such as:

- payments;
- computational resources;
- data storage;
- infrastructure services;
- access to Psion network resources.

The blockchain, token infrastructure and economic model are separate development areas and are not represented as fully implemented in this website repository.

---

## Psion Infrastructure

The long-term Psion architecture is intended to connect intelligence, data, computation, storage, network infrastructure and digital assets.

```text
                         PsionHQ
                            │
             ┌──────────────┼──────────────┐
             │              │              │
            AI           Memory          Vault
             │              │              │
             └──────────────┼──────────────┘
                            │
                         Wallet
                            │
                    Psion Infrastructure
                            │
             ┌──────────────┼──────────────┐
             │              │              │
          Compute        Storage        Network
             │              │              │
             └──────────────┼──────────────┘
                            │
                           PSI
This represents the target architecture and does not mean that every component is currently production-ready.

⸻

Current Repository

This repository contains the official PsionHQ web platform.

The current focus is to build a clean, secure and scalable application foundation before connecting the production infrastructure behind each platform module.

Implemented

* Next.js application;
* React application layer;
* TypeScript;
* Tailwind CSS design system;
* responsive public website;
* PsionHQ branding;
* public product pages;
* platform pages;
* dashboard application shell;
* authentication integration;
* protected application routes;
* user profile/session handling;
* shared UI components;
* application configuration;
* validation foundations;
* error-handling foundations;
* typed service abstractions;
* dashboard module architecture;
* SEO metadata;
* sitemap;
* robots configuration;
* responsive navigation;
* reusable design components.

Under Development

* production database;
* platform API;
* secure file storage;
* Vault backend;
* Memory backend;
* AI infrastructure;
* Wallet infrastructure;
* payment infrastructure;
* PSI infrastructure;
* production security architecture;
* infrastructure services.

⸻

Authentication

Authentication is implemented using Clerk.

The authentication layer provides the user registration and sign-in foundation for the PsionHQ application.

The application architecture keeps authentication separated from the platform services so that additional backend systems can be connected without rebuilding the user interface.

⸻

Dashboard

The authenticated application currently provides the following platform modules:
Route

Purpose

/dashboard/overview

Main PsionHQ platform overview

/dashboard/ai

AI workspace

/dashboard/memory

Memory workspace

/dashboard/vault

Vault workspace

/dashboard/wallet

Wallet workspace

/dashboard/settings

Account and application settings
These routes establish the product architecture and user experience.

Where backend functionality is not yet connected, the interface uses application-level placeholder or mock data rather than representing unfinished services as production systems.

⸻

Public Website

The public PsionHQ website contains:
Route

Purpose

/

Main PsionHQ landing page

/product

Product and platform overview

/platform

Platform architecture

/pricing

Pricing

/developers

Developer information

/company

Company information

/blog

PsionHQ articles

/contact

Contact

/signin

Authentication

/signup

Registration
Design System

PsionHQ uses a custom dark interface designed around a minimal, technical and infrastructure-oriented visual language.

Design principles

* dark foundation;
* high contrast;
* restrained blue accent;
* clear typography;
* minimal visual noise;
* modular components;
* responsive layouts;
* subtle motion;
* consistent spacing;
* scalable design tokens.
Brand Colors
Token

Value

Primary Blue

#0066FF

Deep Blue

#0040CC

Background

#000000

Surface

#0D0D0D

Border

#1A1A1A

Foreground

#FFFFFF

Silver

#C0C0C0
Purple is not part of the current PsionHQ visual direction.

Psi Companion

The official PsionHQ companion is Psi — an original black cat with small cat ears, large blue/electric-blue eyes, blue glow and the Ψ symbol.

Psi is intended to become the permanent companion character of the PsionHQ platform and interface.
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

Package Manager

npm
Additional backend and infrastructure technologies will be introduced as the platform develops.

⸻

Repository Architecture
website/
├── public/
│
├── src/
│   ├── app/
│   │   ├── blog/
│   │   ├── company/
│   │   ├── contact/
│   │   ├── dashboard/
│   │   │   ├── overview/
│   │   │   ├── ai/
│   │   │   ├── memory/
│   │   │   ├── vault/
│   │   │   ├── wallet/
│   │   │   └── settings/
│   │   ├── developers/
│   │   ├── platform/
│   │   ├── pricing/
│   │   ├── product/
│   │   ├── signin/
│   │   └── signup/
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   ├── forms/
│   │   ├── layout/
│   │   ├── navbar/
│   │   ├── pricing/
│   │   └── ui/
│   │
│   ├── sections/
│   │   ├── ai/
│   │   ├── ecosystem/
│   │   ├── features/
│   │   ├── hero/
│   │   ├── vault/
│   │   └── wallet/
│   │
│   ├── config/
│   ├── constants/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   ├── services/
│   ├── styles/
│   ├── types/
│   └── utils/
│
├── docs/
├── .env.example
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
The architecture is intentionally modular so production backend services can be introduced without restructuring the entire frontend.

⸻

Development Direction

PsionHQ development follows a staged architecture:
1. Product architecture
        ↓
2. Design system
        ↓
3. Web application
        ↓
4. Authentication
        ↓
5. Database
        ↓
6. API / Backend
        ↓
7. Secure Storage
        ↓
8. AI / Memory Services
        ↓
9. Wallet / Payments
        ↓
10. Psion Infrastructure
        ↓
11. PSI Ecosystem
The goal is to avoid building isolated features that later require major architectural rewrites.

Each new subsystem should integrate into the existing PsionHQ platform architecture.

⸻

Development Principles

Security First

Security is treated as a core architectural requirement rather than an additional feature.

User Control

Users should retain control over their data, credentials and digital assets.

Modular Infrastructure

AI, Memory, Vault, Wallet, storage, compute and network services should operate as independent modules connected through clearly defined interfaces.

Scalability

The website is the first application layer of PsionHQ.

The architecture must allow the platform to expand into additional applications, services and infrastructure without rebuilding the core system.

Transparency

Documentation must clearly distinguish between:

* implemented functionality;
* connected functionality;
* functionality under development;
* planned functionality;
* long-term concepts.

PsionHQ documentation should never describe a planned service as production-ready.

⸻

Local Development

Requirements

* Node.js 18.17 or later
* npm 9 or later
Installation
git clone https://github.com/psionHQ/website.git
cd website
npm install
Create the local environment file:
cp .env.example .env.local
Configure the required environment variables.
Development
npm run dev
Open:
http://localhost:3000
Production Build
npm run build
Start Production
npm start
Lint
npm run lint
Documentation

Project documentation is maintained inside docs/.
Document

Purpose

docs/Architecture.md

Application architecture

docs/Roadmap.md

Development roadmap

docs/Development.md

Development status

docs/Brand.md

Brand and design system

docs/Security.md

Security principles

docs/Vision.md

Product vision
All documentation should remain synchronized with the actual implementation.

⸻

Project Status

PsionHQ is actively under development.

The current repository represents the web application and platform foundation.

The production infrastructure behind AI, Memory, Vault, Wallet, storage, compute, payments and PSI will be connected progressively.

The immediate priority is to establish a stable, secure and scalable core before expanding the platform.
Official Channels
Channel

Link

Website

https://psionhq.com

X

https://x.com/psionhq

Telegram

https://t.me/PsionHQ

Instagram

https://www.instagram.com/psionhq

TikTok

https://www.tiktok.com/@psionhq
<div align="center">
PsionHQ

Infrastructure for Intelligence
Ψ
</div>
```
