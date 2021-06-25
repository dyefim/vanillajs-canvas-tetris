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

  // XXX
  cells[13][3] = 1;
  cells[17][4] = 1;
  cells[11][6] = 1;
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

export {
  cells,
  createCells,
  refreshCells,
  cellsRowCount,
  cellsColumnCount,
  cellSize,
};
