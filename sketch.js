
let puck;
let left;
let right;

function setup() {
  createCanvas(600, 400);
  puck = new Puck();
  left = new Paddle(true);
  right = new Paddle(false);
}

function draw() {
  background(0);

  puck.checkPaddleLeft(left);
  puck.checkPaddleRight(right);

  left.display();
  right.display();
  left.update();
  right.update();

  puck.update();
  puck.display();
  puck.edges();
}

function keyReleased() {
  left.move(0);
  right.move(0);
}

function keyPressed() {
  if (key == "a") {
    left.move(-10);
  } else if (key == "z") {
    left.move(10);
  }

  if (key == "k") {
    right.move(-10);
  } else if (key == "m") {
    right.move(10);
  }

}

class Puck {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 12;
    this.xspeed = 4;
    this.yspeed = 4;
  }


  checkPaddleLeft(paddle) {
    if (this.y < paddle.y + paddle.h/2 && 
      this.y > paddle.y - paddle.h/2 &&
      this.x - this.r < paddle.x + paddle.w/2) {
        this.xspeed *= -1
    }
  }
  checkPaddleRight(paddle) {
    if (this.y < paddle.y + paddle.h/2 && 
      this.y > paddle.y - paddle.h/2 &&
      this.x + this.r > paddle.x - paddle.w/2) {
        this.xspeed *= -1
    }
  }

  update() {
    this.x = this.x + this.xspeed;
    this.y = this.y + this.yspeed;
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
  }

  edges() {
    if (this.y < 0 || this.y > height) {
      this.yspeed *= -1;
    }
    if (this.x > width) {
      reset()
    }
  }

  display() {
    fill(255);
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }
}


class Paddle {
  constructor(bool) {
    this.x;
    this.y = height/2;
    this.w = 10;
    this.h = 100;
    this.bool = bool;
    this.ychange = 0;

    if (this.bool) {
      this.x = this.w
    } else {
      this.x = width - this.w
    }
  }


  update() {
    this.y += this.ychange;
    this.y = constrain(this.y, this.h/2, height - this.h/2);
  }

  move(steps) {
    this.ychange = steps;
  }
  
  display() {
    fill(255);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h)
  }
}