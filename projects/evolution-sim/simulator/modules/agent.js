import {
  randNum,
  degToRad,
  scaleArray,
  rotationMatrix,
} from "../utils/math.js";

import { mutate } from "../utils/mutate.js";
import { wraparound } from "../utils/wraparound.js";
import * as Generate from "../utils/generate.js";
import simulationSettings from "../settings-static.js";

const brainSize = simulationSettings.brainSize;
const simSize = simulationSettings.simulationSize;

const initialDirection = simulationSettings.initialDirection;
const initialColour = simulationSettings.initialColour;

const minInitialSize = simulationSettings.initialSize[0];
const maxInitialSize = simulationSettings.initialSize[1];
const minInitialEnergy = simulationSettings.initialEnergy[0];
const maxInitialEnergy = simulationSettings.initialEnergy[1];

const maxSpeed = simulationSettings.maxSpeed;
const minSize = simulationSettings.minSize;
const maxSize = simulationSettings.maxSize;
const minEnergy = simulationSettings.minEnergy;
const maxEnergy = simulationSettings.maxEnergy;

const mutationStrength = simulationSettings.mutationStrength;

class Agent {
  constructor(
    state = {
      A: Generate.matrix(brainSize, 1),
      M: Generate.matrix(brainSize, brainSize),
      size: randNum(minInitialSize, maxInitialSize),
      energy: randNum(minInitialEnergy, maxInitialEnergy),
      x: randNum(0, simSize),
      y: randNum(0, simSize),
      direction: initialDirection,
      speed: maxSpeed,
      rgb: initialColour,
      generationNumber: 0,
      confirmSearch: undefined,
      confirmClone: undefined,
    }
  ) {
    this.state = state;
  }
  readOutput(outputNumber) {
    const A = this.state.A;
    return math.subset(A, math.index(brainSize - outputNumber, 0));
  }

  transitionBrainState() {
    const M = this.state.M;
    const A = this.state.A;

    let unscaledA = math.multiply(M, A); //TRY CREATING THIS PROCESS IN RUST
    this.state.A = scaleArray(unscaledA); //ensure values between (-1,1)
  }

  selectDirection(n) {
    //read from output neuron n
    let output = this.readOutput(n);
    let angle = degToRad((output + 1) * 180); //scale (-1,1) to (0,360)

    this.state.direction = math.multiply(
      rotationMatrix(angle),
      initialDirection
    );
  }

  selectSpeed(n) {
    //read from output neuron n
    let output = this.readOutput(n);
    this.state.speed = output * maxSpeed;
  }

  selectCloneState(n) {
    //read from output neuron n
    let output = this.readOutput(n);
    let cloneProbability = Math.abs(output);
    if (
      randNum(0, cloneProbability) >
      simulationSettings.cloneThreshold
    ) {
      this.state.confirmClone = true;
    } else {
      this.state.confirmClone = false;
    }
  }

  selectSearchState(n) {
    //read from output neuron n
    let output = this.readOutput(n);
    if (output > simulationSettings.searchThreshold) {
      this.state.confirmSearch = true;
      // this.state.rgb = [255, 0, 0];
    } else {
      this.state.confirmSearch = false;
      // this.state.rgb = [0, 0, 0];
    }
  }

  selectGrowth(n, m) {
    //requires two output neurons n & m
    let outputn = this.readOutput(n);
    let outputm = this.readOutput(m);

    if (outputn > simulationSettings.growthThreshold) {
      let growth = outputm;
      let newSize = this.state.size + growth;
      let newEnergy = this.state.energy - growth;
      if (
        newSize > minSize &&
        newSize < maxSize &&
        newEnergy > minEnergy &&
        newEnergy < maxEnergy
      ) {
        this.state.size += growth;
        this.state.energy -= growth;
      }
    }
  }

  updatePosition() {
    //UPDATE POSITION IN SYSTEM
    let xMove =
      math.subset(this.state.direction, math.index(0, 0)) * this.state.speed;
    let yMove =
      math.subset(this.state.direction, math.index(1, 0)) * this.state.speed;

    const offset = this.state.size;
    this.state.x = wraparound(this.state.x + xMove, offset, simSize);
    this.state.y = wraparound(this.state.y + yMove, offset, simSize);
  }

  updateEnergy() {
    //lose energy from moving
    this.state.energy -= simulationSettings.movementCost(
      this.state.size,
      this.state.speed
    );

    //lose energy from existing
    this.state.energy -= simulationSettings.existCost(
      this.state.size
    );
  }

  clone() {
    this.state.size = this.state.size / 2;
    this.state.energy = this.state.energy / 2;
    this.state.rgb = [initialColour[0], initialColour[0], this.state.rgb[2]+30];
    let newState = { ...this.state }; //shallow clone
    const originalM = newState.M;
    newState.M = mutate(mutationStrength, originalM);
    newState.generationNumber += 1;
    newState.rgb = [initialColour[0],initialColour[0],newState.rgb[2]+30];

    return new Agent(newState);
  }

  update() {
    this.transitionBrainState();

    //updates that require specified output neurons
    this.selectDirection(1);
    this.selectSpeed(2);
    this.selectCloneState(3);
    this.selectGrowth(4, 5);
    this.selectSearchState(6);

    this.updatePosition();
    this.updateEnergy();

    if (this.state.size > simulationSettings.maxSize - 2) {
      this.state.confirmClone = true;
    }
  }
}

export { Agent };
