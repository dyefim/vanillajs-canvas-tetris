import { createField, drawCells, vanish } from './field';
import initControls from './controls';
import tetramino from './tetramino/index';
import { drawOnOverlay } from './overlay';
import drawNextTetraminoOverlay from './nextTetraminoOverlay';
import score from './score';

createField();

const moveInterval = 500;

let isGameOver = false;

const play = () =>
  setInterval(() => {
    if (isGameOver) return;
    drawNextTetraminoOverlay();

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
        alert('GAME OVER! \n Your score is: ' + score.points);
        location.reload();
      }
    }
  }, moveInterval);

const game = () => {
  drawCells();
  drawOnOverlay();
  drawNextTetraminoOverlay();

  tetramino.summon();

  play();

  // console.table(cells);
};

document.addEventListener('load', initControls());
document.addEventListener('load', game());
