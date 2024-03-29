// const data = {"simulationSize":450,"backgroundColour":"rgb(245,245,245)","accentColour":[80,80,80],"targetSystemEnergy":1163.8992339285712,"timeStepsPerAnimationFrame":1,"intervalTime":0,"minPredatorSize":2.906395472422435,"maxPreySize":1.4531977362112174,"mutationStrength":0.9840370685126221,"numberofAgents":327.93282669044976,"initialSize":[3.064481363900444,4.382647606884851],"initialEnergy":[0.17863931379771314,2.6530728044502387],"initialColour":[50,50,50],"initialDirection":{"mathjs":"DenseMatrix","data":[[0],[-1]],"size":[2,1]},"brainSize":10,"minSize":0.03094921040354559,"maxSize":5.81279094484487,"minEnergy":0.045792172382248864,"maxEnergy":2.6530728044502387,"minCloneSize":3.790198587740927,"maxSpeed":0.7451657769530892,"cloneThreshold":0.08744970985579226,"growthThreshold":0.6858462277000115,"searchThreshold":0.7217721944740005,"existCostParam":97993.50036448285,"movementCostParam1":45000.47361166506,"movementCostParam2":36274.984952873885}
// const simulationSettings = JSON.parse(data);

//PASTE JSON HERE & REFORMAT:
const simulationSettings = {
  simulationSize: 450,
  backgroundColour: "rgb(245,245,245)",
  accentColour: [80, 80, 80],
  targetSystemEnergy: 1163.8992339285712,
  timeStepsPerAnimationFrame: 1,
  intervalTime: 0,
  minPredatorSize: 2.906395472422435,
  maxPreySize: 1.4531977362112174,
  mutationStrength: 0.9840370685126221,
  numberofAgents: 327.93282669044976,
  initialSize: [3.064481363900444, 4.382647606884851],
  initialEnergy: [0.17863931379771314, 2.6530728044502387],
  initialColour: [50, 50, 50],
  initialDirection: { mathjs: "DenseMatrix", data: [[0], [-1]], size: [2, 1] },
  brainSize: 10,
  minSize: 0.03094921040354559,
  maxSize: 5.81279094484487,
  minEnergy: 0.045792172382248864,
  maxEnergy: 2.6530728044502387,
  minCloneSize: 3.790198587740927,
  maxSpeed: 0.7451657769530892,
  cloneThreshold: 0.08744970985579226,
  growthThreshold: 0.6858462277000115,
  searchThreshold: 0.7217721944740005,
  existCostParam: 97993.50036448285,
  movementCostParam1: 45000.47361166506,
  movementCostParam2: 36274.984952873885,
};

//MAKE SURE TO MAINTAIN THESE UPDATES TO HAVE A VALID OBJECT:
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
simulationSettings.initialDirection = math.matrix([[0], [-1]]);

export default Object.freeze(simulationSettings);
