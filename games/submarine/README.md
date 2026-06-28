# צוללות חמקמקות

Game 2 of Dor Bachelor Party Games.

This is a local two-player submarine survival game built with plain HTML, CSS, JavaScript, and Canvas. It has no build step and no internet dependency.

## How To Run Locally

From the repository root:

```sh
cd games/submarine
python3 -m http.server 3002
```

Then open:

```text
http://localhost:3002
```

The main local game uses the pixel arcade visual style by default:

```text
http://localhost:3002
```

Classic non-pixel visual mode:

```text
http://localhost:3002/classic/
```

or:

```text
http://localhost:3002?classic=1
```

The pixel arcade look keeps the same gameplay, hitboxes, enemy sizes, score, and flow, but renders the underwater background with pixel-style bands, blocky distant fish/drifters, and square bubbles/particles. Submarines and enemy face sprites stay smooth/readable so tier colors and hunter flashing remain clear.

For a clean reset:

```text
http://localhost:3002?init=1
```

The game saves match progress locally under `dor-bachelor-submarine-state-v1`. Refreshing or reopening `http://localhost:3002` restores the current match context automatically after gameplay has started. If the refresh happened during live gameplay, the current round is safely restarted from its pre-round screen, but the score, round number, selected player names, debug mode, and match duration are preserved. Refreshing around the start screen intentionally returns to a clean opening state with no selected character cards or fighter previews.

## Teams

- הבראזים: blue submarine.
- החן יוספים, ועוזריהם: red submarine.

Each team must select a player character on the start screen before the game can begin. In solo debug mode, only the active single-submarine team needs to select a character.

Character roster:

- הבראזים: פישוטו, מיקי, דור, גבו.
- החן יוספים, ועוזריהם: מסר, מגמי, עומרי, פלטו.

## Start Flow

- Opening screen follows the shared party-game style.
- Kicker: `משחק מספר 2`.
- Title: `צוללות חמקמקות`.
- The game title appears in the center, with team character panels on the sides.
- הבראזים appears on the right.
- החן יוספים, ועוזריהם appears on the left.
- Each team has four square character cards, inspired by Tekken / Mortal Kombat character select screens.
- Characters can be selected with the mouse.
- A selected character gets a blinking team-color stroke.
- Click `התחל`.
- `התחל` is enabled only after all required teams select a character.
- Controls are fixed: החן יוספים, ועוזריהם always get `WASD`; הבראזים always get arrow keys.
- The same arcade playlist used by Memory plays only during the Submarine opening/rules flow. It stops before the first stage countdown so it does not overlap the stage songs.
- After character selection, a 16-second rules modal appears with a circular loader and short controls/objective text. Controls are labeled `מקשים:` and shown as visible key clusters: `WASD` for החן יוספים, ועוזריהם and a full `↑ ← ↓ →` arrow-key cluster for הבראזים. The final objective line is `מי יצליח לקחת את דור לחוף המבטחים מתקופת הצבא האכזרית?`.
- Before the first round, an 8-second next-stage screen appears.
- Stage background music starts during that stage's next-stage countdown, fades in, plays prominently at about 75% volume under gameplay, continues through elimination and the round-summary screen, and hands off only when the next-stage announcement appears. Unless a custom offset is requested, a stage song starts at `00:00`.
- Between rounds, the game first shows a 5-second round-summary screen with only who was eliminated and survival time, then a separate 8-second next-stage screen.
- The next-stage screen shows selected face portraits in large square frames, then the stage label above the countdown. Countdown portrait images render substantially smaller than the frame so they keep generous visible breathing room on all sides and no cropped ears, chins, hair, beards, or side-facing faces. Portrait direction matches the start-screen cards, so הבראזים portraits face left/inward. Stage 1 is `שלב ראשון: המגמים`; Stage 2 is `שלב שני: אנטישמים מלוחים`; Stage 3 is `שלב שלישי: לה פאמיליה`; Stage 4 is `שלב רביעי: The Revenge Of The Exiled`; Stage 5 is `השלב הסופי: חמירוזון פריים` with a scarier fire/blood title treatment.
- The round screen shows the score centered, team names on the sides, selected player names, assigned controls, and 3 hearts per team.
- There is no separate `3`, `2`, `1` screen.
- The active-game HUD shows team names on the sides, each selected character fighter sprite next to the centered score looking toward the opponent, a prominent centered score, a small timer, and 3-heart status for each team. HUD fighter image slots start hidden and stay hidden if no valid fighter image is loaded, so stage/countdown overlays never reveal empty image boxes behind the modal.
- Visible `ROUND` numbers, `פסילות X/5` counters, and enemy difficulty labels are intentionally hidden to keep the screen cleaner.
- Press `Command+D` on Mac or `Ctrl+D` on Windows on the start screen to toggle solo debug mode with one submarine for practice/testing. Only debug mode shows enemy pressure numbers.
- In solo debug mode, press `Space` on the next-stage `מתחילים בעוד X` screen to skip the countdown and start the round immediately.
- In solo debug mode, `הניסוי נגמר` uses the same full final-result screen treatment as the regular ending, including the scoreboard, Bezos SP side sprites, enemy-face strip, small background Jackson sprites that quickly appear and drift slowly behind the card in a DVD/no-HDMI-inspired path without rotating, stretching, or hard corner bounces, and reset button.
- Press `Command+D` on Mac or `Ctrl+D` on Windows during the game to open the password-protected result reset popup. Password `Chmir` clears only this Submarine game state and returns to the home screen.
- During active play, browser keyboard shortcuts such as zoom/reload/navigation are blocked as much as the browser allows, so frantic key presses do not shrink or interrupt the game.
- The active game screen is locked to the viewport. The HUD is height-contained, and the Canvas size is rechecked continuously and on viewport changes so browser zoom/resize or long HUD text cannot leave the game drawing only in part of the screen.
- The app keeps a small projector-safe margin around the full Submarine screen, including HUD, gameplay canvas, countdown overlays, reset modal, and final result screen. The canvas measures that actual safe area, so the projector margin protects the corners without changing the intended gameplay tuning.
- The browser console includes Submarine diagnostics for asset loading, enemy spawn/cleanup, pressure waves, slow frames, tint cache size, and periodic runtime enemy counts. These logs are meant to catch any late-round slowdown or disappearing-enemy issue during testing.
- The final result enemy-face strip is vertically centered with extra bottom clearance so the local face sprites do not get cropped.

## Controls

החן יוספים, ועוזריהם receive:

- `W` up.
- `A` left.
- `S` down.
- `D` right.

WASD uses physical keyboard positions, so it should also work when the keyboard language is Hebrew.

הבראזים receive:

- Arrow Up.
- Arrow Left.
- Arrow Down.
- Arrow Right.

The assignment does not alternate between rounds.

## Rules

- Two players share one underwater playfield.
- The game is now round-based.
- Each round ends as soon as one submarine is eliminated.
- The surviving team gets 1 point.
- The next round resets submarine positions, damage, and enemies.
- Controls stay fixed every round.
- The full game ends after 5 total eliminations.
- Refresh/reopen restore is supported with localStorage. Live action may restart the current round, but match score is preserved.
- Red and blue submarines start on opposite sides, slightly inward from the edges.
- The fallback player drawing uses a clearer submarine silhouette with portholes, periscope, mechanical tail, and propeller details.
- Bigger enemy fish/submarines spawn from outside the screen.
- Some enemies chase living players, and some drift across the screen without magnetizing to a player.
- Chasing/magnetized enemies flash their color. Random drifter enemies do not flash.
- Each round uses the same basic difficulty curve and starts with a slightly active but still manageable pressure level.
- Every stage has a softer first-15-seconds grace period: the active enemy cap is lower, pressure waves are slightly smaller, spawn timing is slower, enemy movement is a little slower, more enemies drift instead of hunting, and giant enemies are rarer. The curve returns to normal quickly after that window.
- After a short warmup, extra pressure waves arrive about every 5 seconds and add about 4 enemies at first, within a browser-safe active enemy cap.
- Long rounds now get late-pressure swarms: after roughly 45 seconds of post-warmup survival, each later pressure tier adds larger waves and a higher enemy cap so a 90-second run keeps getting visibly busier.
- Enemies now spread their targets across the living players instead of all piling onto the closest player.
- Giant red hunter enemies are balanced separately so their target counts across living players stay equal or differ by at most 1.
- Enemies use four consistent size tiers across the whole game: small green, medium yellow, large purple, and giant red.
- Enemy speed increases by tier: green is slowest, yellow is faster, purple is faster again, and red is fastest.
- Smaller enemies are more common; giant enemies appear later and are capped to only a few on screen.
- Enemy size tiers unlock gradually over time: early pressure starts mostly small, then medium, large, and finally giant enemies join.
- The current tuning applies an additional global 10% ease pass on top of the first ease pass: enemies arrive more gradually, move slower, cap/wave pressure is lower, the pressure ramp climbs a little more gently, and drifting enemies are more common than hunters.
- Stage 1 Magami sprites are drawn only a tiny bit larger visually, without changing their collision or tier rules.
- Each player has 3 lives.
- Damage is progressive: first hit shows light damage, second hit shows heavier damage, and third hit triggers a full break/explosion moment.
- On every round-ending elimination, the game plays the surviving selected character's fighter reveal sound instead of the normal elimination sound.
- After a hit, a short invulnerability window gives the player time to escape and displays a pulsing ring around the submarine.
- Hit feedback is visual only: the heart row above the damaged submarine blinks the heart that was just lost, then leaves it empty.
- The active-game HUD shows a survival timer at the top.
- Hiding/minimizing the browser freezes active gameplay, countdowns, round summaries, and elimination timers so the survival timer does not advance in the background.
- The HUD shows large 3-heart status for each player.
- For performance diagnostics, add `?debugLogs=1` to the URL. Normal party play keeps the heavier runtime logs off so hit/collision frames stay smooth.
- The canvas background includes low-opacity underwater atmosphere: light rays, distant moving fish, bubbles, bottom-anchored seaweed/coral, subtle octopus-like deep-sea drifters, and water particles. These are decorative only and should not compete with players/enemies.
- The default active canvas uses the old-arcade pixel visual style for the background, with smooth readable submarine bodies/hardware and smooth enemy face sprites. Enemy sprites are not pixelated because the tier-color tinting and hunter flashing are more important for gameplay readability. Hit HUD rendering is cached so collision feedback stays responsive. `?classic=1` or `/classic/` loads the older non-pixel visual mode. This is decorative only and does not change gameplay hitboxes, score, or persistence.
- Third hit freezes gameplay for about 5 seconds while the eliminated submarine breaks/explodes, then the round ends.
- Winner is the team with more points after 5 total eliminations.
- Tie is possible.
- Between rounds, the 5-second summary screen shows only one huge result line like `X אכל אותה` and the survival time in `MM:SS` format; the 8-second next-stage screen shows compact selected face portraits plus the upcoming stage name and countdown.
- Round-summary survival time is always numeric, for example `00:50`, `01:20`, or `02:20`.
- Game over shows a simple large result card: `המנצחים:`, the winning team, and a big left/right final score whose number order is left-to-right by visual placement: left number for `החן יוספים, ועוזריהם`, right number for `הבראזים`.
- The final result screen also decorates the result with fully visible mirrored `bezos_southpark.webp` sprites on both sides and a compact row of local enemy-face assets underneath. Magami uses trimmed display-only copies there so it matches the other face sizes and alternates between closed-mouth and open-mouth frames instead of mirroring. Two smaller Michael Hitler / Adolf Jackson sprites appear quickly above the result card and drift slowly in a DVD/no-HDMI-inspired path, almost reaching edges without rotating, stretching, hard-bouncing off corners, or blocking the score and reset button.
- Game over includes an `איפוס תוצאה` button that uses the same password popup.
- Enemy pressure is controlled by a simple local profile: warmup length, starting enemy cap, spawn pace, random enemy chance, wave size, cap growth, late-pressure growth, and maximum active enemy cap.
- Future rounds can get custom enemy assets later.

## Assets

Current visuals support local image replacement, with Canvas/CSS placeholders as fallback.

The manual image manifest lives in:

```text
games/submarine/game.js
```

Look for `ASSET_MANIFEST`.

Start-screen character portraits and fighter previews live in:

```text
games/submarine/assets/images/characters/
```

Each roster character uses a `*_face_card.webp` portrait for the square character card, the selected-character face inside the front of the in-game submarine, and the compact portraits on the next-stage countdown screen. Each roster character also uses a `*_fighter_preview.gif` animation for the bottom fighter preview and the active-game HUD fighter next to the score. If replacing those files while keeping filenames, bump the `style.css` / `game.js` cache-bust query strings in `index.html`.

Start-screen fighter reveal sounds live in:

```text
games/submarine/assets/sounds/fighter-reveals/
```

Each reveal sound is pre-edited as two short cut-off starts plus the full clip, for example `Ha-Ha-Hadouken`. Current assignment keeps the original local files but intentionally swaps sounds: מסר uses `gabo_reveal.mp3`, מגמי uses `pishuto_reveal.mp3`, פישוטו uses `meser_reveal.mp3`, מיקי uses `dor_reveal.mp3`, דור uses `miki_reveal.mp3`, and גבו uses `magami_reveal.mp3`. If replacing these files while keeping filenames, bump `SOUND_ASSET_VERSION` in `game.js`.

Optional image paths:

```text
games/submarine/assets/images/backgrounds/dor_army.jpeg
games/submarine/assets/images/backgrounds/underwater-background.webp
games/submarine/assets/images/players/dor_face.webp
games/submarine/assets/images/players/submarine-blue.png
games/submarine/assets/images/players/submarine-blue-damaged.png
games/submarine/assets/images/players/submarine-red.png
games/submarine/assets/images/players/submarine-red-damaged.png
games/submarine/assets/images/enemies/magami/magami1.png
games/submarine/assets/images/enemies/magami/magami2.png
games/submarine/assets/images/enemies/magami/magami_final.png
games/submarine/assets/images/enemies/magami/magami_final_open.png
games/submarine/assets/images/enemies/salty_antisemites/tucker.webp
games/submarine/assets/images/enemies/salty_antisemites/candace.webp
games/submarine/assets/images/enemies/moshik_and_galit/moshik_b.webp
games/submarine/assets/images/enemies/moshik_and_galit/galit_b.webp
games/submarine/assets/images/enemies/chmirozon_prime/amazon.png
games/submarine/assets/images/enemies/chmirozon_prime/bezos_real.webp
games/submarine/assets/images/enemies/chmirozon_prime/bezos_southpark.webp
games/submarine/assets/images/enemies/rare_adolf_jackson/adolf_jackson.webp
games/submarine/assets/images/enemies/the_revenge_of_the_exiled/maor.webp
games/submarine/assets/images/enemies/the_revenge_of_the_exiled/lior.webp
games/submarine/assets/images/enemies/the_revenge_of_the_exiled/mosko.webp
games/submarine/assets/images/enemies/the_revenge_of_the_exiled/tomer.webp
```

Only `dor_army.jpeg`, `dor_face.webp`, the character face-card portraits, the character fighter GIFs, the Magami enemy frames, the Tucker/Candace enemy faces, the Moshik/Galit enemy faces, the Stage 4 Exiled enemy assets, the rare Michael Hitler / Adolf Jackson enemy asset, and the final-stage Chmirozon Prime enemy assets are enabled by default right now. Missing optional player/background assets are not requested until they are added to `ASSET_MANIFEST`, so the game does not spam 404s or show broken image documents.
If an enabled file is missing or fails to load, the game keeps using the built-in Canvas/CSS fallback drawing.

During gameplay, the selected character face is drawn plainly inside the front of that team's submarine, and `dor_face.webp` is the local Dor face cutout drawn plainly inside the rear of both submarines. Do not draw circular or oval portrait frames around these in-submarine faces. Side-facing selected portraits use per-character mirroring so they face the submarine nose. Both ride with the submarine direction. The HUD uses the selected character's fighter GIF, while the next-stage countdown uses compact selected face portraits.

Stage 1 uses the two Magami PNG files as animation frames. The mouth alternates open/closed every half second. Stage 2 randomly uses `tucker.webp` or `candace.webp` per enemy, and all Stage 2 color tiers are scaled down by 35%; Tucker faces left in the source, so he stays unmirrored when moving left and mirrors when moving right. Stage 3 randomly uses `moshik_b.webp` or `galit_b.webp` per enemy; `moshik_b.webp` is stored mirrored so Moshik faces the correct direction during movement, and Galit uses inverted mirroring so she points with her movement. Stage 4, `The Revenge Of The Exiled`, randomly uses `maor.webp`, `lior.webp`, `mosko.webp`, and `tomer.webp` across the standard enemy tiers. `tomer.webp` is a brightened/high-contrast local copy; both Tomer and Lior use inverted mirroring compared with the original source-facing assumption so their faces point with their movement in-game. Maor and Mosko look forward, so normal mirroring is acceptable. In any stage, once any player reaches their last heart, exactly two rare Michael Hitler / Adolf Jackson `adolf_jackson.webp` giant red hunters enter 10 seconds later if the round is still active, with the arrival sound starting about 1.6 seconds before entry. They are dangerous for 6 seconds, then fade quickly without collision during fade, and appear only once per stage/round. Stage 5 uses custom Chmirozon Prime rules and is the final stage: `amazon.png` is always the smallest enemy, keeps its original logo colors, never hunts, never flashes, and does not mirror; `bezos_real.webp` appears as both medium yellow and large purple enemies; and `bezos_southpark.webp` starts appearing only after about 15 seconds as a giant red hunter with extra speed and inverted mirroring so he points with his movement. Cartoon Bezos uses a lower spawn chance, slower active-limit growth, and no more than two active hunters at once so the final stage stays dangerous without becoming a constant SP flood. Other enemies mirror left/right according to their movement direction.

Enemy faces are separate from enemy danger tiers. Moshik/Galit, Magami, and future enemy sets must all keep the same tier language: small enemies are green and slower, medium enemies are yellow, large enemies are purple, and giant enemies are red, fastest, largest, and rare.

Recommended formats:

- Transparent `PNG` or `WebP` for submarines and enemies.
- `WebP` or `JPG` for backgrounds.
- Keep files lightweight for party laptops.

## Sounds

Local generated sound effects live under:

```text
games/submarine/assets/sounds/
```

Current sounds:

- `start-music/arcade-01.mp3` through `start-music/arcade-04.mp3` play only during the opening/rules flow and stop before the stage countdown.
- `submarine-hit-clash.wav` plays when a submarine loses one heart.
- `submarine-eliminated.wav` is a fallback third-hit sound only if the surviving fighter reveal sound is unavailable.
- `round-start.mp3` plays at the exact moment the next-stage countdown ends and active gameplay starts.
- `stage-music/magami-song.mp3` plays as the faded-in background song for Stage 1 `המגמים`, starting from the stage countdown, continuing through elimination and round summary, and handing off only when the next-stage announcement appears.
- `stage-music/salty-antisemites-song.mp3` plays as the faded-in background song for Stage 2 `אנטישמים מלוחים`. The local file is pre-trimmed from source `00:28`, so runtime starts it from file `00:00` during the stage countdown, plays at 80% of the shared stage-music volume, continues through elimination and round summary, and hands off only when the next-stage announcement appears.
- `stage-music/la-familia-song.mp3` plays as the faded-in background song for Stage 3 `לה פאמיליה`. The local file is pre-trimmed from source `00:20`, so runtime starts it from file `00:00` during the stage countdown, continues through elimination and round summary, and hands off only when the next-stage announcement appears.
- `stage-music/exiled-revenge-song.mp3` plays as the faded-in background song for Stage 4 `The Revenge Of The Exiled` / `נקמת הגולים`. The local file is pre-trimmed from source `00:32`, so runtime starts it from file `00:00` during the stage countdown, continues through elimination and round summary, and hands off only when the next-stage announcement appears.
- `stage-music/chmirozon-prime-song.mp3` plays as the faded-in background song for final Stage 5 `חמירוזון פריים`, starting from `00:00` during the stage countdown and staying in the background through the final result screen.
- `game-over-fanfare.wav` plays when the match ends.
- `jackson-hee-hee.mp3` plays loudly twice about 1.6 seconds before each rare Michael Hitler / Adolf Jackson entry.
- `jackson-presence.mp3` loops while the rare Michael Hitler / Adolf Jackson hunters are on screen, then stops when their 6-second presence window ends or they disappear.

If replacing sound files while keeping the same filenames, bump `SOUND_ASSET_VERSION` in `game.js` so the browser does not keep cached audio.

## Manual Validation Checklist

1. Open `http://localhost:3002?init=1`.
2. Start screen appears with `משחק מספר 2`.
3. Title says `צוללות חמקמקות`.
4. Placeholder image area appears.
5. Team character cards can be selected with the mouse only.
6. Clicking `התחל` with missing required names does not advance and highlights missing fields.
7. After required names are entered, click `התחל`.
8. The first 8-second next-stage screen appears.
8. החן יוספים, ועוזריהם get `WASD`; הבראזים get arrows.
9. The score is centered between the two team names.
10. Red submarine starts on the left.
11. Blue submarine starts on the right.
12. Player sprites look like submarines, with clear windows/periscope/propeller details.
13. WASD controls the assigned submarine even when the keyboard language is Hebrew.
13. Arrow keys control the assigned submarine.
14. HUD clearly shows team names on the sides and the score centered, without visible `ROUND`, `פסילות X/5`, or enemy difficulty text.
15. Enemies spawn and chase players without all targeting one player at once.
16. Smaller fast enemies, larger slower enemies, and random drifting enemies appear.
17. First hit damages the submarine visually.
18. First hit shows a large lost-heart effect above the damaged submarine and a brief safe window/ring.
19. Each player starts with 3 hearts.
20. Second hit shows stronger damage than the first.
21. Third hit freezes gameplay for about 5 seconds and shows a break/explosion effect.
22. Round summary screen appears for 5 seconds with one huge result line and updates the total score; the next-stage screen then appears for 8 seconds.
23. Next round starts automatically after the round screen, with the same fixed controls.
24. HUD keeps the total eliminations internal and does not show `פסילות X/5`.
25. Assignment screen does not show enemy difficulty text.
26. Assignment / next-stage screen shows selected face portraits in larger square frames with visible breathing room, but does not show team cards, score cards, player names, or keyboard controls.
27. Game ends after 5 total eliminations.
28. Game over shows a large winner/tie result card.
29. Result card shows each team points without control labels.
30. Enemy pressure starts manageable, ramps gradually by adding about 4 enemies per pressure wave, and becomes a larger swarm if the round lasts around 90 seconds.
31. `Command+D` on Mac or `Ctrl+D` on Windows on the start screen toggles solo debug mode with one submarine.
31a. In solo debug mode, the `הניסוי נגמר` ending shows the full final-result treatment, including the scoreboard, Bezos SP side sprites, enemy-face strip, and reset button.
32. `Command+D` on Mac or `Ctrl+D` on Windows during gameplay opens the reset popup.
33. Wrong reset password does not reset.
34. Password `Chmir` resets only Submarine state and returns to the start screen.
35. Browser shortcut key combinations during active play do not zoom/shrink the page or navigate away when preventable.
36. Hiding/minimizing the browser freezes active gameplay and visible countdown/result timers; returning to the game resumes without timer jumps.
37. Canvas drawing fills the full visible game area after resize/zoom changes.
38. Enemy pressure details are visible only in debug mode.
39. Magnetized/chasing enemies flash their color.
40. Game over shows an `איפוס תוצאה` button.
41. Missing image assets fall back to Canvas/CSS placeholders.
42. `?init=1` resets only this game.
43. No internet required.
44. Stage 4 shows `שלב רביעי: The Revenge Of The Exiled`.
45. Stage 4 uses Maor, Lior, Mosko, and Tomer enemy faces.
46. Tomer is visibly brightened/high-contrast compared with the source image and points with his movement direction.
47. Lior points with his movement direction.
48. Stage 5 shows `השלב הסופי: חמירוזון פריים` with a scarier fire/blood title treatment.
49. Cartoon Bezos moves as a hunter and feels faster/more dangerous than the normal red enemy.
50. The Amazon logo does not mirror when it changes movement direction.
51. Stage 5 starts with floating Amazon logo enemies and real Bezos enemies only.
52. In Stage 5, the Amazon logo always stays in the smallest enemy tier, keeps its original logo colors, never hunts, and never flashes.
53. In Stage 5, real Bezos appears as both medium yellow and large purple enemies.
54. In Stage 5, cartoon Bezos starts appearing after about 15 seconds as a giant red enemy, keeps its extra speed, and stays capped to at most two active hunters with a lower spawn chance.
55. After any player reaches their last heart, wait 10 seconds; if the round is still active, exactly two Michael Hitler / Adolf Jackson giant red hunters enter, split targets when possible, stay dangerous for 6 seconds, fade without collision, and do not return again in that stage/round.

## Known Limitations

- Real image assets are optional and not included yet.
- Browser audio may stay silent until the first click/keyboard gesture allows playback.
- Keyboard ghosting should be tested on the party laptop.
- Enemy behavior is still intentionally simple, but spawn pace and targeting are tuned for early playtesting.
- Full mid-frame restoration of exact enemy positions is intentionally not implemented yet; refresh during live action restarts the current round safely while preserving the match score.
