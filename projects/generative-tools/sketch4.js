function hsvToRgb(h, s, v) {
  h /= 360; // Normalize hue to the range [0, 1]
  s /= 100; // Normalize saturation to the range [0, 1]
  v /= 100; // Normalize value to the range [0, 1]

  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return `rgb(${r}, ${g}, ${b})`;
}

function randNum(min, max) {
  return Math.random() * (max - min) + min;
}

const inputR = document.getElementById("R");
// let R = inputR.value;

const inputG = document.getElementById("G");
// let G = inputG.value;

const inputB = document.getElementById("B");
// let B = inputB.value;

const inputV = document.getElementById("V");
// let V = inputV.value;

function generate_colour(h, s, b, v) {
  let H_OUT = r + randNum(-v, v);
  let S_OUT = g + randNum(-v, v);
  let B_OUT = b + randNum(-v, v);
  return [R_OUT, G_OUT, B_OUT];
}

function sketchGrid() {
  const canvas = document.getElementById("canvas4");

  const scale = window.devicePixelRatio * 0.5;
  const width = canvas.clientWidth * 0.95;
  const height = canvas.clientHeight;
  canvas.width = width * scale;
  canvas.height = height * scale;

  let ctx = canvas.getContext("2d");

  let t = canvas.width / 20;
  //   let R = parseInt(inputR.value, 10);
  //   let G = parseInt(inputG.value, 10);
  //   let B = parseInt(inputB.value, 10);
  //   let V = parseInt(inputV.value, 10);

  for (let x = 0; x < width; x += t) {
    for (let y = 0; y < height; y += t) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = width * 0.01;
      //   const col = generate_colour(255, 50, 100, 50);
      ctx.fillStyle = hsvToRgb(randNum(300, 360), randNum(0,100), randNum(90,100));
    //   ctx.fillStyle = hsvToRgb(0, randNum(0,100), 100);
    //   ctx.fillStyle = hsvToRgb(0, 100, randNum(0, 100));

      ctx.beginPath();
      ctx.strokeRect(x, y, t, t);
      ctx.fillRect(x, y, t, t);
      //   ctx.stroke();
    }
  }
}

const fps = 10;

function draw() {
  setTimeout(function () {
    requestAnimationFrame(draw);

    sketchGrid();
  }, 1000 / fps);
}

// sketchGrid();
draw();
