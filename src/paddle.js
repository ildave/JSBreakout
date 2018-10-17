export default class Paddle {
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
