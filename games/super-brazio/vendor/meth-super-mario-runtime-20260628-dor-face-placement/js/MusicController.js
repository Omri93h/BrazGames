export default class MusicController {
    constructor() {
        this.player = null;
        this.timedSwitch = null;
    }

    setPlayer(player) {
        this.player = player;
    }

    setTimedSwitch(trackName, afterSeconds, fadeOutSeconds = 0) {
        if (!trackName || !Number.isFinite(afterSeconds)) {
            this.timedSwitch = null;
            return;
        }

        this.timedSwitch = {
            trackName,
            afterSeconds,
            fadeOutSeconds: Math.max(0, Number(fadeOutSeconds) || 0),
            phase: 'waiting',
            fadeStartedAt: 0,
            fadeAudio: null,
            fadeStartVolume: 1,
            complete: false,
        };
    }

    playTheme(speed = 1) {
        const audio = this.player.playTrack('main');
        if (audio) {
            audio.loop = true;
            audio.playbackRate = speed;
        }
    }

    playHurryTheme() {
        const audio = this.player.playTrack('hurry');
        if (!audio) {
            return;
        }
        audio.loop = false;
        audio.addEventListener('ended', () => {
            this.playTheme(1.3);
        }, {once: true});
    }

    playTrack(name, speed = 1) {
        const audio = this.player.playTrack(name);
        if (audio) {
            audio.loop = true;
            audio.playbackRate = speed;
        }
    }

    update(elapsedSeconds) {
        if (!this.timedSwitch || this.timedSwitch.complete || elapsedSeconds < this.timedSwitch.afterSeconds) {
            return;
        }

        const timedSwitch = this.timedSwitch;
        if (timedSwitch.fadeOutSeconds <= 0) {
            timedSwitch.complete = true;
            this.playTrack(timedSwitch.trackName);
            return;
        }

        if (timedSwitch.phase === 'waiting') {
            timedSwitch.phase = 'fading';
            timedSwitch.fadeStartedAt = elapsedSeconds;
            timedSwitch.fadeAudio = this.player.getCurrentAudio();
            timedSwitch.fadeStartVolume = timedSwitch.fadeAudio?.volume ?? 1;
        }

        if (timedSwitch.phase !== 'fading') {
            return;
        }

        const fadeProgress = Math.min(1, (elapsedSeconds - timedSwitch.fadeStartedAt) / timedSwitch.fadeOutSeconds);
        if (timedSwitch.fadeAudio) {
            timedSwitch.fadeAudio.volume = Math.max(0, timedSwitch.fadeStartVolume * (1 - fadeProgress));
        }

        if (fadeProgress >= 1) {
            if (timedSwitch.fadeAudio) {
                timedSwitch.fadeAudio.pause();
                timedSwitch.fadeAudio.volume = timedSwitch.fadeStartVolume;
            }
            timedSwitch.phase = 'complete';
            timedSwitch.complete = true;
            this.playTrack(timedSwitch.trackName);
        }
    }

    pause() {
        this.player.pauseAll();
    }
}
