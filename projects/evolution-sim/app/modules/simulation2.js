import { Agent } from "./agent2.js";
import { intersurfaceDistance } from "../utils/math.js";

export function initialise(numberofAgents) {
  let system = [];
  for (let i = 0; i < numberofAgents; i++) {
    system.push(new Agent());
  }
  return system;
}

export function selectAgents(selectionCriteria, system) {
  let filtered = system.filter(selectionCriteria);
  return filtered;
}

export function timeStep(system) {
  for (let i = 0; i < system.length; i++) {
    let agent1 = system[i];
    agent1.update();

    let total_separation = 0;
    for (let j = 0; j < system.length; j++) {
      let agent2 = system[j];
      let new_separation = intersurfaceDistance(agent1, agent2);
      total_separation = total_separation + new_separation / 600;
    }
    let input = total_separation;
    agent1.updateInput(1, input);
  }
}
