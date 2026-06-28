# Submarine Sound Assets

These are local-only generated WAV/MP3 sound effects. They do not require internet at runtime.

Current files:

- `start-music/arcade-01.mp3` through `start-music/arcade-04.mp3` - opening/rules-only arcade playlist copied from Memory. It stops before the first stage countdown so stage music can take over cleanly.
- `submarine-hit-clash.wav` - metallic/watery clash when a submarine loses one heart.
- `submarine-eliminated.wav` - fallback underwater break/explosion for a third-hit elimination only if the surviving fighter reveal sound is unavailable.
- `round-start.mp3` - stage-start sound played at the exact moment the next-stage countdown ends and active gameplay starts.
- `stage-music/magami-song.mp3` - faded-in background song for Stage 1 `המגמים`, starting during that stage's countdown, continuing through elimination and round summary, and handing off only when the next-stage announcement appears.
- `stage-music/salty-antisemites-song.mp3` - faded-in background song for Stage 2 `אנטישמים מלוחים`, pre-trimmed from source 00:28 and started from file 00:00 during that stage's countdown, played at 80% of the shared stage-music volume, continuing through elimination and round summary, and handing off only when the next-stage announcement appears.
- `stage-music/la-familia-song.mp3` - faded-in background song for Stage 3 `לה פאמיליה`, pre-trimmed from source 00:20 and started from file 00:00 during that stage's countdown, continuing through elimination and round summary, and handing off only when the next-stage announcement appears.
- `stage-music/exiled-revenge-song.mp3` - faded-in background song for Stage 4 `The Revenge Of The Exiled` / `נקמת הגולים`, pre-trimmed from source 00:32 and started from file 00:00 during that stage's countdown, continuing through elimination and round summary, and handing off only when the next-stage announcement appears.
- `stage-music/chmirozon-prime-song.mp3` - faded-in background song for final Stage 5 `חמירוזון פריים`, starting from 00:00 during that stage's countdown and staying in the background through the final result screen.
- `game-over-fanfare.wav` - short fanfare when the match ends.
- `jackson-hee-hee.mp3` - loud two-hit arrival call, played about 1.6 seconds before each rare Michael Hitler / Adolf Jackson entry.
- `jackson-presence.mp3` - looping presence sound while the rare Michael Hitler / Adolf Jackson hunters are on screen.
- `choose-your-fighter.mp3` - announcer call about one second before the staged character-select intro finishes.

Replacement rules:

- Keep filenames the same if you want to replace sounds without changing code.
- If replacing a file while keeping the same name, bump `SOUND_ASSET_VERSION` in `games/submarine/game.js`.
- Opening playlist files live under `start-music/` and should remain opening/rules-only.
- Stage background songs live under `stage-music/`, start during the matching stage countdown, fade in, play at about 75% volume, continue through the elimination freeze and round summary, and hand off only when the next-stage announcement appears. They default to `00:00` unless a start offset is requested. When a start offset is requested, prefer pre-trimming the local file and keeping runtime playback at file `00:00` so browser audio seeking cannot start from the wrong point.
- Use short `WAV` or `MP3` files for effects, ideally 0.3-1.5 seconds. Stage music may be longer, but should stay local and reasonably lightweight.
- Keep all sounds local and lightweight.
- Do not add private voice clips unless they are explicitly provided and approved.
