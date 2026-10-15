# Portfolio: review pass

This branch preserves the approved visual identity, themed contact interactions, project list and personal content. It is based on the repository's `sandbox` branch.

## Implemented
- Route-level lazy loading; the PDF implementation is no longer in the homepage entry bundle.
- WebP project images, with original files retained. Thumbnails shrink from 28,702,845 bytes to 1,280,248 bytes; additional project images shrink from 16,324,706 bytes to 811,564 bytes.
- Browser-side quote API token removed; offline quote rotation replaces the third-party call.
- Safe theme storage, skip navigation, active-navigation semantics and mobile Contact navigation.
- Contact drafts survive theme changes; shared validation accepts plus-addressed email.
- A contained portrait glow fixes mobile overflow.
- Page titles and a not-found page within the normal site layout.
- Lint cleanups, tests and CI; targeted jsPDF/router upgrades clear the final local production dependency audit.

## Verified locally
- Lint, two unit tests, production build and 12 desktop/mobile browser checks pass.
- Light/dark theme, quote rotation, draft preservation, mocked email delivery and an actual generated PDF download were exercised.
- Email delivery was intercepted. No real email was sent.

## Release gates
- Rotate the previously embedded quote API token with its provider. Removing it from current source does not remove it from Git history or previously shipped bundles.
- No history rewrite, provider credential rotation or production deployment was performed.
- Live EmailJS deliverability and third-party project links were not comprehensively verified.
