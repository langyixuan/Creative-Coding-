const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [8048, 4048],
};

const sketch = () => {
  // const colors = ["#E7B2B6", "#E3C1C2", "#D88C9E"];
  const colors = random.pick(palettes);
  const textArr = ["E", "M", "O", "T", "I", "O", "N"];
  // const textArr = ["梦", "想", "成", "真"];
  function createCricle() {
    const points = [];
    const count = 600;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count - 1);
        const v = y / (count - 1);
        points.push({
          // radius: Math.abs(0.01 + random.gaussian() * 0.05),
          radius: Math.abs(random.noise2D(u, v, 1, 5)) * 0.002,
          position: [u, v],
          color: random.pick(colors),
          text: "T",
          rotation: Math.abs(random.noise2D(u, v)),
        });
      }
    }
    return points;
  }

  // const bb = random.setSeed(512);
  const points = createCricle().filter(() => random.value() > 0.6);
  // const margin = 100;

  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    points.forEach((data) => {
      const { position, radius, color, text, rotation } = data;
      const [u, v] = position;
      const x = lerp(0, width, u);
      const y = lerp(0, height, v);

      context.save();
      // context.font = `${radius * width}px Helvetica`;
      // context.fillStyle = color;
      // context.translate(x, y);
      // context.rotate(rotation);
      // context.fillText(text, 0, 0);
      context.fillStyle = color;
      context.rotate(rotation);
      context.fillRect(x, y, radius * width, radius * width);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
