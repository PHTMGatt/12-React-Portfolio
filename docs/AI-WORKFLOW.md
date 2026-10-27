# Portfolio AI Workflow

This repository uses a deliberately small branch model to keep automated development and production deployment understandable.

## Branch authority

- `main` is the production authority.
- `chatgpt-forge` is ChatGPT's persistent working branch.
- `claude-forge` is Claude's persistent working branch.
- Do not create `sandbox`, `staging`, `gpt/*`, `chatgpt/*`, or task-specific Portfolio branches for routine work.
- If another AI is added later, give it one persistent working branch rather than creating per-task branches.

## Integration rule

AI work begins on that AI's persistent branch. Before editing, synchronize from the current `main` state when it is safe to do so. Validate the change on the working branch. Only clean, verified work should be integrated into `main`.

`main` should always represent the version intended for production. If a change breaks production, fix forward on the appropriate AI working branch or revert `main` to a known-good commit.

## Deployment rule

Render production must deploy from `main`. Do not point production at an AI working branch, sandbox branch, staging branch, or task-specific branch.

## Portfolio image authority

`PORT-IMG_3` is the authoritative source for Portfolio Work-card imagery until the user explicitly replaces it with a newer approved image set.

For every project represented by a `PORT-IMG_3` image:

1. The Portfolio Work card must use the matching `PORT-IMG_3` visual.
2. The matching project's repository README must show that same approved visual.
3. Older thumbnails, screenshots, `docs/portfolio` covers, generated artwork, or legacy image sets must not override `PORT-IMG_3`.
4. Do not guess a substitute when a mapping is ambiguous. Preserve the approved state and surface the mismatch.

## Navigation requirement

Keep Contact in the right-side navigation actions unless the user explicitly requests a redesign.

## Preservation rule

Do not delete, overwrite, force-update, or discard unique branch history merely to simplify branch names. Account for unique commits before retiring old branches.
