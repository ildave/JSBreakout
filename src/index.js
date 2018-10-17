import Paddle from "/src/paddle.js";
import Ball from "/src/ball.js";
import Brick from "/src/brick.js";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

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
