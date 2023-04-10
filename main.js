import { flying_u } from "./flying_u.mjs";
import * as G from "./graphics.mjs";

window.onload = function () {
  let interactiveObjects = [];

  interactiveObjects.push(flying_u(250, 250));
  interactiveObjects.push(flying_u(350,350));

  G.initGraphics(draw, interactiveObjects);

  function draw(ctx, deltaTime) {
    for (let i of interactiveObjects) {
      i.draw(ctx);
    }
  }
};
