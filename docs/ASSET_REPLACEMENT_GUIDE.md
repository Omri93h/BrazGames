# Asset Replacement Guide

Custom assets should be local, lightweight, and easy to replace.

Real photos and sounds are added later only when explicitly provided and approved. Use placeholders in the repository until then.

## Suggested Asset Folder Shape

Each game can use a structure like:

```text
games/<game-name>/assets/
  images/
  audio/
  sprites/
  placeholders/
```

Use the simplest folder structure that fits the game. Do not create unnecessary layers.

## Image Formats

Recommended formats:

- `PNG` for transparent heads, characters, icons, and sprites.
- `WebP` for compressed photos or larger images.
- `JPG` only when transparency is not needed.

Transparent PNGs are especially useful for:

- Dor / groom head cutouts.
- Friend faces.
- Character overlays.
- Powerups.
- Obstacles.

## Asset Size

Keep assets lightweight so the games load quickly and run reliably on party laptops.

Suggested practice:

- Resize large photos before adding them.
- Avoid huge uncompressed audio or image files.
- Keep original high-resolution source files outside the runtime folder unless they are needed.

## Replacement Rules

Each game should document:

- Where images live.
- Required filenames or manifest fields.
- Recommended dimensions.
- Which assets can be safely replaced.
- Whether transparent backgrounds are expected.

Do not hard-code private assets into game logic. Keep funny content replaceable through files or small config manifests.

