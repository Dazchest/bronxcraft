class BuildingDetailsScreen {

    constructor(building, that) {
        this.buttons = [];
        this.active = true;
        this.building = building;
        this.that = that;

        for(let x=0; x<Object.keys(building).length; x++) {
            name = Object.keys(building)[x];
            this[name] = building[name];
        }

        this.buttons.push(new Button({"active": true, "x": 400, "y": 300, "w": 100, "h": 30, "text": "Exit", "screen": this, "action": this.exitDetailsScreen}));
        //this.buttons.push(new Button(400,350,100,30, "Details", this, this.detailsScreen));
        console.log(this.that.active);
    }


    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 75, 200, 200);

            this.drawButtons();
            this.checkButtons();
        }
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
                    if(b.action) {
                        console.log(b.text + " pressed");
                        let callback = b.action;
                        callback(this);
                    }
                }
            }
        }
    }

    exitDetailsScreen = function(self) {
        console.log("inside exitDetailsscreen");
        self.active = false;
        self.that.active = true;
        console.log(self.that.active)
    }

    detailsScreen(self) {
        self.active = false;
        console.log("inside detailsscreen");
    }

}