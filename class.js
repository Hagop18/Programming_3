class Grass {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.multiply = 0;
      this.directions = [];
   }
   newDirections() {
      this.directions = [
         [this.x - 1, this.y - 1],
         [this.x, this.y - 1],
         [this.x + 1, this.y - 1],
         [this.x - 1, this.y],
         [this.x + 1, this.y],
         [this.x - 1, this.y + 1],
         [this.x, this.y + 1],
         [this.x + 1, this.y + 1],
      ];
   }

   getDirections(t) {
      this.newDirections();
      var found = [];
      for (var i in this.directions) {
         var x = this.directions[i][0];
         var y = this.directions[i][1];
         if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[y][x] == t) {
               found.push(this.directions[i]);
            }
         }
      }
      return found;
   }

   mul() {
      this.multiply++;
      if (this.multiply >= 4) {
         var fundCords = this.getDirections(0);
         var cord = random(fundCords);
         if (cord) {
            var x = cord[0];
            var y = cord[1];

            var norXot = new Grass(x, y);
            xotArr.push(norXot);

            matrix[y][x] = 1;
            this.multiply = 0;
         }
      }
   }
}

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

class Predator extends Eatgrass {
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
}

class Turned extends Eatgrass {
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

class Blue extends Eatgrass {
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
}

class Black extends Grass {
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
}

class Eatgrass1 extends Eatgrass {
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

         matrix[y][x] = 7;
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

         matrix[y][x] = 7;
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

         var norXotaker1 = new Eatgrass1(x, y);
         eat1Arr.push(norXotaker1);

         matrix[y][x] = 7;
      }
   }

   die() {
      matrix[this.y][this.x] = 0;

      for (var i in eat1Arr) {
         if (this.x == eat1Arr[i].x && this.y == eat1Arr[i].y) {
            eat1Arr.splice(i, 1);
         }
      }
   }
}
