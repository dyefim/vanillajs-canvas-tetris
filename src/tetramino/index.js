import field from '../field';
import score from '../score';
import { renderOnTopOverlay } from '../overlays/topOverlay';
import renderNextTetraminoOverlay from '../overlays/nextTetraminoOverlay';
import { cellsColumnCount } from '../field/fieldSizes';
import bag from '../bag';

class Tetramino {
  constructor() {
    this.tetramino = bag.draw();

    this.heigth = this.tetramino.length;
    this.width = this.tetramino[0].length;

    this.spawnOffsetLeft = Math.floor((cellsColumnCount - this.width) / 2);
    this.spawnPosition = { x: this.spawnOffsetLeft, y: 0 };
    this.position = { ...this.spawnPosition };

    this.color = bag.color;
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

  reset() { // TODO: mb move thiss logic to Bag
    this.tetramino = bag.draw();

    this.recalcSpawnPosition(this.tetramino[0].length);

    this.position.x = this.spawnPosition.x;
    this.position.y = this.spawnPosition.y;

    this.heigth = this.tetramino.length;
    this.width = this.tetramino[0].length;

    this.color = bag.color;

    renderNextTetraminoOverlay();
  }

  respawn() {
    this.reset();
    setTimeout(() => {
      this.summon();
    }, 100);
  }

  canMove(direction = 'down', tetramino = this.tetramino) {
    const results = [];

    tetramino.forEach((row, rowIndex) => {
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

  previewRotation(tetramino = this.tetramino) {
    return tetramino[0].map((val, index) =>
      tetramino.map((row) => row[index]).reverse()
    );
  }

  canRotate(tetramino = [...this.tetramino], position = { ...this.position }) {
    const canMovePoints = [];

    const rotated = this.previewRotation(tetramino);

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

  rotate(tetramino = this.tetramino) {
    const rotated = this.previewRotation(tetramino);

    this.width = rotated[0].length;
    this.heigth = rotated.length;

    this.tetramino = rotated;

    field.renderCells();
  }

  tryToRotate() {
    if (this.canRotate(this.tetramino)) {
      this.rotate();
    } else {
      const canWallKickRight = this.canRotate(this.tetramino, {
        ...this.position,
        x: this.position.x + 1,
      });

      if (canWallKickRight) {
        this.move('right');
        this.rotate();

        return;
      }

      const canWallKickLeft = this.canRotate(this.tetramino, {
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
