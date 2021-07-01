import field from './field';
import initControls from './controls';
import tetramino from './tetramino/index';
import { drawOnTopOverlay } from './overlays/topOverlay';
import drawNextTetraminoOverlay from './overlays/nextTetraminoOverlay';
import score from './score';

export const cellsColumnCount = 10;

const moveInterval = 500;

let isGameOver = false;

const gameOverMessage = 'GAME OVER! \n Your score is: ' + score.points;

const play = () =>
  setInterval(() => {
    if (isGameOver) return;
    drawNextTetraminoOverlay();

    if (tetramino.canMove('down')) {
      tetramino.move('down');
    } else {
      tetramino.land();
      field.vanish();

      drawOnTopOverlay(); // update score
      if (tetramino.canSpawn()) {
        tetramino.respawn();
      } else {
        isGameOver = true;
        alert(gameOverMessage);
        location.reload();
      }
    }
  }, moveInterval);

const game = () => {
  // field.drawCells();

  drawOnTopOverlay();
  drawNextTetraminoOverlay();

  // tetramino.summon();

  play();
  // console.table(cells);
};

document.addEventListener('load', initControls());
document.addEventListener('load', game());
