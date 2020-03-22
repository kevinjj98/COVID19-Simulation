let dots = [];
let population = 400;
let numHealthy = population;
let numSick = 0;
let numRecovered = 0;

let healthyLines = [];
let sickLines = [];
let recoveredLines = [];

function setup() {
  createCanvas(650, 650);
  while (dots.length < population) {
    let d = new Dot(floor(random(5, width - 5)), floor(random(105, height - 5)));

    let overlapping = false;

    for (let i = 0; i < dots.length; i++) {
      let other = dots[i];
      let distance = dist(d.x, d.y, other.x, other.y);
      if (distance < 10) {
        overlapping = true;
        break;
      }
    }

    if (!overlapping) {
      dots.push(d);
    }
  }
  //Make a single dot 'sick'
  //dots[floor(random(0, population))].status = 'sick';
  dots[floor(random(0, population))].gotSick();
  numHealthy--;
  numSick++;
}

function draw() {
  background(250);
  for (let i = 0; i < population; i++) {
    dots[i].update();
    //EDGE DETECTION
    if (dots[i].x - 5 <= 0 || dots[i].x + 5 >= width) {
      dots[i].dir.x *= -1;
    }
    if (dots[i].y - 5 <= 100 || dots[i].y + 5 >= height) {
      dots[i].dir.y *= -1;
    }
    dots[i].show();
    //COLLISIONS BETWEEN DOTS
    for (let j = 0; j < population; j++) {
      let dx = dots[j].x - dots[i].x;
      let dy = dots[j].y - dots[i].y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = 10;
      if (distance < minDist) {
        let angle = atan2(dy, dx);
        let targetX = dots[i].x + cos(angle) * minDist;
        let targetY = dots[i].y + sin(angle) * minDist;
        let ax = targetX - dots[j].x;
        let ay = targetY - dots[j].y;
        dots[i].dir.x -= ax;
        dots[i].dir.y -= ay;
        dots[j].dir.x += ax;
        dots[j].dir.y += ay;
        if ((dots[i].status === 'sick' && dots[j].status !== 'recovered') || (dots[j].status === 'sick' && dots[i].status !== 'recovered')) {
          dots[i].gotSick();
          dots[j].gotSick();
        }
      }
    }
  }
  let healthy = 0;
  let recovered = 0;
  let sick = 0;
  for (let i = 0; i < population; i++) {
    if (dots[i].status === 'recovered') {
      recovered++;
    } else if (dots[i].status === 'healthy') {
      healthy++;
    } else if (dots[i].status === 'sick') {
      sick++;
    }
  }
  fill(100);
  rect(0, 0, width, 100);
  numRecovered = recovered;
  numHealthy = healthy;
  numSick = sick;
  fill(255);
  textSize(26);
  text('Healthy: ', 10, 30);
  fill(50, 205, 50);
  text(numHealthy, 150, 30);
  fill(255);
  text('Recovered: ', 10, 60);
  fill(50, 0, 255);
  text(numRecovered, 150, 60);
  fill(255);
  text('Sick: ', 10, 90);
  fill(255, 0, 50);
  text(numSick, 150, 90);
  
  //healthy graph
  stroke(50, 205, 50);
  strokeWeight(2);
  healthyLines.push(new HealthyLine(250 + millis() * 0.02, 10, 250 + millis() * 0.02, map(numHealthy, population - 1, 0, 80, 10)));
  for (let i = 0; i < healthyLines.length; i++) {
    line(healthyLines[i].x1, healthyLines[i].y1, healthyLines[i].x2, healthyLines[i].y2);
  }
  
  //recovered graph
  stroke(50, 0, 255);
  strokeWeight(2);
  if (numRecovered > 0) {
    recoveredLines.push(new RecoveredLine(250 + millis() * 0.02, 10, 250 + millis() * 0.02, map(numRecovered, 0, population, 10, 80)));
  }
  for (let i = 0; i < recoveredLines.length; i++) {
    line(recoveredLines[i].x1, recoveredLines[i].y1, recoveredLines[i].x1, recoveredLines[i].y2);
  }
  
  //sick graph
  stroke(255, 0, 50);
  strokeWeight(2);
    sickLines.push(new SickLine(250 + millis() * 0.02, 80, 250 + millis() * 0.02, map(numSick, 0, population, 80, 10)));
  for (let i = 0; i < sickLines.length; i++) {
    line(sickLines[i].x1, sickLines[i].y1, sickLines[i].x2, sickLines[i].y2);
  }
  
  //END SIMULATION
  if (numSick == 0) {
    noLoop();
  }
}


class HealthyLine {
  constructor(x1, y1, x2, y2, type) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

class SickLine {
  constructor(x1, y1, x2, y2, type) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}

class RecoveredLine {
  constructor(x1, y1, x2, y2, type) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
}


class Dot {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.status = 'healthy';
    this.dir = p5.Vector.random2D();
    this.timestamp = 0;
  }

  update() {
    this.x += this.dir.x;
    this.y += this.dir.y;
    if (this.status === 'sick' && millis() - this.timestamp > 6000) {
      this.status = 'recovered';
    }
  }
  
  gotSick() {
    if (this.status !== 'sick') {
      this.timestamp = millis();
    }
    this.status = 'sick';
  }

  show() {
    noStroke();
    if (this.status === 'healthy') {
      fill(50, 205, 50); //green
    } else if (this.status === 'sick') {
      fill(255, 0, 50); //red
    } else if (this.status === 'recovered') {
      fill(50, 0, 255); //blue
    } else {
      fill(0, 0, 0); //error?
    }
    circle(this.x, this.y, 10);
  }

  intersects(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    return distance < 10;
  }
}