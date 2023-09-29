import { hsvToRgb } from "../utils/colour_conversions.js";

const canvas = document.getElementById("canvas1");

let width = canvas.clientWidth;
let height = canvas.clientHeight;
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

const val1 = 0.25 * canvas.width;
const val2 = 0.02 * canvas.width;

function sketchRays(x, y, width) {
  for (let i = 0; i < val1; i++) {
    ctx.strokeStyle = hsvToRgb(x + i, 100, 100);
    ctx.beginPath();
    ctx.moveTo(0, val2 * i);
    ctx.lineTo(x, y); // Ending point (x, y)
    ctx.stroke();
  }

  for (let i = 0; i < val1; i++) {
    ctx.strokeStyle = hsvToRgb(x - 1, 100, 100);
    ctx.beginPath();
    ctx.moveTo(val2 * i, 0);
    ctx.lineTo(x, y); // Ending point (x, y)
    ctx.stroke();
  }

  for (let i = 0; i < val1; i++) {
    ctx.strokeStyle = hsvToRgb(x + i, 100, 100);
    ctx.beginPath();
    ctx.moveTo(width, val2 * i);
    ctx.lineTo(x, y); // Ending point (x, y)
    ctx.stroke();
  }

  for (let i = 0; i < val1; i++) {
    ctx.strokeStyle = hsvToRgb(x + i, 100, 100);
    ctx.beginPath();
    ctx.moveTo(val2 * i, width);
    ctx.lineTo(x, y); // Ending point (x, y)
    ctx.stroke();
  }
}

//Onload sketch
ctx.fillStyle = `rgb(255,255,255)`;
ctx.fillRect(0, 0, width, height);
sketchRays(width/2, 20, width);

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

  ctx.fillStyle = `rgb(255,255,255)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  sketchRays(x, y, canvas.width);
}

// function handleResize() {
//   // Update the canvas dimensions to match the window size
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   // Clear and redraw the canvas content
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   // Draw your content here based on the new canvas size
//   ctx.fillStyle = `rgb(255,255,255)`;
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   sketchRays(canvas.width, 0, canvas.width);
// }

// Add the 'resize' event listener to the window
// window.addEventListener("resize", handleResize);

// // Initialize canvas size
// handleResize();
