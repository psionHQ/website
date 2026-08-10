# PsionHQ Security

## Overview

Security is a core architectural requirement of PsionHQ.

PsionHQ is being designed to protect:

- user accounts;
- authentication sessions;
- personal data;
- application data;
- AI context;
- Memory data;
- Vault files;
- Wallet data;
- digital assets;
- infrastructure credentials;
- internal services.

Security must be implemented at the architecture, backend, database, application, and infrastructure layers.

The existence of a user interface does not mean that the underlying service is production-secure.

A feature is considered production-ready only after the required authentication, authorization, validation, storage, encryption, monitoring, testing, and operational controls have been implemented and verified.

---

# Security Architecture

The current security model is based on the following structure:

```text
                         User
                          │
                          ▼
                    PsionHQ Client
                          │
                    Untrusted Layer
                          │
                          ▼
                    Next.js Server
                          │
                          ▼
                   Clerk Authentication
                          │
                          ▼
                    User Identity
                          │
                          ▼
                    Authorization
                          │
                          ▼
                    Service Layer
                          │
                 ┌────────┴────────┐
                 │                 │
              Supabase       External Services
                 │
          Database / Storage
                 │
                 ▼
          Protected Resources
The browser is always treated as an untrusted environment.

Authentication identifies the user.

Authorization determines what the user is allowed to access.

The database and backend must enforce ownership and access rules.

⸻

Security Principles

1. Never Trust the Client

All data received from the browser must be treated as untrusted input.

The client must not be trusted to determine:

* user identity;
* resource ownership;
* permissions;
* transaction validity;
* access rights;
* security state.

⸻

2. Authentication and Authorization Are Separate

Authentication answers:

Who is the user?

Authorization answers:

What is the user allowed to access?

PsionHQ uses Clerk for authentication.

Authorization must be enforced by trusted application, backend, and database layers.

⸻

3. Server-Side Security

Security-sensitive operations must remain server-side.

Examples include:

* database operations;
* privileged API requests;
* secret-key operations;
* encryption-key operations;
* payment operations;
* wallet operations;
* file authorization;
* administrative operations.

The browser must never receive private server credentials.

⸻

Authentication

Clerk

Clerk is the current authentication provider for PsionHQ.

Clerk provides the authentication foundation for:

* registration;
* sign-in;
* sessions;
* user identity;
* authenticated state;
* protected application access.

The intended authentication flow is:
User
 │
 ▼
PsionHQ Authentication
 │
 ▼
Clerk
 │
 ▼
Authenticated Session
 │
 ▼
Protected Application
Authentication should remain centralized.

Individual platform modules must not create independent authentication systems.

⸻

Authorization

Authorization is enforced separately from authentication.

The intended model is:
Clerk User
    │
    ▼
Authenticated Identity
    │
    ▼
Application Authorization
    │
    ▼
Database Authorization
    │
    ▼
User-Owned Resource
A user-provided ID must never be treated as sufficient proof of ownership.

For example, the following approach is unsafe:
Browser → user_id → database
The application must instead derive the authenticated identity from the trusted authentication context and verify ownership at the backend/database layer.

⸻

Supabase Security

Supabase is part of the current database and backend foundation.

The application includes:
@supabase/supabase-js
@supabase/ssr
Supabase security must be based on:

* authenticated access;
* authorization;
* Row Level Security;
* least-privilege access;
* server-side operations where required;
* controlled database policies.

⸻

Row Level Security

Supabase Row Level Security should be used for protected user-owned data where applicable.

The intended model is:
Authenticated User
       │
       ▼
Supabase
       │
       ▼
RLS Policy
       │
       ▼
User-Owned Records
A database query must not rely solely on frontend restrictions.

Frontend restrictions improve user experience but do not constitute security.

⸻

Data Ownership

PsionHQ data should have explicit ownership relationships.

Conceptually:
User
 │
 ├── Profile
 ├── Settings
 ├── AI Data
 ├── Memory
 ├── Vault
 │     └── Files
 └── Wallet
Each protected resource must have a clearly defined owner or access policy.

Cross-user access must be denied unless an explicit authorization model allows it.

⸻

Vault Security

Vault is a security-critical subsystem.

Vault is intended to protect user files and private data.

The target security architecture is:
User
 │
 ▼
Authentication
 │
 ▼
Authorization
 │
 ▼
Vault Service
 │
 ├── File Validation
 ├── Ownership Verification
 ├── Storage Authorization
 ├── Encryption
 └── Access Control
 │
 ▼
Private Storage
Vault Requirements

Before Vault can be considered production-ready, the system should implement and verify:

* authenticated uploads;
* authenticated downloads;
* ownership checks;
* access-control policies;
* file-type validation;
* file-size validation;
* private storage;
* secure file paths;
* database/storage consistency;
* deletion controls;
* recovery strategy;
* encryption architecture;
* key management;
* auditability;
* abuse protection.

The current Vault interface does not by itself mean that all of these controls are already implemented.

⸻

Encryption

Encryption is part of the planned security architecture for sensitive PsionHQ data.

Encryption should be used where required for:

* sensitive stored data;
* protected Vault content;
* sensitive application data;
* security-critical credentials or secrets where appropriate.

Encryption keys must be separated from encrypted data.

A key must never be hard-coded into application source code.

Keys must not be exposed through public environment variables.

⸻

Encryption Key Management

Encryption keys are security-critical secrets.

They must:

* remain server-side;
* never be committed to Git;
* never be exposed through NEXT_PUBLIC_*;
* never be hard-coded;
* have controlled access;
* have a documented rotation strategy;
* be protected independently from encrypted data.

The exact production key-management architecture will be finalized before production deployment of encrypted Vault infrastructure.

⸻

Environment Secrets

The project uses environment variables for sensitive configuration.

The repository contains .env.example as a configuration template.

Real secrets must never be committed to Git.

Examples of sensitive values include:
CLERK_SECRET_KEY
AUTH_SECRET
DATABASE_URL
ANTHROPIC_API_KEY
ENCRYPTION_KEY
Public configuration should only use NEXT_PUBLIC_* when the value is intentionally safe to expose to the browser.

⸻

Secret Management Rules

Never:

* commit secrets to Git;
* place private keys in frontend source code;
* expose secret keys through public environment variables;
* log secret values;
* send private keys to the browser;
* store server credentials in local storage;
* hard-code production credentials.

Always:

* use environment variables;
* keep secrets server-side;
* rotate compromised credentials;
* restrict access;
* use least privilege;
* review changes involving security-sensitive configuration.

⸻

API Security

Future PsionHQ APIs must implement:

* authentication;
* authorization;
* input validation;
* output validation where appropriate;
* rate limiting where required;
* error handling;
* logging;
* abuse protection;
* secure secret handling.

The intended request flow is:
Client
  │
  ▼
API
  │
  ▼
Authentication
  │
  ▼
Authorization
  │
  ▼
Validation
  │
  ▼
Service
  │
  ▼
Database / External Service
Requests must fail safely when authentication or authorization requirements are not satisfied.

⸻

Input Validation

All external input must be validated.

This includes:

* form input;
* API requests;
* file metadata;
* file uploads;
* query parameters;
* route parameters;
* external service responses where appropriate.

Validation must not rely solely on frontend controls.

Server-side validation is required for security-sensitive operations.

⸻

Database Security

Database security should follow the principle of least privilege.

Requirements include:

* controlled database credentials;
* Row Level Security;
* explicit ownership policies;
* restricted privileged access;
* safe migrations;
* validated schema changes;
* controlled administrative access.

Database credentials must never be exposed to the browser.

⸻

Wallet Security

Wallet is a security-critical subsystem.

Before production deployment, Wallet should implement:

* authenticated access;
* authorization;
* secure asset ownership;
* transaction validation;
* transaction history;
* protection against unauthorized operations;
* secure signing architecture where applicable;
* audit logging;
* recovery procedures;
* abuse and fraud controls.

The current Wallet interface does not represent a fully production-ready financial system.

⸻

Payment Security

Any future payment system must be implemented independently from ordinary application UI.

Payment operations must:

* occur through trusted backend services;
* validate transactions server-side;
* protect payment credentials;
* prevent unauthorized requests;
* maintain transaction records;
* provide appropriate auditability;
* follow applicable legal and regulatory requirements.

No payment capability should be considered production-ready until its complete security and compliance requirements are established.

⸻

AI Security

AI services must protect:

* user prompts;
* user data;
* Memory context;
* private files;
* provider credentials;
* internal system instructions;
* service credentials.

AI provider API keys must remain server-side.

The intended architecture is:
User
 │
 ▼
AI Workspace
 │
 ▼
Authenticated AI Service
 │
 ├── Authorization
 ├── User Context
 ├── Memory Access
 └── AI Provider
AI services must only receive data that the authenticated user is authorized to access.

⸻

Memory Security

Memory may contain sensitive personal or application context.

Memory must therefore implement:

* user ownership;
* authorization;
* controlled retrieval;
* controlled deletion;
* appropriate retention rules;
* access logging where required;
* secure database policies.

Memory must not be globally accessible to unrelated users or services.

⸻

Session Security

Authenticated sessions must be managed through the authentication provider.

The application should:

* verify authentication on protected operations;
* avoid trusting client-only authentication state;
* protect privileged routes;
* handle expired sessions safely;
* avoid exposing session secrets;
* avoid storing sensitive session credentials manually.

⸻

Error Handling

Security-sensitive errors must fail safely.

User-facing error messages should not reveal:

* database credentials;
* API keys;
* encryption keys;
* internal infrastructure;
* SQL queries;
* stack traces;
* private file paths;
* sensitive user information.

Internal logging may contain diagnostic information only when it is safe and appropriately protected.

⸻

Logging and Monitoring

Production systems should maintain appropriate security and operational logs.

Potential events include:

* authentication events;
* authorization failures;
* sensitive file operations;
* wallet operations;
* payment operations;
* administrative actions;
* unexpected service failures.

Logs must not contain:

* passwords;
* API keys;
* encryption keys;
* session secrets;
* unnecessary sensitive personal data.

⸻

Rate Limiting and Abuse Protection

Rate limiting should be introduced for security-sensitive endpoints.

Potential targets include:

* authentication-related requests;
* AI requests;
* file uploads;
* API endpoints;
* wallet operations;
* payment operations;
* account recovery;
* public forms.

The exact limits should be based on the service requirements and threat model.

⸻

Dependency Security

Project dependencies must be kept reasonably current.

Security-sensitive dependency updates should be reviewed before deployment.

The project should periodically check for:

* vulnerable packages;
* outdated dependencies;
* compromised packages;
* unnecessary dependencies.

Dependencies should be removed when they are no longer required.

⸻

Repository Security

The Git repository must not contain:

* production secrets;
* API keys;
* private certificates;
* private encryption keys;
* user passwords;
* database dumps containing private information;
* private user files.

.gitignore should prevent accidental commits of local environment files and generated sensitive data.

⸻

Environment Separation

Development, staging, and production environments should remain separated.

Conceptually:
Development
     │
     ├── Development Database
     ├── Development Keys
     └── Development Services

Staging
     │
     ├── Staging Database
     ├── Staging Keys
     └── Staging Services

Production
     │
     ├── Production Database
     ├── Production Keys
     └── Production Services
Production credentials must never be reused casually in local development.

⸻

Backup and Recovery

Production data requires a documented recovery strategy.

The final production architecture should define:

* database backups;
* storage backups;
* recovery procedures;
* retention periods;
* disaster recovery;
* restoration testing;
* operational ownership.

Backups containing sensitive information must receive appropriate protection.

⸻

Security Testing

Security testing should progressively include:

* authentication tests;
* authorization tests;
* RLS tests;
* API tests;
* input validation tests;
* file upload tests;
* file access tests;
* wallet tests;
* payment tests;
* dependency scanning;
* penetration testing where appropriate.

Security-sensitive functionality should not rely only on manual testing.

⸻

Security Development Lifecycle

Security should be integrated into each development stage.
Design
  ↓
Threat Consideration
  ↓
Implementation
  ↓
Validation
  ↓
Testing
  ↓
Review
  ↓
Deployment
  ↓
Monitoring
Security is not a final step added after development.

⸻

Current Security Status

The current repository contains the following security foundations:

* Clerk authentication integration;
* protected application architecture;
* server/client separation;
* environment-based secret configuration;
* Supabase integration foundation;
* typed application architecture;
* validation foundations;
* error handling foundations.

The following areas remain under development:

* complete authorization model;
* complete Supabase Row Level Security;
* production Vault security;
* production encryption architecture;
* production key management;
* production Wallet security;
* production payment security;
* complete API security;
* security monitoring;
* comprehensive automated security testing.

⸻

Production Security Requirements

Before PsionHQ is considered production-ready at platform scale, the following areas must be implemented and verified:
Authentication
      ↓
Authorization
      ↓
Database Security
      ↓
Row Level Security
      ↓
API Security
      ↓
Vault Security
      ↓
Encryption
      ↓
Key Management
      ↓
AI Security
      ↓
Memory Security
      ↓
Wallet Security
      ↓
Payment Security
      ↓
Monitoring
      ↓
Testing
      ↓
Incident Response
The exact requirements may evolve as the platform architecture develops.

⸻

Security Principles Summary

PsionHQ follows these core security principles:

1. Zero trust toward client input.
2. Centralized authentication.
3. Explicit authorization.
4. User-owned data.
5. Least-privilege access.
6. Server-side security controls.
7. Protected secrets.
8. Database-level authorization.
9. Secure file handling.
10. Secure digital-asset handling.
11. Controlled external integrations.
12. Continuous validation and testing.
13. Clear separation between implemented and planned security features.

⸻

Security Roadmap

The security roadmap follows the platform development roadmap.
Current
  │
  ├── Clerk Authentication
  ├── Protected Routes
  ├── Environment Secrets
  └── Application Validation
       │
       ▼
Next
  │
  ├── Authorization
  ├── Supabase RLS
  ├── Resource Ownership
  ├── API Security
  └── Security Testing
       │
       ▼
Later
  │
  ├── Vault Encryption
  ├── Key Management
  ├── Wallet Security
  ├── Payment Security
  ├── Monitoring
  └── Advanced Infrastructure Security
Security Source of Truth

When security documentation differs from actual implementation, the implementation and security configuration remain the source of truth.

Security documentation must be updated whenever:

* authentication changes;
* authorization changes;
* database policies change;
* storage architecture changes;
* encryption architecture changes;
* wallet architecture changes;
* payment architecture changes;
* infrastructure changes.

⸻

Final Principle

PsionHQ should not treat security as a feature.

Security is part of the platform architecture.

Every new system must be designed with:
Identity
   +
Authorization
   +
Data Protection
   +
Validation
   +
Monitoring
   +
Recovery
The objective is to build PsionHQ so that security scales together with the platform rather than being added after the platform has already grown.

⸻

PsionHQ

Infrastructure for Intelligence
Ψ