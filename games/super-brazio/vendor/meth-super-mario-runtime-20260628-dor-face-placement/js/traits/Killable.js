import Trait from '../Trait.js';
import Player from './Player.js';

export default class Killable extends Trait {
    constructor() {
        super();
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
        this.killQueued = false;
    }

    kill() {
        if (this.dead || this.killQueued) {
            return;
        }

        this.killQueued = true;
        this.queue(entity => {
            this.killQueued = false;
            const player = entity.traits.get(Player);
            if (player) {
                if (player.damageGrace > 0) {
                    return;
                }
                if (player.poweredUp) {
                    player.absorbDamage(entity);
                    return;
                }
            }

            this.dead = true;
        });
    }

    revive() {
        this.dead = false;
        this.deadTime = 0;
    }

    update(entity, {deltaTime}, level) {
        if (this.dead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.removeAfter) {
                this.queue(() => {
                    level.entities.delete(entity);
                });
            }
        }
    }
}
