import React from "react";
import { GameOverlay } from "./GameOverlay";

export const RoundResult = ({ roundStatus }) => {
  return (
    <GameOverlay className="op-0 animate__fadeIn">
      <div className="round-message">
        <h1 style={{textTransform: 'uppercase'}}>{roundStatus}</h1>

        <h5>The round has ended</h5>
      </div>
    </GameOverlay>
  );
};
