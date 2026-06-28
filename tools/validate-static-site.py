#!/usr/bin/env python3

import os
import re
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
IGNORED_DIRS = {
    ".git",
    "node_modules",
    "tmp",
    "backups",
    "undefined",
    "tools",
    "sessions",
    "dist",
    "coverage",
}
SCANNED_EXTENSIONS = {".html", ".css", ".js", ".mjs", ".json"}
FORBIDDEN_TRACKED_PREFIXES = ("tmp/", "backups/", "undefined/")

errors = []
checked_refs = set()


def to_posix(path):
    return path.relative_to(ROOT).as_posix()


def walk_files(directory):
    for current, dirs, files in os.walk(directory):
        dirs[:] = [name for name in dirs if name not in IGNORED_DIRS]
        for filename in files:
            yield Path(current) / filename


def strip_query_and_hash(ref):
    return ref.split("#", 1)[0].split("?", 1)[0]


def should_skip_ref(ref):
    trimmed = ref.strip()
    return (
        not trimmed
        or trimmed.startswith("#")
        or trimmed.startswith("data:")
        or trimmed.startswith("blob:")
        or trimmed.startswith("mailto:")
        or trimmed.startswith("tel:")
        or trimmed.startswith("javascript:")
        or trimmed.startswith("about:")
        or re.match(r"^[a-z][a-z0-9+.-]*://", trimmed, re.I)
    )


def resolve_ref(from_file, raw_ref):
    if should_skip_ref(raw_ref) or "${" in raw_ref:
        return None

    clean_ref = strip_query_and_hash(raw_ref.strip())
    if not clean_ref:
        return None

    if clean_ref.startswith("/"):
        resolved = ROOT / clean_ref[1:]
    else:
        resolved = from_file.parent / clean_ref

    resolved = resolved.resolve()
    try:
        resolved.relative_to(ROOT)
    except ValueError:
        errors.append(f"{to_posix(from_file)} references outside the repo: {raw_ref}")
        return None

    return resolved


def nearest_index_root(from_file):
    directory = from_file.parent

    while True:
        if (directory / "index.html").exists():
            return directory
        if directory == ROOT or directory.parent == directory:
            return ROOT
        directory = directory.parent


def ensure_exists(from_file, ref, kind):
    resolved = resolve_ref(from_file, ref)
    if resolved is None:
        return

    key = (to_posix(from_file), ref)
    if key in checked_refs:
        return
    checked_refs.add(key)

    if resolved.exists():
        if resolved.is_dir() and not (resolved / "index.html").exists():
            errors.append(f"{to_posix(from_file)} {kind} points to a directory without index.html: {ref}")
        return

    errors.append(f"{to_posix(from_file)} missing {kind}: {ref}")


def ensure_static_asset_exists(from_file, ref):
    resolved = resolve_ref(from_file, ref)
    if resolved is None:
        return

    key = (to_posix(from_file), ref)
    if key in checked_refs:
        return
    checked_refs.add(key)

    candidates = [resolved]
    if not ref.startswith("/"):
        candidates.append((nearest_index_root(from_file) / strip_query_and_hash(ref)).resolve())

    if any(candidate.exists() for candidate in candidates):
        return

    errors.append(f"{to_posix(from_file)} missing static asset string: {ref}")


def extract_refs(file_path, text):
    suffix = file_path.suffix

    if suffix == ".html":
        for match in re.finditer(r"\b(?:href|src|poster|data-src)=[\"']([^\"']+)[\"']", text, re.I):
            ensure_exists(file_path, match.group(1), "HTML ref")

    if suffix in {".css", ".html"}:
        for match in re.finditer(r"url\(\s*[\"']?([^\"')]+)[\"']?\s*\)", text, re.I):
            ensure_exists(file_path, match.group(1), "CSS url")

    if suffix in {".js", ".mjs"}:
        for match in re.finditer(r"\bimport\s+(?:[^\"']+\s+from\s+)?[\"']([^\"']+)[\"']", text):
            ensure_exists(file_path, match.group(1), "JS import")

        for match in re.finditer(r"\bimport\(\s*[\"']([^\"']+)[\"']\s*\)", text):
            ensure_exists(file_path, match.group(1), "dynamic JS import")

        for match in re.finditer(r"new\s+URL\(\s*[\"']([^\"']+)[\"']\s*,\s*import\.meta\.url\s*\)", text):
            ensure_exists(file_path, match.group(1), "JS URL")

        asset_pattern = (
            r"[\"'`]([^\"'`]+?\."
            r"(?:avif|css|gif|html|ico|jpe?g|js|json|mp3|ogg|png|svg|ttf|wav|webp|woff2?)"
            r"(?:[?#][^\"'`]*)?)[\"'`]"
        )
        for match in re.finditer(asset_pattern, text, re.I):
            ref = match.group(1)
            if re.match(r"^(?:\.{1,2}/|/|assets/|games/|vendor/)", ref):
                ensure_static_asset_exists(file_path, ref)


def check_forbidden_tracked_files():
    try:
        result = subprocess.run(
            ["git", "ls-files"],
            cwd=ROOT,
            text=True,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
    except (OSError, subprocess.CalledProcessError):
        print("Skipping tracked-file check because git is unavailable.", file=sys.stderr)
        return

    for file_path in filter(None, result.stdout.splitlines()):
        if file_path.startswith(FORBIDDEN_TRACKED_PREFIXES):
            errors.append(f"Forbidden path is tracked by git: {file_path}")


def main():
    if not (ROOT / ".nojekyll").exists():
        errors.append("Missing .nojekyll for static GitHub Pages publishing.")

    for file_path in walk_files(ROOT):
        if file_path.suffix not in SCANNED_EXTENSIONS:
            continue
        extract_refs(file_path, file_path.read_text(encoding="utf-8", errors="ignore"))

    check_forbidden_tracked_files()

    if errors:
        print(f"Static validation failed with {len(errors)} issue(s):", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(f"Static validation passed: {len(checked_refs)} local reference(s) checked.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
