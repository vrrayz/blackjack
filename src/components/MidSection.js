import React from "react";
import { Card } from "./Card";
export const MidSection = ({ cards }) => {
  return (
    <div className="mid-section">
      <div className="cards">
        {cards.map((x, i) => (
          <Card
            rank={x.rank}
            suit={x.suit}
            isHidden={x.isHidden}
            key={i}
          ></Card>
        ))}
      </div>
    </div>
  );
};
