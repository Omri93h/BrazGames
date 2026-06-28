# Fishy / Submarine Survival Plan

Status: Game 2 in progress.

Working title: צוללות חמקמקות

## Concept

A local two-player underwater survival game inspired by simple fish-dodging arcade games. The final visual theme is submarines:

- הבראזים control a blue submarine.
- החן יוספים, ועוזריהם control a red submarine.
- Enemy fish/submarines enter the water and chase the players.
- The goal is to survive longer than the other team.

The user referenced Fish Dodges by North Cactus as a strong gameplay inspiration. That game is cursor-controlled and made with Godot; no official source repo was found during the initial search, so this project should build a simple local version from scratch.

## Player Count

- Two players are mandatory.
- Both play on one shared screen.

## Start Screen

Use the same shared party style as Memory:

- Kicker: `משחק מספר 2`.
- Large animated title: `צוללות חמקמקות`.
- Same team cards and placement:
  - הבראזים on the right.
  - החן יוספים, ועוזריהם on the left.
- Fighting-game style character select:
  - הבראזים on the right.
  - החן יוספים, ועוזריהם on the left.
  - The game title appears in the center.
  - Each team has four square character cards.
  - Selected cards reveal the matching bottom fighter preview in a fixed-height fighter stage; fighter GIF intrinsic size must not control layout.
- Shared character roster:
  - הבראזים: פישוטו, מיקי, דור, גבו.
  - החן יוספים, ועוזריהם: מסר, מגמי, עומרי, פלטו.
- Characters can be selected with the mouse only.
- Selected cards use a blinking team-color stroke.
- Character selection is required before gameplay can begin. In solo debug mode, only the active single-submarine team must select a character.
- One primary `התחל` button.
- After character selection, show a 16-second rules modal with a circular loader, short controls/objective text, and no numeric countdown. Label controls as `מקשים:` and show `WASD` plus a full `↑ ← ↓ →` arrow-key cluster as visual keycaps. End with `מי יצליח לקחת את דור לחוף המבטחים מתקופת הצבא האכזרית?`.
- The Memory arcade playlist may play during the opening/rules flow only. It must stop before the first stage countdown because stage-specific music starts there.

## Controls

Controls are fixed for this game and future team keyboard games:

- החן יוספים, ועוזריהם always get `WASD`.
- הבראזים always get arrow keys.
- Use physical key codes for `WASD` so controls still work when the keyboard language is Hebrew.

Before gameplay starts, show an 8-second next-stage screen:

- Show the stage label and theme name above the countdown. Stage 1 is `שלב ראשון: המגמים`; Stage 2 is `שלב שני: אנטישמים מלוחים`; Stage 3 is `שלב שלישי: לה פאמיליה`; Stage 4 is `שלב רביעי: The Revenge Of The Exiled`; Stage 5 is `השלב הסופי: חמירוזון פריים` with a scarier fire/blood title treatment.
- Show selected face portraits on the next-stage screen in large square frames. Portrait images should render substantially smaller than the frame, with generous visible breathing room on all sides, with no cropped ears, chins, hair, beards, or side-facing faces, and the screen must not show teams, selected player names, score, or control schemes. Portrait direction should match the start-screen cards; הבראזים portraits face left/inward.
- Show team names on the sides and the score centered so long team names do not shift the score.
- Do not show visible `ROUND` numbers or `פסילות X/5` counters in the HUD/round screen.
- Show 3 hearts per team.
- Do not show enemy difficulty/profile text to players.
- Count down from 8, then start.
- If a stage has a local background song, start it when this next-stage countdown appears. Stage songs should play as prominent background music at about 75% volume, fade in at the start, and default to `00:00` unless a stage-specific start offset is requested.

## Gameplay Layout

- One shared underwater playfield.
- Red submarine starts on the left side, slightly inward from the edge.
- Blue submarine starts on the right side, slightly inward from the edge.
- During gameplay, the selected character face is drawn plainly inside the front of that team's submarine, with no circular/oval portrait frame around it, with per-character mirroring so side-facing portraits look toward the submarine nose, and Dor's sunglasses face rides plainly inside the rear.
- HUD shows team names on the sides, selected-character fighter sprites next to the centered score with both fighters facing each other, a prominent centered score, a small timer, and 3-heart status. HUD fighter image slots must start hidden and remain hidden if no valid fighter image is loaded, especially behind next-stage/countdown overlays.

## Rules

- Bigger enemies enter from outside the screen.
- Some enemies chase living players, while some drift randomly without magnetizing to a player.
- Chasing/magnetized enemies should flash their color so players can distinguish them from random drifters.
- Each round should use the same basic difficulty curve and start with a slightly active but still manageable pressure level.
- After a short warmup, extra pressure waves should arrive about every 5 seconds and add about 4 enemies at first, within a browser-safe active enemy cap.
- All stages use an additional global 10% player-friendly ease pass on top of the first ease pass: caps and wave sizes are lower, spawn intervals are longer, enemy speed is lower, the pressure ramp climbs a little more gently, and drifters are more likely than hunters.
- The first 15 seconds of every stage should stay slightly easier than the normal curve: lower enemy cap, smaller pressure waves, a slower spawn interval, slower enemy movement, fewer hunters, and fewer giant enemies. After that, pressure should ease quickly into the normal curve.
- If a round lasts a long time, late pressure begins after roughly 45 seconds of post-warmup survival: each later pressure tier increases wave size and enemy cap so a 90-second run visibly turns into a real swarm instead of staying flat.
- Enemy targeting should be distributed between the two players so one player is not immediately swarmed by every enemy.
- Enemy behavior uses four consistent size tiers across all rounds:
  small green, medium yellow, large purple, and giant red.
- Giant red hunter enemies are balanced separately so the number chasing each living player is equal or differs by at most 1.
- Once any player reaches their last heart, a 10-second danger timer starts. If the round is still active after those 10 seconds, exactly two rare Michael Hitler / Adolf Jackson giant red hunters enter, each targeting a different living player when possible. The loud arrival call plays about 1.6 seconds before they appear. They stay dangerous for 6 seconds, then fade quickly; once fade starts they cannot eliminate players. They appear only once per stage/round and do not return after disappearing.
- Enemy faces are stage-specific only; Magami, Moshik/Galit, and future enemy assets must inherit the same size tier colors, speeds, and rarity rules.
- Enemy speed increases by color tier: green is slowest, yellow is faster, purple is faster again, and red is fastest.
- Smaller enemies are more common. Giant enemies appear later, stay rare, and should only be about 1-3 on screen.
- Enemy tiers unlock gradually during the round: small enemies first, then medium, then large, then giant; if a round keeps going, more small enemies can keep joining.
- Enemy pressure is controlled through a local profile: warmup length, starting enemy cap, spawn pace, random enemy chance, hunter/heavy enemy mix, wave size, cap growth, and maximum active enemy cap.
- Future custom assets may be mapped per round.
- Each player has 3 lives.
- Submarine collision should match the visual body closely, including a small tail/body hit area, so obvious contact with enemies registers without making the whole submarine feel oversized.
- First hit: player remains alive and submarine shows light damage/breaking.
- Second hit: submarine shows heavier damage/breaking.
- Hit feedback should be visual only: large hearts in the HUD and a lost-heart effect above the submarine. Do not show text like `נפגענו` or `עוד פגיעה אחת`.
- On hit, the heart row above the damaged submarine should blink the newly lost heart, then show it empty.
- Third hit: gameplay freezes for about 5 seconds while the eliminated submarine breaks/explodes, then the round ends.
- The surviving team receives 1 point.
- On every third-hit round-ending elimination, play the surviving selected character's fighter reveal sound instead of the standard elimination sound.
- The next round resets submarine positions, damage, and enemies.
- Between rounds, show two separate screens: first a 5-second summary screen with only one huge result line like `X אכל אותה` and the survival time in `MM:SS` format, then an 8-second next-stage screen with compact selected face portraits plus the upcoming stage name and countdown.
- The full game ends after 5 total eliminations.
- The game persists match progress locally with localStorage. Refreshing or reopening should restore the match context automatically.
- If refresh happens during live gameplay, it is acceptable to restart the current round from the pre-round screen, but score, round number, selected player names, debug mode, and accumulated match time must be preserved.
- If refresh happens on the start screen, return to a clean opening state with no selected cards and no fighter previews.
- HUD should show score, while keeping round number, total eliminations, and enemy difficulty internal outside debug mode.
- HUD should show a survival timer at the top during active gameplay.
- If the browser tab/window is hidden or minimized, active Submarine gameplay, countdowns, round summaries, and elimination freeze timers should pause and resume without advancing the survival timer in the background.
- `Command+D` on Mac or `Ctrl+D` on Windows on the start screen should toggle a solo debug mode with one submarine for practice/testing. Only debug mode should show enemy pressure numbers.
- `Command+D` on Mac or `Ctrl+D` on Windows during the game should open the password-protected reset popup. Password `Chmir` clears only Submarine state and returns to the home screen.
- During active play, browser shortcut combinations should be blocked where possible so frantic key presses do not trigger browser zoom/reload/navigation and shrink or interrupt the game.
- Canvas sizing should be guarded by continuous/viewport-aware resize checks, and the active HUD should be height-contained, so browser zoom/resize or long HUD text cannot leave the game rendering only in part of the playfield.
- The full Submarine app should keep a small projector-safe margin around the edges. Apply it outside the HUD/canvas/overlays and make the canvas measure its actual rendered area, so the margin protects against projector overscan without changing internal gameplay rules.
- Underwater background decoration should stay clearly non-gameplay: low-opacity moving fish, very faint deep-sea drifters, bubbles, particles, and bottom-anchored seaweed/coral that starts at the actual bottom edge of the canvas.
- The default active canvas uses the old-arcade pixel visual style: pixel water bands, blocky distant fish/drifters, square bubbles/particles, smooth readable submarine bodies/hardware, and smooth enemy face sprites. Enemy sprites should not be pixelated when that weakens the green/yellow/purple/red tier colors or hunter flashing. `?classic=1` or `/classic/` loads the older non-pixel visual mode. The visual style must stay decorative only and must not change hitboxes, enemy behavior, score, persistence, or stage flow.
- During performance testing, add `?debugLogs=1` so the browser console logs asset loading, enemy spawn/cleanup, pressure waves, slow frames, tint cache size, and periodic runtime enemy counts. Keep these logs off by default during normal play so collision frames stay smooth.
- Game over should be simple: `המנצחים:`, the winning team, and a big left/right final score without `נקודות` or survival-time text. The score number order must be left-to-right by visual placement: left number for `החן יוספים, ועוזריהם`, right number for `הבראזים`.
- The final result screen decorates the result with fully visible mirrored `bezos_southpark.webp` sprites on both sides, flipping every half second, plus a compact row of local enemy-face assets underneath with staggered mirroring for non-Magami faces. The enemy-face strip should stay vertically centered with bottom clearance and must not crop the chins/heads. Magami uses trimmed display-only copies, `magami_final.png` and `magami_final_open.png`, so it alternates between closed-mouth and open-mouth frames instead of mirroring. Two small Michael Hitler / Adolf Jackson sprites appear quickly above the result card and drift slowly in a DVD/no-HDMI-inspired path, almost reaching edges without rotating, stretching, hard-bouncing off corners, or blocking score text and controls.
- Game over should include an `איפוס תוצאה` button using the same password-protected reset popup.
- Exact mid-frame restoration of active enemies is not required yet; safe current-round restart is preferred over restoring a broken live scene.

## Assets

The game supports local image replacement through a manual `ASSET_MANIFEST` in `games/submarine/game.js`.

Expected local image paths:

- `games/submarine/assets/images/backgrounds/dor_army.jpeg`
- `games/submarine/assets/images/backgrounds/underwater-background.webp`
- `games/submarine/assets/images/players/dor_face.webp`
- `games/submarine/assets/images/players/submarine-blue.png`
- `games/submarine/assets/images/players/submarine-blue-damaged.png`
- `games/submarine/assets/images/players/submarine-red.png`
- `games/submarine/assets/images/players/submarine-red-damaged.png`
- `games/submarine/assets/images/enemies/magami/magami1.png`
- `games/submarine/assets/images/enemies/magami/magami2.png`
- `games/submarine/assets/images/enemies/magami/magami_final.png`
- `games/submarine/assets/images/enemies/magami/magami_final_open.png`
- `games/submarine/assets/images/enemies/salty_antisemites/tucker.webp`
- `games/submarine/assets/images/enemies/salty_antisemites/candace.webp`
- `games/submarine/assets/images/enemies/moshik_and_galit/moshik_b.webp`
- `games/submarine/assets/images/enemies/moshik_and_galit/galit_b.webp`
- `games/submarine/assets/images/enemies/chmirozon_prime/amazon.png`
- `games/submarine/assets/images/enemies/chmirozon_prime/bezos_real.webp`
- `games/submarine/assets/images/enemies/chmirozon_prime/bezos_southpark.webp`
- `games/submarine/assets/images/enemies/rare_adolf_jackson/adolf_jackson.webp`
- `games/submarine/assets/images/enemies/the_revenge_of_the_exiled/maor.webp`
- `games/submarine/assets/images/enemies/the_revenge_of_the_exiled/lior.webp`
- `games/submarine/assets/images/enemies/the_revenge_of_the_exiled/mosko.webp`
- `games/submarine/assets/images/enemies/the_revenge_of_the_exiled/tomer.webp`

If an asset is missing, the game falls back to the built-in Canvas/CSS placeholder. Prefer transparent PNG/WebP for sprites and WebP/JPG for backgrounds.

Stage 1 uses the two Magami PNGs as a mouth-open/mouth-closed animation, swapping frames every half second. Magami sprites are drawn just a tiny bit larger visually while keeping the same tier/collision rules. Stage 2 randomly uses the local Tucker/Candace WebP faces, and all Stage 2 color tiers are scaled down by 35%; Tucker faces left in the source, so he stays unmirrored when moving left and mirrors when moving right. Stage 3 randomly uses the local Moshik/Galit WebP faces; Moshik is stored mirrored in `moshik_b.webp` so he faces the correct direction during movement, and Galit uses inverted mirroring so she points with her movement. Stage 4, `The Revenge Of The Exiled`, randomly uses Maor, Lior, Mosko, and Tomer faces across the standard enemy tiers. Tomer is stored as a brightened/high-contrast local copy, and both Tomer and Lior use inverted mirroring compared with the original source-facing assumption so their faces point with their movement in-game. Maor and Mosko are front-facing enough for normal mirroring. The rare Michael Hitler / Adolf Jackson asset is stage-independent: once any player reaches their last heart, two giant red hunters enter 10 seconds later if the round is still active, with the arrival sound starting shortly before entry. They are dangerous for 6 seconds, fade quickly without collision during fade, and appear only once per stage/round. Stage 5 has custom Chmirozon Prime rules and is the final stage: the local Amazon logo is always the smallest enemy, keeps its original logo colors, never hunts, never flashes, and does not mirror; real Bezos appears as both medium yellow and large purple enemies; and cartoon Bezos starts appearing only after about 15 seconds as a giant red hunter with extra speed and inverted mirroring so he points with his movement. Cartoon Bezos should be dangerous but not spammy: it has a reduced spawn chance, slower active-limit growth, and no more than two active hunters at once. Other enemies mirror left/right according to their movement direction.

The selected character's `*_face_card.webp` portrait is drawn inside the front of that team's submarine. `dor_face.webp` is the local Dor face cutout drawn inside the rear of both submarines, so the gameplay reads as the selected player taking Dor toward safety.

## Sounds

Current local sound effects live in `games/submarine/assets/sounds/`:

- `start-music/arcade-01.mp3` through `start-music/arcade-04.mp3` for the opening/rules-only arcade playlist copied from Memory.
- `submarine-hit-clash.wav` for losing one heart.
- `submarine-eliminated.wav` as a fallback third-hit / elimination sound only if the surviving fighter reveal sound is unavailable.
- `round-start.mp3` for the exact moment the next-stage countdown ends and the round starts.
- `stage-music/magami-song.mp3` for the Stage 1 `המגמים` background song. It starts at the stage countdown, fades in, loops quietly, continues through elimination and round summary, and hands off only when the next-stage announcement appears.
- `stage-music/salty-antisemites-song.mp3` for the Stage 2 `אנטישמים מלוחים` background song. The local file is pre-trimmed from source 00:28, then starts at file 00:00 during the stage countdown, fades in, loops quietly at 80% of the shared stage-music volume, continues through elimination and round summary, and hands off only when the next-stage announcement appears.
- `stage-music/la-familia-song.mp3` for the Stage 3 `לה פאמיליה` background song. The local file is pre-trimmed from source 00:20, then starts at file 00:00 during the stage countdown, fades in, loops quietly, continues through elimination and round summary, and hands off only when the next-stage announcement appears.
- `stage-music/exiled-revenge-song.mp3` for the Stage 4 `The Revenge Of The Exiled` / `נקמת הגולים` background song. The local file is pre-trimmed from source 00:32, then starts at file 00:00 during the stage countdown, fades in, loops quietly, continues through elimination and round summary, and hands off only when the next-stage announcement appears.
- `stage-music/chmirozon-prime-song.mp3` for the final Stage 5 `חמירוזון פריים` background song. It starts at 00:00 during the stage countdown, fades in, loops quietly, and stays in the background through the final result screen.
- `game-over-fanfare.wav` for the final match result.
- `jackson-hee-hee.mp3` for the rare Michael Hitler / Adolf Jackson arrival, played loudly twice.
- `jackson-presence.mp3` for the rare Michael Hitler / Adolf Jackson presence loop while the hunters are on screen.

Future replacement sounds should stay local and lightweight. If filenames stay the same, bump `SOUND_ASSET_VERSION` in `game.js` so the browser reloads the updated local audio.

## Technical Direction

- Plain HTML/CSS/JS.
- No npm, Vite, backend, accounts, or external hosted assets.
- Use Canvas for gameplay movement and collision.
- Use DOM for start screen, countdown, HUD, and overlays.
- Run locally at `http://localhost:3002`.

## Known Risks

- Keyboard ghosting may affect simultaneous two-player movement on the party laptop.
- Enemy chasing must stay readable and not too chaotic as spawn rates increase.
- Damage state must be visually obvious on a projector.
- The game should remain simple enough to trust during the party.
