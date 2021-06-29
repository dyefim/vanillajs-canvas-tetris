import {
  cells,
  createCells,
  drawCells,
  addHardcodedObstacles,
  vanish,
} from './cells';
import {
  moveFigure,
  makeFigure,
  respawnFigure,
  canSpawnFigure,
} from './figures/figure';
import { keyDownHandler } from './controls';
import { figure, figurePosition, canMove } from './figures/figure';

createCells();

const moveTimer = 1000;

const land = () => {
  figure.forEach((row, rowIndex) => {
    row.forEach((point, pointIndex) => {
      const pointY = figurePosition.y + rowIndex;
      const pointX = figurePosition.x + pointIndex;

      if (point) cells[pointY][pointX] = 1;
    });
  });
};

let isGameOver = false;

function play() {
  drawCells();

  addHardcodedObstacles();

  makeFigure();

  setInterval(() => {
    if (isGameOver) return;

    if (canMove('down')) {
      moveFigure('down');
      // console.log(figurePosition);
    } else {
      land();
      vanish();
      if (canSpawnFigure()) {
        respawnFigure();
      } else {
        isGameOver = true;
        alert('GAME OVER!');
        location.reload();
      }
    }
  }, moveTimer);

  console.table(cells);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('load', play());
