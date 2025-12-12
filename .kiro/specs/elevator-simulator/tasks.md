# Implementation Plan

## Tasks

- [x] 1. Project Setup and HTML Structure
- [x] 1.1 Create the HTML page with canvas and controls
  - Set up index.html with canvas element and Start/Stop buttons
  - Add basic CSS for canvas container and button layout
  - Include script tags for ES6 modules
  - _Requirements: 6.1, 7.3, 7.4_

- [ ] 2. Domain Layer: Passenger and Building
- [x] 2.1 (P) Implement passenger data structure
  - Create passenger with id, origin floor, destination floor, and color
  - Ensure destination differs from origin
  - Generate unique colors for visual distinction
  - _Requirements: 3.2_

- [x] 2.2 Implement building with floor management
  - Create building class with configurable floor count (5 floors)
  - Maintain waiting passengers per floor using a map structure
  - Provide methods to get and remove waiting passengers
  - _Requirements: 1.1, 1.2, 1.3_

- [x] 2.3 Add passenger spawning logic
  - Spawn passengers at random intervals during update cycle
  - Assign random origin and destination floors
  - Add spawned passengers to the waiting list for their origin floor
  - Notify elevator of new floor requests
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 3. Domain Layer: Elevator
- [x] 3.1 Implement elevator state and movement
  - Track position as continuous value for smooth animation
  - Move toward target floor at constant speed using delta time
  - Stop and open doors when arriving at a floor
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 3.2 Implement FCFS request queue
  - Maintain queue of floor requests in arrival order
  - Add new requests to end of queue
  - Process next request from front when idle
  - Remain at current floor when queue is empty
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 3.3 Implement passenger boarding and exiting
  - Board waiting passengers when doors open at their floor
  - Exit passengers when arriving at their destination floor
  - Coordinate with building to remove boarded passengers from waiting list
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 4. Presentation Layer: Renderer
- [x] 4.1 Set up canvas rendering foundation
  - Initialize canvas context and store references to building and elevator
  - Clear and redraw canvas each frame
  - Establish coordinate system and scaling for 5 floors
  - _Requirements: 6.1, 6.2_

- [x] 4.2 Render building structure
  - Draw floor lines and elevator shaft
  - Display floor numbers beside each level
  - _Requirements: 1.2, 1.3, 6.1_

- [x] 4.3 Render elevator cabin
  - Draw elevator as distinct rectangle at current position
  - Show door state visually (open/closed)
  - _Requirements: 2.1, 6.3_

- [x] 4.4 Render passengers
  - Display waiting passengers as colored dots near their floor
  - Display passengers inside elevator distinctly from waiting passengers
  - Use passenger color for visual identification
  - _Requirements: 3.3, 6.4, 6.5_

- [ ] 5. Application Layer: Main Loop and Controls
- [ ] 5.1 Initialize simulation components
  - Create building, elevator, and renderer instances on page load
  - Start simulation in paused state
  - _Requirements: 7.1, 7.2_

- [ ] 5.2 Implement animation loop with delta time
  - Use requestAnimationFrame for smooth 60fps updates
  - Calculate delta time between frames
  - Update building and elevator, then render
  - _Requirements: 6.2_

- [ ] 5.3 Implement Start/Stop controls
  - Show Start button when paused, Stop button when running
  - Start button resumes animation loop
  - Stop button pauses animation loop and cancels animation frame
  - _Requirements: 7.3, 7.4, 7.5, 7.6_

- [ ] 6. Integration and Testing
- [ ] 6.1 Wire all components together
  - Connect building passenger spawning to elevator requests
  - Connect elevator state to renderer for visualization
  - Verify full simulation loop works end-to-end
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1_

- [ ] 6.2 Manual verification
  - Test smooth elevator animation between floors
  - Verify passengers appear, board, and exit correctly
  - Confirm Start/Stop controls work as expected
  - Check FCFS queue processes requests in order
  - _Requirements: 2.4, 4.1, 4.3, 5.3, 7.5, 7.6_
