import { createPassenger } from './passenger.js';

const SPAWN_INTERVAL_MIN = 2000; // ms
const SPAWN_INTERVAL_MAX = 5000; // ms

export class Building {
  constructor(floorCount) {
    this.floorCount = floorCount;
    this.waitingPassengers = new Map();
    this.elevator = null;
    this.timeSinceLastSpawn = 0;
    this.nextSpawnTime = this._randomSpawnTime();

    // Initialize empty arrays for each floor
    for (let i = 0; i < floorCount; i++) {
      this.waitingPassengers.set(i, []);
    }
  }

  setElevator(elevator) {
    this.elevator = elevator;
  }

  _randomSpawnTime() {
    return SPAWN_INTERVAL_MIN + Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN);
  }

  _randomFloor() {
    return Math.floor(Math.random() * this.floorCount);
  }

  update(deltaTime) {
    this.timeSinceLastSpawn += deltaTime;

    if (this.timeSinceLastSpawn >= this.nextSpawnTime) {
      this._spawnPassenger();
      this.timeSinceLastSpawn = 0;
      this.nextSpawnTime = this._randomSpawnTime();
    }
  }

  _spawnPassenger() {
    const origin = this._randomFloor();
    let destination;
    do {
      destination = this._randomFloor();
    } while (destination === origin);

    const passenger = createPassenger(origin, destination);
    this.addWaitingPassenger(passenger);

    // Notify elevator of new request
    if (this.elevator) {
      this.elevator.addRequest(origin);
    }
  }

  getWaitingPassengers(floor) {
    return this.waitingPassengers.get(floor) || [];
  }

  addWaitingPassenger(passenger) {
    const floor = passenger.originFloor;
    const passengers = this.waitingPassengers.get(floor);
    if (passengers) {
      passengers.push(passenger);
    }
  }

  removePassenger(passenger) {
    const floor = passenger.originFloor;
    const passengers = this.waitingPassengers.get(floor);
    if (passengers) {
      const index = passengers.findIndex(p => p.id === passenger.id);
      if (index !== -1) {
        passengers.splice(index, 1);
      }
    }
  }

  getAllWaitingPassengers() {
    const all = [];
    for (const passengers of this.waitingPassengers.values()) {
      all.push(...passengers);
    }
    return all;
  }
}
