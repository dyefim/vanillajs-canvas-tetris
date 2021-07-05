import tetris from '../main';

const keyDownHandler = (event) => {
  switch (event.key) {
    case 'Right':
    case 'ArrowRight':
      tetris.currentTetramino.move('right');
      break;

    case 'Left':
    case 'ArrowLeft':
      tetris.currentTetramino.move('left');
      break;

    case 'Up':
    case 'ArrowUp':
      tetris.currentTetramino.tryToRotate();
      break;

    case 'Down':
    case 'ArrowDown':
      tetris.currentTetramino.drop();
  }
};

const initKeyboardControl = () => {
  document.addEventListener('keydown', keyDownHandler, false);
};

export default initKeyboardControl;
