import { hsvToRgb } from "../utils/colour_conversions.js";

const canvas = document.getElementById("canvas2");

const width = canvas.clientWidth;
const height = canvas.clientHeight;
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

let h1 = 200;
let c1 = 200;
let m1 = 10;
let i1 = 50;

function sketchGradient(x, y, width, height) {
  for (let i = -1; i < height / h1; i++) {
    let hue = c1 + (y + x) / m1 + i / i1;
    ctx.fillStyle = hsvToRgb(hue, 81, 100);
    ctx.fillRect(0, h1 * i, width, h1);
  }
}

//Static sketch
sketchGradient(100, 100, width, height);

//Interactive sketch
canvas.addEventListener("mousemove", handleMouseMove);
function handleMouseMove(event) {
  const rect = canvas.getBoundingClientRect();

  // Account for CSS transformations or viewport scaling
  const scalingFactorX = canvas.width / rect.width;
  const scalingFactorY = canvas.height / rect.height;

  // Calculate the mouse X and Y coordinates
  const x = (event.clientX - rect.left) * scalingFactorX;
  const y = (event.clientY - rect.top) * scalingFactorY;

  sketchGradient(x,y,width,height);
}