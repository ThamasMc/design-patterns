import { EntityManager } from "./entities"

let entities = EntityManager.entities;

const canvas = document.querySelector("#app");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);
let current = 0;
let delta = 0;

const ctx = canvas.getContext("2d");


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

const run = () => {
  requestAnimationFrame(gameLoop)
}

export const Game = {
  run
}
