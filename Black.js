let Grass = require("./Grass");

module.exports = class Black extends Grass {
   constructor(x, y) {
      super(x, y);
   }

   newDirections() {
      super.newDirections();
   }

   getDirections(t) {
      return super.getDirections(t);
   }

   create() {
      this.multiply++;
      if (this.multiply == 4) {
         this.mul();
         this.multiply = 0;
      }
   }

   mul() {
      var fundCords = this.getDirections(0);
      var cord = random(fundCords);

      if (cord) {
         var x = cord[0];
         var y = cord[1];

         var norXotaker1 = new Eatgrass1(x, y);
         eat1Arr.push(norXotaker1);

         matrix[y][x] = 7;
      }
   }
};
