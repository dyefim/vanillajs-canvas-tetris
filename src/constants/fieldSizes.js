import { canvas } from './index';

const cellsRowCount = 22;
const cellsColumnCount = 10;
const cellSize = canvas.height / cellsRowCount;

canvas.width = (canvas.height / cellsRowCount) * cellsColumnCount;

export { cellSize, cellsRowCount, cellsColumnCount };
