class ScreenManager {
    
    constructor(screen) {
        this.screen = screen;
        this.screen.active = true;
    }

    closeCurrentScreen() {
        this.screen.active = false;
    }

}

class ScreenView {
    
    constructor() {
        this.margin = 10;
        this.x = 10;
        this.y = 100;
        this.w = canvas.width - this.margin * 2;
        this.h = canvas.height - this.y - this.margin * 1;

        this.active = true;

        this.buttons = [];
        console.log("this is ScreenView constructor");

    }

    ticktock() {
        this.tick();
    }

    exitScreen = function(self) {
        console.log("closing the screen");
        self.active = false;
        cities[currentCity].active = true;
        //screenManager.screen =    
        //cityScreen = new CityScreen();
        screenManager = new ScreenManager(cityScreen);
        }

    drawButtons() {
        for(let x=0; x<this.buttons.length; x++) {
             this.buttons[x].draw();
         }
    }

    checkButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            if(clicked) {   //mouse is clicked, check if it was on a button
                let b = this.buttons[x];
                if(mouse.x > b.x && mouse.x < b.x + b.w && mouse.y > b.y && mouse.y < b.y + b.h) {
                    if(b.action && b.active) {
                        clicked = false;
                        console.log(b.text + " pressed");
                        let callback = b.action;
                        callback(this);
                    }
                }
            }
        }
    }



    bing() {
        console.log("pressed the bong");
    }
}