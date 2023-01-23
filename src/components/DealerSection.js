import React from 'react'

import { Card } from './Card'
import { RankScore } from './RankScore'

export const DealerSection = ({cards,score}) => {
    return (
      <div className='dealer-section'>
        {cards.map((x, i) => (
          <Card rank={x.rank} suit={x.suit} key={i} />
        ))}
        <RankScore score={score}/>
      </div>
    )
}
