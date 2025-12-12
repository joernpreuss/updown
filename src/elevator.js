const SPEED = 1.5; // floors per second
const DOOR_OPEN_TIME = 1000; // ms

export class Elevator {
  constructor(floorCount) {
    this.floorCount = floorCount;
    this.position = 0; // continuous position (0 to floorCount-1)
    this.targetFloor = null;
    this.queue = []; // FCFS queue of floor requests
    this.passengers = [];
    this.doorOpen = false;
    this.doorTimer = 0;
    this.speed = SPEED;
  }

  addRequest(floor) {
    // Add to queue if not already present
    if (!this.queue.includes(floor) && floor !== this.getCurrentFloor()) {
      this.queue.push(floor);
    }
  }

  getCurrentFloor() {
    return Math.round(this.position);
  }

  getPosition() {
    return this.position;
  }

  getPassengers() {
    return this.passengers;
  }

  isMoving() {
    return this.targetFloor !== null && !this.doorOpen;
  }

  isDoorOpen() {
    return this.doorOpen;
  }

  update(deltaTime, building) {
    // Handle door open state
    if (this.doorOpen) {
      this.doorTimer -= deltaTime;
      if (this.doorTimer <= 0) {
        this.doorOpen = false;
        this._processNextRequest();
      }
      return;
    }

    // If no target, get next from queue
    if (this.targetFloor === null) {
      this._processNextRequest();
      return;
    }

    // Move toward target
    const direction = this.targetFloor > this.position ? 1 : -1;
    const moveAmount = (this.speed * deltaTime) / 1000;
    this.position += direction * moveAmount;

    // Check if arrived
    if ((direction === 1 && this.position >= this.targetFloor) ||
        (direction === -1 && this.position <= this.targetFloor)) {
      this.position = this.targetFloor;
      this._arriveAtFloor(building);
    }
  }

  _processNextRequest() {
    if (this.queue.length > 0) {
      this.targetFloor = this.queue.shift();
    } else {
      this.targetFloor = null;
    }
  }

  _arriveAtFloor(building) {
    const floor = this.getCurrentFloor();
    this.doorOpen = true;
    this.doorTimer = DOOR_OPEN_TIME;
    this.targetFloor = null;

    // Exit passengers
    this._exitPassengers(floor);

    // Board passengers
    this._boardPassengers(floor, building);
  }

  _exitPassengers(floor) {
    this.passengers = this.passengers.filter(p => p.destinationFloor !== floor);
  }

  _boardPassengers(floor, building) {
    const waiting = building.getWaitingPassengers(floor);
    for (const passenger of [...waiting]) {
      this.passengers.push(passenger);
      building.removePassenger(passenger);
      // Add destination to queue
      this.addRequest(passenger.destinationFloor);
    }
  }
}
