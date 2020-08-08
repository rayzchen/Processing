const w = 800, h = 500;

let levelText;
let platforms;
let walls;
let ends;
let lava;
let x = 100;
let y = 100;
let vx = vy = 0;
let gravity = 1;
let size = 25;
let playerColor;
let platformColor;
let skyColor;
let endColor;
let lavaColor;
let falling = 0;
let jumpKey = 0;
let wallJump = 0;
let level = 0;

function setup() {
    createCanvas(w, h);
    frameRate(60);
    playerColor = color(50, 205, 50);
    platformColor = color(0);
    skyColor = color(0, 200, 255);
    endColor = color(255, 255, 0);
    lavaColor = color(255, 0, 0);
    noStroke();
    walls = [size / 2, size / 2, width - size / 2, height - size / 2];
    platforms = [
        // Level 1
        [
            [0, height, width, height + 50],
            [0, -50, width, 0],
        ],
        // Level 2
        [
            [0, height, width, height + 50],
            [0, -50, width, 0],
        ],
        // Level 3
        [
            [0, height, width, height + 50],
            [0, -50, width, 0],
            [300, height - 50, 500, height],
        ],
        // Level 4
        [
            [0, height, width, height + 50],
            [0, -50, width, 0],
            [300, height - 50, 500, height],
        ],
        // Level 5
        [
            [0, height, width, height + 50],
            [0, -50, width, 0],
        ],
    ];
    ends = [
        // Level 1
        [width - size - 10, height - size - 10, width - 10, height - 10],
        [width - size - 10, height - size - 10, width - 10, height - 10],
        [width - size - 10, height - size - 10, width - 10, height - 10],
        [width - size - 10, height - size - 10, width - 10, height - 10],
        [width - size - 10, height - size - 10, width - 10, height - 10],
    ]
    levelText = [
        // Level 1
        [
            ["This is a platformer.", 50, width / 2, height / 3],
            ["<- Arrow keys to move ->", 25, width / 2, height * 2 / 3],
        ],
        [
            ["Kinda boring, eh?", 50, width / 2, height / 3],
        ],
        [
            ["Here's some black thing.", 50, width / 2, height / 3],
            ["W to jump", 25, width / 2, height * 2 / 3],
        ],
        [
            ["Why are you still playing?", 50, width / 2, height / 3],
        ],
        [
            ["Fine then. Jump in the red!", 50, width / 2, height / 3],
        ],
    ];
    lava = [
        [],
        [],
        [],
        [],
        [[300, height - 25, 500, height]],
    ];
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
    let collided = false;
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
    let slope = 0;
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

function respawn() {
    x = 100;
    y = height - size / 2;
    vx = vy = 0;
}

function physics() {
    applyGravity();
    touchGround(vy < 0);
    movement();
    keepInsideBox();

    playerBB = [x - size / 2, y - size / 2, x + size / 2, y + size / 2];
    if (AABBOverlap(ends[level], playerBB)) {
        level += 1;
        respawn();
    }
    
    lava.forEach(function(item) {
        if (AABBOverlap(lava, playerBB)) respawn();
    });
}

function drawScene() {
    background(skyColor);

    fill(0);
    textAlign(CENTER);
    levelText[level].forEach(function(item) {
        textSize(item[1]);
        text(item[0], item[2], item[3]);
    });

    fill(platformColor);
    rectMode(CORNERS);
    platforms[level].forEach(function(item) {
        rect(item[0], item[1], item[2], item[3]);
    });

    fill(lavaColor);
    rectMode(CORNERS);
    lava[level].forEach(function(item) {
        rect(item[0], item[1], item[2], item[3]);
    });

    fill(endColor);
    rect(ends[level][0], ends[level][1], ends[level][2], ends[level][3]);
    
    fill(playerColor);
    rectMode(CENTER);
    rect(x, y, size, size);
}

function draw() {
    physics();
    drawScene();
}