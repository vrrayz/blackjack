import React from 'react'

import { Card } from './Card'

export const DealerSection = ({cards}) => {
    return (
      <div className='dealer-section'>
        {cards.map(x => (
          <Card rank={x.rank} suit={x.suit}></Card>
        ))}
      </div>
    )
}
