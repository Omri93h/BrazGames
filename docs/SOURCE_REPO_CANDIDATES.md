# Source Repo Candidates

Do not clone anything during bootstrap.

This file is a parking lot for later source repo research. Candidate repos should be reviewed before use, especially for license, complexity, local runtime, and asset replacement difficulty.

Memory Game should be built from scratch later, so it does not need an external source repo.

Suggested table for future candidates:

| Game | Candidate Repo | License | Complexity | Local Run Notes | Asset Replacement Difficulty | Decision |
| --- | --- | --- | --- | --- | --- | --- |
| Memory Game | Build from scratch | Not applicable | Low/medium | Local static app preferred | Designed for easy replacement | Approved direction |
| Fishy / Submarine Survival | Fish Dodges by North Cactus as inspiration only (`https://northcactus.itch.io/fish-dodges`) | No source repo found | Low if built from scratch | Local static Canvas app planned on port 3002 | Designed for easy replacement | Build from scratch for MVP |
| Dino / Escape From Be'er Sheva | `https://github.com/PrashanthaTP/dinorun` | MIT | Low | Local static ES modules on port 3003 | Medium: Dino/cactus/ground assets are isolated | Approved and copied locally under `games/dino/vendor/dinorun/` |
| Super Brazio | `https://github.com/meth-meth-method/super-mario`; fallback candidates remain `https://github.com/reruns/mario` and `https://github.com/robertkleffner/mariohtml5` | Meth project package says ISC; reruns/mario is MIT; mariohtml5 is Unlicense | Medium/high because two simultaneous instances require shell/input adaptation | Local static prototype on port 3004 | High if later replacing sprites/sounds | Approved and copied locally under `games/super-brazio/vendor/meth-super-mario/` |

Review checklist for games that may use a candidate repo:

- Does the license allow private local modification?
- Are assets separable from code?
- Can it run fully offline?
- Is the code simple enough to customize quickly?
- Does it require a backend, account, or online service?
- Does it introduce a large build system or fragile dependency chain?
