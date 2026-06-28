# ICE_AGENT Sprite Prep

Expected source image:

- White background.
- Two horizontal rows.
- Row 1: `ICE_AGENT_1` walking frames.
- Row 2: `ICE_AGENT_2` walking frames.
- Same number of evenly spaced frames in each row.

The current source image has six frames per row. Run:

```bash
TARGET_FRAME_SIZE=24x24 games/super-brazio/tools/prepare-ice-agents.sh /path/to/source.png 6
```

Example:

```bash
TARGET_FRAME_SIZE=24x24 games/super-brazio/tools/prepare-ice-agents.sh /tmp/ice-agents.png 6
```

The script uses ImageMagick to:

- split the two rows;
- crop each row into frames;
- remove the white background with transparency;
- normalize every frame to the target transparent frame size;
- apply mild contrast, saturation, and sharpening so the agents read better after the Mario canvas is scaled up;
- export local transparent PNG strips;
- export preview GIFs;
- copy runtime PNG strips into the vendored Mario `img/` folder;
- generate matching vendor sprite JSON files.

For dry runs/tests without writing into the real vendor folder:

```bash
SUPER_BRAZIO_VENDOR_DIR=/tmp/super-brazio-vendor-test \
  games/super-brazio/tools/prepare-ice-agents.sh /path/to/source.png FRAMES_PER_ROW /tmp/ice-agent-output
```

Runtime files:

```text
games/super-brazio/assets/images/enemies/ice-agents/ice-agent-1-strip.png
games/super-brazio/assets/images/enemies/ice-agents/ice-agent-2-strip.png
games/super-brazio/assets/images/enemies/ice-agents/ice-agent-1-preview.gif
games/super-brazio/assets/images/enemies/ice-agents/ice-agent-2-preview.gif
games/super-brazio/assets/images/enemies/ice-agents/ice-agents-source.png
games/super-brazio/vendor/meth-super-mario/img/ice-agent-1.png
games/super-brazio/vendor/meth-super-mario/img/ice-agent-2.png
games/super-brazio/vendor/meth-super-mario/sprites/ice-agent-1.json
games/super-brazio/vendor/meth-super-mario/sprites/ice-agent-2.json
```

The runtime enemy factories and active level JSON now use `ICE_AGENT_1` and `ICE_AGENT_2` in worlds `1-1` and `brazio-2`. Current runtime frames are 24x24, with a code-drawn pixel `ICE` badge added by `IceAgent.js` so the label stays readable in-game without enlarging the enemy.
