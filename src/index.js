// import { canvas, ctx } from './constants/index';
import { cells, createCells, drawCells, addHardcodedObstacles } from './cells';
import { moveFigure, addFigure } from './figures/figure';
import { keyDownHandler } from './controls';

createCells();

const moveTimer = 500;

function draw() {
  drawCells();
  addHardcodedObstacles();

  addFigure();

  setInterval(() => moveFigure('down'), moveTimer);

  console.table(cells);
}


document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('load', draw());
// setInterval(draw, 500)
