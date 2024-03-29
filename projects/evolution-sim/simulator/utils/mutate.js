import { scaleArray, normalDist } from "./math.js";

function check(x) {
  if (x > 1) {
    return 1;
  }
  if (x < -1) {
    return -1;
  } else {
    return x;
  }
}

//the aim of this function is to perform a mutation on an n x n input matrix
export function mutate(strength, M) {
  const size = math.size(M);
  //initialise a matrix of ones with correct dimensions
  const ones = math.ones(size._data[0], size._data[1]);
  const mutation = ones.map((x) => x * normalDist(0, 1) * strength);
  let mutatedM = math.add(M, mutation);
  return mutatedM.map((x) => check(x));
}
