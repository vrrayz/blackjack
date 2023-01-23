import React, { useEffect, useState } from "react";

export const Card = ({ rank, suit, isHidden }) => {
  const [charCode, setCharCode] = useState(0);

  useEffect(() => {
    if (suit === "spades") setCharCode(9824);
    if (suit === "clubs") setCharCode(9827);
    if (suit === "hearts") setCharCode(9829);
    if (suit === "diamonds") setCharCode(9830);
  }, [suit]);
  return (
    <div className={`card ${suit} ${isHidden ? "hidden" : ""}`}>
      {isHidden ? (
        <>
        GRIM<br/>
        SAVAGE
        </>
      ) : (
        <>
          <span className="rank">{rank}</span>
          <span className="suit">{String.fromCharCode(charCode)}</span>
        </>
      )}
    </div>
  );
};
