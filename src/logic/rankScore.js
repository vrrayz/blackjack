export const rankScore = (cards) => {
  const tempArray = [];
  cards.forEach((card, index) => {
    // Don't add the hidden cards
    if (!card.isHidden) {
      // Differentitate the string ranks like A J Q K with the number ranks
      if (typeof card.rank === "string") {
        // Logic for when A should be 10 and when A should be 1
        if (card.rank === "A") {
          const ts = totalScore(tempArray, index);
          const score = ts + 10 > 21 ? 1 : 10;
          tempArray.push({ rank: card.rank, score: score });
          return tempArray;
        }
        tempArray.push({ rank: card.rank, score: 10 });
        return tempArray;
      }
      tempArray.push({ rank: card.rank, score: card.rank });
    }
    return tempArray;
  });
  return totalScore(tempArray, -1);
};

const totalScore = (cards, index) => {
  const score = cards.reduce((accumulator, currentValue, currentIndex) => {
    accumulator =
      currentIndex !== index ? accumulator + currentValue.score : accumulator;
    return accumulator;
  }, 0);
  return score;
};
