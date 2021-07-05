import field from './field';
import initControls from './controls';
import { renderOnTopOverlay } from './overlays/topOverlay';
import score from './score';
import bag from './bag';

class Tetris {
  constructor(initialLevel = 0) {
    this.initialLevel = initialLevel;
    this.level = 0;

    this.accountOfVanishedLines = 0;
    this.speedMultiplier = 1.26;

    this.initialGameSpeed = 500;
    this.gameSpeed = this.initialGameSpeed;

    this.isGameOver = false;

    this.currentTetramino = bag.draw();

    this.changeLevel();
    this.updateGameSpeed();

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
    this.currentTetramino.land();
    field.vanish();

    this.changeLevel();
    this.updateGameSpeed();

    renderOnTopOverlay(); // update score
  }

  endGame() {
    this.isGameOver = true;
    alert(`GAME OVER! \nScore: ${score.points} \nLevel: ${this.level}`);
    location.reload();
  }

  tryToRespawn() {
    const nextTetramino = bag.draw();

    if (field.canSpawn(nextTetramino.spawnOffsetLeft)) {
      this.currentTetramino = nextTetramino;
    } else {
      this.endGame();
    }
  }

  resume() {
    if (this.currentTetramino.canMove('down')) {
      this.currentTetramino.move('down');
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
