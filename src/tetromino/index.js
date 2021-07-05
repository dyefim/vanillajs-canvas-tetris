import field from '../field';
import score from '../score';
import { renderOnTopOverlay } from '../overlays/topOverlay';
import getRandomColor from '../utils/getRandomColor';
import { cellsColumnCount } from '../field/fieldSizes';

class Tetromino {
  constructor(shape) {
    this.tetromino = shape;

    this.heigth = this.tetromino.length;
    this.width = this.tetromino[0].length;

    this.spawnOffsetLeft = Math.floor((cellsColumnCount - this.width) / 2);
    this.spawnPosition = { x: this.spawnOffsetLeft, y: 0 };
    this.position = { ...this.spawnPosition };

    this.color = getRandomColor();
  }

  canMove(direction = 'down', tetromino = this.tetromino) {
    const results = [];

    tetromino.forEach((row, rowIndex) => {
      row.forEach((point, pointIndex) => {
        const pointY = this.position.y + rowIndex;
        const pointX = this.position.x + pointIndex;

        if (point === 0) {
          // empty tetromino's cells can pass in
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

    field.clearCanvas();
    field.removeMovableTetramino();

    field.summon({ tetromino: this.tetromino, position: this.position });
    field.renderCells(this.color);
  }

  drop() {
    this.move('down');

    if (this.canMove()) {
      score.adjust(1);
      renderOnTopOverlay();
    }
  }

  previewRotation(tetromino = this.tetromino) {
    return tetromino[0].map((val, index) =>
      tetromino.map((row) => row[index]).reverse()
    );
  }

  canRotate(tetromino = [...this.tetromino], position = { ...this.position }) {
    const canMovePoints = [];

    const rotated = this.previewRotation(tetromino);

    rotated.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          const cellToFill =
            field.cells[position.y + rowIndex][position.x + cellIndex];

          canMovePoints.push(cellToFill !== undefined && cellToFill !== 1);
        }
      });
    });

    return canMovePoints.every(Boolean);
  }

  rotate(tetromino = this.tetromino) {
    const rotated = this.previewRotation(tetromino);

    this.width = rotated[0].length;
    this.heigth = rotated.length;

    this.tetromino = rotated;

    field.clearCanvas();
    // field.removeMovableTetramino();
    field.renderCells(this.color);
  }

  tryToRotate() {
    if (this.canRotate(this.tetromino)) {
      this.rotate();
    } else {
      const canWallKickRight = this.canRotate(this.tetromino, {
        ...this.position,
        x: this.position.x + 1,
      });

      if (canWallKickRight) {
        this.move('right');
        this.rotate();

        return;
      }

      const canWallKickLeft = this.canRotate(this.tetromino, {
        ...this.position,
        x: this.position.x - 1,
      });

      if (canWallKickLeft) {
        this.move('left');
        this.rotate();

        return;
      }
    }
  }

  land() {
    this.tetromino.forEach((row, rowIndex) => {
      row.forEach((point, pointIndex) => {
        const pointY = this.position.y + rowIndex;
        const pointX = this.position.x + pointIndex;

        if (point) field.cells[pointY][pointX] = 1;
      });
    });
  }
}

export default Tetromino;
