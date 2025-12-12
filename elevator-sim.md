# updown - Elevator Simulator

Browser-based simulation of an elevator system with visualization.

## MVP - Client-side only

No backend, simulation runs entirely in the browser.

### Structure

```
elevator-sim/
  index.html
  style.css
  main.js         # Entry point, event loop
  elevator.js     # Elevator logic
  building.js     # Building, passengers
  renderer.js     # Canvas visualization
```

### First Iteration

- 1 elevator, 5 floors
- Passengers spawn randomly with destination floor
- Algorithm: FCFS (First Come First Serve)
- Visualization: shaft, cabin, waiting passengers as dots

### Technologies

- Vanilla JavaScript
- Canvas API for rendering
- `requestAnimationFrame` for simulation loop

## Future Extensions

- Multiple elevators
- Various scheduling algorithms (Nearest Car, Zoning, Look/Scan)
- Statistics (wait time, utilization)
- Rush hour scenarios (morning up, evening down)
- FastAPI backend for complex simulations
- Comparison of different strategies

## Interesting Questions

- Where does an empty elevator go?
- Optimal number of elevators for n floors?
- How do long wait times occur?
