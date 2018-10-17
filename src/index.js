import Brick from "/src/brick.js";
import levels from "/src/levels.js"
import Game from "src/game.js";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
/*
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
*/
/*
let running = true;
let currentLevel = 0;
let paddle = new Paddle(ctx);
let ball = new Ball(ctx, paddle);
let bricks = [];
bricks = buildLevel(currentLevel);
*/
let game = new Game(800, 600, ctx, levels);
game.initInput();

function gameLoop() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, 800, 600);
  game.removeBricks();
  game.update()
  game.draw();
  game.checkCollisions();
  if (game.bricks.length === 0) {
    game.currentLevel++;
    game.bricks = [];
    game.bricks = buildLevel();
    game.ball.reset();
  }
  /*
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
  */
  if (game.running) {
    requestAnimationFrame(gameLoop);
  }
}

requestAnimationFrame(gameLoop);
