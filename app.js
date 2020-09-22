const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let fillStyle = false;
let painting = false;

ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

//paint mode, default
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

//color change
function handleClickColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//brush range change
function handleRange(event) {
  const range = event.target.value;
  ctx.lineWidth = range;
}

//change mode button
function changeMode() {
  if (fillStyle) {
    fillStyle = false;
    mode.innerHTML = "fill";
  } else {
    fillStyle = true;
    mode.innerHTML = "paint";
  }
}

//fillStyle mode
function handleCanvasClick() {
  if (fillStyle) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

//canvas 우클릭 저장 방지
function noclick(event) {
  event.preventDefault();
}

//save button
function handleSaveCanvas() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", noclick); //우클릭 저장 방지
}

Array.from(colors).forEach((color) => {
  color.addEventListener("click", handleClickColor);
});

if (range) {
  range.addEventListener("input", handleRange);
}

if (mode) {
  mode.addEventListener("click", changeMode);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveCanvas);
}
