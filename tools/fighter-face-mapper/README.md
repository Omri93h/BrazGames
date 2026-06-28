# Fighter Face Mapper

Local helper tool for marking face replacement boxes on animated fighter GIFs.

This is not a party game. It is an asset-preparation tool for Dor Bachelor Party Games.

## Run

```bash
cd tools/fighter-face-mapper
python3 server.py
```

Open:

```text
http://localhost:3006
```

To override the port:

```bash
python3 server.py 3006
```

## Workflow

1. Upload a fighter GIF, or click `טען Mario` to load the Super Brazio Mario preset from the local vendored spritesheet.
2. The local server extracts GIF frames into `sessions/<session-id>/frames/`.
3. Draw one rectangle around the face in each frame.
4. If a rectangle already exists, drag inside it to move the existing anchor without resizing it.
5. Use `הבא` / `הקודם` to move between frames.
6. Use `העתק קודם` when the face position barely changes.
7. Use `Shift + Arrow Keys` for 1px adjustments, or `Alt + Shift + Arrow Keys` for 5px adjustments.
8. Press `Save`.

The saved file is:

```text
tools/fighter-face-mapper/sessions/<session-id>/session.json
```

This JSON contains:

- original fighter filename
- natural frame size
- per-frame image paths
- per-frame `faceBox`
- mapping completeness summary

Important: `faceBox` is a placement anchor only. The compositor should align the unscaled face image to the bottom-center of the marked rectangle. Do not resize the face image during compositing.

## Rebuild a Fighter GIF

After a session is complete, rebuild a composited fighter with one fixed face size:

```bash
python3 tools/fighter-face-mapper/composite_from_session.py \
  --session tools/fighter-face-mapper/sessions/plato/session.json \
  --fighter assets/characters/fighters/gifs/plato.gif \
  --face assets/characters/faces/plato_face.webp \
  --out-full assets/characters/fighters/composited/plato_with_face.gif \
  --out-preview assets/characters/fighters/composited/plato_preview.gif \
  --face-size 272x397 \
  --crop 760x1080+250+840
```

Use `--flip-face` for characters whose source face must be mirrored, and `--offset X,Y` for a documented global correction after mapping. Copy the preview GIF into the game-specific `assets/images/characters/` folder and cache-bust the consuming HTML/JS references.

## Save Safety

Normal `Save` is strict:

- every frame must have a valid `faceBox`.
- if any frame is missing, the tool refuses to save and jumps to the first missing frame.
- the missing frame buttons show exactly what still needs mapping.
- the session dropdown also shows whether a session is complete or still missing frames.

Use `שמור טיוטה` only when you intentionally want to preserve incomplete work. Draft saves are marked as `draft` in `mappingSummary`.

The local server also validates saves, so an incomplete JSON cannot accidentally overwrite a session as if it were complete.

Before each server-side save, the previous `session.json` is backed up under:

```text
tools/fighter-face-mapper/sessions/<session-id>/backups/
```

The JSON is not something the user needs to manually save for Codex. Pressing `Save` or `שמור טיוטה` writes it locally to `sessions/<session-id>/session.json`, where Codex can read it directly.

## Super Brazio Mario Preset

Click `טען Mario` to create or load:

```text
tools/fighter-face-mapper/sessions/mario/session.json
```

The preset uses:

```text
games/super-brazio/vendor/meth-super-mario/sprites/mario.json
games/super-brazio/vendor/meth-super-mario/img/sprites.png
```

Each cropped Mario frame includes its original `sourceRect`, so the marked face anchors can later be composited back into the full Super Brazio spritesheet with Dor's face.

## Requirements

- Python 3
- ImageMagick available locally. The server first checks `PATH`, then falls back to `/opt/homebrew/bin` and `/usr/local/bin` for `magick` and `identify`.

No npm, no build step, no internet dependency.

## Notes

The saved `faceBox` coordinates are in the original frame coordinate space, not the displayed browser size. That makes them usable directly for future compositing.

Keep this tool separate from actual games. It should not add a new game to the approved project scope.
