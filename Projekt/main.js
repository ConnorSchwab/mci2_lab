import { balloon } from "./balloons.mjs";
import * as G from "./graphics.mjs";

window.onload = function () {
  console.log("Hello");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  

  let interactiveObjects = [];
  let balloons = [];
  let levels = 3;
  let o = Math.floor((Math.random()-0.001) * 4);

  G.initGraphics(draw, interactiveObjects);

  let middlePoint = { x: canvas.width / 2, y: canvas.height / 2 };
  let maxRadius = Math.min(canvas.width, canvas.height) / 2;
  
  interactiveObjects.push(balloon());
  
  function spawn(lvl) {
    for (let i = 0; i < lvl; i++) {
      const xSpawn = middlePoint.x + (Math.random() - 0.5) * maxRadius;
      const ySpawn = middlePoint.y + (Math.random() - 0.5) * maxRadius;
      let radius = 30;

      balloons.push({ x: xSpawn, y: ySpawn, radius: radius });
    }
    return balloons;
  }

  spawn(levels);
  for (let o of balloons) {
    interactiveObjects.push(balloon(o.x, o.y, o.radius));
  }

  setInterval(() =>{
    o = Math.floor((Math.random()-0.001) * 4);
  },1000)

  function draw(ctx, deltaTime) {
    for (let i of interactiveObjects) {
      if (!i.isDeleted()) {
        i.draw(ctx);
        i.move(o);
      }
    }
  }
};
