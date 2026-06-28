# Dino / Escape From Be'er Sheva Plan

Status: in progress. Split-screen Dino-style playable prototype with 5-round flow is implemented.

Working title: `הבריחה מבאר שבע`

Proposed URL: `http://localhost:3003`

Proposed folder: `games/dino/`

Submarine Survival was treated as approved to move forward after user confirmation. Continue Dino work one block at a time.

Source decision:

- Use a local copy/adaptation of `PrashanthaTP/dinorun`.
- License: MIT.
- Local vendor folder: `games/dino/vendor/dinorun/`.
- Local source assets: `games/dino/assets/dinorun/`.
- Do not depend on GitHub or internet at runtime.

## Concept

A local Dino-style runner where the player runs away from Be'er Sheva through a road/desert/local-joke obstacle course.

The game should feel inspired by simple Dino Runner mechanics, but themed for the party:

- Desert / road / Be'er Sheva visual world.
- Local-joke obstacles.
- Big readable projector UI.
- Fast rounds.
- Obvious winner.
- No internet dependency.

Possible title direction:

- `הבריחה מבאר שבע`

Visual ideas:

- Road or desert background.
- Sign text such as `צאתכם לשלום באר שבע`.
- Obstacles related to Be'er Sheva, desert life, train/bus/road jokes, or group jokes.
- Funny fail/result screens.

## Recommended MVP Direction

Use a classic Dino Runner structure.

Recommended first implementation:

- Two runners are active at the same time.
- The screen is split into two horizontal lanes.
- Both runners move forward automatically.
- החן יוספים, ועוזריהם jump with `W`.
- הבראזים jump with the up arrow.
- Cactuses and desert obstacles scroll from right to left.
- If one runner hits an obstacle, the whole screen freezes and then shows the round result for about 6 seconds with a circular timer under the `X אכל אותה` line.
- The match has 5 rounds.
- Every round starts with a countdown modal only.
- Round results and the final winners/tie state should appear in centered wide modal cards, not as loose text over the playfield.
- No starter raffle.
- If one runner hits an obstacle, the other team gets the round point.

Keep the game simple and reliable: always running, one jump key per team, no duck/slide for now.

## Start Screen

Use the shared Dor party game opening style.

Required structure:

- Game number: `משחק מספר 3`.
- Large animated title: `הבריחה מבאר שבע`.
- No exclamation mark unless explicitly requested.
- Opening-screen background uses `games/dino/assets/images/backgrounds/dor-beer-sheva-start.jpg` through `--start-bg-image` in `style.css`, with the shared half-dark intro scrim after pressing `התחל`.
- Start flow follows the shared staged intro:
  - initial screen shows the sharp opening image/placeholder and one `התחל` button.
  - first click fades the button and reveals the title/team panels.
  - button returns as `התחל משחק`.
- Same fighting-game character select pattern as the current games.
- Use the shared local face-card portraits and fighter preview GIFs from `games/dino/assets/images/characters/`.
- Selecting a character plays that character's local fighter reveal sound from `games/dino/assets/sounds/fighter-reveals/`.
- הבראזים on the right.
- החן יוספים, ועוזריהם on the left.
- Important display rule: never show only `החן יוספים` as the full team name. If the UI splits the name, show `החן יוספים,` as the main line and `ועוזריהם` as a smaller subline underneath.
- Four character cards in one horizontal row per team.
- Mouse-only character selection.
- Selected cards flash their stroke quickly, then keep a stable team-color stroke.
- Start button is disabled until both teams select a character.
- After both teams select characters and press `התחל משחק`, show a 16-second rules modal with a circular loader before the first round countdown. Label controls as `מקשים:` and show `W` and a visible `↑` up-arrow keycap.
- Refresh while still on the start screen returns to a clean opening state with no selected cards and no fighter previews.

Shared roster:

- הבראזים: פישוטו, מיקי, דור, גבו.
- החן יוספים, ועוזריהם: מסר, מגמי, עומרי, פלטו.

## Controls

Current controls:

- החן יוספים, ועוזריהם: `W` jumps.
- הבראזים: up arrow jumps.
- Both runners move automatically.
- No duck/slide unless explicitly re-approved later.

This follows the cross-game team control direction: החן יוספים, ועוזריהם use the left keyboard area and הבראזים use arrows.

## Pre-Round Flow

Recommended flow should match the party pacing from Submarine:

1. Start screen with character select.
2. Show an 8-second preparation countdown.
3. Both runners start automatically together.
4. החן יוספים, ועוזריהם jump with `W`; הבראזים jump with up arrow.
5. Collision freezes the whole screen and gives the point to the other team.
6. Show the round result in a centered wide modal card, then repeat for 5 total rounds.
7. Show the shared centered winners/tie modal card, consistent with the other party games.

Keep round result language short and funny. Avoid clutter.

## Gameplay Layout

Recommended active game layout:

- Full-screen DOM runner.
- HUD at the top, height-contained.
- Score centered and large.
- Team names on the sides.
- Selected player names visible but not dominating the playfield.
- Each lane's active HUD keeps the player name/team/score block intact and adds a separate fighter-idle column to the visual left of that block. The chosen fighter GIF should face left in both lanes; the החן יוספים, ועוזריהם fighter needs to be mirrored from its start-screen orientation for this gameplay HUD.
- Two horizontal runner lanes fill the playfield.
- Each lane has its own runner, ground, obstacles, lane score, and key label.
- Background scrolls horizontally.
- At the start of a fresh match, each lane can show only the first non-colliding distant roadside sign, `ברוכים הבאים / לבאר שבע`, in the desert background. After round 1, the first queued sign of a round starts offscreen to the right so the runners arrive at it during play instead of seeing it immediately. Signs then behave like one continuous finite queue across all rounds, without any sign-per-stage mapping: the next sign begins entering from the right with twice the previous generous spacing while the current one is still visible, but not immediately on top of it, and the queue advances only after the current sign reaches at least the middle of the track. If a player loses before that midpoint threshold, even if the sign was fully visible, that same uncommitted sign should be first in the following round. When the queue ends, no new sign is spawned and the signs do not restart from the beginning. Current additional signs include `מבצע במכללת סמי שמעון! / 2 תארים ב-10 קדימה רק היום אינעל דינק`, `פסטה בסטה / כי מסתבר שזה מדהים שמוצר זול עולה זול`, `אונ' בן גוריון ! / כי מי לא רוצה אווירה סטודנטיאלית בחור תחת`, `אמא של חמיר / אמא של חמיר / אל תסמוך עליה / היא בסוף / אותך / תחמיר`, the Sima Shimoni sign with a smaller cropped zombie face above the text, `צאתכם לשלום! / באר שבע`, `נמל התעופה / בן גוריון / →`, `הרגה אותי / המסיבת רווקים הזאת`, `סגור ת'חלון`, `ברוכים הבאים לאשדוד / או אשקלון / גם התושבים עצמם / לא מבדילים`, `שיחקתי כל משחק / איזה 100 פעמים / איזה בזבוז זמן / התחייבות הרסנית`, and `תקשיבו לי עכשיו דחוף / המקרר פתוח`. Long distant signs should use a lower `speedScale` so they feel farther away and remain readable for longer. Future signs should be added to `BACKGROUND_SIGN_MESSAGES` and use the same `.lane-start-sign` system, including the shared oversized gray low-opacity background treatment, tall post variables, and queue behavior instead of custom one-off sign styling.
- Background zombie figures appear as muted gray low-opacity parallax actors from the pre-round countdown. They should all use the same small-but-readable size, stay around the height of the roadside sign posts and a little below the sign text panels, remain decorative only, stay out of `laneState.obstacles`, and never participate in collision detection.
- Stable viewport height, no page scroll.
- The active Dino world should fill the available playfield height. Do not render it as a small centered strip on a different page background.

The playfield should look like a road/desert escape route rather than a generic platformer.

## Mechanics

MVP mechanics:

- Constant forward scrolling.
- Speed starts manageable.
- Difficulty increases gradually during each round.
- Later rounds start slightly faster than earlier rounds.
- Difficulty stars are hidden during normal play. On a difficulty increase, show the previous stars plus one blinking new star briefly, with no numeric `LEVEL` clutter.
- Obstacles spawn from the right.
- Cactuses/desert obstacles require a jump.
- Obstacle pilot: replace the single-cactus-only spawn with weighted obstacle patterns. The current pilot includes small, regular, and large cactuses, a close double-cactus pattern with separate collision boxes, and deterministic small Jackson face obstacles at obstacle 30 in round 2, obstacle 3 in round 3, obstacle 15 in round 4, and obstacles 7 and 14 in round 5. The previous CSS-built bird pilot is disabled because it did not read clearly as a flying obstacle. The Jackson source asset is `games/dino/assets/images/obstacles/jackson-face.webp`, but gameplay uses the preloaded smaller runtime copy `games/dino/assets/images/obstacles/jackson-face-runtime.png` to avoid first-spawn decode stutter. Do not add duck/slide controls unless explicitly re-approved.
- Later/complex obstacle patterns should be gated by round and elapsed round time so round 1 stays mostly simple and the first seconds of each round stay readable.
- Hit detection must feel fair and slightly forgiving.
- Dino/obstacle hitboxes should stay inset by a few pixels so near-misses do not count as hits. Double cactuses should use separate per-cactus hitboxes instead of one large merged rectangle.
- One hit ends the round.
- When a runner loses, show a short failure label above that runner and flash the runner dark so the hit is clear before/while the result appears.
- 5 total rounds decide the match.

Potential later mechanics:

- Different obstacle sets per stage.
- Character-specific tiny animations.
- More desert/local joke obstacles.
- Multi-attempt match flow if one attempt per team is too short.

## Stages / Themes

Possible stage structure:

1. `שלב ראשון: היציאה מבאר שבע`
2. `שלב שני: תחנה מרכזית`
3. `שלב שלישי: כביש המדבר`
4. `שלב רביעי: צאתכם לשלום`
5. `שלב חמישי: TODO`

These are placeholder names. Final names should be approved before implementation.

## Assets

Expected local asset folders:

```text
games/dino/assets/images/players/
games/dino/assets/images/obstacles/
games/dino/assets/images/backgrounds/
games/dino/assets/images/backgrounds/zombies/
games/dino/assets/sounds/
```

Initial assets can be generated with CSS/canvas placeholders:

- Runner silhouettes / colored party characters.
- Desert background layers.
- Small muted gray background zombie figures that appear later in the run, not during the countdown.
- Road line / sand dunes.
- Sign obstacle with Hebrew text.
- Generic obstacle blocks.

Future replacement ideas:

- Dor runner face/body. Current active Dino sprites already use the user-provided mirrored Dor face composited onto every runner state.
- Team-specific runner colors.
- Be'er Sheva signs.
- Local-joke obstacles.
- Desert props.
- Background photos or illustrated scenes.

All assets must be local. No external hosted assets during runtime.

## Sounds

Use local generated sounds only unless the user provides approved files.

Implemented:

- Dino-only background playlist lives under `games/dino/assets/sounds/background-music/`.
- Tracks `arcade_5.mp3`, `arcade_6.mp3`, `arcade_7.mp3`, and `arcade_8.mp3` play continuously after the first user gesture on the Dino page, crossfade one after another, and loop from the fourth track back to the first.
- `games/dino/assets/sounds/gameplay/jump-boing.mp3` plays once when a runner actually starts a jump.
- `games/dino/assets/sounds/gameplay/dino-death.mp3` plays once when a runner is eliminated.

Recommended sound events:

- Round won / point scored.
- Countdown start.
- Game over.

Keep sounds short and party-readable, around 0.2-1.5 seconds.

## Persistence / Reset

Use localStorage with a Dino-specific key:

```text
dor-bachelor-dino-state-v1
```

Required behavior when implemented:

- Refresh/reopen should restore the match context automatically.
- If refresh happens during live gameplay, restarting the current round safely is acceptable as long as score, selected characters, round number, and match state are preserved.
- Current Dino behavior: refresh during live gameplay returns to the countdown checkpoint for the same round, with score and completed round results preserved.
- `Command+D` on Mac or `Ctrl+D` on Windows opens the password-protected reset/admin popup.
- `Command+D` on Mac or `Ctrl+D` on Windows on the start screen toggles solo debug mode for one active runner and shows a visible badge.
- Starting a match while solo debug mode is active skips the 16-second rules modal and the 8-second round countdown, then begins the current round immediately.
- During gameplay, `Command+D` on Mac or `Ctrl+D` on Windows opens reset. On Mac only, `Ctrl+D` toggles solo debug mode.
- Password remains `Chmir`.
- Reset clears only the Dino storage key.
- Do not clear Memory or Submarine state.
- Avoid visible reset buttons in the normal party UI unless explicitly requested.

## Technical Direction

- Plain HTML/CSS/JS.
- No npm, Vite, backend, accounts, or external runtime dependencies.
- DOM is used for the current split-lane playfield and collision.
- DOM is recommended for start screen, overlays, HUD, and reset modal.
- Keep game standalone under `games/dino/`.
- Run locally with:

```text
cd games/dino
python3 -m http.server 3003
```

Open:

```text
http://localhost:3003
```

## Suggested Implementation Blocks

Block 1: documentation and skeleton - implemented

- Create `games/dino/`.
- Add static `index.html`, `style.css`, `game.js`, asset folders, and README.
- Copy the shared opening-screen pattern, adapted to game 3.
- Include a future opening-image slot and the staged intro flow from the shared party-game style.
- Includes start screen, character select, and basic local state.

Block 2: real Dino source integration - implemented

- Use the local `PrashanthaTP/dinorun` source assets for dino, ground, and cactus visuals.
- Adapt paths so Dino assets load from `assets/dinorun/`.
- Keep the Dor party start screen around the custom split-lane runner.

Block 3: match flow - implemented

- Add 5 total rounds.
- Split the screen into two horizontal lanes.
- Run both teams at the same time.
- Add an 8-second countdown modal before each round starts.
- Award the round point to the other team when a runner hits an obstacle.
- Add persistence and `Command+D` on Mac / `Ctrl+D` on Windows reset.
- Keep the active playfield full-height so the background does not appear as a centered strip.

Block 4: party polish

- Add stage names.
- Add more obstacle types.
- Add local generated sounds.
- Add better runner/obstacle placeholders.
- Tune speed and hitboxes.

Block 5: asset replacement

- Add local real/custom assets when provided.
- Update manual manifests if needed.
- Document replacement naming and cache-busting.

## Manual Validation Checklist For First Playable Version

1. Open `http://localhost:3003`.
2. Start screen matches the shared arcade style.
3. Game title says `הבריחה מבאר שבע`.
4. Character selection is mouse-only.
5. Start requires one selected character per team.
6. החן יוספים, ועוזריהם jump with `W`.
7. הבראזים jump with the up arrow.
8. Both runners move automatically.
9. Cactus/desert obstacles appear in both lanes.
10. Cactuses scroll from right to left.
11. Collision feels fair.
12. Collision freezes the screen and ends the round.
13. The other team gets the round point.
14. After 5 rounds, winner/tie is shown.
15. Difficulty stars appear briefly only when the difficulty increases.
16. Refresh during live play returns to the same round countdown with score preserved.
17. `Command+D` on Mac or `Ctrl+D` on Windows opens password reset.
18. `Command+D` on Mac or `Ctrl+D` on Windows on the start screen shows the solo debug badge.
19. Password `Chmir` resets only Dino state.
20. On Mac, `Ctrl+D` during gameplay toggles solo debug mode.
21. `Command+D` on Mac or `Ctrl+D` on Windows during gameplay opens reset.
22. No internet required.
23. Browser console has no errors.

## Known Risks

- Runner collision can feel unfair if hitboxes are too strict.
- Two simultaneous lanes must be tested for fair obstacle spacing and keyboard responsiveness.
- Difficulty ramp must start easy enough and become harder gradually.
- Hebrew text on moving signs must remain readable.
- The shared start screen must stay visually consistent with Memory and Submarine.
- Do not let HUD or overlays reduce the playable area too much.
