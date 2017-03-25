import vector from './vector';

class Circle {
  constructor(x, y, r, v) {
    this.center = vector(x, y);
    this.velocity = v;
    this.r = r;
  }

  move(xBorder, yBorder) {
    if (this.center.x <= this.r) {
      this.velocity.x = Math.abs(this.velocity.x);
    } else if (this.center.x >= xBorder - this.r) {
      this.velocity.x = -Math.abs(this.velocity.x);
    }

    if (this.center.y <= this.r) {
      this.velocity.y = Math.abs(this.velocity.y);
    } else if (this.center.y >= yBorder - this.r) {
      this.velocity.y = -Math.abs(this.velocity.y);
    }

    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;
  }
}

export default function circle(x, y, r, angle) {
  return new Circle(x, y, r, angle);
}