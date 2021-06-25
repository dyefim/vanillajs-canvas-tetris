const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cellsRowCount = 20;
const cellsColumnCount = 10;
const cellSize = canvas.height / cellsRowCount;

const figure = [
  // [0, 0, 0, 0],
  // [0, 2, 2, 0],
  // [0, 2, 2, 0],
  // [0, 0, 0, 0],
  [2, 2],
  [2, 2],
];

const figureWidth = figure[0].length;
const figureHeight = figure.length;
const figuresSpawnOffsetLeft = (cellsColumnCount - figureWidth) / 2;

const cells = [];
const createCells = () => {
  for (let c = 0; c < cellsRowCount; c++) {
    cells[c] = [];
    for (let r = 0; r < cellsColumnCount; r++) {
      cells[c][r] = 0;
    }
  }

  // XXX
  cells[13][3] = 1;
  cells[17][4] = 1;
  cells[11][6] = 1;

};
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

const figurePosition = { x: figuresSpawnOffsetLeft, y: 0 };

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
  // figurePosition.y + figure

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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  createCells();

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
      if (cellsRowCount > figurePosition.y + figureHeight && canMove('down')) {
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
  // setInterval(() => moveFigure('right'), 450);
  setInterval(() => moveFigure('down'), 150);

  console.table(cells);
}

document.addEventListener('load', draw());
