import getRandomColor from '../utils/getRandomColor';
import shuffle from '../utils/shuffle';
import tetraminos from './tetraminos';

class Bag {
  constructor() {
    this.bag = this.shuffle();
    this.next = this.bag.shift();

    this.color = getRandomColor();
  }

  shuffle() {
    return shuffle(Object.values(tetraminos));
  }

  draw() {
    if (this.bag.length <= 0) {
      this.bag = this.shuffle();
    }

    const tetramino = this.next;

    this.next = this.bag.shift();

    this.color = getRandomColor();

    return tetramino;
  }
}

const bag = new Bag();

export default bag;
