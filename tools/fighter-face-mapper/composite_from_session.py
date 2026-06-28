#!/usr/bin/env python3
"""Composite a fixed-size face onto a fighter GIF from a saved Face Mapper session."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


FALLBACK_BIN_DIRS = (Path("/opt/homebrew/bin"), Path("/usr/local/bin"))


def resolve_binary(name: str) -> str:
    found = shutil.which(name)
    if found:
        return found
    for directory in FALLBACK_BIN_DIRS:
        candidate = directory / name
        if candidate.exists() and candidate.is_file():
            return str(candidate)
    raise SystemExit(f"Missing required binary: {name}")


def parse_size(value: str) -> tuple[int, int]:
    try:
      width, height = value.lower().split("x", 1)
      return int(width), int(height)
    except ValueError as exc:
      raise argparse.ArgumentTypeError("Expected WIDTHxHEIGHT, for example 272x397") from exc


def parse_offset(value: str) -> tuple[int, int]:
    try:
      x, y = value.split(",", 1)
      return int(x), int(y)
    except ValueError as exc:
      raise argparse.ArgumentTypeError("Expected X,Y, for example 0,-8") from exc


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--session", required=True, type=Path)
    parser.add_argument("--fighter", required=True, type=Path)
    parser.add_argument("--face", required=True, type=Path)
    parser.add_argument("--out-full", required=True, type=Path)
    parser.add_argument("--out-preview", required=True, type=Path)
    parser.add_argument("--face-size", required=True, type=parse_size)
    parser.add_argument("--crop", required=True, help="ImageMagick crop geometry, for example 760x1080+250+840")
    parser.add_argument("--offset", default=(0, 0), type=parse_offset)
    parser.add_argument("--flip-face", action="store_true")
    args = parser.parse_args()

    magick = resolve_binary("magick")
    session = json.loads(args.session.read_text(encoding="utf-8"))
    frames = sorted(session["frames"], key=lambda frame: frame["frame"])
    face_width, face_height = args.face_size
    offset_x, offset_y = args.offset

    args.out_full.parent.mkdir(parents=True, exist_ok=True)
    args.out_preview.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.TemporaryDirectory(prefix="fighter-composite-") as tmp:
      tmp_path = Path(tmp)
      extracted_pattern = tmp_path / "source_%03d.png"
      run([magick, str(args.fighter), "-coalesce", str(extracted_pattern)])

      face_path = tmp_path / "face.png"
      face_command = [magick, str(args.face), "-resize", f"{face_width}x{face_height}!"]
      if args.flip_face:
          face_command.append("-flop")
      face_command.append(str(face_path))
      run(face_command)

      output_frames: list[Path] = []
      for frame in frames:
          frame_index = int(frame["frame"])
          face_box = frame["faceBox"]
          source_frame = tmp_path / f"source_{frame_index:03d}.png"
          output_frame = tmp_path / f"composited_{frame_index:03d}.png"
          x = round(face_box["x"] + (face_box["width"] / 2) - (face_width / 2) + offset_x)
          y = round(face_box["y"] + face_box["height"] - face_height + offset_y)
          run([
              magick,
              str(source_frame),
              str(face_path),
              "-geometry",
              f"+{x}+{y}",
              "-composite",
              str(output_frame),
          ])
          output_frames.append(output_frame)

      delay = str(int(frames[0].get("delayCs", 20)))
      run([
          magick,
          "-dispose",
          "Background",
          "-delay",
          delay,
          *map(str, output_frames),
          "-loop",
          "0",
          str(args.out_full),
      ])
      run([
          magick,
          str(args.out_full),
          "-coalesce",
          "-crop",
          args.crop,
          "+repage",
          "-dispose",
          "Background",
          str(args.out_preview),
      ])

    print(f"Wrote {args.out_full}")
    print(f"Wrote {args.out_preview}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
