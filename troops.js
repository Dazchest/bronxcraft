class Troops {

   // type = {inf (load=10), arch, cav, sieg, boar, farmer (load = 200), settler {needed to build another city}}
    level;
    quantity;
    attack;
    defence;
    health
    speed;
    range;
    power;
    requirements = {"building": [{"type": 0, "level": 1}]}
    resources = {"food": 100, "wood": 50, "stone": 10, "iron": 0}


    //tODO: the building requirements check only checks the first building of a particular type

    constructor(data) {
        console.log("this is the troops constructor");

        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];// (data[x]).value;
            //console.log(data[name]);
            this[name] = data[name];
        }

    }

}