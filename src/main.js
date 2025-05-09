import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

const canvas = document.querySelector("#app");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

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

  requestAnimationFrame(draw);
}

let velocity = {
  x: 5,
  y: 5
};

const move = () => {

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

  square.position.x += velocity.x;
  square.position.y += velocity.y;

  console.log(velocity);
}

const gameLoop = () => {
  move();
  draw();
  requestAnimationFrame(gameLoop);
};

gameLoop();
