var offset = 0;
var speed = 0;
var ratio;
var frequency = 8;

function setup() {
    createCanvas(800, 500);
    frameRate(60);
    ratio = width / (PI * frequency);
}

function keyPressed() {
    if (key == "w") {
        frequency += 2;
        ratio = width / (PI * frequency);
    } else if (key == "s" && frequency != 2) {
        frequency -= 2;
        ratio = width / (PI * frequency);
    }
}

function draw() {
    if (keyIsDown(65)) {
        speed -= 0.05;
    } else if (keyIsDown(68)) {
        speed += 0.05;
    }

    background(0);
    loadPixels();
    offset += speed;
    for (var i = 0; i < width; i++) {
        set(i, int(height / 2 - sin((float(i) + offset) / ratio) * ratio), color(255, 0, 0));
        set(i, int(height / 2 - cos((float(i) + offset) / ratio) * ratio), color(0, 255, 0));
        set(i, int(height / 2 - tan((float(i) + offset) / ratio) * ratio), color(0, 0, 255));
        set(i, int(height / 2 - 1 / cos((float(i) + offset) / ratio) * ratio), color(255, 255, 0));
        set(i, int(height / 2 - 1 / sin((float(i) + offset) / ratio) * ratio), color(0, 255, 255));
        set(i, int(height / 2 - 1 / tan((float(i) + offset) / ratio) * ratio), color(255, 0, 255));
    }
    updatePixels();
}