# Memory Game Sounds

These are local-only generated sound effects and background music files. They do not require internet at runtime.

Current files:

- `card-flip.wav` - short card flip/click when a card is revealed.
- `match-fanfare.wav` - short trumpet-like win sting when a matching pair is found.
- `miss-buzzer.wav` - short fail buzzer when the cards do not match.
- `game-over-fanfare.wav` - short fanfare when the Memory game ends.
- `choose-your-fighter.mp3` - announcer call about one second before the staged character-select intro finishes.
- `fighter-reveals/` - three-part character-select reveal calls, used only when choosing a fighter.
- `fighter-card-opens/` - one-shot fighter sounds, used when that active fighter opens a Memory card.
- `music/arcade-01.mp3` through `music/arcade-04.mp3` - Memory-only background music playlist, played in order with crossfades and looped back to the first track.

Replacement rules:

- Keep filenames the same if you want to replace sounds without changing code.
- If replacing an effect file while keeping the same name, bump `SOUND_ASSET_VERSION` in `games/memory/game.js`.
- If replacing a background music file while keeping the same name, bump `MUSIC_ASSET_VERSION` in `games/memory/game.js`.
- Use short `WAV` or `MP3` files, ideally 0.3-1.5 seconds.
- Keep all sounds local and lightweight.
- Do not add private voice clips unless they are explicitly provided and approved.
