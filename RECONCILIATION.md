# Gully project reconciliation

Checked on 2026-10-27. The canonical checkout is `~/coding/gully-codex-pet`, remote `https://github.com/AlexBaldman/gully-codex-pet.git`, branch `main`. At the start of this reconciliation, the checkout was clean and exactly matched `origin/main` after fetching. GitHub therefore had all committed repository history, but it did not have the newer generation work and several useful local images were excluded by `.gitignore`.

## Consolidated material

- `pets/gully/generation/2026-09-14/` contains the complete September run folder from `~/Documents/Codex/2026-09-13/i-want-to-edit-and-customize/work/gully-pet-run`: brief, prompts, references, generated base and animation strips, extracted frames, and row review reports. This is the best current design and work record.
- `pets/gully/archive/incomplete-legacy-chromakey-sheet.png` preserves `~/Downloads/gully-spritesheet-chromakey.png`. It is 1536×1872, shows only five populated rows followed by black empty space, and does not satisfy the v2 1536×2288 atlas. It is reference material only.
- `pets/gully/archive/really-long-beach-gully-reference.png` preserves the related artwork from `~/coding/really-long-beach/GoodGollyHe'sGully.png`.
- `pets/gully/archive/legacy-camera-gully-base.png` preserves the old, previously ignored `pets/gully/gully-base-character.png`. It depicts a camera-wearing gull and is a distinct earlier direction; the September base now leads the pet design.
- `.gitignore` previously excluded every Gully PNG, including source art and generated progress. It now excludes only the final named sprite sheet files so that source work can be versioned while a release atlas remains an explicit addition.

## Other copies checked

- `~/Desktop/CodexPet-Gully` exists but is empty.
- `~/coding/jeoparody/assets/images/gully/` is a related game-host integration. It contains a placeholder README, not runtime images. Its direction brief is in `~/coding/jeoparody/docs/GULLY_HOST_PORTRAIT_DIRECTION.md`. That checkout also has unrelated uncommitted work and is far from its GitHub main branch, so it was left untouched.
- The original `gully-codex-pet` GitHub history is present in the canonical checkout. There were no remote-only or local-only commits at the start of the merge.

## Current progress and remaining work

The archived run declares v2 as an 8-column × 11-row atlas with 192×208 cells (1536×2288 total). Its job manifest has six complete jobs (base, idle, running-right, running-left, waving, and jumping) and seven pending jobs. A failed-row image and row-level review also exist, but the job manifest still marks `failed` pending. There are no completed waiting, running, or review rows, no approved four-cardinal strip, no two look-direction rows, and no final atlas or whole-sheet validation reports.

The older repository prompts and shell helpers describe a five-state 8×9 prototype. They are retained as history; they must not be treated as the v2 assembler or validator. `pet.json`, `petdex.json`, package metadata, and the README now identify the current v2 design and its incomplete status.

## Ongoing sync rule

Continue development in this checkout. Keep the generation run under `pets/gully/generation/`, update its status when work advances, and copy any new canonical assets or code here before considering a run complete. Keep JeoPARODY-specific host assets in the JeoPARODY repository and coordinate their character design with this project.
