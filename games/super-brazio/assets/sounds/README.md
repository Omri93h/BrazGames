# Super Brazio Sounds

The current prototype uses the local vendored `meth-meth-method/super-mario` sounds and music.

Current shell-triggered sounds:

- Character-select-only arcade playlist: `assets/sounds/start-music/arcade-01.mp3` through `arcade-04.mp3`
- Damage/death: `vendor/meth-super-mario/audio/music/die.ogg`
- Victory: `vendor/meth-super-mario/audio/music/level-clear.ogg`
- Start intro announcer: `assets/sounds/choose-your-fighter.mp3`
- Fighter selection reveal sounds: `assets/sounds/fighter-reveals/*.mp3`

Current fighter reveal files:

```text
fighter-reveals/dor_reveal.mp3
fighter-reveals/gabo_reveal.mp3
fighter-reveals/magami_reveal.mp3
fighter-reveals/meser_reveal.mp3
fighter-reveals/miki_reveal.mp3
fighter-reveals/omri_reveal.mp3
fighter-reveals/pishuto_reveal.mp3
fighter-reveals/plato_reveal.mp3
```

The party sound swaps are intentional: Meser uses Gabo's assigned reveal sound, Magami uses Meser's currently assigned reveal sound, Pishoto uses Meser's original reveal file, Dor uses Miki's assigned reveal sound, Miki uses Dor's assigned reveal sound, and Gabo uses Magami's assigned reveal sound.

The original source sound manifests are under:

```text
games/super-brazio/vendor/meth-super-mario/sounds/
games/super-brazio/vendor/meth-super-mario/music/
```

Future replacement:

- Add approved local audio files here.
- Keep clips short and normalized.
- Keep `start-music/` for opening/character-select-only background music. It must stop before the pre-game modal/gameplay so it does not overlap the vendored Mario music.
- Do not rely on external audio URLs at runtime.
