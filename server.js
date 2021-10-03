let express = require("express");
let app = express();
let server = require("http").Server(app);
var io = require("socket.io")(server);
var fs = require("fs");

app.use(express.static("."));

app.get("/", function (req, res) {
   res.redirect("index.html");
});

server.listen(3000);

matrix = [
   [6, 1, 0, 2, 2, 0, 0, 0, 1, 2, 3, 0, 2, 1, 1, 2, 1, 5, 6],
   [0, 5, 1, 0, 0, 2, 3, 0, 0, 1, 1, 0, 0, 1, 1, 5, 1, 1, 1],
   [0, 1, 0, 2, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 3, 1, 2],
   [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
   [0, 1, 0, 2, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1],
   [0, 1, 0, 1, 4, 1, 0, 0, 1, 0, 3, 0, 0, 5, 1, 4, 1, 4, 1],
   [0, 1, 0, 0, 0, 2, 3, 0, 0, 1, 1, 0, 2, 1, 1, 1, 1, 2, 1],
   [2, 0, 0, 0, 0, 5, 0, 3, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
   [0, 0, 0, 4, 0, 1, 3, 0, 0, 1, 0, 0, 0, 1, 4, 2, 2, 1, 1],
   [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
   [0, 0, 2, 0, 0, 1, 0, 3, 1, 1, 0, 1, 2, 1, 1, 1, 1, 2, 1],
   [0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
   [2, 0, 2, 0, 0, 1, 3, 0, 1, 1, 1, 0, 1, 3, 1, 1, 5, 1, 1],
   [2, 0, 0, 2, 3, 0, 1, 0, 1, 1, 2, 0, 2, 1, 1, 1, 1, 2, 1],
   [0, 1, 1, 1, 0, 1, 0, 1, 2, 1, 2, 0, 2, 1, 1, 1, 1, 1, 2],
   [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
   [0, 1, 1, 1, 0, 1, 0, 1, 2, 1, 2, 0, 2, 1, 1, 1, 1, 1, 1],
   [6, 1, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 2, 1, 1, 1, 1, 2, 6],
];
io.sockets.emit("send matrix", matrix);
xotArr = [];
eatArr = [];
predArr = [];
turnedArr = [];
blueArr = [];
blackArr = [];
eat1Arr = [];

const Grass = require("./Grass");
const Eatgrass = require("./Eatgrass");
const Black = require("./Black");
const Blue = require("./Blue");
const Eatgrass1 = require("./Eatgrass1");
const Predator = require("./Predator");
const Turned = require("./Turned");

function emptyAllArrays() {
   xotArr.splice(0, xotArr.length);
   eatArr.splice(0, eatArr.length);
   predArr.splice(0, predArr.length);
   turnedArr.splice(0, turnedArr.length);
   blueArr.splice(0, blueArr.length);
   blackArr.splice(0, blackArr.length);
   eat1Arr.splice(0, eat1Arr.length);
}

function fix() {
   const OG = [
      [6, 1, 0, 2, 2, 0, 0, 0, 1, 2, 3, 0, 2, 1, 1, 2, 1, 5, 6],
      [0, 5, 1, 0, 0, 2, 3, 0, 0, 1, 1, 0, 0, 1, 1, 5, 1, 1, 1],
      [0, 1, 0, 2, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 3, 1, 2],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 2, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 1],
      [0, 1, 0, 1, 4, 1, 0, 0, 1, 0, 3, 0, 0, 5, 1, 4, 1, 4, 1],
      [0, 1, 0, 0, 0, 2, 3, 0, 0, 1, 1, 0, 2, 1, 1, 1, 1, 2, 1],
      [2, 0, 0, 0, 0, 5, 0, 3, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 4, 0, 1, 3, 0, 0, 1, 0, 0, 0, 1, 4, 2, 2, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 2, 0, 0, 1, 0, 3, 1, 1, 0, 1, 2, 1, 1, 1, 1, 2, 1],
      [0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
      [2, 0, 2, 0, 0, 1, 3, 0, 1, 1, 1, 0, 1, 3, 1, 1, 5, 1, 1],
      [2, 0, 0, 2, 3, 0, 1, 0, 1, 1, 2, 0, 2, 1, 1, 1, 1, 2, 1],
      [0, 1, 1, 1, 0, 1, 0, 1, 2, 1, 2, 0, 2, 1, 1, 1, 1, 1, 2],
      [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 1, 1, 0, 1, 0, 1, 2, 1, 2, 0, 2, 1, 1, 1, 1, 1, 1],
      [6, 1, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 2, 1, 1, 1, 1, 2, 6],
   ];
   for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
         matrix[i][j] = OG[i][j];
      }
   }
   parameters();
   // io.socket.emit("send matrix", matrix);
}

function parameters() {
   for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] == 2) {
            var eatgrass = new Eatgrass(x, y);
            eatArr.push(eatgrass);
         } else if (matrix[y][x] == 1) {
            var grass = new Grass(x, y);
            xotArr.push(grass);
         } else if (matrix[y][x] == 3) {
            var predator = new Predator(x, y);
            predArr.push(predator);
         } else if (matrix[y][x] == 4) {
            var turned = new Turned(x, y);
            turnedArr.push(turned);
         } else if (matrix[y][x] == 5) {
            var blue = new Blue(x, y);
            blueArr.push(blue);
         } else if (matrix[y][x] == 6) {
            var black = new Black(x, y);
            blackArr.push(black);
         } else if (matrix[y][x] == 7) {
            var eat1grass = new Eatgrass1(x, y);
            eat1Arr.push(eat1grass);
         }
      }
   }
}

function mess() {
   for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
         matrix[i][j] = 0;
      }
   }
   // io.socket.emit("send matrix", matrix);
   emptyAllArrays();
   setTimeout(fix, 2000);
}

io.on("connection", function (socket) {
   parameters();
   socket.on("mess", mess);
});
parameters();

function game() {
   for (var i in xotArr) {
      xotArr[i].mul();
   }

   if (xotArr.length == 0) {
      for (let i = matrix.length / 2; i < matrix.length / 2 + 3; i++) {
         for (let j = matrix[i].length / 2; j < matrix[i].length / 2 + 3; j++) {
            matrix[i][j] = 1;
         }
      }
      parameters();
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
   io.sockets.emit("send matrix", matrix);
}

setInterval(game, 500);

var statistics = {};

setInterval(function () {
   statistics.grass = xotArr.length;
   statistics.eatgrass = eat1Arr;
   fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
      console.log("send");
   });
}, 1000);
