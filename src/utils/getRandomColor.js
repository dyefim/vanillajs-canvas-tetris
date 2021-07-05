import getRandomArrayElement from './getRandomArrayElement';

const colors = [
  '#EF5350', // red
  '#FF7043', // red-orange
  '#FFB74D', // orange-yellow
  '#9CCC65', // green
  '#4DB6AC', // jade
  '#26C6DA', // teal
  '#4FC3F7', // blue
  '#5C6BC0', // blueberry
  '#AB47BC', // magenta
  '#F06292', // deep pink
];

const getRandomColor = () => getRandomArrayElement(colors);

export default getRandomColor;
