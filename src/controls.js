import { moveFigure, rotate, canMove } from './figures/figure';
import score from './score';
import { drawOnOverlay } from './overlay';

const scoreUpForFastDropping = () => {
  if (canMove()) {
    score.adjust(1);
    drawOnOverlay();
  }
};

const keyDownHandler = (event) => {
  switch (event.key) {
    case 'Right':
    case 'ArrowRight':
      moveFigure('right');
      break;

    case 'Left':
    case 'ArrowLeft':
      moveFigure('left');
      break;

    case 'Up':
    case 'ArrowUp':
      rotate();
      break;

    case 'Down':
    case 'ArrowDown':
      moveFigure('down');
      scoreUpForFastDropping();
  }
};

export { keyDownHandler };
