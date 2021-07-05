import tetris from '../main';

const initButtonControl = () => {
  const controlsContainer = document.getElementById('controls');

  const leftButton = controlsContainer.getElementsByClassName('left')[0];
  const rightButton = controlsContainer.getElementsByClassName('right')[0];
  const rotatingButton = controlsContainer.getElementsByClassName('rotate')[0];
  const dropingButton = controlsContainer.getElementsByClassName('drop')[0];

  leftButton.onclick = () => tetris.currentTetromino.move('left');
  rightButton.onclick = () => tetris.currentTetromino.move('right');
  rotatingButton.onclick = () => tetris.currentTetromino.tryToRotate();
  dropingButton.onclick = () => tetris.currentTetromino.drop();
};

export default initButtonControl;
