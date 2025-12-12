# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**updown** is a browser-based elevator simulation with visualization. Pure client-side implementation - no backend required for MVP.

## Development

Open `index.html` directly in browser - no build step or server needed.

## Architecture

```
main.js         # Entry point, simulation event loop (requestAnimationFrame)
elevator.js     # Elevator logic and state
building.js     # Building structure, passenger spawning and destinations
renderer.js     # Canvas-based visualization
```

**Simulation Flow:** main.js runs the loop → building.js spawns passengers → elevator.js handles movement/scheduling → renderer.js draws current state

## Technical Constraints

- Vanilla JavaScript only (no frameworks)
- Canvas API for rendering
- FCFS (First Come First Serve) algorithm for MVP
- Initial scope: 1 elevator, 5 floors
