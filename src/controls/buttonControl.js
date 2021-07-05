import tetris from '../main';

const initButtonControl = () => {
  const controlsContainer = document.getElementById('controls');

  const leftButton = controlsContainer.getElementsByClassName('left')[0];
  const rightButton = controlsContainer.getElementsByClassName('right')[0];
  const rotatingButton = controlsContainer.getElementsByClassName('rotate')[0];
  const dropingButton = controlsContainer.getElementsByClassName('drop')[0];

  leftButton.onclick = () => tetris.currentTetramino.move('left');
  rightButton.onclick = () => tetris.currentTetramino.move('right');
  rotatingButton.onclick = () => tetris.currentTetramino.tryToRotate();
  dropingButton.onclick = () => tetris.currentTetramino.drop();
};

export default initButtonControl;
