import { setupDino, updateDino, getDinoRect, setDinoLose } from "./dino.js";
import { setupGround, updateGround } from "./ground.js";
import { setupCactus, updateCactus, getCactusRects } from "./cactus.js";
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.000001;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");
const textElem = document.querySelector("[data-text]");

let lastTime = null;
let speedScale = 1;
let score = null;
let shouldUpdateSpeedScale = true;
let speedTimer = null;

const updateSpeedScale = (delta) => {
    speedScale += delta * SPEED_SCALE_INCREASE;
    shouldUpdateSpeedScale = true;
    speedTimer = null;
};

const updateScore = (delta) => {
    score += delta * 0.01; //10 points per second
    scoreElem.textContent = Math.floor(score);
};
const update = (time_ms) => {
    //time in milliseconds
    if (lastTime === null) {
        lastTime = time_ms;
        window.requestAnimationFrame(update);
        return;
    }

    let delta = time_ms - lastTime;
    //updateGround(delta, 1);

    /*if (shouldUpdateSpeedScale) {
        speedTimer = setTimeout(() => {
            updateSpeedScale(delta);
        }, 1000);
        shouldUpdateSpeedScale = false;
    }*/
    updateSpeedScale(delta);
    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    updateScore( delta );
    if ( checkLose() ) {
        return handleLose()
    }
    lastTime = time_ms;
    window.requestAnimationFrame(update);
};

const checkLose = () => {
    const dinoRect = getDinoRect();
    return getCactusRects().some((rect) => isCollision(rect, dinoRect));
};
const handleLose = () => {
    setDinoLose()
    setTimeout( () => {
        document.addEventListener( "keydown", handleStart, { once: true } )
        textElem.classList.remove("hide")
    },100)
}
const isCollision = (rect1, rect2) => {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    );
};
const scaleWorldWidth = () => {
    let reqRatio = WORLD_WIDTH / WORLD_HEIGHT;
    let currRatio = window.innerWidth / window.innerHeight;
    let scale = 1;
    if (currRatio < reqRatio) {
        /* scale =
            (WORLD_WIDTH / WORLD_HEIGHT) *
            (window.innerHeight / window.innerWidth);
        worldElem.style.width = `${window.innerWidth * scale}px`;*/
        scale = window.innerWidth / WORLD_WIDTH;
    } else {
        /* scale =
            (WORLD_WIDTH / WORLD_HEIGHT) *
            (window.innerHeight / window.innerWidth);
        worldElem.style.height = `${window.innerHeight / scale}px`;*/
        scale = window.innerHeight / WORLD_HEIGHT;
    }
    worldElem.style.width = `${WORLD_WIDTH * scale}px`;
    worldElem.style.height = `${WORLD_HEIGHT * scale}px`;
};

const handleStart = () => {
    lastTime = null;
    speedScale = 1;
    score = 0;
    textElem.classList.add("hide");
    if (speedTimer !== null) {
        clearTimeout(speedTimer);
    }
    setupGround();
    setupDino();
    setupCactus();
    window.requestAnimationFrame(update);
};
scaleWorldWidth();
window.addEventListener("resize", scaleWorldWidth);
window.addEventListener("keydown", handleStart, { once: true });
