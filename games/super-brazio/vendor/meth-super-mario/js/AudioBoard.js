export default class AudioBoard {
    constructor() {
        this.buffers = new Map();
    }

    addAudio(name, buffer) {
        this.buffers.set(name, buffer);
    }

    playAudio(name, context) {
        const buffer = this.buffers.get(name);
        if (!buffer) {
            return null;
        }

        const source = context.createBufferSource();
        source.connect(context.destination);
        source.buffer = buffer;
        source.start(0);
        return source;
    }
}
