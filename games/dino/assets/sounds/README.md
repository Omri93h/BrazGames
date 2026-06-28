# Dino Sound Assets

Local sounds for `הבריחה מבאר שבע` go here.

Current files:

- `choose-your-fighter.mp3` - announcer call about one second before the staged character-select intro finishes.
- `fighter-reveals/*.mp3` - per-character start-screen selection calls. These are mapped in `games/dino/game.js` and should only play on an actual character click, not on refresh or state restore.
- `background-music/arcade_5.mp3` through `background-music/arcade_8.mp3` - local Dino-only background playlist. The tracks start after the first browser-approved user gesture on the Dino screen, crossfade one after another, and loop from the fourth track back to the first.
- `gameplay/jump-boing.mp3` - short jump sound that plays only when a runner actually starts a jump.
- `gameplay/dino-death.mp3` - round-loss sound that plays once when a runner is eliminated.

Planned gameplay sound events:

- slide / duck
- hit obstacle
- point scored
- countdown
- game over

Keep sounds short, local, and lightweight.
