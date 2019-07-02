class City {

    constructor(data) {
        console.log("this is the city constructor");
        //console.log(data);
        // this.data = data;
        // let r = "res";
        // this[r] = data.resources;
        //console.log(this.resources.gold);
        //console.log(this.data.resources.wood);

        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];// (data[x]).value;
            //console.log(data[name]);
            this[name] = data[name];
        }
    }
}

function scrollCity(e) {
    mouseDownFired = true;
    if(cities[currentCity].active) {
        scrolling = true;
        if(camera.x + e.movementX >= 0) {
            camera.x += e.movementX;
        }
        camera.y += e.movementY;
    }

}