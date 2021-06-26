import { canvas, ctx } from '../constants/index';
import { cells, drawCells, refreshCells, cellsColumnCount } from '../cells';

const figure = [
  [2, 2],
  [0, 2],
  [0, 2],
  // [2, 2],
  // [2, 0],
  // [2, 0],
];

const figureWidth = figure[0].length;
const figureHeight = figure.length;
const figuresSpawnOffsetLeft = (cellsColumnCount - figureWidth) / 2;

const initialFigurePosition = { x: figuresSpawnOffsetLeft, y: 0 };

let figurePosition = { ...initialFigurePosition };

const makeFigure = () => {
  figure.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell) {
        cells[figurePosition.y + rowIndex][figurePosition.x + cellIndex] = 2;
      }
    });
  });
};

const respawnFigure = () => {
  figurePosition = { ...initialFigurePosition };

  makeFigure();
};

const canMove = (direction = 'down') => {
  const results = [];

  switch (direction) {
    case 'down': {
      figure.forEach((row, rowIndex) => {
        row.forEach((point, pointIndex) => {
          const pointY = figurePosition.y + rowIndex;
          const pointX = figurePosition.x + pointIndex;

          const nextRow = cells[pointY + 1];

          if (!nextRow) {
            return results.push(false);
          }

          const nextCell = nextRow[pointX];

          if (typeof nextCell === 'undefined') {
            return results.push(false);
          }

          if (point !== 0) {
            results.push(!!nextRow && nextCell !== 1);
          }
        });
      });

      return results.every((v) => v);
    }
    case 'right': {
      figure.forEach((row, rowIndex) => {
        row.forEach((point, pointIndex) => {
          const pointY = figurePosition.y + rowIndex;
          const pointX = figurePosition.x + pointIndex;

          const nextCell = cells[pointY][pointX + 1];

          if (typeof nextCell === 'undefined') {
            return results.push(false);
          }

          if (point !== 0) {
            return results.push(nextCell !== 1);
          }
        });
      });

      return results.every((v) => v);
    }

    case 'left': {
      figure.forEach((row, rowIndex) => {
        row.forEach((point, pointIndex) => {
          const pointY = figurePosition.y + rowIndex;
          const pointX = figurePosition.x + pointIndex;

          const nextCell = cells[pointY][pointX - 1];

          if (typeof nextCell === 'undefined') {
            return results.push(false);
          }

          if (point !== 0) {
            return results.push(nextCell !== 1);
          }
        });
      });

      return results.every((v) => v);
    }
  }
};

const moveFigure = (direction) => {
  if (!canMove(direction)) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  refreshCells();

  switch (direction) {
    case 'left': {
      figurePosition.x -= 1;
      break;
    }
    case 'right': {
      figurePosition.x += 1;
      break;
    }
    default: {
      figurePosition.y += 1;
    }
  }

  makeFigure();
  drawCells();
};

export {
  figure,
  figureWidth,
  figureHeight,
  figuresSpawnOffsetLeft,
  figurePosition,
  makeFigure,
  respawnFigure,
  canMove,
  moveFigure,
  initialFigurePosition,
};
