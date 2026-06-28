const ASSET_BASE = new URL("../", import.meta.url);

export function resolveAssetUrl(url) {
    if (/^(https?:|data:|blob:)/.test(url)) {
        return url;
    }
    if (url.startsWith("/")) {
        return new URL(url.slice(1), ASSET_BASE).href;
    }
    return new URL(url, ASSET_BASE).href;
}

export function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        const resolvedUrl = resolveAssetUrl(url);
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.addEventListener('error', () => {
            reject(new Error(`Failed to load image: ${resolvedUrl}`));
        });
        image.src = resolvedUrl;
    });
}

export function loadJSON(url) {
    return fetch(resolveAssetUrl(url))
    .then(r => {
        if (!r.ok) {
            throw new Error(`Failed to load JSON: ${r.url} (${r.status})`);
        }
        return r.json();
    });
}
