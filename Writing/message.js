function Publisher() {
    this.vehicles = [];
    this.content = "";
    this.textPoints = [];
}

Publisher.prototype.init = function() {
    this.content = "Claire 101: Blonde";
    this.textPoints = font.textToPoints(this.content, 
                                        W / 9,      // x position
                                        H / 2,      // y position
                                        W / 10,     // size of text
                                        opt);       // # points
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
    this.content = "Claire 101: Blonde";
}

Publisher.prototype.write = function(message) {

    this.content = message;
    this.textPoints = font.textToPoints(this.content, 
                                        W / 11,     // x position
                                        H / 2,      // y position
                                        W / 10,     // size of text
                                        opt);       // # points
    // find the portion of the texts that is longer
    // the width of the screen and not display them
    for (let i = this.textPoints.length; i > 0; i--) {
        if (this.textPoints[i - 1].x >= 10 * W / 11) {
            this.textPoints.splice(i - 1, 1);
        }
    }
    // if numbers of vehicles is enough to render the texts
    if (this.textPoints.length == this.vehicles.length) {
        for (let i = 0; i < this.vehicles.length; i++) {
            let txtPoint = this.textPoints[i];
            let vehicle = this.vehicles[i];
            vehicle.target.x = txtPoint.x;
            vehicle.target.y = txtPoint.y;
        }
    // if numbers of vehicles is more than enough to render the texts
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
    // if numbers of vehicles is not enough to render the texts
    } else {
        // create new vehicles
        for (let i = 0; i < this.textPoints.length; i++) {
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
