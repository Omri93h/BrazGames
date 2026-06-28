# Memory Game Plan

Status: shared-board Memory game implemented, pending user validation and approval.

This is Game 1 and must be approved before any other game work starts.

Build this game from scratch. Do not clone an external repo for Memory.

## Concept

A two-team, turn-based memory matching game using one shared board and one normal mouse.

The party version uses local card photos first, with placeholder letters only for missing pairs.

## Teams

- Team 1: הבראזים
- Team 2: החן יוספים, ועוזריהם

Each team must select a player character on the start screen before the game can begin.

Shared character roster:

- הבראזים: פישוטו, מיקי, דור, גבו.
- החן יוספים, ועוזריהם: מסר, מגמי, עומרי, פלטו.

Asset alias note:

- The user may refer to the rightmost visual הבראזים portrait as אוריין / Orian. In code and assets this is `pishuto` / `פישוטו`, not `omri` / `עומרי`. Keep the party-facing alias `פישוטו`, but route Orian face/fighter polish requests to the `pishuto` assets.
- The English id/name for גבו is `gabo`. Do not use alternate English spellings for him in code, asset names, docs, or Face Mapper metadata.

## Controls

Current approved gameplay input model:

- One normal mouse.
- Current team clicks two cards.
- No keyboard controls required.
- No two-mouse support.

Known issue avoided:

- Standard browsers usually cannot distinguish two physical mice as independent cursors.
- The redesign intentionally uses one mouse and turn-based play.

## Start Flow

- Start screen uses Hebrew-only title: `זיכרון בסלון`.
- The title/game identity is centered.
- הבראזים appears on the right.
- החן יוספים, ועוזריהם appears on the left.
- Each side shows four square character cards in a fighting-game character-select style.
- Mouse click selects a character. Character selection is mouse-only; team gameplay keys do not move the character selector.
- Selected cards use a blinking team-color stroke.
- The old side-image opening layout is replaced by a centered game title and side character-select panels.
- Start menu appears on the left.
- הבראזים is on the right.
- החן יוספים, ועוזריהם is on the left.
- One primary button: `התחל`.
- Clicking `התחל` shows a 16-second rules modal with very short instructions, a short mouse-control note, and a circular loader, then opens a centered raffle modal, shows `מגרילים מי מתחיל`, alternates between the selected player names, holds the selected starting player on screen for about 3 seconds, and then starts the game automatically. The selected player's team becomes the active starting team.
- `איפוס תוצאה` is not shown on the clean start screen.
- No visible `איפוס תוצאה` button is shown during active gameplay. The final game-over result screen includes a secondary `איפוס תוצאה` button. Pressing `Command+D` on Mac or `Ctrl+D` on Windows also opens the confirmation-only reset popup before clearing Memory localStorage.
- There is no reset password. The popup asks `האם אתה בטוח?`, and confirming clears only the Memory game state.
- No visible New Game or Restart appears after the game ends.

Fixed team colors:

- הבראזים is blue.
- החן יוספים, ועוזריהם is red.

## Persistence

Memory state is saved in browser `localStorage` under:

```text
dor-bachelor-memory-state-v1
```

Opening `http://localhost:3001` restores the saved Memory game automatically.

Refreshing, closing, or reopening the browser during an active Memory game must restore the same saved match state. A code or asset-manifest update should not wipe an active game; only unreadable or structurally invalid saved JSON may clear the Memory key. Saved card image paths can be refreshed to the current local asset version without resetting scores, turns, or claimed cards.

Opening `http://localhost:3001?init=1` clears only the Memory storage key and returns to a clean start screen.

The `Command+D` on Mac / `Ctrl+D` on Windows reset flow clears only the Memory storage key after confirmation.

Saved state includes:

- Phase.
- Representative names.
- Starting team.
- Active team.
- Deck order.
- Revealed/collected cards.
- Card type and local image path for image cards.
- Card manifest signature.
- Collected pair ownership.
- Claimed card owner colors.
- Scores.
- Collected pair chips.
- Deterministic success phrase index.
- Game over result.

## Screen Layout

Current implementation:

- Main game screen with one shared board and one scoreboard.
- Left side is the memory board.
- Right side is the scoreboard.
- The large in-game `זיכרון בסלון` title is removed after the start screen to maximize board/card size.
- Active turn is its own prominent one-line block in the right score/control panel above the team score sections, formatted as `תור: PLAYER_NAME`.
- Active turn shows the selected character/player name.
- Only the active selected character/player name is colored by team color.
- During gameplay, a compact active-player fighter cursor follows the mouse. It uses the selected player's fighter GIF when available, and falls back to the selected portrait/name.
- When a specific board card is revealed for the first time in the match, the fighter cursor hides briefly for about 1 second so it does not cover the new information.
- If that same board card was already revealed earlier and later flipped back, revealing it again does not hide the fighter cursor.
- Cursor-hide history is stored per card instance, not per image label, so repeat reveals stay comfortable without changing match rules.
- Every future fighter cursor must be checked as its own runtime asset, separate from the start-screen fighter preview. If a fighter is too tall, crop it deliberately from knees/lower body and shift it upward, using a per-character CSS override so other fighters are not affected.
- Team scoreboard sections do not show selected character/player names or a separate `התור שלנו` label.
- Scoreboard explicitly places הבראזים on the right and החן יוספים, ועוזריהם on the left.
- Board/sidebar proportions and spacing are optimized for larger projector-friendly cards.
- The active game screen is height-contained to the viewport; scoreboard content must not push the board down.
- Hebrew text uses RTL-aware styling where needed.

## Board

- 30 cards total.
- 15 pairs.
- Card images are loaded from `games/memory/assets/images/cards/` using the manual `CARD_IMAGE_FILENAMES` manifest in `game.js`.
- Supported image formats are `png`, `jpg`, `jpeg`, `webp`, and `gif`.
- Image pairs are used in manifest order.
- Missing image pairs fall back to a small number of placeholder letters.
- With the current 14 images, only 1 letter pair should appear.
- If there are 15 or more manifest images, only the first 15 are used.
- Stable 6x5 desktop/projector grid.
- Shuffle is filtered for party fairness: the game tries many shuffled deck orders and prefers the best-spaced one.
- The fair shuffle is best-effort only: it has a short time budget and falls back to a normal shuffle if anything fails.
- One close/easy matching pair is acceptable for natural randomness.
- Two or more close/easy matching pairs are penalized during shuffle selection. Close/easy means adjacent, diagonal-touching, very near by board distance, or within two linear card slots.
- Hidden card backs are black/white so they do not conflict with the red team color.
- Cards are clickable with the mouse.
- Shuffle happens on each clean new game.

## Rules

- Current team clicks two cards.
- Match: the second card is rendered face-up first, then both matching cards immediately fly toward the center, success feedback appears, team gets +1, pair is collected, claimed card slots stay visible with original image under the winning team's color overlay, and same team gets another turn.
- Miss: both cards stay visible for about 1 second, then the central fail popup `לוזר!!!` appears, fades quickly, cards flip back, and turn passes.
- Active turn block stays unchanged during the miss popup and updates only after the turn changes.
- Clicks are locked while resolving a match or miss.
- Game ends when all 15 pairs are collected.
- Game over uses a full-screen result popup with winner or tie, both team names, scores, and collected cards.
- Higher score wins.
- Tie is possible.

## Match Celebration

When a pair is found:

- The two matched cards are cloned into a fixed overlay using `getBoundingClientRect()`.
- Before the overlay starts, the board is forced to paint the second matching card face-up, then the center animation starts immediately.
- Original cards are dimmed during the effect.
- Clones animate toward the center of the screen.
- A glowing burst appears behind them.
- Success feedback stays visible long enough to read before the chip flies away.
- A chip flies toward the active team's collected-pairs area.
- Collected thumbnails stack into a compact bounded pile inside each team panel so they cannot expand the scoreboard height. Image thumbnails do not show filename text.
- The board layout remains stable.
- Celebration text uses a deterministic ordered list of success phrases, one per match in order.
- Miss feedback uses the same centered overlay system with different fail styling.
- Selecting a character plays that fighter's three-part reveal sound.
- Opening a board card plays the active fighter's one-shot card-open sound, not the three-part reveal sound. The generic card-flip sound is only a fallback when no fighter can be resolved.
- Local generated sound effects play for fighter-backed card opens, matches, misses, and game over. Each success phrase still has a future `audioKey` mapping for optional voice clips.

## Asset Replacement Ideas

- Card face photos: Dor, friends, group photos, inside jokes.
- Card backs: bachelor party logo or simple placeholder pattern.
- Team labels: fixed Hebrew team names.
- Start background currently uses `games/memory/assets/images/DOR-TECHEM.jpg`.
- Card images live under `games/memory/assets/images/cards/`.

Use local images from the approved asset folder and placeholders only for missing pairs.

Because this is a static local browser game, the browser cannot list files from a local folder automatically. Update `CARD_IMAGE_FILENAMES` in `game.js` whenever card images are added, removed, or renamed. If images are replaced while keeping the same filenames, bump `CARD_ASSET_VERSION` in `game.js` so the browser reloads the local files instead of using cached copies. The current manifest was rescanned from `assets/images/cards/`.

The current 6x5 board uses 15 pairs. The latest manifest contains 14 local card images, so only 1 fallback letter pair remains.

All card images must remain local so there is no internet dependency during the party.

## Sound Replacement Ideas

Current local generated WAV effects live in `games/memory/assets/sounds/`:

- `card-flip.wav` as the fallback card reveal sound when no active selected fighter can be resolved.
- `fighter-reveals/` for three-part character-select reveal calls.
- `fighter-card-opens/` for one-shot active-fighter card-open sounds.
- `music/arcade-01.mp3` through `music/arcade-04.mp3` for the Memory-only background music playlist.
- `match-fanfare.wav` for a correct pair.
- `miss-buzzer.wav` for a wrong pair.
- `game-over-fanfare.wav` for the final result.

The background music starts as soon as browser audio permissions allow, usually after the first click or keypress on the Memory page. It plays from the opening screen through game over, fades between tracks, loops back to the first song after the fourth, and pauses when the Memory tab is hidden.

Future voice clips can be mapped to deterministic success phrase keys such as `success-01`, but no voice recordings are required right now.

## Known Risks

- 30 cards must stay readable on the projector.
- Long Hebrew team names need wrapping and enough scoreboard space.
- Animation must keep input locked until resolution completes.
- Real photos will need resizing/cropping before party use.

## Implementation Notes

- Keep this game local and lightweight.
- Use `http://localhost:3001` unless the port plan changes.
- Run with `cd games/memory && python3 -m http.server 3001`.
- Manual validation steps are documented in `games/memory/README.md`.
- Do not start another game until this one is approved.
