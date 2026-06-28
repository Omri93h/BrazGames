import Entity from '../Entity.js';
import Trait from '../Trait.js';
import Physics from '../traits/Physics.js';
import Player from '../traits/Player.js';
import Solid from '../traits/Solid.js';
import {Sides} from '../Entity.js';

const MUSHROOM_TYPES = new Set(['red', 'green', 'yellow', 'purple']);
const MUSHROOM_COLORS = {
    red: {
        cap: '#e5322e',
        spots: '#fff7df',
        accent: '#9d1818',
    },
    green: {
        cap: '#20b84a',
        spots: '#dfff8b',
        accent: '#0b6f2a',
    },
    yellow: {
        cap: '#ffd02f',
        spots: '#fff9b5',
        accent: '#c78500',
    },
    purple: {
        cap: '#8f46ff',
        spots: '#ffd6ff',
        accent: '#4c1b9b',
    },
};

class PowerMushroom extends Trait {
    constructor(originY, type = 'red') {
        super();
        this.originY = originY;
        this.targetY = originY - 16;
        this.emerging = true;
        this.speed = 48;
        this.direction = 1;
        this.type = type;
    }

    collides(us, them) {
        if (us.dead || !them.traits.has(Player) || this.emerging) {
            return;
        }

        us.dead = true;
        if (this.type === 'green') {
            window.superBrazioPsychedelic?.activate();
            window.parent?.postMessage({
                source: 'super-brazio-vendor',
                type: 'powerup',
                powerup: 'green-mushroom',
                team: window.superBrazioPlayerTeam || 'unknown',
            }, '*');
        } else if (this.type === 'yellow' || this.type === 'purple') {
            window.superBrazioPowerupState?.activate(this.type);
        } else {
            const player = them.traits.get(Player);
            player.powerUp(them);
        }
        them.sounds.add('power-up-consume');
    }

    update(us, gameContext, level) {
        if (us.dead) {
            this.queue(() => {
                level.entities.delete(us);
            });
            return;
        }

        if (this.emerging) {
            us.vel.x = 0;
            us.vel.y = -28;
            if (us.pos.y <= this.targetY) {
                us.pos.y = this.targetY;
                us.vel.x = this.speed * this.direction;
                us.vel.y = 0;
                us.traits.get(Solid).obstructs = true;
                this.emerging = false;
                us.sounds.add('power-up-appears');
            }
        } else {
            us.vel.x = this.speed * this.direction;
        }
    }

    obstruct(us, side) {
        if (this.emerging) {
            return;
        }

        if (side === Sides.LEFT || side === Sides.RIGHT) {
            this.direction *= -1;
            us.vel.x = this.speed * this.direction;
            this.queue(() => {
                us.vel.x = this.speed * this.direction;
            });
        }
    }
}

function drawMushroom(context) {
    if (this.dead) {
        return;
    }

    const mushroom = this.traits.get(PowerMushroom);
    const colors = MUSHROOM_COLORS[mushroom?.type] || MUSHROOM_COLORS.red;

    context.fillStyle = '#f8f0d8';
    context.fillRect(4, 8, 8, 8);
    context.fillStyle = colors.cap;
    context.fillRect(1, 2, 14, 8);
    context.fillStyle = colors.spots;
    context.fillRect(3, 4, 4, 3);
    context.fillRect(10, 4, 3, 3);
    context.fillStyle = colors.accent;
    context.fillRect(7, 2, 2, 2);
    context.fillRect(13, 7, 2, 2);
    context.fillStyle = '#1b1b1b';
    context.fillRect(6, 10, 2, 2);
    context.fillRect(10, 10, 2, 2);
}

function spawnMushroom(level, match) {
    const mushroomType = MUSHROOM_TYPES.has(match.tile.mushroom)
        ? match.tile.mushroom
        : 'red';
    const mushroom = new Entity();
    mushroom.size.set(16, 16);
    mushroom.pos.set(
        match.x1 + ((match.x2 - match.x1) / 2) - mushroom.size.x / 2,
        match.y1,
    );
    mushroom.dead = false;
    mushroom.addTrait(new PowerMushroom(match.y1, mushroomType));
    mushroom.addTrait(new Physics());
    const solid = new Solid();
    solid.obstructs = false;
    mushroom.addTrait(solid);
    mushroom.draw = drawMushroom;
    level.entities.add(mushroom);
}

function handleX({entity, match}) {
    if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
            entity.obstruct(Sides.RIGHT, match);
        }
    } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
            entity.obstruct(Sides.LEFT, match);
        }
    }
}

function handleY({entity, match, resolver, level}) {
    if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
            entity.obstruct(Sides.BOTTOM, match);
        }
    } else if (entity.vel.y < 0) {
        if (entity.traits.has(Player)) {
            const grid = resolver.matrix;
            grid.set(match.indexX, match.indexY, {
                ...match.tile,
                style: 'bricks',
                behavior: 'ground',
            });
            spawnMushroom(level, match);
            entity.sounds.add('coin');
        }

        if (entity.bounds.top < match.y2) {
            entity.obstruct(Sides.TOP, match);
        }
    }
}

export const chance = [handleX, handleY];
