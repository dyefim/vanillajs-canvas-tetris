import tetramino from '../tetramino/index';
import score from '../score';
import createMatrix from '../utils/createMatrix';
import clearCanvas from '../utils/clearCanvas';
import { cellsRowCount, cellsColumnCount } from './fieldSizes';
import tetris from '../main';

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

  refreshCells() {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === 2) {
          this.cells[rowIndex][cellIndex] = 0;
        }
      });
    });
  }

  renderSingleCell(x, y, cellValue = 0) {
    context.beginPath();

    context.rect(x * cellSize, y * cellSize, cellSize, cellSize);

    // context.font = '10px serif';
    // context.strokeText(`${x}:${y}`, x * cellSize, y * cellSize);

    if (cellValue === 1) {
      context.fillStyle = '#778';
    }

    if (cellValue === 2) {
      context.fillStyle = tetramino.color;
    }

    context.fill();
    context.closePath();
  }

  renderCells() {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell) {
          this.renderSingleCell(cellIndex, rowIndex, cell);
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
