var socket = io();
function setup() {
   let side = 25;

   noStroke();
   createCanvas(19 * side, 18 * side);
   background("#acacac");

   socket.on("send matrix", draw);
   function draw(matrix) {
      let select = document.getElementById("seasons");
      let option = select.options[select.selectedIndex];
      let season = option.value;
      let backgroundColor = "#acacac";
      if (season == "Summer") {
         backgroundColor = "Tomato";
      } else if (season == "Winter") {
         backgroundColor = "SteelBlue";
      } else if (season == "Spring") {
         backgroundColor = "SpringGreen";
      } else {
         backgroundColor = "Chocolate";
      }
      background(backgroundColor);
      for (var i = 0; i < matrix.length; i++) {
         for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
               fill("green");
               rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
               fill("orange");
               rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
               fill(backgroundColor);
               rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 3) {
               fill("red");
               rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 4) {
               fill("lightblue");
               rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 5) {
               fill("blue");
               rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 6) {
               fill("black");
               rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 7) {
               fill("yellow");
               rect(j * side, i * side, side, side);
            }
         }
      }
   }
}

function mess() {
   socket.emit("mess");
}
