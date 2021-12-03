// Cite: https://github.com/DeShrike/FancyClock

function Colon(offsetx, offsety) {
    this.offsetx = offsetx;
    this.offsety = offsety;
    this.vehicles = [];
}

Colon.prototype.init = function () {
    let points = font.textToPoints(":", W / 8 - 8.5, H / 3, 190, opt);
    let maxy = 0;
    let miny = 100000;
    for (let i = 0; i < points.length; i++) {
        let pt = points[i];
        let vehicle = new Vehicle(pt.x + this.offsetx, pt.y + this.offsety);
        if (vehicle.target.y > maxy) {
            maxy = vehicle.target.y;
        }
        if (vehicle.target.y < miny) {
            miny = vehicle.target.y;
        }
        this.vehicles.push(vehicle);
    }
}

Colon.prototype.update = function () {
    for (let i = 0; i < this.vehicles.length; i++) {
        let vehicle = this.vehicles[i];
        vehicle.applyBehaviors();
        vehicle.update();
    }
}

Colon.prototype.show = function() {
    for (let i = 0; i < this.vehicles.length; i++) {
        this.vehicles[i].show();
    }
}

Colon.prototype.shuffleTargets = function () {
    for (let i = 0; i < 50; i++) {
        let vehicle_a = floor(random(this.vehicles.length));
        let vehicle_b = floor(random(this.vehicles.length));
        this.swapTargets(vehicle_a, vehicle_b);
    }
}

Colon.prototype.swapTargets = function (a, b) {
    let temp = this.vehicles[a].target;
    this.vehicles[a].target = this.vehicles[b].target;
    this.vehicles[b].target = temp;
}

Colon.prototype.shuffleRandom = function () {
    for (let i = 0; i < this.vehicles.length; i++) {
        this.vehicles[i].pos.x = random(W);
        this.vehicles[i].pos.y = random(H);
    }
}
