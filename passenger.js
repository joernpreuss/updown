let nextId = 1;

const COLORS = [
  '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3',
  '#f38181', '#aa96da', '#fcbad3', '#a8d8ea'
];

export function createPassenger(originFloor, destinationFloor) {
  if (originFloor === destinationFloor) {
    throw new Error('Destination must differ from origin');
  }

  return {
    id: nextId++,
    originFloor,
    destinationFloor,
    color: COLORS[nextId % COLORS.length]
  };
}

export function resetPassengerId() {
  nextId = 1;
}
