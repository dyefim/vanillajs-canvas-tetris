import tetramino from '../tetramino/index';

const initButtonControl = () => {
  const controlsContainer = document.getElementById('controls');

  const leftButton = controlsContainer.getElementsByClassName('left')[0];
  const rightButton = controlsContainer.getElementsByClassName('right')[0];
  const rotatingButton = controlsContainer.getElementsByClassName('rotate')[0];
  const dropingButton = controlsContainer.getElementsByClassName('drop')[0];

  leftButton.onclick = () => tetramino.move('left');
  rightButton.onclick = () => tetramino.move('right');
  rotatingButton.onclick = () => tetramino.tryToRotate();
  dropingButton.onclick = () => tetramino.drop();
};

export default initButtonControl;
