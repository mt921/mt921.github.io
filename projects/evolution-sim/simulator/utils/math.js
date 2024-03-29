export function randNum(min, max) {
  return Math.random() * (max - min) + min;
}

export function degToRad(theta) {
  return theta * (Math.PI / 180);
}

//scale every element of an array to [-1,1] using tanh
export function scaleArray(A) {
  const newA= A.map((x) => Math.tanh(x));
  return newA;
}

export function boxMullerTransform() {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
  return { z0, z1 };
}

export function normalDist(mean, stddev) {
  const { z0, _ } = boxMullerTransform();
  return z0 * stddev + mean;
}

export function centralDistance(x1,y1,x2,y2) {
  return (Math.sqrt(
  Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
  ));
}

export function intersurfaceDistance(agent1, agent2) {
  const x1 = agent1.state.x;
  const y1 = agent1.state.y;
  const x2 = agent2.state.x;
  const y2 = agent2.state.y;
  const dist1 = centralDistance(x1,y1,x2,y2);
  return (dist1 - (agent1.state.size + agent2.state.size));
}

export function rotationMatrix(angle) {
  return math.matrix([
    [Math.cos(angle), -Math.sin(angle)],
    [Math.sin(angle), Math.cos(angle)],
  ]);
}

