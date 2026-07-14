# Rat in a Maze Visualizer

A simple visualization of the classic **Rat in a Maze** problem using the **Backtracking** algorithm.

## Features

- Interactive 10×10 maze
- Click cells to create or remove walls
- Step-by-step backtracking visualization
- Highlights explored cells, backtracked cells, and the final path
- Clear and Reset options

## How to Run

Clone the repository and open the project folder.

Start a local server:

```bash
python -m http.server 8000
```

or

```bash
python3 -m http.server 8000
```

Then open your browser and visit:

```
http://localhost:8000
```

## Technologies Used

- HTML
- CSS
- JavaScript

## Algorithm

This project uses the **Backtracking** algorithm to recursively explore
possible paths from the start cell to the destination. If a path leads to a dead end,
the algorithm backtracks and tries another direction until a valid path is found or all possibilities have been explored.
