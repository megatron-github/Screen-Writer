// Cite: https://github.com/DeShrike/FancyClock

let prevSec = -1;

function Clock() {
    this.digits = [];
    this.colon1 = null;
    this.colon2 = null;
    this.clock_digits = [];
}

Clock.prototype.init = function(){
    let offsetx = W / 42;            // x position of the clock
    let offsety = H / 6.4;           // y position of the clock
    let digit_spacing = 100;         // the spacing of the elements in the clock

    let maxPoints = 0;
    // for each digit that a clock has
    for (let digit = 0; digit < 10; digit++) {
        // get the points needed to render the digit
        let textPoints = font.textToPoints(digit + "", W / 8, H / 3, 190, opt);
        // create a dictionary for digit to store the information of the digit
        let clock_digit = {digit: digit, points: [], maxy: 0, miny: 10000};
        for (let i = 0; i < textPoints.length; i++) {
            let pt = textPoints[i];
            // store the coordinate points that the digit needs
            let point = {x: pt.x, y: pt.y};
            clock_digit.points.push(point);
            // store the point with the maximum y value
            if (point.y > clock_digit.maxy) {
                clock_digit.maxy = point.y;
            }
            // store the point with minimum y value
            if (point.y < clock_digit.miny) {
                clock_digit.miny = point.y;
            }
        }
        // save the digit and its info into an array in the class Clock
        this.clock_digits[digit] = clock_digit;
        // get the maximum number of points ever needed to render the digits
        if (clock_digit.points.length > maxPoints) {
            maxPoints = clock_digit.points.length;
        }
    }
    // for each digit in the clock
    for (let digit = 0; digit < 10; digit++) {
        let start = 0;
        let clock_digit = this.clock_digits[digit];
        // standardize the number of points need to render the digit (???)
        while (clock_digit.points.length < maxPoints) {
            let x = clock_digit.points[start].x;
            let y = clock_digit.points[start].y;
            let point = {x: x, y: y};
            clock_digit.points.push(point);
            start++;
        }
        // shuffle the digit points
        this.shuffle(clock_digit.points);
    }
    // for each position in a clock (0th : 2nd : 4th)
    for (let pos = 0; pos < 6; pos++) {
        // create a new digit in the position
        let digit = new Digit(offsetx, offsety);
        this.digits.push(digit);
        // space the digits so they don't overlapp each other
        offsetx += digit_spacing;
        // create colon at position 1
        if (pos == 1) {
            this.colon1 = new Colon(offsetx, offsety);
            offsetx += digit_spacing / 2;
        // create colon at position 3
        } else if (pos == 3) {
            this.colon2 = new Colon(offsetx, offsety);
            offsetx += digit_spacing / 2;
        }
    }
    // initialize each digit in the clock using 
    //the standardized amount of points
    for (let i = 0; i < this.digits.length; i++) {
        let digit = this.digits[i];
        digit.init(maxPoints);
    }
    // initialize the colons
    this.colon1.init();
    this.colon2.init();
}

Clock.prototype.update = function() {
    let sec = second();
    let min = minute();
    let hou = hour();

    // update the time shown on the clock 
    // if real time is not equal to the time rendered
    if (sec != prevSec) {
        // prepare to shuffle the points between two colons
        this.colon1.shuffleTargets();
        this.colon2.shuffleTargets();
        // prepare to shuffle the points of the hour digits in the clock
        this.digits[0].setTargets(this.clock_digits[floor(hou / 10)]);
        this.digits[1].setTargets(this.clock_digits[hou % 10]);
        // prepare to shuffle the points of the minute digits in the clock
        this.digits[2].setTargets(this.clock_digits[floor(min / 10)]);
        this.digits[3].setTargets(this.clock_digits[min % 10]);
        // prepare to shuffle the points of the second digits in the clock
        this.digits[4].setTargets(this.clock_digits[floor(sec / 10)]);
        this.digits[5].setTargets(this.clock_digits[sec % 10]);
        // update the time
        prevSec = sec;
    }
    // update the digit according to the time shown on clock
    // shuffle the points of the digit that changed
    for (let i = 0; i < this.digits.length; i++) {
        let digit = this.digits[i];
        digit.update();
    }
    // shuffle the colons
    this.colon1.update();
    this.colon2.update();
}

Clock.prototype.show = function() {
    // show the digits
    for (let i = 0; i < this.digits.length; i++) {
        this.digits[i].show();
    }
    // show the colons
    this.colon1.show();
    this.colon2.show();
}

Clock.prototype.shuffle = function(arr) {
    // shuffle the points in a given array 100 times
    for (let i = 0; i < 100; i++){
        let a = floor(random(arr.length));
        let b = floor(random(arr.length));
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }
}

Clock.prototype.reset = function() {
    // randomize the locations of the points of 
    // the digits and the colons
    for (let i = 0; i < this.digits.length; i++) {
        let digit = this.digits[i];
        digit.shuffleRandom();
    }
    this.colon1.shuffleRandom();
    this.colon2.shuffleRandom();
}
