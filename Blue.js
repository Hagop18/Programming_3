let Eatgrass = require("./Eatgrass");

module.exports = class Blue extends Eatgrass {
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

         matrix[y][x] = 5;
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

         matrix[y][x] = 5;
         matrix[this.y][this.x] = 0;

         this.x = x;
         this.y = y;

         this.multiply++;

         this.energy++;

         if (this.energy == 6) {
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

         var blue = new Blue(x, y);
         blueArr.push(blue);

         matrix[y][x] = 5;
      }
   }

   die() {
      matrix[this.y][this.x] = 0;

      for (var i in blueArr) {
         if (this.x == blueArr[i].x && this.y == blueArr[i].y) {
            blueArr.splice(i, 1);
         }
      }
   }
};
