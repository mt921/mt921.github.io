function background(ctx, size) {
  ctx.fillStyle = "rgba(230, 245, 255)";
  ctx.fillStyle = "rgba(240, 248, 255)";
  ctx.fillStyle = "rgba(0, 76, 217)";
  ctx.fillRect(0, 0, size, size);
}

function agent(ctx, agent) {
  ctx.fillStyle = "rgb(255,255,255)";
  ctx.strokeStyle = "rgba(0, 76, 217)";
  ctx.beginPath();
  ctx.arc(agent.state.x, agent.state.y, agent.state.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function system(ctx, array) {
  for (let i = 0; i < array.length; i++) {
    agent(ctx, array[i]);
  }
}

export { background, agent, system };
