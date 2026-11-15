# SEC-0001: Leaked One API key, cleanup plan

Status: PLAN ONLY. Nothing in this document has been executed. Written 2026-11-10 on `claude-forge`.
No key value appears here or may be added; keys are referred to by commit and file.

## What leaked

| Item | Where | Notes |
| --- | --- | --- |
| One API personal key (sent as a `Bearer` Authorization header) | `src/components/Footer/HobbitQuoteGenerator.jsx`, line 21 at `f4999e4` (2025-04-06) | Removed from the working tree in `69f48fb` (2026-10-15). Still readable in git history. Reported still valid on 2026-11-02. |

Refs that contain the key (every ref containing `f4999e4`): `main`, `claude-forge`, `chatgpt-forge`, `sandbox` (local only), plus `origin/main`, `origin/claude-forge`, `origin/chatgpt-forge`.
The file was also touched by `752579a` and `41650b1`, which are on the same lineage. The repo is public, so assume the key has been harvested, and that forks and clones carry it.

## Re-scan results (2026-11-10, read-only)

Scope: current tree at `3b75f02`, and full history on all local and remote branches. No tags or stashes exist.

1. Current tree: no key-shaped literals found in `src/`. `HobbitQuoteGenerator.jsx` now ships its quotes inline and carries no token. The word "bearer" in `src/pages/Contact/elvenScriptures.jsx` (lines 28, 226, 274; added in `be4c214`) is lore text, not a credential.
2. History, known token patterns (OpenAI/`sk-`, AWS, GitHub, Slack, Google, Mongo URI, private key blocks, generic `key=` assignments): the only hits are in `.github/workflows/security.yml` and `.github/workflows/security-pipeline.yml` (commits `eb352b5`, `9984446`, 2026-11-09). These are the scanner's own regex definitions, not secrets. The One API key itself did not match the generic patterns; it was located by keyword (`Authorization` / `Bearer`) in `f4999e4`.
3. No `.env*`, `*.pem`, `*.key` or `*secret*` file has ever been committed on any ref.
4. EmailJS identifiers (`SERVICE_ID`, `TEMPLATE_ID`, `PUBLIC_KEY`) are in `src/utils/Email.js`, introduced in `f4999e4` and still present at HEAD. EmailJS public keys are designed to be browser-visible, so this is low severity. NOT verified whether they are literals or env-sourced (I avoided printing the values). The user should check, and restrict the EmailJS public key to the site's domains and consider rotating it for hygiene.
5. Limits of the scan: regex and keyword based, so an unusual token format could be missed. Binary files (images) matched the keyword grep only as binary noise. Run a dedicated scanner (gitleaks or trufflehog) locally to confirm; this was not run here.

## Ordered plan

### Phase 1: rotation (user, now, before anything else)

1. In the One API dashboard, revoke or delete the leaked key, and create a replacement. Revoke first, since the key is public.
2. Do not put the new key in frontend code, a `VITE_*` variable, or any file in this repo. Anything bundled by Vite is public. If the quote feature ever needs the API again, call it from a server-side proxy (e.g. a small Render web service) that holds the key in its environment.
3. Review the One API usage/billing logs for the period 2025-04-06 to now for calls you did not make.
4. Check whether the same key or password is reused anywhere else; rotate those too.
5. Optional hygiene: restrict the EmailJS public key to the site's domains (see re-scan item 4).

### Phase 2: verification that the old key is dead

Run locally. Put the OLD key in an environment variable named `OLD_KEY` for the check and never paste it into a chat, commit or log. Use a harmless read-only endpoint of the One API service.

```
curl -s -o /dev/null -w "%{http_code}\n" -H "Authorization: Bearer $OLD_KEY" <ONE_API_ENDPOINT>
```

Expected result: `401` (or `403`). Any `2xx` means the key is still alive: go back to Phase 1. Repeat once after a few minutes, in case revocation is cached. Record the date and status code only (not the key) in the SEC-0001 notes.

### Phase 3: optional history rewrite (needs the user's explicit approval; only after Phase 2 passes)

Once the key is dead, the leaked secret is harmless, and a rewrite mostly removes noise and scanner findings. It is disruptive, so it is optional. Do not run it without approval. The worker must not run it.

Tool: `git filter-repo` (preferred over BFG or `filter-branch`).

1. Fresh mirror clone for the rewrite, plus a separate backup: `git clone --mirror <repo> backup.git`. Keep the backup until everything is confirmed.
2. In the clone, use `git filter-repo --replace-text <file>` with a replacements file kept OUTSIDE the repo and never committed; it maps the old key to a placeholder. Alternative: `--path src/components/Footer/HobbitQuoteGenerator.jsx --invert-paths` would delete that file's whole history, which is too destructive, so prefer replace-text.
3. Refs to rewrite: all of them: `main`, `claude-forge`, `chatgpt-forge`, `sandbox`. All commit hashes from `f4999e4` onward change.
4. Needs explicit approval from the user: (a) the rewrite itself, (b) force-pushing to `main` and every branch (the worker rules forbid it; the user does it by hand), (c) temporarily lifting branch protection, and (d) the Render deploy implications: Render deploys `main`, so redeploy and verify afterwards.
5. Coordination: forks and other clones still contain the old history and the old commits. Tell collaborators to re-clone (not merge or pull). Open PRs and CI checks tied to old hashes will break. The CI history-scan allowlists added in `684614f`, `3bd7df0` (known historical findings by commit) will need updating to the new hashes, or removal once the history is clean.
6. Caveats: GitHub keeps old commits reachable by hash (and in cached views) until a support request asks GitHub to garbage-collect them. Forks are not rewritten. This is why rotation (Phase 1) is the real fix.
7. After the rewrite: re-run the scanners on a fresh clone, confirm that `git log --all -S"Bearer"` no longer shows the key line, then remove the CI allowlist entries.

### Phase 4: prevention

- Keep the secret-scan CI pipeline (`.github/workflows/security*.yml`) and add a local pre-commit gitleaks hook.
- Never place keys in frontend code; use a server proxy.
- Keep `.env*` in `.gitignore`.

## Approval checklist

- [ ] User confirms the old key was revoked and the replacement is stored server-side only
- [ ] Old key returns 401/403 (Phase 2), date recorded: ______
- [ ] User approves (or declines) the history rewrite
- [ ] User performs the force-push and notifies collaborators
