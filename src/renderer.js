const FLOOR_HEIGHT = 80;
const SHAFT_WIDTH = 60;
const SHAFT_X = 200;
const CABIN_WIDTH = 50;
const CABIN_HEIGHT = 60;
const PASSENGER_RADIUS = 8;

export class Renderer {
  constructor(canvas, building, elevator) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.building = building;
    this.elevator = elevator;
  }

  render() {
    this._clear();
    this._drawBuilding();
    this._drawElevator();
    this._drawWaitingPassengers();
    this._drawElevatorPassengers();
  }

  _clear() {
    this.ctx.fillStyle = '#16213e';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  _drawBuilding() {
    const ctx = this.ctx;

    // Draw floors
    for (let i = 0; i < this.building.floorCount; i++) {
      const y = this._floorToY(i);

      // Floor line
      ctx.strokeStyle = '#4a5568';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(350, y);
      ctx.stroke();

      // Floor number
      ctx.fillStyle = '#a0aec0';
      ctx.font = '16px system-ui';
      ctx.textAlign = 'right';
      ctx.fillText(`${i}`, 40, y + 5);
    }

    // Draw shaft
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 2;
    ctx.strokeRect(SHAFT_X, 30, SHAFT_WIDTH, this.building.floorCount * FLOOR_HEIGHT);
  }

  _drawElevator() {
    const ctx = this.ctx;
    const y = this._positionToY(this.elevator.getPosition());

    // Cabin
    ctx.fillStyle = this.elevator.isDoorOpen() ? '#4ecca3' : '#a0aec0';
    ctx.fillRect(
      SHAFT_X + (SHAFT_WIDTH - CABIN_WIDTH) / 2,
      y - CABIN_HEIGHT + 10,
      CABIN_WIDTH,
      CABIN_HEIGHT
    );

    // Door indicator
    if (this.elevator.isDoorOpen()) {
      ctx.fillStyle = '#16213e';
      ctx.fillRect(
        SHAFT_X + (SHAFT_WIDTH - CABIN_WIDTH) / 2 + 5,
        y - CABIN_HEIGHT + 15,
        CABIN_WIDTH - 10,
        CABIN_HEIGHT - 10
      );
    }
  }

  _drawWaitingPassengers() {
    const ctx = this.ctx;

    for (let floor = 0; floor < this.building.floorCount; floor++) {
      const passengers = this.building.getWaitingPassengers(floor);
      const y = this._floorToY(floor) - 20;

      passengers.forEach((passenger, index) => {
        const x = 80 + index * (PASSENGER_RADIUS * 2 + 4);
        ctx.fillStyle = passenger.color;
        ctx.beginPath();
        ctx.arc(x, y, PASSENGER_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }

  _drawElevatorPassengers() {
    const ctx = this.ctx;
    const passengers = this.elevator.getPassengers();
    const elevatorY = this._positionToY(this.elevator.getPosition());

    passengers.forEach((passenger, index) => {
      const x = SHAFT_X + 15 + (index % 3) * 15;
      const y = elevatorY - CABIN_HEIGHT + 30 + Math.floor(index / 3) * 15;
      ctx.fillStyle = passenger.color;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  _floorToY(floor) {
    return this.canvas.height - 50 - floor * FLOOR_HEIGHT;
  }

  _positionToY(position) {
    return this.canvas.height - 50 - position * FLOOR_HEIGHT;
  }
}
