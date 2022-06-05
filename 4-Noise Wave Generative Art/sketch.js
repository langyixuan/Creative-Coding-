const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const colors = random.pick(palettes);
  function createCricle() {
    const points = [];
    const count = 40;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push({
          radius: Math.abs(0.01 + random.gaussian() * 0.01),
          position: [u, v],
          color: random.pick(colors),
        });
      }
    }
    return points;
  }

  // const bb = random.setSeed(512);
  const points = createCricle().filter(() => random.value() > 0.6);
  const margin = 100;

  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    points.forEach((data) => {
      const { position, radius, color } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();
      // context.strokeStyle = color[0];
      // context.lineWidth = 10;
    });
  };
};

canvasSketch(sketch, settings);
