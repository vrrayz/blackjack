import React, { useEffect, useState } from "react";
import { shuffleCard } from "../logic/shuffle";
import { rankScore } from "../logic/rankScore";
import { dealerSimulation } from "../logic/dealerSimulation";

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
      (isFirstDraw && !isPlayerTurn && dealerCards.length === 0) ||
      (!isPlayerTurn && !isFirstDraw)
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
    console.log("Draw cards called");
  };
  const stand = (isDealer = false) => {
    // console.log("Stand clicked")
    // console.log(isDealer)
    isDealer ? calculateScores() : setIsPlayerTurn(false);
  };
  const drawAtInterval = () => {
    if(dealerScore <= blackJack) {
      if(dealerScore < 17){
        // console.log("Dealer score less than minimum")
        drawCards()
      }else if(dealerScore >= 17 && dealerScore < blackJack){
        // console.log("Dealer score above minimum")
        dealerSimulation() === 'hit' ? drawCards() : stand(true)
      }else if(dealerScore >= blackJack){
        // console.log("Dealer score is or greater blackjack")
        stand(true)
      }
    }
  }
  const calculateScores = () => {
    // if player hits 21 and dealer hits 21 === push
    // if player and dealer hits less than 21 but are equal === push
    if((playerScore === dealerScore === blackJack) || (playerScore === dealerScore && dealerScore < blackJack)) setRoundStatus('push')

    // if player hits 21 and dealer hits less === won
    // if player is closer to 21 than dealer === won
    if(playerScore <= blackJack && playerScore > dealerScore) setRoundStatus('won')

    // if dealer hits greater than 21 === won
    if(dealerScore > blackJack) setRoundStatus('won')

    // if dealer is closer to 21 than player === lost
    if(dealerScore <= blackJack && dealerScore > playerScore) setRoundStatus('lost')

    console.log("The Dealer Score === ", dealerScore)
    console.log("The Player Score === ", playerScore)
  }
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
    if (!isPlayerTurn && !isFirstDraw) {
      setDealerCards(
        dealerCards.map((dealerCard) => {
          return {
            suit: dealerCard.suit,
            rank: dealerCard.rank,
            isHidden: false,
          };
        })
      );
    }
  }, [isPlayerTurn, isFirstDraw]);

  useEffect(() => {
    if (playerScore > blackJack) setRoundStatus("lost");
    if (playerScore === blackJack) stand(true)
  }, [playerScore]);
  useEffect(() => {
    if (!isPlayerTurn && !isFirstDraw) {
      dealerScore < blackJack ? setTimeout(drawAtInterval,1000) : stand(true)
    }
  }, [dealerScore]);

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
              <HitStandSection stand={stand} drawCards={drawCards} />
            </>
          )}
          {roundStatus && <RoundResult roundStatus={roundStatus} />}
        </div>
      </div>
    </div>
  );
};
