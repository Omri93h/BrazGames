import Entity from '../Entity.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Killable from '../traits/Killable.js';
import Physics from '../traits/Physics.js';
import PipeTraveller from '../traits/PipeTraveller.js';
import PoleTraveller from '../traits/PoleTraveller.js';
import Player from '../traits/Player.js';
import Solid from '../traits/Solid.js';
import Stomper from '../traits/Stomper.js';
import {loadAudioBoard} from '../loaders/audio.js';
import {loadSpriteSheet} from '../loaders/sprite.js';

const SLOW_DRAG = 1/1000;
const DOR_MARIO_FACE_SRC = new URL('../../../../assets/images/players/dor_mario_face.png?v=2026-06-28-dor-face-preload-1', import.meta.url).href;

const dorMarioFaceImage = new Image();
let dorMarioFaceReady = false;
let dorMarioFaceFailed = false;
const dorMarioFaceLoad = new Promise(resolve => {
    dorMarioFaceImage.addEventListener('load', () => {
        dorMarioFaceReady = true;
        resolve(true);
    }, {once: true});
    dorMarioFaceImage.addEventListener('error', () => {
        dorMarioFaceFailed = true;
        console.warn(`Failed to load Dor Mario face: ${DOR_MARIO_FACE_SRC}`);
        resolve(false);
    }, {once: true});
});

dorMarioFaceImage.decoding = 'async';
dorMarioFaceImage.src = DOR_MARIO_FACE_SRC;

export function loadMario(audioContext) {
    return Promise.all([
        loadSpriteSheet('mario'),
        loadAudioBoard('mario', audioContext),
        dorMarioFaceLoad,
    ])
    .then(([sprite, audio]) => {
        return createMarioFactory(sprite, audio);
    });
}

function createMarioFactory(sprite, audio) {
    const runAnim = sprite.animations.get('run');
    const runLargeAnim = sprite.animations.get('run-large');
    const climbAnim = sprite.animations.get('climb');

    function isPoweredUp(mario) {
        return mario.traits.get(Player)?.poweredUp;
    }

    function getHeading(mario) {
        const poleTraveller = mario.traits.get(PoleTraveller);
        if (poleTraveller.distance) {
            return false;
        }
        return mario.traits.get(Go).heading < 0;
    }

    function routeFrame(mario) {
        const pipeTraveller = mario.traits.get(PipeTraveller);
        if (pipeTraveller.movement.x != 0) {
            return runAnim(pipeTraveller.distance.x * 2);
        }
        if (pipeTraveller.movement.y != 0) {
            return 'idle';
        }

        const poleTraveller = mario.traits.get(PoleTraveller);
        if (poleTraveller.distance) {
            return climbAnim(poleTraveller.distance);
        }

        const large = isPoweredUp(mario);

        if (mario.traits.get(Jump).falling) {
            return large ? 'jump-large' : 'jump';
        }

        const go = mario.traits.get(Go);
        if (go.distance > 0) {
            if ((mario.vel.x > 0 && go.dir < 0) || (mario.vel.x < 0 && go.dir > 0)) {
                return large ? 'break-large' : 'break';
            }

            return large
                ? runLargeAnim(mario.traits.get(Go).distance)
                : runAnim(mario.traits.get(Go).distance);
        }

        return large ? 'idle-large' : 'idle';
    }

    function setTurboState() {
        this.traits.get(Go).dragFactor = SLOW_DRAG;
    }

    function drawDorFace(context, face, mirror) {
        if (!dorMarioFaceReady) {
            if (!dorMarioFaceFailed) {
                return;
            }
            context.fillStyle = '#1f1f1f';
            context.fillRect(face.x + 2, face.y + 2, face.width - 4, face.height - 2);
            context.fillStyle = '#f0c09a';
            context.fillRect(face.x + 4, face.y + 6, face.width - 8, face.height - 7);
            context.fillStyle = '#2b160f';
            context.fillRect(face.x + 8, face.y + 10, 3, 3);
            context.fillRect(face.x + face.width - 11, face.y + 10, 3, 3);
            return;
        }

        const previousSmoothing = context.imageSmoothingEnabled;
        const previousSmoothingQuality = context.imageSmoothingQuality;

        context.save();
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        if (mirror) {
            context.translate(face.x + face.width, face.y);
            context.scale(-1, 1);
            context.drawImage(dorMarioFaceImage, 0, 0, face.width, face.height);
        } else {
            context.drawImage(dorMarioFaceImage, face.x, face.y, face.width, face.height);
        }
        context.restore();
        context.imageSmoothingEnabled = previousSmoothing;
        context.imageSmoothingQuality = previousSmoothingQuality;
    }

    function drawMarioFrame(context, mario, alpha = 1) {
        const headingLeft = getHeading(mario);
        const mirrorFace = !headingLeft;
        const frame = routeFrame(mario);
        const large = isPoweredUp(mario);
        const visual = large
            ? {
                offset: {x: -11, y: -16},
                body: {x: 11, y: 16},
                face: {x: 0, y: 0, width: 36, height: 31},
            }
            : {
                offset: {x: -9, y: -14},
                body: {x: 9, y: 14},
                face: {x: 0, y: 0, width: 30, height: 26},
            };
        mario.drawOffset = visual.offset;

        context.save();
        context.globalAlpha *= alpha;
        sprite.draw(frame, context, visual.body.x, visual.body.y, headingLeft);
        drawDorFace(context, visual.face, mirrorFace);
        context.restore();
    }

    function drawMario(context) {
        if (this.hidden) {
            return;
        }

        const player = this.traits.get(Player);
        if (player?.damageGrace > 0 && Math.floor(this.lifetime * 12) % 2 === 1) {
            drawMarioFrame(context, this, 0.48);
            return;
        }

        drawMarioFrame(context, this);
    }

    return function createMario() {
        const mario = new Entity();
        mario.audio = audio;
        mario.size.set(14, 16);
        mario.drawOffset = {x: -7, y: -10};

        mario.addTrait(new Physics());
        mario.addTrait(new Solid());
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Killable());
        mario.addTrait(new Stomper());
        mario.addTrait(new PipeTraveller());
        mario.addTrait(new PoleTraveller());

        mario.traits.get(Killable).removeAfter = Infinity;
        mario.traits.get(Jump).velocity = 175;

        mario.turbo = setTurboState;
        mario.draw = drawMario;

        mario.turbo(false);

        return mario;
    }
}
