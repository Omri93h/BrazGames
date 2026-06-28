# Super Brazio Plan

Status: implementation started. First playable local prototype exists under `games/super-brazio/`.

Working title: `SUPER BRAZIO`

Game number: `משחק מספר 4`

Proposed URL: `http://localhost:3004`

Proposed folder: `games/super-brazio/`

Browser/Mario engine notes: `docs/games/SUPER_BRAZIO_ENGINE_NOTES.md`

User direction, 2026-06-16:

- This is the fourth and final approved game.
- It should be a Super Mario-style game called `SUPER BRAZIO`.
- The screen should be split in two like Dino.
- Each side should run a Mario-style platformer at the same time.
- There are no rounds.
- Whoever reaches the princess first wins.
- Start with one short level inspired by Super Mario's first level, shortened for party play.
- Plan first, document everything, then implement only after approval.

## Core Concept

`SUPER BRAZIO` is now a single-screen, side-scrolling platformer prototype with a classic first world and a longer castle finale world.

Both teams still choose their party character on the shared opening screen to preserve the party flow, but active gameplay now uses one full-screen Mario world instead of two simultaneous side-by-side worlds.

Both keyboard mappings control the same Mario instance:

- `החן יוספים, ועוזריהם`: `A` / `D` / `W`
- `הבראזים`: arrow keys

There are no rounds, score sets, or best-of flow. World `1-1` ends at the flag/pole, then fades into a longer castle finale world named `brazio-2`. Reaching Princess Daniel in `brazio-2` wins the game immediately.

## Recommended MVP

Build one reliable local platformer flow first.

The MVP should include:

- Shared Dor party-style opening screen.
- Character select using the existing two-team roster and visual pattern.
- One full-screen platformer instance.
- Both team control mappings routed into the same instance.
- A clear first-world flag/pole transition.
- A longer second-world Castle Finale with Princess Daniel and a Golden Visa / Green Card.
- Winner modal as soon as Mario reaches the finale finish.
- Restart/reset support.
- Local placeholder sprites and sounds.
- No external hosted assets at runtime.

Target level length:

- Around 45-75 seconds for a normal successful run.
- Short enough for party pacing.
- Long enough to include a few jumps, blocks, pipes/platforms, enemies, and a final sprint.

## Source Repo Direction

The user approved implementation after the planning pass.

The implementation should use an existing browser platformer/Mario-like engine only if it stays small enough to control. The best candidate should be chosen by a short local spike after approval.

Candidate ranking:

| Rank | Candidate | License / Notes | Complexity | Fit | Recommendation |
| --- | --- | --- | --- | --- | --- |
| 1 | `https://github.com/meth-meth-method/super-mario` | `package.json` says ISC. Vanilla JS tutorial project, local run with `npm install` and `npm start`. | Medium | Good learning-oriented code; likely easier to adapt into two canvas instances and replace assets. | Best first spike. |
| 2 | `https://github.com/reruns/mario` | MIT. Static Canvas clone. README explicitly notes Nintendo owns the original graphics, sounds, and design. | Medium | Closer to NES-style Mario, static files, includes engine concepts for viewport, entities, terrain, sprites. | Good fallback if Meth project is too incomplete. |
| 3 | `https://github.com/robertkleffner/mariohtml5` | Unlicense. Infinite Mario HTML5, Canvas/Audio. | Medium | Simple static repo, but infinite/random structure is less aligned with one curated short finale level. | Use only if the first two are unsuitable. |
| 4 | FullScreenMario forks | Creative Commons BY-NC-SA and DMCA history noted in README. Large modular architecture. | High | Too large and legally awkward for quick local party customization. | Avoid. |

Implementation outcome:

- `meth-meth-method/super-mario` was reviewed as the first source spike.
- It is now vendored locally under `games/super-brazio/vendor/meth-super-mario/`.
- The party shell originally ran two iframe instances of the vendored repo.
- On 2026-06-17 the user redirected the MVP to one screen because split-screen scaling and dual-instance behavior felt unstable.
- The party shell now runs one iframe instance of the vendored repo.
- Local patches adapt nested asset paths, autostart, parent keyboard bridging, and finish messages.
- Current local patches also make question-block mushrooms behave like deterministic power-ups: they play local appear/consume sounds, reverse direction on solid geometry, and resolve their type from each question block's explicit `mushroom` value in the level JSON.
- Red mushrooms grow Mario into the larger sprite/collision state until the next respawn. Green mushrooms trigger a temporary global three-band horizontal psychedelic wave post-processing effect across both active screens. Yellow mushrooms give that iframe's Mario a modest 10-second speed boost. Purple mushrooms invert left/right controls for that iframe's Mario for 10 seconds.
- The `1-1` ending now uses the flag/pole as a level transition, not as a win condition.
- The playable character now keeps the regular Mario sprite body and platformer physics, with Dor's local face cutout composited as a large overlay and mirrored during movement.
- The longer `brazio-2` finale world now uses castle tiles/music/patterns, multiple lava/wave gaps, raised platforms, pipe/bridge obstacles, extra ICE_AGENT enemies, an extended final castle run, and the Princess Daniel goal tile with Daniel's local face cutout as a large standalone face farther right near its ending; the win trigger is placed slightly before her so the player sees her and wins by getting close.

Source decision criteria:

- Can run fully offline from `localhost`.
- Can be vendored into `games/super-brazio/vendor/<source>/`.
- Can render one stable full-screen instance.
- Can accept a custom short level without rewriting the whole engine.
- Can run the Mario-style assets locally inside the party shell.
- Does not require a backend, online account, heavy build system, or fragile dependency chain.
- Allows local audio and image replacement.

Preferred implementation posture:

- Use the selected source as engine inspiration/vendor code.
- Wrap it in the Dor party app shell.
- Keep our code that coordinates start screen, single-screen gameplay, winner state, persistence, reset, and asset manifests outside the vendored engine.
- Keep the vendored repo runnable locally and isolate party-shell changes from vendor internals where possible.

## Start Screen

Use the shared `dor-party-game-style` opening-screen rules exactly.

Required opening-screen structure:

- Game number: `משחק מספר 4`.
- Main title: `SUPER BRAZIO`.
- Same staged intro pattern as the current games:
  - first screen shows the sharp opening image/placeholder and a compact `התחל` button.
  - first click reveals the title/team panels.
  - button returns as `התחל משחק`.
- Top title panel spans the full width.
- Middle has two team character-card panels:
  - `החן יוספים, ועוזריהם` on the left.
  - `הבראזים` on the right.
- Bottom three-column fighter/action/fighter row:
  - left selected fighter preview.
  - compact centered start button.
  - right selected fighter preview.
- Character cards stay in one horizontal row of four per team.
- Mouse-only character selection.
- Start disabled until both teams choose a character.
- Do not put fighter previews inside the team panels.
- Do not let GIF intrinsic dimensions control layout.
- Face cards and fighter preview GIFs are local under `games/super-brazio/assets/images/characters/`.
- Fighter reveal sounds are local under `games/super-brazio/assets/sounds/fighter-reveals/`.
- Opening arcade background music is local under `games/super-brazio/assets/sounds/start-music/`, plays only during character select, and stops before the pre-game modal/gameplay.
- Refresh while still on the start screen must clear temporary selected cards and fighter previews; refresh after rules/countdown/gameplay keeps the selected fighters.

Shared roster:

- `הבראזים`: `פישוטו`, `מיקי`, `דור`, `גבו`.
- `החן יוספים, ועוזריהם`: `מסר`, `מגמי`, `עומרי`, `פלטו`.

Opening-screen visual direction:

- Keep the same arcade/fighting-game selection layout as Memory, Submarine, and Dino.
- Give Super Brazio its own accent color, recommended: warm gold with green visa highlights.
- Add a real opening-image slot from day one:

```text
games/super-brazio/assets/images/backgrounds/dor-burger-king-start.webp
```

Suggested opening image concept:

- Pixel-art wedding/platformer castle scene.
- Dor/Brazio theme without copying Nintendo sprites.
- Princess Daniel / visa endpoint hinted in the background.

## Gameplay Layout

The active game screen now uses one full-screen playfield.

Current layout:

```text
┌──────────────────────────────────────────────┐
│ one full-screen Super Brazio platformer       │
│ WASD and arrows both control Mario            │
└───────────────────────┴──────────────────────┘
```

The active gameplay screen intentionally has no extra wrapper HUD, title strip, or race timer above the Mario frame. The vendored Mario HUD remains inside the iframe.

Debug layout:

- `?debug=1` shows a debug-only stage picker, then boots a single user into one iframe for fast local testing.
- `?debug=1&level=brazio-2` boots the single user directly into the castle finale.
- Debug mode must stay isolated from the normal party localStorage state.
- Debug death behavior should reduce iteration pain: Mario still flashes on death, but resumes near the last safe spot instead of the level checkpoint.

Important layout rules:

- The iframe should occupy the full gameplay viewport.
- The player should remain readable on projector.
- Avoid tiny original-Mario scale if it makes the action hard to see.
- The level camera scrolls with the single player.
- If the player dies/falls, the game freezes immediately and respawns from the last checkpoint.
- When Mario reaches Princess Daniel in `brazio-2`, freeze the game and show the winner modal.
- Future split-screen rule: when two active Mario screens return, green mushroom screen distortion is global. Either player collecting it should make both screens wavy/psychedelic together.

## Controls

This is a two-team keyboard game, so use the cross-game mapping.

`החן יוספים, ועוזריהם`:

- Move left/right: `A` / `D`
- Jump: `W`
- Run/action: `S` or `Left Shift` only if the selected engine requires it

`הבראזים`:

- Move left/right: left/right arrows
- Jump: up arrow
- Run/action: down arrow or `Right Shift` only if needed

Recommended MVP controls:

- left/right movement.
- jump.
- no crouch.
- no fireballs.
- no run button unless engine feel is bad without it.

Browser note:

- Test simultaneous key presses on the actual laptop keyboard before approval.
- If key ghosting appears, reduce controls to movement + jump and avoid optional action keys.

## Game Flow

1. Start screen with character select.
2. Both teams choose one character.
3. Press `התחל משחק`.
4. Show a 16-second pre-game modal with a circular loader and only the objective line `מי יגיע ראשון לנסיכה!?`.
5. Show the short vendor countdown.
6. One full-screen platformer instance starts.
7. Both control mappings can control the same Mario instance.
8. Falling into a pit or touching a dangerous enemy freezes the game immediately, then respawns from the last checkpoint.
9. Reaching the `1-1` flag/pole fades the canvas out, loads `brazio-2`, and fades back in.
10. Reaching Princess Daniel in `brazio-2` ends the entire game.
11. Winner modal appears.
12. `Command+D` on Mac or `Ctrl+D` on Windows opens confirmation reset/admin.

No starter raffle is needed.

No rounds. The finish line decides everything.

## Level Design

Internal level source:

- World 1: vendored Super Mario `1-1`, ending at the flag/pole transition.
- World 2: local longer Castle Finale level `brazio-2`, ending at Princess Daniel.

The first world should be a short, party-friendly remix of a classic first Mario level, not a full clone. It ends with a satisfying flag/pole moment, then transitions to the finale instead of resolving the whole game.

Recommended structure:

1. Safe start area with room to learn movement.
2. Two low blocks and one easy enemy.
3. Small pipe/platform jump.
4. Coin/visa paper trail that teaches the path.
5. One slightly harder gap.
6. Checkpoint gate around 40-50% of the level.
7. Short enemy/platform section.
8. Final staircase or ramp.
9. Flag/pole transition to world 2.

The second world should be longer than the original finale but still focused, and should read as a distinct castle finale rather than a second overworld:

1. Safe spawn after fade-in.
2. Several readable ICE_AGENT enemies.
3. A pipe/gap/platform rhythm.
4. Dark castle/lava bridge stretches.
5. An extended final castle run with another pipe/gap/bridge rhythm and no ordinary blocks placed inside mandatory jump arcs.
6. Princess Daniel + Golden Visa / Green Card finish after the final bridge.

Difficulty goals:

- First 10 seconds should be forgiving.
- One or two mistakes should not end the game.
- Respawns should be fast.
- The second-world spawn must stay outside castle entrance-stair collision and must support both small and large Mario after the first-world transition.
- The better player should usually win, but the weaker player should still feel alive.
- Avoid long dead time after failure.

Level length target:

- About 150-220 in-engine tiles, depending on candidate engine scale.
- Roughly 45-75 seconds for a clean run.
- 1 checkpoint only for MVP.

## Characters And Theme

Player character:

- The runtime character can be a local placeholder `Brazio`.
- Selected party character name appears in HUD and winner modal.
- Later, selected character face/head can be composited onto the platformer sprite, but that is not required for MVP.

End goal:

- Princess Daniel waits farther right at the end of `brazio-2`, not at the end of `1-1`.
- The end object includes a Golden Visa / Green Card.
- Getting close to the princess/visa endpoint wins; Mario should not need to pass through or touch Princess Daniel.

Theme replacements:

- Coins can become dollars, visa stamps, green cards, or papers.
- Mushrooms/powerups can become Amazon-ish packages or visa boosts in a later reskin.
- Enemies now use generated `ICE_AGENT_1` and `ICE_AGENT_2` walking sprites from the user-provided two-row, six-frame source image.
- Flagpole can become a visa gate, embassy desk, chuppah/castle gate, or green-card arch.

## Mushroom Colors

The current playable game has deterministic red, green, yellow, and purple mushrooms. Do not use random selection; each question block must define its own `mushroom` value in the level JSON.

Current mushroom behaviors:

- Red mushroom: grows Mario into the larger sprite/collision state.
- Green mushroom: triggers the temporary three-band psychedelic wave screen effect instead of growing Mario. In split-screen play, either player collecting one should trigger the effect on both active screens.
- Yellow mushroom: gives the collecting iframe's Mario a modest 10-second horizontal speed boost, then restores the original movement tuning.
- Purple mushroom: inverts the collecting iframe's left/right controls for 10 seconds, then restores normal controls without leaving stale movement input behind.

Candidate future colors:

- Blue mushroom: ice/float effect. Temporarily lowers gravity, adds slightly slippery acceleration, or gives one easier jump sequence.
- Black mushroom: danger/trap. Brief blackout, enemy-speed pressure, or screen-darkening hazard; it should punish but not instantly kill without warning.
- White mushroom: shield. Gives one-hit grace, clears a bad effect, or protects from the next ICE_AGENT side contact.
- Gold mushroom: finale boost. Short celebratory invulnerability/speed burst near the castle finale, with a clear victory-adjacent sound.

Design rules for new mushroom colors:

- Every color needs a clear pickup sound, visual cue, duration, and end state.
- Effects must not reload the iframe, replace the canvas, or trigger the parent hard-reboot path.
- Screen effects should be canvas/lightweight shader-style work, not heavy CSS blur/filter effects that stall gameplay.
- Global screen effects such as green or future black should affect both players at once, even if only one player collected the mushroom. Local movement effects such as yellow and purple stay scoped to the collecting iframe.
- Temporary control effects must clear safely on death, level transition, and effect expiry. Purple inversion must release the same direction that was activated on keydown, not recalculate release direction later.
- All colors should be selectable or reachable in debug mode for fast validation.
- If a mushroom color fails to resolve, the safe fallback should be a normal red mushroom or no spawn, not a broken tile/entity.

## Assets

Expected folder shape:

```text
games/super-brazio/assets/
  images/
    backgrounds/
    players/
    enemies/
    items/
    goals/
    tiles/
  sounds/
  README.md
```

Asset rules:

- No external hosted assets at runtime.
- Use placeholders until real private assets are explicitly provided and approved.
- Do not commit real private photos/sounds without explicit approval.
- Avoid committing Nintendo-owned Mario sprites, music, or sound rips as final project assets.
- If a candidate source repo contains recognizable Mario assets, treat them as temporary spike/vendor assets only until replaced.
- Keep every replacement path documented.

Recommended placeholder assets:

- `players/brazio-idle.png`
- `players/brazio-run.png`
- `players/brazio-jump.png`
- `goals/princess-daniel-placeholder.png`
- `goals/golden-visa.png`
- `items/coin-dollar.png`
- `items/visa-paper.png`
- `enemies/bureaucracy-stamp.png`
- `enemies/rent-monster.png`
- `enemies/ice-agents/ice-agent-1-strip.png`
- `enemies/ice-agents/ice-agent-2-strip.png`
- `enemies/ice-agents/ice-agent-1-preview.gif`
- `enemies/ice-agents/ice-agent-2-preview.gif`
- `tiles/ground.png`
- `tiles/block.png`
- `tiles/pipe.png`
- `backgrounds/dor-burger-king-start.webp` rendered centered with `contain` over a filled background layer so the full photo remains visible.
- `backgrounds/level-1-bg.webp`

## Sounds

The game should feel fully sounded and should use the local vendored repo's music/sound hooks.

Recommended sound events:

- `theme-loop`
- `jump`
- `coin`
- `powerup`
- `stomp`
- `bump-block`
- `break-block`
- `pipe`
- `checkpoint`
- `damage`
- `fall`
- `respawn`
- `hurry`
- `finish`
- `win`
- `reset-open`

Sound source plan:

- The approved engine includes audio and music; keep those local under the vendor folder.
- Keep any future replacement sounds short, normalized, and replaceable.
- The music loop should be optional/mutable because continuous music can become too loud during party play.

Expected folder:

```text
games/super-brazio/assets/sounds/
```

Expected documentation:

```text
games/super-brazio/assets/sounds/README.md
```

## Persistence / Reset

Use a Super Brazio-specific localStorage key:

```text
dor-bachelor-super-brazio-state-v1
```

Required persistence behavior:

- Refresh while still on the start screen clears temporary character selections and fighter previews.
- Refresh after rules/countdown/live gameplay restores the checkpoint with selected characters preserved.
- If refresh happens during live gameplay, restart the game from the pre-game countdown with selected characters preserved.
- The parent shell waits for the vendored iframe `ready` message before starting the visible countdown. Failed or timed-out vendor boots hard-reboot the iframe with a versioned path and cache-busted URL until gameplay loads; do not show a terminal `תקלה` state.
- Do not attempt exact mid-jump or mid-level restoration for MVP.
- The saved state includes the current level so refresh during `brazio-2` reloads directly into the finale world after the vendor readiness countdown.
- When the game is over, refresh should preserve the winner modal until reset/start-over.
- `?init=1` clears only the Super Brazio storage key.
- `Command+D` on Mac or `Ctrl+D` on Windows opens a confirmation reset/admin popup.
- There is no reset password. The popup asks `האם אתה בטוח?`, and confirming clears only Super Brazio state and reloads the page to the start screen. The gameplay screen has a small top-left `איפוס` button with the same confirmation popup.
- The winner screen has an `איפוס משחק` button that clears only Super Brazio state and reloads the page to the start screen immediately, without an extra confirmation prompt.
- Reset clears only Super Brazio state.
- Do not clear Memory, Submarine, or Dino state.
- No visible reset button in the normal party UI unless explicitly requested.

## Technical Architecture

Preferred shape:

```text
games/super-brazio/
  index.html
  style.css
  game.js
  README.md
  assets/
  vendor/
```

Recommended modules/ownership:

- `index.html`: start screen, one game iframe container, modals.
- `style.css`: shared party start screen, full-screen playfield, winner/reset modals.
- `game.js`: Dor party shell, state machine, input routing, persistence, reset, audio hook setup.
- `vendor/<candidate>/`: approved source repo code copied locally after approval.
- optional `super-brazio-engine-adapter.js`: thin wrapper around the chosen engine if we later move away from iframe embedding.

Important engineering decisions:

- Use one iframe for the current MVP because it is simpler and more stable than dual instances.
- Route both team keyboard mappings into the same game iframe.
- Prevent one engine instance from owning global keyboard handlers if possible.
- If the source engine is global-heavy, wrap or patch it during the spike before committing to it.
- Keep the Dor party shell independent from source repo internals.

## Engine Risks

Main technical risk:

- Many Mario clones assume one global player, one global canvas, one global keyboard state, and one global audio player.

Resolved MVP direction:

1. Run only one game instance.
2. Route both team control sets into that one instance.
3. Keep level progress, pole transition, and finish detection in the iframe.
4. Trigger damage/win sounds from the party shell.
5. Keep the canvas full-screen so scaling is readable.

Fallback options:

- If source engines are too tangled, implement a small custom platformer using Canvas and tile collision, scoped to one short level only.
- If exact Mario-like physics become a time sink, prioritize reliable party gameplay over perfect Mario fidelity.

## Implementation Blocks After Approval

Block 1: source spike

- Clone or download only the approved candidate(s).
- Verify license and run instructions.
- Run locally.
- Confirm offline behavior.
- Identify entry point, asset loading, audio hooks, input hooks, level format, and finish condition.
- Decide whether to vendor/adapt or abandon.

Block 2: Super Brazio skeleton

- Create `games/super-brazio/`.
- Add static app files and asset folders.
- Add README and asset/sound READMEs.
- Add shared opening screen using `dor-party-game-style`.
- Add localStorage and `Command+D` on Mac / `Ctrl+D` on Windows reset shell.
- Serve on `http://localhost:3004`.

Block 3: one platformer instance

- Integrate the selected engine or minimal custom engine.
- Run the two-world local flow.
- Keep the vendored source assets working locally.
- Hook finish condition to Princess Daniel / Golden Visa endpoint.

Block 4: single-screen gameplay

- Create one platformer instance.
- Route controls:
  - `WASD` for `החן יוספים, ועוזריהם`.
  - arrows for `הבראזים`.
- Both mappings control the same Mario instance.
- Freeze gameplay when Mario reaches the finish.
- Add winner modal.

Block 5: party polish

- Add final placeholder theme assets.
- Add 8-bit inspired local sounds.
- Tune camera scale, jump feel, enemy spacing, checkpoint, and respawn timing.
- Add mute/volume handling if needed.
- Visual QA on projector-like desktop viewport.

Block 6: validation docs

- Update `games/super-brazio/README.md`.
- Update asset and sound replacement docs.
- Update run-all instructions.
- Add manual test checklist.

## Manual Validation Checklist For First Playable Version

1. Open `http://localhost:3004`.
2. Start screen shows `משחק מספר 4`.
3. Title says `SUPER BRAZIO`.
4. Start screen matches the shared arcade style.
5. החן יוספים, ועוזריהם are on the left.
6. הבראזים are on the right.
7. Each team has four character cards in one row.
8. Character selection works with mouse only.
9. Start button is disabled until both teams select a character.
10. Clicking start opens one full-screen Mario game.
11. The frame fills the gameplay viewport without a large black bottom area.
12. `A`, `D`, `W` control Mario.
13. Left/right/up arrows also control the same Mario.
14. The single frame starts on the Super Mario `1-1` level.
15. Player scale is readable on the projector viewport.
16. Camera scroll works for the single player.
17. Falling or taking damage freezes immediately and respawns from the checkpoint.
18. Checkpoint works after the midpoint.
19. Reaching the `1-1` flag/pole fades out, loads `brazio-2`, and fades back in.
20. Refresh during `brazio-2` restores to the finale world after the vendor readiness countdown.
21. Getting close to Princess Daniel / Golden Visa in `brazio-2` wins immediately before Mario passes or touches her.
22. Winner modal freezes the game and shows a clear victory message.
23. Sounds play for jump, coin/item, damage/fall, checkpoint, power-down, world clear, and win.
24. Sound volume is acceptable and not painfully loud.
25. Refresh during live gameplay returns to a safe pre-game countdown with selected characters preserved, waits for vendor readiness, hard-reboots failed iframe boots, and never leaves the player stuck on the internal `LOADING 1-1...`, `LOADING brazio-2...`, or `תקלה` screen.
26. Refresh after win preserves the winner state.
27. `Command+D` on Mac or `Ctrl+D` on Windows opens confirmation reset/admin.
28. The reset popup asks `האם אתה בטוח?` and does not ask for a password.
29. Confirming reset clears only Super Brazio state.
30. `?init=1` clears only Super Brazio state.
31. Memory/Submarine/Dino localStorage keys are untouched.
32. No external network requests are required during runtime.
33. Browser console has no errors.

## Open Approval Questions

1. Should the first level use one checkpoint, or should it be pure one-run play with no checkpoints?
2. Do we want exact Mario-like sounds temporarily during local testing, or only 8-bit inspired replacement sounds from the beginning?

## Known Risks

- The vendored Mario engine still uses global browser state inside its iframe, so keep embedding simple.
- Keyboard ghosting may affect some simultaneous movement/jump combinations.
- Full-screen stretching may distort the original 4:3 canvas, but it is more readable and avoids the large black bottom area from half-screen play.
- A level that is too long will drag; a level that is too short may feel anticlimactic.
- Exact Mario feel is less important than reliable, funny, projector-readable party gameplay.
