# Super Brazio Assets

All Super Brazio runtime assets must be local.

Current prototype:

- The start screen uses `images/backgrounds/dor-burger-king-start.webp`, centered with `contain` over a filled background layer so the full photo remains visible.
- The start screen uses shared character face cards and fighter GIF previews from `images/characters/`.
- Active gameplay is loaded from the vendored `meth-meth-method/super-mario` repo under `../vendor/meth-super-mario/`.
- Gameplay sprites, level data, music, and sounds currently come from that local vendor copy.

Prepared folders:

```text
images/backgrounds/
images/characters/
images/players/
images/enemies/
images/items/
images/goals/
images/tiles/
sounds/
```

Use placeholders until real private photos or sounds are explicitly provided and approved.

Character assets currently include one face card and one fighter preview GIF for each approved roster member:

```text
dor
gabo
magami
messer
miki
omri
pishuto
plato
```

Keep face cards square-safe and fighter GIFs transparent/contained. CSS controls the displayed fighter size; do not rely on GIF intrinsic dimensions.

The local asset folders remain available for future Super Brazio-specific replacements.

Current player assets:

- `images/players/dor_mario_face.png` is the local Dor face cutout rendered over the original Mario body. The runtime mirrors it when Mario faces left.

Current goal assets:

- `images/goals/daniel_face.png` is the local Princess Daniel face cutout rendered on the code-native princess body in the Castle Finale.
