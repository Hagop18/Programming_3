let Eatgrass = require("./Eatgrass");

module.exports = class Predator extends Eatgrass {
   constructor(x, y) {
      super(x, y);
      this.energy = 5;
   }

   newDirections() {
      super.newDirections();
   }

   getDirections(t) {
      return super.getDirections(t);
   }

   mul() {
      var fundCords = this.getDirections(0);
      var cord = random(fundCords);

      if (cord) {
         var x = cord[0];
         var y = cord[1];

         var pred = new Predator(x, y);
         predArr.push(pred);

         matrix[y][x] = 3;
      }
   }

   move() {
      var fundCords = this.getDirections(0);
      var cord = random(fundCords);

      if (cord) {
         var x = cord[0];
         var y = cord[1];

         matrix[y][x] = 3;
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

         matrix[y][x] = 3;
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

   die() {
      matrix[this.y][this.x] = 0;

      for (var i in predArr) {
         if (this.x == predArr[i].x && this.y == predArr[i].y) {
            predArr.splice(i, 1);
         }
      }
   }
};
