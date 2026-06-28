#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  games/super-brazio/tools/prepare-ice-agents.sh INPUT_IMAGE FRAMES_PER_ROW [OUTPUT_DIR]

Example:
  games/super-brazio/tools/prepare-ice-agents.sh /tmp/ice-agents.png 6
  TARGET_FRAME_SIZE=24x24 games/super-brazio/tools/prepare-ice-agents.sh /tmp/ice-agents.png 6

Assumptions:
  - INPUT_IMAGE has a white background.
  - Row 1 is ICE_AGENT_1 walking frames.
  - Row 2 is ICE_AGENT_2 walking frames.
  - Each row has the same number of evenly spaced frames.
  - Output frames are normalized to TARGET_FRAME_SIZE, default 24x24.

Outputs:
  - assets/images/enemies/ice-agents/ice-agent-1-strip.png
  - assets/images/enemies/ice-agents/ice-agent-2-strip.png
  - assets/images/enemies/ice-agents/ice-agent-1-preview.gif
  - assets/images/enemies/ice-agents/ice-agent-2-preview.gif
  - vendor/meth-super-mario/img/ice-agent-1.png
  - vendor/meth-super-mario/img/ice-agent-2.png
  - vendor/meth-super-mario/sprites/ice-agent-1.json
  - vendor/meth-super-mario/sprites/ice-agent-2.json
USAGE
}

if [[ $# -lt 2 || $# -gt 3 ]]; then
  usage
  exit 1
fi

input_image=$1
frames_per_row=$2
output_dir=${3:-games/super-brazio/assets/images/enemies/ice-agents}
vendor_dir=${SUPER_BRAZIO_VENDOR_DIR:-games/super-brazio/vendor/meth-super-mario}
target_size=${TARGET_FRAME_SIZE:-24x24}

if [[ ! -f "$input_image" ]]; then
  echo "Input image not found: $input_image" >&2
  exit 1
fi

if ! command -v magick >/dev/null 2>&1; then
  echo "ImageMagick 'magick' is required." >&2
  exit 1
fi

if ! [[ "$frames_per_row" =~ ^[0-9]+$ ]] || [[ "$frames_per_row" -lt 1 ]]; then
  echo "FRAMES_PER_ROW must be a positive integer." >&2
  exit 1
fi

if ! [[ "$target_size" =~ ^[0-9]+x[0-9]+$ ]]; then
  echo "TARGET_FRAME_SIZE must look like 24x24." >&2
  exit 1
fi

target_width=${target_size%x*}
target_height=${target_size#*x}

mkdir -p "$output_dir" "$vendor_dir/img" "$vendor_dir/sprites"
work_dir=$(mktemp -d)
trap 'rm -rf "$work_dir"' EXIT

width=$(magick identify -format '%w' "$input_image")
height=$(magick identify -format '%h' "$input_image")
row_height=$((height / 2))
frame_width=$((width / frames_per_row))

if [[ "$row_height" -lt 1 || "$frame_width" -lt 1 ]]; then
  echo "Image is too small for $frames_per_row frames per row." >&2
  exit 1
fi

for agent_index in 1 2; do
  row_y=$(( (agent_index - 1) * row_height ))
  agent_name="ice-agent-${agent_index}"
  frame_dir="$work_dir/$agent_name"
  mkdir -p "$frame_dir"

  for ((frame_index = 0; frame_index < frames_per_row; frame_index++)); do
    frame_x=$((frame_index * frame_width))
    frame_number=$((frame_index + 1))
    magick "$input_image" \
      -crop "${frame_width}x${row_height}+${frame_x}+${row_y}" +repage \
      -fuzz 8% -transparent white \
      -trim +repage \
      -alpha set \
      -channel RGB -contrast-stretch 0.5%x0.5% -modulate 106,116,100 +channel \
      -background none -gravity center -filter Mitchell -resize "${target_width}x${target_height}>" \
      -unsharp 0x0.45+0.85+0.01 \
      -extent "${target_width}x${target_height}" \
      "$frame_dir/frame-${frame_number}.png"
  done

  magick "$frame_dir"/frame-*.png +append "$output_dir/${agent_name}-strip.png"
  cp "$output_dir/${agent_name}-strip.png" "$vendor_dir/img/${agent_name}.png"
  magick -delay 10 -dispose Background "$frame_dir"/frame-*.png -loop 0 "$output_dir/${agent_name}-preview.gif"

  frames_json=""
  animation_frames=""
  for ((frame_index = 0; frame_index < frames_per_row; frame_index++)); do
    frame_number=$((frame_index + 1))
    frame_name="walk-${frame_number}"
    frame_x=$((frame_index * target_width))
    comma=","
    if [[ "$frame_index" -eq $((frames_per_row - 1)) ]]; then
      comma=""
    fi
    frames_json="${frames_json}        { \"name\": \"${frame_name}\", \"rect\": [${frame_x}, 0, ${target_width}, ${target_height}] }${comma}"$'\n'
    animation_frames="${animation_frames}            \"${frame_name}\"${comma}"$'\n'
  done

  cat > "$vendor_dir/sprites/${agent_name}.json" <<JSON
{
    "imageURL": "/img/${agent_name}.png",

    "frames": [
${frames_json}    ],

    "animations": [
        {
            "name": "walk",
            "frameLen": 0.12,
            "frames": [
${animation_frames}            ]
        }
    ]
}
JSON
done

echo "Prepared ICE_AGENT assets in $output_dir and $vendor_dir."
