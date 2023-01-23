import React from 'react'

import { Card } from './Card'

export const DealerSection = ({cards}) => {
    return (
      <div className='dealer-section'>
        {cards.map((x, i) => (
          <Card rank={x.rank} suit={x.suit} key={i} />
        ))}
      </div>
    )
}
