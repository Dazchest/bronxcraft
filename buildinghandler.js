// Building Handler
class BuildingHandler {
    constructor() {
        this.newBuildingCoords = {};
        this.highlightGrid = false;
        this.slots = 2;
        this.usedSlots = 0;
        this.queueAmount = 3;
        this.queue = [];
    }
    update() {
        if (cities[currentCity].active) {
            this.checkBuildingClick();
            this.highlightEmptyBuildSpot();
        }
    }
    drawBuildings() {
        if (buildingList.length > 0) {
            for (let x = 0; x < buildingList.length; x++) {
                buildingList[x].draw();
            }
        }
    }
    displayNewBuildings(gridCoord) {
        this.currentBuilding = null;
        this.highlightGrid = true;
        this.newBuildingCoords = gridCoord;
        this.buildingDiv = document.getElementById('buildingDiv');
        this.buildingDiv.style.visibility = "visible";
        console.log(buildings.length);
        this.buildingSelect = document.getElementById('buildingSelect');
        this, this.buildingSelect.innerHTML = "<option>Select Building</option>";
        for (let x = 0; x < buildings.length; x++) {
            if (this.getBuildingCount(buildings[x].type) < buildings[x].quantityAllowed) {
                let o = document.createElement('option');
                o.value = buildings[x].type;
                o.innerText = buildings[x].name;
                this.buildingSelect.appendChild(o);
            }
        }
    }
    getBuildingCount(type) {
        // check quantity of building allowed
        let buildingCount = 0;
        for (let x = 0; x < buildingList.length; x++) {
            if (buildingList[x].type == type) {
                buildingCount++;
            }
        }
        return buildingCount;
    }
    buildSlots() {
    }
    selectNewBuilding(s) {
        console.log(this.newBuildingCoords);
        console.log(s.options[s.selectedIndex].value);
        this.selectedBuilding = s.options[s.selectedIndex].value;
        let tempData = {};
        tempData.buttons = [];
        tempData.name = buildings[this.selectedBuilding].name;
        tempData.production = buildings[this.selectedBuilding].production;
        tempData.type = buildings[this.selectedBuilding].type;
        tempData.level = 0;
        tempData.newBuilding = true;
        tempData.gridPos = { "x": this.newBuildingCoords.x, "y": this.newBuildingCoords.y };
        tempBuild = new Building(tempData);
        buildingUpgradeScreen = new BuildingUpgradeScreen(tempBuild);
        screenManager.screen = buildingUpgradeScreen;
        this.buildingDiv.style.visibility = "hidden";
    }
    startNewBuilding() {
        return;
        this.highlightGrid = false;
        this.usedSlots = 20;
        console.log("used slots = " + this.usedSlots);
        let newBuildData = {};
        let b = buildings[this.selectedBuilding];
        newBuildData.name = b.name;
        newBuildData.production = b.production;
        newBuildData.type = b.type;
        newBuildData.level = 0;
        newBuildData.gridPos = { "x": this.newBuildingCoords.x, "y": this.newBuildingCoords.y };
        let newBuild = new Building(newBuildData);
        newBuild.upgrade();
        buildingList.push(newBuild);
        this.buildingDiv.style.visibility = "hidden";
    }
    highlightEmptyBuildSpot() {
        ctx.fillText(this.highlightGrid, 350, 450);
        if (this.highlightGrid) {
            ctx.beginPath();
            ctx.fillStyle = "#ff0000";
            ctx.strokeStyle = "#ff0000";
            ctx.rect(this.newBuildingCoords.x * gridSize.x + camera.x, this.newBuildingCoords.y * gridSize.y + camera.y, 64, 64);
            ctx.stroke();
        }
    }
    hideOuterButtons() {
        for (let x = 0; x < buildingList.length; x++) {
            buildingList[x].hideButtons();
        }
    }

    checkBuildingUpgrades() {
        let c = 0;1
        for(let x=0; x<buildingList.length; x++) {
            if(buildingList[x].upgrading) {
                buildingList[x].checkUpgrading();
                buildingList[x].displayUpgradeTimer(c);
                c++;
            }
        }
    
        // do this routine every second
        if(Date.now() - tick > 1000) {
            //console.log("second");
            tick = Date.now();
            for(let x=0; x<buildingList.length; x++) {
                buildingList[x].checkProduction();
            }
        }
    }

    
    checkBuildingClick() {
        buildingHandler.hideOuterButtons();
        if(buildingHandler.currentBuilding) {
            buildingHandler.currentBuilding.showButtons();
            buildingHandler.currentBuilding.checkButtons();
        }
        if(cities[currentCity].active == true && clicked) {
            buildingHandler.hideOuterButtons();
            let gridCoord = convertMouseXYtoGridXY();
            let buildingClicked = false;

            for(let x=0; x<buildingList.length; x++) {
                if(gridCoord.x == buildingList[x].gridPos.x && gridCoord.y == buildingList[x].gridPos.y) {
                    console.log("found " + buildingList[x].name);
                    buildingHandler.currentBuilding = buildingList[x];
                    buildingHandler.highlightGrid = false;
                    buildingList[x].click();
                    buildingClicked = true;
                }
            }

            // if(buildingHandler.currentBuilding) {
            //     buildingHandler.currentBuilding.showButtons();
            //     buildingHandler.currentBuilding.checkButtons();
            // }

            if(buildingClicked) {
                return;
            }

            //reset all buildings outerbuttons active to false
            // for(let x=0; x<buildingList.length; x++) {
            //     buildingList[x].hideButtons();
            // }

            console.log("blank square clicked " + gridCoord.x + ", " + gridCoord.y);

            buildingHandler.displayNewBuildings(gridCoord);
        }
    }

}
