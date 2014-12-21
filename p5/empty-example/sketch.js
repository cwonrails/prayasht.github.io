function setup() {
  createCanvas(1280, 700);
}

function draw() {
  if (mouseIsPressed) {
    fill(255);
    ellipse(mouseX, mouseY, 40, 40);
  }
}