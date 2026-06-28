export default class MusicPlayer {
    constructor() {
        this.tracks = new Map();
        this.currentTrackName = null;
        this.currentAudio = null;
    }

    addTrack(name, url) {
        const audio = new Audio();
        audio.loop = true;
        audio.src = url;
        this.tracks.set(name, audio);
    }

    playTrack(name) {
        this.pauseAll();
        if (globalThis.superBrazioDisableLevelMusic) {
            this.currentTrackName = name;
            this.currentAudio = null;
            return null;
        }
        const audio = this.tracks.get(name);
        if (!audio) {
            return null;
        }
        this.currentTrackName = name;
        this.currentAudio = audio;
        audio.volume = 1;
        const playPromise = audio.play();
        if (playPromise?.catch) {
            playPromise.catch(() => {
                // Chrome may block music after a refresh until the next user gesture.
                // Gameplay must continue even when background music is temporarily muted.
            });
        }
        return audio;
    }

    getCurrentAudio() {
        return this.currentAudio;
    }

    pauseAll() {
        for (const audio of this.tracks.values()) {
            audio.pause();
        }
    }
}
