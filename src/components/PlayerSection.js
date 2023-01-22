import React, { useEffect, useState } from 'react'

import { rankScore } from '../logic/rankScore';

import { Card } from './Card'
import { RankScore } from './RankScore';
export const PlayerSection = ({cards}) => {
  const [playerScore, setPlayerScore] = useState(rankScore(cards));
  useEffect(() => {
    // console.log("Player Rank Scores", playerScore)
    setPlayerScore(rankScore(cards))
  },[cards])
  return (
    <>
    <div className='player-section'>
      <RankScore score={playerScore}/>
      {cards.map(x => (
        <Card rank={x.rank} suit={x.suit}></Card>
      ))}
    </div>
    </>
  )
}
