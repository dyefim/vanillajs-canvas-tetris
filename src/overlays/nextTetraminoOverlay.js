import bag from '../bag';
import clearCanvas from '../utils/clearCanvas';

const nextTetraminoCanvas = document.getElementById('nextTetraminoCanvas');
const context = nextTetraminoCanvas.getContext('2d');
const gradient = context.createLinearGradient(
  0,
  0,
  nextTetraminoCanvas.width,
  0
);

gradient.addColorStop('0', '#4FC3F7');
gradient.addColorStop('1.0', '#AED581');

const fontSize = nextTetraminoCanvas.width / 3;

context.font = `${fontSize}px sans-serif`;
context.fillStyle = gradient;

const cellSize = 10;

const renderSingleCell = (x, y, cellValue = 0) => {
  const offsetTop = nextTetraminoCanvas.height - fontSize - 5 - cellSize / 2;
  const offsetLeft =
    (nextTetraminoCanvas.width - bag.next[0].length * cellSize) / 2;

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

const renderNextTetraminoOverlay = () => {
  clearCanvas(nextTetraminoCanvas);

  context.fillText('Next', 10, 5 + fontSize);

  if (bag.next) {
    renderMiniature(bag.next);
  }
};

export default renderNextTetraminoOverlay;
