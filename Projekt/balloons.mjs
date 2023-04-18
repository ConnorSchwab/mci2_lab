export function balloon(x, y, radius, direction) {
  let transform = undefined;
  let inverseTransMatrix = undefined;
  let identifier = undefined;
  let getPath = undefined;
  let isTouched = false;
  let deleted = false;
  let directionTimer = null;

  function draw(ctx) {
      if (!deleted) {
        const path = new Path2D();
        path.ellipse(x, y, radius * 2, radius * 3, 0, 0, 2 * Math.PI);
        // Add the balloon string line segment
        path.moveTo(x, y + radius * 3);
        path.lineTo(x, y + radius * 4.5);
        path.lineTo(x - radius / 4, y + radius * 4.8);
        path.lineTo(x, y + radius * 5.1);
        path.lineTo(x + radius / 4, y + radius * 4.8);
        path.lineTo(x, y + radius * 4.5);
        ctx.fillStyle = "#A03B3F";
        ctx.strokeStyle = "#FF000A";
        ctx.fill(path);
        ctx.stroke(path);
        transform = ctx.getTransform();
        getPath = path;
      }
      
    

    inverseTransMatrix = DOMMatrix.fromMatrix(transform);
    inverseTransMatrix.invertSelf();
  }

  function isInside(ctx, ti, tx, ty) {
    let localTouchPoint = inverseTransMatrix.transformPoint(
      new DOMPoint(tx, ty)
    );
    isTouched = ctx.isPointInPath(
      getPath,
      localTouchPoint.x,
      localTouchPoint.y
    );
    if (isTouched) {
      identifier = ti;
    }

    console.log(`isInside: ${isTouched}`);
  }

  function move() {
    if (!directionTimer) {
      directionTimer = setTimeout(() => {
        direction = Math.floor(Math.random() * 4);
        directionTimer = null;
      }, 1000);
    }
    switch (direction) {
      case 1: {
        x += 0.4;
        y -= 0.2;
        break;
      }

      case 2: {
        y -= 0.2;
        x += 0.2;
        break;
      }

      case 3: {
        x -= 0.2;
        y -= 0.2;
        break;
      }

      default:
        y -= 0.2;
        x -= 0.5;
    }
  }

  function reset(ti) {
    if (ti === identifier) {
      isTouched = false;
      identifier = undefined;
      deleted = true;
    }
  }
  function isDeleted() {
    return deleted;
  }

  function update(){}

  return { draw, isInside, reset, isDeleted, move, update};
}
