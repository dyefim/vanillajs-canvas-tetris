import field from './field';
import initControls from './controls';
import tetramino from './tetramino/index';
import { renderOnTopOverlay } from './overlays/topOverlay';
import renderNextTetraminoOverlay from './overlays/nextTetraminoOverlay';
import score from './score';

class Tetris {
  constructor(initialLevel = 0) {
    this.initialLevel = initialLevel;
    this.level = 0;

    this.accountOfVanishedLines = 9;
    this.speedMultiplier = 1.26;

    this.initialGameSpeed = 500;
    this.gameSpeed = this.initialGameSpeed;

    this.isGameOver = false;

    this.changeLevel();
    this.updateGameSpeed();

    renderNextTetraminoOverlay();
    renderOnTopOverlay();
    initControls();
  }

  updateGameSpeed() {
    this.speedMultiplier = 1.26 + this.level * 0.02;
    this.gameSpeed = this.initialGameSpeed / this.speedMultiplier;
  }

  changeLevel() {
    while (this.accountOfVanishedLines >= 10) {
      const progress = this.level - this.initialLevel;

      const priceOfNextLevel = progress <= 25 ? 10 : 50;
      this.accountOfVanishedLines -= priceOfNextLevel;

      this.level += 1;
    }
  }

  landing() {
    tetramino.land();
    field.vanish();

    this.changeLevel();
    this.updateGameSpeed();

    renderOnTopOverlay(); // update score
  }

  endGame() {
    this.isGameOver = true;
    alert('GAME OVER! \n Your score is: ' + score.points);
    location.reload();
  }

  tryToRespawn() {
    if (tetramino.canSpawn()) {
      tetramino.respawn();
    } else {
      this.endGame();
    }
  }

  resume() {
    if (tetramino.canMove('down')) {
      tetramino.move('down');
    } else {
      this.landing();
      this.tryToRespawn();
    }
  }

  game() {
    if (this.isGameOver) return;

    this.resume();

    setTimeout(() => this.game(), this.gameSpeed);
  }

  start() {
    this.game();
  }
}

const tetris = new Tetris();

document.addEventListener('load', tetris.start());

export default tetris;
