# Cleanup: files proven unused (not yet deleted)

Verified on `claude/portfolio-polish` @ `ca191bb` (2026-10-24). The worker policy refused `git rm`, so nothing has been removed. The owner can delete the "Proven unused" set with the command at the end.

## How "unused" was proven

1. **Imports:** every asset reference under `src/` (`*.js`, `*.jsx`, `*.css`) was listed. There are exactly 13:
   - the 12 WebP screenshots imported in `src/data/screenshots.js`
   - `src/assets/Pictures/bryen-headshot.webp` in `src/pages/About/About.jsx`
2. **Globs:** no `import.meta.glob` remains anywhere in the repo. The old `thumbnails/webp/*.webp` glob was removed in `64d79ed`.
3. **CSS `url()`:** the only `url(` matches under `src/` are internal gradient references (`url(#bg)`) inside the placeholder SVGs themselves.
4. **`index.html`:** references only `/favicon.svg`.
5. **`vite.config.js`:** no `publicDir`, `assetsInclude` or glob settings.
6. **Components:** nothing imports `Header.jsx`, and `Hero.jsx` is imported only by `Header.jsx`.
7. **Build output:** after `npm run build` (at `ca191bb`), `dist/` contains only the 13 imported images plus `public/` files. No thumbnail, `*Pro.svg`, `react.svg`, `Header` or `Hero` code appears.
8. **Other references:** `scripts/browser-smoke.mjs` only asserts that no `/thumbnails/` image is rendered. `docs/*.md` mention paths for documentation only.

## Proven unused (safe to delete): 82 files, 32,248,548 bytes (≈32.2 MB)

| Path | Files | Bytes | What it is |
|---|---|---|---|
| `src/assets/thumbnails/*.png` | 16 | 28,702,845 | AI-generated thumbnails (originals) |
| `src/assets/thumbnails/*.webp` | 16 | 1,280,248 | AI thumbnails, WebP (from the rework merge) |
| `src/assets/thumbnails/webp/*.webp` | 32 | 2,223,162 | AI thumbnails, 1280 px plus 640 px variants |
| `src/assets/Pictures/*Pro.svg` | 15 | 37,525 | Generic placeholder SVGs (Banking, Book, Candidate, CaptainHook, ClashCommander, DailyBytes, FairwayFinder, Kanban, Portfolio, RaspbiPilot, Social, Testing, WarOracle, Weather, ZHub2) |
| `src/components/Header/Header.jsx` | 1 | 263 | Old component, not imported |
| `src/components/Hero/Hero.jsx` | 1 | 379 | Old component, imported only by `Header.jsx` |
| `src/assets/react.svg` | 1 | 4,126 | Vite starter logo, not imported |

## Unreferenced, but kept for now (needs an owner decision)

| Path | Bytes | Why it isn't in the proven set |
|---|---|---|
| `public/vite.svg` | 1,497 | Not referenced by code, but Vite copies `public/` into `dist/`, so it is served at `/vite.svg` and could be linked externally |
| `public/bg-mark.svg` | 714 | Same as above (the rework branch's favicon; `favicon.svg` is the current one) |
| `src/assets/Pictures/{CandiSearch,DailyBytes,DE,FairwayFinder,GK,MERN_Book_Search,MOTD,Origins,REV,Screenshot9New,ZETZ,ZHub}.png` | 13,039,364 | Real screenshot originals; the site uses their WebP copies. Keep as sources or move out of the repo |
| `src/assets/Pictures/ReactFolio.png` / `.webp` | 652,859 / 29,336 | Real but outdated portfolio screenshot, unused |
| `src/assets/Pictures/bryguy.png`, `bryguy1.png`, `bryguy.webp`, `bryguy1.webp`, `bryen_headshot.jpg` | 1,108,574 / 1,067,636 / 33,934 / 32,622 / 483,664 | Personal photo sources, unused (site uses `bryen-headshot.webp`) |
| `REWORK-NOTES.md` | 2,061 | Rework branch notes; fold into docs, then remove |

## Listed only (do not touch without the owner)

| Path | Bytes | Note |
|---|---|---|
| `src/assets/Pictures/render.png` | 389,083 | Shows the owner's personal browser bookmarks bar. **Still referenced by `README.md` line 12**, so update the README before any removal |
| `src/assets/Pictures/render.webp` | 31,224 | WebP copy of the above, unused |
| `src/assets/Pictures/Challenge2.png` | 67,190 | Old bootcamp page with lorem ipsum, unused |
| `src/assets/Pictures/Challenge2New.jpg` | 1,490,070 | Same, unused |
| `src/assets/Pictures/Challenge2.webp` | 19,910 | Same, unused |

## Command for the owner (proven set only)

```bash
git switch claude/portfolio-polish
git rm -r src/assets/thumbnails src/assets/Pictures/*Pro.svg src/components/Header/Header.jsx src/components/Hero/Hero.jsx src/assets/react.svg
npm run lint && npm test && npm run build
git commit -m "Remove unused AI thumbnails, placeholder SVGs and old Header/Hero (verified unused)"
git push
```

Deleting files does not shrink git history. The AI images stay in past commits unless history is rewritten, which is not planned.
