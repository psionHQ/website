# Security

This document describes the security practices for the PSIONHQ website repository and the process for reporting security vulnerabilities.

---

## Reporting a Vulnerability

**Do not report security vulnerabilities through public GitHub issues, pull requests, or discussions.**

If you discover a security vulnerability in this repository, please report it responsibly using one of the following channels:

### Option 1 — GitHub Security Advisory (Preferred)

Use GitHub's private vulnerability reporting:

1. Navigate to the **Security** tab of this repository
2. Click **Report a vulnerability**
3. Complete the form with as much detail as possible

### Option 2 — Email

Send a detailed report to: **security@psionhq.com**

Use the subject line: `[SECURITY] Brief description`

---

## What to Include

A good vulnerability report includes:

- A clear description of the vulnerability and its potential impact
- Step-by-step instructions to reproduce the issue
- The URL, component, or file path where the vulnerability exists
- Any proof-of-concept code (if applicable)
- Your assessment of severity (Critical / High / Medium / Low)
- Your contact details (for follow-up questions)

---

## Response Timeline

| Stage | Target Time |
|---|---|
| Initial acknowledgement | Within 48 hours |
| Severity assessment | Within 5 business days |
| Fix or mitigation | Dependent on severity |
| Disclosure | Coordinated with reporter |

We follow a coordinated disclosure model. We will work with you to agree on an appropriate disclosure timeline once a fix is in place.

---

## Scope

The following are **in scope** for security reports:

- Cross-site scripting (XSS) vulnerabilities in the web application
- Sensitive data exposure (e.g. secrets, credentials, PII in the codebase)
- Dependency vulnerabilities with a confirmed exploit path
- Authentication or authorisation bypasses (once auth is implemented)
- Server-side request forgery (SSRF)
- Remote code execution

The following are **out of scope**:

- Vulnerabilities in third-party services (report those to the respective vendor)
- Findings from automated scanners without evidence of exploitability
- Self-XSS requiring the user to execute code in their own browser console
- Social engineering attacks
- Physical security
- Denial of service without significant practical impact

---

## Current Security Posture

### What this repository contains

This is the public marketing website for PSIONHQ. The repository currently contains:

- A statically rendered Next.js application (no backend)
- No authentication infrastructure
- No database credentials or connection strings
- No API keys (all forms are UI-only with no backend wiring)
- No user data

### Environment Variables

No secrets should ever be committed to this repository. The `.env.example` file documents the variables needed for local development — it contains only placeholder values, never real secrets.

Production secrets are managed through the deployment platform's environment variable system and are never stored in the repository.

### Dependencies

We use `npm audit` to monitor for known vulnerabilities in dependencies. If you discover a dependency vulnerability that affects this project, please report it.

---

## Security Hygiene for Contributors

If you are contributing to this repository, please follow these practices:

1. **Never commit secrets.** No API keys, tokens, passwords, private keys, or credentials of any kind.

2. **Review your diff before opening a PR.** Accidentally committed secrets must be reported immediately — do not assume a squash or rebase removes them from history.

3. **Keep dependencies up to date.** When updating dependencies, check the release notes for security advisories.

4. **Use environment variables.** All configuration that differs between environments must use environment variables. Never hardcode URLs, hostnames, or configuration values that should be kept private.

5. **Be cautious with `dangerouslySetInnerHTML`.** It is not currently used in this codebase. If you need to add it, it must be reviewed carefully for XSS risk.

---

## Contact

For non-security questions, use [psionhq.com/contact](https://psionhq.com/contact).

For security matters only: **security@psionhq.com**
