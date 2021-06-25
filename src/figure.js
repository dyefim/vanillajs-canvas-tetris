import { cellsColumnCount } from './cells';

const figure = [
  [2, 2],
  [2, 2],
];

const figureWidth = figure[0].length;
const figureHeight = figure.length;
const figuresSpawnOffsetLeft = (cellsColumnCount - figureWidth) / 2;

const figurePosition = { x: figuresSpawnOffsetLeft, y: 0 };

export {
  figure,
  figureWidth,
  figureHeight,
  figuresSpawnOffsetLeft,
  figurePosition,
};
