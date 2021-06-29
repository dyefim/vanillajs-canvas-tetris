import tetraminos from '../figures/tetraminos';
import getRandomArrayElement from './getRandomArrayElement';

const pickNextFigure = () => getRandomArrayElement(Object.values(tetraminos));

export default pickNextFigure;
