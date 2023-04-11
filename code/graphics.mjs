import { initInteraction } from "./interactions.mjs";

export function upath() {
  let upath = new Path2D();
  upath.moveTo(-2, -4.5);
  upath.lineTo(-1.5, -4);
  upath.lineTo(-1.5, -2);
  upath.lineTo(-2, -1);
  upath.lineTo(-2, -2);
  upath.lineTo(-3, -2);
  upath.lineTo(-3, -1.5);
  upath.lineTo(-2.5, -1.5);
  upath.lineTo(-2.5, 0);
  upath.lineTo(-1.5, 2);
  upath.lineTo(-1, 2);
  upath.lineTo(-1, 3);
  upath.lineTo(-0.5, 4);
  upath.lineTo(0.5, 4);
  upath.lineTo(1, 3);
  upath.lineTo(1, 2);
  upath.lineTo(1.5, 2);
  upath.lineTo(2.5, 0);
  upath.lineTo(2.5, -1.5);
  upath.lineTo(3, -1.5);
  upath.lineTo(3, -2);
  upath.lineTo(2, -2);
  upath.lineTo(2, -1);
  upath.lineTo(1.5, -2);
  upath.lineTo(1.5, -4);
  upath.lineTo(2, -4.5);
  upath.lineTo(0.5, -4.5);
  upath.lineTo(0.5, -2.5);
  upath.lineTo(-0.5, -2.5);
  upath.lineTo(-0.5, -4.5);
  upath.lineTo(-2, -4.5);
  upath.closePath();
  return upath;
}

export function circlePath() {
  let circle = new Path2D();
  circle.arc(10, 10, 10, 0, Math.PI * 2);
  return circle;
}

export function path(
  ctx,
  pth,
  x,
  y,
  angle,
  sc = 10,
  fillStyle = "#f00",
  strokeStyle = "#f00",
  lineWidth = 0.1
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(sc, sc);
  ctx.rotate(angle);

  let m = ctx.getTransform();

  ctx.fillStyle = fillStyle;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.fill(pth);
  ctx.stroke(pth);
  ctx.restore();

  return m;
}

export function line(ctx, x1, y1, x2, y2, strokeStyle = "#fff", lineWidth = 1) {
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;

  //draw a line:
  ctx.beginPath();

  //move to the startpoint coordinates
  ctx.moveTo(x1, y1);

  //draw line virtually
  ctx.lineTo(x2, y2);

  //draw line actually
  ctx.stroke();
}

export function circle(ctx, x, y, radius, fillStyle = "#fff") {
  let startAngle = 0;
  let endAngle = Math.PI * 2;
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.fillStyle = fillStyle;
  ctx.fill();
}

export function initGraphics(drawcallback, interactiveObjects) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let forEachTouchFunction = initInteraction(ctx, interactiveObjects);
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  const startTime = new Date();

  function mainloop() {
    const deltaTime = new Date() - startTime;
    ctx.resetTransform();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawcallback(ctx, deltaTime);
    ctx.font = "20px Arial";

    forEachTouchFunction((identifier, x, y) => {
      circle(ctx, x, y, 30, "red");
      ctx.fillStyle = "white";
      ctx.fillText(`id: ${identifier}`, x + 40, y);
    });
    window.requestAnimationFrame(mainloop);
  }
  mainloop();
}
