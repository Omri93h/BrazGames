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
- Cross-game keyboard control rule: in two-team keyboard games, `החן יוספים, ועוזריהם` use `WASD`, and `הבראזים` use the arrow keys, unless the user explicitly changes this later.
- Cross-game reset/admin rule: prefer no visible `איפוס תוצאה` button in the normal party UI unless the user explicitly asks for one in that game. `Command+D` should open the confirmation reset/admin popup, asking `האם אתה בטוח?`, and reset must clear only the current game's localStorage key. There is no reset password.
- If a game raffles who starts, use a centered modal/overlay that alternates between the selected player names, not the team names. The chosen player's team becomes the starting side.
- Rules/instructions modals should last 16 seconds with a circular loader and then advance automatically.
- Rules/instructions modals should be skippable with `Space` while the modal is visible. Scope this shortcut to the rules phase only so it does not interfere with live gameplay controls.
- In rules/instructions modals, controls must be labeled `מקשים:` and rendered as visible keycap clusters. Use `WASD` for WASD controls and real arrow keycaps like `↑ ← ↓ →` for arrow controls; do not show only the word `חצים`.
- Cross-game opening-screen rule: follow the `dor-party-game-style` skill for every game start screen. The canonical character-select layout is: title panel on top, team character-card panels in the middle, and a bottom three-column fighter/action/fighter grid. Do not put fighter previews inside team panels, and do not let GIF intrinsic dimensions control layout. Visually verify that fighters are fully visible, the compact start button is centered, and the title panel spacing is balanced.
- Cross-game player alias rule: legacy names for Pishoto must never be shown. The party-facing name is always `פישוטו` in Hebrew UI and `Pishoto` in English-facing text.
- Cross-game display/projector rule: before party use, connect the actual TV/projector before opening the games, keep Chrome/browser zoom at 100%, use fullscreen, and verify each game on the real display. Do not make resolution-scaling or aspect-ratio gameplay changes without visual testing and user approval.

Current Submarine Survival locked-in tuning:

- Preserve the character-select start screen unless the user explicitly asks to change it.
- Stage 2, `אנטישמים מלוחים`, uses Tucker/Candace faces and all of its enemy tiers are scaled down by 35%.
- Stage 4, `The Revenge Of The Exiled`, uses Maor/Lior/Mosko/Tomer enemy faces. Tomer is a brightened local copy, Tomer faces right in the source, Lior faces left in the source, and Maor/Mosko are front-facing enough for normal mirroring.
- Stage 5, `חמירוזון פריים`, has custom enemy behavior and is the final Submarine stage:
  - `amazon.png` is always the smallest enemy, keeps its original logo colors, never hunts, never flashes, and never mirrors.
  - `bezos_real.webp` appears as both medium yellow and large purple enemies.
  - `bezos_southpark.webp` appears only after about 15 seconds as a giant red hunter with extra speed.
- When adding or changing stage-specific enemy rules, update `current_focus.md`, `docs/games/FISH_SUBMARINE_PLAN.md`, `games/submarine/README.md`, and the relevant asset README.

Workflow expectation:

1. Read the current focus and relevant docs.
2. Work only on the approved current game or documentation task.
3. Document setup, asset replacement, controls, known risks, and manual tests.
4. Stop after the current game is ready for user testing.
5. Wait for approval before moving to the next game.
