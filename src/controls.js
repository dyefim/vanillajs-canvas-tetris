import { moveFigure, flip } from './figures/figure';

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
      flip();
      break;

    case 'Down':
    case 'ArrowDown':
      moveFigure('down');
  }
};

export { keyDownHandler };