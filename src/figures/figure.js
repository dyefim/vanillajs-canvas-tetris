import { canvas, ctx } from '../constants/index';
import { cells, drawCells, refreshCells, cellsColumnCount } from '../cells';
import pickNextFigure from '../utils/pickNextFigure';

let figure = pickNextFigure();

let figureWidth = figure[0].length;
let figureHeight = figure.length;
let figuresSpawnOffsetLeft = Math.floor((cellsColumnCount - figureWidth) / 2);

const initialFigurePosition = { x: figuresSpawnOffsetLeft, y: 0 };

const figurePosition = { ...initialFigurePosition };

const makeFigure = () => {
  figure.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell) {
        cells[figurePosition.y + rowIndex][figurePosition.x + cellIndex] = 2;
      }
    });
  });
};

const canSpawnFigure = () => {
  return cells[1][figuresSpawnOffsetLeft] !== 1
};

const respawnFigure = () => {
  figurePosition.x = initialFigurePosition.x;
  figurePosition.y = initialFigurePosition.y;

  figure = pickNextFigure();
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

const flip = () => {
  const canMovePoints = [];

  const flipped = figure[0].map((val, index) =>
    figure.map((row) => row[index]).reverse()
  );

  flipped.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell) {
        canMovePoints.push(
          cells[figurePosition.y + rowIndex + (figureHeight < figureWidth)][
            figurePosition.x + cellIndex
          ] !== 1
        );
      }
    });
  });

  if (!canMovePoints.every(Boolean)) {
    return;
  }

  figureWidth = flipped[0].length;
  figureHeight = flipped.length;
  figuresSpawnOffsetLeft = Math.floor(
    (cellsColumnCount - flipped[0].length) / 2
  );

  if (figureHeight < figureWidth) {
    // figurePosition.x += 1;
  }

  figure = flipped;
  // .map((r) => r.reverse()).reverse();
};

export {
  figure,
  figureWidth,
  figureHeight,
  figuresSpawnOffsetLeft,
  figurePosition,
  makeFigure,
  respawnFigure,canSpawnFigure,
  canMove,
  moveFigure,
  flip,
  initialFigurePosition,
};
