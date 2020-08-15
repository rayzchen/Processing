function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let screen = 0;
let labelColor;
let tileWidth = 50;
let labelHeight = 40;
let buttonHeight = 80;
let w = tileWidth * 9;
let h = w + labelHeight + buttonHeight;
let turn;
let highlighted;
let big_win;
let board;
let msg;
let change_screen = 0;

function setup() {
    labelColor = color(67, 205, 128);
    createCanvas(w, h);
    frameRate(60);
    highlighted = new Array(3);
    big_win = new Array(3);
    board = new Array(3);
    msg = "Click to play";
    turn = 0;
    for (let i = 0; i < 3; i++) {
        board[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            board[i][j] = new Array(3);
            for (let k = 0; k < 3; k++) {
                board[i][j][k] = new Array(3);
                for (let l = 0; l < 3; l++) {
                    board[i][j][k][l] = 0;
                }
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        big_win[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            big_win[i][j] = 0;
        }
    }
    for (let i = 0; i < 3; i++) {
        highlighted[i] = new Array(3);
        for (let j = 0; j < 3; j++) {
            highlighted[i][j] = 1;
        }
    }
    textAlign(CENTER, CENTER);
    textStyle(NORMAL);
    strokeWeight(4);
}

function draw() {
    if (change_screen == 1) {
        screen = 0;
    }
    if (screen == 0) {
        background(labelColor);

        //Label
        fill(0);
        noStroke();
        textSize(20);
        text("Player " + str(turn + 1) + "'s turn", width / 2, labelHeight / 2);

        //board
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (highlighted[i][j]) {
                    fill(152, 251, 152);
                } else {
                    fill(255);
                }
                rect(j * width / 3, i * width / 3 + labelHeight, (j + 1) * width / 3, (i + 1) * width / 3 + labelHeight);
            }
        }

        //button
        fill(200);
        stroke(0);
        strokeWeight(4);
        rect(0, width + labelHeight, width, buttonHeight);
        fill(0);
        noStroke();
        textSize(30);
        text("New Game", width / 2, height - buttonHeight / 2);

        noFill();
        stroke(0);
        strokeWeight(4);
        rect(0, labelHeight, width, width);

        line(width / 3, labelHeight, width / 3, height - buttonHeight);
        line(width * 2 / 3, labelHeight, width * 2 / 3, height - buttonHeight);
        line(0, labelHeight + width / 3, width, labelHeight + width / 3);
        line(0, height - buttonHeight - width / 3, width, height - buttonHeight - width / 3);

        strokeWeight(1);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                line(j * width / 3 + tileWidth, i * width / 3 + labelHeight, j * width / 3 + tileWidth, (i + 1) * width / 3 + labelHeight);
                line(j * width / 3 + tileWidth * 2, i * width / 3 + labelHeight, j * width / 3 + tileWidth * 2, (i + 1) * width / 3 + labelHeight);
                line(j * width / 3, i * width / 3 + tileWidth + labelHeight, (j + 1) * width / 3, i * width / 3 + tileWidth + labelHeight);
                line(j * width / 3, i * width / 3 + tileWidth * 2 + labelHeight, (j + 1) * width / 3, i * width / 3 + tileWidth * 2 + labelHeight);
            }
        }

        noFill();
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                strokeWeight(2);
                for (let smallRow = 0; smallRow < 3; smallRow++) {
                    for (let smallCol = 0; smallCol < 3; smallCol++) {
                        if (board[row][col][smallRow][smallCol] == 1) {
                            stroke(255, 0, 0);
                            line(col * width / 3 + smallCol * tileWidth + 8, row * width / 3 + smallRow * tileWidth + 8 + labelHeight, col * width / 3 + smallCol * tileWidth + 44, row * width / 3 + smallRow * tileWidth + 46 + labelHeight);
                            line(col * width / 3 + smallCol * tileWidth + 44, row * width / 3 + smallRow * tileWidth + 8 + labelHeight, col * width / 3 + smallCol * tileWidth + 8, row * width / 3 + smallRow * tileWidth + 46 + labelHeight);
                        } else if (board[row][col][smallRow][smallCol] == 2) {
                            stroke(0, 0, 255);
                            ellipseMode(RADIUS);
                            ellipse(col * width / 3 + smallCol * tileWidth + tileWidth / 2, row * 150 + smallRow * tileWidth + tileWidth / 2 + labelHeight, tileWidth / 2 - 5, tileWidth / 2 - 5);
                        }
                    }
                }
                if (big_win[row][col] == 1) {
                    stroke(255, 0, 0);
                    strokeWeight(8);
                    line(col * width / 3 + 6, row * width / 3 + 6 + labelHeight, (col + 1) * width / 3 - 6, (row + 1) * width / 3 - 6 + labelHeight);
                    line((col + 1) * width / 3 - 6, row * width / 3 + 6 + labelHeight, col * width / 3 + 6, (row + 1) * width / 3 - 6 + labelHeight);
                } else if (big_win[row][col] == 2) {
                    stroke(0, 0, 255);
                    strokeWeight(8);
                    ellipseMode(RADIUS);
                    ellipse(col * width / 3 + width / 6, row * width / 3 + width / 6 + labelHeight, width / 6 - 6, width / 6 - 6);
                }
            }
        }
    } else {
        background(0);
        textAlign(CENTER, CENTER);
        noStroke();
        fill(255);
        textSize(40);
        text(msg, width / 2, height / 2);
    }
    if (change_screen == 1) {
        change_screen = 2;
    } else if (change_screen == 2) {
        sleep(1000).then(function() {
            change_screen = 0;
            screen = 1;
            loop();
        });
    }
}

function mousePressed() {
    if (change_screen != 2) {
        if (screen == 0) {
            if (labelHeight < mouseY && mouseY < height - buttonHeight) {
                let x = mouseX;
                let y = mouseY - labelHeight;
                let row = int(y / (width / 3));
                let col = int(x / (width / 3));
                let smallRow = int((y - (row * width / 3)) / tileWidth);
                let smallCol = int((x - (col * width / 3)) / tileWidth);

                if (highlighted[row][col]) {
                    if (board[row][col][smallRow][smallCol] == 0) {
                        board[row][col][smallRow][smallCol] = turn + 1;
                        check_win(board, smallRow, smallCol);
                    }
                }
            } else if (mouseY > height - buttonHeight) {
                setup();
            }
        } else {
            setup();
            screen = 0;
        }
    }
}

function all_same(l) {
    return l[0] != 0 && l[0] == l[1] && l[1] == l[2];
}

function all_filled(l) {
    for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 3; b++) {
            if (l[a][b] == 0) return false;
        }
    }
    return true;
}

function win(board) {
    //Horizontal
    board.forEach(function(row) {
        if (all_same(row)) {
            return row[0];
        }
    });

    for (let col = 0; col < 3; col++) {
        let check = new Array(3);
        for (let row = 0; row < 3; row++) {
            check[row] = board[row][col];
        }
        if (all_same(check)) {
            return check[0];
        }
    }

    if (all_same([board[0][2], board[1][1], board[2][0]])) {
        return board[0][2];
    }

    if (all_same([board[0][0], board[1][1], board[2][2]])) {
        return board[0][0];
    }

    if (all_filled(board)) {
        return 3;
    }

    return 0;
}

function check_win(board, row, col) {
    for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 3; b++) {
            if (big_win[a][b] == 0) {
                let sym = win(board[a][b]);
                big_win[a][b] = sym;
            }
        }
    }
    point_to(row, col);
    turn = 1 - turn;
    redraw();

    let sym = win(big_win);
    if (sym != 0) {
        if (sym == 3) {
            msg = "It is a draw!\nClick to play again.";
        } else {
            msgl = "Player " + str(2 - turn) + " has won!\nClick to play again.";
        }
        change_screen = 1;
    }
}

function point_to(row, col) {
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
            highlighted[j][k] = false;
        }
    }
    if (big_win[row][col] == 0) {
        highlighted[row][col] = true;
    } else {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                if (big_win[j][k] == 0) {
                    highlighted[j][k] = true;
                }
            }
        }
    }
}
