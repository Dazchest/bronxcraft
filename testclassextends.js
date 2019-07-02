class Screenn {

    constructor() {
        this.x = 10;
        this.y = 20;
    }
}

class TV extends Screenn {

    constructor(bob) {
        super();

        console.log(bob);
    }
}
class dvd extends Screenn {

    constructor(bob) {
        super();

        console.log(bob);
    }
}

bob = new TV("fishcake");
bob = new dvd("ggggg");
