class Building {


    constructor(data) {
        console.log("this is building constructor");
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }

        this.amount = 0;
        this.collectable = false;
        this.collactableTime = 10;  // can collect rss after # seconds
        this.buttons = [];
        this.buttons.push(new Button({"active": false, "offset" : {"x": 0, "y": -30}, "w": 100, "h": 30, "text": "Upgrade", "screen": this, "action": this.upgradeScreen}));
    }

    drawButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            let b = this.buttons[x];
            if(b.active) {
                b.x = b.offset.x + this.gridPos.x * gridSize.x + camera.x;
                b.y = b.offset.y + this.gridPos.y * gridSize.y + camera.y;
                b.draw();
            }
        }
    }
    showButtons() {
        if(this.collectable == false) { // no rss to collect, so show button
            for(let x=0; x<this.buttons.length; x++) {
                this.buttons[x].show();
            }
        }
    }
    hideButtons() {
        for(let x=0; x<this.buttons.length; x++) {
            this.buttons[x].hide();
        }
    }

    checkButtons() {
        console.log("checking buttons???");
        this.buttonClicked = false;
        var b;
        for(let x=0; x<this.buttons.length; x++) {
            if(clicked) {   //mouse is clicked, check if it was on a button
                console.log("checking buttons???");
                b = this.buttons[x];
                console.log("action = " + b.action);
                console.log("active = " + b.active);
                if(mouse.x > b.x && mouse.x < b.x + b.w && mouse.y > b.y && mouse.y < b.y + b.h) {
                    if(b.action && b.active) {
                        this.buttonClicked = b;
                    }
                }
            }
        }
        if(this.buttonClicked) {
            clicked = false;
            console.log(b.text + " pressed");
            let callback = b.action;
            callback(this);
        }
    }


    draw() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(this.gridPos.x * gridSize.x + camera.x, this.gridPos.y * gridSize.y + camera.y, gridSize.x, gridSize.y);

        ctx.fillStyle = '#000000';
        ctx.font = "20px Georgia";
        ctx.fillText(this.name, this.gridPos.x * gridSize.x + camera.x, this.gridPos.y * gridSize.y + camera.y + 20);
        ctx.font = "15px Georgia";
        ctx.fillText("level: " + this.level, this.gridPos.x * gridSize.x + camera.x, this.gridPos.y * gridSize.y + camera.y + 40);
        ctx.font = "15px Georgia";
        ctx.fillText("a: " + this.amount, this.gridPos.x * gridSize.x + camera.x, this.gridPos.y * gridSize.y + camera.y + 60);

        //this.checkButtons();
        this.drawButtons();
    }




    upgrade() {
        this.upgrading = true;

        this.startTime = Date.now()/1000;   //convert to seconds
        let buildTime = buildings[this.type].levels[this.level].baseBuildTime;
        this.buildTime = Math.ceil(buildTime / (1+(research.construction/100)));
        this.endTime = this.startTime + this.buildTime;
        console.log(buildTime);

        resources.food.amount -= buildings[this.type].levels[this.level].requirements.resources.food;
        resources.wood.amount -= buildings[this.type].levels[this.level].requirements.resources.wood;
        resources.stone.amount -= buildings[this.type].levels[this.level].requirements.resources.stone;
        resources.iron.amount -= buildings[this.type].levels[this.level].requirements.resources.iron;
    }

    checkUpgrading() {
        if(this.upgrading) {
            if(this.endTime <= Date.now()/1000) {
                this.upgrading = false;
                console.log("upgrade complete");
                buildingHandler.usedSlots--;
                if(this.production) {
                    this.pph = buildings[this.type].levels[this.level].pph;
                }
                this.collectionTime = Date.now();
                this.level ++;
            }
        }
    }
    displayUpgradeTimer(c) {
        popup(this.endTime - Date.now()/1000, 180, 565 + (c * 20));
    }

    checkProduction() {
        if(this.pph){
            let p = this.production;
            let pph = this.pph + (this.pph * (research.production[p]/100));
            this.timeElapsed = (Date.now() - this.collectionTime) / 1000;    // in seconds
            this.collectable = true;
            if(this.timeElapsed < this.collactableTime) {
                this.collectable = false;
                return;                 // can only collect after # seconds/minutes
            } 
            if(this.timeElapsed > 60*60) {   // no production after 1 hour
                this.timeElapsed = 60*60;   // set to 1 hour
            }

            pph = pph * (this.timeElapsed);
            this.amount = Math.floor(pph/3600);
        }
        if(this.production == "rss"){   //its a warehouse
            this.timeElapsed = (Date.now() - this.collectionTime) / 1000;    // in seconds
        }
    }

    collectProduction() {
        if(this.production == "rss") {  // collect all rss
            console.log("collecting from warehouse");
            for(let x=0; x<buildingList.length; x++) {
                if(buildingList[x].pph) {
                    resources[buildingList[x].production].amount += buildingList[x].amount;
                    buildingList[x].collectionTime = Date.now();
                    buildingList[x].amount = 0;
                }
            }
        } else {
            resources[this.production].amount += this.amount;
            this.collectionTime = Date.now();
            this.amount = 0;
        }
    }

    click() {
        console.log("clicked = " + this.name);
        if(this.timeElapsed > this.collactableTime) {
            this.collectProduction();
            clicked = false;    
            buildingHandler.currentBuilding = null;
            return;            
        }
        //buildingInfoScreen = new BuildingInfoScreen(this);
        buildingHandler.hideOuterButtons();
        this.showButtons();
        clicked = false;
    }

    upgradeScreen(self) {
        console.log("upgrade screen please!!!");
        buildingUpgradeScreen = new BuildingUpgradeScreen(self);
        screenManager.screen = buildingUpgradeScreen;

    }

    upgradeBuilding() {
        if(this.newBuilding) {
            buildingList.push(this);
            this.newBuilding = false;
        }
        buildingHandler.usedSlots++;
        this.upgrade();
        //self.exitInfoScreen(self);
    }


}



