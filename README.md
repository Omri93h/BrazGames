# Dor Bachelor Party Games

Dor Bachelor Party Games is a local-only browser arcade for Dor's bachelor party.

The project currently includes only four approved games:

1. Memory Game
2. Fishy / Submarine Survival
3. Dino / Escape From Be'er Sheva
4. Super Brazio

The games will run on local laptops connected to small projectors. Each game should run on `localhost`, use local assets only, and keep working without internet during the party.

Games will be added one at a time. The first actual game to build after the corrected bootstrap docs are approved is the Memory Game.

Runtime goals:

- No internet required during the party.
- No external hosted assets at runtime.
- A static root portal at `http://localhost:3000` can be used to choose between the four games.
- Each approved game has its own local port.
- Custom images and sounds are replaceable from local asset folders.
- Setup stays simple enough to trust in a party environment.

Production notes:

- The repository root is a static site; there is no build step.
- Run `python3 tools/validate-static-site.py` before publishing or sharing a hosted link.
- See `docs/PRODUCTION_DEPLOYMENT.md` for the private-repo sharing plan and GitHub Pages status.

## Run The Portal Locally

From the repository root:

```sh
python3 -m http.server 3000
```

Then open:

```text
http://localhost:3000
```

The portal links to the four approved games under `games/` and does not reset their localStorage state.

This is a private local party project, not a public commercial product. Use placeholders in the repo unless real private photos or sounds are explicitly provided and approved.
