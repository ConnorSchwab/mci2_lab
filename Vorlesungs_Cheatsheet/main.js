import { flying_u } from "./flying_u.mjs";
import * as G from "./graphics.mjs";

window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  let interactiveObjects = [];

  interactiveObjects.push(flying_u(ctx, 0, 0));
  //interactiveObjects.push(flying_u(350,350));

  G.initGraphics(draw, interactiveObjects);

  function draw(ctx, deltaTime) {
    for (let i of interactiveObjects) {
      let amount = i.createBalloons(5);
      for (let o of amount) {
        i.draw(ctx, o.x, o.y, o.radius);
      }
    }
  }
};
