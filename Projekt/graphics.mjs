import { cannon } from "./cannon.mjs";
import { initInteraction } from "./touches.mjs";



function circle(ctx, x, y, radius, fillStyle){
  ctx.beginPath();
  ctx.arc(x,y,radius,0,Math.Pi*2);
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
      ctx.fillStyle = "black";
      ctx.fillText(`id: ${identifier}`, x + 40, y);
    });

    
    
    window.requestAnimationFrame(mainloop);
  }
  mainloop();
}
