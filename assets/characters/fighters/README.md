# Shared Fighter GIF Assets

This folder stores local fighter-style GIF assets for Dor Bachelor Party Games.

These assets are for future character-select / idle-animation / head-overlay work only. They do not add a new game and they are not wired into gameplay yet.

## Folder Layout

- `gifs/` contains the normalized local GIF filenames used by the project.
- `fighter_manifest.json` maps each GIF to a character/team and stores first-pass per-frame face anchors.
- `previews/` contains generated preview PNGs with a green rectangle around the estimated face area.

## Current GIFs

| Character | Team | GIF | Original file |
| --- | --- | --- | --- |
| מגמי | החן יוספים, ועוזריהם | `gifs/magami.gif` | `MAGAMI_FIGHTER.gif` |
| עומרי | החן יוספים, ועוזריהם | `gifs/omri.gif` | `OMRI_FIGHTER.gif` |
| מסר | החן יוספים, ועוזריהם | `gifs/meser.gif` | `MESSER_FIGHTER.gif` |
| פלטו | החן יוספים, ועוזריהם | `gifs/plato.gif` | `PLATO_FIGHTER.gif` |
| מיקי | הבראזים | `gifs/miki.gif` | `MIKI_FIGHTER.gif` |
| דור | הבראזים | `gifs/dor.gif` | `DOR_FIGHTER.gif` |
| גבו | הבראזים | `gifs/gabo.gif` | `GABO_FIGHTER.gif` |
| פישוטו | הבראזים | `gifs/pishuto.gif` | `PISHOTO_FIGHTER.gif` |

## Face Anchor Notes

The anchors in `fighter_manifest.json` are rough automatic estimates based on each frame's trimmed sprite bounds. They are intended as a starting point for future head replacement.

When real head images are added later:

1. Use the preview PNGs to check whether each green box sits on the fighter's face.
2. Tune `estimatedFaceBox` values in `fighter_manifest.json` if needed.
3. Keep the GIFs local and do not depend on external hosted assets.

Do not use these files to introduce a new Fighting Game unless that game is explicitly re-approved for the project scope.

Alias rule: legacy names for Pishoto must never be shown. The displayed/project name is always `פישוטו` in Hebrew and `Pishoto` in English-facing text.
