import shuffle from '../utils/shuffle';
import tetrominos from './tetrominos';
import Tetromino from '../tetromino';
import renderNextTetrominoOverlay from '../overlays/nextTetrominoOverlay';

class Bag {
  constructor() {
    this.bag = this.shuffle();
    this.next = this.bag.shift();
  }

  shuffle() {
    return shuffle(Object.values(tetrominos));
  }

  draw() {
    if (this.bag.length <= 0) {
      this.bag = this.shuffle();
    }

    const shape = this.next;

    this.next = this.bag.shift();

    renderNextTetrominoOverlay();

    return new Tetromino(shape);
  }
}

const bag = new Bag();

export default bag;
