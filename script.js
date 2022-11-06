
var matrix = [
    [0, 4, 2, 3, 0, 1, 3, 0, 3, 1, 3, 2, 2, 0, 3, 0, 1, 3, 2, 4, 1],
    [2, 2, 0, 0, 0, 0, 0, 1, 2, 3, 0, 2, 3, 0, 1, 2, 0, 3, 0, 1, 2],
    [2, 0, 2, 0, 0, 2, 0, 2, 1, 2, 0, 0, 4, 0, 1, 4, 0, 3, 2, 3, 0],
    [0, 3, 2, 1, 2, 3, 2, 1, 1, 4, 2, 3, 0, 3, 0, 2, 1, 3, 1, 1, 2],
    [2, 4, 2, 4, 1, 0, 3, 3, 2, 1, 2, 2, 2, 0, 4, 1, 2, 3, 1, 2, 0],
    [3, 0, 3, 2, 0, 4, 2, 2, 0, 0, 2, 2, 3, 1, 0, 2, 0, 1, 0, 3, 3],
    [0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 3, 0, 1, 2, 3, 2, 2, 3, 2, 1, 2],
    [2, 1, 3, 0, 2, 2, 2, 3, 2, 1, 0, 1, 3, 4, 0, 2, 3, 1, 0, 1, 0],
    [2, 1, 3, 3, 1, 4, 2, 0, 2, 0, 3, 2, 0, 2, 3, 2, 0, 3, 3, 1, 0],
    [2, 2, 3, 0, 3, 0, 2, 0, 1, 3, 2, 2, 2, 3, 0, 2, 3, 2, 2, 1, 3],
    [2, 2, 3, 2, 1, 3, 2, 0, 2, 2, 0, 2, 1, 0, 3, 1, 0, 2, 0, 0, 2],
    [2, 2, 3, 4, 1, 3, 2, 0, 2, 2, 0, 3, 1, 0, 3, 1, 0, 2, 0, 1, 2],
    [2, 4, 2, 4, 1, 0, 3, 3, 2, 1, 2, 2, 2, 0, 4, 1, 2, 3, 1, 2, 0],
    [0, 4, 2, 3, 0, 1, 3, 0, 3, 1, 3, 2, 2, 0, 3, 0, 1, 3, 2, 4, 1],
    [0, 0, 3, 2, 0, 4, 2, 2, 0, 0, 2, 2, 3, 1, 0, 2, 0, 1, 2, 3, 3],
    [2, 2, 3, 2, 1, 3, 2, 0, 2, 2, 0, 2, 1, 0, 3, 1, 0, 2, 0, 0, 2],
    [2, 2, 3, 4, 1, 3, 2, 0, 2, 2, 0, 3, 1, 0, 3, 1, 0, 2, 3, 1, 2],
    [2, 2, 0, 0, 0, 0, 0, 1, 2, 3, 0, 2, 3, 0, 1, 2, 0, 3, 0, 1, 2],
    [2, 2, 3, 0, 3, 0, 2, 0, 1, 3, 2, 2, 2, 3, 0, 2, 3, 2, 2, 1, 3],
];
var LivingCreatureArr = []
var grassArr = [];
var grassEaterArr = [];
var wildArr = [];
var omnivoreArr = [];

var side = 40;


function setup() {
    for (let i = 0; i < 33; i++) {
        matrix[i] = [];
        for (let j = 0; j < 33; j++) {
            matrix[i].push(random([0, 1, 2, 3, 4]))
        }
    }

    frameRate(4.5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                const gr = new Grass(j, i, 1);
                grassArr.push(gr);
            } else if (matrix[i][j] === 2) {
                const grEt = new GrassEater(j, i, 1);
                grassEaterArr.push(grEt);
            } else if (matrix[i][j] === 3) {
                const wi = new Wild(j, i, 1);
                wildArr.push(wi);

            } else if (matrix[i][j] === 4) {
                const omn = new Omnivore(j, i, 1);
                omnivoreArr.push(omn);
            }
        }
    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] === 2) {
                fill("yellow");
            }
            else if (matrix[y][x] === 3) {
                fill("red");
            } else if (matrix[y][x] === 4) {
                fill("blue");
            }

            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].move();

        if (grassEaterArr[i].energy > 0) {
            grassEaterArr[i].eat();

            if (grassEaterArr[i].energy > 12) {
                grassEaterArr[i].mul();
            }
        } else {
            grassEaterArr[i].die();
        }
    }

    for (var i in wildArr) {
        wildArr[i].move();

        if (wildArr[i].energy > 0) {
            wildArr[i].eat();

            if (wildArr[i].energy > 12) {
                wildArr[i].mul();
            }
        } else {
            wildArr[i].die();
        }
    }

    for (var i in omnivoreArr) {
        omnivoreArr[i].move();

        if (omnivoreArr[i].energy > 0) {
            omnivoreArr[i].eat();

            if (omnivoreArr[i].energy > 12) {
                omnivoreArr[i].mul();
            }
        } else {
            omnivoreArr[i].die();
        }
    }
}