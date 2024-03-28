import { randNum } from "./math.js";

//generate a matrix of a specific size
export function matrix(rows, cols) {
  const ones = math.ones(rows, cols);
  return ones.map((x) => x * randNum(-1, 1));
}
