import { flying_u } from "./flying_u.mjs";
import * as G from "./graphics.mjs";

window.onload = function () {
  let interactiveObjects = [];
  const canvas = document.getElementById("canvas");
  let middlePoint = {x: canvas.width / 2, y: canvas.height / 2};
  maxXSpawn = canvas.width / 100 * 50;
  maxYSpawn = canvas.height / 100 * 50;
  interactiveObjects.push(flying_u(250, 250));
  interactiveObjects.push(flying_u(350,350));

  G.initGraphics(draw, interactiveObjects);

  function draw(ctx, deltaTime) {
    for (let i of interactiveObjects) {
      i.draw(ctx);
    }
  }
};
