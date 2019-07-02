function convertMouseXYtoGridXY() {
    let x = Math.floor((mouse.x - camera.x)/ gridSize.x);
    let y = Math.floor((mouse.y - camera.y)/ gridSize.y);
    return {"x": x, "y": y};
}


function setButtonActive(buttons, type) {
    for(let x=0; x< buttons.length; x++) {
        if(buttons[x].type == type) {
            buttons[x].active = true;
        }
    }

}