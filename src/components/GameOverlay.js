import React from "react";
export const GameOverlay = ({className, children}) => {
  return (
    <div className={`game-overlay ${className}`}>
      {children}
    </div>
  );
};
