# Security to-do: exposed The One API key

**Status: open, waiting on the owner.** The key value is deliberately not written anywhere in this file. Search for it locally if you need to; never paste it into issues, chats or commits.

## What was exposed

- **What:** a personal access key for [The One API](https://the-one-api.dev/) (Lord of the Rings quotes), sent as a `Bearer` header from the browser.
- **Where:** `src/components/Footer/HobbitQuoteGenerator.jsx`
- **Added in:** `f4999e4` (2025-04-06, "Went full Hobbit mode: updated portfolio with LOTR-inspired theme…")
- **Removed in:** `69f48fb` (2026-10-15, "Polish portfolio performance, contact UX, security and test coverage") on `gandalf/rework-2026-10-15`. It reached `claude/portfolio-polish` through merge `41650b1`.
- **Exposure:** it was a client-side key, so it shipped in every production JavaScript bundle built from an affected branch. Anyone could read it from the deployed site, not only from git.

## Where it still is (checked 2026-10-24 against fetched refs)

**Still present in the current files** of these branch tips:
- `origin/main` (probably the source of the live site at `one2-react-portfolio.onrender.com`; not verified)
- `origin/sandbox` (also `origin/HEAD`)
- `origin/staging/portfolio-refresh`
- `origin/gpt/portfolio-review`
- `origin/portfolio/authentic-project-images`
- `origin/archive/local-redesign-752579a`
- `origin/gandalf/local-redesign-752579a`

**Clean current files, but still in history:**
- `origin/claude/portfolio-polish`
- `origin/gandalf/rework-2026-10-15`

`git branch -a --contains f4999e4` lists **every** branch, local and remote, so the key is in the history of all of them.

## Current code no longer uses it (on `claude/portfolio-polish`)

- [x] `HobbitQuoteGenerator.jsx` uses a built-in list of quotes. No `fetch`, no API URL and no key.
- [x] A repo-wide search (excluding `node_modules` and `dist`) for the key value, `the-one-api` and API-key, token, secret and private-key patterns finds nothing. The only `Bearer` matches are prose ("Bearer of …") in `src/pages/Contact/elvenScriptures.jsx`.
- [x] `npm run build` output contains no reference to the API.

## Owner checklist

1. [ ] **Revoke or rotate the key at The One API.** Sign in at https://the-one-api.dev/ and open the account page that shows your access key. Generate a new key, or delete or disable the old one. If the site offers no way to regenerate, contact its maintainer and ask for the old key to be invalidated.
2. [ ] **Don't put the new key in the frontend.** The site no longer needs one. If live quotes return later, call the API from a server or serverless function, with the key stored as an environment variable.
3. [ ] **Stop shipping the old key.** Redeploy production from a branch where the key is removed (for example after `claude/portfolio-polish` is merged to `main`). Until then the live bundle still contains it, which matters only if it hasn't been revoked.
4. [ ] **Check for misuse,** if The One API offers usage or rate-limit information for your account.
5. [ ] **Decide about history (optional, not done).** Once the key is revoked, the copies in history are harmless. If you still want them gone:
   - Rewrite history with `git filter-repo --replace-text` (or BFG) on a fresh mirror clone, then force-push **every** affected branch and ask any collaborators or forks to re-clone.
   - GitHub may keep cached views and pull-request refs; contact GitHub Support for a full purge.
   - This is destructive and coordinated. It's not needed once the key is revoked, and it was deliberately not done here.
6. [ ] **Close this file** by marking items 1–3 done (and 5 if chosen) in a commit.

## Not secrets (public by design)

The EmailJS service ID, template ID and public key in `src/utils/Email.js` are meant to be used in the browser. Protect EmailJS with domain allow-listing and rate limits in the EmailJS dashboard, not by hiding these values.
