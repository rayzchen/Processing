class Ball {
    constructor(x, y, vy, vx, col, grav) {
        this.ballX = x;
        this.ballY = y;
        this.ballSpeedVert = vy;
        this.ballSpeedHorizon = vx;
        this.ballColor = col;
        this.positions = [];
        this.gravity = grav;
    }
}

let _gameScreen = 0;
let balls = [];
let ballSize = 20;
let gravity = 1;
let airfriction = 0.0001;
let friction = 0.2;
let racketColor;
let racketWidth = 100;
let racketHeight = 10;
let ballShadow = 1;

function setup() {
    createCanvas(800, 500);
    frameRate(60);
    racketColor = color(0, 255, 0);
    balls.push(new Ball(width / 2, height / 5, random(-10, 10), random(-10, 10), color(255, 0, 0), gravity));
    balls.push(new Ball(width / 2, height / 5, random(-10, 10), random(-10, 10), color(0, 255, 0), gravity));
    balls.push(new Ball(width / 2, height / 5, random(-10, 10), random(-10, 10), color(0, 0, 255), gravity));
    noStroke();
}

function draw() {
    background(255);
    drawRacket();
    for (let i = 0; i < balls.length; i++) {
        ball = balls[i];
        drawBall(ball);
        watchRacketBounce(ball);
        applyHorizontalSpeed(ball);
        applyGravity(ball);
        keepInScreen(ball);
    }
}

function drawRacket(){
    fill(racketColor);
    rectMode(CENTER);
    rect(mouseX, mouseY, racketWidth, racketHeight);
}

function drawBall(ball) {
    let position = [ball.ballX, ball.ballY];
    ball.positions.push(position);
    if (ball.positions.length == ballShadow + 1) ball.positions.shift();
    for (let i = 0; i < ball.positions.length; i++) {
        let pos = ball.positions[i];
        fill(red(ball.ballColor), green(ball.ballColor), blue(ball.ballColor), (ballShadow - ball.positions.length + i + 1) * 255 / ballShadow);
        ellipse(pos[0], pos[1], ballSize, ballSize);
    }
}

// function watchRacketBounce(ball) {
//     overhead = mouseY - pmouseY;
//     if ((ball.ballX+(ballSize/2) > mouseX-(racketWidth/2)) && (ball.ballX-(ballSize/2) < mouseX+(racketWidth/2))) {
//         if (dist(ball.ballX, ball.ballY, ball.ballX, mouseY)<=(ballSize/2)+abs(overhead)) {
//             makeBounceBottom(ball, mouseY);
//             // racket moving up
//             if (overhead<0) {
//                 ball.ballY+=overhead;
//                 ball.ballSpeedVert+=overhead;
//                 ball.ballSpeedHorizon = (ball.ballX - mouseX)/5;
//             }
//         }
//     }
// }

function watchRacketBounce(ball) {
    let overhead = mouseY - pmouseY;
    if ((ball.ballX + (ballSize / 2) > mouseX - (racketWidth / 2)) && (ball.ballX - (ballSize / 2) < mouseX + (racketWidth / 2))) {
        if (dist(ball.ballX, ball.ballY, ball.ballX, mouseY - (racketHeight / 2)) <= ballSize / 2 + abs(overhead)) {
            makeBounceBottom(ball, mouseY - (racketHeight / 2));
            // racket moving down
            if (overhead < 0) {
                ball.ballY += overhead;
                ball.ballSpeedVert += overhead;
                ball.ballSpeedHorizon = (ball.ballX - mouseX) / 5;
            }
        }
    }
}

function applyHorizontalSpeed(ball){
    ball.ballX += ball.ballSpeedHorizon;
    ball.ballSpeedHorizon *= 1 - airfriction;
}

function makeBounceLeft(ball, surface){
    ball.ballX = surface + (ballSize / 2);
    ball.ballSpeedHorizon *= -1;
    ball.ballSpeedHorizon *= 1 - friction;
}

function makeBounceRight(ball, surface){
    ball.ballX = surface - (ballSize / 2);
    ball.ballSpeedHorizon *= -1;
    ball.ballSpeedHorizon *= 1 - friction;
}

function applyGravity(ball) {
    ball.ballSpeedVert += ball.gravity;
    ball.ballY += ball.ballSpeedVert;
    ball.ballSpeedVert *= 1 - airfriction;
    // if (ball.ballY > height / 2) {
    //     ball.gravity = 1;
    // } else {
    //     ball.gravity = -1;
    // }
}

function makeBounceBottom(ball, surface) {
    ball.ballY = surface - (ballSize / 2);
    ball.ballSpeedVert *= -1;
    ball.ballSpeedVert *= 1 - friction;
}

function makeBounceTop(ball, surface) {
    ball.ballY = surface + (ballSize / 2);
    ball.ballSpeedVert *= -1;
    ball.ballSpeedVert *= 1 - friction;
}

function keepInScreen(ball) {
    if (ball.ballY + (ballSize / 2) > height) { 
        makeBounceBottom(ball, height);
    }
    if (ball.ballY - (ballSize / 2) < 0) {
        makeBounceTop(ball, 0);
    }
    if (ball.ballX-(ballSize/2) < 0){
        makeBounceLeft(ball, 0);
    }
    if (ball.ballX+(ballSize/2) > width){
        makeBounceRight(ball, width);
    }
}