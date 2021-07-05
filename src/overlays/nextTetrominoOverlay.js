import bag from '../bag';
import clearCanvas from '../utils/clearCanvas';

const nextTetrominoCanvas = document.getElementById('nextTetrominoCanvas');
const context = nextTetrominoCanvas.getContext('2d');
const gradient = context.createLinearGradient(
  0,
  0,
  nextTetrominoCanvas.width,
  0
);

gradient.addColorStop('0', '#4FC3F7');
gradient.addColorStop('1.0', '#AED581');

const fontSize = nextTetrominoCanvas.width / 3;

context.font = `${fontSize}px sans-serif`;
context.fillStyle = gradient;

const cellSize = 10;

const renderSingleCell = (x, y, cellValue = 0) => {
  const offsetTop = nextTetrominoCanvas.height - fontSize - 5 - cellSize / 2;
  const offsetLeft =
    (nextTetrominoCanvas.width - bag.next[0].length * cellSize) / 2;

  context.rect(
    x * cellSize + offsetLeft,
    y * cellSize + offsetTop,
    cellSize,
    cellSize
  );

  if (cellValue === 2) {
    context.fillStyle = gradient;
  }

  context.fill();
};

const renderMiniature = (cells) => {
  context.beginPath();

  cells.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell) {
        renderSingleCell(cellIndex, rowIndex, cell);
      }
    });
  });

  context.closePath();
};

const renderNextTetrominoOverlay = () => {
  clearCanvas(nextTetrominoCanvas);

  context.fillText('Next', 10, 5 + fontSize);

  if (bag.next) {
    renderMiniature(bag.next);
  }
};

export default renderNextTetrominoOverlay;
