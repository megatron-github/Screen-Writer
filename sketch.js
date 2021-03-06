let W = window.innerWidth;
let H = window.innerHeight - 42;
let font;
const opt = {sampleFactor: 0.08};
let mouseTouched = false;
let keyTouched = false;
let timer = 0;
let prev = -1;

function preload() {
	font = loadFont('miscellaneous/Classique-Saigon.ttf')
}

function HomeScreen() {
	let sec = second();
	if (sec != prev) {
		prev = sec;
		timer++;
	} 
	if (timer > 60) {
		timer = 0;
		mouseTouched = false;
	}
}

function getMessage() {
	let msg = document.getElementById("input_text");
	return msg.value;
}

function windowResized() {
	W = window.innerWidth;
	H = window.innerHeight - 42;
	resizeCanvas(W, H);
}

function mouseReleased() {
	if (mouseY < 0) {
		mouseTouched = true;
	} else {
		mouseTouched = !mouseTouched;
	}
	timer = 0;
}

function keyTyped() {
	keyTouched = true;
	timer = 0;
}

function setup() {
	// set up
	createCanvas(W, H);
	textFont(font);
	noStroke();

	clock = new Clock();
	publisher = new Publisher();
	clock.init();
	publisher.init();
}

function draw() {
	// put drawing code here
	background(0);
	HomeScreen();
	msg = getMessage();

	if (mouseTouched && keyTouched) {
		publisher.write(msg);
		publisher.update();
		publisher.show();
		clock.reset();
	} else if (mouseTouched && !keyTouched) {
		publisher.update();
		publisher.show();
		clock.reset();
	} else if (!mouseTouched && keyTouched) {
		clock.update();
		clock.show();
		publisher.write(msg);
		publisher.reset();
	} else {
		clock.update();
		clock.show();
		publisher.reset();
	}
}