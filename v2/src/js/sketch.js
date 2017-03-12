// Prayash Thapa (effulgence.io)
// Portfolio Fragments

var cols, rows;
var scl = 25;
var w = 1980;
var h = 800;
var fade = 255;
var flying = 0;

var terrain;

// ************************************************************************************

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent("content");
  background('#EBEBEB');
  frameRate(30);
  colorMode(RGB);

  cols = w / scl;
  rows = h / scl;

  terrain = [];
  for (var x = 0; x < cols; x++) {
    terrain[x] = [];
  }
}

// ************************************************************************************

function draw() {
  background('#EBEBEB');
  strokeWeight(2);
  stroke(228, 238, 238);

  flying -= 0.01;
  var yOff = flying;
  for (var y = 0; y < rows; y++) {
    var xOff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xOff, yOff), 0, 1, -200, 200);
      xOff += 0.1;
    }
    yOff += 0.05;
  }

  rotateX(-PI/2);
  translate(-w/2, -h/4);

  var locY = (mouseY / height - 0.5) * (2);
  var locX = (mouseX / width - 0.5) * 2;

  var hue = map(frameCount, 0, 255, 0, 255);
  ambientLight(10, 90, hue);
  pointLight(250, 250, 250, locX, locY, 255);
  ambientMaterial(155, 155);

  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    stroke(0);
    for (var x = 0; x < cols; x++) {
      push();
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
      pop();
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
