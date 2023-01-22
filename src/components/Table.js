import React, { useEffect, useState } from "react";
import { shuffleCard } from "../logic/shuffle";

import { Card } from "./Card";
import { PlayButtonOverlay } from "./PlayButtonOverlay";
import { PlayerSection } from "./PlayerSection";

export const Table = () => {
  const [cards, setCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [isFirstDraw, setIsFirstDraw] = useState(true);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const callShuffle = () => {
    setCards(shuffleCard());
    setIsGameRunning(true);
  };
  const drawCards = () => {
    if (isPlayerTurn) setPlayerCards([...playerCards, cards[cards.length - 1]]);
    else setDealerCards([...dealerCards, cards[cards.length - 1]]);
    if (isFirstDraw) setIsPlayerTurn(!isPlayerTurn);
    setCards(
      cards.filter((card, index) => {
        return index < cards.length - 1;
      })
    );
  };
  useEffect(() => {
    console.log("Cards now", cards);
    // console.log("Game running", isGameRunning)
    if (cards.length > 48) {
      drawCards();
    }
  }, [cards]);

  // useEffect(() => {
  //   console.log("Player Cards is ", playerCards.length);
  //   if (playerCards.length < 2 && isGameRunning && isFirstDraw) {
  //     drawCards();
  //   }
  // }, [playerCards,isFirstDraw,isGameRunning]);
  return (
    <div className="table">
      <div className="wooden-part">
        <div className="table-inner">
        <button onClick={drawCards}>Draw Cards</button>
          <div>
            {dealerCards.length > 0 && (
              <ul>
                {dealerCards.map((x) => (
                  <li>
                    {x.rank} {x.suit}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {!isGameRunning && <PlayButtonOverlay callShuffle={callShuffle} />}

          <PlayerSection cards={playerCards} />
          {/* {cards.length > 0 && <Card rank={cards[0].rank} suit={cards[0].suit}></Card>} */}
        </div>
      </div>
    </div>
  );
};
