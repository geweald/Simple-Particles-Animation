import circle from './circle';
import vector from './vector';
import constants from './constants';


export function generateCircles(options) {
  const {
    minRadius = 3,
    maxRadius = 8,
    minX = 0,
    maxX = 0,
    minY = 0,
    maxY = 0,
    count = 1,
  } = options;

  const radiusRange = maxRadius - minRadius;
  const xRange = maxX - minX;
  const yRange = maxY - minY;
  const circles = [];

  for (let i = 0; i < count; ++i) {
    const r = Math.floor(Math.random() * radiusRange) + minRadius;
    const x = Math.floor(Math.random() * xRange) + minX;
    const y = Math.floor(Math.random() * yRange) + minY;
    const angle = Math.random() * (Math.PI * 2);
    const speed = constants.START_SPEED;
    const vx = Math.cos(angle) * speed;
    const vy = Math.cos(angle) * speed;

    circles.push(circle(x, y, r, vector(vx, vy)));
  }

  return circles;
}


export function pointsDistance(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}


export function areColliding(c1, c2, distance) {
  const rSum = c1.r + c2.r;
  return (rSum + constants.STROKE_WIDTH) >= distance;
}


export function handleCollision(c1, c2, distance) {
  const dist = c1.center.subtractVector(c2.center);
  const normV1 = c1.velocity.projectVector(dist);
  const normV2 = c2.velocity.projectVector(dist);

  const tangentV1 = c1.velocity.subtractVector(normV1);
  const tangentV2 = c2.velocity.subtractVector(normV2);

  c1.velocity = tangentV1.addVector(normV2);
  c2.velocity = tangentV2.addVector(normV1);

  const scale = (c1.r + c2.r + constants.STROKE_WIDTH - distance) / 1.99;
  c1.center = c1.center.addVector(c1.velocity.scaleVector(scale));
  c2.center = c2.center.addVector(c2.velocity.scaleVector(scale));
}


//-----------------------------------------------
/* DRAWING */
//-----------------------------------------------

export function drawLine(ctx, c1, c2, distance) {
  const maxDistance = constants.LINE_MAX_DISTANCE;

  ctx.beginPath();
  ctx.moveTo(c1.center.x, c1.center.y);
  ctx.lineTo(c2.center.x, c2.center.y);
  ctx.closePath();

  const opacity = 1 - distance / constants.LINE_MAX_DISTANCE;
  const r = constants.STROKE_RED;
  const g = constants.STROKE_GREEN;
  const b = constants.STROKE_BLUE;
  ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  ctx.stroke();
}

export function drawCircle(ctx, { center, r }) {
  ctx.beginPath();
  ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();
}