# Project image audit

> **Update 2026-10-25 (canonical covers).** Each project with a real capture now owns `docs/portfolio/cover.webp` on its `main` branch, and `src/data/screenshots.js` loads it from `raw.githubusercontent.com`. Fresh live captures: Zombies Hub 2.0 (home page), MERN Book Search (results for "Dune"), Kanban (public demo board), Candidate Search (reference profile, avatar blurred), Weather (Chicago forecast). Reused real captures: Fairway Finder (signed-in map view, already its README image), The Daily Bytes (`Project.png`), and the seven legacy guides (April 2025 PNGs below). This repo's own cover is bundled locally because its default branch (`sandbox`) does not carry unreleased work.
> **Typographic fallback, by design:** War Oracle, Clash Commander, raspbi-pilot and Captain Hook (Discord bots; no real capture without exposing server/member names), Social Network API (no UI), Tech Quiz (repo GIF is the bootcamp's demo), Python Banking (repo images are labelled mock-ups). The findings below are the original audit.

Audited 2026-10-23 on branch `sandbox` (commit `752579a`), compared with `origin/gandalf/rework-2026-10-15` using remote-tracking refs that may be stale. Nothing has been changed yet; this file records findings only.

**Summary:** every one of the 16 current project thumbnails is AI-generated and must be replaced. The repo already contains authentic browser screenshots for 11 projects, all from about April 2025. The remaining projects need new captures or real non-visual evidence.

**Live URLs:** none were checked. WebFetch and curl were both refused in this session, so every live URL below is **unchecked**.

## 1. Where project data and images live

### Current branch (`sandbox`)
- **Data:** `src/data/projects.js` exports `categories`, `caseStudies`, `projects` and `archivedProjects`, plus `getCaseStudy`.
- **Images:** `import.meta.glob('../assets/thumbnails/webp/*.webp')` loads `src/assets/thumbnails/webp/<name>.webp` (1280×720) and `<name>-640.webp` (the small-screen variant).
- **Rendering:** `src/components/ProjectImage/ProjectImage.jsx` renders the images with `srcSet` and `sizes`, fixed width and height, and lazy loading.
  - `ProjectCard.jsx` uses it for project cards.
  - `Portfolio.jsx` uses it for the case-study tiles.
  - `CaseStudy.jsx` uses it for the case-study pages.
- **Legacy guides:** shown only as GitHub links in the collapsed "Archive" section of `/work`, with no images. `der-eisendrache-guide*.webp` is loaded by the glob but no project uses it.
- **Only other image:** `src/assets/Pictures/bryen-headshot.webp` (About page).

### Rework branch (`origin/gandalf/rework-2026-10-15`)
- **Data:** written directly into `src/pages/Portfolio/Portfolio.jsx` as a `projects` array of `{ description, repoLink, renderLink, liveLabel, screenshot, status, inactive }`.
- **Images:**
  - the same 16 AI thumbnails, as `src/assets/thumbnails/*.webp`
  - six real legacy screenshots as `src/assets/Pictures/{ZHub,GK,MOTD,Origins,REV,ZETZ}.webp`.
- **Extra data compared with `sandbox`:**
  - a Captain Hook live URL
  - legacy guide cards, with "Guide in 2.0" links to the Zombies Hub 2.0 map routes
  - an `inactive` / "Hosting pending" flag for Hub 1.0 and Origins.

## 2. Why the current thumbnails are AI-generated

All 16 thumbnails share one template:
- a dark, painted AI background (mountains, castles, neon rooms)
- a handwritten-style slogan, e.g. "Better Rounds Ahead", "Good Code Better Days", "Progress Over Perfection"
- a row of feature tiles along the bottom, and a tagline strip in the footer
- an invented top nav, often with "Add to Server", "View on GitHub" or "Live Demo" buttons.

They also contradict the real projects:
- **Non-web projects shown as web apps:** command-line, bot and API projects appear as web dashboards (Python Banking, raspbi-pilot, Social Network API, Tech Quiz).
- **Invented buttons:** "Live Demo" appears on projects that have no deployment (Candidate Search card, Tech Quiz, Python Banking).
- **Mismatches with the real screenshots in the repo:**
  - Daily Bytes: red brand in the thumbnail; the real app has a blue header.
  - MERN Book Search: a featured-books grid with ratings; the real app is a plain "Google Books Search" page.
  - Candidate Search: filters and a results list; the real app is a single swipe-style profile card.
  - Weather: radar, UV and air-quality panels that the real app doesn't have.
  - Fairway Finder: a dark sidebar layout; the real app is light blue with a green header.
  - Kanban: a "Review" column, but the project has three columns.
- **Real people and invented data:** some thumbnails show real third-party GitHub users (Dan Abramov, Sindre Sorhus, Addy Osmani, Kent C. Dodds) and invented stats.

## 3. Per-project table

**Verdict codes:**
- **AI** = AI-generated or fake UI
- **TPL** = duplicated template style
- **REAL** = authentic browser screenshot.

| # | Project | Image file(s) in use | Verdict | Evidence | GitHub repo | Live / deploy URL | Loads? | Status | Real asset already in repo | Recommended authentic replacement |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Zombies Hub 2.0 | `thumbnails/webp/zombies-hub-2(.webp, -640.webp)` | AI + TPL | Recreates the real 1.0 hub layout ("The Multiverse Is Fractured", same map tiles; compare `Pictures/ZHub.png`) but adds AI zombie art and a restyled nav. Not a verifiable capture of 2.0 | https://github.com/PHTMGatt/Zombies-Hub-2.0 | https://zombies-hub-2-0.onrender.com/ | unchecked | active (flagship) | none of 2.0 (`ZHub.png` is 1.0) | Real desktop (1440×900) and mobile (390×844) captures of the live home page and one map route |
| 2 | Fairway Finder | `thumbnails/webp/fairway-finder*` | AI + TPL | Real app is light blue with a green header and a Google Map; the thumbnail is an invented dark sidebar layout with a slogan | https://github.com/PHTMGatt/Fairway-Finder | https://fairway-finder.onrender.com | unchecked | active (flagship) | `src/assets/Pictures/FairwayFinder.png` | Use the PNG now; recapture desktop and mobile (trip planner and map, signed in with a demo account) |
| 3 | War Oracle | `thumbnails/webp/war-oracle*` | AI + TPL | Fake marketing landing page with "Add to your Server", AI castle art and invented war stats; the project is a Discord bot with no website | https://github.com/PHTMGatt/War-Oracle-Bot | none | n/a | active | none | Real Discord screenshot of a `/war` embed or alert, with server and member names cropped or blurred |
| 4 | Clash Commander | `thumbnails/webp/clash-commander*` | AI + TPL | Fake landing page with invented member and uptime stats | https://github.com/PHTMGatt/Clash-Commander-Bot | none | n/a | active | none | Real Discord screenshot of slash-command output (audit or inactivity report), names cropped |
| 5 | raspbi-pilot | `thumbnails/webp/raspbi-pilot*` | AI + TPL | Invents a web dashboard (CPU, memory, Restart buttons); the project is a Node process launcher | https://github.com/PHTMGatt/raspbi-pilot | none | n/a | active | none | Real terminal or log output of a run (bots starting), or a process diagram drawn from the code |
| 6 | Captain Hook | `thumbnails/webp/captain-hook*` | AI + TPL | Fake landing page with neon art and a mock GitHub file tree | https://github.com/PHTMGatt/Discord-WebHook-Bot | https://discord-webhook-bot-1f23.onrender.com/register (rework branch only) | unchecked | active | none | Real Discord channel showing a webhook message from a real push, plus the `/register` page if it loads |
| 7 | MERN Book Search Engine | `thumbnails/webp/mern-book-search*` | AI + TPL | Real app is a plain "Google Books Search" page with Bootstrap styling; the thumbnail invents a featured-books grid, ratings and a library scene | https://github.com/PHTMGatt/18-MERN-Book-Search-Engine | https://one8-mern-book-search-engine.onrender.com | unchecked | active (bootcamp-era; verify) | `src/assets/Pictures/MERN_Book_Search.png` | Use the PNG now; recapture search results and saved books |
| 8 | The Daily Bytes | `thumbnails/webp/daily-bytes*` | AI + TPL | Real app has a blue header, a category sidebar and real news cards; the thumbnail invents a red brand, AI skyline and headlines | https://github.com/PHTMGatt/The-Daily-Bytes | https://the-daily-bytes-o4jo.onrender.com | unchecked | active (verify) | `src/assets/Pictures/DailyBytes.png` | Use the PNG now; recapture desktop and mobile |
| 9 | Kanban Board | `thumbnails/webp/kanban-board*` | AI + TPL | Shows a "Review" column that the project doesn't have (three columns), plus an AI backdrop and slogan | https://github.com/PHTMGatt/14-Todo-Board | https://one4-todo-board.onrender.com | unchecked | active (bootcamp-era; verify) | none | New capture: login page, then the board with a demo account |
| 10 | Candidate Search | `thumbnails/webp/candidate-search*` | AI + TPL | Real app is a single profile card with − and + buttons; the thumbnail invents filters, a list of real developers and a "Live Demo" button | https://github.com/PHTMGatt/13-Candidate-Search | https://one3-candidate-search-u82d.onrender.com | unchecked | active (bootcamp-era; verify) | `src/assets/Pictures/CandiSearch.png` | Use the PNG now; recapture the candidate card and saved list |
| 11 | Weather Dashboard | `thumbnails/webp/weather-app*` | AI + TPL | Real app is a plain cyan page and shows a Kelvin bug ("274.83°F"); the thumbnail invents radar, UV and air-quality panels | https://github.com/PHTMGatt/09-Weather-App | none | n/a | legacy (no deployment) | `src/assets/Pictures/Screenshot9New.png` | Use the PNG (optionally fix the Kelvin bug and run it locally to recapture) |
| 12 | Social Network API | `thumbnails/webp/social-network-api*` | AI + TPL | Fake API landing page; the project is a backend with no UI | https://github.com/PHTMGatt/17-Social-Network-API | none | n/a | legacy (coursework) | none | Real Insomnia or Postman request and response screenshots, or a data-model diagram derived from the Mongoose schemas |
| 13 | Tech Quiz Test Suite | `thumbnails/webp/tech-quiz*` | AI + TPL | Fake test-runner dashboard and an invented "Live Demo" button | https://github.com/PHTMGatt/19-Testing-Tech-Quiz-Test-Suite | none (walkthrough video https://youtu.be/FcIQsPgJqd8) | n/a | legacy (coursework) | none | Real Cypress runner screenshot or `cypress run` terminal summary, or a frame from the real video |
| 14 | Python Banking System | `thumbnails/webp/python-banking-system*` | AI + TPL | Shows a web dashboard, but the project is a command-line app; also an invented "Live Demo" | https://github.com/PHTMGatt/22-Banking-System | none | n/a | legacy (coursework) | none | Real terminal session: login, deposit, transfer, overdraft refused |
| 15 | This Portfolio | `thumbnails/webp/react-portfolio*` | AI + TPL | Matches no version of the site; invented neon "A Brighter Tomorrow" art and fake featured cards | https://github.com/PHTMGatt/12-React-Portfolio | https://one2-react-portfolio.onrender.com (from `og:url`) | unchecked | active | `src/assets/Pictures/ReactFolio.png` (old version, stopgap only) | Capture the deployed redesign on desktop and mobile once it ships |
| 16 | Der Eisendrache Guide | `thumbnails/webp/der-eisendrache-guide*` (unused on `sandbox`, used as the card image on rework) | AI + TPL (thumbnail); `Pictures/DE.png` is REAL | Thumbnail is an AI landing page with a CoD logo and a fake "Live Site" button; `DE.png` is a real capture (embedded YouTube player, steps grid) | https://github.com/PHTMGatt/Der-Eisendrache-Guide | none standalone; rework links to https://zombies-hub-2-0.onrender.com/maps/der-eisendrache | unchecked | legacy-inactive | `src/assets/Pictures/DE.png` | Use `DE.png` |
| 17 | Zombies Hub 1.0 | `Pictures/ZHub.png` (rework uses the `.webp`) | REAL | Real browser capture of the hub | https://github.com/PHTMGatt/Zombies-Hub | https://zombies-hub.onrender.com (rework says "hosting pending") | unchecked | legacy-inactive | `src/assets/Pictures/ZHub.png` | Keep |
| 18 | Origins Guide | `Pictures/Origins.png` | REAL | Real capture, including native browser audio players | https://github.com/PHTMGatt/Origins-Guide | via 1.0: https://zombies-hub.onrender.com/maps/origins (pending); 2.0 route: https://zombies-hub-2-0.onrender.com/maps/origins | unchecked | legacy-inactive | `src/assets/Pictures/Origins.png` | Keep |
| 19 | Gorod Krovi Guide | `Pictures/GK.png` | REAL | Real capture | https://github.com/PHTMGatt/Gorod-Krovi-Guide | none standalone; 2.0 route: https://zombies-hub-2-0.onrender.com/maps/gorod-krovi | unchecked | legacy-inactive | `src/assets/Pictures/GK.png` | Keep |
| 20 | Mob of the Dead Guide | `Pictures/MOTD.png` | REAL | Real capture | https://github.com/PHTMGatt/MOTD-Guide | none standalone; 2.0 route: https://zombies-hub-2-0.onrender.com/maps/mob-of-the-dead | unchecked | legacy-inactive | `src/assets/Pictures/MOTD.png` | Keep |
| 21 | Revelations Guide | `Pictures/REV.png` | REAL | Real capture | https://github.com/PHTMGatt/Revelations-Guide | none standalone; 2.0 route: https://zombies-hub-2-0.onrender.com/maps/revelations | unchecked | legacy-inactive | `src/assets/Pictures/REV.png` | Keep |
| 22 | Zetsubou No Shima Guide | `Pictures/ZETZ.png` | REAL | Real capture | https://github.com/PHTMGatt/Zetsubou-Guide | none standalone; 2.0 route: https://zombies-hub-2-0.onrender.com/maps/zetsubou-no-shima | unchecked | legacy-inactive | `src/assets/Pictures/ZETZ.png` | Keep |

The real PNGs date from about April 2025. They're authentic and can be used straight away, but they may not match today's deployments, so plan fresh captures for every project that still has a live site.

## 4. Unused or junk image files (delete later, after confirming)

All paths are relative to `src/assets/`.

| File(s) | What it is | Recommendation |
|---|---|---|
| `Pictures/*Pro.svg` (14 files: Banking, Book, Candidate, CaptainHook, ClashCommander, DailyBytes, FairwayFinder, Kanban, Portfolio, RaspbiPilot, Social, Testing, WarOracle, ZHub2) | Generic hand-written SVG placeholders: Arial text, fake "SYSTEM STATUS" panels, gradient circles | Delete; not referenced on `sandbox` |
| `thumbnails/*.png` (16 files) | The AI-generated originals the WebP thumbnails were made from | Delete together with `thumbnails/webp/` once replacements exist |
| `thumbnails/webp/*.webp` (32 files) | The current AI thumbnails (1280 and 640 sizes) | Replace |
| `Pictures/Challenge2.png`, `Pictures/Challenge2New.jpg` | An older bootcamp portfolio page with lorem-ipsum text | Unused; delete or archive |
| `Pictures/render.png` | Old portfolio screenshot that shows the user's personal browser bookmarks bar | **Don't publish** (privacy); delete |
| `Pictures/bryguy.png`, `Pictures/bryguy1.png`, `Pictures/bryen_headshot.jpg` | Personal photo sources (the site uses `bryen-headshot.webp`) | Keep as sources or delete; not project images |
| `assets/react.svg`, `public/vite.svg` | Vite starter leftovers | Delete if unreferenced |

Real screenshots to keep and convert to WebP at 1280 and 640: `FairwayFinder.png`, `DailyBytes.png`, `MERN_Book_Search.png`, `CandiSearch.png`, `Screenshot9New.png`, `DE.png`, `ZHub.png`, `Origins.png`, `GK.png`, `MOTD.png`, `REV.png`, `ZETZ.png`. `ReactFolio.png` is real but shows an outdated version of the portfolio.

## 5. Legacy labels

- **Legacy, inactive** (deployment offline, superseded by Zombies Hub 2.0): Zombies Hub 1.0, Origins, Der Eisendrache, Gorod Krovi, Mob of the Dead, Revelations, Zetsubou No Shima.
- **Legacy coursework** (no deployment; owner to confirm): Weather Dashboard, Social Network API, Tech Quiz Test Suite, Python Banking System.
- **Verify before labelling** (bootcamp-era apps on free Render hosting; links unchecked): Kanban Board, Candidate Search, MERN Book Search, The Daily Bytes.
- **Active:** Zombies Hub 2.0, Fairway Finder, War Oracle, Clash Commander, raspbi-pilot, Captain Hook, This Portfolio.

## 6. Screenshot tooling

- **Playwright is not available.**
  - No `playwright`, `playwright-core`, `puppeteer` or `puppeteer-core` in `node_modules` on `sandbox`.
  - None in the global npm folder (`%APPDATA%\npm\node_modules`).
  - No `%LOCALAPPDATA%\ms-playwright` browser cache.
- **The rework branch declares `playwright@1.59.0`** as a dev dependency and has `scripts/browser-smoke.mjs`. Installing it needs `npm install` plus `npx playwright install chromium`, both of which require approval.
- **Installed browsers** that can capture without new packages:
  - Chrome: `C:\Program Files\Google\Chrome\Application\chrome.exe`
  - Edge: `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
  - Example command: `chrome --headless=new --screenshot=out.png --window-size=1440,900 <url>` (use `390,844` for mobile).
- **Caveats:**
  - Render free-tier apps sleep, so wake each one first.
  - Login-only screens (Kanban, MERN, Fairway Finder) need a demo account.
  - Crop or blur Discord server and member names.

## 7. Card button order (target: GitHub first, Live second)

### Current branch (`src/components/ProjectCard/ProjectCard.jsx:37-71`)
Rendered order: **Case study → Live site → Walkthrough → Code (GitHub)**. GitHub is last on every card.

| Project | Buttons as rendered now |
|---|---|
| Zombies Hub 2.0 | Case study, Live site, Code |
| Fairway Finder | Case study, Live site, Code |
| War Oracle | Case study, Code |
| Clash Commander | Case study, Code |
| raspbi-pilot | Case study, Code |
| Captain Hook | Code |
| MERN Book Search | Live site, Code |
| The Daily Bytes | Live site, Code |
| Kanban Board | Live site, Code |
| Candidate Search | Live site, Code |
| Weather Dashboard | Code |
| Social Network API | Code |
| Tech Quiz Test Suite | Walkthrough, Code |
| Python Banking System | Code |
| This Portfolio | Code |

The case-study pages use their own `links` arrays in `projects.js`. On the Zombies Hub 2.0 and Fairway Finder pages, "Live site" comes before "Source on GitHub". The Clash automation page has only GitHub links (War Oracle, Clash Commander, raspbi-pilot).

### Rework branch (`ProjectCard.jsx`)
Rendered order: **[inactive label] → Live (or `liveLabel`, e.g. "Guide in 2.0") → GitHub**.
- Live first, then GitHub: Zombies Hub 2.0, Daily Bytes, Fairway Finder, MERN Book Search, Kanban, Captain Hook, Candidate Search.
- "Guide in 2.0" first, then GitHub: Der Eisendrache, Gorod Krovi, Mob of the Dead, Revelations, Zetsubou No Shima.
- "Hosting pending" label first, then GitHub: Origins, Zombies Hub 1.0.
- GitHub only: Weather, Portfolio, War Oracle, Clash Commander, raspbi-pilot, Social Network API, Tech Quiz, Python Banking.

### Required change
Use the order **GitHub → Live (or "Guide in 2.0") → Walkthrough → Case study** on every card, and the same order for the case-study page links.
