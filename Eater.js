let Grass = require("./Grass");

class Eater extends Grass {
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
}

module.exports = Eater;
