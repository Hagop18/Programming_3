let Eater = require("./Eater");
let Blue = require("./Blue");
var random = require("./random");

class Turned extends Eater {
   constructor(x, y) {
      super(x, y);
   }

   newDirections() {
      super.newDirections();
   }

   getDirections(t) {
      return super.getDirections(t);
   }

   move() {
      var fundCords = this.getDirections(0);
      var cord = random(fundCords);

      if (cord) {
         var x = cord[0];
         var y = cord[1];

         matrix[y][x] = 4;
         matrix[this.y][this.x] = 0;

         this.x = x;
         this.y = y;
      }
   }

   eat() {
      var fundCords = this.getDirections(2);
      var cord = random(fundCords);

      if (cord) {
         var x = cord[0];
         var y = cord[1];

         matrix[y][x] = 4;
         matrix[this.y][this.x] = 0;

         this.x = x;
         this.y = y;

         this.multiply++;

         this.energy++;

         if (this.energy == 6) {
            this.die();
            matrix[y][x] = 5;
            let blue = new Blue(x, y);
            blueArr.push(blue);
            this.energy = 3;
         }

         for (var i in eatArr) {
            if (x == eatArr[i].x && y == eatArr[i].y) {
               eatArr.splice(i, 1);
            }
         }

         if (this.multiply == 6) {
            this.mul();
            this.multiply = 0;
         }
      } else {
         this.move();
         this.energy--;
         if (this.energy <= 0) {
            this.die();
         }
      }
   }

   mul() {
      var fundCords = this.getDirections(0);
      var cord = random(fundCords);

      if (cord) {
         var x = cord[0];
         var y = cord[1];

         var turned = new Turned(x, y);
         turnedArr.push(turned);

         matrix[y][x] = 4;
      }
   }

   die() {
      matrix[this.y][this.x] = 0;

      for (var i in turnedArr) {
         if (this.x == turnedArr[i].x && this.y == turnedArr[i].y) {
            turnedArr.splice(i, 1);
         }
      }
   }
}

module.exports = Turned;
