class Cell{
    constructor(i, j) {
        this.walls = [true, true, true, true];
        this.visit = false;
        this.i = i;
        this.j = j;
    }

    checkniegh() {
        var niegh = [];
    
        var top = grid[index(this.i, this.j - 1)];
        var right = grid[index(this.i + 1, this.j)];
        var bottom = grid[index(this.i, this.j + 1)];
        var left = grid[index(this.i - 1, this.j)];
    
        if (right && !right.visit) {
          niegh.push(right);
        }
        if (top && !top.visit) {
          niegh.push(top);
        }
        if (left && !left.visit) {
          niegh.push(left);
        }
        if (bottom && !bottom.visit) {
          niegh.push(bottom);
        }

    
        if (niegh.length > 0) {
          var r = floor(random(0, niegh.length));
          return niegh[r];
        } else {
          return undefined;
        }
      }

      highlight() {
        var x = this.i * w;
        var y = this.j * w;
        noStroke();
        fill(245, 93, 62);
        rect(x, y, w, w);
      }

      display() {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);
        
        if (this.walls[1]) {
          line(x + w, y, x + w, y + w);
        }
        if (this.walls[0]) {
          line(x, y, x + w, y);
        }
        if (this.walls[3]) {
          line(x, y + w, x, y);
        }
        if (this.walls[2]) {
          line(x + w, y + w, x, y + w);
        }
    
        if (this.visit) {
          noStroke();
          if(this.i == 0 && this.j == 0){fill(245, 93, 62);}
          else if(index(this.i, this.j) == grid.length - 1){
            fill(247, 203, 21);
          }
          else{fill(135, 142, 136);}
          rect(x, y, w, w);
        }
      }
}


var stack = [];
var current;
var grid = [];
var cols, rows;
var w;

function setup() {
  dim = 500;
  var canvas = createCanvas(dim, dim);
  canvas.parent('maze');
  strokeWeight(1.5);
  w = 50;
  cols = 10;
  rows = 10;
  grid = [];
  stack = [];

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      grid.push(new Cell(i, j));
    }
  }
  console.info(grid.length-1);
  current = grid[0];
}

function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].display()
  }


  current.visit = true;
  
  current.highlight();
  var next = current.checkniegh();
  if (next) {
    next.visit = true;

    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

}

function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function choose(dim, numRows){
  clear();
  var canvas = createCanvas(dim, dim);
  canvas.parent('maze');
  strokeWeight(1.5);
  w = floor(dim/(numRows));
  console.info("w: " + w);
  cols = numRows;
  rows = numRows;
  grid = [];
  stack = [];
  //frameRate(5);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      grid.push(new Cell(i, j));
    }
  }
  console.info(grid.length-1);
  current = grid[0];
}

document.addEventListener('DOMContentLoaded', () => {
  let btn = document.getElementById('generate');
  btn.addEventListener('click', () => {
      let dim = document.getElementById('size').value==""?500:document.getElementById('size').value;
      let rowCol = document.getElementById('row').value==""?10:document.getElementById('row').value;
      choose(dim, rowCol);
  });
});