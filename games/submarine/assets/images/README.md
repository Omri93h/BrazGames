# Submarine Image Assets

Place future local image assets here.

The current game uses a manual asset manifest in:

```text
games/submarine/game.js
```

Look for `ASSET_MANIFEST`. If you change filenames, update that manifest too.

Current expected files:

```text
assets/images/backgrounds/dor_army.jpeg
assets/images/backgrounds/underwater-background.webp
assets/images/players/submarine-blue.png
assets/images/players/submarine-blue-damaged.png
assets/images/players/submarine-red.png
assets/images/players/submarine-red-damaged.png
assets/images/enemies/enemy-hunter.png
assets/images/enemies/enemy-heavy.png
assets/images/enemies/magami/magami_final.png
assets/images/enemies/chmirozon_prime/amazon.png
assets/images/enemies/chmirozon_prime/bezos_real.webp
assets/images/enemies/chmirozon_prime/bezos_southpark.webp
assets/images/enemies/the_revenge_of_the_exiled/maor.webp
assets/images/enemies/the_revenge_of_the_exiled/lior.webp
assets/images/enemies/the_revenge_of_the_exiled/mosko.webp
assets/images/enemies/the_revenge_of_the_exiled/tomer.webp
```

If a file is missing, the game falls back to the built-in Canvas placeholder drawing.

Recommended formats:

- `PNG` for transparent submarines and enemies.
- `WebP` or `JPG` for backgrounds.

Keep assets lightweight so the game runs reliably on party laptops.
