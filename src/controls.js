import { moveFigure } from './figures/figure';

const keyDownHandler = (event) => {
  if (event.key == 'Right' || event.key == 'ArrowRight') {
    moveFigure('right');
  } else if (event.key == 'Left' || event.key == 'ArrowLeft') {
    moveFigure('left');
  }
};

export { keyDownHandler };
