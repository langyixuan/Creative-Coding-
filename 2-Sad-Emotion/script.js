const shapes = document.querySelector(".shapes");
const w = window.innerWidth;
const h = window.innerHeight;
const { Engine, Render, Bodies, World, Composites, Query } = Matter;
const music = document.querySelector("audio");
let mouseVector = { x: 0, y: 0 };

const engine = Engine.create();
const renderer = Render.create({
  element: shapes,
  engine: engine,
  options: {
    width: w,
    height: h,
    background: "#D5FFD0",
    pixelRatio: window.devicePixelRatio,
    wireframes: false,
  },
});

Engine.run(engine);
Render.run(renderer);

const bigBall = Bodies.circle(w / 2, h / 2, Math.min(w / 4, h / 4), {
  isStatic: true,
  render: {
    // fillStyle: "#C8AD63",
    sprite: {
      texture: "https://s3.bmp.ovh/imgs/2022/05/22/0f7f906274b931a7.png",
      xScale: 0.65,
      yScale: 0.65,
    },
  },
});

function createShape(x, y) {
  const graphicArr = [
    "https://adobeindd.com/view/publications/caca1ac5-dd70-4686-8cd3-f1b9dbd1028b/1/publication-web-resources/image/702.png",
    "https://adobeindd.com/view/publications/caca1ac5-dd70-4686-8cd3-f1b9dbd1028b/1/publication-web-resources/image/297.png",
    "https://adobeindd.com/view/publications/caca1ac5-dd70-4686-8cd3-f1b9dbd1028b/1/publication-web-resources/image/675.png",
    "https://adobeindd.com/view/publications/caca1ac5-dd70-4686-8cd3-f1b9dbd1028b/1/publication-web-resources/image/216.png",
    "https://adobeindd.com/view/publications/caca1ac5-dd70-4686-8cd3-f1b9dbd1028b/1/publication-web-resources/image/243.png",
    "https://adobeindd.com/view/publications/caca1ac5-dd70-4686-8cd3-f1b9dbd1028b/1/publication-web-resources/image/540.png",
    "https://adobeindd.com/view/publications/caca1ac5-dd70-4686-8cd3-f1b9dbd1028b/1/publication-web-resources/image/594.png",
    "https://adobeindd.com/view/publications/caca1ac5-dd70-4686-8cd3-f1b9dbd1028b/1/publication-web-resources/image/270.png",
    "https://adobeindd.com/view/publications/caca1ac5-dd70-4686-8cd3-f1b9dbd1028b/1/publication-web-resources/image/675.png",
  ];
  const randomIndex = Math.floor(Math.random() * graphicArr.length);
  return Bodies.circle(x, y, 50, {
    render: {
      sprite: {
        texture: graphicArr[randomIndex],
        xScale: 0.17,
        yScale: 0.17,
      },
    },
  });
}

const initialShapes = Composites.stack(50, 50, 15, 5, 40, 40, function (x, y) {
  return createShape(x, y);
});

const wallOptions = {
  isStatic: true,
  render: {
    visible: false,
  },
};
const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions);
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions);
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions);
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions);

World.add(engine.world, [
  bigBall,
  initialShapes,
  ground,
  ceiling,
  leftWall,
  rightWall,
]);

document.addEventListener("click", (e) => {
  const graphics = createShape(e.pageX, e.pageY);
  World.add(engine.world, graphics);
});

document.addEventListener("mousemove", (e) => {
  const vector = { x: e.pageX, y: e.pageY };
  const hoveredShapes = Query.point(initialShapes.bodies, vector);
  const messImg = [
    "https://s3.bmp.ovh/imgs/2022/05/22/9372151054a5adaa.png",
    "https://s3.bmp.ovh/imgs/2022/05/22/e8974d6f3e0e98d2.png",
    "https://s3.bmp.ovh/imgs/2022/05/22/beb00394ee2875a2.png",
    "https://s3.bmp.ovh/imgs/2022/05/22/75001b7cbf0eb016.png",
  ];
  const randomNum = Math.floor(Math.random() * messImg.length);
  hoveredShapes.forEach((shape) => {
    shape.render.sprite.texture = messImg[randomNum];
  });
});

let time = 0;
function changeGravity() {
  time = time + 0.001;
  engine.world.gravity.x = Math.sin(time);
  engine.world.gravity.y = Math.cos(time);
  requestAnimationFrame(changeGravity);
}

changeGravity();
