import field from '../field';
import score from '../score';
import { renderOnTopOverlay } from '../overlays/topOverlay';
import getRandomColor from '../utils/getRandomColor';
// import getRandomArrayElement from '../utils/getRandomArrayElement';
import shuffle from '../utils/shuffle';
import tetraminos from './tetraminos';
import { cellsColumnCount } from '../constants/fieldSize';
import renderNextTetraminoOverlay from '../overlays/nextTetraminoOverlay';

class Tetramino {
  constructor() {
    this.bag = this.shuffle();
    this.tetramino = this.draw();
    this.next = this.draw();

    this.heigth = this.tetramino.length;
    this.width = this.tetramino[0].length;

    this.spawnOffsetLeft = Math.floor((cellsColumnCount - this.width) / 2);
    this.spawnPosition = { x: this.spawnOffsetLeft, y: 0 };
    this.position = { ...this.spawnPosition };

    this.color = getRandomColor();
  }

  shuffle() {
    return shuffle(Object.values(tetraminos));
  }

  draw() {
    if (this.bag.length <= 0) {
      this.bag = this.shuffle();
    }

    return this.bag.shift();
  }

  summon() {
    this.tetramino.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          field.cells[this.position.y + rowIndex][
            this.position.x + cellIndex
          ] = 2;
        }
      });
    });
  }

  recalcSpawnPosition(newTetraminoWidth) {
    this.spawnOffsetLeft = Math.floor(
      (cellsColumnCount - newTetraminoWidth) / 2
    );

    this.spawnPosition = { x: this.spawnOffsetLeft, y: 0 };
  }

  canSpawn() {
    const spawnPlace = field.cells[1].slice(
      this.spawnOffsetLeft,
      this.spawnOffsetLeft + 4
    );

    return spawnPlace.every((p) => p !== 1);
  }

  reset() {
    this.recalcSpawnPosition(this.next[0].length);

    this.position.x = this.spawnPosition.x;
    this.position.y = this.spawnPosition.y;

    this.tetramino = this.next;
    this.heigth = this.next.length;
    this.width = this.next[0].length;

    this.color = getRandomColor();

    this.next = this.draw();

    renderNextTetraminoOverlay();
  }

  respawn() {
    this.reset();
    setTimeout(() => {
      this.summon();
    }, 100);
  }

  canMove(direction = 'down') {
    const results = [];

    this.tetramino.forEach((row, rowIndex) => {
      row.forEach((point, pointIndex) => {
        const pointY = this.position.y + rowIndex;
        const pointX = this.position.x + pointIndex;

        if (point === 0) {
          // empty tetramino's cells can pass in
          results.push(true);
        }

        let nextCell;

        switch (direction) {
          case 'down': {
            const nextRow = field.cells[pointY + 1];

            if (!nextRow && point === 2) {
              return results.push(false);
            }

            nextCell = nextRow?.[pointX];

            break;
          }
          case 'right': {
            nextCell = field.cells[pointY]?.[pointX + 1];

            break;
          }

          case 'left': {
            nextCell = field.cells[pointY]?.[pointX - 1];

            break;
          }
        }

        const limitedByWell = typeof nextCell === 'undefined' && point === 2;
        const limitedByLandedBlocks = nextCell === 1 && point === 2;

        if (limitedByWell || limitedByLandedBlocks) {
          return results.push(false);
        }
      });
    });

    return results.every(Boolean);
  }

  move(direction) {
    if (!this.canMove(direction)) {
      return;
    }
    field.clearCanvas();
    field.refreshCells();

    switch (direction) {
      case 'left': {
        this.position.x -= 1;
        break;
      }
      case 'right': {
        this.position.x += 1;
        break;
      }
      default: {
        this.position.y += 1;
      }
    }

    this.summon();
    field.renderCells();
  }

  drop() {
    this.move('down');

    if (tetramino.canMove()) {
      score.adjust(1);
      renderOnTopOverlay();
    }
  }

  rotate() {
    const canMovePoints = [];

    const flipped = this.tetramino[0].map((val, index) =>
      this.tetramino.map((row) => row[index]).reverse()
    );

    flipped.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          const cellToFill =
            field.cells[
              this.position.y + rowIndex + (this.heigth < this.width)
            ][this.position.x + cellIndex];

          canMovePoints.push(cellToFill !== undefined && cellToFill !== 1);
        }
      });
    });

    if (!canMovePoints.every(Boolean)) {
      return;
    }

    this.width = flipped[0].length;
    this.heigth = flipped.length;

    this.tetramino = flipped;
    // .map((r) => r.reverse()).reverse();

    field.renderCells();
  }

  land() {
    this.tetramino.forEach((row, rowIndex) => {
      row.forEach((point, pointIndex) => {
        const pointY = this.position.y + rowIndex;
        const pointX = this.position.x + pointIndex;

        if (point) field.cells[pointY][pointX] = 1;
      });
    });
  }
}

const tetramino = new Tetramino();

export default tetramino;
