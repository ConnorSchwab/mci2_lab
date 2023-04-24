export let isTouched = undefined;
import {startButton, gotClicked} from "./startButton.mjs"
export function initInteraction(ctx, interactiveObjects) {
  const canvas = ctx.canvas;
  let touches = {};

  // Event-Handling
  canvas.addEventListener("touchstart", (evt) => {
    evt.preventDefault();

    // changedTouches: array; for X of Array: X: content;
    for (let t of evt.changedTouches) {
      //console.log(`start ${t.identifier} at ${t.pageX}, ${t.pageY}`);
      touches[t.identifier] = { x: t.pageX, y: t.pageY };
      if(gotClicked){  // && t.identifier === 1;
        isTouched = true;
      }
      for (let io of interactiveObjects) {
        io.update(t.identifier, t.pageX, t.pageY);
      }
    }
  });

  canvas.addEventListener("touchmove", (evt) => {
    evt.preventDefault();
    for (let t of evt.changedTouches) {
      //console.log(`move ${t.identifier} at ${t.pageX}, ${t.pageY}`);
      touches[t.identifier] = { x: t.pageX, y: t.pageY };

      for (let io of interactiveObjects) {
        io.update(t.identifier, t.pageX, t.pageY);
      }
    }
  });

  canvas.addEventListener("touchend", (evt) => {
    evt.preventDefault();

    for (let t of evt.changedTouches) {
      isTouched = false; //  if t.identifier === 1;
      startButton().isInside(t.identifier, t.pageX, t.pageY);
      //console.log(`end ${t.identifier} at ${t.pageX}, ${t.pageY}`);
      delete touches[t.identifier];
      for (let io of interactiveObjects) {
        io.reset(t.identifier);
      }
    }
  });

  // cb (übergebene Funktion): Aufruf für jeden Touch-Punkt
  return (cb) => {
    // touches ist Object; for X of Object: X: ist Attribut
    for (let t in touches) {
      // Übergabe an Callback: t: identifier, x/y-Koordinaten
      cb(t, touches[t].x, touches[t].y);
    }
  };
}

/* let cannonX = canvas.width / 2;
    let cannonY = canvas.height - 30; // move to the tip of the cannon
    let angle = 0;
    const dx = touchX - cannonX;
    const dy = touchY - cannonY;
    angle = Math.atan2(dy, dx);
    projectileAngle = angle + Math.PI / 2;
    isRotated = true; */
