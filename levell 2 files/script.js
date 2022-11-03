var matrix = [
    [1, 0, 2, 0, 0],
    [0, 0, 0, 0, 1],
    [2, 0, 0, 0, 0],
    [0, 3, 1, 0, 2],
    [2, 0, 0, 0, 0],
    [0, 0, 0, 2, 0],
    [0, 2, 0, 0, 1]
];

var grassArr = [];
var grassEaterArr = [];
var wildArr = [];

var side = 120;

function setup() {
    frameRate(10);
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
            }

            rect(x * side, y * side, side, side);


            fill("blue")
            text(x + " " + y, x * side + side / 2, y * side + side / 2)
        }
    }

    for(var i in grassArr){
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
}