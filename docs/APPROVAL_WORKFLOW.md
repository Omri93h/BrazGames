# Approval Workflow

Every game must follow the same approval flow.

The current approved game scope contains only:

1. Memory Game
2. Fishy / Submarine Survival
3. Dino / Escape From Be'er Sheva
4. Super Brazio

Workflow:

1. Select source repo or base implementation, except Memory Game, which should be built from scratch.
2. Verify license and local run instructions when a source repo is used.
3. Implement a minimal local version.
4. Add placeholder custom assets.
5. Add asset replacement instructions.
6. Add a manual test checklist.
7. User tests and approves.
8. Only then move to the next game.

Additional rules:

- Do not clone candidate repos until the user approves the specific game work.
- Do not implement multiple games in parallel.
- Do not start the next game just because the current game is mostly done.
- Do not add games outside the approved four-game scope unless the user explicitly re-approves scope expansion.
- Keep the current game easy to run from its documented localhost port.
- Capture known risks before approval.

Approval means the user has tested the game locally enough to trust it for the party or has explicitly accepted the current limitations.

