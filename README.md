# updown - Elevator Simulator

Browser-based elevator simulation with Canvas visualization.

## About This Repository

This repository demonstrates **Spec-Driven Development (SDD)** using [cc-sdd](https://github.com/gotalab/cc-sdd). The `.kiro/` and `.claude/commands/kiro/` directories are intentionally committed to show the SDD workflow:

1. **spec-init** - Initialize specification structure
2. **spec-requirements** - Generate EARS-format requirements
3. **spec-design** - Create technical design document
4. **spec-tasks** - Break down into implementation tasks
5. **spec-impl** - Implement with TDD methodology

## Specification Files

- [requirements.md](.kiro/specs/elevator-simulator/requirements.md) - What to build
- [design.md](.kiro/specs/elevator-simulator/design.md) - How to build it
- [research.md](.kiro/specs/elevator-simulator/research.md) - Design decisions and rationale
- [tasks.md](.kiro/specs/elevator-simulator/tasks.md) - Implementation tasks

## Development

Open `index.html` in a browser - no build step required.

## Tech Stack

- Vanilla JavaScript (ES6+)
- Canvas API for rendering
- requestAnimationFrame for animation loop
