



window.onload = init;

var canvas, ctx;
var mouse = {};
var camera = {"x": 0, "y": 0};
var gridSize = {"x":64, "y": 64};
var buildingList = [];
var currentCity = 0;
var thisCity;
var cities = [];
var player;
var resources = {};
var troops = {};
var buildingInfoScreen = {"active": false};
var buildingDetailsScreen = {"active": false};
var buildingUpgradeScreen = {"active": false};
var cityScreen;
var city = {"name": "city", "active": true};
var buildings;
var research = {"construction": 0, "production" : {"food":50, "wood": 20, "stone": 10, "iron": 5}};
var tick = Date.now();
var buildingHandler = new BuildingHandler();
var tempBuild;
var screenManager;

var rp;
var clicked = false;
var scrolling = false;
var mouseDownFired = false;

function init() {
    console.log("initialising game");

    //init cavnas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    });

    canvas.addEventListener('mousedown', function(e) {
        mouseDownFired = false;
        canvas.addEventListener('mousemove', scrollCity);
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', scrollCity);
        })
        canvas.addEventListener('mouseout', function() {
            canvas.removeEventListener('mousemove', scrollCity);
        })
    }); 

    canvas.addEventListener('click', doClick); 


    // canvas.addEventListener('mousemove', function(e) {
    //     console.log("over at " + mouse.x + " , " + mouse.y);
    //     //Building.checkBuildingClick();
    // }); 

    //initilaiase the player
    player = new Player;
    cityScreen = new CityScreen();
    screenManager = new ScreenManager(cityScreen);

    let jsonfile2 = "buildings.json";
    let promise2 = fetch(jsonfile2)
        .then(parseJsonData)
        .then(function(mj) {
            buildings = mj;
            console.log(buildings);
        })

    let jsonfile = "city.json";
    let promise = fetch(jsonfile)
        .then(parseJsonData)
        .then(initBuildingData)
        .catch(gotErr);
    console.log(promise);
    console.log("-------");
    
    function parseJsonData(response) {
        console.log("responded");
        return response.json();
    }
    function gotErr(err) {
        console.log(err);
    }
    function initBuildingData(myJson) {
        console.log(myJson[currentCity].buildings);
        cityData = myJson[currentCity];
        buildingData = cityData.buildings;
        resourceData = cityData.resources;
        troopsData = cityData.troops;
        console.log(resourceData);

        cities.push(new City(cityData.citydata));

        for(var x=0; x<buildingData.length; x++) {
            buildingList.push(new Building(buildingData[x]));
        }
        troops = new Troops(troopsData);
        //for(var x=0; x<resourceData.length; x++) {
            //store the Resource class in individual objects within resources
            resources.food = new Resource(resourceData.food);
            resources.wood = new Resource(resourceData.wood);
            resources.stone = new Resource(resourceData.stone);
            resources.iron = new Resource(resourceData.iron);
            console.log(resources.food.amount);
            // resources.food.add = function() {
            //     resources.food = resources.food.amount + Number(1000);
            // }
        //}


        draw();
    }
}

function doClick() {
    console.log("mouseDownFired = " + mouseDownFired);
    if(mouseDownFired) {
        clicked = false;
        console.log("clicked = " + clicked);
        return;
    }
    clicked = true;
    console.log("clicked = " + clicked);
    console.log("clicked at " + mouse.x + " , " + mouse.y);
}

function d2() {
    console.log("mouse over canvas");
}

function draw() {
    ctx.fillStyle = "#cccc66";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    popup(mouse.x + ", " + mouse.y, 10, 20);
    let gridCoord = convertMouseXYtoGridXY();
    popup(gridCoord.x + ", " + gridCoord.y, 10, 50);


    screenManager.screen.draw();

    buildingHandler.checkBuildingUpgrades();

    buildingHandler.update();

    clicked = false;
    requestAnimationFrame(draw);    
}

