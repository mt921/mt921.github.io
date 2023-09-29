function randNum(min, max) {
  return Math.random() * (max - min) + min;
}

const col1 = [40, 60, 205];
let r;
let g;
let b;
let inc;

function sketchGrid() {
  const canvas = document.getElementById("canvas1");

  const scale = window.devicePixelRatio * 0.5;
  const width = canvas.clientWidth * 0.9;
  const height = canvas.clientHeight;
  canvas.width = width * scale;
  canvas.height = height * scale;

  let ctx = canvas.getContext("2d");

  let t = canvas.width / 75;

  for (let x = 0; x < width; x += t) {
    for (let y = 0; y < height; y += t) {
      let test = randNum(0, 2);
      ctx.strokeStyle = "rgb(57, 56, 235)";
      ctx.lineWidth = width * 0.0025;
      if (test > 0.6) {
        inc = randNum(0, 30);
        r = col1[0] - inc;
        g = col1[1] - inc;
        b = col1[2] - inc;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
      } else {
        inc = randNum(0, 2);
        r = 255 - inc * (255 - col1[0]);
        g = 255 - inc * (255 - col1[1]);
        b = 255 - inc * (255 - col1[2]);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
      }

      ctx.beginPath();
      ctx.strokeRect(x, y, t, t);
      ctx.fillRect(x, y, t, t);
      ctx.stroke();
    }
  }
}

const fps = 10;
const playing = true;

function draw() {
  setTimeout(function () {
    requestAnimationFrame(draw);

    sketchGrid();
  }, 1000 / fps);
}

// canvas.oncl

sketchGrid();
if (playing) {draw();}