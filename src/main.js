import field from './field';
import initControls from './controls';
import tetramino from './tetramino/index';
import { renderOnTopOverlay } from './overlays/topOverlay';
import renderNextTetraminoOverlay from './overlays/nextTetraminoOverlay';
import score from './score';

export const cellsColumnCount = 10;

const moveInterval = 500;

let isGameOver = false;

const gameOverMessage = 'GAME OVER! \n Your score is: ' + score.points;

const play = () =>
  setInterval(() => {
    if (isGameOver) return;
    renderNextTetraminoOverlay();

    if (tetramino.canMove('down')) {
      tetramino.move('down');
    } else {
      tetramino.land();
      field.vanish();

      renderOnTopOverlay(); // update score
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
  // field.renderCells();

  renderOnTopOverlay();
  // renderNextTetraminoOverlay();

  // tetramino.summon();

  play();
  // console.table(cells);
};

document.addEventListener('load', initControls());
document.addEventListener('load', game());
