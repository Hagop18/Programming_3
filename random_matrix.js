var bardz = 30;  //մատրիցի բարձրությունը
var layn = 100;  //մատրիցի երկարությունը
var grassCount = 120; //խոտերի սկզբնական քանակը մատրիցում 
var eatGrassCount = 10; //խոտակերների սկզբնական քանակը մատրիցում 
var matrix = [];


//Լցնենք մատրիցան 0-ներով
for (var i = 0; i < bardz; i++) {
    matrix.push([]);
    for (var j = 0; j < layn; j++) {
        matrix[i].push(0);
    }
}

function setup() {
    var n = 0;
    while (n < grassCount) {
        var x = Math.floor(random(0, layn));
        var y = Math.floor(random(0, bardz));
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            n++;
        }
    }

}

function genetareMatrix(lengthY, lengthX, number) {

let matrix = [];

function getRandomInt(max) {
return Math.floor(Math.random() * Math.floor(max));
}

for (let y = 0; y < lengthY; y++) {
matrix.push([]);
for (let x = 0; x < lengthX; x++) {
let randomCount = getRandomInt(number);
matrix[y].push(randomCount);
}
}
return matrix;

}

let matrix = genetareMatrix(10,30,4);