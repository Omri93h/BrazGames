# Production Deployment

This project is a static browser arcade. There is no backend, account system, or build step. Production should publish the repository root as static files and preserve the same relative paths used by the local portal.

## Current GitHub Status

- Repository: `Omri93h/BrazGames`
- Visibility: private
- Default branch: `main`
- Publish branch prepared: `gh-pages`
- Static entry point: `index.html`

GitHub rejected automatic Pages activation for the private repository with:

```text
Your current plan does not support GitHub Pages for this repository.
```

That means the code is ready for GitHub Pages, but this GitHub account/repository plan currently cannot serve the private repo through Pages.

## Recommended Sharing Paths

### Option A: Keep Repo Private, Use Another Static Host

Use this if the repository should stay private and friends should receive only a playable link.

Good hosts for this shape of project:

- Cloudflare Pages
- Netlify
- Vercel static project

Connect the private GitHub repository, set the production branch to `main` or `gh-pages`, and leave build settings empty:

```text
Build command: none
Output directory: /
```

If the host requires a command, use:

```sh
echo "static site"
```

### Option B: Enable GitHub Pages

Use this if GitHub Pages becomes available for the private repository, or if the repository is intentionally made public later.

Publish settings:

```text
Source: Deploy from a branch
Branch: gh-pages
Folder: /
```

Expected URL if the repository remains named `BrazGames`:

```text
https://omri93h.github.io/BrazGames/
```

## Pre-Publish Checklist

Run from the repository root:

```sh
python3 tools/validate-static-site.py
```

Then verify:

- No `tmp/`, `backups/`, `undefined/`, `.env`, logs, or local server files are tracked.
- `index.html` opens the four approved games only.
- The portal links keep clean URLs, and a portal click triggers a one-time fresh start that clears only the selected game's localStorage key.
- All runtime assets are local files in the repository.
- Super Brazio still loads the versioned runtime vendor path.

## Local Smoke Test

Run:

```sh
python3 -m http.server 3000
```

Open:

```text
http://localhost:3000
```

Click each game card once and confirm it lands on that game's clean opening screen even if the same browser has saved progress. For Super Brazio, start a real flow through the portal after any vendor/runtime change.

## Files That Should Not Be Published

These are intentionally ignored by git:

- `tmp/`
- `backups/`
- `undefined/`
- `.localhost-logs/`
- `*.log`
- `*.pid`
- `.env`
- `node_modules/`

If a future contributor needs local scratch space, use one of those ignored folders.
