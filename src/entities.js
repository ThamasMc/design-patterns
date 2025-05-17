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

export const EntityManager = {
  entities
}
