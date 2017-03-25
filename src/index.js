import { 
  areColliding, 
  drawLine,
  drawCircle,
  generateCircles,
  handleCollision,
  pointsDistance 
} from './utils';
import constants from './constants';

const $canvas = document.querySelector('#animation');
const ctx = $canvas.getContext('2d');

$canvas.width = constants.WIDTH;
$canvas.height = constants.HEIGHT;

ctx.fillStyle = constants.FILL_COLOR;
ctx.strokeStyle = constants.STROKE_COLOR;
ctx.lineWidth = constants.STROKE_WIDTH;

const dots = generateCircles({ 
  count: constants.NUMBER_OF_CIRCLES, 
  maxX: $canvas.width, 
  maxY: $canvas.height
});


(function render() {
  ctx.clearRect(0, 0, $canvas.width, $canvas.height);

  dots.forEach(d => d.move($canvas.width, $canvas.height));
  const len = dots.length;

  for (let i = 0; i < len; ++i) {
    for (let j = i + 1; j < len; ++j) {
      const c1 = dots[i];
      const c2 = dots[j];
      const distance = pointsDistance(c1.center, c2.center);

      if (distance < constants.LINE_MAX_DISTANCE) {
        drawLine(ctx, c1, c2, distance);
      }

      if (areColliding(c1, c2, distance)) {
        handleCollision(c1, c2, distance);
      }
    }
  }
  ctx.strokeStyle = constants.STROKE_COLOR;
  dots.forEach(d => drawCircle(ctx, d));

  window.requestAnimationFrame(render);
}());