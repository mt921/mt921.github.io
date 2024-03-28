import { Agent } from "./agent.js";

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
  }
}
