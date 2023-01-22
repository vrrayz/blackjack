import React from 'react'

import { Card } from './Card'
export const PlayerSection = ({cards}) => {
  return (
    <div className='player-section'>
        {cards.length > 0 && <Card rank={cards[0].rank} suit={cards[0].suit}></Card>}
        {cards.length > 0 && <Card rank={cards[0].rank} suit={cards[0].suit}></Card>}
    </div>
  )
}
