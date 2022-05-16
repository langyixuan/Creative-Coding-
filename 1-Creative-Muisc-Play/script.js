const cursor = document.querySelector(".cursor");
const canvasIn = document.querySelector(".in");
const canvasOut = document.querySelector(".out");
const video = document.querySelector(".music-video");
let isMouseDown = false;

// init Canvas
function setupCanvas(canvasEl) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dpi = window.devicePixelRatio;

  canvasEl.width = w * dpi;
  canvasEl.height = h * dpi;
  canvasEl.style.width = w + "px";
  canvasEl.style.height = h + "px";

  const ctx = canvasEl.getContext("2d");
  ctx.scale(dpi, dpi);

  if (canvasEl.classList.contains("in")) {
    ctx.fillStyle = "#000000";
    ctx.strokeStyle = "#77797A";
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#000000";
  }

  ctx.lineWidth = 80;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowBlur = 60;
  ctx.shadowColor = ctx.strokeStyle;

  ctx.rect(0, 0, w, h);
  ctx.fill();
}

function moveDraw(canvasEl, x, y) {
  const ctx = canvasEl.getContext("2d");
  if (isMouseDown) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startDraw(canvasEl, x, y) {
  const ctx = canvasEl.getContext("2d");
  ctx.moveTo(x, y);
  ctx.beginPath();
}

function moveCursor(x, y) {
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
}

setupCanvas(canvasIn);
setupCanvas(canvasOut);

document.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  cursor.classList.add("is-down");
  startDraw(canvasIn, e.pageX, e.pageY);
  startDraw(canvasOut, e.pageX, e.pageY);
  video.play();
});

document.addEventListener("mouseup", () => {
  isMouseDown = false;
  cursor.classList.remove("is-down");
});

document.addEventListener("mousemove", (e) => {
  moveCursor(e.pageX, e.pageY);
  moveDraw(canvasIn, e.pageX, e.pageY);
  moveDraw(canvasOut, e.pageX, e.pageY);
});

window.addEventListener("resize", function () {
  setupCanvas(canvasIn);
  setupCanvas(canvasOut);
});
