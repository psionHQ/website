# Contributing to PSIONHQ Website

Thank you for your interest in contributing to the PSIONHQ website. This document describes the process for contributing effectively.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Before You Start](#before-you-start)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Commit Message Format](#commit-message-format)
- [Code Style](#code-style)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this standard. Unacceptable behaviour should be reported to [conduct@psionhq.com](mailto:conduct@psionhq.com).

---

## Before You Start

- Check the [open issues](https://github.com/psionhq/website/issues) to see if your change or bug report already exists
- For significant changes, open an issue first to discuss the proposal before investing time in implementation
- Security vulnerabilities must be reported privately — see [SECURITY.md](SECURITY.md) for details

---

## Development Setup

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/website.git
cd website

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start development server
npm run dev
```

See [docs/Development.md](docs/Development.md) for detailed setup instructions and project conventions.

---

## How to Contribute

### 1. Create a branch

Branch from `main` using a descriptive name:

```bash
# For features
git checkout -b feat/your-feature-name

# For bug fixes
git checkout -b fix/issue-description

# For documentation
git checkout -b docs/what-you-are-documenting

# For chores (deps, config, tooling)
git checkout -b chore/what-you-are-updating
```

### 2. Make your changes

Follow the [code style guidelines](#code-style) below. Keep changes focused — one logical change per PR.

### 3. Verify your work

```bash
# Run the linter
npm run lint

# Run a production build (catches TypeScript errors)
npm run build
```

All lint errors must be resolved and the build must succeed before opening a PR.

### 4. Commit your changes

Follow the [commit message format](#commit-message-format) below.

### 5. Open a pull request

Push your branch and open a PR against `main`. Fill in the PR template completely.

---

## Pull Request Process

1. **Fill in the PR template** — describe what changed and why
2. **Ensure CI passes** — all checks must be green
3. **Request a review** — at least one maintainer review is required
4. **Address review feedback** — respond to all comments before merging
5. **Keep your branch up to date** — rebase against `main` if the branch diverges significantly

PRs that include unrelated changes, break the build, or fail lint will not be merged until those issues are resolved.

---

## Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|---|---|
| `feat` | A new feature or visible improvement |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons — no logic change |
| `refactor` | Code restructuring without behaviour change |
| `chore` | Build process, dependency updates, tooling |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |

### Scope (optional)

The scope identifies the area of the change:

`navbar`, `hero`, `pricing`, `blog`, `dashboard`, `forms`, `ui`, `deps`, `config`, `docs`

### Examples

```
feat(pricing): add annual/monthly billing toggle
fix(navbar): correct mobile menu aria-expanded state
docs(architecture): add component hierarchy diagram
chore(deps): update framer-motion to 12.43.0
```

---

## Code Style

### TypeScript

- Use TypeScript for all new files
- Define prop interfaces at the top of each component file
- Avoid `any` — use proper types or `unknown`
- Prefer `interface` over `type` for object shapes

### React Components

- Default to React Server Components — add `"use client"` only when interactivity or browser APIs are required
- Keep components focused — if a component grows beyond ~150 lines, consider splitting it
- Colocate data constants with the component that uses them (as `SCREAMING_SNAKE_CASE` arrays/objects)

### Styling

- Use Tailwind CSS utility classes
- No inline `style={{}}` props except for values that cannot be expressed as Tailwind classes (e.g. dynamic widths, text-shadow)
- Follow the spacing and visual conventions documented in [docs/Brand.md](docs/Brand.md)
- Do not add new colour values without aligning with the design system

### Accessibility

- All decorative SVGs must include `aria-hidden="true"`
- Interactive elements must have accessible labels (`aria-label`, `aria-expanded`, etc.)
- Form inputs must have associated `<label>` elements
- Maintain proper heading hierarchy (`h1` → `h2` → `h3`)

---

## Reporting Bugs

Open a GitHub issue with the following information:

- **Clear title** describing the bug
- **Steps to reproduce** — numbered, specific
- **Expected behaviour** — what should happen
- **Actual behaviour** — what happens instead
- **Browser and OS** — relevant for UI bugs
- **Screenshots or recordings** — if applicable

For security vulnerabilities, do **not** open a public issue. Follow the process in [SECURITY.md](SECURITY.md).

---

## Suggesting Features

Open a GitHub issue with:

- **Clear title** and description of the feature
- **Problem it solves** — what user or developer need does this address?
- **Proposed solution** — how you envision it working
- **Alternatives considered** — other approaches you thought about

Feature requests are reviewed by the core team. Not all suggestions will be implemented, but all will be read.

---

## Questions

For general questions about the codebase, open a GitHub Discussion. For product or support questions, use [psionhq.com/contact](https://psionhq.com/contact).
