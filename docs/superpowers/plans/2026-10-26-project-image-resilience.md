# Project Image Resilience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the Work page polished when an authentic remote project screenshot fails to load by falling back to the existing honest typographic project treatment instead of showing a broken image.

**Architecture:** Preserve the current screenshot registry and project-card structure. `ProjectImage` will remember the specific source that failed and render the same fallback already used for projects without a trustworthy visual. A Playwright regression check will deliberately block `raw.githubusercontent.com` and verify the flagship project card degrades cleanly.

**Tech Stack:** React 19, Vite, Playwright, Node test runner

**Spec:** `docs/IMAGE-AUDIT.md`

## Global Constraints

- Keep authentic screenshots as the canonical imagery source.
- Do not wire AI/generated `project-images` assets over real captures or honest fallbacks.
- Do not redesign Work-page architecture or project data.
- No `main` changes, merges, or production deploys.

## Review Focus

- A failed remote screenshot should not leave a broken-image icon.
- A project whose screenshot fails should retain its title, stack, and summary in the existing fallback.
- A successful screenshot should render exactly as it does today.
- Changing to a different image source should not be poisoned by a prior source failure.
- Existing browser checks, accessibility checks, and responsive screenshots must stay green.

---

### Task 1: Add the failing browser regression

**Files:**
- Modify: `scripts/browser-smoke.mjs`

**Interfaces:**
- Consumes: the existing `/work` route and `.project-card` / `.project-fallback` DOM contract.
- Produces: a browser assertion proving the Zombies Hub 2.0 card falls back when GitHub-hosted screenshot requests fail.

- [ ] **Step 1: Write the failing test**
  - Create an isolated Playwright context.
  - Abort `https://raw.githubusercontent.com/**`.
  - Visit `/work`.
  - Find the Zombies Hub 2.0 card and assert it contains `.project-fallback` and no `.project-shot`.

- [ ] **Step 2: Run CI and verify RED**
  - Expected: validation fails on the new fallback assertion because `ProjectImage` currently leaves the failed `<img>` mounted.

### Task 2: Make project images fail gracefully

**Files:**
- Modify: `src/components/ProjectImage/ProjectImage.jsx`

**Interfaces:**
- Consumes: existing `image`, `title`, `stack`, and `summary` props.
- Produces: the same image markup on success and the existing fallback markup after `image.src` errors.

- [ ] **Step 1: Implement minimal source-specific error state**
  - Track the failed `image.src`.
  - Render the existing typographic fallback when no image exists or the current source has failed.
  - Add `onError` to mark only the current source as failed.

- [ ] **Step 2: Run CI and verify GREEN**
  - Expected: lint, unit tests, build, and all browser checks pass.

### Task 3: Visual verification and checkpoint

**Files:**
- No production-code changes unless verification exposes a defect.

- [ ] **Step 1: Inspect the CI browser evidence**
  - Check desktop, tablet, and mobile Work-page screenshots in both themes for regressions.

- [ ] **Step 2: Verify branch state and report**
  - Confirm the branch head is cleanly pushed.
  - Do not merge or deploy.
