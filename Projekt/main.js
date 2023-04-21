import { balloon } from "./balloons.mjs";
import * as G from "./graphics.mjs";
import { cannon } from "./cannon.mjs";
import { projectiles } from "./projectiles.mjs";

let spawnProjectiles = undefined;

window.onload = function () {
  console.log("Hello");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const projectileSpeed = 5;
  let lastShot = 0;
  let frequency = 500;
  let projectilesArray = [];
  let projectileAngle = undefined;

  let interactiveObjects = [];
  let balloons = [];
  let levels = 5;

  G.initGraphics(draw, interactiveObjects);

  let projectileX = canvas.width / 2;
  let projectileY = canvas.height - 30;
  let middlePoint = { x: canvas.width / 2, y: canvas.height / 2 };
  let maxRadius = Math.min(canvas.width, canvas.height) / 4;
  let cannonScale = 10;
  let cannonX = canvas.width / 2;
  let cannonY = canvas.height;

  function getProjectileVelocity(angle, checkValue) {
    if (!checkValue) {
      return projectileSpeed * Math.cos(angle);
    } else {
      return projectileSpeed * Math.sin(angle);
    }
  }

  function getProjectileAtan(touchX, touchY) {
    let spawnX = canvas.width / 2;
    let spawnY = canvas.height; // move to the tip of the cannon
    let angle = 0;
    const dx = touchX - spawnX;
    const dy = touchY - spawnY;
    angle = Math.atan2(dy, dx);
    return angle;
  }

  function checkForProjectiles() {
    if (projectilesArray.length) {
      for (let j = 0; j < projectilesArray.length; j++) {
        interactiveObjects.push(
          projectiles(
            projectilesArray[j].x,
            projectilesArray[j].y,
            projectilesArray[j].angle,
            projectilesArray[j].velocityX,
            projectilesArray[j].velocityY
          )
        );
        projectilesArray.splice(j, 1);
      }
      console.log(projectilesArray);
    }
  }

  projectileAngle = getProjectileAtan(G.currentTouchX, G.currentTouchY);

  interactiveObjects.push(cannon(ctx));

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

  console.log(spawnProjectiles);

  function getProjectileOffset(checkValue) {
    if (!checkValue) {
      console.log(cannonX);
      return cannonX + Math.cos(getProjectileAtan(G.currentTouchX, G.currentTouchY)) * 8 *cannonScale;
    } else {
      return cannonY + Math.sin(getProjectileAtan(G.currentTouchX, G.currentTouchY)) * 8 *  cannonScale;
    }
  }
  function createProjectile() {
    if (spawnProjectiles) {
      let now = new Date();
      if (now - lastShot > frequency) {
        projectilesArray.push({
          x: getProjectileOffset(0),
          y: getProjectileOffset(1),
          angle: getProjectileAtan(G.currentTouchX, G.currentTouchY),
          velocityX: getProjectileVelocity(
            getProjectileAtan(G.currentTouchX, G.currentTouchY),
            0
          ),
          velocityY: getProjectileVelocity(
            getProjectileAtan(G.currentTouchX, G.currentTouchY),
            1
          ),
        });
        lastShot = now;
      }
    }
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
    spawnProjectiles = G.checkTouched;
    createProjectile();
    checkForProjectiles();
    // load projetiles as InterObjects and free the projectilesArray

    for (let i = 0; i < interactiveObjects.length; i++) {
      if (!interactiveObjects[i].isDeleted()) {
        interactiveObjects[i].draw(ctx);
        interactiveObjects[i].move();
      } else {
        interactiveObjects.splice(i, 1);
      }
    }
  }
};
