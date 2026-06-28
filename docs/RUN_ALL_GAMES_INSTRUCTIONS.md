# Run All Games Instructions

Use this file when the user says something like:

- "תפעיל את כל המשחקים"
- "פתח את כולם"
- "run all games"
- "open all localhosts"

Goal: start every implemented game on its own localhost port and open each URL in a separate browser tab, one tab after another. If the user asks for the game portal or launcher, serve the repository root on port `3000` and open that first.

## Current Ports

| Game | Folder | Port | URL | Status |
| --- | --- | --- | --- | --- |
| The Braz Games portal | repository root | `3000` | `http://localhost:3000` | Root static launcher |
| Memory Game | `games/memory` | `3001` | `http://localhost:3001` | Implemented / pending final approval |
| Fishy / Submarine Survival | `games/submarine` | `3002` | `http://localhost:3002` | In progress |
| Dino / Escape From Be'er Sheva | `games/dino` | `3003` | `http://localhost:3003` | In progress |
| Super Brazio | `games/super-brazio` | `3004` | `http://localhost:3004` | In progress |
| Song Starter | `tools/song-starter` | `3005` | `http://localhost:3005` | Local song utility |
| Fighter Face Mapper | `tools/fighter-face-mapper` | `3006` | `http://localhost:3006` | Local asset-prep tool when Song Starter uses `3005` |

Only start games whose folders and runnable files actually exist. Do not invent missing game folders.

## Startup Pattern

Each implemented game is currently a static local browser game.

Run the root portal from the repository root:

```sh
python3 -m http.server 3000
```

Open:

```text
http://localhost:3000
```

The portal links to the four game subpages and does not append reset query params.

Run each one from its own folder:

```sh
cd games/memory
python3 -m http.server 3001
```

```sh
cd games/submarine
python3 -m http.server 3002
```

```sh
cd games/dino
python3 -m http.server 3003
```

```sh
cd games/super-brazio
python3 -m http.server 3004
```

The Fighter Face Mapper is not a game and must use its own helper server so sessions can be saved:

```sh
cd tools/fighter-face-mapper
python3 server.py 3006
```

The Song Starter is not a game. Start it only when the user asks for the song utility:

```sh
cd tools/song-starter
python3 -m http.server 3005
```

Future games should follow the same pattern unless their own README says otherwise.

## Before Starting Servers

1. Check which game folders exist under `games/`.
2. Read each implemented game's `README.md`.
3. Confirm the expected port from `docs/LOCALHOST_PORTS.md`.
4. If this is party/display testing, connect the TV/projector before opening the browser tabs.
5. Keep browser zoom at 100% and use fullscreen on the connected display.
6. If a port is already running, reuse it if it serves the correct game.
7. If a port is occupied by the wrong thing, report it and choose a clear next action.

## Opening Browser Tabs

After servers are running, open tabs in this order:

1. `http://localhost:3000` when the user wants the portal/launcher
2. `http://localhost:3001`
3. `http://localhost:3002`
4. `http://localhost:3003` only when Dino exists
5. `http://localhost:3004` only when Super Brazio exists
6. `http://localhost:3005` only when the user wants the song utility
7. `http://localhost:3006` only when the user wants the face/image editing tool

Use the Codex in-app browser when available. The user expects tab-after-tab local game URLs.

## Reset URLs

Use reset URLs only when the user explicitly asks for a clean state:

| Game | Reset URL |
| --- | --- |
| Memory Game | `http://localhost:3001?init=1` |
| Submarine Survival | `http://localhost:3002?init=1` |
| Dino / Escape From Be'er Sheva | `http://localhost:3003?init=1` |
| Super Brazio | `http://localhost:3004?init=1` |

Do not reset games automatically when the user only asks to open them.

## Party Checklist

Before the party, verify:

- Each implemented game opens on its documented URL.
- The root portal opens at `http://localhost:3000` if it is part of the flow.
- Each game works without internet.
- Browser tabs are in the planned order.
- Audio volume is acceptable if the game has audio.
- Fullscreen/projector layout is readable on the actual connected display.
- Browser zoom is 100%, and no important UI is clipped.
- Moving games are played briefly on the connected display because screen shape can affect difficulty feel.
- Restart/reset flow is known for each game.

## Important Rules

- Do not start unimplemented games.
- Do not clone or install dependencies just to run all games.
- Do not change ports unless necessary.
- Keep each server process separate.
- If a game requires a different run command later, follow that game's README.
