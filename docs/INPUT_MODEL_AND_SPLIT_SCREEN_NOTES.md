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
- Player 1 controls: `WASD`.
- Player 2 controls: arrow keys.

This is browser-friendly and should be easier than independent mice.

## Dino / Escape From Be'er Sheva

Possible models:

- Split screen.
- Two differently colored characters on the same screen.

The final layout is unresolved. The theme is Dor running away from Be'er Sheva through a road/desert/local-joke environment.

## Super Brazio

Possible models:

- Single-player first is acceptable.
- Two-player mode only if explicitly approved later.
- Split screen only if it does not add major complexity.

Controls must be tested on the actual party laptop for every implemented game.

