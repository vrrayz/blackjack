import React, { useEffect, useState } from "react";
import { shuffleCard } from "../logic/shuffle";
import { rankScore } from '../logic/rankScore';


import { PlayButtonOverlay } from "./PlayButtonOverlay";
import { PlayerSection } from "./PlayerSection";
import { DealerSection } from "./DealerSection";
import { HitStandSection } from "./HitStandSection";

export const Table = () => {
  const [cards, setCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(rankScore([]));
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(rankScore([]));
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
    if (cards.length > 48) {
      drawCards();
    }
    if (cards.length === 48) {
      setIsFirstDraw(false);
    }
  }, [cards]);

  useEffect(() => {
    setPlayerScore(rankScore(playerCards))
  },[playerCards])

  useEffect(() => {
    setDealerScore(rankScore(dealerCards))
  },[dealerCards])

  return (
    <div className="table">
      <div className="wooden-part">
        <div className="table-inner">
          {!isGameRunning && <PlayButtonOverlay callShuffle={callShuffle} />}
          {isGameRunning && (
            <>
              <DealerSection cards={dealerCards} score={dealerScore} />
              <PlayerSection cards={playerCards} score={playerScore}/>
              <HitStandSection drawCards={drawCards} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
