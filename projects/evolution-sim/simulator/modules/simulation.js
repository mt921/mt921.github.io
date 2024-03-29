import { Agent } from "./agent.js";
import { intersurfaceDistance } from "../utils/math.js";
import simulationSettings from "../settings.js";

const maxEnergy = simulationSettings.maxEnergy;
const minCloneSize = simulationSettings.minCloneSize;

export function initialise() {
  let system = [];
  for (let i = 0; i < simulationSettings.numberofAgents; i++) {
    system.push(new Agent());
  }
  return system;
}

export function selectAgents(selectionCriteria, system) {
  let filtered = system.filter(selectionCriteria);
  return filtered;
}

export function timeStep(system) {
  let totalEnergy = 0;

  for (let i = 0; i < system.length; i++) {
    let agent1 = system[i];
    agent1.update();

    if (agent1.state.confirmClone && agent1.state.size > minCloneSize) {
      system.push(agent1.clone());
      // console.log(system)
    }

    //create a function for search e.g. quadtree methods
    for (let j = 0; j < system.length; j++) {
      let agent2 = system[j];
      let separation = intersurfaceDistance(agent1, agent2);
      if (
        separation <= 0 &&
        agent1.state.size > agent2.state.size &&
        agent1.state.confirmSearch &&
        agent1.state.energy +
          agent2.state.size +
          agent2.state.energy / agent1.state.size <
          maxEnergy
      ) {
        agent1.state.energy =
          agent1.state.energy +
          agent2.state.size +
          agent2.state.energy / agent1.state.size;
        agent2.state.size = 0;
      }
      if (
        separation <= 0 &&
        agent1.state.size < agent2.state.size &&
        agent2.state.confirmSearch &&
        agent2.state.energy +
          agent1.state.size +
          agent1.state.energy / agent2.state.size <
          maxEnergy
      ) {
        agent2.state.energy =
          agent2.state.energy +
          agent1.state.size +
          agent1.state.energy / agent2.state.size;
        agent1.state.size = 0;
      }
    }

    let agent1Energy =
      agent1.state.size + agent1.state.speed + agent1.state.energy;
    totalEnergy += agent1Energy;
  }

  //increase energy in the system to try to match target
  // console.log(totalEnergy);
  if (totalEnergy < simulationSettings.targetSystemEnergy) {
    system.push(new Agent());
  }
}

//EXTRACT INFORMATION ABOUT THE DATA FOR VISUALISATIONS


