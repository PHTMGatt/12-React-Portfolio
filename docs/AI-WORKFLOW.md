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

## Canonical image workflow

`src/assets/photos/` is the single source of truth for Portfolio imagery.

- Keep the original headshot source and its optimized web version in this folder.
- Keep one approved project image per Portfolio visual in this folder.
- Every active Work/project card must render an image; do not intentionally leave a blank or text-only artwork panel.
- Every case-study hero must render approved artwork; do not use `image: null` as a normal fallback.
- Do not create parallel `Pictures`, `project-images`, `thumbnails`, or `docs/portfolio` image libraries.
- The Work page imports its project visuals only from `src/assets/photos/`.
- Matching project repository READMEs should reference the same `main`-branch image from this repository, so replacing one canonical file updates both the Portfolio card and README presentation.
- Clash Commander and the Clash of Clans Discord Suite use the approved canonical artwork in `Clash Commander.webp`; do not fall back to legacy or substitute artwork.
- Python Banking System uses the approved canonical artwork in `Banking System.webp`; do not revert it to a text fallback.

### Replacing a project image

1. Replace the corresponding file in `src/assets/photos/` on the AI working branch.
2. Keep the filename stable unless the mapping itself is intentionally changing.
3. Verify that the file is a valid decodable image, not merely a file with the expected extension.
4. Verify the Portfolio build and Work card on desktop and mobile.
5. Verify any matching case-study hero and project README point at that canonical file.
6. Merge the validated change into `main`.

The current approved batch originated as `PORT-IMG_3`; the folder name is no longer part of the workflow. The canonical location is `src/assets/photos/`.

## Navigation requirement

Keep Contact as the right-side CTA on desktop. On mobile, Contact belongs inside the hamburger menu while the light/dark theme toggle stays beside the hamburger button, unless the user explicitly requests another redesign.

## Preservation rule

Do not delete, overwrite, force-update, or discard unique branch history merely to simplify branch names. Account for unique commits before retiring old branches.
