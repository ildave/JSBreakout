export default class Ball {
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
