import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Stomper from '../traits/Stomper.js';
import {loadAudioBoard} from '../loaders/audio.js';
import {loadSpriteSheet} from '../loaders/sprite.js';

const DEATH_FLASH_RATE = 14;
const PRESENCE_START_DELAY = 0.85;
const PRESENCE_MAX_SECONDS = 5;
const EDGE_PROBE_DISTANCE = 6;
const EDGE_PROBE_DEPTH = 12;
const SUPER_SPEED = -58;

function isSolidFooting(tile) {
    return tile.behavior === 'ground'
        || tile.behavior === 'brick'
        || tile.style === 'chance';
}

function hasGroundAhead(entity, level, direction) {
    const probeX = direction < 0
        ? entity.bounds.left - EDGE_PROBE_DISTANCE
        : entity.bounds.right + EDGE_PROBE_DISTANCE;
    const y1 = entity.bounds.bottom + 1;
    const y2 = entity.bounds.bottom + EDGE_PROBE_DEPTH;

    return level.tileCollider.resolvers.some(resolver => {
        return resolver.searchByRange(probeX, probeX, y1, y2)
            .some(match => isSolidFooting(match.tile));
    });
}

export function loadAdolfJackson(audioContext) {
    return Promise.all([
        loadSpriteSheet('adolf-jackson'),
        loadAudioBoard('adolf-jackson', audioContext),
    ]).then(([sprite, audio]) => createAdolfJacksonFactory(sprite, audio));
}

class Behavior extends Trait {
    constructor() {
        super();
        this.seen = false;
        this.presenceStarted = false;
        this.presenceStartedAt = 0;
        this.presenceSource = null;
        this.seenAt = 0;
    }

    stopPresence() {
        if (!this.presenceSource) {
            return;
        }

        try {
            this.presenceSource.stop(0);
        } catch (error) {
            // The Web Audio node may already have ended; either way, it is done.
        }
        this.presenceSource = null;
    }

    startPresence(entity, gameContext, level) {
        this.presenceStarted = true;
        this.presenceStartedAt = level.totalTime;
        this.presenceSource = entity.audio.playAudio('presence', gameContext.audioContext);
        if (this.presenceSource) {
            this.presenceSource.addEventListener('ended', () => {
                this.presenceSource = null;
            });
        }
    }

    collides(us, them) {
        if (us.traits.get(Killable).dead) {
            return;
        }

        if (them.traits.has(Stomper)) {
            if (them.vel.y > us.vel.y) {
                this.stopPresence();
                us.traits.get(Killable).kill();
                us.traits.get(PendulumMove).speed = 0;
            } else {
                them.traits.get(Killable).kill();
            }
        }
    }

    update(entity, gameContext, level) {
        if (entity.traits.get(Killable).dead) {
            this.stopPresence();
            return;
        }

        if (this.presenceSource && level.totalTime - this.presenceStartedAt >= PRESENCE_MAX_SECONDS) {
            this.stopPresence();
        }

        const cameraLeft = level.camera.pos.x;
        const cameraRight = cameraLeft + level.camera.size.x;
        const visible = entity.bounds.right >= cameraLeft && entity.bounds.left <= cameraRight;
        if (!visible) {
            return;
        }

        const pendulumMove = entity.traits.get(PendulumMove);
        const direction = Math.sign(pendulumMove.speed || entity.vel.x || -1);
        if (!hasGroundAhead(entity, level, direction)) {
            pendulumMove.speed = -pendulumMove.speed;
            entity.vel.x = 0;
        }

        if (!this.seen) {
            this.seen = true;
            this.seenAt = level.totalTime;
            entity.sounds.add('hee-hee');
        }

        if (!this.presenceStarted && level.totalTime - this.seenAt >= PRESENCE_START_DELAY) {
            this.startPresence(entity, gameContext, level);
        }
    }
}

function createAdolfJacksonFactory(sprite, audio) {
    function drawAdolfJackson(context) {
        const killable = this.traits.get(Killable);
        if (killable.dead && Math.floor(killable.deadTime * DEATH_FLASH_RATE) % 2 === 1) {
            return;
        }

        sprite.draw('idle', context, 0, 0, this.vel.x < 0);
    }

    return function createAdolfJackson() {
        const agent = new Entity();
        agent.audio = audio;
        agent.size.set(15, 21);
        agent.offset.x = 4;
        agent.offset.y = 3;

        const pendulumMove = new PendulumMove();
        pendulumMove.speed = SUPER_SPEED;

        agent.addTrait(new Physics());
        agent.addTrait(new Solid());
        agent.addTrait(pendulumMove);
        agent.addTrait(new Behavior());
        agent.addTrait(new Killable());

        agent.draw = drawAdolfJackson;

        return agent;
    };
}
