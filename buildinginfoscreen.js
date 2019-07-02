class BuildingInfoScreen {

    constructor(building, that) {
        this.buttons = [];
        this.active = true;
        this.building = building;
        this.that = that;

        this.x = 10;
        this.y = 175;
        this.w = 200;
        this.h = 200;

        for(let x=0; x<Object.keys(building).length; x++) {
            name = Object.keys(building)[x];
            this[name] = building[name];
        }
        let b = {}; // new Button();
        b.x = 50;
        b.y = 125;
        b.w = 50;
        b.h = 50;
        b.type = "upgrade";
        b.text = "Upgrade";
        b.color = "#00ff00";
        b.active = false;
        b.action = this.upgradeBuilding;
        let bb = new Button(b);
        this.buttons.push(new Button({"active": true, "x": 400, "y": 300, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitInfoScreen}));
        this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));
        this.buttons.push(bb);
        console.log(this);
        //this.that.active = false;
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
    }

    displayUpgradeRequirements() {
        ctx.font = "20px Georgia";
        let fontC = '#0000ff';

        let requirementMet = true;
        let level = this.level; //level will be 1 above, because of index 0
        let levelMaxed = false;
        let buildingType = this.type;
        let buildingName = this.name;
        ctx.fillText("Building: " + buildingName + " - " + buildingType, 100, 450);

        if(level == buildings[buildingType].levels.length) {
            ctx.fillText("level maxed" , 200, 100);  
            levelMaxed = true;
        }
        if(levelMaxed == false) {
            // check quantity of building allowed
            let buildingCount = 0;
            for(let x=0; x<buildingList.length; x++) {
                if(buildingList[x].type == buildingType) {
                    buildingCount ++;
                }
            }
            ctx.fillText("build count: " + buildingCount, 280, 300);

            // check current buildings
            let br = buildings[buildingType].levels[level].requirements.buildings;
            for(let x=0; x<br.length; x++) {
                let brName = buildings[br[x].type].name;
                let brType = br[x].type;
                fontC = '#0000ff';

                var typeFound = false;
                for(let y=0; y<buildingList.length; y++) { // check if building required is even built yet 
                    //console.log("type found = " + brType);
                    if(buildingList[y].type == brType) { 
                        typeFound = true;
                    }
                }
                if(typeFound) {
                    if(buildingList[brType].level < br[x].level) {
                        requirementMet = false;
                        fontC = '#ff0000';
                    }
                } else {
                    fontC = '#ff0000';
                    requirementMet = false;
                }


                ctx.fillStyle = fontC;
                ctx.fillText("build req: " + brName + " - " + brType + " - " + br[x].level, 100, 500 + (x * 25));
                //ctx.fillText("build req: " + buildingList[brType].level, 50, 550 + (x * 25));
            }


            // check resources
            let food = buildings[buildingType].levels[level].requirements.resources.food;
            let wood = buildings[buildingType].levels[level].requirements.resources.wood;
            let stone = buildings[buildingType].levels[level].requirements.resources.stone;
            let iron = buildings[buildingType].levels[level].requirements.resources.iron;

            fontC = '#0000ff';
            if(resources.food.amount < food) {
                requirementMet = false;
                fontC = '#ff0000';
            }
            ctx.fillStyle = fontC;
            ctx.fillText("Food: " + food, 200, 400);

            fontC = '#0000ff';
            if(resources.wood.amount < wood) {
                requirementMet = false;
                fontC = '#ff0000';
            }
            ctx.fillStyle = fontC;
            ctx.fillText("Wood: " + wood, 200, 425);

            fontC = '#0000ff';
            if(resources.stone.amount < stone) {
                requirementMet = false;
                fontC = '#ff0000';
            }
            ctx.fillStyle = fontC;
            ctx.fillText("Stone: " + stone, 200, 450);

            fontC = '#0000ff';
            if(resources.iron.amount < iron) {
                requirementMet = false;
                fontC = '#ff0000';
            }
            ctx.fillStyle = fontC;
            ctx.fillText("Iron: " + iron, 200, 475);
        } else {
            requirementMet = false;
        }

        // check if build slots are full
        if(buildingHandler.usedSlots >= buildingHandler.slots) {
            requirementMet = false;
            console.log("all slots are full");
        }

        ctx.fillText("requirements met: " + requirementMet, 375, 100);

        if(requirementMet) {
            setButtonActive(this.buttons, "upgrade");
        }

}


    draw() {
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);
    
            this.displayUpgradeRequirements();
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

    exitInfoScreen = function(self) {
        console.log("inside exitinfosscreen");
        self.active = false;
        cities[currentCity].active = true;
    }

    detailsScreen(self) {
        self.active = false;
        console.log("going to  detailsscreen");
        buildingDetailsScreen = new BuildingDetailsScreen(self.building, self);
        buildingDetailsScreen.active = true;
    }

    upgradeBuilding(self) {
        if(self.building.newBuilding) {
            buildingList.push(self.building);
            self.building.newBuilding = false;
        }
        buildingHandler.usedSlots++;
        self.building.upgrade();
        self.exitInfoScreen(self);
    }

}