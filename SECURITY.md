# Security policy

## Supported versions

Talon UI is in **0.x alpha**. Only the latest minor (`0.5.x`) receives security fixes.

| Version | Supported |
|---|---|
| 0.5.x | ✅ |
| < 0.5 | ❌ |

When 1.0 lands, the policy switches to "latest two majors".

## Reporting a vulnerability

1. Do NOT open a public GitHub issue.
2. Email <security@talon-ui.dev> (or, until that mailbox is wired, the maintainer at dark.lijin@gmail.com).
3. Include reproduction steps, affected component/version, and potential impact.

Expected response time: 72 hours for first reply; a fix or mitigation plan within 14 days for confirmed issues.

## Scope

Vulnerabilities of interest:
- XSS via component-rendered content (e.g. unsanitised slots).
- Injection via the `eslint.config.mjs` hex regex allowlist if bypassable.
- Build-pipeline supply-chain risks (peer / runtime dep CVEs).
- Default a11y violations that produce keyboard traps.

Out of scope:
- Visual issues with no security impact (open a GitHub issue instead).
- Issues in dependencies that don't affect Talon UI (file upstream).
