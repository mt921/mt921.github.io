import simulationSettings from "../settings-static.js";

const maxEnergy = simulationSettings.maxEnergy;

function background(ctx, size) {
  ctx.fillStyle = simulationSettings.backgroundColour;
  ctx.fillRect(0, 0, size, size);
}

function agent(ctx, agent) {
  let R = agent.state.rgb[0];
  let G = agent.state.rgb[1];
  let B = agent.state.rgb[2];
  let A = agent.state.energy / maxEnergy;
  ctx.fillStyle = "rgba(" + R + "," + G + "," + B + "," + A + ")";
  ctx.strokeStyle = "rgba(0,0,0," + A + ")";
  ctx.beginPath();
  ctx.arc(agent.state.x, agent.state.y, agent.state.size, 0, Math.PI * 2);
  ctx.fill();
  // ctx.stroke();
}

function system(ctx, array) {
  for (let i = 0; i < array.length; i++) {
    agent(ctx, array[i]);
  }
}

export { background, agent, system };
