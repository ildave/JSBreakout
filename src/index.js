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
    this.x = 400;
    this.y = 300;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  reset() {
    this.speedX = 2;
    this.speedY = -3;
    this.x = 400;
    this.y = 300;
  }
}

class Brick {
  constructor(ctx, x, y, lifes) {
    this.colors = ["#fff", "#ccc", "#737373", "#000"];
    this.ctx = ctx;
    this.width = 80;
    this.height = 30;
    this.lifes = lifes;
    this.color = this.colors[this.lifes];
    this.x = x;
    this.y = y;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.strokeStyle = "#000";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 37) {
    paddle.moveLeft();
  }
  if (e.keyCode === 39) {
    paddle.moveRight();
  }
  if (e.keyCode === 80) {
    if (!running) {
      requestAnimationFrame(gameLoop);
    }
    running = !running;
  }
  if (e.keyCode === 68) {
    console.log("Ball", ball.x, ball.y);
    console.log("Paddle", paddle.x, paddle.y);
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

function checkCollisions(ball, paddle, bricks) {
  if (ball.x - ball.radius <= 0) {
    ball.speedX = -ball.speedX;
  }
  if (ball.y - ball.radius <= 0) {
    ball.speedY = -ball.speedY;
  }
  if (ball.x >= 800 - ball.radius) {
    ball.speedX = -ball.speedX;
  }
  if (ball.y >= 600 - ball.radius) {
    ball.speedY = -ball.speedY;
  }
  if (
    ball.y + ball.radius > paddle.y &&
    ball.x >= paddle.x - ball.radius &&
    ball.x <= paddle.x + paddle.width
  ) {
    ball.speedY = -ball.speedY;
    ball.y = paddle.y - ball.radius;
  }
  bricks.forEach(function(b, i) {
    let ballBottom = ball.y + ball.radius;
    let ballTop = ball.y - ball.radius;
    let brickBottom = b.y + b.height;
    let brickTop = b.y;

    if (
      ballBottom >= brickTop &&
      ballTop <= brickBottom &&
      ball.x >= b.x &&
      ball.x <= b.x + b.width
    ) {
      b.lifes--;
      b.color = b.colors[b.lifes];
      ball.speedY = -ball.speedY;
    }
  });
}

let levels = [
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

function buildLevel(index) {
  let level = levels[index];
  let bricks = [];
  let y = 50;
  let x = 0;
  for (let i = 0; i < level.length; i++) {
    if (level[i] > 0) {
      let b = new Brick(ctx, x * 80, y, level[i]);
      bricks.push(b);
    }
    x = (x + 1) % 10;
    if (i % 10 === 9) {
      y = y + 30;
    }
  }
  return bricks;
}

let running = true;
let currentLevel = 0;
let paddle = new Paddle(ctx);
let ball = new Ball(ctx, paddle);
let bricks = [];
bricks = buildLevel(currentLevel);

function gameLoop(t) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, 800, 600);
  bricks = bricks.filter(function(b) {
    return b.lifes > 0;
  });
  paddle.update();
  paddle.draw();
  ball.update();
  ball.draw();
  bricks.forEach(function(b, i) {
    b.draw();
  });
  checkCollisions(ball, paddle, bricks);

  if (bricks.length === 0) {
    currentLevel++;
    bricks = [];
    bricks = buildLevel(currentLevel);
    ball.reset();
  }
  if (running) {
    requestAnimationFrame(gameLoop);
  }
}

requestAnimationFrame(gameLoop);
