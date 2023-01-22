import React from "react";
import { PlayButton } from "./PlayButton";

export const PlayButtonOverlay = ({callShuffle}) => {
  return (
    <div className="play-btn-overlay">
      <PlayButton callShuffle={callShuffle} />
    </div>
  );
};
