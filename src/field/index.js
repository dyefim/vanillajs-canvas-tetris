import tetris from '../main';
import score from '../score';
import createMatrix from '../utils/createMatrix';
import clearCanvas from '../utils/clearCanvas';
import { cellsRowCount, cellsColumnCount } from './fieldSizes';

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const cellSize = canvas.height / cellsRowCount;

// adjust the width of the canvas
canvas.width = (canvas.height / cellsRowCount) * cellsColumnCount;

class Field {
  constructor() {
    this.cells = createMatrix(cellsRowCount, cellsColumnCount);
  }

  clearCanvas() {
    clearCanvas(canvas);
  }

  canSpawn(spawnOffsetLeft) {
    const spawnPlace = this.cells[1].slice(
      spawnOffsetLeft,
      spawnOffsetLeft + 4
    );

    return spawnPlace.every((p) => p !== 1);
  }

  summon({ tetromino, position }) {
    tetromino.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          this.cells[position.y + rowIndex][position.x + cellIndex] = 2;
        }
      });
    });
  }

  refreshCells() {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === 2) {
          this.cells[rowIndex][cellIndex] = 0;
        }
      });
    });
  }

  renderSingleCell({ x, y, cell = 0, cellColor }) {
    context.beginPath();

    context.rect(x * cellSize, y * cellSize, cellSize, cellSize);

    if (cell === 1) {
      context.fillStyle = '#778';
    }

    if (cell === 2 && cellColor) {
      context.fillStyle = cellColor;
    }

    context.fill();
    context.closePath();
  }

  renderCells(cellColor) {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          this.renderSingleCell({
            x: cellIndex,
            y: rowIndex,
            cell,
            cellColor,
          });
        }
      });
    });
  }

  vanish() {
    let linesVanished = 0;

    this.cells.forEach((row, index) => {
      if (row.every((c) => c === 1)) {
        this.cells.splice(index, 1);
        this.cells.unshift(new Array(cellsColumnCount).fill(0));

        linesVanished++;
        tetris.accountOfVanishedLines++;
      }
    });

    score.rewardVanishing(linesVanished);
  }
}

const field = new Field();

export default field;
