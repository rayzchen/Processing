var platforms = [
    // Level 1
    [
        []
    ]
];

var x = 100;
var y = 100;
var vx = vy = 0;
var gravity = 1;
var size = 50;
var playerColor;
var falling = 0;
var jumpKey = 0;

function setup() {
    createCanvas(800, 500);
    frameRate(60);
    playerColor = color(255, 0, 0);
    noStroke();
}

function touchingGround() {
    return y > height - size;
}

function move(speed) {
    x += speed;
    var slope = 0;
    while (slope != 8 && touchingGround()) {
        y += 1;
        slope += 1;
    }
    if (slope == 8) {
        x -= speed;
        y -= slope;
    }
}

function physics() {
    if (vy < 4 || keyIsDown(87)) {
        vy += gravity / 2;
    } else {
        vy += gravity;
    }
    y += vy;
    falling += 1;
    while (touchingGround()) {
        y += 1;
        falling = 0;
        vy = 0;
    }

    vx *= 0.9;
    if (keyIsDown(65)) {
        vx -= 1;
    }
    if (keyIsDown(68)) {
        vx += 1;
    }
    if (abs(vx) > 0.05) {
        move(vx);
    }
    if (keyIsDown(87)) {
        if (jumpKey == 0 && falling < 3) {
            vy = 12;
            falling = 6;
            jumpKey = 1;
        }
    } else {
        jumpKey = 0;
    }
}

function draw_scene() {
    background(255);
    fill(playerColor);
    rectMode(CENTER);
    rect(x, y, size, size);
}

function draw() {
    physics();
    draw_scene();
}