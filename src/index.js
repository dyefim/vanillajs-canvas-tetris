// import { canvas, ctx } from './constants/index';
import { cells, createCells, drawCells,addHardcodedObstacles } from './cells';
import { moveFigure, addFigure } from './figures/figure';

createCells();

const moveTimer = 500

function draw() {
  drawCells();
  addHardcodedObstacles();

  addFigure();

  setInterval(() => moveFigure('down'), moveTimer);

  console.table(cells);
}

document.addEventListener('load', draw());
