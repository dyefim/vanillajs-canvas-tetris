import { ctx } from './constants/index';
import tetramino from './tetramino/index';
import {
  cellSize,
  cellsRowCount,
  cellsColumnCount,
} from './constants/fieldSizes';
import score from './score';

let cells = [];

const createField = () => {
  for (let r = 0; r < cellsRowCount; r++) {
    cells[r] = [];
    for (let c = 0; c < cellsColumnCount; c++) {
      cells[r][c] = 0;
    }
  }
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

const drawSingleCell = (x, y, cellValue = 0) => {
  ctx.beginPath();
  ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);

  // ctx.font = '10px serif';
  // ctx.strokeText(`${x}:${y}`, x * cellSize, y * cellSize);

  if (cellValue === 1) {
    ctx.fillStyle = '#778';
  }

  if (cellValue === 2) {
    ctx.fillStyle = tetramino.color;
  }

  ctx.fill();
  ctx.closePath();
};

const drawCells = () => {
  cells.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell) {
        drawSingleCell(cellIndex, rowIndex, cell);
      }
    });
  });
};

const rewardLineVanishing = () => score.adjust(100);

const vanish = () => {
  cells.forEach((row, index) => {
    if (row.every((c) => c === 1)) {
      cells.splice(index, 1);
      cells.unshift(new Array(cellsRowCount).fill(0));

      rewardLineVanishing();
    }
  });
};

export { cells, createField, refreshCells, drawCells, vanish };
