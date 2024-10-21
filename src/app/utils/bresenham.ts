import { Point2D } from "./geometry";

function getLineHigh(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  array: Array<Point2D>
) {
  var dx = x1 - x0;
  var dy = y1 - y0;
  var xi = 1;
  if (dx < 0) {
    xi = -1;
    dx = -dx;
  }
  var D = 2 * dx - dy;
  var x = x0;

  for (let y = y0; y < y1; y++) {
    array.push({ x: x, y: y });
    if (D > 0) {
      x = x + xi;
      D = D + 2 * (dx - dy);
    } else D = D + 2 * dx;
  }
}

function getLineLow(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  array: Array<Point2D>
) {
  var dx = x1 - x0;
  var dy = y1 - y0;
  var yi = 1;
  if (dy < 0) {
    yi = -1;
    dy = -dy;
  }
  var D = 2 * dy - dx;
  var y = y0;

  for (let x = x0; x < x1; x++) {
    array.push({ x: x, y: y });
    if (D > 0) {
      y = y + yi;
      D = D + 2 * (dy - dx);
    } else D = D + 2 * dy;
  }
}

export function getLine(point1: Point2D, point2: Point2D): Array<Point2D> {
  let array = new Array<Point2D>();
  var x0 = Math.round(point1.x);
  var y0 = Math.round(point1.y);
  var x1 = Math.round(point2.x);
  var y1 = Math.round(point2.y);

  if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
    if (x0 > x1) getLineLow(x1, y1, x0, y0, array);
    else getLineLow(x0, y0, x1, y1, array);
  } else {
    if (y0 > y1) getLineHigh(x1, y1, x0, y0, array);
    else getLineHigh(x0, y0, x1, y1, array);
  }
  return array;
}
