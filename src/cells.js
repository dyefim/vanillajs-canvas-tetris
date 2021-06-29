import { canvas, ctx } from './constants/index';

let cells = [];

const cellsRowCount = 20;
const cellsColumnCount = 10;
const cellSize = canvas.height / cellsRowCount;

const createCells = () => {
  for (let r = 0; r < cellsRowCount; r++) {
    cells[r] = [];
    for (let c = 0; c < cellsColumnCount; c++) {
      cells[r][c] = 0;
    }
  }
};

const addHardcodedObstacles = () => {
  if (!cells.length) return;

  cells = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  ];
};

const refreshCells = () => {
  cells.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === 2) {
        cells[rowIndex][cellIndex] = 0;
      }
    });
  });
};

const drawSingleCell = (x, y, isFilled = false) => {
  ctx.beginPath();
  ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);

  //  TODO: remove coordinates hints
  ctx.font = '10px serif';
  ctx.strokeText(`${x}:${y}`, x * cellSize, y * cellSize);

  ctx.fillStyle = isFilled ? '#334' : null;
  ctx.fill();
  ctx.closePath();
};

const drawCells = () => {
  cells.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell) {
        drawSingleCell(cellIndex, rowIndex, true);
      }
    });
  });
};

const vanish = () => {
  cells.forEach((row, index) => {
    if (row.every((c) => c === 1)) {
      cells.splice(index, 1);
      cells.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
  });
};

export {
  cells,
  createCells,
  refreshCells,
  cellsRowCount,
  cellsColumnCount,
  cellSize,
  drawCells,
  drawSingleCell,
  addHardcodedObstacles,
  vanish,
};
