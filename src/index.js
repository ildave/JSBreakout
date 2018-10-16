let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

class Paddle {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = 100;
    this.height = 20;
    this.color = "#00f";
    this.x = 800 / 2 - this.width / 2;
    this.y = 600 - this.height * 2;
    this.speed = 10;
    this.currentSpeed = 0;
  }

  update() {
    this.x += this.currentSpeed;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x + this.width > 800) {
      this.x = 800 - this.width;
    }
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveLeft() {
    this.currentSpeed = -this.speed;
  }

  moveRight() {
    this.currentSpeed = this.speed;
  }

  stop() {
    this.currentSpeed = 0;
  }
}

class Ball {
  constructor(ctx, paddle) {
    this.ctx = ctx;
    this.paddle = paddle;
    this.radius = 8;
    this.color = "#f00";
    this.speedX = 2;
    this.speedY = -3;
    this.x = 100;
    this.y = 100;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  update() {
    if (this.x - this.radius <= 0) {
      this.speedX = -this.speedX;
    }
    if (this.y - this.radius <= 0) {
      this.speedY = -this.speedY;
    }
    if (this.x >= 800 - this.radius) {
      this.speedX = -this.speedX;
    }
    if (this.y >= 600 - this.radius) {
      this.speedY = -this.speedY;
    }
    if (
      this.y >= this.paddle.y - this.radius &&
      this.x >= this.paddle.x - this.radius &&
      this.x <= this.paddle.x + this.paddle.width
    ) {
      this.speedY = -this.speedY;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }
}

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 37) {
    paddle.moveLeft();
  }
  if (e.keyCode === 39) {
    paddle.moveRight();
  }
});

document.addEventListener("keyup", function(e) {
  if (e.keyCode === 37) {
    if (paddle.currentSpeed < 0) {
      paddle.stop();
    }
  }
  if (e.keyCode === 39) {
    if (paddle.currentSpeed > 0) {
      paddle.stop();
    }
  }
});

let paddle = new Paddle(ctx);
let ball = new Ball(ctx, paddle);
let current = 0;
function gameLoop(t) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, 800, 600);
  if (!current) current = t;
  let dt = t - current;
  current = t;
  paddle.update();
  paddle.draw();
  ball.update();
  ball.draw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
