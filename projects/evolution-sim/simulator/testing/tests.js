import { mutate } from "../modules/mutate.js";
import { selectAgents } from "../modules/system.js";
import { Agent } from "../modules/agent.js";
import * as Generate from "../modules/generate.js";

const chai = window.chai;
const expect = chai.expect;
const describe = window.describe;
const it = window.it;
const fc = window.fastcheck;

//selection function will be defined dependent on desired features
function selection(agent) {
  if (agent.energy <= 0) {
    console.log("removed from system");
  } else {
    return agent;
  }
}

describe("Selections", () => {
  it("Selection should remove agents with 0 energy", function () {
    let agent1 = new Agent(10);
    let agent2 = new Agent(10);
    let agent3 = new Agent(10);
    agent1.energy = 0;
    agent2.energy = 50;
    agent3.energy = 100;
    let system = [agent1,agent2,agent3]
    console.log(system);
    system = selectAgents(selection, system);
    console.log(system);
    if (system.length !== 2) {
      throw new Error("Selection unsuccessful");
    }
  });
});

describe("Mutations", () => {
  it("A mutation should cause a change to the original matrix", function () {
    let testMat = Generate.matrix(5, 5); //create a matrix to test
    let mutatedMat = mutate(0.5, testMat); //perform mutation
    // console.log(testMat);
    // console.log(mutatedMat);
    if (testMat === mutatedMat) {
      throw new Error("No mutation occurred");
    }
  });
  it("Mutated matrix elements should be in range [-1,1]", function () {
    let testMat = Generate.matrix(5, 5); //create a matrix to test
    let mutatedMat = mutate(0.5, testMat); //perform mutation
    // console.log(testMat);
    // console.log(mutatedMat);
    mutatedMat.forEach((element) => {
      if (Math.abs(element) > 1) {
        throw new Error("Value outside of range");
      }
    });
  });
});
