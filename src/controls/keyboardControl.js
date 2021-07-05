import tetris from '../main';

const keyDownHandler = (event) => {
  switch (event.key) {
    case 'Right':
    case 'ArrowRight':
      tetris.currentTetromino.move('right');
      break;

    case 'Left':
    case 'ArrowLeft':
      tetris.currentTetromino.move('left');
      break;

    case 'Up':
    case 'ArrowUp':
      tetris.currentTetromino.tryToRotate();
      break;

    case 'Down':
    case 'ArrowDown':
      tetris.currentTetromino.drop();
  }
};

const initKeyboardControl = () => {
  document.addEventListener('keydown', keyDownHandler, false);
};

export default initKeyboardControl;
