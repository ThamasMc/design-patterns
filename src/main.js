const canvas = document.querySelector("#app");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
let current = 0;
let delta = 0;

const ctx = canvas.getContext("2d");

let square = {
  position: {
    x: 0,
    y: 0,
  },
  scale: {
    x: 50,
    y: 50
  },
  velocity: {
    x: 300,
    y: 500
  },
  color: "rgb(255 0 0)"
};

let square1 = {
  position: {
    x: 0,
    y: 0,
  },
  scale: {
    x: 25,
    y: 25
  },
  velocity: {
    x: 150,
    y: 250
  },
  color: "rgb(255 255 0)"
};

const getRandomInt = (max) => Math.floor(Math.random() * max);
const getRandomColor = () => `rgb(${getRandomInt(256)} ${getRandomInt(256)} ${getRandomInt(256)})`;

let randRect = {
  position: {
    x: getRandomInt(500),
    y: getRandomInt(500),
  },
  scale: {
    x: getRandomInt(200),
    y: getRandomInt(200)
  },
  velocity: {
    x: getRandomInt(600),
    y: getRandomInt(600)
  },
  color: "rgb(0 0 255)"
};

let entities = [square, square1, randRect];

const generateRects = (num) => {
  for(let i = 0; i < num; i++) {
    let rand = {
      position: {
        x: getRandomInt(500),
        y: getRandomInt(500),
      },
      scale: {
        x: getRandomInt(200),
        y: getRandomInt(200)
      },
      velocity: {
        x: getRandomInt(600),
        y: getRandomInt(600)
      },
      color: getRandomColor()
    };

    // console.log(rand.position, rand.scale, rand.velocity, rand.color);
    entities.push(rand)

  }
};

generateRects(5000);
// console.log(randRect.position, randRect.scale, randRect.velocity, randRect.color);

const draw = () => {
  width = (canvas.width = window.innerWidth);
  height = (canvas.height = window.innerHeight);

  ctx.fillStyle = "rgb(0 0 0)";
  ctx.fillRect(0, 0, width, height);

  for (const entity of entities) {
    // TODO: Add component check

    ctx.fillStyle = entity.color;
    ctx.fillRect(entity.position.x, entity.position.y, entity.scale.x, entity.scale.y);
  }

}

const move = (deltaTime) => {
  for (const entity of entities) {
    // TODO: Update to transform component
    if (entity.velocity === undefined) {
      continue;
    }

    let velocity = entity.velocity
    const deltaMod = deltaTime / 1000;
    /*
     * 1000px moving 10px p second, should take 100 seconds
     */

    // Handle bounces
    if(((velocity.x * deltaMod) + entity.position.x + entity.scale.x) > canvas.width) {
      velocity.x = velocity.x * -1;
    }

    if(((velocity.x * deltaMod) + entity.position.x) < 0) {
      velocity.x = velocity.x * -1;
    }

    if(((velocity.y * deltaMod) + entity.position.y + entity.scale.y) > canvas.height) {
      velocity.y = velocity.y * -1;
    }

    if(((velocity.y * deltaMod) + entity.position.y) < 0) {
      velocity.y = velocity.y * -1;
    }

    entity.position.x += (velocity.x * deltaMod);
    entity.position.y += (velocity.y * deltaMod);
  }
}

const gameLoop = (time) => {
  delta = time - current;
  // console.log(time, current, delta);
  current = time;
  move(delta);
  draw();
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
