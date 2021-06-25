import { canvas, ctx } from '../constants/index';
import {
  cells,
  drawCells,
  refreshCells,
  cellsRowCount,
  cellsColumnCount,
} from '../cells';

const figure = [
  [0, 2],
  [0, 2],
  [0, 2],
];

const figureWidth = figure[0].length;
const figureHeight = figure.length;
const figuresSpawnOffsetLeft = (cellsColumnCount - figureWidth) / 2;

const figurePosition = { x: figuresSpawnOffsetLeft, y: 10 };

const addFigure = () => {
  figure.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell) {
        cells[figurePosition.y + rowIndex][figurePosition.x + cellIndex] = 2;
      }
    });
  });
};

const canMove = (direction = 'down') => {
  const results = [];

  figure.forEach((row, rowIndex) => {
    row.forEach((point, pointIndex) => {
      const pointY = figurePosition.y + rowIndex;
      const pointX = figurePosition.x + pointIndex;

      const nextRow = cells[pointY + 1];

      if (!nextRow) {
        return results.push(false);
      }

      const cellBellow = nextRow[pointX];

      if (point !== 0) {
        results.push(!!nextRow && cellBellow !== 1);
      }
    });
  });

  return results.every((v) => v);
};

const moveFigure = (direction) => {
  if (!canMove(direction)) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  refreshCells();

  switch (direction) {
    case 'left': {
      if (figurePosition.x > 0) {
        figurePosition.x -= 1;
      }
      break;
    }
    case 'right': {
      if (figurePosition.x < cellsColumnCount - figureWidth) {
        figurePosition.x += 1;
      }
      break;
    }
    default: {
      if (cellsRowCount > figurePosition.y + figureHeight) {
        figurePosition.y += 1;
      }
    }
  }

  addFigure();
  drawCells();
};

export {
  figure,
  figureWidth,
  figureHeight,
  figuresSpawnOffsetLeft,
  figurePosition,
  addFigure,
  canMove,
  moveFigure,
};