import { canvas, ctx } from './constants/index';

const cells = [];

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

  cells[11][8] = 1;

  // cells[11][2] = 1;
  cells[13][2] = 1;
  cells[9][1] = 1;


  cells[16][4] = 1;
  cells[17][4] = 1;
  cells[18][4] = 1;
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
  ctx.font = "10px serif";
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
};
