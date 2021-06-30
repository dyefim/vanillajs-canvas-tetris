import getRandomArrayElement from './getRandomArrayElement';

const colors = [
  '#FF6F61',
  '#009B77',
  '#DD4124',
  '#45B8AC',
  '#EFC050',
  '#BC243C',
  '#C3447A',
  '#FDAC53',
  '#0072B5',
  '#f37735',
  '#ff5588',
  '#9C27B0',
];

const getRandomColor = () => getRandomArrayElement(colors);

export default getRandomColor;
