# Current Focus

Current phase: Post-party static portal for The Braz Games.

Active task:

- Prepare the existing static portal for production sharing from a private GitHub repository.
- Add a root `The Braz Games` launcher page with four rounded game-selection cards.
- The portal links to the four approved games only and must not reset their localStorage state.
- Serve the portal locally from the repository root at `http://localhost:3000`.
- Keep the individual game ports available at `3001` through `3004`.
- Use the existing local start-screen background images for the four cards.
- Do not add a fifth game or change individual gameplay flows as part of the portal work.

Previous active game context:

Active game:

4. Super Brazio

Working title:

- SUPER BRAZIO

Current Super Brazio direction:

- User approved implementation after the written plan.
- Work only on `games/super-brazio/` and Super Brazio docs unless explicitly redirected.
- Use the shared Dor party start-screen style from the `dor-party-game-style` skill.
- The current MVP now runs as a two-player split-screen race: one same-origin Mario iframe per team, side by side.
- Each team has its own two-world platformer flow and saved current world.
- There are no rounds.
- The first selected player to clear world `1-1`, transition into world `brazio-2`, and reach Princess Daniel / Golden Visa wins the whole game.
- החן יוספים, ועוזריהם use `WASD`.
- הבראזים use the arrow keys.
- Proposed port remains `http://localhost:3004`.
- Detailed plan: `docs/games/SUPER_BRAZIO_PLAN.md`.
- Browser/Mario engine notes: `docs/games/SUPER_BRAZIO_ENGINE_NOTES.md`.
- Local README: `games/super-brazio/README.md`.

Current Super Brazio implementation status:

- Implemented first playable static prototype under `games/super-brazio/`.
- Runtime is local-only and uses no external hosted assets.
- The prototype now uses a local vendored copy of `meth-meth-method/super-mario` under `games/super-brazio/vendor/meth-super-mario/`.
- The party shell runs two same-origin iframes of the vendored repo, one for each team, and bridges each keyboard control set only into that team's iframe. Debug mode still uses one iframe for focused testing.
- Start screen, character selection, split-screen vendored Super Mario race flow, top-of-screen winner banner, refresh-safe state, and `Command+D` on Mac / `Ctrl+D` on Windows reset are implemented.
- Super Brazio now uses the shared opening-screen character assets: local face-card portraits, bounded fighter preview GIFs in the bottom fighter/action/fighter row, the `choose-your-fighter` announcer during the reveal, per-character fighter reveal sounds on selection, and the Memory arcade playlist during character select only.
- The Super Brazio opening background uses the Dor Burger King image twice: a sharp centered `contain` layer in front, and a blurred full-screen `cover` layer behind it to fill the widescreen edges without making the stretched copy visually sharp.
- Refreshing while still on the Super Brazio start screen clears temporary selected cards and fighter previews, while refresh after rules/countdown/gameplay still preserves selected fighters for resume.
- World `1-1` now ends at the flag/pole instead of the princess; grabbing the pole fades the canvas out, loads `brazio-2`, fades back in, and preserves Mario's current big/small state.
- World `brazio-2` is now a longer Castle Finale world with the castle tiles/patterns, a dark castle background, multiple lava/wave gaps, extra raised platforms, pipe/bridge obstacles, more ICE_AGENT enemies, and Princess Daniel farther after the final bridge; getting close to her triggers the win before Mario has to pass or touch her.
- Super Brazio gameplay background music is now owned by the parent shell, not by the two vendored iframes. The iframes receive `parentMusic=1` so their level music stays muted, the parent plays one shared `1-1` overworld track during stage 1, and once either player reaches `brazio-2` the parent switches everyone to one shared castle track, then fades after 30 seconds back to the overworld track.
- The original Mario HUD/dashboard is disabled in every level: no `MARIO`, score, coins, world, or timer text is drawn at the top of the game canvas during normal play.
- The playable character now uses the regular Mario sprite body again, with the local `assets/images/players/dor_mario_face.png` composited as a large face overlay. `drawOffset` keeps the enlarged face from clipping while preserving Mario's original hitbox, physics, sounds, and power-up behavior. The vendor canvas uses smoother browser scaling (`image-rendering: auto`) so Dor's face reads less pixelated.
- The active split-screen player HUD now shows only each selected player's name and a compact fighter GIF beside that player's Mario frame. It no longer displays `WASD`, `חצים`, or other control labels during gameplay.
- World `1-1` now contains three visible checkpoint flags and `brazio-2` contains two visible checkpoint flags, so the save markers are useful without cluttering the stage. A checkpoint flag starts red, turns green the first time Mario reaches/passes it, and becomes the active respawn point for later ICE_AGENT hits or pit deaths in that same world. The original world spawn remains the fallback only before the first flag is reached.
- The latest Castle Finale pass extends the second half farther right, adds another bridge/gap/pipe/enemy sequence, removes the plain metal blocks at the reported jump-arc choke points, opens the tile X91-X108 choke by removing the tall pipe/head-height blockers that made the jump feel impossible, and clears the late lava-jump arc around tile X156-X172 by removing the single floating `metal-alt` blocker at X158/Y8.
- The `brazio-2` spawn checkpoint is placed after the entrance stairs and high enough for both small and large Mario so the level transition cannot spawn Mario inside castle tiles.
- The Super Brazio pre-game modal keeps the 16-second circular timer, shows `מי יגיע ראשון לנסיכה!?`, and now includes a compact `מקשים:` reference: `A` / `D` walking and `W` jump for החן יוספים, arrow-key walking and `↑` jump for הבראזים, plus a note that holding jump makes Mario jump higher.
- Question-block power mushrooms now play local power-up sounds, reverse direction when they hit solid level geometry, and are deterministic per block through each tile's `mushroom` field in the level JSON.
- Opened question blocks now become the shared `bricks` tile instead of `bricks-top`, because the castle sprite sheet does not define `bricks-top`; this prevents a castle question block hit from crashing the vendor and causing a parent hard-reboot.
- Castle finale question blocks have been moved off supporting tiles: every `brazio-2` question block now has open air below it and open space above it for mushroom emergence, so Mario can hit it from underneath.
- Enemy contact while Mario is large now plays a short local `power-down` hit sound, shrinks him back to small Mario with brief damage grace, and does not cost a life; enemy contact while small locks input, plays the death sound, turns the game canvas black-and-white, flashes Mario on/off for about 3 seconds, then respawns and restores color.
- Respawn now resets Mario to small state before placement, snaps him to the spawn floor so he does not return partially inside the ground, clears the black-and-white damage filter once Mario is back at the checkpoint/safe debug spot, gives him about 3 seconds of post-respawn enemy-contact grace, and clears all held keyboard state in both the parent shell and vendored iframe so he cannot keep walking left from a stale input. The vendor keyboard layer now ignores late `keyup` events for keys that are no longer pressed, which fixes the root cause where releasing right after a transition/reset could subtract from `Go.dir` and make Mario walk left by default. Pit deaths always return to the latest reached checkpoint flag, even in debug mode, so falling into a `brazio-2` pit cannot return Mario to the pit or fling him to the top of the screen.
- Super Brazio now has four deterministic mushroom types: red grows Mario, green triggers the global three-band psychedelic wave effect across both screens, yellow gives that iframe's Mario a modest 10-second speed boost, and purple gives that iframe's Mario 10 seconds of inverted left/right controls. The green mushrooms are spread through both worlds, and yellow/purple mushrooms are placed in both `1-1` and `brazio-2`.
- The end of `1-1` now leads to world `brazio-2`; Princess Daniel is waiting only in the extended castle finale world after a clean empty runway beyond the final bridge stretch, with the win line placed after that runway and slightly before her. The finale goal tile now draws the local `assets/images/goals/daniel_face.png` as a large standalone Daniel face next to a larger, clearer code-native green `GREEN CARD` sign and a small USA flag.
- The Super Brazio ending now keeps gameplay visible and shows a high top-of-screen finish banner saying `<player name> הגיע לגרין קארד!`, with floating heart effects over the scene instead of a dark modal that hides the game.
- Refreshing during live Super Brazio play now reloads the vendored Mario frame before the parent countdown, waits for a vendor `ready` signal, uses a versioned vendor path to bypass stale ES module cache, and hard-reboots the iframe on vendor errors or readiness timeouts. There is no terminal `תקלה` state; failed boots keep self-healing until gameplay is visible.
- Super Brazio now has a hidden single-user debug entry from start-screen `Command+D` on Mac / `Ctrl+D` on Windows and at `http://localhost:3004?debug=1`, with a level picker for stage 1 or stage 2. The normal start screen shows no debug hint or debug button. Add `&level=brazio-2` to skip the picker and boot directly into the castle finale. Debug mode skips the start/rules flow after level selection, does not write normal party localStorage, keeps a single iframe/player for quick testing, and shows crisp parent-DOM tile/camera/Mario/nearby ICE_AGENT/checkpoint-flag diagnostics above the canvas instead of unreadable scaled canvas text. During any live game, `Ctrl+I` / `Command+I` toggles the diagnostics HUD without entering full debug mode. When the debug overlay is on, the canvas also labels every nearby ICE_AGENT as `E#` and every checkpoint flag as `F#` directly above the object.
- In Super Brazio debug mode only, enemy death still locks and flashes Mario at the failure spot, but then restores him to the last safe nearby spot instead of sending him back to the level checkpoint. Pit death is the exception: it always returns to the latest checkpoint flag. If the remembered safe spot is missing or too far behind, the vendor now scans nearby floor tiles around the failure X and respawns on the closest clear floor, so a Castle Finale debug enemy death cannot suddenly return Mario to the stage start. The iframe ignores direct keyboard events when embedded by the parent shell, the old hidden turbo/Shift mapping is disabled, and Mario's `turbo(true)` path is hard-disabled so clicking into the iframe or stray debug input cannot make Mario suddenly run at extreme speed.
- ICE_AGENT enemy replacement is implemented from the user-provided two-row, six-frame source image. The generated transparent sprite strips now use smaller 24x24 frames under `games/super-brazio/assets/images/enemies/ice-agents/`, runtime strips/JSON are copied into `games/super-brazio/vendor/meth-super-mario/`, `IceAgent.js` overlays a crisp pixel `ICE` badge at runtime so the label stays readable after canvas scaling, worlds `1-1` / `brazio-2` now use `ice-agent-1` and `ice-agent-2` instead of the previous Goomba/Koopa enemies, `brazio-2` agents are positioned so their feet sit on the castle floor instead of pipe/tile tops or inside pipes/walls, and stomped agents flash on/off until they disappear.
- Super Brazio now uses the Michael Jackson super enemy in both worlds: once near the end of `1-1`, and once mid-stage in `brazio-2`. He uses the local Submarine `adolf_jackson.webp` face and the Submarine `jackson-hee-hee.mp3` then `jackson-presence.mp3` sound sequence. He is faster than ICE_AGENT enemies without being uncontrollable, stops his presence music after 5 seconds or immediately when stomped, and reverses before floor edges when possible so he should not casually walk into pits.
- Split-screen backup note: before the two-screen implementation, the current Super Brazio state was backed up under `backups/super-brazio/20260627-085348-before-split-screen-v2/`, including a tarball of `games/super-brazio/` and a Git branch pointer named `codex/super-brazio-before-split-20260627-085348`.
- Future mushroom expansion note: after the current red/green/yellow/purple pass, any new colors should keep the explicit per-block `mushroom` JSON model, with a sound cue, visible cue, duration, safe cleanup, and debug-test coverage. Candidate future colors include blue ice/low-gravity, black danger/blackout, white shield/one-hit grace, and gold finale boost.

Memory Game remains available at `http://localhost:3001`.

Memory hotfix note:

- Refreshing/reopening Memory must restore the saved match state and must not return an active game to the home screen.
- Memory state should not be cleared by routine code, app-version, or asset-manifest changes.

Submarine Survival remains available at `http://localhost:3002`.

Recent Submarine fix:

- Submarine now uses the same local arcade playlist as Memory during the opening/rules flow only. The start playlist stops before the stage countdown so the existing stage songs remain clean and do not overlap.
- The final result screen now includes fully visible mirrored `bezos_southpark.webp` sprites on both sides and a compact enemy-face strip underneath the score. Magami uses trimmed final-screen assets and swaps between closed-mouth and open-mouth frames instead of mirroring; the other strip faces still mirror. The final score number order is left-to-right by visual placement: left number for `החן יוספים, ועוזריהם`, right number for `הבראזים`.

Dino remains available at `http://localhost:3003`.

Recent Dino fix:

- Dino opening screen now uses the local `assets/images/backgrounds/dor-beer-sheva-start.jpg` image for the start-screen background only, with the shared half-dark intro scrim after pressing `התחל`.
- Dino round-result cards now keep the `X אכל אותה` moment on screen for about 6 seconds and show a circular filling timer underneath before the next round countdown.
- Dino solo debug mode now skips the rules modal and countdown when starting or resuming a prep checkpoint, so debug runs begin immediately.
- Distant background signs now behave as one continuous queue across rounds, without sign-per-stage mapping. A fresh match starts with only `ברוכים הבאים / לבאר שבע`; from later rounds, the current queued sign starts offscreen to the right and arrives during play. Later signs enter with twice the previous generous spacing while the previous sign is still visible, advance only after the sign reaches at least the middle of the track, and uncommitted signs return as the first sign in the next round after a loss.
- Added the queued signs with Sima Shimoni now before `צאתכם לשלום! / באר שבע`, followed by `נמל התעופה / בן גוריון / →`, then the additional late-queue party/desert joke signs requested on 2026-06-24.
- Dino signs are now a finite queue: once the final sign has passed, the sequence stops instead of restarting from the beginning. The larger Sima Shimoni sign follows the same queue rules as every other sign. Non-opening signs also have a little more breathing room, and background zombies are visible from the pre-round countdown as small-but-readable same-size figures around sign-post height so they do not overlap the sign text panels.
- Dino obstacle pilot now uses weighted obstacle patterns instead of only one repeated cactus: small/regular/large cactuses and a close double-cactus pattern with separate hitboxes. The previous CSS-built bird pilot is disabled because it did not read clearly as a flying obstacle. No duck/slide control has been added.
- Dino now schedules small Jackson face obstacles at obstacle 30 in round 2, obstacle 3 in round 3, obstacle 15 in round 4, and obstacles 7 and 14 in round 5. The source copy comes from the Submarine `adolf_jackson.webp` asset under `games/dino/assets/images/obstacles/jackson-face.webp`.
- Dino obstacle performance pass: the Jackson obstacle now renders from a preloaded 100x118 runtime PNG instead of decoding the large source WebP at first spawn.
- Dino runner sprites now use the user-provided mirrored Dor face composited onto every Dino state: stationary, both run frames, and lose. The latest pass keeps the face enlarged and raised while adding enough top margin for the hair to remain visible.
- Dino now has a local-only background music playlist from `assets/sounds/background-music/arcade_5.mp3` through `arcade_8.mp3`; it starts after the first browser-approved gesture on the Dino screen, plays continuously across the full Dino flow, crossfades between tracks, and loops back to the first track after the fourth.
- Dino gameplay HUD now shows the selected fighter idle GIF in a separate column to the left of each lane's existing player/team/score card. The HUD fighter GIFs reuse the start-screen assets and are mirrored so both face left during gameplay.
- Dino gameplay now plays `assets/sounds/gameplay/jump-boing.mp3` once on each accepted jump and `assets/sounds/gameplay/dino-death.mp3` once when a runner is eliminated.

Recent Memory fix:

- Memory now has a local-only background music playlist under `games/memory/assets/sounds/music/`. It plays only on the Memory page, starts after browser audio permission/first interaction, crossfades through four arcade tracks, loops back to the first track, and pauses when the Memory tab is hidden.
- Plato's Memory board-card-open sound has been replaced in-place with the shortened one-shot, and the Memory sound/cache version was bumped so Chrome does not keep the old long clip.
- The active fighter cursor is smaller and now hides for about 1 second only when a specific board card is revealed for the first time in the match. Reopening a card that was revealed earlier does not hide the cursor again.
- Memory, Submarine, Dino, and Super Brazio show a 16-second rules/pre-game modal with a circular loader after character selection and before gameplay. Keyboard controls in those modals are labeled `מקשים:` and rendered as visible key clusters: `WASD`, arrow-key clusters, or `↑` for single-key jump.
- Pishoto alias is locked across the project: party-facing Hebrew display is `פישוטו`, English-facing display is `Pishoto`, and older aliases should not be shown.

Do not add extra games outside the approved four-game scope.

Previous Submarine/Dino note:

- Submarine final-stage and Dino validation notes below are preserved as project context.
- If the user returns to Submarine/Dino polish, use the relevant game README and plan before editing.

Current Submarine direction:

- Use the existing plain HTML/CSS/JS and Canvas submarine game.
- Run from `games/submarine/` on `http://localhost:3002`.
- Local-only browser game with no external runtime assets.
- Preserve the character-select start screen unless explicitly changed.
- Current gameplay:
  - two submarines share one underwater playfield.
  - החן יוספים, ועוזריהם use `WASD`.
  - הבראזים use arrow keys.
  - the selected character face rides plainly inside the front of that team's submarine, while Dor's sunglasses face rides plainly in the rear; do not draw circular/oval portrait frames around them.
  - the selected character's fighter sprite appears in that team's top HUD card, next to the center score, with the two HUD fighters facing each other; HUD fighter slots must never show empty image boxes during stage/countdown overlays.
  - side-facing selected character faces inside submarines use per-character mirroring so they face the submarine nose, not the tail.
  - submarine collision uses a small multi-point body/tail hitbox so tail contact with enemies registers without making the whole submarine feel oversized.
  - one submarine eliminated ends the round.
  - 5 total rounds.
  - the surviving team gets the point.
  - enemy tiers stay consistent: small green, medium yellow, large purple, giant red.
- Stage 2 is `שלב שני: אנטישמים מלוחים`; Tucker faces left in the source, so he stays unmirrored when moving left and mirrors when moving right.
- Stage 4 is `שלב רביעי: The Revenge Of The Exiled`.
- Stage 4 enemy assets:
  - `maor.webp`
  - `lior.webp`
  - `mosko.webp`
  - `tomer.webp`
- Stage 4 orientation:
  - TOMER uses inverted mirroring compared with the original source-facing assumption, so he now mirrors when moving right and stays unmirrored when moving left.
  - LIOR also uses inverted mirroring compared with the original source-facing assumption, so he now stays unmirrored when moving right and mirrors when moving left.
  - MAOR and MOSKO look forward, so normal mirroring is acceptable.
  - TOMER uses a brightened/high-contrast local copy so his face reads closer to the other Exiled assets.
- Stage 5 displays as `השלב הסופי: חמירוזון פריים` with a scarier fire/blood title treatment and must remain the final stage.
- Stage 5 uses the custom Amazon/Bezos/Bezos SP behavior.
- Stage 5 Bezos SP still unlocks after about 15 seconds and keeps its extra speed, but should stay rare enough to be survivable: lower spawn chance, slower active-limit growth, and no more than two active Bezos SP hunters at once.
- Stage 3 Galit and Stage 5 Bezos SP use inverted enemy mirroring so their faces point with their movement direction.
- All Submarine stages have an additional global 10% player-friendly ease pass on top of the first ease pass: lower enemy caps and wave sizes, slower enemy speed, longer spawn intervals, a softer pressure ramp, and a stronger bias toward drifting/non-hunting enemies. Stage 1 Magami face sprites are only a tiny bit larger visually; their collision/difficulty tier stays unchanged.
- All Submarine stages now have a softer first-15-seconds grace period: slightly lower active enemy cap, smaller pressure waves, slower spawn interval, slower enemy speed, fewer hunters, and fewer giant enemies. The pressure eases back to the normal curve quickly after that window.
- Submarine Michael Hitler / Adolf Jackson event: once any player reaches their last heart, a 10-second danger timer starts. If the round is still active, the arrival sound plays about 1.6 seconds before two giant red hunters enter. They stay dangerous for 6 seconds, then fade quickly; once fade starts they cannot eliminate players. They appear only once per stage/round and do not return after disappearing.
- Persistence/reset plan:
  - localStorage key: `dor-bachelor-submarine-state-v1`.
  - refresh restores match context after gameplay has started.
  - refresh during live play restarts only the current round/pre-round checkpoint, while score and selected characters stay saved.
  - refresh on the start screen returns to a clean opening state with no selected character cards or fighter previews.
  - `Command+D` on Mac or `Ctrl+D` on Windows opens the password-protected reset popup during gameplay and toggles solo debug mode on the start screen.
  - password `Chmir` clears only Submarine state.
  - `?init=1` also clears only Submarine state.
- Between-round Submarine overlays stay minimal: round summary shows only who ate it plus survival time in `MM:SS` format, and the next-stage screen shows only selected face portraits in large square frames plus the stage name and countdown. The next-stage portraits keep the same visual direction as the start-screen cards, so הבראזים portraits face left/inward.
- The Submarine rules modal ends with `מי יצליח לקחת את דור לחוף המבטחים מתקופת הצבא האכזרית?`.
- In Submarine solo debug mode, the `הניסוי נגמר` ending uses the same full final-result screen treatment as the regular game over screen, including the scoreboard, Bezos SP side sprites, enemy-face strip, two small Jackson sprites that drift slowly above the result card in a DVD/no-HDMI-inspired path without rotating, stretching, or hard corner bounces, and reset button.
- In Submarine solo debug mode, pressing `Space` on the next-stage `מתחילים בעוד X` screen skips the countdown and starts the round immediately.
- Hiding/minimizing the Submarine browser tab freezes active play, countdowns, round summaries, and elimination timers so survival time does not advance in the background.
- Submarine underwater decoration should stay background-only: low-opacity moving fish/drifters, bubbles, particles, and seaweed/coral anchored to the actual bottom edge.
- Submarine uses the arcade pixel visual style by default at `http://localhost:3002`: it pixel-styles the active canvas background while keeping submarine bodies/hardware and enemy face sprites smooth and readable. Enemy sprites are intentionally not pixelated so their green/yellow/purple/red tier colors and hunter flashing remain clear. The style does not change gameplay, hitboxes, enemy behavior, score, or persistence. The older non-pixel look is available through `http://localhost:3002/classic/` or `?classic=1`.
- Submarine enemy rendering should preserve the tier-color tinting first. Do not re-enable arcade enemy-sprite pixelation if it weakens or removes the green/yellow/purple/red coloring and hunter flashing.
- Submarine keeps a small global projector-safe margin around the app shell so HUD, canvas, overlays, and the final result screen do not sit on the physical display edges. The canvas measures the actual rendered safe area, so this margin must not change gameplay behavior beyond the slightly smaller visible playfield.
- On every Submarine round-ending elimination, play the surviving selected character's fighter reveal sound instead of the normal elimination sound.
- Submarine stage music begins on that stage's `מתחילים בעוד...` countdown, plays as prominent background music at about 75% volume with a fade-in, continues through the elimination freeze and round-summary screen, and only hands off when the next-stage announcement/countdown appears. On the final stage there is no next-stage handoff, so the final `חמירוזון פריים` song stays in the background through the full result screen. It defaults to starting from 00:00 unless a stage-specific offset is requested. Stage 1 `המגמים` uses `assets/sounds/stage-music/magami-song.mp3` from 00:00; Stage 2 `אנטישמים מלוחים` uses `assets/sounds/stage-music/salty-antisemites-song.mp3`, pre-trimmed from source 00:28 so runtime starts at file 00:00, at 80% of the shared stage-music volume; Stage 3 `לה פאמיליה` uses `assets/sounds/stage-music/la-familia-song.mp3`, pre-trimmed from source 00:20 so runtime starts at file 00:00; Stage 4 `The Revenge Of The Exiled` / `נקמת הגולים` uses `assets/sounds/stage-music/exiled-revenge-song.mp3`, pre-trimmed from source 00:32 so runtime starts at file 00:00; Stage 5 `חמירוזון פריים` uses `assets/sounds/stage-music/chmirozon-prime-song.mp3` from 00:00.

Current implementation status:

- Implemented: shared start screen, character selection, 5-round submarine survival flow, stage-specific enemies for stages 1-4, local sounds, localStorage state, `Command+D` on Mac / `Ctrl+D` on Windows reset.
- In progress: swapped final two stages so Chmirozon Prime is last, then validation.

Next step:

- Validate Super Brazio locally on `http://localhost:3004`, tune split-screen scale/physics/sounds, then wait for user testing feedback before deep polish.
