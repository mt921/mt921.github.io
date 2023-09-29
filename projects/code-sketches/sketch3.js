import { randNum } from "../utils/random.js"
import { hsvToRgb } from "../utils/colour_conversions.js";

const canvas = document.getElementById("canvas3");

const width = canvas.clientWidth;
const height = canvas.clientHeight;
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

let array = [];

class Particle {
  constructor(ID, structDNA) {
    this.ID = ID;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.structDNA = structDNA;
    this.hue = randNum(0,360);
  }
  update() {
    this.x = this.x - randNum(-1,1);
    this.y = this.y - randNum(-1, 1);
  }
  clone() {
    return new Particle(this.ID, this.structDNA);
  }
  display() {
    ctx.fillStyle = hsvToRgb(this.hue,100,90);
    ctx.beginPath();
    ctx.fillRect(this.x,this.y,7,7);
    // ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
    ctx.fill();
    // ctx.stroke();
  }
}

function init() {
  for (let i = 0; i < 50; i++) {
    array.push(new Particle(i));
  }
}

function displayParticles() {
  for (let i = 0; i < array.length; i++) {
    array[i].display();
  }
}

function animateParticles() {
  for (let i = 0; i < array.length; i++) {
    array[i].update();
  }
}

init();

function sketch() {
    ctx.fillStyle = "rgb(8,10,35)";
    ctx.fillStyle = "rgb(30,0,200)";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    displayParticles();
    animateParticles();
    requestAnimationFrame(sketch);
}



//Static Sketch
sketch();

//Interactive Sketch
