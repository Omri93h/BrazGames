#!/usr/bin/env python3
"""Local-only helper for marking face boxes on fighter GIF frames."""

from __future__ import annotations

import base64
import json
import os
import re
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse


TOOL_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = TOOL_DIR.parents[1]
SESSIONS_DIR = TOOL_DIR / "sessions"
SUPER_BRAZIO_VENDOR_DIR = PROJECT_ROOT / "games" / "super-brazio" / "vendor" / "meth-super-mario"
DEFAULT_PORT = 3005
IMAGEMAGICK_BINARY_NAMES = {
    "magick": ("magick", "/opt/homebrew/bin/magick", "/usr/local/bin/magick"),
    "identify": ("identify", "/opt/homebrew/bin/identify", "/usr/local/bin/identify"),
}


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9_-]+", "-", value).strip("-").lower()
    return slug or "fighter"


def safe_session_path(session_id: str) -> Path:
    safe_id = slugify(session_id)
    path = (SESSIONS_DIR / safe_id).resolve()
    if SESSIONS_DIR.resolve() not in path.parents and path != SESSIONS_DIR.resolve():
        raise ValueError("Invalid session id")
    return path


def resolve_binary(binary_name: str) -> str | None:
    for candidate in IMAGEMAGICK_BINARY_NAMES.get(binary_name, (binary_name,)):
        resolved = shutil.which(candidate) if "/" not in candidate else candidate
        if resolved and Path(resolved).exists():
            return resolved
    return None


def run(command: list[str]) -> str:
    return subprocess.check_output(command, text=True, stderr=subprocess.STDOUT)


def valid_face_box(box: object) -> bool:
    if not isinstance(box, dict):
        return False
    try:
        return (
            float(box["width"]) > 4
            and float(box["height"]) > 4
            and float(box["x"]) >= 0
            and float(box["y"]) >= 0
        )
    except (KeyError, TypeError, ValueError):
        return False


def mapping_summary(data: dict) -> dict:
    frames = data.get("frames", [])
    missing_frames = [
        frame.get("frame", index)
        for index, frame in enumerate(frames)
        if not valid_face_box(frame.get("faceBox"))
    ]
    return {
        "frameCount": len(frames),
        "mappedFrameCount": len(frames) - len(missing_frames),
        "missingFrames": missing_frames,
        "complete": bool(frames) and len(missing_frames) == 0,
    }


class FaceMapperHandler(SimpleHTTPRequestHandler):
    server_version = "DorFaceMapper/1.0"

    def translate_path(self, path: str) -> str:
        parsed_path = unquote(urlparse(path).path)
        if parsed_path.startswith("/sessions/"):
            relative = parsed_path.removeprefix("/sessions/")
            return str((SESSIONS_DIR / relative).resolve())
        return str((TOOL_DIR / parsed_path.lstrip("/")).resolve())

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/sessions":
            self.write_json(self.list_sessions())
            return

        if parsed.path.startswith("/api/session/"):
            session_id = parsed.path.removeprefix("/api/session/")
            self.send_session(session_id)
            return

        if parsed.path == "/":
            self.path = "/index.html"

        super().do_GET()

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/upload":
            self.handle_upload()
            return

        if parsed.path.startswith("/api/preset/"):
            preset_id = parsed.path.removeprefix("/api/preset/")
            self.handle_preset(preset_id)
            return

        if parsed.path.startswith("/api/session/"):
            session_id = parsed.path.removeprefix("/api/session/")
            self.save_session(session_id)
            return

        self.send_error(HTTPStatus.NOT_FOUND, "Unknown endpoint")

    def read_json_body(self) -> dict:
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length).decode("utf-8")
        return json.loads(raw)

    def write_json(self, payload: dict | list, status: HTTPStatus = HTTPStatus.OK) -> None:
        encoded = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def list_sessions(self) -> list[dict]:
        if not SESSIONS_DIR.exists():
            return []

        sessions = []
        for session_file in sorted(SESSIONS_DIR.glob("*/session.json")):
            try:
                data = json.loads(session_file.read_text(encoding="utf-8"))
                summary = data.get("mappingSummary") or mapping_summary(data)
                sessions.append({
                    "id": data["id"],
                    "sourceFilename": data.get("sourceFilename", ""),
                    "frameCount": len(data.get("frames", [])),
                    "updatedAt": data.get("updatedAt", ""),
                    "mappingSummary": summary,
                })
            except (OSError, json.JSONDecodeError, KeyError):
                continue
        return sessions

    def send_session(self, session_id: str) -> None:
        session_path = safe_session_path(session_id)
        session_file = session_path / "session.json"
        if not session_file.exists():
            self.send_error(HTTPStatus.NOT_FOUND, "Session not found")
            return

        self.write_json(json.loads(session_file.read_text(encoding="utf-8")))

    def handle_upload(self) -> None:
        magick_path = resolve_binary("magick")
        identify_path = resolve_binary("identify")
        if magick_path is None or identify_path is None:
            self.write_json({
                "error": "ImageMagick was not found. Install it, or make sure `magick` and `identify` are available in PATH, /opt/homebrew/bin, or /usr/local/bin.",
            }, HTTPStatus.INTERNAL_SERVER_ERROR)
            return

        try:
            payload = self.read_json_body()
            filename = payload["filename"]
            data_url = payload["dataUrl"]
            session_id = slugify(payload.get("sessionId") or Path(filename).stem)
            session_path = safe_session_path(session_id)
            frames_path = session_path / "frames"
            originals_path = session_path / "originals"
            shutil.rmtree(session_path, ignore_errors=True)
            frames_path.mkdir(parents=True, exist_ok=True)
            originals_path.mkdir(parents=True, exist_ok=True)

            encoded = data_url.split(",", 1)[1] if "," in data_url else data_url
            original_file = originals_path / filename
            original_file.write_bytes(base64.b64decode(encoded))

            run([magick_path, str(original_file), "-coalesce", "+repage", str(frames_path / "frame_%03d.png")])
            delays = [int(value) for value in run([identify_path, "-format", "%T\n", str(original_file)]).splitlines() if value.strip().isdigit()]
            first_frame = frames_path / "frame_000.png"
            width, height = [
                int(value)
                for value in run([identify_path, "-format", "%w %h\n", str(first_frame)]).strip().split()
            ]
            frames = []
            for index, frame_path in enumerate(sorted(frames_path.glob("frame_*.png"))):
                frames.append({
                    "frame": index,
                    "src": f"/sessions/{session_id}/frames/{frame_path.name}",
                    "delayCs": delays[index] if index < len(delays) else None,
                    "faceBox": None,
                })

            data = {
                "schemaVersion": 1,
                "id": session_id,
                "sourceFilename": filename,
                "naturalSize": {"width": width, "height": height},
                "facePlacementMode": "fixed-size-bottom-center",
                "frames": frames,
                "mappingSummary": {
                    "frameCount": len(frames),
                    "mappedFrameCount": 0,
                    "missingFrames": [frame["frame"] for frame in frames],
                    "complete": False,
                    "status": "draft",
                },
                "compositorNotes": "Use one fixed face size for all frames. Face boxes are placement anchors only.",
                "notes": "Draw one face anchor box per frame, then save. The box is for bottom-center placement only; face images must not be resized by the compositor.",
            }
            (session_path / "session.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            self.write_json(data)
        except Exception as exc:  # noqa: BLE001 - local debug helper should report exact failure.
            self.write_json({"error": str(exc)}, HTTPStatus.INTERNAL_SERVER_ERROR)

    def handle_preset(self, preset_id: str) -> None:
        preset_id = slugify(preset_id)
        if preset_id != "mario":
            self.write_json({"error": f"Unknown preset: {preset_id}"}, HTTPStatus.NOT_FOUND)
            return

        try:
            session = self.ensure_mario_session()
            self.write_json(session)
        except Exception as exc:  # noqa: BLE001
            self.write_json({"error": str(exc)}, HTTPStatus.INTERNAL_SERVER_ERROR)

    def ensure_mario_session(self) -> dict:
        session_id = "mario"
        session_path = safe_session_path(session_id)
        session_file = session_path / "session.json"
        if session_file.exists():
            return json.loads(session_file.read_text(encoding="utf-8"))

        magick_path = resolve_binary("magick")
        if magick_path is None:
            raise RuntimeError("ImageMagick was not found. Install it, or make sure `magick` is available in PATH, /opt/homebrew/bin, or /usr/local/bin.")

        sprite_json_path = SUPER_BRAZIO_VENDOR_DIR / "sprites" / "mario.json"
        sprite_image_path = SUPER_BRAZIO_VENDOR_DIR / "img" / "sprites.png"
        if not sprite_json_path.exists():
            raise FileNotFoundError(f"Missing Mario sprite JSON: {sprite_json_path}")
        if not sprite_image_path.exists():
            raise FileNotFoundError(f"Missing Mario sprite sheet: {sprite_image_path}")

        sprite_spec = json.loads(sprite_json_path.read_text(encoding="utf-8"))
        frame_specs = sprite_spec.get("frames", [])
        if not frame_specs:
            raise RuntimeError("Mario sprite JSON has no frames.")

        frames_path = session_path / "frames"
        originals_path = session_path / "originals"
        shutil.rmtree(session_path, ignore_errors=True)
        frames_path.mkdir(parents=True, exist_ok=True)
        originals_path.mkdir(parents=True, exist_ok=True)
        shutil.copy2(sprite_json_path, originals_path / "mario.json")
        shutil.copy2(sprite_image_path, originals_path / "sprites.png")

        frames = []
        for index, frame_spec in enumerate(frame_specs):
            name = frame_spec["name"]
            x, y, width, height = frame_spec["rect"]
            output_path = frames_path / f"frame_{index:03d}.png"
            run([
                magick_path,
                str(sprite_image_path),
                "-crop",
                f"{width}x{height}+{x}+{y}",
                "+repage",
                str(output_path),
            ])
            frames.append({
                "frame": index,
                "name": name,
                "src": f"/sessions/{session_id}/frames/{output_path.name}",
                "delayCs": 8,
                "sourceRect": {"x": x, "y": y, "width": width, "height": height},
                "faceBox": None,
            })

        max_width = max(int(frame["sourceRect"]["width"]) for frame in frames)
        max_height = max(int(frame["sourceRect"]["height"]) for frame in frames)
        data = {
            "schemaVersion": 1,
            "id": session_id,
            "sourceFilename": "Super Brazio Mario spritesheet",
            "sourceType": "super-brazio-vendor-sprite",
            "sourceSpriteJson": str(sprite_json_path.relative_to(PROJECT_ROOT)),
            "sourceSpriteSheet": str(sprite_image_path.relative_to(PROJECT_ROOT)),
            "naturalSize": {"width": max_width, "height": max_height},
            "facePlacementMode": "fixed-size-bottom-center",
            "frames": frames,
            "mappingSummary": {
                "frameCount": len(frames),
                "mappedFrameCount": 0,
                "missingFrames": [frame["frame"] for frame in frames],
                "complete": False,
                "status": "draft",
            },
            "compositorNotes": "Mario preset. Face boxes are marked in each cropped Mario frame. Use sourceRect to composite back into img/sprites.png.",
            "notes": "Use this session to mark Mario's face before compositing Dor's face onto the Super Brazio Mario sprite frames.",
        }
        session_file.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        return data

    def save_session(self, session_id: str) -> None:
        try:
            session_path = safe_session_path(session_id)
            if not session_path.exists():
                self.send_error(HTTPStatus.NOT_FOUND, "Session not found")
                return

            data = self.read_json_body()
            allow_incomplete = bool(data.pop("_allowIncomplete", False))
            data["id"] = slugify(session_id)
            summary = mapping_summary(data)
            if not allow_incomplete and not summary["complete"]:
                self.write_json({
                    "error": "Cannot save complete session with missing face boxes.",
                    "missingFrames": summary["missingFrames"],
                }, HTTPStatus.BAD_REQUEST)
                return

            saved_at = datetime.now(timezone.utc).isoformat()
            data["mappingSummary"] = {
                **summary,
                "status": "complete" if summary["complete"] else "draft",
                "savedAt": saved_at,
            }
            data["updatedAt"] = saved_at
            data["facePlacementMode"] = data.get("facePlacementMode") or "fixed-size-bottom-center"
            data["compositorNotes"] = data.get("compositorNotes") or "Use one fixed face size for all frames. Face boxes are placement anchors only."

            session_file = session_path / "session.json"
            if session_file.exists():
                backups_path = session_path / "backups"
                backups_path.mkdir(parents=True, exist_ok=True)
                backup_name = f"session_before_save_{datetime.now().strftime('%Y%m%d-%H%M%S')}.json"
                shutil.copy2(session_file, backups_path / backup_name)

            session_file.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            self.write_json({"ok": True, "path": str(session_path / "session.json")})
        except Exception as exc:  # noqa: BLE001
            self.write_json({"error": str(exc)}, HTTPStatus.INTERNAL_SERVER_ERROR)


def main() -> None:
    SESSIONS_DIR.mkdir(parents=True, exist_ok=True)
    port = int(sys.argv[1] if len(sys.argv) > 1 else os.environ.get("PORT", DEFAULT_PORT))
    server = ThreadingHTTPServer(("127.0.0.1", port), FaceMapperHandler)
    print(f"Fighter face mapper: http://localhost:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
