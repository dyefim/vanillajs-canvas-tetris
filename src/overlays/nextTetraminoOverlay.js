import tetramino from '../tetramino';
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

const drawSingleCell = (x, y, cellValue = 0) => {
  const offsetTop = nextTetraminoCanvas.height - fontSize - 5 - cellSize / 2;
  const offsetLeft =
    (nextTetraminoCanvas.width - tetramino.next[0].length * cellSize) / 2;

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

const drawMiniature = (cells) => {
  context.beginPath();

  cells.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell) {
        drawSingleCell(cellIndex, rowIndex, cell);
      }
    });
  });

  context.closePath();
};

const drawNextTetraminoOverlay = () => {
  clearCanvas(nextTetraminoCanvas);

  context.fillText('Next', 10, 5 + fontSize);

  drawMiniature(tetramino.next);
};

export default drawNextTetraminoOverlay;
