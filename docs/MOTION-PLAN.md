# Motion plan v2: the travelling ribbon

Status: **plan only; awaiting approval.** No motion code or package has been added.
Base: `claude/portfolio-polish` @ `9e459b8`. Replaces v1's "commit node" with a bolder travelling element.

## 1. Direction and rules

- **Purpose first.** Motion tells the story *problem → build → outcome* and leads the visitor from "who I am" through the three case studies to "let's talk". Every effect needs that job.
- **Identity stays:** dark navy surfaces with cyan accent (`--bg #070b18`, `--accent #38bdf8`); the light theme uses the same tokens (`--accent #0369a1`). Inter, with oversized Inter 800 editorial headlines. The Middle-earth easter eggs stay as they are.
- **Tooling tiers:**
  - **Tier 1 (default): native.** CSS transitions and keyframes, `IntersectionObserver` reveals, CSS scroll-driven animations (`animation-timeline: view()`) behind `@supports`, and View Transitions where supported.
  - **Tier 2: GSAP core + ScrollTrigger,** only for scrubbed or pinned work and the ribbon. This is the only animation library.
- **Forbidden:** Spline or any 3D runtime, generic particle fields, fake or AI product imagery, decorative-only effects, and a second animation library.

## 2. The travelling ribbon

One continuous cyan energy ribbon runs down the home page. It enters behind the hero headline, weaves through every section, and splits into three branches at Selected Work, one reaching toward each case study. The branches merge again and resolve into a single point of light beside the Contact call-to-action. The ribbon looks like it is part of the page because it passes *behind* some cards and type and *in front of* others.

### 2.1 Section-by-section behaviour (home page, `src/pages/About/About.jsx`)

| Section (class) | Ribbon behaviour | Layer |
|---|---|---|
| **Hero** (`.hero`) | Enters from the top-right edge on load (drawn over 1.2 s, after the headline is painted). Sweeps **behind** the giant headline (shows in the counters of letters) and passes **in front of** the portrait's lower edge. A soft leading "spark" travels a short way down, then waits for scroll. | back → front |
| **Stack strip** (`.stack-strip`) | Crosses the strip horizontally **behind** the tech chips, like a cable running under a rail. | back |
| **Selected work** (`.section` + 3 × `FeaturedStudy`) | Desktop: the section pins (§3.2). The ribbon **splits into three branches**. Each branch draws toward its case study as that study becomes active, wraps **in front of** the media frame's corner and tucks **behind** the text column. Inactive branches dim to 25%. | split; front at frame corners, back at text |
| **Capabilities** (`.section--tint`, `.capability` cards) | Branches re-braid into one ribbon, which runs **behind** the four cards (visible in the gutters) and over the tinted background. | back |
| **About / principles** (`.about`, `.about__principles`) | A gentle S-curve beside the numbered principles; passes **in front of** the large index numerals, so they appear "threaded". | front over numerals, back elsewhere |
| **CTA band** (`.cta-band`) | Converges toward the "Contact me" button and **resolves**: the stroke narrows to a point and a single glow pulse plays once when the band is 60% visible. Then it rests. | front |
| **Footer** | Not present (the story ends at Contact). | — |

Other routes: **no full ribbon.** The Work page and case studies get a short static "ribbon tab" beside the page eyebrow (pure SVG, no JS) for continuity. The Zombies Hub case study hero is still the layered real-screenshot treatment (§5).

### 2.2 Depth layering, cheaply

- **Two inline SVGs share one path.** `ribbon-back` sits in the page flow at `z-index: 0`. `ribbon-front` is an identical copy at `z-index: 2`. Section content wrappers (`.container`, cards) get `position: relative; z-index: 1`. Sections themselves stay non-positioned, so their backgrounds paint below `ribbon-back`.
- **The front copy is masked.** Its `<mask>` contains a few `<rect>` "windows" at the crossing points (portrait edge, media-frame corners, numerals, CTA). Everywhere else only the back copy is visible, behind the content. One path definition is drawn twice; there's no per-frame compositing logic.
- **Glow without filters:** a second, wider stroke at 15% opacity under the core stroke, instead of an animated `feGaussianBlur`. Gradient via `linearGradient` using `--accent` / `--accent-strong`.
- **Geometry from the real layout:** sections carry `data-ribbon-anchor` attributes, and `geometry.js` turns their bounding boxes into a cubic Bézier `d` string. It recomputes on `ResizeObserver` (debounced 150 ms) and on font load, never on scroll.
- **Accessibility:** both SVGs are `aria-hidden="true"`, `focusable="false"` and `pointer-events: none`. They never cover interactive targets because the mask windows avoid buttons and links.

### 2.3 Animation (GSAP + ScrollTrigger)

- **Draw:** one ScrollTrigger (`scrub: 0.6`) from the hero to the CTA maps progress to `stroke-dashoffset`, using `getTotalLength()`, on both copies via a shared CSS custom property. This needs no plugin. DrawSVGPlugin is an alternative.
- **Spark head:** a small glowing circle follows the drawn tip using `path.getPointAtLength(progress × length)`, also plugin-free. MotionPathPlugin is an alternative if rotation along the path is wanted.
- **Branches:** three short paths in the pinned Selected Work timeline, drawn and dimmed per active study.
- **Pin:** Selected Work pins for 3 × 80vh on desktop. A 3-step progress indicator and the active case-study panel crossfade.
- **Lifecycle:** everything is created in a `gsap.context()` and reverted on route change or unmount. `ScrollTrigger.refresh()` runs after the geometry recompute.
- **Licence:** since GSAP 3.13 (April 2025) the whole library, including the formerly paid DrawSVG, MotionPath and SplitText plugins, is free under the standard GSAP licence. GSAP isn't installed in this repo yet, so this couldn't be checked locally. At install, confirm `node_modules/gsap/DrawSVGPlugin.js` exists and read `node_modules/gsap/README.md` / the licence note. The plan doesn't depend on any plugin beyond ScrollTrigger.

### 2.4 Variants

| | **A. Signal ribbon (SVG)** *(recommended)* | **B. Fibre bundle (Canvas 2D)** |
|---|---|---|
| Look | One smooth cyan ribbon with a soft glow and a spark head; branches into three. | Three thin strands braided together, with light pulses flowing along them; they unbraid into the three case studies and rebraid at Contact. |
| Depth | Two SVG copies + mask windows (above). | Two canvases (back and front) with the same clip windows, redrawn on scroll. |
| Cost | Static DOM paths; the browser rasterises them. Animation only changes `stroke-dashoffset`. Very cheap. | A redraw every scroll frame on two canvases, plus a HiDPI backing store. Heavier on mobile GPUs and INP. |
| Theming / a11y | CSS variables; prints and zooms crisply; works in light theme for free. | Must re-read tokens and redraw on theme change; blurry if DPR handling slips. |
| Fallback | The same SVG shown fully drawn (no JS animation). | Needs a separate static SVG fallback anyway. |

**Recommendation: A.** It does the job with the fewest moving parts, layers naturally with the DOM, themes through tokens, and its static state is the mobile and reduced-motion fallback.

## 3. Other effects (unchanged from v1, condensed)

| Section | Effect | Tier |
|---|---|---|
| Hero | Headline `clamp(3.5rem, 11vw, 9rem)`, line-by-line clip-path reveal (80 ms stagger, once); portrait settles with a 12px rise | 1 |
| Nav | Hide on scroll down, show on scroll up (transform only); sliding active underline | 1 |
| Selected work | Desktop pin with a crossfading case-study panel (§2.3) | 2 |
| Capabilities, principles | Staggered reveals; icons draw on via `stroke-dashoffset` | 1 |
| Work page cards | Reveal once; existing hover lift; filter changes animate via View Transitions | 1 |
| Case study | Copy reveals, stats count up, steps reveal in sequence | 1 |
| Screenshots | Real captures only; soft unblur from 1.02 scale on enter; optional CSS browser frame | 1 |
| Backgrounds | Static token gradients; one low-contrast glow that follows the active section | 1 |
| Route transitions | View Transitions crossfade (180 ms); focus still moves to `<main>` | 1 |

## 4. Mobile and touch (`(hover: none)` or width < 768 px)

- **GSAP is not loaded.** No pinning anywhere.
- **Static ribbon:** a simplified vertical S-path built from the same geometry. It is drawn with CSS `animation-timeline: view()` where supported, and shown fully drawn otherwise. Back layer only, no mask windows.
- **No branches:** the three case studies each get a small static cyan tick on their left edge instead.
- Reveals travel at most 16 px; no parallax; no `backdrop-filter` animation.

## 5. Zombies Hub case-study hero (real screenshots only)

Needs a real Zombies Hub 2.0 capture set first (home, map select, one guide; desktop + mobile).
- Layers are offset in CSS 3D (`perspective`, `translateZ`); there's no 3D runtime.
- On scroll they fan out to show that one app replaces seven sites, then settle into a grid.
- A "before" strip shows the real 1.0 screenshots.
- Until the 2.0 captures exist, the current text fallback stays. No faked layers.

## 6. Performance budget and protections

| Metric | Now (`9e459b8`) | Target |
|---|---|---|
| Entry JS (`index-*.js`) | 301.95 kB / **97.80 kB gz** | **≤ 100 kB gz.** Ribbon and GSAP are code-split; static ribbon geometry ≤ 2 kB gz in the home chunk |
| Global CSS | 19.90 kB / 4.94 kB gz | ≤ 7 kB gz |
| Lazy motion chunk (GSAP core + ScrollTrigger + ribbon animation) | — | **≤ 45 kB gz.** Estimated ~40 kB gz before install. If over budget after install, drop any optional plugin first (draw and spark are already plugin-free) |
| Project screenshots | 664.6 kB (12 WebP, lazy) | unchanged; new captures ≤ 120 kB each plus a 640 px variant |
| LCP (mid-range phone, 4G) | not measured (browser tools blocked) | ≤ 2.0 s |
| CLS | ~0 | ≤ 0.02 |
| INP | not measured | ≤ 150 ms |

**LCP protection:**
- The hero headline is the LCP element and renders without JS.
- The ribbon SVG mounts in `requestIdleCallback` after first paint, and GSAP is imported dynamically after `load`.
- No new fonts or images in the critical path.

**CLS protection:**
- The ribbon is absolutely positioned with `pointer-events: none` and never takes layout space.
- Reveals use transform and opacity only.
- The pin spacer is created before first scroll; ScrollTrigger runs with `anticipatePin: 1`.

**INP protection:**
- No custom scroll listeners; ScrollTrigger only.
- Geometry recompute runs only on a debounced `ResizeObserver`.
- No animated SVG filters.
- Branch dimming uses opacity only.

## 7. Reduced motion and no-JS

- `prefers-reduced-motion: reduce`:
  - The ribbon renders **fully drawn and static**, including its depth layering. Branches show, with no spark and no pulse.
  - No pinning. GSAP is never imported.
  - Reveals render in their final state; the global clamp in `Global.css` already exists.
- **No JS:** content is fully visible (reveal states are gated behind a `.js-motion` class). The ribbon simply isn't shown.

## 8. Implementation stages

| Stage | Scope | Files touched | Library |
|---|---|---|---|
| 0 | Motion tokens, `useReducedMotion`, `useInView`, `.js-motion` gating, reveal utilities | `src/Global.css`, `src/hooks/useReducedMotion.js`, `src/hooks/useInView.js`, `src/App.jsx` | none |
| 1 | Native reveals, hero type, nav hide/show, screenshot unblur | `src/pages/About/About.jsx/.css`, `src/components/Nav/Nav.jsx/.css`, `src/components/ProjectCard/ProjectCard.css`, `src/components/ProjectImage/ProjectImage.jsx`, `src/pages/Portfolio/Portfolio.css`, `src/pages/CaseStudy/CaseStudy.css` | none |
| 2 | View Transitions for routes and filters | `src/App.jsx`, `src/pages/Portfolio/Portfolio.jsx` | none |
| 3 | **Static ribbon:** anchors, geometry, back and front SVG with mask windows, z-index layering. Also the mobile and reduced-motion version | new `src/components/Ribbon/Ribbon.jsx`, `Ribbon.css`, `geometry.js`; `src/pages/About/About.jsx/.css` (anchors, `position/z-index` on containers) | none |
| 4 | **Install GSAP**; lazy loader; scrubbed draw, spark, branches; Selected Work pin | `package.json`, `package-lock.json`, new `src/motion/loadGsap.js`, new `src/components/Ribbon/animate.js`, `src/components/FeaturedStudy/FeaturedStudy.jsx/.css` | gsap |
| 5 | Zombies Hub layered hero (after real 2.0 captures) | `src/pages/CaseStudy/CaseStudy.jsx/.css`, `src/data/screenshots.js`, new assets | none or gsap |
| 6 | QA, bundle check, smoke-test additions (reduced-motion state, no CLS, ribbon `aria-hidden`, GSAP absent on touch) | `scripts/browser-smoke.mjs` | none |

**Install command (stage 4 only, after approval):**

```bash
npm install gsap@^3.13.0
```

No `@gsap/react`; a small `useLayoutEffect` + `gsap.context()` helper is enough.

## 9. QA checklist

- [ ] Reduced motion: ribbon static and fully drawn, nothing pinned, no animation longer than 0.01 ms, GSAP absent from the network
- [ ] No-JS: all content visible
- [ ] 1440 / 768 / 390 × dark / light: ribbon never covers text or controls; mask windows line up after resize and font load
- [ ] Ribbon passes behind cards and headline and in front at the planned crossings; nothing flickers at section boundaries
- [ ] Keyboard: focus order unchanged inside the pin; focus rings visible above the front ribbon layer
- [ ] Screen reader: ribbon SVGs `aria-hidden`; no duplicate announcements
- [ ] Lighthouse mobile ≥ 90; LCP ≤ 2.0 s; CLS ≤ 0.02; INP ≤ 150 ms; entry JS ≤ 100 kB gz; motion chunk ≤ 45 kB gz
- [ ] Touch devices: no pin, GSAP not requested, static ribbon only
- [ ] Route change away and back: no leftover ScrollTriggers, no stuck pin
- [ ] Safari, Firefox, Chrome: `view()` falls back cleanly where unsupported
- [ ] Real screenshots only; smoke test passes; console clean

**Stop: awaiting approval before stage 0.**
