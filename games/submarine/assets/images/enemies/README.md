# Enemy Images

Put enemy sprites here.

Current enemy sets:

```text
magami/magami1.png
magami/magami2.png
magami/magami_final.png
magami/magami_final_open.png
salty_antisemites/tucker.webp
salty_antisemites/candace.webp
moshik_and_galit/moshik_b.webp
moshik_and_galit/galit_b.webp
chmirozon_prime/amazon.png
chmirozon_prime/bezos_real.webp
chmirozon_prime/bezos_southpark.webp
rare_adolf_jackson/adolf_jackson.webp
the_revenge_of_the_exiled/maor.webp
the_revenge_of_the_exiled/lior.webp
the_revenge_of_the_exiled/mosko.webp
the_revenge_of_the_exiled/tomer.webp
```

Use transparent PNG or WebP if possible.

Enemy set order:

1. `המגמים`
2. `אנטישמים מלוחים`
3. `לה פאמיליה`
4. `The Revenge Of The Exiled`
5. `השלב הסופי: חמירוזון פריים`

Stage 2 uses the Tucker/Candace enemy faces and scales every enemy color tier down by 35%. Tucker faces left in the source, so he stays unmirrored when moving left and mirrors when moving right.

Stage 3 uses Moshik/Galit enemy faces. `moshik_b.webp` is stored mirrored so Moshik faces the correct direction during movement, and Galit uses inverted mirroring in code so she points with her movement.

Stage 4 uses the four Exiled enemy faces:

- `maor.webp`
- `lior.webp`
- `mosko.webp`
- `tomer.webp`

`tomer.webp` is a brightened/high-contrast local copy of the provided source image. Tomer and Lior both use inverted mirroring compared with the original source-facing assumption so their faces point with their movement in-game. Maor and Mosko look forward, so normal mirroring is acceptable.

Rare event:

- `rare_adolf_jackson/adolf_jackson.webp` appears as exactly two giant red hunters 10 seconds after any player reaches their last heart, if the round is still active.
- Each hunter targets a different living player when possible.
- They stay dangerous for 7 seconds, then fade quickly without collision during fade.
- After they disappear, they do not return again in that stage/round.
- Current `adolf_jackson.webp` has small edge-cleanups under the ears; the backups are `rare_adolf_jackson/adolf_jackson.before-left-ear-fix-2026-06-18.webp` and `rare_adolf_jackson/adolf_jackson.before-right-ear-lower-fix-2026-06-19.webp`.

Stage 5 displays as `השלב הסופי: חמירוזון פריים` and uses custom Chmirozon Prime rules:

- `amazon.png` is always the smallest enemy, keeps its original logo colors, never hunts, never flashes, and does not mirror, so the logo text remains readable.
- `bezos_real.webp` appears as both medium yellow and large purple enemies.
- `bezos_southpark.webp` starts appearing only after about 15 seconds as a giant red hunter with extra speed and inverted mirroring so he points with his movement. It should stay rare enough to be survivable: lower spawn chance, slower active-limit growth, and no more than two active hunters at once.

If these files are missing, the game uses the built-in Canvas enemy placeholders.

Final result screen:

- Magami uses `magami_final.png` and `magami_final_open.png` as compact display-only frames, swapping between closed-mouth and open-mouth instead of mirroring left/right.
