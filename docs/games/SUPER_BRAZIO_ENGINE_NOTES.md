# Super Brazio Browser/Mario Engine Notes

Status: working reference for future Super Brazio fixes.

Purpose: keep future changes grounded in how the browser, the Dor party shell, and the vendored Mario engine actually behave. Any Super Brazio gameplay bug should be debugged against this file before editing.

## Sources Used For This Pass

Local project/source files:

- `README.md`
- `current_focus.md`
- `docs/games/SUPER_BRAZIO_PLAN.md`
- `games/super-brazio/README.md`
- `games/super-brazio/game.js`
- `games/super-brazio/vendor/meth-super-mario/js/main.js`
- `games/super-brazio/vendor/meth-super-mario/js/Timer.js`
- `games/super-brazio/vendor/meth-super-mario/js/Level.js`
- `games/super-brazio/vendor/meth-super-mario/js/Entity.js`
- `games/super-brazio/vendor/meth-super-mario/js/EntityCollider.js`
- `games/super-brazio/vendor/meth-super-mario/js/TileCollider.js`
- `games/super-brazio/vendor/meth-super-mario/js/entities/Mario.js`
- `games/super-brazio/vendor/meth-super-mario/js/entities/Goomba.js`
- `games/super-brazio/vendor/meth-super-mario/js/traits/*`
- `games/super-brazio/vendor/meth-super-mario/js/tiles/*`

Browser references:

- MDN `requestAnimationFrame`: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
- MDN autoplay guide: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
- MDN `HTMLMediaElement.play()`: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
- MDN `postMessage`: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
- MDN iframe `contentWindow`: https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow
- MDN Canvas `imageSmoothingEnabled`: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled
- MDN Page Visibility API: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
- MDN `KeyboardEvent.code`: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
- MDN `localStorage`: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

## Current Architecture

Super Brazio is two systems:

1. Party shell: `games/super-brazio/game.js`
   - owns the start screen, character select, reset modal, localStorage state, parent countdown, top winner banner, victory/death audio hooks, and keyboard remapping.
2. Vendored Mario iframes: `games/super-brazio/vendor/meth-super-mario/`
   - owns the canvas, game loop, level loading, physics, tile collision, entity collision, camera, music, Mario state, enemies, mushrooms, effects, and finish/death messages.

Normal party play runs two same-origin iframes under `localhost:3004`, one per team. Debug mode still runs one iframe for focused testing. Each iframe should be treated as a separate runtime. The shell must communicate with it only through the current message bridge unless there is a strong reason to change that.

The parent shell owns the small player HUD above each Mario frame. During active split-screen gameplay it should show only the selected player name and compact fighter GIF, matching the Dino gameplay treatment. It must not show `WASD`, `חצים`, or other control-label text on the player screens.

## Browser Game Rules

- Use `requestAnimationFrame` for render/update scheduling. The vendored `Timer` already uses a fixed timestep of `1 / 60` with an accumulator, which is the right pattern for stable platformer physics.
- Expect `requestAnimationFrame` to pause or slow in background tabs/hidden frames. If timing matters across tab visibility, use explicit pause/resume behavior instead of assuming the loop kept running.
- Media playback can be blocked until a real user gesture. Every `audio.play()` call must either happen after an accepted interaction or catch its returned Promise rejection.
- `postMessage` must include a clear `source` field and message `type`. Never react to generic iframe messages.
- `KeyboardEvent.code` is the right shape for this party game because it maps physical keys like `KeyA`, `KeyD`, `ArrowLeft`, independent of Hebrew/English keyboard text.
- The vendored `KeyboardState` must ignore `keyup` for keys that are not currently pressed. This guards against a reset/transition sequence where the iframe has already released and cleared a movement key, then the browser's real late `keyup` arrives and would otherwise run the release callback a second time. For right movement that second release subtracts from `Go.dir`, causing the recurring symptom where Mario walks left by default after entering `brazio-2` or after a death reset.
- `localStorage` can throw or disappear in some privacy modes. Super Brazio already wraps saves in `try/catch`; keep it that way.
- Pixel-art scaling should keep `imageSmoothingEnabled = false` when drawing scaled sprites or screen effects.

## Mario Feel Contract

Do not treat Mario as a generic rectangle. Preserve these behaviors:

- Movement has acceleration, deceleration, drag, and heading, not instant velocity flips.
- Jumping has a short request/grace window and variable cancel behavior.
- Gravity and tile collision are applied every fixed update; do not move Mario with DOM/CSS transforms.
- Falling state comes from the jump trait and vertical velocity/ground contact.
- Stomping enemies is only valid when Mario is descending relative to the enemy.
- Side contact with a dangerous enemy plays `power-down`, shrinks large Mario to small Mario with brief damage grace, and does not cost a life; side contact while small kills Mario immediately.
- Enemy death must lock input, clear movement, keep the scene visible, turn the canvas black-and-white, play damage sound, flash Mario on/off for about 3 seconds, then respawn and restore color.
- Pit death must lock input, clear movement, turn the canvas black-and-white, play damage sound, then respawn quickly and restore color without allowing invisible movement toward the finish.
- Power-up growth must preserve Mario's bottom position so he does not sink into or float above the floor.
- Respawn resets to small Mario before placement, snaps him to the spawn floor, clears psychedelic effect and the black-and-white damage filter, revives Killable, releases held input in both the parent shell and vendored `KeyboardState`, and gives about 3 seconds of enemy-contact grace so a checkpoint-near ICE_AGENT cannot create an immediate death loop.
- World `1-1` has three visible checkpoint flags and `brazio-2` has two visible checkpoint flags loaded from `checkpointFlags` in the level JSON. Flags are small floor markers: only the bottom/base should touch a floor tile, and the pole/flag should not overlap or visually touch upper blocks. Flags are red until Mario reaches/passes them, then turn green and update `level.currentCheckpoint`; normal enemy/pit deaths respawn at the latest green flag instead of the original world spawn. The original `checkpoints[0]` entry remains the fallback before any flag is reached. Debug enemy deaths still use the last safe nearby spot for fast testing, but debug pit deaths must return to the latest checkpoint flag so Mario never respawns in or above a pit.
- Finish must be ignored while dead, falling below the pit threshold, respawn-locked, or already reported.
- World `1-1` is no longer a finish world. It ends at the pole, emits a pole-travel-complete event, fades out, loads `brazio-2`, fades back in, and preserves Mario's current big/small state.
- The `brazio-2` checkpoint must stay out of the entrance-stair collision tiles and high enough for large Mario; `[112, 176]` places large Mario's feet on the floor and lets small Mario snap down safely.
- Only the configured final world, currently `brazio-2`, can emit the `finish` message to the party shell.

## Vendored Engine Map

- `Timer.js`: fixed timestep loop.
- `main.js`: boot, level load, parent messages, finish/death handling, respawn lock.
- `KeyboardState.js`: tracks physical forwarded key state. It must not call a mapping callback for a `keyup` unless that key was previously pressed, because world transitions/death resets intentionally clear key state before the physical release may arrive.
- `Level.js`: update order, camera focus, entity/tile collision pipeline.
- `Entity.js`: traits, sounds, bounds, event buffers.
- `TileCollider.js`: horizontal and vertical tile obstruction.
- `EntityCollider.js`: entity-to-entity overlaps.
- `traits/Go.js`: acceleration/deceleration/drag/heading.
- `traits/Jump.js`: jump buffer, grace period, jump duration, cancel on ceiling.
- `traits/Physics.js`: position integration and tile collision.
- `traits/Solid.js`: resolves obstruction by side.
- `traits/Stomper.js`: stomp bounce and score event.
- `traits/Killable.js`: dead/revive/remove-after lifecycle.
- `traits/Player.js`: score, lives, red mushroom power-up state and large bounds.
- `entities/Mario.js`: draws the regular Mario sprite body, then composites the local `assets/images/players/dor_mario_face.png` as a large face overlay. The entity uses `drawOffset` support in `layers/sprites.js` so the enlarged face can extend above the normal sprite without clipping while Mario's hitbox, physics, sounds, and traits remain unchanged. The vendor canvas uses `image-rendering: auto` to make the photographic face less pixelated after scaling.
- `tiles/chance.js`: question block mushroom spawn and mushroom behavior.
- Question blocks should not sit directly on solid tiles. Keep at least one empty tile below the `chance` tile for Mario access, and keep the mushroom emergence tile above the block empty.
- When a question block is spent, use a replacement style that exists in every active sprite sheet. `bricks` exists in both overworld and castle; `bricks-top` does not exist in the castle sheet and will crash drawing, which makes the parent shell hard-reboot the iframe.
- `layers/background.js`: background tile draw order and Princess Daniel finale tile. The finale renderer draws the local-only `GREEN CARD` sign plus a small USA flag, and renders the local `assets/images/goals/daniel_face.png` cutout as a large standalone Daniel face with a code-native fallback face while the image loads. The background buffer is wider than the viewport so the enlarged finale art is not clipped at the right edge.
- `layers/dashboard.js`: original Mario top HUD renderer. It exists in the vendor but must not be pushed into playable levels for Super Brazio; normal play should not draw `MARIO`, score, coins, world, or time at the top of the canvas.
- `effects/psychedelic.js`: green mushroom post-processing. It keeps the original frame as a stable base and draws three horizontal displaced wave bands with opposing motion plus purple, bright green, and yellow overlays, avoiding heavy blur/filter work during gameplay.
- `traits/Pole.js`: emits `Pole.EVENT_TRAVEL_COMPLETE` after the pole slide completes so `main.js` can start the world transition without treating the first-world flag as a win.
- `levels/brazio-2.json`: longer Castle Finale world using the castle tile sheet, dark castle background, multiple lava/wave gaps, raised breakable brick platforms, bridge obstacles, extra ICE_AGENT enemies, an extended final castle run, a final bridge, and a clean empty runway before Princess Daniel at tile x216. Princess Daniel lives here, not in `1-1`; the parent finish line is `finishX=3392`, after that runway and slightly before her, so Mario wins by getting close instead of passing/touching her. The Daniel face, green-card, and USA-flag finale art is tied to this `princess-daniel` tile.
- Parent-owned gameplay music: normal split-screen iframes boot with `parentMusic=1`, so `MusicPlayer.playTrack()` does not start vendored level music inside each iframe. The parent shell plays exactly one shared background track: overworld during `1-1`, castle after any iframe reports `level-change` to `brazio-2`, then after 30 seconds fades castle out over about 2.75 seconds before switching to overworld.
- `checkpointFlags` in `levels/1-1.json` and `levels/brazio-2.json`: visual save points for each world. `1-1` currently uses three, and `brazio-2` currently uses two. Keep every flag's `pos` on a safe floor tile and its `spawn` high enough for `snapMarioToSpawnFloor` to place small or large Mario on the floor without embedding him in tiles. If the stage feels visually crowded, prefer moving or removing checkpoint flags rather than shrinking them into unreadable markers.
- `entities/AdolfJackson.js`: reusable Michael Jackson super enemy built from the Submarine Michael Jackson face and sound cues. It plays `hee-hee` once when first visible, starts the longer presence sound after a short delay, caps that presence sound at 5 seconds, stops it immediately when stomped, moves faster than ICE_AGENTs without the old runaway speed, reverses before missing floor tiles when possible, and uses the same side-hit/stomp rules. It currently appears near the end of `1-1` and once mid-stage in `brazio-2`.
- In `brazio-2`, avoid putting plain `metal-alt` blocks or tall pipes in mandatory jump arcs around bridges, gaps, or high obstacles. Use raised platforms, question blocks with open access, or side-route blocks instead of head-height blockers that make progression feel impossible. The X91-X108 castle choke point should stay open; only the high brick at X110/Y7 remains near that section. The late lava jump around X156-X172 must also stay clear of single floating blockers, especially head-height `metal-alt` tiles like the removed X158/Y8 tile.
- Debug mode and the parent `Ctrl+I` / `Command+I` live-game toggle show diagnostics in two layers: the vendored canvas draws guide lines/markers and object labels, and the parent shell renders the important text as a crisp HTML overlay. It shows the level, camera tile range, Mario pixel/tile coordinates, tile summary under Mario, nearby ICE_AGENT ids/tile positions, and nearby checkpoint flag ids/tile positions. Canvas labels use `E#` over ICE_AGENT enemies and `F#` over checkpoint flags so future user screenshots can identify exactly which object is stuck or badly placed.

## Future Mushroom Effect Contract

Mushroom colors are data-driven from each question block's explicit `mushroom` field in the level JSON. Do not add random mushroom selection or infer a color from block order.

Current types:

- `red`: grow Mario.
- `green`: global three-band psychedelic wave effect; in split-screen play, either iframe can trigger it and the parent broadcasts it to both active iframes.
- `yellow`: modest local 10-second speed boost for the collecting iframe's Mario.
- `purple`: local 10-second inverted left/right controls for the collecting iframe's Mario.

Future candidates:

- `blue`: ice/float or low-gravity movement effect.
- `black`: short danger/blackout effect.
- `white`: one-hit shield or bad-effect cleanse.
- `gold`: finale boost/invulnerability.

Technical rules:

- Each type needs a deterministic spawn asset/color, pickup sound, duration when temporary, cleanup path, and browser test.
- Effects must not cause a parent hard-reboot, canvas replacement, module reload, or `load-error`.
- New screen effects should reuse the stable-frame canvas post-processing pattern from `effects/psychedelic.js`; avoid heavy runtime CSS `filter: blur(...)` or DOM overlays that can drop FPS.
- Any spent question-block replacement tile must exist in every active sprite sheet.
- If an unknown mushroom type appears in JSON, resolve it to `red` or suppress the spawn safely.
- Global effects such as `green` or future `black` should be broadcast by the parent to both active iframes. Yellow and purple are local iframe effects.
- Purple input inversion must remember the actual direction activated by each movement keydown and release that same direction on keyup. Do not implement it by simply changing the release math at keyup time, or it can reintroduce stuck `Go.dir` movement.
- Debug mode should provide a way to reach or spawn every mushroom color without replaying a full world.

## Shell/Iframe Contract

Parent to vendor:

- `key`: synthetic keyboard event using the vendor key map.
- `stop-audio`: pause vendored music when the winner banner appears.
- `parentMusic=1` URL param: tells the vendored iframe not to start its own level/background music. This prevents split-screen doubled music while preserving Web Audio gameplay effects.
- `release-input`: clear the vendored `KeyboardState`, zero Mario's movement, and preserve the current input-lock state unless an explicit `locked` value is provided. The parent sends this around deaths, countdowns, reboots, and level transitions to prevent stale held keys from making Mario walk by himself.
- On `level-change`, the parent also releases that team's held controls so parent-side `vendorKeyHolds` does not survive the stage transition.
- `set-debug-overlay`: toggle the vendor's canvas debug markers.
- `activate-psychedelic`: trigger the green-mushroom wave effect from the parent, usually because the other iframe collected one.

Vendor to parent:

- `ready`: level is loaded and the current scene is the playable level.
- `load-error`: level boot failed; parent should hard-reboot the iframe and keep retrying instead of showing a terminal error.
- `damage`: Mario died or fell; parent plays damage sound and releases held keys.
- `level-change`: the vendored iframe moved to another level; parent saves the current level so refresh can restore to the correct world.
- When any iframe reports `level-change` to `brazio-2`, the parent starts the shared stage-two castle music and sends `stop-audio` to every active iframe as an extra guard. Later iframe `ready` events always receive `stop-audio`, and the parent syncs the single shared background track for the current global stage.
- `powerup` with `powerup=green-mushroom`: parent broadcasts the psychedelic effect to all active iframes.
- `finish`: Mario reached the finish area slightly before Princess Daniel in the configured final level; parent freezes flow and shows a top-of-screen winner banner saying `<player name> הגיע לגרין קארד!` with floating hearts while keeping the game scene visible.

Rules:

- The parent countdown must not start until `ready`.
- Refresh during active play must restart from countdown with selected characters preserved.
- Every iframe URL change needs a version/cache bust when JS or level data changes.
- Use a versioned vendor path when module-cache drift is suspected; query strings on the top-level module do not guarantee all static ES module imports are refreshed.
- The UI must not end on `תקלה`. A failed boot stays on loading/reloading and self-heals via iframe replacement.
- Parent-side `vendorKeyHolds` must prevent duplicate keydown/keyup confusion when two team controls map into one vendor key.
- In normal split-screen play, parent-side `vendorKeyHolds` must be keyed per team and vendor key. WASD routes only to `team=chen`; arrows route only to `team=brazim`.
- The parent must include both `level` and `finalLevel` query params when booting the vendored iframe. Current values are `level=1-1` or the saved current level, and `finalLevel=brazio-2`.
- Normal play boots two vendor URLs with `team=chen` and `team=brazim`. The shell must wait for `ready` from every active iframe before starting the countdown.
- Parent debug mode is `?debug=1` or the hidden start-screen `Command+D` on Mac / `Ctrl+D` on Windows shortcut. It shows a debug-only stage picker only after activation, starts one player after a level is chosen, skips the party start/rules flow, ignores normal saved state, and can accept `&level=brazio-2` or `&debugLevel=brazio-2` to bypass the picker.
- Vendor debug mode receives `debug=1` from the parent iframe URL. In that mode only, enemy death still flashes Mario at the collision/failure spot but restores him to the last safe nearby spot after the flash instead of the checkpoint. Pit death must bypass that debug safe-spot path and respawn at the latest checkpoint flag. If the remembered enemy-death safe spot is absent or more than 160px behind the failure, `main.js` scans nearby solid floor tiles around the failure X and uses the closest clear small-Mario floor position before falling back to the level checkpoint. The diagnostics overlay can also be enabled separately with `debugHud=1` or the parent `set-debug-overlay` message; when enabled it labels nearby ICE_AGENT enemies as `E#` and checkpoint flags as `F#`. Embedded vendor frames must ignore direct physical keyboard events and accept only parent-forwarded keyboard events. The Mario `turbo(true)` path is also hard-disabled, so clicking into the iframe, stray `KeyO`/Shift events, or direct debug calls cannot enable accidental turbo.
- Split-screen backup before the two-iframe implementation lives at `backups/super-brazio/20260627-085348-before-split-screen-v2/`; the Git pointer is `codex/super-brazio-before-split-20260627-085348`, but the tarball is the important backup because `games/super-brazio/` is untracked in this worktree.

## ICE_AGENT Enemy Replacement

The ICE_AGENT source image has a white background and two horizontal rows:

- Row 1: `ICE_AGENT_1` walk cycle.
- Row 2: `ICE_AGENT_2` walk cycle.
- Six frames per row.

Prepared files:

- `games/super-brazio/assets/images/enemies/ice-agents/README.md`
- `games/super-brazio/tools/prepare-ice-agents.sh`

Implemented processing:

1. Run `TARGET_FRAME_SIZE=24x24 games/super-brazio/tools/prepare-ice-agents.sh /path/to/source.png 6`.
2. Inspect generated preview GIFs and strips.
3. Runtime PNG strips are copied to `vendor/meth-super-mario/img/ice-agent-1.png` and `vendor/meth-super-mario/img/ice-agent-2.png`.
4. Sprite JSON is generated at `vendor/meth-super-mario/sprites/ice-agent-1.json` and `vendor/meth-super-mario/sprites/ice-agent-2.json`.
5. `js/entities/IceAgent.js` gives both agents Goomba-like patrol, side damage, wall reversal, and stomp-kill behavior. When stomped, the agent stops and flashes on/off until the existing `Killable` removal timer deletes it, so the death reads clearly.
6. `js/entities.js` registers `ice-agent-1` and `ice-agent-2`.
7. `levels/1-1.json` and `levels/brazio-2.json` use the ICE agents instead of the previous Goomba/Koopa enemies.
8. Runtime frames are 24x24 with mild contrast/saturation/sharpening. `IceAgent.js` uses a 15x21 hitbox with a 3px vertical offset so the agents are smaller while their feet still sit on the floor.
9. The source image's tiny `ICE` letters do not survive heavy downscaling reliably. `IceAgent.js` therefore draws a crisp code-native pixel `ICE` badge on top of each frame after sprite drawing, keeping the label readable without making the enemy larger.
10. In `brazio-2`, ICE_AGENT spawn positions should put `bounds.bottom` on the floor line, not on pipe caps, inside decorative tiles, inside pipes, or inside walls. After moving ICE agents, run a static overlap check against solid tiles.
11. Vendor hardboot/cache bust must be bumped whenever generated sprite JSON, entity imports, level JSON, or debug overlay code changes.

## Known High-Risk Changes

Treat these as requiring browser tests, not just syntax checks:

- Editing `main.js`, `Timer.js`, `Level.js`, `Physics.js`, `TileCollider.js`, `EntityCollider.js`, `Jump.js`, `Go.js`, `Killable.js`, `Player.js`, or `chance.js`.
- Moving the finish trigger or pit threshold.
- Changing camera size, iframe size, canvas size, CSS object fit, or viewport dimensions.
- Adding new level entities or new JSON `name` values.
- Adding assets loaded at runtime from JS modules, JSON, or CSS.
- Replacing enemy sprite JSON or entity factories.
- Changing audio preload/playback.
- Changing localStorage version or restore behavior.
- Changing parent/iframe message types.
- Changing respawn timing or input lock behavior.

## Required Tests After Any Gameplay Change

Run at least:

```bash
node --check games/super-brazio/game.js
node --check games/super-brazio/vendor/meth-super-mario/js/main.js
python3 -m json.tool games/super-brazio/vendor/meth-super-mario/levels/1-1.json >/dev/null
```

Then browser-test with local Chrome:

1. Clean start: `?init=1`, click `התחל`, select both teams, click `התחל משחק`.
2. Assert countdown waits for vendor readiness, then hides.
3. Assert both iframes have scene constructor `Level`, scene name `1-1`, and canvases that are not mostly black.
3a. Assert the original Mario top HUD is absent during normal play: no `MARIO`, score, coin count, `WORLD`, or `TIME` text is drawn at the top of the canvas.
3b. Assert each parent player HUD shows the selected player name and fighter GIF only, with no `WASD`, `חצים`, or other control labels on the active player screens.
3c. Assert the pre-game modal does show the controls before gameplay: `מקשים:`, `A` / `D` walking, `W` jump, `←` / `→` walking, `↑` jump, and a note that holding jump makes Mario jump higher.
3d. Assert the playable character shows the regular Mario body with Dor's large face overlay, and that the face mirrors during movement.
4. Press `A/D/W`; verify only the `chen` iframe Mario moves/jumps. Press arrow controls; verify only the `brazim` iframe Mario moves/jumps.
5. Hit a question block; verify mushroom appears.
5a. In both worlds, verify no question block sits directly on top of a solid tile or under a solid tile that blocks mushroom emergence.
5b. Verify every `chance` tile in `1-1` and `brazio-2` has exactly one explicit `mushroom` value and no duplicate chance tile at the same coordinates.
6. Collect red mushroom; verify Mario grows and bottom alignment stays stable.
7. Collect green mushroom in either iframe; verify psychedelic effect starts on both active iframes and later clears.
7a. Collect yellow mushroom; verify Mario is modestly faster for about 10 seconds, then returns to normal tuning.
7b. Collect purple mushroom; verify left/right controls invert for about 10 seconds, then return to normal without stuck movement when a key is held or released late.
8. Touch enemy from side while small; verify instant lock, death sound, about 3 seconds of Mario on/off flashing, then respawn.
9. Fall in pit; verify instant lock, no invisible movement to finish, quick respawn.
9a. In both worlds, reach a red checkpoint flag and verify it turns green. Then die by ICE_AGENT or pit after passing it and verify Mario respawns at that latest green flag rather than the start of the world or the pit position, gets about 3 seconds of blinking enemy-contact grace, and does not keep walking left from stale input.
9b. While holding right, trigger a death/reset and release right during the lockout; verify Mario does not start walking left after respawn.
10. Refresh during live play; verify no terminal `תקלה`, no stuck `LOADING 1-1...`, countdown returns, then level appears.
11. Intentionally fail the first vendor `main.js` request; verify diagnostics include `reboot-scheduled` and gameplay still loads.
12. Reach Princess Daniel; verify victory sound and the high top winner banner with `<player name> הגיע לגרין קארד!` and without a dark modal/backdrop.
13. Reach the `1-1` flag/pole; verify the canvas fades out, `brazio-2` loads, and gameplay fades back in.
13a. Enter `brazio-2` while large; verify Mario spawns after the entrance stairs, not inside blocks, and can walk immediately.
13b. In split-screen play, verify there is only one gameplay background music track: one shared parent-owned overworld track during `1-1`, and when either iframe reaches `brazio-2`, one shared parent-owned castle track for both players.
13c. Hold right while entering the `1-1` pole/transition, release it during the fade or immediately after `brazio-2` appears, and verify Mario stays neutral instead of walking left by default.
14. Refresh while saved in `brazio-2`; verify the shell boots directly into `brazio-2` after the readiness countdown and never shows `תקלה`.
15. Get close to Princess Daniel in `brazio-2`; verify the world is visually a longer castle finale with extra gaps/platforms/enemies and an extended final bridge run, Daniel appears as a large standalone face beside the green-card sign and USA flag, then victory sound and the top winner banner appear before Mario has to pass or touch her.
15a. Traverse the bridge/pipe choke points in `brazio-2`; verify ordinary blocks and tall pipes no longer interrupt the required jump arcs. Around X91-X108 and the late lava gap around X156-X172, verify there are no solid blockers in the playable jump path and ICE_AGENTs stand on the floor rather than pipe/tile tops.
16. Refresh after win; verify the top winner banner remains and the game scene is still visible behind it.
17. Open the normal start screen; verify there is no visible debug hint or debug button.
18. Press the hidden `Command+D` on Mac / `Ctrl+D` on Windows shortcut on the normal start screen; verify it shows the debug-only stage picker.
19. Choose a debug stage from that picker; verify the iframe boots with `debug=1`, skips character selection/rules, and does not overwrite normal localStorage.
20. Open `?debug=1`; verify it shows a debug-only stage picker, then boots one player after choosing a level without character selection or rules and does not overwrite normal localStorage.
21. Open `?debug=1&level=brazio-2`; verify it boots directly into the castle finale and the diagnostics overlay shows Mario tile coordinates, camera range, nearby ICE ids, and tile X markers.
22. In debug mode, trigger enemy death; verify Mario flashes, then resumes near the failure area instead of the level checkpoint. Then trigger pit death after a reached flag and verify Mario returns to that latest checkpoint flag, not the pit position or the top of the screen.

Automated browser checks should fail on:

- parent overlay text `תקלה`.
- parent `vendorError` dataset not empty.
- missing iframe.
- iframe scene not a `Level`.
- canvas mostly black after countdown.
- uncaught `pageerror`.
- failed non-media requests.

## Debug Symptom Map

- Stuck on `LOADING 1-1...`: vendor did not reach `ready`; inspect level JSON, asset paths, entity names, module imports, and `load-error` messages.
- Stuck on `LOADING brazio-2...`: inspect `levels/brazio-2.json`, unregistered entity names, broken background pattern references, and whether the parent is booting an old hardboot vendor path.
- Parent shows `תקלה`: this should no longer happen. Inspect whether an old cached parent shell is still loaded, then verify `game.js` uses the current hardboot build.
- Black screen after countdown: parent began play before vendor ready, canvas draw failed, or CSS/iframe size collapsed.
- Mario moves while dead/invisible: respawn lock or key release is broken.
- Death feels delayed: collision is not locking immediately; inspect `handlePlayerDeath`, `Killable`, enemy `collides`, and parent `damage`.
- Mushroom passes through walls: inspect `PowerMushroom.obstruct`, `Solid.obstructs`, and whether tile collision sees the entity.
- Mario grows weirdly: inspect `Player.powerUp` and bottom-preservation logic.
- Trees/scenery cover gameplay objects: inspect background/sprite layer order.
- Sound causes errors after refresh: missing Promise catch around `play()` or eager media preload.
- Refresh returns to start: storage restore/version logic is wrong.
- Refresh returns to `1-1` after reaching `brazio-2`: parent did not receive or persist the `level-change` message.

## Change Discipline

- Prefer small, testable patches.
- Keep party-shell state separate from vendored engine state.
- Do not add a new entity name to level JSON unless `entities.js` registers it and browser tests prove it loads from a cold cache.
- Prefer code-native or existing-spritesheet visuals for tiny goal/effect additions when image-loading risk is higher than visual benefit.
- When changing vendor modules imported by other modules, update cache-busting at `games/super-brazio/index.html`, vendor `index.html`, and `VENDOR_BUILD`.
- Browser validation beats visual guessing. Use screenshots and canvas-pixel assertions for refresh/black-screen bugs.
