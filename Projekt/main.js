import { balloon /*score*/ } from "./balloons.mjs";
import * as G from "./graphics.mjs";
import { cannon } from "./cannon.mjs";
import { projectiles } from "./projectiles.mjs";
import { startButton, gotClicked } from "./startButton.mjs";
import createUIOverlay from "./uiOverlay.js";

//github pages comment
let spawnProjectiles = undefined;
let firstTime = true;

window.onload = function () {
  console.log("Hello");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const projectileSpeed = 4;
  let lastShot = 0;
  let frequency = 500;
  let projectilesArray = [];
  let projectileAngle = undefined;
  let identifier = true;

  let score = 0;

  let interactiveObjects = [];
  let balloons = [];
  let levelsArray = [3, 5, 7, 9, 12, 15, 18, 21, 24, 27, 30]; // 10 Levels
  let currentLevel = levelsArray[0];
  let levelIndex = 0;
  let previousScoring = 0;
  let levelCount = 1;
  let livesLost = 0;
  const replay = generateButton("Replay", "btn_replay");

  G.initGraphics(draw, interactiveObjects);
  let overlay = createUIOverlay(ctx, canvas);

  console.log(gotClicked);

  replay.addEventListener("click", () => {
    Replay();
  });

  function Replay() {
    document.getElementById('popup').style.display = "none";
    interactiveObjects = [];
    clearBalloons();
    interactiveObjects.push(cannon(ctx));
    overlay.resetLevel();
    levelCount = 1;
    levelIndex = 0;
    score = 0;
    previousScoring = 0;
    livesLost = 0;
    currentLevel = levelsArray[levelIndex];
    overlay.resetScore();
    overlay.resetLife();
    createBalloons(currentLevel);
    pushBalloons();
  }

  function generateButton(text, id) {

    const button = document.createElement("button");

    button.type = "button";
    button.innerText = text;

    if (id) {
      button.id = id;
    }
    return button;
  }

  let projectileX = canvas.width / 2;
  let projectileY = canvas.height - 30;
  let middlePoint = { x: canvas.width / 2, y: canvas.height / 2 };
  let maxRadius = Math.min(canvas.width, canvas.height) / 2;
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
    let spawnY = canvas.height;
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
    }
  }

  projectileAngle = getProjectileAtan(G.currentTouchX, G.currentTouchY);

  interactiveObjects.push(cannon(ctx));

  function createBalloons(lvl) {
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

  function getProjectileOffset(checkValue) {
    if (!checkValue) {
      return (
        cannonX +
        Math.cos(getProjectileAtan(G.currentTouchX, G.currentTouchY)) *
        7 *
        cannonScale
      );
    } else {
      return (
        cannonY +
        Math.sin(getProjectileAtan(G.currentTouchX, G.currentTouchY)) *
        7 *
        cannonScale
      );
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

  function drawStartButton(ctx) {
    let initStartButton = startButton();
    initStartButton.draw(ctx);
  }

  setInterval(() => {
    for (let i = 0; i < balloons.length; i++) {
      balloons[i].direction = getRandomDirection();
    }
  }, 1000);

  function pushBalloons() {
    for (let o of balloons) {
      interactiveObjects.push(balloon(o.x, o.y, o.radius, o.direction));
    }
  }

  function clearBalloons() {
    balloons = [];
  }
  createBalloons(currentLevel);

  pushBalloons();

  function getRandomDirection() {
    return Math.floor(Math.random() * 4);
  }

  function draw(ctx, deltaTime) {
    if (!gotClicked) {
      drawStartButton(ctx);
    } else {
      overlay.draw();
      overlay.setScore(score);
      spawnProjectiles = G.checkTouched;
      if (score + livesLost - previousScoring === currentLevel && overlay.getLife() != 0) {
        levelCount++;
        overlay.setLevel(levelCount);
        clearBalloons();
        if (levelIndex < 9) {
          levelIndex++;
        }
        previousScoring += currentLevel;
        currentLevel = levelsArray[levelIndex];
        createBalloons(currentLevel);
        pushBalloons();
      }
      //console.log(score);
      createProjectile();
      checkForProjectiles();
      // load projetiles as InterObjects and free the projectilesArray

      for (let i = 0; i < interactiveObjects.length; i++) {
        if (interactiveObjects[i].outOfBounds()) {
          interactiveObjects.splice(i, 1);
          overlay.setLife();
          livesLost += 1;
          if (overlay.getLife() === 0) {
            interactiveObjects=[];
            clearBalloons();
            document.getElementById('popup').style.display = "flex";
            let popup_innerDiv = document.getElementById('popup_innerDiv');
            popup_innerDiv.appendChild(replay);
            break;
          }
        }

        //!interactiveObjects[i].isDeleted()
        if (interactiveObjects[i]) {
          interactiveObjects[i].draw(ctx);
          interactiveObjects[i].move();
          let projectilePosition = interactiveObjects[i].getCoordinates();
          if (projectilePosition.b) {
            for (let j = 0; j < interactiveObjects.length; j++) {
              let deleted = interactiveObjects[j].isInside(projectilePosition.x, projectilePosition.y);
              if (deleted) {
                interactiveObjects.splice(j, 1);
                score++;
                overlay.setScore(score);
              }
            }
          }

        } else {
          interactiveObjects.splice(i, 1);
        }

      }


    }

  }
};
