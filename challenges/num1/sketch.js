function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;

    this.update = function() {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width / 2, width / 2);
            this.y = random(-height / 2, height / 2);
            this.pz = this.z;
        }
    }

    this.show = function() {
        fill(255);
        noStroke();

        let sx = this.x / this.z * width;
        let sy = this.y / this.z * height;
        let r = 16 - this.z / width * 16;
        ellipse(sx, sy, r, r);

        let px = this.x / this.pz * width;
        let py = this.y / this.pz * height;
        this.pz = this.z;

        stroke(255);
        line(px, py, sx, sy);

    }
}

let stars = new Array(200);
let speed = 20;

function setup() {
    createCanvas(600, 600);
    frameRate(60);
    for (let i = 0; i < 200; i++) {
        stars[i] = new Star();
    }
}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
    }
}