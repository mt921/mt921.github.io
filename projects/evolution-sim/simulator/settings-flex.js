import { randNum } from "./utils/math.js";

const InitialSizeLower = randNum(0, 4);
const InitialSizeUpper = randNum(InitialSizeLower, 8);
const InitialEnergyLower = randNum(0, 2);
const InitialEnergyUpper = randNum(InitialEnergyLower, 6);
const numberofAgents = randNum(0, 500);

const simulationSettings = {
  simulationSize: 450,
  backgroundColour: "rgb(245,245,245)",
  accentColour: [80, 80, 80],

  targetSystemEnergy: randNum(0, InitialEnergyUpper * 2 * numberofAgents),

  //SIMULATION SPEED PROPERTIES
  timeStepsPerAnimationFrame: 1,
  intervalTime: 0,

  minPredatorSize: 3,
  maxPreySize: 3,

  mutationStrength: randNum(0, 5),
  numberofAgents: numberofAgents,

  initialSize: [InitialSizeLower, InitialSizeUpper],
  initialEnergy: [InitialEnergyLower, InitialEnergyUpper],
  initialColour: [50, 50, 50],
  initialDirection: math.matrix([[0], [-1]]),

  brainSize: 10,

  minSize: randNum(0, 0.5),
  maxSize: InitialSizeUpper + InitialSizeUpper / InitialSizeLower,
  minEnergy: randNum(0, 0.5),
  maxEnergy: InitialEnergyUpper,

  minCloneSize: randNum(0, InitialSizeUpper),

  maxSpeed: randNum(0, 1.2),

  cloneThreshold: randNum(0, 1),
  growthThreshold: randNum(0, 1),
  searchThreshold: randNum(0, 1),

  existCostParam: randNum(1, 100000),
  movementCostParam1: randNum(1, 100000),
  movementCostParam2: randNum(1, 100000),
};

simulationSettings.selectionCriteria = function (agent) {
  if (
    agent.state.size <= simulationSettings.minSize ||
    agent.state.energy <= simulationSettings.minEnergy
  ) {
  } else {
    return agent;
  }
};

simulationSettings.existCost = function (size) {
  return size / simulationSettings.existCostParam;
};

simulationSettings.movementCost = function (size, speed) {
  return (
    size / simulationSettings.movementCostParam1 +
    speed / this.movementCostParam2
  );
};

simulationSettings.maxEnergy = simulationSettings.initialEnergy[1];
simulationSettings.maxPreySize = simulationSettings.maxSize / 4;
simulationSettings.minPredatorSize = simulationSettings.maxSize / 2;

// simulationSettings.initialEnergy[0] = simulationSettings.targetSystemEnergy/simulationSettings.numberofAgents;
// simulationSettings.initialEnergy[1] =
//   simulationSettings.targetSystemEnergy / simulationSettings.numberofAgents;

export default Object.freeze(simulationSettings);
