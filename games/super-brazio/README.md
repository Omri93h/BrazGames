# Super Brazio

Working title: `SUPER BRAZIO`

This is Game 4 for Dor Bachelor Party Games.

Current status: playable repo-based split-screen prototype with two independent two-world finish flows.

## Run Locally

```bash
cd games/super-brazio
python3 -m http.server 3004
```

Open:

```text
http://localhost:3004
```

Developer/admin reset:

```text
http://localhost:3004?init=1
```

This clears only the Super Brazio game storage key:

```text
dor-bachelor-super-brazio-state-v1
```

Single-user debug mode:

```text
http://localhost:3004?debug=1
```

Debug mode opens a small level picker for one-player testing, then skips character selection and rules. It does not write the normal party localStorage state. To test the castle finale directly without the picker:

From the normal start screen, `Command+D` on Mac or `Ctrl+D` on Windows also enters the same debug picker. During gameplay and winner/reset flows, `Command+D` on Mac or `Ctrl+D` on Windows still opens the password-protected reset popup.

```text
http://localhost:3004?debug=1&level=brazio-2
```

In debug mode only, enemy deaths still flash Mario on/off, but then restore him near the last safe spot instead of returning to the level checkpoint. Pit deaths always return to the latest reached checkpoint flag, even in debug mode, so falling into lava/holes cannot respawn Mario inside or above the pit. If the remembered enemy-death safe spot is missing or too far behind, the vendor scans for the nearest clear floor around the failure position, so Castle Finale debug enemy deaths do not jump back to the stage start. Debug gameplay now renders the important diagnostics as crisp parent HTML above the Mario canvas, with Mario pixel/tile coordinates, camera tile range, nearby ICE_AGENT ids/tile positions, nearby checkpoint flag ids/tile positions, and body/under tile summaries. During any live game, press `Ctrl+I` / `Command+I` to toggle that diagnostics HUD without entering full debug mode. The canvas debug overlay labels ICE_AGENT enemies as `E#` and checkpoint flags as `F#` directly above the object.

ICE_AGENT prep:

```text
games/super-brazio/assets/images/enemies/ice-agents/
games/super-brazio/tools/prepare-ice-agents.sh
```

The provided ICE_AGENT source image has two rows and six frames per row. The generated runtime strips are normalized to smaller 24x24 transparent frames. `IceAgent.js` draws a crisp pixel `ICE` badge over the sprite at runtime so the label stays readable in the scaled game canvas:

```bash
TARGET_FRAME_SIZE=24x24 games/super-brazio/tools/prepare-ice-agents.sh /path/to/source.png 6
```

## Current Prototype

Implemented now:

- Shared party-style start screen.
- Opening-screen background image at `assets/images/backgrounds/dor-burger-king-start.webp`, rendered centered with `contain` plus a blurred full-screen `cover` layer behind it so the full photo stays visible without stretched sharp edges.
- After the first `התחל` click opens character select, the opening background is darkened like a modal backdrop so the fighter previews remain readable over the colorful Burger King photo.
- Game number: `משחק מספר 4`.
- Title: `SUPER BRAZIO`.
- Team placement:
  - הבראזים on the right.
  - החן יוספים, ועוזריהם on the left.
- Mouse-only character selection.
- Character cards use the shared local face assets from `assets/images/characters/`.
- Start button enabled only after both teams choose a character.
- The first start click plays the local `choose-your-fighter.mp3` announcer during the character-select reveal.
- The local arcade playlist from Memory plays only during the character-select opening flow and stops when `התחל משחק` advances into the pre-game modal.
- Selecting a character plays that character's local fighter reveal sound from `assets/sounds/fighter-reveals/`.
- After both teams choose characters and press `התחל משחק`, a 16-second pre-game modal appears with a circular loader before the vendor game countdown.
- The pre-game modal shows `מי יגיע ראשון לנסיכה!?`, a compact `מקשים:` reference, and the jump-height note that holding jump makes Mario jump higher.
- Bottom fighter/action/fighter grid with bounded local CSS fighter previews from `assets/images/characters/`.
- Two side-by-side platformer instances: one iframe per team.
- Active gameplay has no wrapper HUD, title strip, or race timer above the Mario frame.
- Each player screen shows only the selected player's name and compact fighter GIF beside that player's Mario frame; it does not show `WASD`, `חצים`, or other gameplay control labels.
- The screen embeds two same-origin instances of the local vendored copy of `meth-meth-method/super-mario`.
- No rounds.
- Both players start in the vendored Super Mario `1-1` level in their own split-screen instance.
- The playable character now uses the regular Mario sprite body again, with the local `assets/images/players/dor_mario_face.png` composited as a large face overlay. `drawOffset` keeps the enlarged face from clipping while preserving Mario's original hitbox, physics, sounds, and power-up behavior. The vendor canvas uses smoother browser scaling so Dor's face reads less pixelated.
- World `1-1` contains three checkpoint flags, and `brazio-2` contains two checkpoint flags. A flag starts red, turns green when Mario reaches it, and from then on enemy/pit deaths respawn Mario at the latest green flag in that world instead of the world start.
- החן יוספים, ועוזריהם use `A` / `D` to move and `W` to jump.
- הבראזים use left/right arrows to move and up arrow to jump.
- Hidden turbo/Shift input is disabled at both the shell and Mario-engine level; clicking the Mario iframe or triggering `mario.turbo(true)` cannot make Mario suddenly run faster.
- The parent shell routes WASD only into the החן יוספים iframe and arrow keys only into the הבראזים iframe.
- The original vendored Mario HUD is hidden during normal gameplay, so the top of the canvas no longer shows `MARIO`, score, coin count, `WORLD`, or `TIME`.
- Reaching the flag/pole at the end of `1-1` fades out, loads the longer Castle Finale world `brazio-2`, and fades back in.
- Losing a life by enemy contact or falling plays the local Mario-style `die.ogg` death sound.
- On small-Mario enemy contact, the game locks immediately, releases held input, turns the game canvas black-and-white, flashes Mario on/off for about 3 seconds, then respawns at the checkpoint and restores color.
- On pit death, the game locks immediately, releases held input, turns the game canvas black-and-white, then respawns quickly at the checkpoint and restores color.
- Respawn clears both the parent-shell held-key state and the vendored iframe keyboard state, then gives Mario about 3 seconds of enemy-contact grace so an ICE_AGENT sitting near a checkpoint cannot kill him in a loop. Mario visibly blinks/fades during this grace.
- The vendored keyboard state ignores late `keyup` events after an input reset, preventing the old case where releasing right after a world transition/death reset could leave Mario with a stale leftward `Go.dir`.
- Question blocks spawn a moving power mushroom, with the mushroom type defined explicitly per block in the level JSON.
- Question blocks must stay suspended with open air below them, not sitting on solid tiles, so Mario can hit them from underneath.
- Red question blocks spawn red power mushrooms.
- Collecting a red power mushroom plays the local Mario-style power-up sound and turns Mario into his larger sprite/collision state until the next respawn.
- Enemy contact while Mario is large plays a short local `power-down` hit sound and shrinks him back to small Mario with a short damage-grace window instead of costing a life.
- Enemy contact while Mario is small still locks the game, plays the death sound, turns the canvas black-and-white, flashes Mario on/off for about 3 seconds, and respawns at the checkpoint with color restored.
- Green question blocks are spread through `1-1` and `brazio-2`.
- Collecting a green mushroom plays the local Mario-style power-up sound and triggers a temporary three-band horizontal psychedelic wave effect with opposing wave motion and purple, bright green, and yellow color overlays instead of growing Mario. In split-screen play, that effect is broadcast to both players' screens.
- Collecting a yellow mushroom plays the local Mario-style power-up sound and gives that iframe's Mario a modest 10-second speed boost.
- Collecting a purple mushroom plays the local Mario-style power-up sound and gives that iframe's Mario 10 seconds of inverted left/right controls. The input layer remembers the actual direction activated by each keydown, so the effect expiring or a late keyup cannot leave Mario walking by himself.
- Moving mushrooms reverse direction when they collide with solid tiles, pipes, or blocks.
- The `brazio-2` question blocks are placed in open-air positions, with no solid tile directly underneath and no blocking tile where the mushroom emerges.
- Future mushroom expansion candidates after the current red/green/yellow/purple set are blue ice/low-gravity, black danger/blackout, white one-hit shield, and gold finale boost. Each new color should use the same explicit per-block JSON model and include a sound cue, visible cue, duration, safe cleanup, and debug-mode test path.
- Princess Daniel is no longer in `1-1`; she waits farther right at the end of the castle-themed `brazio-2`, after a clean empty runway beyond the final bridge. The finale now renders the local `assets/images/goals/daniel_face.png` as a large standalone Daniel face beside a larger, clearer code-native green `GREEN CARD` sign and small USA flag.
- Gameplay background music is owned by the parent shell, not by the two vendored Mario iframes. The iframes boot with `parentMusic=1`, which prevents doubled split-screen level music while keeping gameplay sound effects intact. The parent plays one shared overworld track during `1-1`; once either player reaches `brazio-2`, it switches everyone to one shared castle track, then fades the castle track out for about 2.75 seconds after 30 seconds before switching back to the original overworld / `1-1` Mario music.
- `brazio-2` uses the vendored castle tile sheet, dark castle background, multiple lava/wave gaps, raised platforms, pipe/bridge obstacles, extra ICE_AGENT enemies, and a final bridge so it reads as a distinct second/final world.
- World `1-1` now has a Michael Jackson super enemy near its final stretch, and `brazio-2` has one mid-stage Michael Jackson super enemy copied from the Submarine rare enemy asset. He moves faster than ICE_AGENTs, plays the Submarine `hee-hee` cue followed by at most 5 seconds of the longer presence sound when he first appears on screen, stops that music immediately if stomped, and reverses before floor edges when possible.
- The later half of `brazio-2` now includes an extra extended castle run with another lava/gap rhythm, raised breakable brick platforms, a bridge stretch, and additional ICE_AGENT enemies. Plain `metal-alt` blocks and tall pipes should not sit inside required jump arcs; the reported X91-X108 choke point is kept open, and the late lava-jump arc around X156-X172 is also kept clear of single floating blocker tiles.
- The `brazio-2` spawn checkpoint starts after the entrance stairs and high enough for both small and large Mario, so the transition from `1-1` cannot place Mario inside castle tiles.
- The finish trigger is placed slightly before Princess Daniel in `brazio-2`, after the clean final runway, so the player only needs to get close instead of passing through or touching her.
- Reaching the end pauses the vendored background music and plays the local Mario-style `level-clear.ogg` victory sound.
- The ending freezes the game but keeps the scene visible, showing only a high top banner that says `<player name> הגיע לגרין קארד!`, with floating hearts over the scene.
- Mario-style sprites/music/sounds come from the vendored repo.
- Refresh while still on the start screen clears temporary character selections, so no fighter previews appear before the user chooses again.
- Refresh during live play reloads the vendored Mario frame at the saved current world, waits for the iframe `ready` signal, and restarts from the pre-game countdown with selected characters preserved.
- Vendor boot uses a versioned path, cache-busted URLs, diagnostics, and a watchdog. If the iframe fails or stays on `LOADING 1-1...`, the shell replaces the iframe and tries again instead of showing a terminal error.
- Refresh after a win preserves the top winner banner.
- `Command+D` on Mac or `Ctrl+D` on Windows enters the hidden debug picker from the normal start screen; outside the start screen it opens the password-protected reset popup.
- Password `Chmir` clears only Super Brazio state.
- Single-user debug mode is available from the hidden start-screen `Command+D` on Mac or `Ctrl+D` on Windows shortcut, at `?debug=1` with a stage picker, and at `?debug=1&level=brazio-2` for direct castle testing.
- The diagnostics HUD renders its key text in the parent HTML layer, not inside the low-resolution Mario canvas, so screenshots show readable camera tiles, Mario position, body/under tiles, nearby ICE ids, and nearby checkpoint flag ids. The canvas also draws compact `E#` and `F#` labels above the relevant objects.
- In debug mode only, enemy deaths flash Mario at the failure spot but respawn near the last safe spot, or the nearest clear floor around the failure X, instead of the checkpoint. Pit deaths still respawn at the latest checkpoint flag.
- ICE_AGENT enemy sprites are generated from the provided two-row source image as smaller 24x24 strips, with a crisp runtime `ICE` badge for readability; `ice-agent-1` and `ice-agent-2` replace the previous Goomba/Koopa enemies in worlds `1-1` and `brazio-2`. Castle-finale ICE agents are placed with their feet on the floor line and away from pipe tops, pipes, and walls.
- Stomped ICE_AGENT enemies stop and flash on/off until they disappear, so their death state is visibly clear.
- A full pre-split backup exists at `backups/super-brazio/20260627-085348-before-split-screen-v2/`, with a tarball of `games/super-brazio/` and the branch pointer `codex/super-brazio-before-split-20260627-085348`.

Source / license note:

- Source repo: `https://github.com/meth-meth-method/super-mario`.
- Package license: ISC.
- Local copied source: `vendor/meth-super-mario/`.
- Browser/Mario engine notes: `../../docs/games/SUPER_BRAZIO_ENGINE_NOTES.md`.
- The runtime uses the vendored repo locally through two same-origin iframes in normal play, and one iframe in debug mode.
- Small local patches:
  - asset paths work from the nested vendor folder.
  - `autostart=1` starts the repo inside the party shell.
  - parent keyboard events are bridged into the iframe.
  - parent and vendor input state can be force-released after deaths, countdowns, reboots, and world transitions so stale held keys do not keep Mario walking.
  - reaching the end of `1-1` posts a level-change message after the pole transition.
  - parent-owned gameplay music uses one shared background track for both split-screen players; the vendor receives `parentMusic=1` so each iframe does not also play its own level music.
  - once any iframe reaches `brazio-2`, the parent switches the shared background music to the castle track for both players.
  - reaching the end of `brazio-2` posts a finish message to the party shell.
  - sprites render above background/decoration tiles so trees, bushes, pipes, and scenery do not hide Mario or enemies.

## Asset Folders

```text
assets/images/backgrounds/
assets/images/characters/
assets/images/players/
assets/images/enemies/
assets/images/items/
assets/images/goals/
assets/images/tiles/
assets/sounds/
```

Keep all assets local. Do not use external hosted assets at runtime.

## Replacement Notes

- Replace the opening background by adding a local image under `assets/images/backgrounds/`, updating `--start-bg-image` in `style.css`, and bumping the cache-busting query string. The sharp foreground uses `contain`; the rear filler layer uses the same image as blurred `cover`.
- Opening-screen face cards and fighter GIF previews live under `assets/images/characters/`; keep them transparent/contained and do not rely on intrinsic GIF dimensions for layout.
- Character-select reveal sounds live under `assets/sounds/fighter-reveals/`; they are local MP3 files and are triggered only on fighter selection.
- Character-select-only arcade background music lives under `assets/sounds/start-music/` and is copied locally from Memory so Super Brazio stays standalone.
- The Mario face overlay lives at `assets/images/players/dor_mario_face.png`; `Mario.js` draws the regular Mario sprite body first, then composites Dor's large face overlay and mirrors it during movement.
- Player, enemy, item, goal, and tile folders are prepared for future bitmap replacements.
- Princess Daniel's finale face, the green-card sign, and the USA flag are drawn as code-native goal elements in the vendored background layer. Her face uses the local `assets/images/goals/daniel_face.png` cutout as a large standalone face, with a code-native fallback face if the image is not loaded yet.
- Active gameplay assets currently come from `vendor/meth-super-mario/`.
- The local asset folders remain prepared for later Super Brazio-specific replacements.
- ICE_AGENT source processing creates transparent 24x24 walking PNG strips and GIF previews; the runtime enemies are now swapped to those generated ICE_AGENT sprites with an additional code-drawn `ICE` badge.

## Manual Validation Checklist

1. Open `http://localhost:3004`.
2. Start screen appears with `משחק מספר 4`.
3. Title says `SUPER BRAZIO`.
4. הבראזים are on the right.
5. החן יוספים, ועוזריהם are on the left.
6. Character selection works with the mouse.
7. Character cards show the shared local face portraits inside bounded square cards without overflow.
8. Start button is disabled until both teams select a character.
9. Clicking `התחל` reveals the title/team panels, plays the choose-your-fighter announcer during the reveal, then the button returns as `התחל משחק`.
9a. During that character-select reveal, the background is visibly half-darkened behind the title, team cards, and fighter previews.
10. Selecting a character shows exactly one bounded fighter preview for that team and plays that character's reveal sound.
11. Refreshing while still on the start screen returns to a clean start state with no selected cards and no fighter previews.
12. Clicking `התחל משחק` shows a 16-second pre-game modal with a circular loader.
13. The Super Brazio pre-game modal shows `מי יגיע ראשון לנסיכה!?`, `מקשים:`, `A` / `D` for walking and `W` for jump, arrow keycaps `←` / `→` for walking and `↑` for jump, plus the note that holding jump makes Mario jump higher.
14. After the pre-game modal, two side-by-side Mario games open.
15. There is no wrapper HUD, title strip, race timer above the Mario frame, or original Mario `MARIO/WORLD/TIME` dashboard drawn at the top of the canvas.
15a. Each player screen label shows only the selected player's name and fighter GIF, with no `WASD`, `חצים`, or other control text.
16. Both frames start on the vendored Super Mario `1-1` level.
17. `A` / `D` move החן יוספים, ועוזריהם.
18. `W` jumps החן יוספים, ועוזריהם.
19. Left/right arrows move הבראזים.
20. Up arrow jumps הבראזים.
21. WASD moves only the left/חן יוספים Mario, and arrow keys move only the right/בראזים Mario.
21a. The playable character shows the regular Mario body with Dor's large face overlay, and the face mirrors during movement.
22. Enemy/level behavior follows the vendored Super Mario implementation.
23. Trees, bushes, pipes, and scenery do not visually cover Mario or enemies.
24. Enemy contact while Mario is large plays the `power-down` hit sound and shrinks him to small Mario instead of killing him.
25. Enemy contact while Mario is small locks the game immediately, plays the death sound, turns the canvas black-and-white, flashes Mario on/off for about 3 seconds, and only then respawns with color restored.
26. Falling into a pit locks movement immediately, turns the canvas black-and-white, and respawns quickly with color restored without letting invisible Mario move to the finish.
27. Reach `1-1`'s three red checkpoint flags and `brazio-2`'s two red checkpoint flags and verify they turn green. After passing a green flag, die by ICE_AGENT contact or pit and verify Mario returns to that latest green flag, gets about 3 seconds of blinking enemy-contact grace, does not die in a checkpoint loop, and does not keep walking left from stale input even if movement keys were released during the death/reset.
28. Small-Mario enemy contact or falling into a pit plays the death sound.
29. Hitting a question block from below spawns a mushroom.
30. In `brazio-2`, every question block has open air below it and can be hit from underneath; none sit on top of solid tiles.
31. The spawned mushroom moves sideways and reverses direction when it hits solid level geometry.
32. Every question block has an explicit `mushroom` value in the level JSON, with no duplicate chance tiles at the same position.
33. Red mushrooms play the power-up consume sound and turn Mario into the large Mario sprite/collision state.
34. Green mushrooms play the power-up consume sound and trigger the stronger purple/green/yellow three-band wave canvas effect without growing Mario or stalling the screen.
35. Yellow mushrooms play the power-up consume sound and make that Mario a little faster for about 10 seconds, then return movement tuning to normal.
36. Purple mushrooms play the power-up consume sound and invert left/right controls for about 10 seconds, then return controls to normal without leaving Mario walking on his own.
36a. Respawning after death resets Mario back to the small state, clears active mushroom effects, clears the psychedelic effect, and places him on top of the spawn floor rather than inside it.
37. Princess Daniel is not visible in `1-1`; the first world ends at the flag/pole.
38. Sliding down the `1-1` pole fades the canvas out, loads `brazio-2`, and fades back in without showing `תקלה`, a stuck loading screen, or default leftward walking after releasing movement keys during the transition.
39. Mario starts `brazio-2` after the entrance stairs, on top of the spawn floor, and can move immediately after the fade-in whether he entered small or large.
40. `brazio-2` loads as a longer dark castle world. During split-screen play there is only one parent-owned gameplay music track at a time: one shared overworld track in `1-1`, then one shared castle track for both players once either player reaches `brazio-2`, followed by a short castle fade-out before the original overworld music. The level shows multiple lava/wave gaps, raised platforms, pipe/bridge obstacles, more ICE_AGENT enemies, an extended final castle run, and a final bridge.
41. In `brazio-2`, ordinary non-question blocks and tall pipes do not sit in the mandatory jump arcs around the bridge/pipe choke points, especially around the opened X91-X108 section and the late lava gap around X156-X172.
42. Michael Jackson super enemies appear near the final stretch of `1-1` and mid-stage in `brazio-2`, move faster than ICE_AGENTs, play `jackson-hee-hee.mp3` before no more than 5 seconds of `jackson-presence.mp3`, stop that music if stomped, and turn around at floor edges instead of dropping into the next pit.
43. Princess Daniel is visible farther right near the end of `brazio-2`, after a clean empty runway instead of inside the final obstacle/bridge cluster; she appears as Daniel's large standalone face and has a clearer green `GREEN CARD` sign plus USA flag beside her.
44. First player to reach the end of that final runway in `brazio-2` wins immediately, before needing to pass or touch Princess Daniel.
45. Vendored music/sounds play after browser audio is unlocked by the start click; blocked background-music autoplay after refresh is caught so it cannot break gameplay.
46. Reaching the finale end pauses the background music and plays the level-clear victory sound.
47. The winner state shows a high top banner with `<player name> הגיע לגרין קארד!`, keeps the game visible behind it, does not darken the background, and floating hearts appear over the scene.
48. Refresh during live play reloads the Mario frame at the saved current world, waits for vendor readiness, shows a safe countdown, and then resumes visible gameplay with selections preserved.
49. If the first vendor boot fails or times out, the shell hard-reboots the iframe and still reaches gameplay without showing `תקלה`.
50. Refresh after win preserves the top winner banner without hiding the game scene.
51. The normal start screen does not show any visible debug hint or debug button.
52. Pressing the hidden `Command+D` on Mac or `Ctrl+D` on Windows shortcut on the normal start screen opens the debug-only stage picker.
53. Choosing a debug stage boots the iframe with vendor `debug=1` and does not show character selection or rules.
54. `Command+D` on Mac or `Ctrl+D` on Windows outside the normal start screen opens the reset popup.
55. Wrong password does not reset.
56. Password `Chmir` resets only Super Brazio state.
57. `?init=1` clears only Super Brazio state.
58. Memory, Submarine, and Dino localStorage keys are untouched.
59. No internet required at runtime.
60. Browser console has no errors, except intentionally injected failure tests.
61. `?debug=1` shows a debug-only stage picker with stage 1 and stage 2 options.
62. `?debug=1&level=brazio-2` boots one player directly into the castle finale and shows the crisp diagnostics overlay with Mario tile coordinates, camera range, nearby ICE ids, nearby checkpoint flag ids, and body/under tile summaries. Verify that visible ICE_AGENT enemies have `E#` labels above them and visible checkpoint flags have `F#` labels above them.
63. During any live game, `Ctrl+I` / `Command+I` toggles the diagnostics HUD on/off.
64. Debug mode does not overwrite the normal party saved state.
65. In debug mode only, enemy death flashes Mario at the failure spot but returns him near the last safe spot instead of the level checkpoint; pit death returns to the latest checkpoint flag.
66. World `1-1` enemies render as smaller walking ICE_AGENT sprites with a readable `ICE` badge, keep walking/patrol behavior, hurt Mario on side contact, and can be stomped.
67. Stomped ICE_AGENT enemies visibly flash on/off until they disappear.
68. World `brazio-2` enemies render as smaller walking ICE_AGENT sprites with a readable `ICE` badge and stand on top of the castle floor instead of sinking into tiles, pipe tops, pipes, or walls.
