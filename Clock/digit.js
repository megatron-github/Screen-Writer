function Digit(offsetx, offsety) {
    this.digit = -1;
    this.offsetX = offsetx;
    this.offsetY = offsety;
    this.vehicles = [];
}

Digit.prototype.init = function (numPoints) {
    for (let i = 0; i < numPoints; i++) {
        let vehicle = new Vehicle(floor(random(width)), floor(random(height)));
        this.vehicles.push(vehicle);
    }
}

Digit.prototype.update = function () {
    for (let i = 0; i < this.vehicles.length; i++) {
        let vehicle = this.vehicles[i];
        vehicle.applyBehaviors();
        vehicle.update();
    }
}

Digit.prototype.show = function() {
    for (let i = 0; i < this.vehicles.length; i++) {
        this.vehicles[i].show();
    }
}

Digit.prototype.setTargets = function(target) {
    if (this.digit != target.digit) {
        this.digit = target.digit;
        for (let i = 0; i < this.vehicles.length; i++) {
            let vehicle = this.vehicles[i];
            vehicle.target.x = target.points[i].x + this.offsetX;
            vehicle.target.y = target.points[i].y + this.offsetY;
        }
    }
}

Digit.prototype.shuffleRandom = function () {
    for (let i = 0; i < this.vehicles.length; i++) {
        this.vehicles[i].pos.x = floor(random(W));
        this.vehicles[i].pos.y = floor(random(H));
    }
}
