# 12-React-Portfolio: 27-point security report

- **Date:** 2026-11-09, branch `claude-forge` (identical to `origin/main` at the start)
- **What it is:** a static Vite/React portfolio. There is no backend, database, login or uploads, so most server items are N/A. The contact form calls EmailJS straight from the browser.
- **Scope:** code in this repo only. Render and EmailJS dashboard settings were not inspected.

## Automated gates added

| Gate | Where |
|---|---|
| gitleaks working-tree scan (pinned 8.21.2, sha256-checked), allowlist, and a proof step with run-time fake tokens | [security-pipeline.yml](.github/workflows/security-pipeline.yml), [.gitleaks.toml](.gitleaks.toml) |
| `npm audit --audit-level=high` on production dependencies (strict); dev tools report only | security.yml |
| Config validation (package.json parses, lockfile present, no tracked secret files, `.env` ignored, no secrets in committed config) | [.github/scripts/check-config.mjs](.github/scripts/check-config.mjs) |
| Lint, tests, build and browser checks | existing [validate.yml](.github/workflows/validate.yml), not duplicated |

No deploy step exists in CI and there is no `render.yaml`, so pushing to `claude-forge` cannot deploy from CI.

## Fixed here

- **`.gitignore` did not ignore `.env`** (the new config gate caught it). Added `.env`, `.env.*` and `!.env.example`. No `.env` file is tracked today.
- `npm audit fix` (lockfile only): `follow-redirects` high, fixed.

## Test coverage (status note)

- **Unit and static tests:** `scripts/*.test.mjs`, 13 tests in 7 files (artwork generation and regression, case-study routes, resume PDF, route metadata, theme bootstrap, general unit), run with `node --test`.
- **Browser checks:** 5 Playwright scripts (smoke, artwork, artwork delivery, route metadata, fonts) run in CI with mocked email delivery.
- **No coverage measurement**, and no component-level tests for `src/`. Form validation (`src/utils/validation.js`) and storage (`src/utils/storage.js`) are exercised only through the smoke and unit tests.
- Local run: 12 of 13 unit tests pass. The failing one (`artwork derivatives preserve originals…`) is a Windows `EBUSY` file-lock on a temp file, and it fails the same way without my lockfile change. Linux CI is the reference.

## Checklist

| # | Item | Status | Evidence |
|---|---|---|---|
| 1 | Authentication | N/A | No accounts. |
| 2 | API keys server-side | PASS (with note) | The EmailJS service ID, template ID and public key are in the bundle by design (`src/utils/Email.js:4-7`). Abuse protection (allowed domains, rate limit) lives in the EmailJS dashboard: UNVERIFIED. |
| 3 | Database lockdown | N/A | No database. |
| 4 | HTTPS/TLS | UNVERIFIED | Render settings. |
| 5 | Password hashing | N/A | No passwords. |
| 6 | Server-side validation | N/A / PASS | No server. Client validates the email address before sending (`src/utils/Email.js:10`). |
| 7 | XSS prevention | PASS (partial) | React escapes output; a grep of `src/` for `dangerouslySetInnerHTML` found none. |
| 8 | Audit logging | N/A | No server. |
| 9 | Admin authorization | N/A | None. |
| 10 | Injection | N/A | No queries. |
| 11 | Env/config security | PASS after fix | `.env` now gitignored and enforced by CI. |
| 12 | Rate limiting | UNVERIFIED | Contact-form spam control is EmailJS-side. |
| 13 | CORS | N/A | Static site. |
| 14 | Security headers / CSP | UNVERIFIED | Static hosting headers are set in Render, not in this repo (no meta CSP in `index.html`). |
| 15 | Session cookies | N/A | None. |
| 16 | CSRF | N/A | No authenticated actions. |
| 17 | Password reset | N/A | None. |
| 18 | File uploads | N/A | None. |
| 19 | Price verification | N/A | None. |
| 20 | Debug off in production | PASS (partial) | Vite production build; no debug routes. `VITE_REVIEW_HASH_ROUTER` only switches the router type (`src/main.jsx:17`). |
| 21 | Vulnerable dependencies | PASS | Production audit: 0 high or critical. Dev: `sharp` high (libvips CVEs; build-time image processing of the repo's own images only). **Fixed 2026-11-10:** sharp 0.34.5 to 0.35.5 (test: `scripts/sharp-version.test.mjs`); `npm audit` is now 0 vulnerabilities in all trees. |
| 22 | Unused packages | UNVERIFIED | Not checked. |
| 23 | Exposed files / source maps | PASS (partial) | Public folder holds only icons, robots, sitemap and a preview image. |
| 24 | Git history secret scan | **FAIL (known, open)** | [docs/SECURITY-TODO.md](docs/SECURITY-TODO.md): a The One API key was committed in `f4999e4` and is in history of every branch. Current files on this branch are clean (CI working-tree scan). **Owner action: revoke or rotate the key.** The nightly history scan also found a second historical key, an email-validation API key in `src/pages/Contact/Contact.jsx` (commits f4999e4, be4c214; allowlisted in `.gitleaks.toml` as known). Revoke it too. Not done by me, since rotation needs the owner. |
| 25 | Revoke/rotate plan | OPEN | Same item. Checklist is in SECURITY-TODO.md. |
| 26 | Full review | PASS (partial) | Small static surface. |
| 27 | Rerun tests, report | PASS (CI) | CI is the reference; see the status above. |

## Outcome

GO for the static site as far as checked. The one open item that matters is rotating the exposed The One API key (item 24/25). Also open: `sharp` major upgrade, and confirming EmailJS domain allow-listing.

## Pipeline levels (one reusable workflow)

[security-pipeline.yml](.github/workflows/security-pipeline.yml) takes a `level` input; three thin callers choose it.

| Level | Caller | Runs on | Adds |
|---|---|---|---|
| LOW | `security-low.yml` | every PR and every claude-forge push | gitleaks (tree + scanner proof), `npm audit` high/critical, config checks, build and tests where the repo's own CI does not already run them |
| MED | `security-med.yml` | nightly and manual | full-history gitleaks, dependency review, red-team tests where the repo has them |
| HIGH | `security-high.yml` | manual / pre-launch | ZAP baseline (and API fuzzing where there is an API) against a local instance with fake data, never production; then a GO / NO-GO verdict. No exemptions at this level: any high or critical advisory, failed check or open FAIL in this report is NO-GO |

Until these files are on the default branch, the med and high callers also run when `claude-forge` changes them, because schedule and manual triggers need the default branch.
