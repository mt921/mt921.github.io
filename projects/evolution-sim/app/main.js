import * as Simulation from "./modules/simulation.js";
import * as Display from "./utils/display.js";
import { create } from "./utils/canvas.js";

const timeStepsPerAnimationFrame = 1;
const intervalWindow = 10;

const numberofAgents = 50;
const simSize = 450;

//create visualisations
let canvas = create(
  "canvas",
  document.getElementById("put here"),
  simSize,
  simSize
);
let ctx = canvas.ctx;

//initialise system
let system = Simulation.initialise(numberofAgents);

//run simulation
function runSim() {
  setInterval(function () {
    for (let i = 0; i < timeStepsPerAnimationFrame; i++) {
      Simulation.timeStep(system);
    }
  }, intervalWindow);
}

//update visualisations
function animate() {
  Display.background(ctx, simSize);
  Display.system(ctx, system);
  requestAnimationFrame(animate);
}

runSim();
animate();
