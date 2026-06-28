import {Vec2} from './math.js';

export function getActiveCheckpoint(level) {
    const checkpoint = level.currentCheckpoint || level.checkpoints?.[0] || new Vec2(0, 0);
    return new Vec2(checkpoint.x, checkpoint.y);
}

export function activateCheckpoint(level, flag) {
    flag.reached = true;
    level.activeCheckpointIndex = flag.index;
    level.currentCheckpoint = new Vec2(flag.spawn.x, flag.spawn.y);
    return flag;
}

export function collectReachedCheckpoints(level, mario) {
    if (!level.checkpointFlags?.length) {
        return [];
    }

    const activated = [];
    const marioCenterX = mario.bounds.meridian;
    const marioBottom = mario.bounds.bottom;

    level.checkpointFlags.forEach(flag => {
        if (flag.reached) {
            return;
        }

        const isPastFlag = marioCenterX >= flag.pos.x - 2;
        const isNearVerticalBand = marioBottom >= flag.pos.y - 72 && mario.bounds.top <= flag.pos.y + 10;
        if (!isPastFlag || !isNearVerticalBand) {
            return;
        }

        activated.push(activateCheckpoint(level, flag));
    });

    return activated;
}
