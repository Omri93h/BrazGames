import Keyboard from './KeyboardState.js';
import InputRouter from './InputRouter.js';
import Jump from './traits/Jump.js';
import PipeTraveller from './traits/PipeTraveller.js';
import Go from './traits/Go.js';

const KEYMAP = {
    UP: 'KeyW',
    DOWN: 'KeyS',
    LEFT: 'KeyA',
    RIGHT: 'KeyD',
    A: "KeyP",
};

export function setupKeyboard(window) {
    const input = new Keyboard();
    const router = new InputRouter();
    const horizontalDirections = new Map();

    input.listenTo(window);

    function isControlsInverted() {
        return Boolean(window.superBrazioPowerupState?.controlsInverted);
    }

    function routeHorizontal(code, baseDirection, keyState) {
        router.route(entity => {
            const go = entity.traits.get(Go);
            const pipeTraveller = entity.traits.get(PipeTraveller);
            if (keyState) {
                const direction = isControlsInverted() ? -baseDirection : baseDirection;
                horizontalDirections.set(code, direction);
                go.dir += direction;
                pipeTraveller.direction.x += direction;
                return;
            }

            const direction = horizontalDirections.get(code);
            if (!direction) {
                return;
            }
            horizontalDirections.delete(code);
            go.dir -= direction;
            pipeTraveller.direction.x -= direction;
        });
    }

    input.addMapping(KEYMAP.A, keyState => {
        if (keyState) {
            router.route(entity => entity.traits.get(Jump).start());
        } else {
            router.route(entity => entity.traits.get(Jump).cancel());
        }
    });

    input.addMapping(KEYMAP.UP, keyState => {
        router.route(entity => {
            entity.traits.get(PipeTraveller).direction.y += keyState ? -1 : 1;
        });
    });

    input.addMapping(KEYMAP.DOWN, keyState => {
        router.route(entity => {
            entity.traits.get(PipeTraveller).direction.y += keyState ? 1 : -1;
        });
    });

    input.addMapping(KEYMAP.RIGHT, keyState => {
        routeHorizontal(KEYMAP.RIGHT, 1, keyState);
    });

    input.addMapping(KEYMAP.LEFT, keyState => {
        routeHorizontal(KEYMAP.LEFT, -1, keyState);
    });

    router.reset = () => {
        input.reset();
        horizontalDirections.clear();
    };

    return router;
}
