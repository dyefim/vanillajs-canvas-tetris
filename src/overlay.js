import score from './score';
import clearCanvas from './utils/clearCanvas';

const overlayCanvas = document.getElementById('overlayCanvas');
const context = overlayCanvas.getContext('2d');

const drawOnOverlay = () => {
  clearCanvas(overlayCanvas);

  const gradient = context.createLinearGradient(0, 0, overlayCanvas.width, 0);

  gradient.addColorStop('0', '#e47');
  gradient.addColorStop('1.0', '#ff0');

  context.font = '30px sans-serif';
  context.fillStyle = gradient;

  context.fillText(`Score: ${score.points}`, 15, 40);
};

export { drawOnOverlay };
