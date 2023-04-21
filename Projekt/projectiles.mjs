const canvas = document.getElementById("canvas");

export function projectiles(x, y, angle, velocityX, velocityY) {
  let projectileAngle = Math.PI * 2;
  let scale = 10;
  let currentX = undefined;
  let currentY = undefined;
  currentX = x;
  currentY = y;
  projectileAngle = angle;

  function draw(ctx) {
    const projectilePath = new Path2D();
    projectilePath.moveTo(-0.5, 0);
    projectilePath.lineTo(-0.5, 3);
    projectilePath.lineTo(0.5, 3);
    projectilePath.lineTo(0.5, 0);
    projectilePath.lineTo(-0.5, 0);
    projectilePath.closePath();
    ctx.save();
    ctx.translate(currentX, currentY);
    ctx.rotate(projectileAngle + Math.PI / 2);
    ctx.scale(scale, scale);
    ctx.lineWidth = 1 / scale;
    ctx.fillStyle = "#ff0";
    ctx.strokeStyle = "#f0f";
    ctx.fill(projectilePath);
    ctx.stroke(projectilePath);
    ctx.restore();
  }

  function move() {
    currentX += velocityX;
    currentY += velocityY;
  }

  function update() {}
  function isInside() {}
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
  function reset() {}

  return { draw, update, isDeleted, move, isInside, reset };
}
