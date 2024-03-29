import * as Display from "./utils/display.js";
import * as Simulation from "./modules/simulation.js";
import { create } from "./utils/canvas.js";
import simulationSettings from "./settings-static.js";

console.log(simulationSettings)

const date = new Date();
const jsonData = JSON.stringify(simulationSettings);

const blob = new Blob([jsonData], { type: "application/json" });
const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
// a.download = `simulation-settings ${date}.json`;
// a.textContent = "Download Simulation Settings";

document.body.appendChild(a);

const simSize = simulationSettings.simulationSize;
let canvas = create(
  "canvas",
  document.getElementById("put here3"),
  simSize,
  simSize
);
//bar & line graphs are created using the function originally designed
//to create a canvas, there might be a canvas created as side-effect
// let barChart = create("bar-chart", document.body);
// let lineGraph = create("line-graph", document.body);
let ctx = canvas.ctx;

//initialise a system of agents with specified brain size
let system = Simulation.initialise();

function runSim() {
  setInterval(function () {
    for (let i = 0; i < simulationSettings.timeStepsPerAnimationFrame; i++) {
      Simulation.timeStep(system);
      system = Simulation.selectAgents(
        simulationSettings.selectionCriteria,
        system
      );
    }
  }, simulationSettings.intervalTime);
}

function animate() {
  Display.background(ctx, simSize);
  Display.system(ctx, system);
  requestAnimationFrame(animate);
}

runSim();
animate();
