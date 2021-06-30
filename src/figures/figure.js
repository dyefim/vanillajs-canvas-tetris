import { canvas } from '../constants/index';
import { cellsColumnCount } from '../constants/fieldSizes';
import { cells, drawCells, refreshCells } from '../field';
import pickNextFigure from '../utils/pickNextFigure';
import getRandomColor from '../utils/getRandomColor';
import clearCanvas from '../utils/clearCanvas';

let figure = pickNextFigure();
let figureColor = getRandomColor();

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
  return cells[1][figuresSpawnOffsetLeft] !== 1;
};

const respawnFigure = () => {
  figurePosition.x = initialFigurePosition.x;
  figurePosition.y = initialFigurePosition.y;

  figure = pickNextFigure();
  figureColor = getRandomColor();
  makeFigure();
};

const canMove = (direction = 'down') => {
  const results = [];

  figure.forEach((row, rowIndex) => {
    row.forEach((point, pointIndex) => {
      const pointY = figurePosition.y + rowIndex;
      const pointX = figurePosition.x + pointIndex;

      let nextCell;

      switch (direction) {
        case 'down': {
          const nextRow = cells[pointY + 1];

          if (!nextRow) {
            return results.push(false);
          }

          nextCell = nextRow[pointX];

          break;
        }
        case 'right': {
          nextCell = cells[pointY][pointX + 1];

          break;
        }

        case 'left': {
          nextCell = cells[pointY][pointX - 1];

          break;
        }
      }

      if (typeof nextCell === 'undefined') {
        return results.push(false);
      }

      if (point !== 0) {
        return results.push(nextCell !== 1);
      }
    });
  });

  return results.every((v) => v);
};

const moveFigure = (direction) => {
  if (!canMove(direction)) {
    return;
  }
  clearCanvas(canvas);
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

const rotate = () => {
  const canMovePoints = [];

  const flipped = figure[0].map((val, index) =>
    figure.map((row) => row[index]).reverse()
  );

  flipped.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell) {
        const cellToFill =
          cells[figurePosition.y + rowIndex + (figureHeight < figureWidth)][
            figurePosition.x + cellIndex
          ];

        canMovePoints.push(cellToFill !== undefined && cellToFill !== 1);
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

  figure = flipped;
  // .map((r) => r.reverse()).reverse();
};

export {
  figure,
  figurePosition,
  makeFigure,
  respawnFigure,
  canSpawnFigure,
  canMove,
  moveFigure,
  rotate,
  figureColor,
};
