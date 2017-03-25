class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  addVector(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  subtractVector(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  length() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  projectVector(v) {
    const projection = this.projection(v);
    const scale = projection / v.length();
    return v.scaleVector(scale);
  }

  projection(v) {
    const len = this.length();
    const vlen = v.length();
    const projection = len != 0 && vlen != 0 
      ? (this.x * v.x + this.y * v.y) / vlen
      : 0;
    return projection;
  }

  scaleVector(scale) {
    return new Vector(this.x * scale, this.y * scale);
  }
}

export default function vector(x = 0, y = 0) {
  return new Vector(x, y);
}