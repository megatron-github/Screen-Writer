let maxVehicles = 600;

function Publisher() {
    this.vehicles = [];
    this.content = "Claire 101: Blonde";
    // this.content = "Write on pink bar"
    this.textPoints = font.textToPoints(this.content, W / 8 - 37, H / 2, 190, opt);
}

Publisher.prototype.init = function() {
    for (let i = 0; i < this.textPoints.length; i++) {
        let txtPoint = this.textPoints[i];
        let vehicle = new Vehicle(txtPoint.x, txtPoint.y);
        this.vehicles.push(vehicle);
    }
}

Publisher.prototype.update = function() {
    for (let i = 0; i < this.vehicles.length; i++) {
        this.vehicles[i].applyBehaviors();
        this.vehicles[i].update();
    }
}

Publisher.prototype.show = function() {
    for (let i = 0; i < this.vehicles.length; i++) {
        this.vehicles[i].show();
    }
}

Publisher.prototype.reset = function () {
    for (let i = 0; i < this.vehicles.length; i++) {
        let x = floor(random(W));
        let y = floor(random(H));
        this.vehicles[i].pos.x = x;
        this.vehicles[i].pos.y = y;
    }
    // this.content = "Write on pink bar";
    this.content = "Claire 101: Blonde";
}

Publisher.prototype.write = function(message) {

    this.content = message;
    this.textPoints = font.textToPoints(this.content, W / 8 - 40, H / 2, 190, opt);
    if (this.textPoints.length == this.vehicles.length) {
        for (let i = 0; i < this.vehicles.length; i++) {
            let txtPoint = this.textPoints[i];
            let vehicle = this.vehicles[i];
            vehicle.target.x = txtPoint.x;
            vehicle.target.y = txtPoint.y;
        }
    } else if (this.textPoints.length <= this.vehicles.length) {
        for (let i = 0; i < this.textPoints.length; i++) {
            let txtPoint = this.textPoints[i];
            let vehicle = this.vehicles[i];

            vehicle.target.x = txtPoint.x;
            vehicle.target.y = txtPoint.y;
        }
        // delete vehicles
        for (let i = this.textPoints.length; i < this.vehicles.length; i++) {
            this.vehicles.splice(i, 1);
        }
    } else {
        let vehicleNeeded_len = min(this.textPoints.length, maxVehicles);
        // create new vehicles
        for (let i = 0; i < vehicleNeeded_len; i++) {
            let vehicle = new Vehicle(random(W), random(H));
            this.vehicles.push(vehicle);
        }
        for (let i = 0; i < this.textPoints.length; i++) {
            let txtPoint = this.textPoints[i];
            let vehicle = this.vehicles[i];
            vehicle.target.x = txtPoint.x;
            vehicle.target.y = txtPoint.y;
        }
    }

}
