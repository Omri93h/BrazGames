import TileResolver from '../TileResolver.js';

const DANIEL_FACE_SRC = new URL('../../../../assets/images/goals/daniel_face.png?v=2026-06-27-daniel-face-only-1', import.meta.url).href;

const danielFaceImage = new Image();
let danielFaceReady = false;

danielFaceImage.addEventListener('load', () => {
    danielFaceReady = true;
});
danielFaceImage.src = DANIEL_FACE_SRC;

function drawUsFlag(context, x, y) {
    context.fillStyle = '#ffffff';
    context.fillRect(x, y, 30, 16);
    context.fillStyle = '#bf173d';
    for (let stripe = 0; stripe < 7; stripe += 1) {
        context.fillRect(x, y + stripe * 2, 30, 1);
    }
    context.fillStyle = '#123d73';
    context.fillRect(x, y, 13, 9);
    context.fillStyle = '#ffffff';
    [
        [2, 2], [6, 2], [10, 2],
        [4, 5], [8, 5],
        [2, 7], [6, 7], [10, 7],
    ].forEach(([starX, starY]) => {
        context.fillRect(x + starX, y + starY, 1, 1);
    });
    context.fillStyle = '#242424';
    context.fillRect(x - 1, y - 1, 32, 1);
    context.fillRect(x - 1, y + 16, 32, 1);
    context.fillRect(x - 1, y - 1, 1, 18);
    context.fillRect(x + 30, y - 1, 1, 18);
}

function drawGreenCardSign(context, x, y) {
    context.fillStyle = '#031f12';
    context.fillRect(x, y, 57, 24);
    context.fillStyle = '#ecfff2';
    context.fillRect(x + 1, y + 1, 55, 22);
    context.fillStyle = '#108a45';
    context.fillRect(x + 2, y + 2, 53, 20);
    context.fillStyle = '#075d2d';
    context.fillRect(x + 5, y + 5, 47, 14);
    context.fillStyle = '#f3fff5';
    context.font = 'bold 8px Arial, sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'top';
    context.fillText('GREEN', x + 28.5, y + 4);
    context.fillText('CARD', x + 28.5, y + 12);
    context.textAlign = 'start';
    context.textBaseline = 'alphabetic';
}

function drawPrincessDanielFallbackFace(context, x, y) {
    context.fillStyle = '#7a3f1d';
    context.fillRect(x, y + 8, 40, 30);
    context.fillStyle = '#9b562a';
    context.fillRect(x + 8, y + 3, 24, 12);
    context.fillStyle = '#ffd3ad';
    context.fillRect(x + 11, y + 15, 18, 25);
    context.fillStyle = '#7a3f1d';
    context.fillRect(x + 5, y + 19, 6, 18);
    context.fillRect(x + 29, y + 19, 6, 18);
    context.fillStyle = '#2d1c14';
    context.fillRect(x + 15, y + 24, 3, 4);
    context.fillRect(x + 24, y + 24, 3, 4);
    context.fillStyle = '#b13b5c';
    context.fillRect(x + 18, y + 34, 8, 3);
}

function drawPrincessDanielFace(context, x, y) {
    if (!danielFaceReady) {
        drawPrincessDanielFallbackFace(context, x, y);
        return;
    }

    const previousSmoothing = context.imageSmoothingEnabled;
    const previousSmoothingQuality = context.imageSmoothingQuality;

    context.save();
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    context.drawImage(danielFaceImage, x, y, 56, 56);
    context.restore();
    context.imageSmoothingEnabled = previousSmoothing;
    context.imageSmoothingQuality = previousSmoothingQuality;
}

function drawPrincessDaniel(context, x, floorY) {
    drawPrincessDanielFace(context, x, floorY - 56);
}

function drawPrincessFinale(context, x, y) {
    const floorY = y + 48;
    drawGreenCardSign(context, x - 58, floorY - 48);
    drawUsFlag(context, x - 45, floorY - 21);
    drawPrincessDaniel(context, x + 6, floorY);
}

function drawCheckpointFlag(context, x, floorY, reached, pulse) {
    const flagTop = floorY - 30;
    const flagColor = reached ? '#42f06f' : '#f04444';
    const flagDark = reached ? '#168f3a' : '#9d1d1d';
    const shine = reached ? '#98faaa' : '#ffd0d0';

    context.fillStyle = '#242424';
    context.fillRect(x + 1, flagTop + 1, 2, 30);
    context.fillStyle = '#f7f1d4';
    context.fillRect(x + 2, flagTop, 1, 30);
    context.fillStyle = '#242424';
    context.fillRect(x - 2, floorY - 2, 8, 2);

    context.fillStyle = flagDark;
    context.fillRect(x + 3, flagTop + 4, 13, 9);
    context.fillStyle = flagColor;
    context.fillRect(x + 3, flagTop + 3, 12, 8);
    context.fillStyle = shine;
    context.fillRect(x + 5, flagTop + 5, 7, 1);
    context.fillStyle = flagColor;
    context.fillRect(x + 14, flagTop + 5 + pulse, 3, 5);
}

export function createBackgroundLayer(level, tiles, sprites) {
    const resolver = new TileResolver(tiles);

    const buffer = document.createElement('canvas');
    buffer.width = 256 + 80;
    buffer.height = 240;

    const context = buffer.getContext('2d');

    function redraw(startIndex, endIndex)  {
        context.clearRect(0, 0, buffer.width, buffer.height);
        const foregroundTiles = [];

        for (let x = startIndex; x <= endIndex; ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    if (tile.style === 'princess-daniel') {
                        foregroundTiles.push({x: (x - startIndex) * 16, y: y * 16});
                    } else if (sprites.animations.has(tile.style)) {
                        sprites.drawAnim(tile.style, context, x - startIndex, y, level.totalTime);
                    } else {
                        sprites.drawTile(tile.style, context, x - startIndex, y);
                    }
                });
            }
        }

        foregroundTiles.forEach(({x, y}) => {
            drawPrincessFinale(context, x, y);
        });

        const pulse = Math.floor(level.totalTime * 8) % 2;
        level.checkpointFlags
            .filter(flag => {
                const tileX = Math.floor(flag.pos.x / 16);
                return tileX >= startIndex - 1 && tileX <= endIndex + 1;
            })
            .forEach(flag => {
                drawCheckpointFlag(
                    context,
                    Math.round(flag.pos.x - startIndex * 16),
                    Math.round(flag.pos.y),
                    flag.reached,
                    pulse,
                );
            });
    }

    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);

        context.drawImage(buffer,
            Math.floor(-camera.pos.x % 16),
            Math.floor(-camera.pos.y));
    };
}
