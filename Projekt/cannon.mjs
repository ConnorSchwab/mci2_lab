import { projectiles } from "./projectiles.mjs";

const canvas = document.getElementById("canvas");
let scale = 10;
let transform = undefined;
let idle = Math.PI;
let cannonAngle = 0;

export function cannon(ctx) {
  function draw(ctx) {
    let cannonX = canvas.width / 2;
    let cannonY = canvas.height;
    const cannonPath = new Path2D();
    cannonPath.moveTo(-4, -3);
    cannonPath.lineTo(-4, 0);
    cannonPath.lineTo(-4, 1);
    cannonPath.lineTo(-1.5, 1.5);
    cannonPath.lineTo(-1.5, 3);
    cannonPath.lineTo(-0.5, 4);
    cannonPath.lineTo(-0.5, 5);
    cannonPath.lineTo(0.5, 5);
    cannonPath.lineTo(0.5, 4);
    cannonPath.lineTo(1.5, 3);
    cannonPath.lineTo(1.5, 1.5);
    cannonPath.lineTo(4, 1);
    cannonPath.lineTo(4, 0);
    cannonPath.lineTo(4, -3);
    cannonPath.lineTo(-4, -3);
    cannonPath.closePath();
    ctx.save();
    ctx.translate(cannonX, cannonY);
    ctx.rotate(idle + cannonAngle);
    ctx.scale(scale, scale);
    ctx.lineWidth = 1 / scale;
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#ff0";
    ctx.fill(cannonPath);
    ctx.stroke(cannonPath);
    transform = ctx.getTransform();
    ctx.restore();
  }

  function getCoordinates(){
    let dummy = {b: false};
    return dummy;
  }
  function shoot() {}
  function move() {}
  function isInside() {}
  function isDeleted() {return false;}
  function reset() {}

  function getCannonAngle(){
    return cannonAngle;
  }

  function update(id, touchX, touchY) {
    let cannonX = canvas.width / 2;
    let cannonY = canvas.height -1 *scale;
    let angle = 0;
    const dx = touchX - cannonX;
    const dy = touchY - cannonY;
    angle = Math.atan2(dy, dx);
    cannonAngle = angle + Math.PI/2;
  }

  const projectileObj = projectiles(ctx, transform);

  return { draw, update, isDeleted, move, isInside, reset, getCannonAngle, getCoordinates };
}
