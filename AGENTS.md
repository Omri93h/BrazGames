# Agent Instructions

This repository is for Dor Bachelor Party Games, a local-only browser arcade for Dor's bachelor party.

The approved project scope currently contains only four games:

1. Memory Game
2. Fishy / Submarine Survival
3. Dino / Escape From Be'er Sheva
4. Super Brazio

Before changing anything, always read:

- `README.md`
- `current_focus.md`
- the relevant files in `docs/`

Core rules:

- Never start more than one game at once.
- Never implement the next game before the current game is approved.
- Do not add games outside the approved four-game scope.
- Do not create Pong, Fighting Game, Aim Trainer, 2048, Snake, Reaction Time, Racing, Trivia, or other extra game docs unless the user explicitly re-approves those games later.
- Game 1 is Memory, and it must be the first actual implementation after corrected bootstrap docs are approved.
- Keep changes small, understandable, and testable.
- Prefer static HTML/CSS/JS or very light Vite apps.
- Avoid heavy engines, backend complexity, accounts, online multiplayer, or fragile build systems.
- Every game must run locally and have clear localhost run instructions.
- No external hosted assets at runtime.
- Keep asset replacement easy and documented.
- Use placeholders for personal images and sounds.
- Do not commit real private photos or sounds unless the user explicitly provides and approves them.
- After each game implementation, include manual validation steps.

Workflow expectation:

1. Read the current focus and relevant docs.
2. Work only on the approved current game or documentation task.
3. Document setup, asset replacement, controls, known risks, and manual tests.
4. Stop after the current game is ready for user testing.
5. Wait for approval before moving to the next game.
