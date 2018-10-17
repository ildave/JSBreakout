export default class Brick {
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
