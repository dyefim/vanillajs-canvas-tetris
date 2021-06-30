import tetramino from './tetramino/index';
import score from './score';
import { drawOnOverlay } from './overlay';

const scoreUpForFastDropping = () => {
  if (tetramino.canMove()) {
    score.adjust(1);
    drawOnOverlay();
  }
};

const keyDownHandler = (event) => {
  switch (event.key) {
    case 'Right':
    case 'ArrowRight':
      tetramino.move('right');
      break;

    case 'Left':
    case 'ArrowLeft':
      tetramino.move('left');
      break;

    case 'Up':
    case 'ArrowUp':
      tetramino.rotate();
      break;

    case 'Down':
    case 'ArrowDown':
      tetramino.move('down');
      scoreUpForFastDropping();
  }
};

export { keyDownHandler };
