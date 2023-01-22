import React, { useEffect, useState } from "react";
import { shuffleCard } from "../logic/shuffle";

import { Card } from "./Card";
import { PlayButtonOverlay } from "./PlayButtonOverlay";
import { PlayerSection } from "./PlayerSection";
import { DealerSection } from "./DealerSection";
import { HitStandSection } from "./HitStandSection";

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
    // console.log("Cards now", cards);
    // console.log("Game running", isGameRunning)
    if (cards.length > 48) {
      drawCards();
    }
    if (cards.length === 48) {
      setIsFirstDraw(false);
    }
  }, [cards]);

  return (
    <div className="table">
      <div className="wooden-part">
        <div className="table-inner">
          <DealerSection cards={dealerCards} />
          {!isGameRunning && <PlayButtonOverlay callShuffle={callShuffle} />}
          {isGameRunning && (
            <>
              <PlayerSection cards={playerCards} />
              <HitStandSection drawCards={drawCards} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
