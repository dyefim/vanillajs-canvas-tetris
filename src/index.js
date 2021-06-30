import { createField, drawCells, vanish } from './field';
import { keyDownHandler } from './controls';
import tetramino from './tetramino/index';
import { drawOnOverlay } from './overlay';

createField();

const moveInterval = 500;

let isGameOver = false;

const play = () =>
  setInterval(() => {
    if (isGameOver) return;

    if (tetramino.canMove('down')) {
      tetramino.move('down');
    } else {
      tetramino.land();
      vanish();
      drawOnOverlay();
      if (tetramino.canSpawn()) {
        tetramino.respawn();
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

  tetramino.summon();

  play();

  // console.table(cells);
};

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('load', game());
