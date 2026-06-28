import { getCustomProperty, incrementCustomProperty,setCustomProperty } from "./utils.js"
const groundElems = document.querySelectorAll("[data-ground]")

const  SPEED = 0.05

export const setupGround = () =>{
    setCustomProperty(groundElems[0],"--left",0)
    setCustomProperty(groundElems[1],"--left",300)//width is 300% in css
}
export const updateGround = (delta,speedScale) =>{
    groundElems.forEach(ground=>{
        incrementCustomProperty(ground,"--left",delta * SPEED * -1 * speedScale)
        if(getCustomProperty(ground,"--left")<=-300){
            //setCustomProperty(ground,"--left",300)
            incrementCustomProperty(ground,"--left",600)
        }
    })
}
