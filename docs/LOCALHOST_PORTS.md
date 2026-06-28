# Localhost Ports

Each approved game should be served from its own local port. The static root portal can also be served from the repository root. Ports can change later if needed, but every game must document its final run command and URL.

| Entry | Proposed URL | Status |
| --- | --- | --- |
| The Braz Games portal | `http://localhost:3000` | Root static launcher |

| Game | Proposed URL | Status |
| --- | --- | --- |
| Memory Game | `http://localhost:3001` | Reserved |
| Fishy / Submarine Survival | `http://localhost:3002` | In progress |
| Dino / Escape From Be'er Sheva | `http://localhost:3003` | In progress |
| Super Brazio | `http://localhost:3004` | In progress |

Asset-prep tool:

| Tool | URL | Status |
| --- | --- | --- |
| Song Starter | `http://localhost:3005` | Local song utility |
| Fighter Face Mapper | `http://localhost:3006` | Local asset-prep tool when Song Starter uses `3005` |

Run instruction requirements for each game:

- Exact install/setup steps, if any.
- Exact command to start the local server.
- Exact localhost URL.
- Offline runtime check.
- Restart instructions.

Port note: `3005` is reserved for the Song Starter skeleton. If the Fighter Face Mapper is needed at the same time, run it with `python3 server.py 3006` from `tools/fighter-face-mapper`.

Portal note: run `python3 -m http.server 3000` from the repository root to open `The Braz Games`. The portal links to `games/memory/`, `games/submarine/`, `games/dino/`, and `games/super-brazio/` without adding `?init=1`, so it does not reset saved game state.

Party rule: before the event, connect the actual TV/projector first, set browser zoom to 100%, open every approved game once on the real display, and verify the documented URL, fullscreen layout, audio, and controls.

For the full "open all games tab-after-tab" procedure, see `docs/RUN_ALL_GAMES_INSTRUCTIONS.md`.
