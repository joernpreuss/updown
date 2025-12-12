# Requirements Document

## Introduction
Browser-based elevator simulation with Canvas visualization. Single elevator, 5 floors, passengers spawn randomly with destination floors. FCFS (First Come First Serve) scheduling algorithm. Visualization shows shaft, cabin, and waiting passengers as dots. Built with vanilla JavaScript using Canvas API and requestAnimationFrame for the simulation loop.

## Requirements

### Requirement 1: Building Structure
**Objective:** As a user, I want to see a building with multiple floors and an elevator shaft, so that I can observe the elevator system layout.

#### Acceptance Criteria
1. The Simulator shall display a building with exactly 5 floors numbered 0 to 4
2. The Simulator shall display an elevator shaft connecting all floors
3. The Simulator shall display floor indicators showing the floor number for each level

### Requirement 2: Elevator Movement
**Objective:** As a user, I want to see the elevator cabin move between floors, so that I can observe how the elevator serves requests.

#### Acceptance Criteria
1. The Simulator shall display an elevator cabin within the shaft
2. When the elevator receives a destination, the Elevator shall move toward that floor at a constant speed
3. When the elevator arrives at a floor, the Elevator shall stop and open doors
4. While the elevator is moving, the Simulator shall animate the cabin position smoothly

### Requirement 3: Passenger Spawning
**Objective:** As a user, I want passengers to appear randomly on floors, so that the simulation has dynamic demand.

#### Acceptance Criteria
1. The Simulator shall spawn passengers at random intervals on random floors
2. When a passenger spawns, the Simulator shall assign a random destination floor different from the current floor
3. The Simulator shall display waiting passengers as dots on their origin floor

### Requirement 4: Passenger Boarding and Exiting
**Objective:** As a user, I want passengers to enter and exit the elevator, so that I can see the transport process.

#### Acceptance Criteria
1. When the elevator stops at a floor with waiting passengers, the Elevator shall allow passengers to board
2. When a passenger boards, the Simulator shall remove the passenger dot from the floor
3. When the elevator arrives at a passenger's destination floor, the Elevator shall allow the passenger to exit
4. When a passenger exits, the Simulator shall remove the passenger from the elevator

### Requirement 5: FCFS Scheduling Algorithm
**Objective:** As a user, I want the elevator to serve requests in the order they were made, so that I can observe the First Come First Serve algorithm.

#### Acceptance Criteria
1. The Elevator shall maintain a queue of floor requests in arrival order
2. When a passenger calls the elevator, the Elevator shall add the request to the end of the queue
3. When the elevator becomes idle, the Elevator shall process the next request from the front of the queue
4. While the queue is empty, the Elevator shall remain at the current floor

### Requirement 6: Canvas Visualization
**Objective:** As a user, I want a clear visual representation of the simulation, so that I can easily understand the system state.

#### Acceptance Criteria
1. The Simulator shall render all elements using the Canvas API
2. The Simulator shall update the visualization on each animation frame using requestAnimationFrame
3. The Simulator shall display the elevator cabin as a distinct rectangle
4. The Simulator shall display waiting passengers as colored dots near their floor
5. The Simulator shall display passengers inside the elevator distinctly from waiting passengers

### Requirement 7: Simulation Control
**Objective:** As a user, I want to start, stop, and observe the simulation, so that I can control and see the elevator system in action.

#### Acceptance Criteria
1. When the page loads, the Simulator shall initialize the building, elevator, and renderer
2. When the page loads, the Simulator shall start in paused state
3. The Simulator shall display a Start button when paused
4. The Simulator shall display a Stop button when running
5. When the user clicks Start, the Simulator shall resume the simulation loop
6. When the user clicks Stop, the Simulator shall pause the simulation loop
