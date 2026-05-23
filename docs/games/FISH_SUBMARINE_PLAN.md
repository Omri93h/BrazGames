# Fishy / Submarine Survival Plan

Status: Not implemented yet.

## Concept

A Fishy-style survival game where player characters eat smaller enemies and avoid bigger enemies.

The later visual theme should replace fish with submarines:

- Dor appears inside a custom submarine image that the user will design later.
- Enemies can be faces of friends or enemy submarines.
- Torpedoes can appear as hazards if they fit the final design.
- The background should feel underwater and chaotic but remain readable.

## Desired Player Count

- Ideally two players on one screen.
- Single-player fallback is acceptable only if approved later.

## Desired Controls

- Player 1: `WASD`.
- Player 2: arrow keys.

This input model should work well in a normal browser, but keyboard ghosting should be tested on the party laptop.

## Desired Screen Layout

- One shared underwater playfield.
- Two player characters visible at the same time if feasible.
- Clear score, size, or survival indicators.
- Avoid clutter that makes the projector hard to read.

## Asset Replacement Ideas

- Dor submarine.
- Player 2 submarine if needed.
- Friend face enemies.
- Small enemy submarines.
- Large enemy submarines.
- Torpedoes or hazards.
- Underwater background.

Use placeholders until custom assets are provided and approved.

## Sound Replacement Ideas

- Eat smaller enemy.
- Collision with larger enemy.
- Growth or level-up.
- Torpedo warning.
- Player eliminated.
- Round start.
- Round end.

## Scoring / Win Condition

Possible modes:

- Survival time.
- Points for eating smaller enemies.
- Growth level.
- Last player alive.

The final scoring should be simple and readable during a party.

## Known Risks

- Two-player collision and growth logic may add complexity.
- Screen can become visually noisy with many enemies.
- Keyboard ghosting may affect simultaneous movement.
- Finding a good source repo may require license and complexity review.

## Implementation Notes For Later

- Proposed URL: `http://localhost:3002`.
- Verify source repo/license before using any base implementation.
- Keep asset replacement easy.

