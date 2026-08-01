# Security Policy

## Reporting a Vulnerability

**Do not report security vulnerabilities through public GitHub issues, pull requests, or discussions.**

If you discover a security vulnerability in this repository, please report it privately.

### Preferred Method — GitHub Security Advisory

1. Navigate to the **Security** tab of this repository
2. Click **Report a vulnerability**
3. Provide a detailed description of the issue

### Alternative — Email

Send your report to: **security@psionhq.com**

Subject line: `[SECURITY] Brief description of the vulnerability`

---

## Response Timeline

| Stage | Target |
|---|---|
| Initial acknowledgement | Within 48 hours |
| Severity assessment | Within 5 business days |
| Fix or mitigation plan | Dependent on severity |
| Coordinated disclosure | Agreed with reporter |

---

## Scope

**In scope:**
- XSS vulnerabilities in the web application
- Secrets or credentials exposed in the repository or build output
- Dependency vulnerabilities with a confirmed exploit path in this project
- Authentication or authorisation bypasses
- Server-side request forgery (SSRF)

**Out of scope:**
- Vulnerabilities in third-party services (report to the respective vendor)
- Scanner-only findings without evidence of exploitability
- Self-XSS
- Social engineering
- Denial of service

---

## Full Security Documentation

See [docs/Security.md](docs/Security.md) for the complete security documentation including contributor security hygiene guidelines.
