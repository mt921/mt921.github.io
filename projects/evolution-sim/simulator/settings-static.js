const simulationSettings = {
  simulationSize: 450,
  backgroundColour: "rgb(252,254,255)",
  accentColour: [80,80,80],

  targetSystemEnergy: 4000,

  //SIMULATION SPEED PROPERTIES
  timeStepsPerAnimationFrame: 1,
  intervalTime: 40,

  minPredatorSize: 3,
  maxPreySize: 3,

  mutationStrength: 0.02,
  numberofAgents: 2000,

  initialSize: [0.5, 2.5],
  initialEnergy: [5, 5],
  initialColour: [50, 50, 50],
  initialDirection: math.matrix([[0], [-1]]),

  brainSize: 10,

  minSize: 0.25,
  maxSize: 15,
  minEnergy: 0.5,
  // maxEnergy: 10,

  minCloneSize: 1,

  maxSpeed: 1,

  cloneThreshold: 0.95,
  growthThreshold: 0.9,
  searchThreshold: 0.4,

  existCost: function (size) {
    return size / 3000;
  },

  movementCost: function (size, speed) {
    return size / 2000 + speed / 1000;
  },
};

simulationSettings.selectionCriteria = function (agent) {
  if (
    agent.state.size <= simulationSettings.minSize ||
    agent.state.energy <= 0.5
  ) {
  } else {
    return agent;
  }
};

simulationSettings.maxEnergy = simulationSettings.initialEnergy[1];

// simulationSettings.initialEnergy[0] = simulationSettings.targetSystemEnergy/simulationSettings.numberofAgents;
// simulationSettings.initialEnergy[1] =
//   simulationSettings.targetSystemEnergy / simulationSettings.numberofAgents;

export default Object.freeze(simulationSettings);
