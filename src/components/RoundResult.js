import React from "react";
import { GameOverlay } from "./GameOverlay";

export const RoundResult = ({ roundStatus }) => {
  return (
    <GameOverlay>
      <div className="round-message">
        <h1>WON</h1>

        <h5>The round has ended</h5>
      </div>
    </GameOverlay>
  );
};
