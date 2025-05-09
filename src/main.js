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
  color: "rgb(255 0 0)"
};

const draw = () => {
  width = (canvas.width = window.innerWidth);
  height = (canvas.height = window.innerHeight);

  ctx.fillStyle = "rgb(0 0 0)";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = square.color;
  ctx.fillRect(square.position.x, square.position.y, square.scale.x, square.scale.y);
}

let velocity = {
  x: 100,
  y: 0
};

const move = (deltaTime) => {
  const deltaMod = deltaTime / 1000;
  /*
   * 1000px moving 10px p second, should take 100 seconds
   */

  // Handle bounces
  if((velocity.x + square.position.x + square.scale.x) > canvas.width) {
    velocity.x = velocity.x * -1;
  }

  if((velocity.x + square.position.x) < 0) {
    velocity.x = velocity.x * -1;
  }

  if((velocity.y + square.position.y + square.scale.y) > canvas.height) {
    velocity.y = velocity.y * -1;
  }

  if((velocity.y + square.position.y) < 0) {
    velocity.y = velocity.y * -1;
  }

  square.position.x += (velocity.x * deltaMod);
  square.position.y += (velocity.y * deltaMod);
}

const gameLoop = (time) => {
  delta = time - current;
  console.log(time, current, delta);
  current = time;
  move(delta);
  draw();
  requestAnimationFrame(gameLoop);
};

requestAnimationFrame(gameLoop);
