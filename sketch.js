// Muted color palette
const bauhausBg = ["#BEBCB4", "#DFD9CA", "#1E2019"];
let bgColor;
let xoff = 0.0;

// Create a new canvas to the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = random(bauhausBg);
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Render loop that draws shapes with p5
function draw() {
  let dim = min(width, height);
  blendMode(BLEND);
  const time = millis() / 1000;
  // INSERT NOISE
  xoff = xoff + 0.01;
  let n = noise(xoff) * width;
  const frequency = 0.3 * n * 0.001;
  const v = sin(time * frequency);
  const anim = v * 1 + 1;
  background(bgColor);

  blendMode(DIFFERENCE);
  
  // drawEachTile(
  //   width / 2,
  //   height / 2,
  //   dim * 0.5 * max(anim, 0.6),
  //   220,
  //   time * 0.5
  // );

  drawEachTile(
    width / 2,
    height / 2,
    dim * 0.35 * max(anim, 0.6),
    180,
    time * 0.5
  );

  drawEachTile(
    width / 2,
    height / 2,
    dim * 0.2 * max(anim, 0.6),
    80,
    time * 0.5
  );

  drawColumns(width / 2, height / 2, 100, 100, time * 0.2);

}

// Creates circle of circles
function drawEachTile(x, y, radius, sides = 3, angle = 0) {
  for (let i = 0; i < sides; i++) {
    const a = angle + TWO_PI * (i / sides);
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    if (i % 10 == 0) {
      drawTile(sx, sy);
    }
  }
}

function drawColumns(x, y, radius, sides = 3, angle = 0) {
  for (let i = 0; i < sides; i++) {
    const a = angle + TWO_PI * (i / sides);
    let sx = x + cos(a) * radius * 2.3;
    let sy = y + sin(a) * radius * 2.3;
    let ex = x + cos(a) * radius * 10;
    let ey = y + sin(a) * radius * 10;
    if (i % 10 == 0) {
      drawColumn(sx, sy, ex, ey);
    }
  }
}

// SIZE OF CIRCLE FUNCTION

function drawTile(sx, sy) {
  xoff = xoff + 0.0002;
  let n = noise(xoff) * width;
  const frequency = 0.1 * n * 0.001;
  const dim = min(width, height);
  noStroke();
  fill("#fff");
  circle(sx + frequency, sy + frequency, dim * 0.2, dim * 0.2);
}

function drawColumn(sx, sy, ex, ey) {
  const dim = min(width, height);
  noFill();
  strokeCap(SQUARE);
  strokeWeight(dim * 0.2);
  stroke("#fff");
  line(sx, sy, ex, ey);
}
