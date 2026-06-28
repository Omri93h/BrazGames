import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumMove.js';
import Physics from '../traits/Physics.js';
import Solid from '../traits/Solid.js';
import Stomper from '../traits/Stomper.js';
import {loadSpriteSheet} from '../loaders/sprite.js';

const DEATH_FLASH_RATE = 12;
const ICE_BADGE_X = 5;
const ICE_BADGE_Y = 8;
const ICE_BADGE_SCALE = 1;
const ICE_BADGE_PATTERN = [
    '111 111 111',
    '010 100 100',
    '010 100 111',
    '010 100 100',
    '111 111 111',
];

export function loadIceAgent1() {
    return loadSpriteSheet('ice-agent-1')
        .then(createIceAgentFactory);
}

export function loadIceAgent2() {
    return loadSpriteSheet('ice-agent-2')
        .then(createIceAgentFactory);
}

class Behavior extends Trait {
    collides(us, them) {
        if (us.traits.get(Killable).dead) {
            return;
        }

        if (them.traits.has(Stomper)) {
            if (them.vel.y > us.vel.y) {
                us.traits.get(Killable).kill();
                us.traits.get(PendulumMove).speed = 0;
            } else {
                them.traits.get(Killable).kill();
            }
        }
    }
}

function createIceAgentFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');

    function routeAnim(agent) {
        return walkAnim(agent.lifetime);
    }

    function drawIceAgent(context) {
        const killable = this.traits.get(Killable);
        if (killable.dead && Math.floor(killable.deadTime * DEATH_FLASH_RATE) % 2 === 1) {
            return;
        }

        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
        drawIceBadge(context, ICE_BADGE_X, ICE_BADGE_Y);
    }

    return function createIceAgent() {
        const agent = new Entity();
        agent.size.set(15, 21);
        agent.offset.x = 4;
        agent.offset.y = 3;

        agent.addTrait(new Physics());
        agent.addTrait(new Solid());
        agent.addTrait(new PendulumMove());
        agent.addTrait(new Behavior());
        agent.addTrait(new Killable());

        agent.draw = drawIceAgent;

        return agent;
    };
}

function drawIceBadge(context, x, y) {
    context.save();
    context.fillStyle = 'rgba(4, 8, 14, 0.88)';
    context.fillRect(x - 1, y - 1, 13, 7);
    context.fillStyle = '#ffffff';

    ICE_BADGE_PATTERN.forEach((row, rowIndex) => {
        [...row].forEach((cell, colIndex) => {
            if (cell !== '1') return;
            context.fillRect(
                x + colIndex * ICE_BADGE_SCALE,
                y + rowIndex * ICE_BADGE_SCALE,
                ICE_BADGE_SCALE,
                ICE_BADGE_SCALE,
            );
        });
    });

    context.restore();
}
