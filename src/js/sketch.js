// Prayash Thapa (effulgence.io)
// Portfolio Fragments

var num = 50, frames = 300, edge = 40;
var fragments = [];
var theta = 0;

// ************************************************************************************

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("content"); frameRate(30);
  background('#EBEBEB');

  if (windowWidth >= 780) num = 75;
  else num = 25;

  // * Fragments
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
  background('#EBEBEB');
  colorMode(RGB); strokeWeight(2);

  for (var i = 0; i < fragments.length; i++) fragments[i].render();
  theta += TWO_PI/frames * (0.1);
}

// Fragment
function Fragment(_x, _y) {
  var x, y;
  var px, py, offSet, radius;
  var dir, col, currentOrb, opacity;

  this.x = _x;
  this.y = _y;
  offSet = random(TWO_PI);
  radius = random(5, 10);
  dir = random(1) > .5 ? 1 : -1;

  this.render = function() {
    this.update();
    this.display();
  };

  this.update = function() {
    var vari = map(sin(theta + offSet), -1, 1, -2, -2);
    px = map(sin(theta + offSet) , -1, 1, 0, width);
    py = this.y + sin(theta * dir) * radius * vari;
  }

  this.display = function() {
    ellipse(px, py, 4, 4);
    for (var i = 0; i < fragments.length; i++) {
      // Calculate distance from current node to every other
      var p2 = fragments[i];
      var distance = dist(px, py, p2.px, p2.py);

      // Only draw if certain distance between nodes
      if (distance > 30 && distance < 125) {
        strokeCap(ROUND); stroke(0, 25);
        line(px, py, fragments[i].px, fragments[i].py);
      }

      // Inner loop further enumerates to all other vertices to calculate triangulation
      for (var j = i + 1; j < fragments.length; j++) {
        var p3 = fragments[j];
        var dist2 = dist(p2.px, p2.py, p3.px, p3.py);
        var dist3 = dist(px, py, p3.px, p3.py)
        // Triangulation
        if (distance <= 120 && dist2 <= 120 && dist3 <= 120) {
          noStroke(); fill(32, 32, 32, 10);
          // triangle(px, py, p2.px, p2.py, p3.px, p3.py);
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
