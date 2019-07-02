class CityScreen extends ScreenView {

    // get the defaults from ScreenView
    constructor() {

        super();

        this.bing();
        this.name = "City";

        console.log("this is CityScreen constructor");
        return;
        let b = {}; // new Button();
        b.x = 50;
        b.y = 125;
        b.w = 50;
        b.h = 50;
        b.offset = {"x": 100, "y": 100}; 
        b.type = "upgrade";
        b.text = "Upgrade";
        b.color = "#00ff00";
        b.active = false;
        b.action = this.upgradeBuilding;
        let bb = new Button(b);
        this.buttons.push(new Button({"active": true, "x": 400, "y": 300, "w": 100, "h": 30, "text": "Exit", "screen": this, "action":  this.exitScreen}));
        //this.buttons.push(new Button({"active": true, "x": 400, "y": 350, "w": 100, "h": 30, "text": "Details", "screen": this, "action":  this.detailsScreen}));
        this.buttons.push(bb);
        console.log(this);
        
        cities[currentCity].active = false;
        buildingHandler.highlightGrid = false;
    }

    tick() {
        //console.log("fff");
        this.draw();

    }

    draw() {
        //console.log("cityscreen here");
        //return;
        if(this.active) {
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#aaaaff";
            ctx.fillRect(this.x, this.y, this.w, this.h);

            ctx.fillStyle = '#000000';
            ctx.font = "20px Georgia";
            ctx.fillText(this.name, this.x, this.y + 20);
    
            //this.displayUpgradeRequirements();
            //this.drawButtons();
           // this.checkButtons();
           buildingHandler.drawBuildings();
           Resource.drawAll();
           }
    }


}