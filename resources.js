var rss,t;
class Resource {

    constructor(data) {
        console.log("this is resources constructor");
        for(let x=0; x<Object.keys(data).length; x++) {
            name = Object.keys(data)[x];
            this[name] = data[name];
        }
    }

    static drawAll() {
        for(let x=0; x<Object.keys(resources).length; x++) {
            t = Object.keys(resources)[x];
            ctx.fillText(resources[t].text + ": " + resources[t].amount.toString(), 10 + (x*120), 80);
        }
    }

    getFood() {
        return cities[currentCity].resources.food.amount;
    }
    draw() {
        ctx.fillText("Wood: " + this.amount, 100, 200);

    }
    getA() {
        return this.amount;
    }
    static getStone() {
        return cities[currentCity].resources.stone.amount;
    }
    static getIron() {
        return cities[currentCity].resources.iron.amount;
    }
    static getGold() {
        return cities[currentCity].resources.gold.amount;
    }
    static getGems() {
        return cities[currentCity].resources.gems.amount;
    }
}