import {
  randNum,
  scaleArray,
  degToRad,
  rotationMatrix,
} from "../utils/math.js";
import { wraparound } from "../utils/wraparound.js";
import * as Generate from "../utils/generate.js";

const simSize = 450;
const initialDirection = math.matrix([[1], [0]]);
//rotations taken from the x-axis

class Agent {
  constructor(
    state = {
      A: math.matrix([[0], [0]]),
      M: math.matrix([
        [0, 1],
        [0, 0],
      ]),
      x: randNum(0, simSize),
      y: randNum(0, simSize),
      size: 5,
      speed: 1,
      angle: randNum(0, 6.28), //angle in radians from x axis
    }
  ) {
    this.state = state;
    this.state.direction = math.multiply(
      rotationMatrix(this.state.angle),
      initialDirection
    );
  }

  readOutput(n) {
    const A = this.state.A;
    return math.subset(A, math.index(n, 0));
  }

  updateInput(n, inputValue) {
    let originalValue = math.subset(this.state.A, math.index(n, 0));
    // potential input function:

    // let newValue = Math.tanh(originalValue + inputValue);
    // let newValue = originalValue + inputValue;
    let newValue = inputValue;

    let updatedA = math.subset(this.state.A, math.index(n, 0), newValue);
    this.state.A = updatedA;
  }

  transitionBrainState() {
    const M = this.state.M;
    const A = this.state.A;

    this.state.A = math.multiply(M, A);
    // no scaling applied in this case
  }

  selectSpeed(n) {
    this.state.speed = this.readOutput(n) * 5;
  }

  selectRotation(n) {
    this.state.angle += this.readOutput(n) * 0.017;
    this.state.direction = math.multiply(
      rotationMatrix(this.state.angle),
      initialDirection
    ); //update new angle with respect to x axis
  }

  updatePosition() {
    //update position in system
    let xMove =
      math.subset(this.state.direction, math.index(0, 0)) * this.state.speed;
    let yMove =
      math.subset(this.state.direction, math.index(1, 0)) * this.state.speed;

    const offset = this.state.size;
    this.state.x = wraparound(this.state.x + xMove, offset, simSize);
    this.state.y = wraparound(this.state.y + yMove, offset, simSize);
    //wraparound function allows agents to move from one side to another
  }

  update() {
    this.transitionBrainState();

    this.selectSpeed(0);
    this.selectRotation(0);

    this.updatePosition();

    let x_input = (this.state.x / simSize) * 2 - 1;
    this.updateInput(1, x_input);
  }
}

export { Agent };
