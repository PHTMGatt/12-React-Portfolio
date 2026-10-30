# React Portfolio

![React Portfolio](src/assets/photos/Portfolio.png)

Bryen Gatt's live portfolio for presenting real software projects, case studies, technical decisions, and current capabilities to recruiters, hiring teams, and collaborators.

**Live portfolio:** https://one2-react-portfolio.onrender.com

## What this repository demonstrates

This is the source for the portfolio itself, not a template or a static project list. The application is built as a responsive React experience with recruiter-facing project discovery, detailed case studies, a downloadable résumé, and direct contact paths.

Current portfolio evidence is centered on software engineering and full-stack web work. The site architecture is intended to grow as additional real work becomes ready to show, without claiming disciplines or capabilities before there is evidence behind them.

### Product priorities

- Authentic project screenshots and approved artwork rather than invented mockups
- Clear project status, source links, live demos where available, and deeper case studies for selected work
- Responsive layouts and keyboard/accessibility behavior across the main navigation and project surfaces
- A recruiter-friendly résumé experience with an actionable one-page PDF download
- Performance-conscious responsive artwork delivery while preserving canonical originals
- Share metadata and direct URLs that make the portfolio useful outside the site itself

## Stack

- React 19
- React Router
- Vite
- Custom CSS
- EmailJS for the contact workflow
- jsPDF for résumé export
- Sharp for generated responsive artwork derivatives
- Playwright for browser regression checks
- ESLint and Node's built-in test runner
- Render for production hosting

## Project presentation

Project entries prioritize evidence and transparency. Where applicable they include:

- GitHub repository links for source and project history
- Live-demo links only when a deployment exists
- Approved canonical visuals from `src/assets/photos/`
- Status labels for legacy, paused, or inactive work
- Case studies that explain the problem, implementation, decisions, and outcome without inventing capabilities

## Local development

```bash
npm install
npm run dev
```

Useful validation commands:

```bash
npm test
npm run lint
npm run build
```

For the full browser suite, run a production preview and then:

```bash
npm run test:browser
```

## Artwork delivery

Approved originals remain in `src/assets/photos/`. `npm run dev`, `npm run start:dev`, and `npm run build` generate WebP delivery variants in the ignored `src/assets/photos/generated/` directory. Those derivatives are generated assets and should not be edited or committed.

The generator preserves aspect ratios, never enlarges an original, and provides 480/800/1280-pixel candidates plus a larger candidate capped at 1920 pixels for case studies. Source artwork remains unchanged, including the approved Banking and Clash images. `ProjectImage` uses layout-specific `sizes` values so browsers can select an appropriate candidate for viewport size and pixel density.

After changing canonical artwork while the dev server is already running, run `npm run artwork:generate` or restart the server.

## Quality checks

The repository includes unit/regression coverage for portfolio data, accessibility-sensitive external links, résumé PDF layout/link behavior, and responsive artwork delivery. Browser checks cover the main pages, artwork decoding, and mobile image selection across common viewport sizes and pixel densities.

The portfolio is intentionally maintained as a living career platform: new disciplines and project categories should be added only when there is real work, documentation, or visual evidence ready to support them.
