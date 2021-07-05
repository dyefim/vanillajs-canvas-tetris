import shuffle from '../utils/shuffle';
import tetraminos from './tetraminos';
import Tetramino from '../tetramino';
import renderNextTetraminoOverlay from '../overlays/nextTetraminoOverlay';

class Bag {
  constructor() {
    this.bag = this.shuffle();
    this.next = this.bag.shift();
  }

  shuffle() {
    return shuffle(Object.values(tetraminos));
  }

  draw() {
    if (this.bag.length <= 0) {
      this.bag = this.shuffle();
    }

    const shape = this.next;

    this.next = this.bag.shift();

    renderNextTetraminoOverlay();

    return new Tetramino(shape);
  }
}

const bag = new Bag();

export default bag;
