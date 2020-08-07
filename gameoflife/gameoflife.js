const w = 800, h = 500;
var board = new Array(w);
var colors;

function setup() {
    createCanvas(w, h);
    colors = [color(0), color(255)];
    for (var i = 0; i < w; i++) {
        board[i] = new Array(h);
        for (var j = 0; j < h; j++) {
            board[i][j] = int(random(0, 2));
        }
    }
}

function mod(a, b) {
    if (a >= b) {
        return b - a;
    } else if (a < 0) {
        return b + a;
    } else {
        return a;
    }
}

function get_neighbours(x, y) {
    var num = board[x][mod(y + 1, h)];
    num += board[x][mod(y - 1, h)];
    num += board[mod(x + 1, w)][y];
    num += board[mod(x - 1, w)][y];
    num += board[mod(x + 1, w)][mod(y + 1, h)];
    num += board[mod(x + 1, w)][mod(y - 1, h)];
    num += board[mod(x - 1, w)][mod(y + 1, h)];
    num += board[mod(x - 1, w)][mod(y - 1, h)];
    return num;
}

function draw() {
    var next_board = new Array(w);
    for (var i = 0; i < w; i++) {
        next_board[i] = new Array(h);
        for (var j = 0; j < h; j++) {
            set(i, j, colors[board[i][j]]);
            var neighbours = get_neighbours(i, j);
            if (board[i][j] == 1) {
                if (neighbours < 2 || neighbours > 3) {
                    next_board[i][j] = 0;
                } else {
                    next_board[i][j] = 1;
                }
            } else if (neighbours == 3) {
                next_board[i][j] = 1;
            } else {
                next_board[i][j] = 0;
            }
        }
    }
    arrayCopy(next_board, board);
    updatePixels();
}
