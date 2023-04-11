export function balloon(x, y, radius) {
  let transform = undefined;
  let inverseTransMatrix = undefined;
  let identifier = undefined;
  let getPath = undefined;
  let isTouched = false;
  let deleted = false;

  function draw(ctx) {
    if (!deleted){
    const path = new Path2D();
    path.ellipse(x, y, radius * 2, radius * 3, 0, 0, 2 * Math.PI);
    ctx.fillStyle = "#A03B3F50";
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

  function reset(ti) {
    if (ti === identifier) {
      isTouched = false;
      identifier = undefined;
      deleted = true;
    }
  }
  function isDeleted(){
    return deleted;
  }

  return { draw, isInside ,reset, isDeleted };
}
