function Vehicle(x, y) {
    this.pos = createVector(random(windowWidth), random(windowHeight), 0);
    this.target = createVector(x, y, 0);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.radius = 6;
    this.maxSpeed = 10;
    this.maxForce = 1;
}

Vehicle.prototype.flee_from = function(target) {
    let feared = p5.Vector.sub(target, this.pos);
    feared.mult(-1)
    let distance = feared.mag();
    let steer = createVector(0, 0, 0);
    if (distance < 50) {
        feared.setMag(this.maxSpeed);
        steer = p5.Vector.sub(feared, this.vel);
        steer.limit(this.maxForce);
    }
    return steer;
}

Vehicle.prototype.arrive_at = function(target) {
    // create a vector that points the vehicle's current location
    // to the target
    let desired = p5.Vector.sub(target, this.pos);
    let distance = desired.mag();
    let speed = this.maxSpeed;
    // the vehicle is at most 100 pixels away from the target
    if (distance < 100) {
        // convert distance from range 0-100 to 0-maxSpeed
        speed = map(distance, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    // calculate the steering force to bring the vehicle to the target
    let steer = p5.Vector.sub(desired, this.vel);
    // limit the steer force to some constant
    steer.limit(this.maxForce);
    return steer;
}

Vehicle.prototype.applyForce = function(force) {
    this.acc.add(force);
}

Vehicle.prototype.applyBehaviors = function() {
    let desire = this.arrive_at(this.target);
    let mouse = createVector(mouseX, mouseY);
    let flee = this.flee_from(mouse);

    // this.shake();
    desire.mult(1);
    flee.mult(5);
    this.applyForce(desire);
    this.applyForce(flee);
}

Vehicle.prototype.shake = function() {
    this.acc = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
}

Vehicle.prototype.update = function() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
    this.applyBehaviors();
}

Vehicle.prototype.show = function() {
    this.update();
    stroke('#fae');
    strokeWeight(this.radius);
    point(this.pos.x, this.pos.y);
}
