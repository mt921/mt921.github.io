function createDiv(id, parent) {
  let divWrapper = document.createElement("div");
  parent.appendChild(divWrapper);

  return {
    id: id,
  };
}

export { createDiv };
