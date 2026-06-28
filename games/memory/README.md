# זיכרון בסלון

Memory is Game 1 of Dor Bachelor Party Games.

It is a local, shared-board, turn-based Memory Game named `זיכרון בסלון`, built from scratch with plain HTML, CSS, and JavaScript. It has no external dependencies and no internet requirement at runtime.

## How To Run Locally

From the repository root:

```sh
cd games/memory
python3 -m http.server 3001
```

Then open:

```text
http://localhost:3001
```

## Teams

The two fixed teams are:

- הבראזים
- החן יוספים, ועוזריהם

The start screen requires each team to select a player character before the game can begin.

Character roster:

- הבראזים: פישוטו, מיקי, דור, גבו.
- החן יוספים, ועוזריהם: מסר, מגמי, עומרי, פלטו.

## Start Flow

- The game title appears in the center.
- הבראזים appears on the right.
- החן יוספים, ועוזריהם appears on the left.
- Each team has four square character cards, inspired by Tekken / Mortal Kombat character select screens.
- Characters can be selected with the mouse.
- A selected character gets a blinking team-color stroke.
- Character cards use local face cutout images. Selecting a character shows a local fighter-style animated preview under the character row and plays that character's local fighter reveal sound. The in-game fighter cursor uses separate cursor GIF references so cursor scale/crop can be tuned without damaging the start-screen preview.
- The only primary action is `התחל`.
- `התחל` is enabled only after both teams select a character.
- Clicking `התחל` saves selected characters as the game players, shows a 16-second rules modal with a circular loader and short mouse-control note, then opens the centered raffle modal with `מגרילים מי מתחיל`, alternates between the two selected player names, shows the selected starting player briefly, and automatically starts the game.
- `איפוס תוצאה` is not shown on the clean start screen.
- No second click is required after the rules modal.

## Persistence And Reset

The game saves Memory state in `localStorage` under:

```text
dor-bachelor-memory-state-v1
```

Opening `http://localhost:3001` restores the saved Memory game automatically if one exists.

Refreshing, closing, or reopening the browser during an active Memory game must restore the same match state instead of returning to the home screen. Saved games are not cleared just because the app code version or card image manifest changed; the game only clears the Memory key when the saved JSON is unreadable or structurally invalid. Existing saved card image paths are refreshed to the current local asset version when possible.

There is no visible `איפוס תוצאה` button on the clean start screen or during active gameplay. The final game-over result screen includes a secondary `איפוס תוצאה` button. Pressing `Command+D` on Mac or `Ctrl+D` on Windows also opens the same password-protected reset popup. It clears the Memory storage key only when the password is exactly:

```text
Chmir
```

Wrong or empty passwords do not reset the game.

For testing, the same password popup also accepts:

```text
Cheater
```

`Cheater` toggles a visual cheat mode that shows all card faces. Entering `Cheater` again hides the unclaimed cards again. This does not reset the game, change scores, or mark cards as collected.

For developer/admin reset, open:

```text
http://localhost:3001?init=1
```

That also clears only the Memory storage key.

Saved state includes deck order, active team, scores, claimed card ownership, collected chips, card image paths, the card manifest signature, selected characters, the testing cheat visibility flag, and the next success phrase index.

## Rules

- One shared board.
- 30 cards total.
- 15 pairs.
- The board is a 6x5 squarish grid.
- A clean new game uses a safe fair-shuffle pass that tries many deck orders and chooses the best-spaced one.
- The fair shuffle has a short time budget and always falls back to a normal shuffle if anything goes wrong.
- One close/easy matching pair is allowed for natural randomness.
- Two or more close/easy pairs are penalized during shuffle selection. Close/easy means adjacent, diagonal-touching, very near by board distance, or within two linear card slots.
- Letter placeholder cards are used only for missing images.
- One normal mouse controls the game.
- No keyboard controls are required.
- No timer is used.
- The current team clicks two cards.
- A match gives that team +1 point.
- A matched pair is collected and appears as a chip in that team's scoreboard area.
- Matched card slots remain on the board as claimed cards showing the original image/label under a strong winning-team color overlay.
- On a match, the same team gets another turn.
- On a miss, both cards stay visible for about 1 second before the central `לוזר!!!` popup appears. The popup then stays briefly, fades quickly, the cards flip back, and the turn passes.
- Clicks are locked while a match or miss is resolving.
- The game ends when all 15 pairs are collected.
- Higher score wins.
- A tie is possible.
- At game over, a full-screen result popup shows the winner or tie, each team name, score, and collected cards.
- There is no visible New Game or Restart flow after game over.

Team colors are fixed:

- הבראזים: blue.
- החן יוספים, ועוזריהם: red.

The active game screen does not show the large `זיכרון בסלון` title; that space is reserved for larger cards. The active turn appears as its own prominent one-line block in the right score/control panel above the team sections. It shows the selected character/player name, such as `תור: דור`. The prefix `תור:` stays neutral and only the player name is colored. During play, a compact fighter cursor follows the mouse using the active player's fighter GIF when available, falling back to that player's portrait/name. The fighter cursor hides briefly, for about 1 second, only when a specific board card is revealed for the first time in the match. If that same card is revealed again later, the cursor stays visible.

Representative/player names are not shown inside team scoreboard sections. Team sections show only team name, score, and collected chips.

The active game layout is locked to the viewport so scoreboard content cannot push the board down. The board gets most of the screen width, spacing is tight, and cards/images are kept as large as practical.

Hidden card backs use a black/white playing-card style so they do not visually conflict with the red team color.

## Match Celebration

When a pair is found:

- The two matched cards are cloned into an overlay.
- The second matching card is rendered face-up first, then the matched cards immediately fly toward the center.
- The originals are dimmed so the board layout stays stable.
- The cloned cards fly toward the center.
- A glowing central celebration burst appears and stays readable longer before the chip flies away.
- A chip flies toward the active team's collected-pairs area, where collected thumbnails stack into a compact pile inside the team panel instead of expanding the scoreboard height. Image thumbnails do not show filename text.
- The pair is then marked collected on the board and added to the scoreboard.

Success and miss feedback both use the same centered overlay system. Celebration text uses a deterministic ordered list of success phrases. The first match uses the first phrase, the next match uses the next phrase, and so on. A short local fanfare plays on match, and each phrase still has a stable future `audioKey` mapping in `game.js` for optional voice clips later.

## Placeholder Assets

The game uses local card images first, then fills only missing pairs with a small number of letter cards.

No real personal photos or private sounds are included beyond the approved local images already provided.

Real card images can be added later under:

```text
games/memory/assets/images/cards/
```

Supported image formats:

- `png`
- `jpg`
- `jpeg`
- `webp`
- `gif`

Because this is a plain static browser game, JavaScript cannot automatically list files from that folder. Update the `CARD_IMAGE_FILENAMES` manifest in `game.js` whenever images are added, removed, or renamed. If images are replaced while keeping the same filenames, bump `CARD_ASSET_VERSION` in `game.js` so the browser reloads the local files instead of using cached copies. The current manifest was rescanned from `assets/images/cards/`.

Images in the manifest are used in manifest order. The 6x5 board needs 15 pairs. Images are used first; if fewer than 15 images are listed, only the missing pairs are filled with letters. The current manifest has 14 card images, so only 1 letter pair is used. If 15 or more images are listed, only the first 15 are used.

Recommended image approach:

- Use square-cropped `WebP` or `JPG` photos.
- Use `PNG` for transparent heads or cutouts.
- Keep files lightweight.
- Keep all card images local so the game has no internet dependency.

## Fighter Sounds

Character-select reveal sounds live under:

```text
games/memory/assets/sounds/fighter-reveals/
```

Each sound is pre-edited as two short cut-off starts plus the full clip, for example `Ha-Ha-Hadouken`. Current character assignment is:

- מסר → `gabo_reveal.mp3`
- מגמי → `pishuto_reveal.mp3`
- עומרי → `omri_reveal.mp3`
- פלטו → `plato_reveal.mp3`
- פישוטו → `meser_reveal.mp3`
- מיקי → `dor_reveal.mp3`
- דור → `miki_reveal.mp3`
- גבו → `magami_reveal.mp3`

These reveal sounds are intentionally the three-part arcade calls and should play only when selecting a character.

Single-use card-open sounds live under:

```text
games/memory/assets/sounds/fighter-card-opens/
```

During the Memory game, opening a board card plays the single-use card-open sound for the active team's selected fighter, with the same current character swaps as the reveal sounds. The generic card-flip sound is only a fallback if no active fighter can be resolved.

Plato's board-card-open sound is intentionally a short one-shot in `plato_card_open.mp3`.

If replacing these files while keeping filenames, bump `SOUND_ASSET_VERSION` in `game.js`.

Manifest example:

```js
const CARD_IMAGE_FILENAMES = [
  "dor-01.webp",
  "friend-01.jpg",
];
```

Local generated sound effects live under:

```text
games/memory/assets/sounds/
```

Current sounds:

- `music/arcade-01.mp3` through `music/arcade-04.mp3` play as the Memory-only background music playlist from the opening screen through game over.
- `card-flip.wav` is the fallback card reveal sound when no active selected fighter can be resolved.
- `match-fanfare.wav` plays when a matching pair is found.
- `miss-buzzer.wav` plays on a miss.
- `game-over-fanfare.wav` plays when the game ends.

The background playlist loops in order. Near the end of each track, the current song fades out while the next fades in. After `arcade-04.mp3`, it returns to `arcade-01.mp3`. Browser autoplay rules may delay the first note until the first click or keypress on the Memory page.

If replacing effect sound files while keeping the same filenames, bump `SOUND_ASSET_VERSION` in `game.js` so the browser does not keep cached audio. If replacing background music files while keeping the same filenames, bump `MUSIC_ASSET_VERSION`.

## Manual Validation Checklist

1. `node --check games/memory/game.js` passes.
2. Open `http://localhost:3001`.
3. Start screen shows image on the right and menu on the left.
4. Image is visible and not overly dark.
5. Only one main action button appears: `התחל`.
6. `איפוס תוצאה` does not appear on the clean start screen.
7. `התחל` stays disabled until both teams select characters.
8. After both teams select characters, clicking `התחל` opens the centered raffle modal with `מגרילים מי מתחיל`.
9. The raffle alternates between the selected player names, not just team names.
10. Game starts automatically after raffle.
10. הבראזים appears on the right.
11. החן יוספים, ועוזריהם appears on the left.
12. Selected starter stays visible for about 3 seconds before the game starts.
13. הבראזים is consistently blue.
14. החן יוספים, ועוזריהם is consistently red.
15. In-game `זיכרון בסלון` title is not shown.
16. Active turn appears as its own prominent block in the right score/control panel above the team sections.
17. Active turn text shows the selected character/player name.
18. Only the active player name is colored blue/red.
19. Cards are large and projector-friendly.
20. Right panel remains readable.
21. Scoreboard content starts at the same visual height for both teams.
22. Existing images from `assets/images/cards/` appear as card faces.
23. If fewer than 15 images exist, only the missing pairs appear as letters.
24. Board has exactly 30 cards / 15 pairs when 15 images are available.
25. Matching an image pair reveals the second card and immediately starts the center celebration.
26. Image pair appears as a larger thumbnail in the correct team scoreboard.
27. Claimed image cards remain visible with blue/red ownership overlay.
28. Only missing pairs appear as letter cards.
29. Claimed image cards remain visible with blue/red ownership overlay.
30. First match uses the first deterministic success phrase.
31. Next match uses the next phrase.
32. Match, miss, flip, and game-over sounds play from local files.
33. Claimed cards cannot be clicked again.
34. Refresh during game restores image cards, claimed ownership, scores, active team, selected characters, and next success phrase.
35. Closing/reopening restores same state.
36. No visible `איפוס תוצאה` button appears on the clean start screen or during active gameplay.
37. Final game-over result screen shows an `איפוס תוצאה` button.
38. Pressing `Command+D` on Mac or `Ctrl+D` on Windows opens the password popup.
39. Wrong password does not reset the game.
40. Password `Chmir` clears only Memory state and returns to clean start.
41. Opening `http://localhost:3001?init=1` clears only Memory state.
42. No selected character/player names appear inside team sections.
43. No `התור שלנו` label appears inside team sections.
44. A mismatch keeps both cards visible for about 1 second before showing central popup `לוזר!!!`.
45. Miss popup fade-out is short and snappy.
46. Active turn block stays unchanged during the miss popup.
47. No New Game / Restart appears after game over.
48. Browser console has no errors.

## Known Limitations

- Card images must be listed manually in the `CARD_IMAGE_FILENAMES` manifest.
- If card images are replaced with the same filenames, `CARD_ASSET_VERSION` must be bumped to avoid stale browser cache.
- Browser audio may stay silent until the first click/keyboard gesture allows playback.
- The match animation is intentionally simple and DOM-based for reliability.
- Reload during the raffle restarts the raffle from the saved representatives rather than resuming the exact animation frame.
