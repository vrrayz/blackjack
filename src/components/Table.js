import React, { useEffect, useState } from "react";
import { shuffleCard } from "../logic/shuffle";

import { Card } from "./Card";
import { PlayButtonOverlay } from "./PlayButtonOverlay";
import { PlayerSection } from "./PlayerSection";

export const Table = () => {
  const [cards, setCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const callShuffle = () => {
    setCards(shuffleCard());
    setIsGameRunning(true);
  };
  const drawCards = () => {
    setPlayerCards([...playerCards, cards[cards.length - 1]]);
    setCards(
      cards.filter((card, index) => {
        return index < cards.length - 1;
      })
    );
  };
  useEffect(() => {
    console.log("Cards now", cards);
    // console.log("Game running", isGameRunning)
    if (cards.length === 52) {
      drawCards();
    }
  }, [cards]);

  useEffect(() => {
    console.log("Player Cards is ", playerCards.length);
    if (playerCards.length < 2 && isGameRunning) {
      drawCards();
    }
  }, [playerCards]);
  return (
    <div className="table">
      <div className="wooden-part">
        <div className="table-inner">
          <div>
            <button onClick={drawCards}>Draw Cards</button>
            {playerCards.length > 0 && (
              <ul>
              {playerCards.map((x) => (
                <li>
                  {x.rank} {x.suit}
                </li>
              ))}
            </ul>
            )}
          </div>
          {!isGameRunning && <PlayButtonOverlay callShuffle={callShuffle} />}
          {/* <PlayerSection cards={cards} /> */}
          {/* {cards.length > 0 && <Card rank={cards[0].rank} suit={cards[0].suit}></Card>} */}
        </div>
      </div>
    </div>
  );
};
