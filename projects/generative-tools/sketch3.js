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


function generate_colour(r, g, b, v) {
  let R_OUT = r + randNum(-v,v);
  let G_OUT = g + randNum(-v, v);
  let B_OUT = b + randNum(-v, v);
  return [R_OUT, G_OUT, B_OUT];
}

function sketchGrid() {
  const canvas = document.getElementById("canvas3");

  const scale = window.devicePixelRatio * 0.5;
  const width = canvas.clientWidth * 0.95;
  const height = canvas.clientHeight;
  canvas.width = width * scale;
  canvas.height = height * scale;

  let ctx = canvas.getContext("2d");

  let t = canvas.width / 20;
  let R = parseInt(inputR.value, 10);
  let G = parseInt(inputG.value, 10);
  let B = parseInt(inputB.value, 10);
  let V = parseInt(inputV.value, 10);

  for (let x = 0; x < width; x += t) {
    for (let y = 0; y < height; y += t) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = width * 0.01;
      //   const col = generate_colour(255, 50, 100, 50);

      let col = generate_colour(R, G, B, V);
      console.log({R},{G},{B},{V}, {col});

      let r = col[0];
      let g = col[1];
      let b = col[2];

      ctx.fillStyle = `rgb(${r},${g},${b})`;

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


// sketchGrid(R, G, B, V);

// inputR.addEventListener("input", function () {
//   let newR = inputR.value;
//   //if any values change a new colour scheme should be generated and displayed
//   sketchGrid(newR, G, B, V);
// });

// inputG.addEventListener("input", function () {
//   let newG = inputG.value;
//   //if any values change a new colour scheme should be generated and displayed
//   sketchGrid(R, newG, B, V);
// });

// inputB.addEventListener("input", function () {
//   let newB = inputB.value;
//   //if any values change a new colour scheme should be generated and displayed
//   sketchGrid(R, G, newB, V);
// });

// inputV.addEventListener("input", function () {
//   let newV = inputV.value;
//   //if any values change a new colour scheme should be generated and displayed
//   sketchGrid(R, G, B, newV);
// });