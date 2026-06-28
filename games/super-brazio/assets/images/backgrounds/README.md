# Super Brazio Backgrounds

Current file:

- `dor-burger-king-start.webp` - current local opening image for the shared party-style start screen. It is cropped about 25% from the original top so the middle/lower Burger King scene is emphasized, and it renders centered with `contain` over a filled background layer.
- `backups/dor-burger-king-start_20260627-before-top25-crop.webp` - backup of the full-height pre-crop image.

Replacement:

1. Add the new local background file to this folder.
2. Update `--start-bg-image` in `games/super-brazio/style.css`.
3. Add a cache-busting query string when replacing the file.

Recommended dimensions:

- Wide 16:9 image.
- WebP or SVG preferred.
- Keep the subject readable behind the title and character-select panels.
