import { canvas } from '../constants/index';
import { cellsColumnCount } from '../constants/fieldSizes';
import { cells, drawCells, refreshCells } from '../field';
import score from '../score';
import { drawOnTopOverlay } from '../overlays/topOverlay';
import getRandomColor from '../utils/getRandomColor';
import clearCanvas from '../utils/clearCanvas';
import getRandomArrayElement from '../utils/getRandomArrayElement';
import tetraminos from './tetraminos';

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
          cells[this.position.y + rowIndex][this.position.x + cellIndex] = 2;
        }
      });
    });
  }

  canSpawn() {
    return cells[1][this.spawnOffsetLeft] !== 1;
  }

  reset() {
    this.position.x = this.initialPosition.x;
    this.position.y = this.initialPosition.y;

    this.tetramino = this.next;
    this.heigth = this.next.length;
    this.width = this.next[0].length;

    this.color = getRandomColor();

    this.next = this.getRandomTetramino();
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

        let nextCell;

        switch (direction) {
          case 'down': {
            const nextRow = cells[pointY + 1];

            if (!nextRow) {
              return results.push(false);
            }

            nextCell = nextRow[pointX];

            break;
          }
          case 'right': {
            nextCell = cells[pointY][pointX + 1];

            break;
          }

          case 'left': {
            nextCell = cells[pointY][pointX - 1];

            break;
          }
        }

        if (typeof nextCell === 'undefined') {
          return results.push(false);
        }

        if (point !== 0) {
          return results.push(nextCell !== 1);
        }
      });
    });

    return results.every((v) => v);
  }

  move(direction) {
    if (!this.canMove(direction)) {
      return;
    }
    clearCanvas(canvas);
    refreshCells();

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
    drawCells();
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
            cells[this.position.y + rowIndex + (this.heigth < this.width)][
              this.position.x + cellIndex
            ];

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

        if (point) cells[pointY][pointX] = 1;
      });
    });
  }
}

const tetramino = new Tetramino();

export default tetramino;
