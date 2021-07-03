const level = 0;

// Original Nintendo Scoring System
const pointsForNLines = {
  1: 40,
  2: 100,
  3: 300,
  4: 1200,
};

class Score {
  constructor(initialScore = 0) {
    this.points = initialScore;
  }

  adjust(value) {
    this.points += value;
  }

  rewardVanishing(lines) {
    if (lines < 1) {
      return;
    }

    const reward = pointsForNLines[lines] * (level + 1);

    this.adjust(reward);
  }
}

const score = new Score();

export default score;
