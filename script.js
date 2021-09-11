var side = 25;
var xotArr = [];
var eatArr = [];
var predArr = [];
var turnedArr = [];
var blueArr = [];
var blackArr = [];
var eat1Arr = [];


var matrix = [
    [6, 1, 0, 2, 2, 0, 0, 0, 1, 2, 3, 0, 2, 1, 1, 2, 1, 5, 6],
    [0, 5, 1, 0, 0, 2, 3, 0, 0, 1, 1, 0, 0, 1, 1, 5, 1, 1, 1],
    [0, 1, 0, 2, 0, 1, 3, 0, 0, 1, 0, 0, 1, 1, 1, 1, 3, 1, 2],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 2, 0, 1, 0, 0, 1, 0, 3, 0, 1, 1, 1, 2, 1, 1, 1],
    [0, 1, 0, 0, 4, 1, 0, 0, 1, 0, 3, 0, 0, 5, 1, 4, 1, 4, 1],
    [0, 1, 0, 0, 0, 2, 3, 0, 0, 1, 1, 0, 2, 1, 1, 1, 1, 2, 1],
    [2, 0, 0, 0, 0, 5, 0, 3, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 4, 0, 1, 3, 0, 0, 1, 0, 0, 0, 1, 4, 2, 2, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 2, 0, 0, 1, 0, 3, 1, 0, 0, 1, 2, 1, 1, 1, 1, 2, 1],
    [0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    [2, 0, 2, 0, 0, 1, 3, 0, 1, 1, 1, 0, 1, 3, 1, 1, 5, 1, 1],
    [2, 0, 0, 2, 3, 0, 1, 0, 1, 1, 2, 0, 2, 1, 1, 1, 1, 2, 1],
    [0, 1, 1, 1, 0, 1, 0, 1, 2, 1, 2, 0, 2, 1, 1, 1, 1, 1, 2],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 0, 1, 2, 1, 2, 0, 2, 1, 1, 1, 1, 1, 1],
    [6, 1, 0, 0, 0, 3, 2, 0, 0, 1, 0, 0, 2, 1, 1, 1, 1, 2, 6],
]


function setup() {
    noStroke();
    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            }else if(matrix[y][x] == 3){
                var predator = new Predator(x, y);
                predArr.push(predator);
            }else if(matrix[y][x] == 4){
                var turned = new Turned(x, y);
                turnedArr.push(turned);
            }else if(matrix[y][x] == 5){
            	var blue = new Blue(x, y);
            	blueArr.push(blue);
            }else if(matrix[y][x] == 6){
                var black = new Black(x, y);
                blackArr.push(black);
            }else if(matrix[y][x] == 7){
                var eat1grass = new Eatgrass1(x, y);
                eat1Arr.push(eatgrass1);
            }
        }
    }
}

function draw() {
    background('#acacac');
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            }else if(matrix[i][j] == 3){
                fill("red");
                rect(j * side, i * side, side, side);
            }else if(matrix[i][j] == 4){
                fill("lightblue");
                rect(j * side, i * side, side, side);
            }else if(matrix[i][j] == 5){
            	fill("blue");
                rect(j * side, i * side, side, side);
            }else if(matrix[i][j] == 6){
                fill("black");
                rect(j * side, i * side, side, side);
            }else if(matrix[i][j] == 7){
                fill("yellow");
                rect(j * side, i * side, side, side);
            }
        }
    }


    for (var i in xotArr) {
        xotArr[i].mul();
    }

    for (var i in eatArr) {
        eatArr[i].eat();
    }

    for (var i in predArr) {
        predArr[i].eat();
    }

    for (var i in turnedArr) {
        turnedArr[i].eat();
    }

    for (var i in blueArr) {
        blueArr[i].eat();
    }

    for (var i in blackArr) {
        blackArr[i].create();
    }

    for (var i in eat1Arr) {
        eat1Arr[i].eat();
    }
}