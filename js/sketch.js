// Fragments
var num = 50, frames = 300, edge = 40;
var fragments = [];
var theta = 0;

// ************************************************************************************

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("canvas");
  frameRate(30);
  if (windowWidth >= 780) num = 75;
  else num = 0;

  // Fragments
  for (var i = 0; i < num; i++) {
    var x = random(windowWidth);
    var y = (windowHeight - 2) / (num) * i;
    fragments.push(new Fragment(x, y));
    fragments[i].px = random(windowWidth);
    fragments[i].py = random(windowHeight);
  }
}

// ************************************************************************************

function draw() {
  background(255);

  // ---------------
  // Fragments
  colorMode(RGB);
  noFill();
  stroke(0, 25);
  strokeWeight(2);
  for (var i = 0; i < fragments.length; i++) {
    fragments[i].run();
  }
  theta += TWO_PI/frames * (0.1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ************************************************************************************
// Classes

// Fragment
function Fragment(_x, _y) {
  var x, y;
  var px, py, offSet, radius;
  var dir;
  var col; var currentOrb;

  this.x = _x;
  this.y = _y;
  offSet = random(TWO_PI);
  radius = random(5, 10);
  dir = random(1) > .5 ? 1 : -1;
 
  this.run = function() {
    this.update();
    this.display();
  };
 
  this.update = function() {
    var vari = map(sin(theta + offSet), -1, 1, -2, -2);
    px = map(sin(theta + offSet) , -1, 1, 0, width);
    py = this.y + sin(theta * dir) * radius * vari;
  }
 
  this.display = function() {
    for (var i = 0; i < fragments.length; i++) {
      var distance = dist(px, py, fragments[i].px, fragments[i].py);

      if (distance > 0 && distance < 125) {
        strokeCap(ROUND);
        line(px, py, fragments[i].px, fragments[i].py);
        // ellipse(px, py, 5, 5);
        // ellipse(fragments[i].px, fragments[i].py, 10, 10);
      }
    }
  }
}