# Memory Game Plan

Status: Not implemented yet.

This must be the first actual game after corrected bootstrap docs are approved.

Build this game from scratch later. Do not clone an external repo for Memory.

## Concept

A two-player memory matching game using funny photos of Dor, friends, embarrassing moments, group jokes, wedding references, USA references, and visa-themed jokes.

Players flip cards, find matching pairs, and compete for the highest score.

## Desired Player Count

- Two players.

## Desired Controls

Original idea:

- Each player uses a separate mouse.

Known issue:

- Standard browsers usually cannot distinguish two physical mice as independent cursors.
- Two connected mice usually control one operating system cursor.

Practical alternatives to decide later:

- Turn-based single cursor.
- Keyboard controls.
- Gamepads.
- Two browser windows or two local clients.
- Phones as local controllers.
- Electron/native RawInput only if absolutely needed and explicitly approved later.

## Desired Screen Layout

Initial visual direction:

- Split screen.
- Vertical divider line from top to bottom.
- Each player has a clear side or player area.
- Large cards that work well on a projector.

The exact layout depends on the chosen input model.

## Asset Replacement Ideas

- Card face photos: Dor, friends, group photos, inside jokes.
- Card backs: bachelor party logo or simple placeholder pattern.
- Player labels: custom names or nicknames.
- Win screen image: funny approved Dor photo.

Use placeholders until real assets are provided and approved.

## Sound Replacement Ideas

- Flip card.
- Match found.
- Wrong match.
- Player turn.
- Win.
- Game over.

## Scoring / Win Condition

Possible scoring:

- One point per matched pair.
- Player with the most pairs wins.
- Optional bonus for streaks if it stays simple.

Win condition:

- All pairs are matched.
- Highest score wins.
- Tie message if scores match.

## Known Risks

- Independent two-mouse input is not reliable in a standard browser.
- Photos must be resized and cropped so cards look consistent.
- Projector readability matters; cards cannot be too small.
- Keyboard/gamepad alternatives need ergonomic testing before the party.

## Implementation Notes For Later

- Keep this game local and lightweight.
- Use `http://localhost:3001` unless the port plan changes.
- Add clear manual validation steps after implementation.
- Do not start another game until this one is approved.

