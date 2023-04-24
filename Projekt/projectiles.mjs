const canvas = document.getElementById("canvas");

export function projectiles(x, y, angle, velocityX, velocityY) {
  let projectileAngle = Math.PI * 2;
  let scale = 10;
  let currentX = undefined;
  let currentY = undefined;
  currentX = x;
  currentY = y;
  projectileAngle = angle;
  let identifier = undefined;

  function draw(ctx) {
    const projectilePath = new Path2D();
    projectilePath.moveTo(-0.2, 0);
    projectilePath.lineTo(-0.2, 2);
    projectilePath.lineTo(0.2, 2);
    projectilePath.lineTo(-0.2, 2);
    projectilePath.lineTo(0.2, 2);
    projectilePath.lineTo(0.2, 0);
    projectilePath.lineTo(0, -1);
    projectilePath.lineTo(-0.2, 0);
    projectilePath.closePath();
    ctx.save();
    ctx.translate(currentX, currentY);
    ctx.rotate(projectileAngle + Math.PI / 2);
    ctx.scale(scale, scale);
    ctx.lineWidth = 1 / scale;
    ctx.fillStyle = "#F2D399";
    ctx.strokeStyle = "#F21313";
    ctx.fill(projectilePath);
    ctx.stroke(projectilePath);
    ctx.restore();
  }

  function move() {
    currentX += velocityX;
    currentY += velocityY;
  }
  function getCoordinates() {
    let tipX = currentX + Math.cos(projectileAngle);
    let tipY = currentY -1 + Math.sin(projectileAngle);

    let coordinates = { x: tipX, y: tipY, b: true };
    return coordinates;
  }

  function update() { }
  function outOfBounds() { return false; }
  function isInside() { }
  function getPosition() {
    return { x, y };
  }
  function isDeleted() {
    if (
      currentX >= canvas.width + scale ||
      currentX <= -scale ||
      currentY <= -scale
    ) {
      return true;
    }
    return false;
  }
  function reset(ti) {
    if (ti === identifier) {
      //isTouched = false;
      identifier = undefined;
      isDeleted = true;
    }
  }

  return { draw, update, isDeleted, move, isInside, reset, getCoordinates, outOfBounds, getPosition };
}
