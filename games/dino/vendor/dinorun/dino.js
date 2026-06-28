import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./utils.js"

const dinoElem = document.querySelector("[data-dino]")

const JUMP_SPEED = 0.4
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping = false;
let dinoFrame  = 0
let currentFrameRate = 0
let yVelocity = 0
export const setupDino = () => {
    isJumping = false;
    dinoFrame = 0;
    currentFrameRate = 0
    yVelocity = 0
    dinoElem.src = "assets/dinorun/dino-stationary.png"
    setCustomProperty(dinoElem,"--bottom",0)
    document.removeEventListener("keydown",onJump)
    document.addEventListener("keydown",onJump)
}

export const handleRun = (delta,speedScale) => {
    if(isJumping){
        dinoElem.src = "assets/dinorun/dino-stationary.png"
        return
    }
    if(currentFrameRate >= FRAME_TIME){
        dinoFrame = (dinoFrame+1)%DINO_FRAME_COUNT
        dinoElem.src = `assets/dinorun/dino-run-${dinoFrame}.png`
        currentFrameRate -= FRAME_TIME
    }
    currentFrameRate += delta * speedScale
}
export const handleJump = (delta) => {
    if(!isJumping){
        return;
    }
    incrementCustomProperty(dinoElem,"--bottom",yVelocity*delta)
    if(getCustomProperty(dinoElem,"--bottom")<=0){
        setCustomProperty(dinoElem,"--bottom",0)
        isJumping = false
    }
    yVelocity-=GRAVITY * delta
}


export const onJump = (e)=>{
    if(e.code !== "Space" || isJumping){
        return
    }
    yVelocity = JUMP_SPEED
    isJumping = true
}
export const updateDino = (delta,speedScale) => {
    handleRun(delta,speedScale)
    handleJump(delta)
}
export const getDinoRect = () => {
    return dinoElem.getBoundingClientRect();
};

export const setDinoLose = () => {
    dinoElem.src = "assets/dinorun/dino-lose.png"
}
