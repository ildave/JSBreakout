export default class Game {
    constructor(width, height, ctx, levels) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.levels = levels;
        this.running = true;
        this.currentLevel = 0;
        this.paddle = new Paddle(ctx);
        this.ball = new Ball(crx, this.paddle);
        this.bricks = [];
    }

    buildLevel() {
        let level = this.levels[this.currentLevel];
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
        this.bricks = bricks;
      }

    initInput() {
        document.addEventListener("keydown", function(e) {
            if (e.keyCode === 37) {
                this.paddle.moveLeft();
            }
            if (e.keyCode === 39) {
                this.paddle.moveRight();
            }
            if (e.keyCode === 80) {
                if (!this.running) {
                requestAnimationFrame(gameLoop);
                }
                this.running = !this.running;
            }
            if (e.keyCode === 68) {
                console.log("Ball", this.ball.x, this.ball.y);
                console.log("Paddle", this.paddle.x, this.paddle.y);
            }
        });
        
        document.addEventListener("keyup", function(e) {
            if (e.keyCode === 37) {
                if (this.paddle.currentSpeed < 0) {
                this.paddle.stop();
                }
            }
            if (e.keyCode === 39) {
                if (this.paddle.currentSpeed > 0) {
                this.paddle.stop();
                }
            }
        });
    }

    checkCollisions() {
        if (this.ball.x - this.ball.radius <= 0) {
            this.ball.speedX = -this.ball.speedX;
        }
        if (this.ball.y - this.ball.radius <= 0) {
            this.ball.speedY = -this.ball.speedY;
        }
        if (this.ball.x >= 800 - this.ball.radius) {
            this.ball.speedX = -this.ball.speedX;
        }
        if (this.ball.y >= 600 - this.ball.radius) {
            this.ball.speedY = -this.ball.speedY;
        }
        if (
            this.ball.y + this.ball.radius > this.paddle.y &&
            this.ball.x >= this.paddle.x - this.ball.radius &&
            this.ball.x <= this.paddle.x + this.paddle.width
        ) {
            this.ball.speedY = -this.ball.speedY;
            this.ball.y = this.paddle.y - this.ball.radius;
        }
        this.bricks.forEach(function(b, i) {
          let ballBottom = this.ball.y + this.ball.radius;
          let ballTop = this.ball.y - this.ball.radius;
          let brickBottom = this.b.y + this.b.height;
          let brickTop = this.b.y;
      
          if (
            ballBottom >= brickTop &&
            ballTop <= brickBottom &&
            this.ball.x >= b.x &&
            this.ball.x <= b.x + b.width
          ) {
            b.lifes--;
            b.color = b.colors[b.lifes];
            this.ball.speedY = -this.ball.speedY;
          }
        });
      }

    removeBricks() {
        this.bricks = this.bricks.filter(function(b) {
            return b.lifes > 0;
          });
    }

    update() {
        this.paddle.update();
        this.ball.update();
    }

    draw() {
        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.paddle.draw();
        this.ball.draw();
        this.bricks.forEach(function(b, i) {
            b.draw();
        });
    }
}