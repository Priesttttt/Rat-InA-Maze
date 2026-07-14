const maze = document.getElementById("maze");
const solveBtn = document.getElementById("solve-btn");
const clearBtn = document.getElementById("clear-btn");
const resetBtn = document.getElementById("reset-btn");
const statusText = document.getElementById("status");

const SIZE = 10;

let grid = [];
let cells = [];
let solving = false;

function createGrid() {
    maze.innerHTML = "";
    grid = [];
    cells = [];

    for (let row = 0; row < SIZE; row++) {
        grid[row] = [];
        cells[row] = [];

        for (let col = 0; col < SIZE; col++) {
            grid[row][col] = 0;

            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (row === 0 && col === 0) {
                cell.classList.add("start");
                cell.textContent = "S";
            } else if (row === SIZE - 1 && col === SIZE - 1) {
                cell.classList.add("end");
                cell.textContent = "E";
            }

            cell.addEventListener("click", () => {
                if (solving) return;

                if (
                    (row === 0 && col === 0) ||
                    (row === SIZE - 1 && col === SIZE - 1)
                ) {
                    return;
                }

                grid[row][col] = grid[row][col] === 0 ? 1 : 0;
                cell.classList.toggle("wall");
            });

            maze.appendChild(cell);
            cells[row][col] = cell;
        }
    }
}

function clearPaths() {
    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            cells[row][col].classList.remove("visited");
            cells[row][col].classList.remove("backtrack");
            cells[row][col].classList.remove("path");
        }
    }

    statusText.textContent = "Click cells to add walls.";
}

function resetMaze() {
    solving = false;

    for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
            grid[row][col] = 0;

            cells[row][col].className = "cell";

            if (row === 0 && col === 0) {
                cells[row][col].classList.add("start");
                cells[row][col].textContent = "S";
            } else if (row === SIZE - 1 && col === SIZE - 1) {
                cells[row][col].classList.add("end");
                cells[row][col].textContent = "E";
            } else {
                cells[row][col].textContent = "";
            }
        }
    }

    statusText.textContent = "Click cells to add walls.";
}

clearBtn.addEventListener("click", clearPaths);
resetBtn.addEventListener("click", resetMaze);

createGrid();

const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function solveMaze(row, col, visited) {
    if (
        row < 0 ||
        col < 0 ||
        row >= SIZE ||
        col >= SIZE ||
        grid[row][col] === 1 ||
        visited[row][col]
    ) {
        return false;
    }

    visited[row][col] = true;

    if (!(row === 0 && col === 0) && !(row === SIZE - 1 && col === SIZE - 1)) {
        cells[row][col].classList.add("visited");
        await delay(80);
    }

    if (row === SIZE - 1 && col === SIZE - 1) {
        return true;
    }

    for (const [dr, dc] of directions) {
        if (await solveMaze(row + dr, col + dc, visited)) {

            if (!(row === 0 && col === 0)) {
                cells[row][col].classList.remove("visited");
                cells[row][col].classList.add("path");
                await delay(80);
            }

            return true;
        }
    }

    if (!(row === 0 && col === 0)) {
        cells[row][col].classList.remove("visited");
        cells[row][col].classList.add("backtrack");
        await delay(80);
    }

    return false;
}

solveBtn.addEventListener("click", async () => {
    if (solving) return;

    solving = true;
    clearPaths();

    const visited = Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(false)
    );

    statusText.textContent = "Solving...";

    const found = await solveMaze(0, 0, visited);

    if (found) {
        statusText.textContent = "Path Found!";
    } else {
        statusText.textContent = "No Path Exists!";
    }

    solving = false;
});