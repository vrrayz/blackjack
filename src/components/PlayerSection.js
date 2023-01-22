import React from 'react'

import { Card } from './Card'
export const PlayerSection = ({cards}) => {
  return (
    <div className='player-section'>
      {cards.map(x => (
        <Card rank={x.rank} suit={x.suit}></Card>
      ))}
    </div>
  )
}
