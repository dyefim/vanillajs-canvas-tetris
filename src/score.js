class Score {
  constructor(initialScore = 0) {
    this.points = initialScore;
  }

  adjust(value) {
    this.points += value;
  }
}

const score = new Score();

export default score;
