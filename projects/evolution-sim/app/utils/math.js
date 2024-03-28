export function randNum(min, max) {
  return Math.random() * (max - min) + min;
}

export function scaleArray(A) {
  const newA = A.map((x) => Math.tanh(x));
  return newA;
}

export function degToRad(theta) {
  return theta * (Math.PI / 180);
}

export function rotationMatrix(angle) {
  return math.matrix([
    [Math.cos(angle), -Math.sin(angle)],
    [Math.sin(angle), Math.cos(angle)],
  ]);
}

export function centralDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function intersurfaceDistance(agent1, agent2) {
  const x1 = agent1.state.x;
  const y1 = agent1.state.y;
  const x2 = agent2.state.x;
  const y2 = agent2.state.y;
  const dist1 = centralDistance(x1, y1, x2, y2);
  return dist1 - (agent1.state.size + agent2.state.size);
}