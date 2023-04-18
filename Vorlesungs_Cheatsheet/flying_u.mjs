import * as G from "./graphics.mjs";

export function flying_u(ctx1, x, y) {
  const canvas = document.getElementById("canvas");
  let isTouched = false;
  let identifier = undefined;
  let transformationMatrix = undefined;
  let inverseTransMatrix = undefined;
  let angle = Math.PI;
  let scale = 10;
  let ballons = [];
  let middlePoint = { x: canvas.width / 2, y: canvas.height / 2 };
  let maxRadius = Math.min(canvas.width, canvas.height) / 2;

  let goingRight = Math.random() < 0.5;
  let goingDown = Math.random < 0.5;
  let speed = Math.random();
  let radius = 10;

  const cPath = G.circle(ctx1);

  function createBalloons(level) {
    for (let i = 0; i < level; i++) {
      const xSpawn = middlePoint.x + (Math.random() - 0.5) * maxRadius;
      const ySpawn = middlePoint.y + (Math.random() - 0.5) * maxRadius;
      let radius = 10;
      ballons.push({x: xSpawn, y: ySpawn, radius: radius});
    }
    return ballons;
  }

  function draw(ctx, x, y, radius) {
    if (isTouched) {
      transformationMatrix = G.circle(ctx, x, y, radius, "red");
      speed = Math.random();
    } else {
      transformationMatrix = G.circle(ctx, x, y, radius, "white");
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
    //resX += speed;
    //resY += speed;
  }, 10);

  return { draw, isInside, move, reset , createBalloons };
}
