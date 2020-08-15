let boardWidth = 25, boardHeight = 25;
let tileWidth = 20;
let snake;
let food;
let screen = 0;
let speed = 10;
let frame = 60 / speed - 1;
let direction = 0;
let score = 0;

function setup() {
    createCanvas(boardWidth * tileWidth, boardHeight * tileWidth);
    snake = [[10, 10]];
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(50);
    frameRate(60);
}

function createFood() {
    let flag = false;
    while (!flag) {
        let point = [int(random(0, boardWidth)), int(random(0, boardHeight))];
        if (!snake.includes(point)) {
            food = point;
            flag = true;
        }
    }
}

function restart() {
    snake = [[10, 10]];
    direction = 0;
    score = 0;
    createFood();
}

function mousePressed() {
    if (screen == 0 || screen == 2) {
        restart();
        screen = 1;
    }
}

function keyPressed() {
    if (key == 'w' && direction != 2) {
        direction = 1;
    } else if (key == 's' && direction != 1) {
        direction = 2;
    } else if (key == 'a' && direction != 4) {
        direction = 3;
    } else if (key == 'd' && direction != 3) {
        direction = 4;
    }
}

function drawBoard() {
    fill(255);
    snake.forEach(function(tile) {
        rect(tile[0] * tileWidth, tile[1] * tileWidth, tileWidth, tileWidth);
    });
    fill(255, 0, 0);
    rect(food[0] * tileWidth + tileWidth / 4, food[1] * tileWidth + tileWidth / 4, tileWidth / 2, tileWidth / 2);
}

function gameLogic() {
    if (direction != 0) {
        let prev_head = snake[snake.length - 1];
        let new_head;
        if (direction == 1) {
            new_head = [prev_head[0], prev_head[1] - 1];
            if (new_head[1] < 0) {
                screen = 2;
                return;
            }
        } else if (direction == 2) {
            new_head = [prev_head[0], prev_head[1] + 1];
            if (new_head[1] >= boardHeight) {
                screen = 2;
                return;
            }
        } else if (direction == 3) {
            new_head = [prev_head[0] - 1, prev_head[1]];
            if (new_head[0] < 0) {
                screen = 2;
                return;
            }
        } else {
            new_head = [prev_head[0] + 1, prev_head[1]];
            if (new_head[0] >= boardWidth) {
                screen = 2;
                return;
            }
        }
        if (new_head[0] == food[0] && new_head[1] == food[1]) {
            score += 1;
            createFood();
        } else {
            snake.shift();
        }
        snake.forEach(function(tile) {
            if (tile[0] == new_head[0] && tile[1] == new_head[1]) {
                screen = 2;
                return;
            }
        });
        snake.push(new_head);
    }
}

function draw() {
    background(0);
    fill(255);
    if (screen == 0) {
        fill(255);
        text("Click to play", width / 2, height / 2);
    } else if (screen == 1) {
        drawBoard();
        frame += 1;
        if (frame == 60 / speed) {
            frame = 0;
            gameLogic();
        }
    } else if (screen == 2) {
        text("Game Over\nScore: " + str(score) + "\nClick to play", width / 2, height / 2);
    }
}