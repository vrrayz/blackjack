export const rankScore = (cards) => {
  const tempArray = [];
  cards.forEach((card, index) => {
    if (typeof card.rank === "string") {
      if (card.rank === "A") {
        const ts = totalScore(tempArray, index);
        console.log("TS on A ", ts);
        const score = ts + 10 > 21 ? 1 : 10;
        tempArray.push({ rank: card.rank, score: score });
        return tempArray;
      }
      tempArray.push({ rank: card.rank, score: 10 });
      return tempArray;
    }
    tempArray.push({ rank: card.rank, score: card.rank });
    return tempArray;
  });
  return totalScore(tempArray,-1);
};

const totalScore = (cards, index) => {
  const score = cards.reduce((accumulator, currentValue, currentIndex) => {
    accumulator =
      currentIndex !== index ? accumulator + currentValue.score : accumulator;
    return accumulator;
  }, 0);
  return score;
};
