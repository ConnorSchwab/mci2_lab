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
    cannonPath.moveTo(-3, -6);
    cannonPath.lineTo(-3, 1);
    cannonPath.lineTo(-1.5, 1.5);
    cannonPath.lineTo(-1.5, 3);
    cannonPath.lineTo(-0.5, 4);
    cannonPath.lineTo(-0.5, 5);
    cannonPath.lineTo(0.5, 5);
    cannonPath.lineTo(0.5, 4);
    cannonPath.lineTo(1.5, 3);
    cannonPath.lineTo(1.5, 1.5);
    cannonPath.lineTo(3, 1);
    cannonPath.lineTo(3, -6);
    cannonPath.lineTo(-3, -6);
    cannonPath.closePath();
    ctx.save();
    ctx.translate(cannonX, cannonY);
    ctx.rotate(idle + cannonAngle);
    ctx.scale(scale, scale);
    ctx.lineWidth = 1 / scale;
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#F2D399";
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
  function outOfBounds(){return false;}

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

  return { draw, update, isDeleted, move, isInside, reset, getCannonAngle, getCoordinates, outOfBounds };
}
