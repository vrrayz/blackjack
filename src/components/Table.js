import React, { useEffect, useState } from "react";
import { shuffleCard } from "../logic/shuffle";
import { rankScore } from "../logic/rankScore";

import { GameOverlay } from "./GameOverlay";
import { PlayButton } from "./PlayButton";
import { PlayerSection } from "./PlayerSection";
import { DealerSection } from "./DealerSection";
import { HitStandSection } from "./HitStandSection";
import { MidSection } from "./MidSection";
import { RoundResult } from "./RoundResult";

export const Table = () => {
  const [cards, setCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(rankScore([]));
  const [dealerCards, setDealerCards] = useState([]);
  const [dealerScore, setDealerScore] = useState(rankScore([]));
  const [isFirstDraw, setIsFirstDraw] = useState(true);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [roundStatus, setRoundStatus] = useState("");
  const [isGameRunning, setIsGameRunning] = useState(false);
  const blackJack = 21;

  const callShuffle = () => {
    setCards(shuffleCard());
    setIsGameRunning(true);
  };
  const drawCards = () => {
    if (
      isPlayerTurn ||
      (isFirstDraw && !isPlayerTurn && dealerCards.length === 0)
    )
      cards[cards.length - 1].isHidden = false;
    if (isPlayerTurn) {
      setPlayerCards([...playerCards, cards[cards.length - 1]]);
    } else setDealerCards([...dealerCards, cards[cards.length - 1]]);
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
    // console.log("Cards ", cards);
  }, [cards]);

  useEffect(() => {
    setPlayerScore(rankScore(playerCards));
  }, [playerCards]);

  useEffect(() => {
    setDealerScore(rankScore(dealerCards));
  }, [dealerCards]);

  useEffect(() => {
    if (playerScore > blackJack) setRoundStatus("lost");
    if(playerScore === blackJack) setRoundStatus("won")
  }, [playerScore]);

  return (
    <div className="table">
      <div className="wooden-part">
        <div className="table-inner">
          {!isGameRunning && (
            <GameOverlay>
              <PlayButton callShuffle={callShuffle} />
            </GameOverlay>
          )}
          {isGameRunning && (
            <>
              <DealerSection cards={dealerCards} score={dealerScore} />
              <MidSection cards={cards} />
              <PlayerSection cards={playerCards} score={playerScore} />
              <HitStandSection drawCards={drawCards} />
            </>
          )}
          {roundStatus && <RoundResult roundStatus={roundStatus} />}
        </div>
      </div>
    </div>
  );
};
