import * as G from "./graphics.mjs";

export function flying_u(x, y) {
  let isTouched = false;
  let identifier = undefined;
  let transformationMatrix = undefined;
  let inverseTransMatrix = undefined;
  let angle = Math.PI;
  let scale = 10;
  let resX = x;
  let resY = y;
  const canvas = document.getElementById("canvas");
  let goingRight = Math.random() < 0.5;
  let goingDown = Math.random < 0.5;
  let speed = Math.random();
  let radius = 10;

  const cPath = G.circlePath();

  function draw(ctx) {
    if (isTouched) {
      transformationMatrix = G.path(
        ctx,
        cPath,
        resX,
        resY,
        angle,
        scale,
        "red"
      );
      speed = Math.random();
    } else {
      transformationMatrix = G.path(
        ctx,
        cPath,
        resX,
        resY,
        Math.PI,
        scale,
        "white"
      );
    }
    inverseTransMatrix = DOMMatrix.fromMatrix(transformationMatrix);
    inverseTransMatrix.invertSelf();
  }

  function isInside(ctx, ti, tx, ty) {
    let localTouchPoint = inverseTransMatrix.transformPoint(
      new DOMPoint(tx, ty)
    );
    isTouched = ctx.isPointInPath(cPath, localTouchPoint.x, localTouchPoint.y);
    if (isTouched) {
      identifier = ti;
    }

    console.log(`isInside: ${isTouched}`);
  }

  function move(x, y) {}

  function reset(ti) {
    if (ti === identifier) {
      isTouched = false;
      identifier = undefined;
    }
  }

  setInterval(() => {
    resX += speed;
    resY += speed;
  }, 10);

  return { draw, isInside, move, reset };
}
