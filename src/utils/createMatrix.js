const createMatrix = (rows, columns) =>
  new Array(rows).fill(0).map(() => new Array(columns).fill(0));

export default createMatrix;
