export let score = 0;
export function balloon(x, y, radius, direction) {
  let transform = undefined;
  let inverseTransMatrix = undefined;
  let identifier = undefined;
  let getPath = undefined;
  let isTouched = false;
  let deleted = false;
  let directionTimer = null;
  let balloonWidth = radius * 2;
  let balloonHeight = radius * 3;

  function draw(ctx) {
    if (!deleted) {
      const path = new Path2D();
      path.ellipse(x, y, balloonWidth, balloonHeight, 0, 0, 2 * Math.PI);
      // Add the balloon string line segment
      path.moveTo(x, y + radius * 3);
      path.lineTo(x, y + radius * 4.5);
      path.lineTo(x - radius / 4, y + radius * 4.8);
      path.lineTo(x, y + radius * 5.1);
      path.lineTo(x + radius / 4, y + radius * 4.8);
      path.lineTo(x, y + radius * 4.5);
      ctx.fillStyle = "#A03B3F";
      ctx.strokeStyle = "#FF000A";
      ctx.fill(path);
      ctx.stroke(path);
      transform = ctx.getTransform();
      getPath = path;
    }

    inverseTransMatrix = DOMMatrix.fromMatrix(transform);
    inverseTransMatrix.invertSelf();
  }

  function isInside(px, py) {
    //distances between center of balloon and projectile
    let dx = px - x;
    let dy = py - y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    //half of the length of the diagonal of the bounding rectangle
    let boundingRadius =
      Math.sqrt(balloonWidth * balloonWidth + balloonHeight * balloonHeight) /
      2;

    if (distance <= boundingRadius) {
      deleted = true;
      updateScore();
    }
  }

  function move() {
    if (!directionTimer) {
      directionTimer = setTimeout(() => {
        direction = Math.floor(Math.random() * 4);
        directionTimer = null;
      }, 1000);
    }
    switch (direction) {
      case 1: {
        x += 0.4;
        y -= 0.2;
        break;
      }

      case 2: {
        y -= 0.2;
        x += 0.2;
        break;
      }

      case 3: {
        x -= 0.2;
        y -= 0.2;
        break;
      }

      default:
        y -= 0.2;
        x -= 0.5;
    }
  }

  function reset(ti) {
    if (ti === identifier) {
      isTouched = false;
      identifier = undefined;
      deleted = true;
    }
  }
  function isDeleted() {
    return deleted;
  }

  function updateScore() {
    score += 1;
  }

  function update() {}
  function getCoordinates() {
    let dummy = { b: false };
    return dummy;
  }

  return { draw, isInside, reset, isDeleted, move, update, getCoordinates };
}
