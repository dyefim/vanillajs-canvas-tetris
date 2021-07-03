import tetramino from '../tetramino/index';

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
      tetramino.tryToRotate();
      break;

    case 'Down':
    case 'ArrowDown':
      tetramino.drop();
  }
};

const initKeyboardControl = () => {
  document.addEventListener('keydown', keyDownHandler, false);
};

export default initKeyboardControl;
