const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    constructor() {
        // Holds the current state of a given key
        this.keyStates = new Map();

        // Holds the callback functions for a key code
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    reset() {
        for (const [code, state] of this.keyStates.entries()) {
            if (state !== PRESSED || !this.keyMap.has(code)) {
                continue;
            }
            this.keyMap.get(code)(RELEASED);
        }
        this.keyStates.clear();
    }

    handleEvent(event) {
        const {code} = event;

        if (!this.keyMap.has(code)) {
            // Did not have key mapped.
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;
        const previousState = this.keyStates.get(code);

        if (keyState === RELEASED && previousState !== PRESSED) {
            return;
        }

        if (previousState === keyState) {
            return;
        }

        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                if (window.superBrazioParentControlled && !event.superBrazioForwarded) {
                    event.preventDefault();
                    return;
                }
                this.handleEvent(event);
            });
        });
    }
}
