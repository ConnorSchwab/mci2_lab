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
  let figureWidth = 3 * scale;
  let figureHeightTop = 4 * scale;
  let figureHeightBottom = 4.5 * scale;


  const upath = G.upath();

  function draw(ctx) {
    if (isTouched) {
      transformationMatrix = G.path(ctx, upath, resX, resY, angle, scale, "red");
      speed = Math.random();
    } else {
      transformationMatrix = G.path(ctx, upath, resX, resY, Math.PI, scale, "white");
    }
    inverseTransMatrix = DOMMatrix.fromMatrix(transformationMatrix);
    inverseTransMatrix.invertSelf();
  }

  function isInside(ctx, ti, tx, ty) {
    let localTouchPoint = inverseTransMatrix.transformPoint(
      new DOMPoint(tx, ty)
    );
    isTouched = ctx.isPointInPath(upath, localTouchPoint.x, localTouchPoint.y);
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
    let right = false;
    let left = false;
    let top = false;
    let bottom = false;
    
    if (isTouched) {
      resX = x;
      resY = y;
    } else {
      if (resX >= canvas.width - figureWidth) {
        goingRight = false;
      } else if (resX <= 0 + figureWidth) {
        goingRight = true;
      }
      if (resY >= canvas.height - figureHeightBottom) {
        goingDown = false;
      } else if (resY <= 0 + figureHeightTop) {
        goingDown = true;
      }
  
      if (goingRight) {
        resX += speed;
      } else {
        resX -= speed;
      }
  
      if (goingDown) {
        resY += speed;
      } else {
        resY -= speed;
      }
    }
  }, 10);
  

  return { draw, isInside, move, reset };
}
