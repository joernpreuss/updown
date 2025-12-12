import { Building } from './building.js';
import { Elevator } from './elevator.js';
import { Renderer } from './renderer.js';

// DOM elements
const canvas = document.getElementById('canvas');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');

// Simulation state
let isRunning = false;
let animationFrameId = null;
let lastTimestamp = 0;

// Initialize components
const building = new Building(5);
const elevator = new Elevator(5);
building.setElevator(elevator);
const renderer = new Renderer(canvas, building, elevator);

// Animation loop
function gameLoop(timestamp) {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }
  const deltaTime = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  building.update(deltaTime);
  elevator.update(deltaTime, building);
  renderer.render();

  if (isRunning) {
    animationFrameId = requestAnimationFrame(gameLoop);
  }
}

// Controls
function start() {
  isRunning = true;
  lastTimestamp = 0;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  animationFrameId = requestAnimationFrame(gameLoop);
}

function stop() {
  isRunning = false;
  startBtn.disabled = false;
  stopBtn.disabled = true;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

// Event listeners
startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);

// Initial render (paused state)
renderer.render();

console.log('Elevator Simulator ready');
