# Motion plan: editorial scroll storytelling

Status: **plan only; awaiting approval.** No motion code or package has been added.
Base: `claude/portfolio-polish` @ `41650b1` (redesign + stage 1 images + rework merge).

## 1. Direction and rules

- **Purpose first.** Every effect must answer "what does this help the visitor understand?". Motion tells the story *problem → build → outcome* and walks the visitor through the projects; it is never decoration for its own sake.
- **Identity stays:** dark navy surfaces with cyan accent (`--bg #070b18`, `--accent #38bdf8`), plus the light theme from the same tokens. Inter for UI, oversized Inter 800 for editorial headlines. The Middle-earth easter eggs stay where they are (contact mode, footer quote).
- **Tiered tooling**
  - **Tier 1 (default): native.** CSS transitions, `@keyframes`, `IntersectionObserver` reveals, and CSS scroll-driven animations (`animation-timeline: view()` / `scroll()`) behind `@supports`, with the IntersectionObserver path as the fallback.
  - **Tier 2: GSAP core + ScrollTrigger**, only where Tier 1 falls short: pinned sequences with scrubbed timelines and the travelling object's path. This is the **only** animation library.
- **Forbidden:** Spline or any 3D runtime in the hero, generic particle fields, fake AI product imagery, effects without a narrative job, and more than one animation library.

## 2. Effect map per section

| Section | Effect | Tier | Purpose |
|---|---|---|---|
| **Hero** (`About.jsx` `.hero`) | Headline set very large (`clamp(3.5rem, 11vw, 9rem)`), revealed line by line with a clip-path mask (80ms stagger, once). The portrait settles in with a 12px rise. The facts list counts up only if numbers stay factual. The travelling object starts here (§3). | 1 | A confident first read; establishes the object as the guide |
| **Nav** | Hide on scroll down, show on scroll up (transform only). Active link underline slides between items. The mobile menu sheet slides with opacity. | 1 | Gives content room; keeps orientation |
| **Stack strip** | Slow horizontal drift (CSS, paused on hover and focus). Off under reduced motion. | 1 | Ambient signal of breadth; no information lost when static |
| **Selected work** (`FeaturedStudy` ×3) | **Pinned storytelling.** On desktop the section pins while the three case studies advance: the screenshot or fallback panel crossfades, and the title and stats slide in. Scroll progress drives a 3-step indicator. | 2 | One story at a time instead of a long list |
| **Capabilities** | Cards reveal with a 60ms stagger as they enter. Icons draw on via SVG stroke-dashoffset. | 1 | Light rhythm while scanning |
| **About / principles** | Numbered principles reveal in order. Large index numerals use a subtle scroll-linked parallax (CSS `view()`). | 1 | Reading pace |
| **CTA band** | The travelling object arrives and docks beside the CTA (§3). The button gets a one-time cyan glint. | 1–2 | Closes the narrative loop |
| **Work page cards** | Reveal on enter (once). Hover lifts 4px with the accent border (exists now); the screenshot scales 1.03 (exists). Filter changes use a FLIP-style reflow (View Transitions API where supported, instant otherwise). | 1 | Shows that filtering kept your place |
| **Case-study page** | Header copy reveals; stats count up; approach steps reveal in sequence; next-study link has an arrow nudge. Zombies Hub hero is special (§4). | 1–2 | Follows the problem → approach → outcome structure |
| **Screenshots** | Real screenshots only. On enter: a soft unblur from a 1.02 scale. Optional "browser frame" chrome drawn in CSS around real captures. No mock UI. | 1 | Makes real work feel tangible without faking it |
| **Backgrounds** | Static token gradients. One very low-contrast cyan radial glow follows section changes (CSS custom property set on enter). No particles, no noise video. | 1 | Depth without distraction |
| **Route transitions** | View Transitions API crossfade (180ms) where supported; instant otherwise. Focus moves to `<main>` as today. | 1 | Continuity between pages |
| **Hover / focus** | Existing button lift, chip highlight, focus rings unchanged. Focus styles are never animated away. | 1 | Accessibility first |

## 3. The travelling object

One original, lightweight SVG element that moves through the home page along a scroll-linked path. It ties hero → work → capabilities → CTA into one journey. Under 4 kB, no canvas or WebGL.

| Option | Concept | Pros | Cons |
|---|---|---|---|
| **A. "Commit" node** *(recommended)* | A small glowing cyan node with a short trailing line, like a git commit graph. Branches into three short forks at Selected Work (one per case study) and merges back. Docks as the CTA "merge" dot. | Directly tells a developer's story (branch → build → merge); trivially themeable; pure SVG path + `stroke-dashoffset` | Needs careful path design so it doesn't overlap text |
| B. Cursor-caret | A blinking text caret that "types" each section heading, then hops to the next. | Very cheap; on-brand for a developer | Gimmicky if overused; weak visual continuity between sections |
| C. Data packet | A small rounded packet travelling along a dashed "network" line between project cards, like a request/response trip. | Nice fit for the API and bot work | Less personal; similar to many generic tech sites |

**Recommendation: A.** Implementation:
- One absolutely positioned SVG overlay on the home page, with path segments per section.
- Desktop: ScrollTrigger scrubs `strokeDashoffset` plus the node's position along the path (`MotionPathPlugin` ships with GSAP, so no second library).
- Mobile: the node snaps between section anchors with simple fades (no path).
- Reduced motion: a static dot beside each section heading.
- Decorative only: `aria-hidden="true"`, `pointer-events: none`.

## 4. Zombies Hub case-study hero (exploded, layered, real)

Built only from **real** captures. Needed first: a real Zombies Hub 2.0 capture set (home, map select, one map guide; desktop + mobile).
- **Layers:** the 2.0 home as the base, a map guide plate and a mobile capture, offset in z with CSS `transform: translateZ()` / `perspective` (no 3D runtime).
- **On scroll:** the layers start stacked, fan out ("explode") to show that one app now contains what were separate sites, then settle into a clean grid.
- A "before" strip shows the real 1.0 screenshots (`ZHub.webp` + one guide), to contrast seven deployments with one.
- **Fallback:** until the 2.0 captures exist, keep the current typographic hero. **Never** fake the layers.

## 5. Staged implementation

| Stage | Scope | Files touched | Library |
|---|---|---|---|
| 0 | `useReducedMotion` hook, `useInView` hook, `[data-reveal]` CSS utility, `@supports (animation-timeline: view())` utilities, motion tokens (`--motion-fast/base/slow`, easing) | `src/hooks/useReducedMotion.js`, `src/hooks/useInView.js`, `src/Global.css` | none |
| 1 | Hero editorial type + line reveal; nav hide/show; card, capability and principle reveals; screenshot unblur; stack strip drift | `src/pages/About/About.jsx/.css`, `src/components/Nav/*`, `ProjectCard.css`, `ProjectImage.jsx`, `Portfolio.css` | none |
| 2 | View Transitions for routes and filter changes (progressive) | `src/App.jsx`, `src/pages/Portfolio/Portfolio.jsx` | none |
| 3 | Install GSAP. Pinned "Selected work" sequence (desktop only) | `package.json`, `src/components/FeaturedStudy/*`, `src/pages/About/About.jsx`, new `src/motion/gsap.js` (registers plugins once, lazy) | gsap |
| 4 | Travelling commit node (§3) | new `src/components/CommitPath/CommitPath.jsx/.css`, `About.jsx` | gsap (MotionPath, ScrollTrigger) |
| 5 | Zombies Hub layered hero, after real captures exist | `src/pages/CaseStudy/*`, `src/data/screenshots.js`, new assets | gsap (optional) or CSS only |
| 6 | QA pass, budgets, smoke-test additions (reduced-motion assertions, no layout shift) | `scripts/browser-smoke.mjs` | none |

GSAP loads with dynamic `import()` from the home and case-study routes only, after first paint, so it never enters the entry chunk.

**Exact install command (stage 3; needs approval):**

```bash
npm install gsap@^3.13.0
```

GSAP 3.13+ includes ScrollTrigger and MotionPathPlugin in the free package. No `@gsap/react`: a 10-line `useLayoutEffect` + `gsap.context()` helper is enough.

## 6. Performance budget

| Metric | Now (`41650b1` build) | Target after motion |
|---|---|---|
| Entry JS (`index-*.js`) | 301.6 kB / **97.7 kB gz** | ≤ 100 kB gz (no growth: motion code split) |
| Global CSS | 19.9 kB / 4.9 kB gz | ≤ 7 kB gz |
| GSAP chunk (lazy) | — | ≤ 45 kB gz (core + ScrollTrigger + MotionPath), loaded after LCP |
| Project screenshots | 664.6 kB total (12 WebP, lazy) | unchanged; new captures ≤ 120 kB each at 1280 px plus a 640 px variant |
| LCP (Moto G-class, 4G) | not yet measured | ≤ 2.0 s; hero text is the LCP element and must not wait for JS |
| CLS | ~0 (fixed media boxes) | ≤ 0.02; reveals use transform and opacity only |
| INP | not yet measured | ≤ 150 ms; no scroll handlers outside ScrollTrigger and IntersectionObserver |

**Mobile rules** (`(hover: none)` or width < 768 px):
- No pinning.
- Travelling object in snap mode.
- Reveals at most 16px of travel.
- Parallax disabled.
- No `backdrop-filter` animation.
- GSAP not loaded at all on touch devices unless stage 5 needs it.

## 7. Reduced motion

With `prefers-reduced-motion: reduce` (already globally clamped in `Global.css`):
- All reveals render in their final state; content is visible without JS.
- No pinning and no scrub. The commit node is a static dot per section.
- The Zombies layered hero renders as a static grid.
- The stack strip doesn't drift.
- View Transitions are skipped.
- `useReducedMotion` also gates GSAP, so it is never imported.

Without JS, every `[data-reveal]` element is visible by default (`.js-motion` class gating).

## 8. QA checklist

- [ ] Reduced motion: all content visible, nothing pinned, no animation longer than 0.01 ms
- [ ] No-JS: all content visible
- [ ] Desktop 1440, tablet 768, mobile 390 × dark/light: no overflow, no overlap of the commit node with text
- [ ] Keyboard: focus order unchanged inside pinned sections; focus rings visible; pinned sections release on Tab-out
- [ ] Screen reader: decorative SVG is `aria-hidden`; no duplicate announcements from reveals
- [ ] Lighthouse mobile: Performance ≥ 90, CLS ≤ 0.02, LCP ≤ 2.0 s; entry JS ≤ 100 kB gz
- [ ] GSAP chunk absent from the network on touch devices and with reduced motion
- [ ] Scroll back up: pinned sequence and node reverse cleanly; no stuck states after route change (ScrollTrigger killed on unmount)
- [ ] Safari, Firefox, Chrome: scroll-driven CSS falls back to IntersectionObserver where unsupported
- [ ] Only real screenshots; no AI imagery; `scripts/browser-smoke.mjs` still passes
- [ ] Console clean in all routes

**Stop: awaiting approval before stage 0.**
