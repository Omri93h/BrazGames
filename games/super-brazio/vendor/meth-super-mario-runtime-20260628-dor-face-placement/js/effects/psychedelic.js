const DEFAULT_DURATION = 5.5;
const FADE_SECONDS = 0.85;
const STRIPE_HEIGHT = 5;

const BANDS = [
    {
        phase: 0.0,
        ampX: 13.5,
        ampY: 1.2,
        speed: 3.25,
        direction: 1,
        primary: [138, 70, 255],
        secondary: [36, 230, 210],
        primaryAlpha: 0.2,
        secondaryAlpha: 0.08,
        dark: 0.04,
    },
    {
        phase: 2.1,
        ampX: 16.5,
        ampY: 1.8,
        speed: 3.65,
        direction: -1,
        primary: [0, 255, 46],
        secondary: [7, 205, 255],
        primaryAlpha: 0.3,
        secondaryAlpha: 0.07,
        dark: 0.052,
    },
    {
        phase: 4.0,
        ampX: 14.5,
        ampY: 1.35,
        speed: 2.95,
        direction: 1,
        primary: [255, 226, 0],
        secondary: [190, 60, 255],
        primaryAlpha: 0.26,
        secondaryAlpha: 0.075,
        dark: 0.048,
    },
];

export function createPsychedelicEffect(canvas) {
    const buffer = document.createElement('canvas');
    buffer.width = canvas.width;
    buffer.height = canvas.height;
    const bufferContext = buffer.getContext('2d');

    let remaining = 0;
    let elapsed = 0;

    function activate(duration = DEFAULT_DURATION) {
        remaining = Math.max(remaining, duration);
    }

    function clear() {
        remaining = 0;
        elapsed = 0;
    }

    function update(deltaTime) {
        if (remaining <= 0) {
            return;
        }

        elapsed += deltaTime;
        remaining = Math.max(0, remaining - deltaTime);
    }

    function draw(context) {
        if (remaining <= 0) {
            return;
        }

        const width = canvas.width;
        const height = canvas.height;
        const bandHeight = height / BANDS.length;
        const fadeOut = Math.min(1, remaining / FADE_SECONDS);
        const fadeIn = Math.min(1, elapsed / 0.55);
        const strength = fadeOut * fadeIn;

        bufferContext.clearRect(0, 0, width, height);
        bufferContext.drawImage(canvas, 0, 0);

        context.save();
        context.clearRect(0, 0, width, height);
        context.imageSmoothingEnabled = false;
        context.drawImage(buffer, 0, 0);

        for (const [index, band] of BANDS.entries()) {
            const bandY = Math.floor(index * bandHeight);
            const currentBandHeight = index === BANDS.length - 1
                ? height - bandY
                : Math.ceil(bandHeight);
            const wavePulse = (Math.sin(elapsed * 2.45 + band.phase) + 1) / 2;
            const drawPadX = Math.ceil(band.ampX) + 5;
            const drawPadY = Math.ceil(band.ampY) + 3;
            const scanJitter = Math.sin(elapsed * (band.speed * 0.8) + band.phase) * 2 * strength;

            context.save();
            context.beginPath();
            context.rect(0, bandY, width, currentBandHeight);
            context.clip();

            for (let y = 0; y < currentBandHeight; y += STRIPE_HEIGHT) {
                const localY = bandY + y;
                const wave = elapsed * band.speed + y * 0.105 + band.phase;
                const crossWave = elapsed * (band.speed * 0.62) + y * 0.052 + band.phase;
                const dx = Math.round((Math.sin(wave) * band.ampX * band.direction + Math.sin(crossWave) * 4.8) * strength);
                const dy = Math.round((Math.sin(wave * 0.72 + band.phase) * band.ampY + scanJitter) * strength);
                const sourceX = Math.max(0, -drawPadX);
                const sourceY = Math.max(0, localY - drawPadY);
                const sourceWidth = Math.min(width - sourceX, width + drawPadX * 2);
                const sourceHeight = Math.min(height - sourceY, STRIPE_HEIGHT + drawPadY * 2);

                context.drawImage(
                    buffer,
                    sourceX,
                    sourceY,
                    sourceWidth,
                    sourceHeight,
                    sourceX + dx,
                    sourceY + dy,
                    sourceWidth,
                    sourceHeight,
                );
            }

            const [r, g, b] = band.primary;
            const [sr, sg, sb] = band.secondary;
            context.globalAlpha = 1;
            context.globalCompositeOperation = 'source-over';
            context.fillStyle = `rgba(${r}, ${g}, ${b}, ${(band.primaryAlpha + wavePulse * 0.105) * strength})`;
            context.fillRect(0, bandY, width, currentBandHeight);
            context.globalCompositeOperation = 'screen';
            context.fillStyle = `rgba(${sr}, ${sg}, ${sb}, ${(band.secondaryAlpha + wavePulse * 0.055) * strength})`;
            context.fillRect(0, bandY, width, currentBandHeight);
            context.globalCompositeOperation = 'source-over';

            const darkBandY = bandY + ((elapsed * (24 + index * 5) + index * 31) % currentBandHeight);
            context.fillStyle = `rgba(4, 2, 12, ${band.dark * strength})`;
            context.fillRect(0, darkBandY, width, Math.max(7, currentBandHeight * 0.13));
            context.globalAlpha = 0.16 * strength;
            context.drawImage(buffer, Math.round(band.direction * -3 * strength), bandY, width, currentBandHeight, 0, bandY, width, currentBandHeight);
            context.restore();
        }

        context.globalAlpha = 0.11 * strength;
        context.drawImage(buffer, -2, 0);
        context.drawImage(buffer, 2, 0);
        context.restore();
    }

    return {
        activate,
        clear,
        update,
        draw,
        get active() {
            return remaining > 0;
        },
    };
}
