import React, { useEffect, useState } from 'react'

import { Card } from './Card'
import { RankScore } from './RankScore';
export const PlayerSection = ({cards,score}) => {
  
  return (
    <>
    <div className='player-section'>
      <RankScore score={score}/>
      {cards.map(x => (
        <Card rank={x.rank} suit={x.suit}></Card>
      ))}
    </div>
    </>
  )
}
