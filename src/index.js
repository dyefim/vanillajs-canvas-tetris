import { createField, drawCells, vanish } from './field';
import initControls from './controls';
import tetramino from './tetramino/index';
import { drawOnTopOverlay } from './overlays/topOverlay';
import drawNextTetraminoOverlay from './overlays/nextTetraminoOverlay';
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
      drawOnTopOverlay();
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
  drawOnTopOverlay();
  drawNextTetraminoOverlay();

  tetramino.summon();

  play();

  // console.table(cells);
};

document.addEventListener('load', initControls());
document.addEventListener('load', game());
