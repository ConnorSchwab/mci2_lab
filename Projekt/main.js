import { balloon } from "./balloons.mjs";
import * as G from "./graphics.mjs";
import {cannon} from "./cannon.mjs";

window.onload = function () {
  console.log("Hello");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let interactiveObjects = [];
  let balloons = [];
  let levels = 5;

  G.initGraphics(draw, interactiveObjects);

  let middlePoint = { x: canvas.width / 2, y: canvas.height / 2 };
  let maxRadius = Math.min(canvas.width, canvas.height) / 4;

  interactiveObjects.push(cannon());

  function spawn(lvl) {
    for (let i = 0; i < lvl; i++) {
      const xSpawn = middlePoint.x + (Math.random() - 0.5) * maxRadius;
      const ySpawn = middlePoint.y + (Math.random() - 0.5) * maxRadius;
      let radius = 10;

      balloons.push({
        x: xSpawn,
        y: ySpawn,
        radius: radius,
        direction: getRandomDirection(),
      });
    }
    return balloons;
  }

  spawn(levels);

  setInterval(() => {
    for (let i = 0; i < balloons.length; i++) {
      balloons[i].direction = getRandomDirection();
    }
  }, 1000);
  for (let o of balloons) {
    interactiveObjects.push(balloon(o.x, o.y, o.radius, o.direction));
  }

  function getRandomDirection() {
    return Math.floor(Math.random() * 4);
  }

  function draw(ctx, deltaTime) {
  

    for (let i of interactiveObjects) {
      if (!i.isDeleted()) {
        i.draw(ctx);
        i.move();
      }
    }
  }
};
