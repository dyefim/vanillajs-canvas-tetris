import score from './score';
import clearCanvas from './utils/clearCanvas';

const overlayCanvas = document.getElementById('overlayCanvas');
const context = overlayCanvas.getContext('2d');
const gradient = context.createLinearGradient(0, 0, overlayCanvas.width, 0);

gradient.addColorStop('0', '#e47');
gradient.addColorStop('1.0', '#ff0');

const scoreFontSize = overlayCanvas.height / 2;

context.font = `${scoreFontSize}px sans-serif`;
context.fillStyle = gradient;

const drawOnOverlay = () => {
  clearCanvas(overlayCanvas);

  context.fillText(
    `Score: ${score.points}`,
    10,
    (overlayCanvas.height + scoreFontSize) / 2
  );
};

export { drawOnOverlay };
