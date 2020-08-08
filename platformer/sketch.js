new p5();

walls = [size / 2, size / 2, width - size / 2, height - size / 2];
platforms = [
    // Level 1
    [
        [0, height, width, height + 50],
    ]
];
var size = 25;
var x = 100;
var y = height - size / 2;
var vx = vy = 0;
var gravity = 1;
var playerColor = color(255, 0, 0);
var platformColor = color(0);
var falling = 0;
var jumpKey = 0;
var wallJump = 0;
var level = 0;

function setup() {
    createCanvas(800, 500);
    frameRate(60);
    noStroke();
}

function applyGravity() {
    if (vy < 4 || keyIsDown(87)) {
        vy += gravity / 2;
    } else {
        vy += gravity;
    }
    y += vy;
}

function AABBOverlap(a, b) {
    if (a[2] < b[0] || a[0] > b[2]) return false;
    if (a[3] < b[1] || a[1] > b[3]) return false;
    return true;
}

function grounded() {
    playerBB = [x - size / 2, y - size / 2, x + size / 2, y + size / 2];
    var collided = false;
    platforms[level].forEach(function(item) {
        if (AABBOverlap(item, playerBB)) collided = true;
    });
    return collided;
}

function touchGround(up) {
    falling += 1;
    while (grounded()) {
        if (up) {
            y += 1;
        } else {
            y -= 1;
            falling = 0;
        }
        vy = 0;
    }
}

function move(speed) {
    x += speed;
    var slope = 0;
    while (slope != 8 && grounded()) {
        y += 1;
        slope += 1;
    }
    if (slope == 8) {
        x -= speed;
        y -= slope;
        if (keyIsDown(87) && abs(speed) > 5) {
            if (wallJump == 0) {
                vx = -0.5 * speed;
                vy = -12;
                falling = 6;
                wallJump = 15;
            }
        } else {
            vx = 0;
        }
    }
}

function movement() {
    if (wallJump > 0) {
        wallJump -= 1;
    } else {
        vx *= 0.9;
        if (keyIsDown(65)) { // A
            vx -= 1;
        }
        if (keyIsDown(68)) { // D
            vx += 1;
        }
    }
    if (abs(vx) > 0.05) {
        move(vx);
    }
    if (keyIsDown(87)) { // W
        if (jumpKey == 0 && falling < 3) {
            vy = -12;
            falling = 6;
            jumpKey = 1;
        }
    } else {
        jumpKey = 0;
    }
}

function keepInsideBox() {
    x = constrain(x, walls[0], walls[2]);
    y = constrain(y, walls[1], walls[3]);
}

function physics() {
    applyGravity();
    touchGround(vy < 0);
    movement();
    keepInsideBox();
    if (y > height + 200) {
        x = y = 100;
        vx = vy = 0;
    }
}

function draw_scene() {
    background(255);
    fill(playerColor);
    rectMode(CENTER);
    rect(x, y, size, size);

    fill(platformColor);
    rectMode(CORNERS);
    platforms[level].forEach(function(item) {
        rect(item[0], item[1], item[2], item[3]);
    });
}

function draw() {
    physics();
    draw_scene();
}