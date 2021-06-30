import { cells, createField, drawCells, vanish } from './field';
import {
  moveFigure,
  makeFigure,
  respawnFigure,
  canSpawnFigure,
} from './figures/figure';
import { keyDownHandler } from './controls';
import { figure, figurePosition, canMove } from './figures/figure';
import { drawOnOverlay } from './overlay';

createField();

const moveInterval = 500;

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

const play = () =>
  setInterval(() => {
    if (isGameOver) return;

    if (canMove('down')) {
      moveFigure('down');
    } else {
      land();
      vanish();
      drawOnOverlay();
      if (canSpawnFigure()) {
        respawnFigure();
      } else {
        isGameOver = true;
        alert('GAME OVER!');
        location.reload();
      }
    }
  }, moveInterval);

const game = () => {
  drawCells();
  drawOnOverlay();

  makeFigure();

  play();

  // console.table(cells);
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('load', game());
