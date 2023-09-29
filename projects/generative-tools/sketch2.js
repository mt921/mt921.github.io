function randNum(min, max) {
  return Math.random() * (max - min) + min;
}

const col1 = [40, 60, 205];
let r;
let g;
let b;
let inc;

function sketchGrid() {
  const canvas = document.getElementById("canvas2");

  const scale = window.devicePixelRatio * 0.5;
  const width = canvas.clientWidth * 0.95;
  const height = canvas.clientHeight;
  canvas.width = width * scale;
  canvas.height = height * scale;

  let ctx = canvas.getContext("2d");

  let t = canvas.width / 20;

  for (let x = 0; x < width; x += t) {
    for (let y = 0; y < height; y += t) {
      let test = randNum(0, 2);
    //   ctx.strokeStyle = "rgb(57, 56, 235)";
      ctx.strokeStyle = "white";
      ctx.lineWidth = width * 0.01;
      if (test > 0) {
        r = randNum(0,255);
        g = randNum(0, 255);
        b = randNum(0, 255);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
      }

      ctx.beginPath();
      ctx.strokeRect(x, y, t, t);
      ctx.fillRect(x, y, t, t);
    //   ctx.stroke();
    }
  }
}

const fps = 3;

function draw() {
  setTimeout(function () {
    requestAnimationFrame(draw);

    sketchGrid();
  }, 1000 / fps);
}

sketchGrid();
draw();
