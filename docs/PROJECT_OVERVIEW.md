# Project Overview

Dor Bachelor Party Games is a private local arcade for Dor's bachelor party.

The plan is to run browser-based games on local laptops connected to small projectors. Each laptop can serve one game from `localhost`, and each game should be easy to open, restart, customize, and troubleshoot during the party.

The current approved scope includes only four games:

1. Memory Game
2. Fishy / Submarine Survival
3. Dino / Escape From Be'er Sheva
4. Super Brazio

## Arcade Concept

The arcade is a four-game party setup themed around Dor, friends, group jokes, Be'er Sheva jokes, wedding jokes, USA and visa jokes, Amazon references, and other approved personal assets.

The games should feel funny and custom without becoming fragile. Reliability matters more than technical ambition.

## Local Laptop And Projector Setup

Expected party setup:

- One or more laptops.
- One or more small projectors.
- Games opened in local browser windows.
- Controllers, keyboards, mice, or gamepads depending on each game.
- Fullscreen mode when useful.

Each game should be runnable without a backend unless a future approved implementation explicitly needs one.

## Why Local Hosting Matters

Local hosting keeps the party setup reliable:

- No internet dependency during runtime.
- No external hosted assets that can fail to load.
- No accounts, cloud dashboards, or remote services.
- Easy pre-party testing on the exact laptop/projector setup.

All runtime assets should live in the repository or in documented local asset folders.

## Game-By-Game Approval

Work proceeds one game at a time.

The Memory Game is first. No later game should be implemented until the current game is tested and approved.

Each game should finish with:

- Local run instructions.
- Asset replacement instructions.
- Manual validation checklist.
- Known limitations or risks.
- User approval before starting the next game.

Games outside the four approved games are out of scope unless the user explicitly re-approves a scope expansion later.

