# Dino / Escape From Be'er Sheva

Working title: `הבריחה מבאר שבע`

This is Game 3 for Dor Bachelor Party Games.

Current status: playable split-screen Dino runner with a 5-round party flow.

## Run Locally

```bash
cd games/dino
python3 -m http.server 3003
```

Open:

```text
http://localhost:3003
```

Developer/admin reset:

```text
http://localhost:3003?init=1
```

This clears only the Dino game storage key:

```text
dor-bachelor-dino-state-v1
```

## Current Prototype

Implemented now:

- Shared party-style start screen.
- Opening-screen background uses the local `assets/images/backgrounds/dor-beer-sheva-start.jpg` image through `--start-bg-image` in `style.css`. The staged intro keeps the shared half-dark scrim treatment so the title and character panels stay readable after pressing `התחל`.
- Shared character face cards and fighter preview GIFs are local under `assets/images/characters/`.
- Dino-only background music uses the local `assets/sounds/background-music/arcade_5.mp3` through `arcade_8.mp3` playlist. It starts after the first user gesture on the Dino screen, plays continuously from the start screen through the final result, crossfades between tracks, and loops from the final track back to the first.
- Start screen flow: first click shows the intro animation, then the button returns as `התחל משחק`.
- The first click plays `choose-your-fighter.mp3` about one second before the staged character-select intro finishes.
- Selecting a character plays that character's local fighter reveal sound from `assets/sounds/fighter-reveals/`.
- Refreshing while still on the start screen returns to a clean start state with no selected cards and no fighter previews.
- After both teams select characters and press `התחל משחק`, a 16-second rules modal appears with a circular loader before the first round countdown. Controls are labeled `מקשים:` and shown as keycaps: `W` for החן יוספים, ועוזריהם and a visible `↑` up-arrow keycap for הבראזים.
- Game number: `משחק מספר 3`.
- Title: `הבריחה מבאר שבע`.
- Team placement:
  - הבראזים on the right.
  - החן יוספים, ועוזריהם on the left.
- Mouse-only character selection.
- Start button enabled only after both teams choose a character.
  - Dino-style runner prototype using local assets from the MIT-licensed `PrashanthaTP/dinorun` source:
  - the screen is split into two horizontal lanes.
  - both teams run at the same time.
  - הבראזים jump with the up arrow.
  - החן יוספים, ועוזריהם jump with `W`.
  - every accepted jump plays the local `assets/sounds/gameplay/jump-boing.mp3` sound once; repeated keypresses while the runner is already airborne do not retrigger it.
  - each elimination plays the local `assets/sounds/gameplay/dino-death.mp3` sound once before the round-result modal.
  - the active gameplay HUD keeps the existing selected player name, team name, and score card unchanged, with a separate fighter-idle column to its visual left. The selected fighters reuse the start-screen preview GIFs and are mirrored so both face left during gameplay.
  - cactuses/desert obstacles scroll toward the player.
  - obstacle pilot: the runner now uses weighted obstacle patterns instead of a single repeated cactus. The pilot includes small, regular, and large cactuses plus a close double-cactus pattern with separate hitboxes. The previous CSS bird pilot is disabled because it did not read clearly as a flying obstacle. Scheduled small Jackson face obstacles appear at obstacle 30 in round 2, obstacle 3 in round 3, obstacle 15 in round 4, and obstacles 7 and 14 in round 5. The large source copy stays at `assets/images/obstacles/jackson-face.webp`, while gameplay uses the preloaded smaller runtime copy `assets/images/obstacles/jackson-face-runtime.png` to avoid first-spawn image decode stutter. No duck/slide control is added in this pilot.
  - dino/obstacle hitboxes are slightly inset by a few pixels so near-misses feel fair.
  - when one runner hits a cactus, the full screen freezes on the hit moment for about 1.5 seconds, then shows the round result in a centered wide modal card styled like the final result modal for about 6 seconds, with a circular timer underneath the `X אכל אותה` line.
  - the match has 5 rounds.
  - every round starts with an 8-second countdown modal only. No starter raffle.
  - when one runner hits an obstacle, the other team gets the round point.
  - the Dino playfield is full-bleed inside the game area so the background stays continuous instead of appearing as a horizontal strip.
  - the playfield uses the same desert color above and around the runners so no white band appears over the lanes.
  - a fresh match starts with only the first non-colliding distant roadside sign reading `ברוכים הבאים / לבאר שבע`; it is very large, gray, low-opacity, sits in the desert background, and moves with parallax as the runner passes it. After round 1, the first queued sign of a round starts offscreen to the right so the runners "arrive" at it instead of seeing it immediately.
  - after the opening sign, distant signs behave as one continuous finite queue spread across rounds. The next sign emerges from the right with twice the previous generous spacing, before the current sign leaves the screen but not immediately on top of it. The queue advances only after that sign reaches at least the middle of the track; if a round ends before that, even if the sign was fully visible, the uncommitted sign is first in the next round. There is no sign-per-stage mapping. When the queue ends, no new sign is spawned and the signs do not restart from the beginning. The current second sign reads `מבצע במכללת סמי שמעון! / 2 תארים ב-10 קדימה רק היום אינעל דינק`.
  - the current third sign reads `פסטה בסטה / כי מסתבר שזה מדהים שמוצר זול עולה זול`.
  - the current fourth sign reads `אונ' בן גוריון ! / כי מי לא רוצה אווירה סטודנטיאלית בחור תחת`; its first line is bold and the following lines are lighter.
  - the current fifth sign reads `אמא של חמיר / אמא של חמיר / אל תסמוך עליה / היא בסוף / אותך / תחמיר`.
  - the current sixth sign reads `סימה שמעוני / מתווכת מספר 1 / סמכו עלי כי הפרצוף שלי פה על השלט`; it is larger, with a smaller cropped zombie face at the top and all text underneath.
  - the current seventh sign reads `צאתכם לשלום! / באר שבע`.
  - the current eighth sign reads `נמל התעופה / בן גוריון / →` with a large right-arrow line.
  - later queued signs continue with `הרגה אותי / המסיבת רווקים הזאת`, `סגור ת'חלון`, `ברוכים הבאים לאשדוד / או אשקלון / גם התושבים עצמם / לא מבדילים`, `שיחקתי כל משחק / איזה 100 פעמים / איזה בזבוז זמן / התחייבות הרסנית`, and `תקשיבו לי עכשיו דחוף / המקרר פתוח`.
  - long distant signs move more slowly than short signs so they feel farther away and remain readable for longer.
  - future distant signs should be added to `BACKGROUND_SIGN_MESSAGES` and reuse the same `.lane-start-sign` styling so they inherit the shared oversized background treatment, tall sign post, and queue behavior.
  - muted zombie figures from the user-provided local ZIP are visible from the pre-round countdown as small-but-readable same-size parallax background actors around the height of the sign posts, a little lower than the text panels. They are not obstacles and cannot eliminate the Dino.
  - the active playfield uses CSS desert layers with distant dunes and sand texture.
  - speed and obstacle pressure ramp up gradually during each round, with later rounds starting slightly faster.
- Difficulty stars are hidden during normal play and briefly appear only when the difficulty increases.
- On the start screen, `Command+D` on Mac or `Ctrl+D` on Windows toggles solo debug mode with one runner and shows a visible debug badge. Starting while debug mode is active skips the rules modal and round countdown and begins the round immediately.
- During gameplay on Mac, `Ctrl+D` toggles solo debug mode; if it is enabled during a prep/countdown checkpoint, the round starts immediately instead of waiting.
- During gameplay, `Command+D` on Mac or `Ctrl+D` on Windows opens the confirmation reset popup.
- There is no reset password; confirming clears only Dino state and reloads the page to the start screen.
- Refresh/reopen during the match does not return to the home screen.
- If refresh happens during live play, the current round restarts from its countdown checkpoint while score and completed rounds stay saved.
- Runner mechanics use local vendor files copied from `PrashanthaTP/dinorun`.
- The active Dino sprites use the user-provided mirrored Dor face composited onto `dino-stationary.png`, `dino-run-0.png`, `dino-run-1.png`, and `dino-lose.png`. The face is enlarged, raised, and adjusted with top margin so the hair stays visible. The latest sprite pass raises the composited face about 4 source pixels, which renders as roughly 20px higher in the scaled game lane. The mirrored source face is stored at `assets/images/players/dor_face_mirrored.png`; original pre-face Dino sprites are backed up under `backups/dino-dor-face-2026-06-26/`, the previous face-composite pass is backed up under `backups/dino-dor-face-before-raise20-2026-06-26/`, and the clipped raised pass is backed up under `backups/dino-dor-face-before-hair-fix-2026-06-26/`.

Source / license:

- Source repo: `https://github.com/PrashanthaTP/dinorun`
- License: MIT.
- Local copied source: `vendor/dinorun/`
- Local copied Dino assets: `assets/dinorun/`
- Runtime is fully local; no GitHub or internet dependency during the party.

Not implemented yet:

- Additional gameplay sounds such as countdown, point scored, and game over.
- Dedicated bird artwork; the previous CSS silhouette bird is disabled until there is a clear lightweight flying asset.

## Planned Controls

This game is a two-team keyboard runner:

- החן יוספים, ועוזריהם: `W` jumps.
- הבראזים: up arrow jumps.
- Both runners move automatically.
- No duck/slide in the current direction.
- After 5 rounds, the game uses the shared centered winners modal card: `המנצחים:`, winner name, final score, team names, and a secondary confirmation-only `איפוס תוצאה` action.

## Asset Folders

```text
assets/images/players/
assets/images/obstacles/
assets/images/backgrounds/
assets/sounds/
```

Keep all assets local. Do not use external hosted assets at runtime.

Background zombie assets live under:

```text
assets/images/backgrounds/zombies/
```

They are decorative only. Do not add them to `laneState.obstacles` or collision detection.

## Manual Validation Checklist

1. Open `http://localhost:3003`.
2. Start screen appears.
3. Title says `הבריחה מבאר שבע`.
4. `משחק מספר 3` appears above the title.
5. הבראזים are on the right.
6. החן יוספים, ועוזריהם are on the left.
7. Character selection works with the mouse.
8. Start button is disabled until both teams select a character.
9. Clicking start opens the runner screen.
10. Selected player names appear in the HUD.
11. Both runners move automatically.
12. `W` makes החן יוספים, ועוזריהם jump.
13. Up arrow makes הבראזים jump.
14. Cactuses move toward both runners.
15. Small, regular, large, double-cactus, and round-3 Jackson patterns can appear after their round/time gates.
16. Double cactuses use two separate collision boxes, not one oversized box.
17. A distant oversized `ברוכים הבאים / לבאר שבע` sign appears higher in each lane at the start of the first round and scrolls away without causing a hit.
18. In later rounds, the current queued sign starts offscreen to the right and arrives into view without causing a hit.
19. Small gray zombie figures are visible from the countdown/background setup and do not cause hits.
20. Hitting an obstacle freezes the whole screen for about 1.5 seconds before the result appears.
21. Round results appear inside a centered wide modal styled like the final winners modal, not as loose text over the playfield.
22. Each round starts with an 8-second countdown only, no starter raffle.
23. After 5 rounds, the centered winners/tie modal card is shown.
24. `Command+D` on Mac or `Ctrl+D` on Windows on the start screen shows the solo debug badge, and starting in debug mode skips rules/countdown directly into gameplay.
25. The reset popup asks `האם אתה בטוח?` and does not ask for a password.
26. Confirming resets only Dino state and reloads to the start screen.
27. `?init=1` clears only Dino state.
28. Refresh during live play returns to the same round countdown with score preserved.
29. On Mac, `Ctrl+D` during gameplay toggles solo debug mode.
30. `Command+D` on Mac or `Ctrl+D` on Windows during gameplay opens the reset popup.
31. Background music begins after the first click/key interaction, keeps playing across start/rules/countdown/gameplay/result/final screens, crossfades from one arcade track to the next, and loops after the fourth track.
32. A real jump plays `jump-boing.mp3` once; pressing jump again while airborne does not replay it.
33. Hitting an obstacle plays `dino-death.mp3` once for the elimination.
34. No internet required.
