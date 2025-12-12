# Research & Design Decisions

## Summary
- **Feature**: elevator-simulator
- **Discovery Scope**: New Feature (greenfield)
- **Key Findings**:
  - Pure client-side vanilla JavaScript requires no external dependencies
  - Canvas API and requestAnimationFrame are mature, well-documented browser APIs
  - Simple module pattern sufficient for this scope (no bundler needed)

## Research Log

### Canvas API for Animation
- **Context**: Need to render building, elevator, and passengers with smooth animation
- **Sources Consulted**: MDN Canvas API documentation, requestAnimationFrame specs
- **Findings**:
  - Canvas 2D context provides simple drawing primitives (fillRect, arc, fillText)
  - requestAnimationFrame automatically syncs with display refresh rate (~60fps)
  - Delta-time based animation ensures consistent speed across devices
- **Implications**: No external libraries needed; standard browser APIs sufficient

### FCFS Queue Implementation
- **Context**: Elevator scheduling algorithm for MVP
- **Sources Consulted**: Standard queue data structure patterns
- **Findings**:
  - JavaScript arrays with push/shift provide O(1) amortized queue operations
  - Simple array-based queue sufficient for simulation scale
- **Implications**: No need for specialized data structure library

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| Simple Modules | Separate JS files for each concern | Clear separation, no build step | No module bundling | Matches project constraint (vanilla JS) |
| ES6 Modules | Native browser module support | Modern syntax, explicit imports | Requires type="module" in script tag | Could use for cleaner imports |
| Single File | All code in one file | Simplest setup | Poor maintainability | Not recommended |

**Selected**: Simple Modules with potential ES6 module syntax if supported.

## Design Decisions

### Decision: Module Structure
- **Context**: Need to separate concerns while keeping vanilla JS constraint
- **Alternatives Considered**:
  1. Single file - simple but unmaintainable
  2. IIFE modules - older pattern, verbose
  3. ES6 modules - modern, clean syntax
- **Selected Approach**: ES6 modules with type="module" script tag
- **Rationale**: Modern browsers support ES6 modules natively; provides clean imports without build step
- **Trade-offs**: Requires local server for development (file:// protocol doesn't support modules)
- **Follow-up**: Test in target browsers

### Decision: Animation Loop Architecture
- **Context**: Need smooth animation with consistent timing
- **Alternatives Considered**:
  1. setInterval - fixed timing, not synced to display
  2. setTimeout recursion - similar issues
  3. requestAnimationFrame with delta time - optimal for animation
- **Selected Approach**: requestAnimationFrame with delta-time calculations
- **Rationale**: Browser-optimized, pauses when tab inactive, consistent visual updates
- **Trade-offs**: More complex timing logic than setInterval
- **Follow-up**: Implement pause/resume correctly with animation frame cancellation

### Decision: State Management
- **Context**: Track elevator position, passengers, queue across modules
- **Alternatives Considered**:
  1. Global state object - simple but tightly coupled
  2. Class instances with encapsulated state - OOP approach
  3. Module-scoped state - functional approach
- **Selected Approach**: Class instances (Building, Elevator, Passenger) with encapsulated state
- **Rationale**: Clear ownership, testable, aligns with real-world domain model
- **Trade-offs**: Slightly more boilerplate than global state
- **Follow-up**: Define clear interfaces between classes

## Risks & Mitigations
- **Risk**: ES6 modules require server (not file://) → Mitigation: Document requirement, suggest simple HTTP server
- **Risk**: Canvas performance with many passengers → Mitigation: Limit spawn rate, batch rendering
- **Risk**: Animation timing drift → Mitigation: Use delta-time, not fixed increments

## References
- [MDN Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) — primary rendering documentation
- [MDN requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) — animation loop reference
- [ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) — native module support
