import { canvas, ctx } from './constants/index';
import {
  cells,
  createCells,
  refreshCells,
  cellsRowCount,
  cellsColumnCount,
  cellSize,
} from './cells';
import {
  figure,
  figureWidth,
  figureHeight,
  figuresSpawnOffsetLeft,
  figurePosition,
} from './figure';

createCells();

const drawSingleCell = (x, y, isFilled = false) => {
  ctx.beginPath();
  ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
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
  const bottom = figure[figure.length - 1];

  let canMove = true;

  bottom.reduce((_, point, i) => {
    if (cells[figurePosition.y + figureHeight][figurePosition.x + i]) {
      canMove = false;
    }
  }, []);

  return canMove;
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

function draw() {
  drawCells();
  addFigure();
  setInterval(() => moveFigure('down'), 150);

  console.table(cells);
}

document.addEventListener('load', draw());
