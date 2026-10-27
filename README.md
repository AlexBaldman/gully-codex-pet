# Gully — “Good Golly He’s Gully”

Gully is a pixel-art Western gull companion for Codex: a sun-baked Long Beach regular with magenta sunglasses, a gold eye pendant, a rum-and-cola, and a joint. This repository is the canonical project checkout and is kept in sync with [GitHub](https://github.com/AlexBaldman/gully-codex-pet).

## Current project state

The character design and animation work have advanced beyond the original five-state, 8×9 prototype described in older project files. The latest local run follows the current v2 layout: eight columns by eleven rows, with nine animation states and sixteen look directions. Its source art, prompts, generated strips, and row-level QA are preserved in [`pets/gully/generation/2026-09-14`](pets/gully/generation/2026-09-14/).

That run is incomplete. The base and several animation strips exist, while later animation states, all look-direction rows, final atlas assembly, and final validation remain unfinished. There is no release-ready sprite sheet yet. See [`RECONCILIATION.md`](RECONCILIATION.md) for the machine-wide inventory and merge decisions.

## Character and animation

The latest canonical design reference is `pets/gully/generation/2026-09-14/references/canonical-base.png`. The v2 row order and frame counts are recorded in [`pets/gully/pet.json`](pets/gully/pet.json). The full generation brief and per-state prompts are in the generation run archive.

## Repository contents

- `pets/gully/pet.json` — current v2 pet and atlas metadata.
- `pets/gully/GULLY_LORE.md` — character background.
- `pets/gully/art-prompts.md` — original prompt set, retained as historical material.
- `pets/gully/generation/2026-09-14/` — source references, prompts, generated rows, and intermediate QA from the latest run.
- `pets/gully/archive/` — older, incomplete art preserved for provenance; these files are not final sprite assets.
- `scripts/` — original prototype helpers. Their 8×9 assumptions are historical and they do not validate or assemble the current v2 format.

## Continuing the work

Use the archived run as the starting point and continue from the first pending generation job. Follow the current Work Pets sprite-sheet workflow for frame extraction, row review, v2 assembly, direction checks, and final validation. Do not install or publish a sprite sheet until the complete v2 atlas passes those checks.

The older `npm run full-workflow` command describes the prototype workflow and is not a current v2 release pipeline.

## JeoPARODY connection

JeoPARODY has a related Gully host-image brief in its own repository. That directory currently contains documentation but no Gully runtime images. Keep the game-host assets coordinated with this character design when those images are generated.

## License

MIT. See [`LICENSE`](LICENSE).
