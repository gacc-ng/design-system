# Security Policy

The `@gacc-ng` team takes the security of our software and supply chain seriously. This document outlines our policy for reporting and handling security vulnerabilities.

## Supported Versions

Only the latest active major and minor releases receive security updates.

| Version | Supported          |
| ------- | ------------------ |
| `0.x`   | :white_check_mark: |
| `< 0.1` | :x:                |

## Reporting a Vulnerability

If you discover or suspect a security vulnerability within `@gacc-ng` libraries, schematics, or GitHub Actions workflows, please report it privately via **GitHub Private Vulnerability Reporting**.

**Do NOT report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

### How to Submit a Report

1. Navigate to the repository's [Security Advisories page](https://github.com/gacc-ng/design-system/security/advisories).
2. Click **"Report a vulnerability"** (or use direct link: [New Security Advisory](https://github.com/gacc-ng/design-system/security/advisories/new)).
3. Provide a clear description of the vulnerability, including:
    - Affected components, versions, or files.
    - Proof of Concept (PoC) or reproducible steps.
    - Potential impact and threat model assessment.
    - Any proposed remediation or mitigation.

### Response Timelines (SLA)

- **Acknowledgment:** Within 48 hours of receipt.
- **Triage & Validation:** Within 5 business days.
- **Fix & Disclosure:** Coordinated release with a GitHub Security Advisory and CVE issuance (if applicable) within 30 days of validation, or earlier for critical severity issues.

## Safe Harbor & Responsible Disclosure

We support coordinated vulnerability disclosure. If you conduct vulnerability research in good faith and adhere to this policy:

- We will not pursue legal action against you.
- We will work with you to understand and resolve the issue quickly.
- We will acknowledge your contribution publicly in the release notes and advisory (if you wish to be credited).
