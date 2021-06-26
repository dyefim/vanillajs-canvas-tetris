import { cells, createCells, drawCells, addHardcodedObstacles } from './cells';
import { moveFigure, makeFigure, respawnFigure } from './figures/figure';
import { keyDownHandler } from './controls';
import { figure, figurePosition, canMove } from './figures/figure';

createCells();

const moveTimer = 500;

const land = () => {
  figure.forEach((row, rowIndex) => {
    row.forEach((point, pointIndex) => {
      const pointY = figurePosition.y + rowIndex;
      const pointX = figurePosition.x + pointIndex;

      if (point) cells[pointY][pointX] = 1;
    });
  });
};

function play() {
  drawCells();

  addHardcodedObstacles();

  makeFigure();

  setInterval(() => {
    if (canMove('down')) {
      moveFigure('down');
    } else {
      land();
      respawnFigure();
    }
  }, moveTimer);

  console.table(cells);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('load', play());
