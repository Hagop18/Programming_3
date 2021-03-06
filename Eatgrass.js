let Grass = require("./Grass");
let Turned = require("./Turned");
var random = require("./random");

class Eatgrass extends Grass {
   constructor(x, y) {
      super(x, y);
      this.energy = 3;
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

         matrix[y][x] = 2;
         matrix[this.y][this.x] = 0;

         this.x = x;
         this.y = y;
      }
   }

   eat() {
      var fundCords = this.getDirections(1);
      var cord = random(fundCords);

      if (cord) {
         var x = cord[0];
         var y = cord[1];

         matrix[y][x] = 2;
         matrix[this.y][this.x] = 0;

         this.x = x;
         this.y = y;

         this.multiply++;

         this.energy++;

         if (this.energy == 10) {
            this.die();
            matrix[y][x] = 4;
            let turned = new Turned(x, y);
            turnedArr.push(turned);
            this.energy = 3;
         }

         for (var i in xotArr) {
            if (x == xotArr[i].x && y == xotArr[i].y) {
               xotArr.splice(i, 1);
            }
         }

         if (this.multiply == 10) {
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

         var norXotaker = new Eatgrass(x, y);
         eatArr.push(norXotaker);

         matrix[y][x] = 2;
      }
   }

   die() {
      matrix[this.y][this.x] = 0;

      for (var i in eatArr) {
         if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
            eatArr.splice(i, 1);
         }
      }
   }
}

module.exports = Eatgrass;
