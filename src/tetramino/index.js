import field from '../field';
import score from '../score';
import { drawOnTopOverlay } from '../overlays/topOverlay';
import getRandomColor from '../utils/getRandomColor';
import getRandomArrayElement from '../utils/getRandomArrayElement';
import tetraminos from './tetraminos';
import { cellsColumnCount } from '../constants/fieldSize';
import drawNextTetraminoOverlay from '../overlays/nextTetraminoOverlay';

class Tetramino {
  constructor() {
    this.tetramino = this.getRandomTetramino();
    this.next = this.getRandomTetramino();

    this.heigth = this.tetramino.length;
    this.width = this.tetramino[0].length;

    this.spawnOffsetLeft = Math.floor((cellsColumnCount - this.width) / 2);
    this.initialPosition = { x: this.spawnOffsetLeft, y: 0 };
    this.position = { ...this.initialPosition };

    this.color = getRandomColor();
  }

  getRandomTetramino() {
    return getRandomArrayElement(Object.values(tetraminos));
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

  canSpawn() {
    return field.cells[1][this.spawnOffsetLeft] !== 1;
  }

  reset() {
    this.position.x = this.initialPosition.x;
    this.position.y = this.initialPosition.y;

    this.tetramino = this.next;
    this.heigth = this.next.length;
    this.width = this.next[0].length;

    this.color = getRandomColor();

    this.next = this.getRandomTetramino();

    drawNextTetraminoOverlay();
  }

  respawn() {
    this.reset();
    this.summon();
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
    field.drawCells();
  }

  drop() {
    this.move('down');

    if (tetramino.canMove()) {
      score.adjust(1);
      drawOnTopOverlay();
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
    this.spawnOffsetLeft = Math.floor(
      (cellsColumnCount - flipped[0].length) / 2
    );

    this.tetramino = flipped;
    // .map((r) => r.reverse()).reverse();
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
