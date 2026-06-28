import Trait from '../Trait.js';
import Stomper from '../traits/Stomper.js';

const COIN_LIFE_THRESHOLD = 100;

export default class Player extends Trait {
    constructor() {
        super();
        this.name = "UNNAMED";
        this.world = "UNKNOWN";
        this.coins = 0;
        this.lives = 3;
        this.score = 0;
        this.poweredUp = false;
        this.damageGrace = 0;

        this.listen(Stomper.EVENT_STOMP, () => {
            this.score += 100;
            console.log('Score', this.score);
        });
    }

    addCoins(count) {
        this.coins += count;
        this.queue(entity => entity.sounds.add('coin'));
        while (this.coins >= COIN_LIFE_THRESHOLD) {
            this.addLives(1);
            this.coins -= COIN_LIFE_THRESHOLD;
        }
    }

    addLives(count) {
        this.lives += count;
    }

    powerUp(entity) {
        const bottom = entity.bounds.bottom;
        this.poweredUp = true;
        this.score += 1000;
        entity.size.set(16, 32);
        entity.bounds.bottom = bottom;
    }

    powerDown(entity, {preserveBottom = true} = {}) {
        const bottom = entity.bounds.bottom;
        this.poweredUp = false;
        entity.size.set(14, 16);
        if (preserveBottom) {
            entity.bounds.bottom = bottom;
        }
    }

    absorbDamage(entity) {
        this.powerDown(entity);
        this.damageGrace = 1.25;
        entity.sounds.add('power-down');
    }

    resetDamageGrace() {
        this.damageGrace = 0;
    }

    update(entity, {deltaTime}) {
        if (this.damageGrace > 0) {
            this.damageGrace = Math.max(0, this.damageGrace - deltaTime);
        }
    }
}
