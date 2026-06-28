# Input Model And Split Screen Notes

Input must be planned per game. Do not assume advanced input behavior works in a normal browser without testing.

## Important Browser Multi-Mouse Risk

Standard browsers usually cannot distinguish two physical mice as independent cursors.

In a normal laptop setup, two connected mice generally control the same operating system cursor. A browser page usually sees one pointer, not two independent player pointers.

This directly affects the Memory Game's original idea of two players each using a separate mouse on a split screen.

## Memory Game

Intended concept:

- Two-player split-screen memory board.
- Vertical divider line from top to bottom.
- Each player has their own side or screen area.
- Original input idea: each player has a mouse.

Input model is unresolved because of the browser multi-mouse limitation.

Feasible alternatives to evaluate later:

- Turn-based single cursor.
- Keyboard controls.
- Gamepads.
- Two browser windows or two local clients.
- Phones as local controllers.
- Electron/native RawInput only if absolutely needed and explicitly approved later.

Do not solve this during bootstrap. The first Memory implementation phase should choose and validate the simplest approved input model.

## Fishy / Submarine Survival

Desired model:

- One shared screen.
- Two player characters if feasible.
- החן יוספים, ועוזריהם controls: `WASD`.
- הבראזים controls: arrow keys.
- This control mapping is a cross-game rule for future two-team keyboard games unless the user explicitly changes it.

This is browser-friendly and should be easier than independent mice.

## Dino / Escape From Be'er Sheva

Possible models:

- Split screen.
- Two differently colored characters on the same screen.

The final layout is unresolved. The theme is Dor running away from Be'er Sheva through a road/desert/local-joke environment.

## Super Brazio

User-approved planning direction as of 2026-06-16:

- Two-player split-screen race is the planned MVP, pending final plan approval.
- The active game screen should be split vertically into two equal platformer worlds.
- Both sides run the same short Mario-style level at the same time.
- There are no rounds.
- The first side to reach Princess Daniel / Golden Visa wins immediately.
- החן יוספים, ועוזריהם use `WASD`.
- הבראזים use the arrow keys.

Risks to validate during the implementation spike:

- The chosen Mario-style source engine may assume one global player/canvas/input state.
- Two simultaneous players may expose keyboard ghosting on the party laptop.
- Half-width platformer canvases may need tuned camera zoom so the player and obstacles remain projector-readable.

Controls must be tested on the actual party laptop for every implemented game.
