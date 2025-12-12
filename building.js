export class Building {
  constructor(floorCount) {
    this.floorCount = floorCount;
    this.waitingPassengers = new Map();

    // Initialize empty arrays for each floor
    for (let i = 0; i < floorCount; i++) {
      this.waitingPassengers.set(i, []);
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
