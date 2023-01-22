import React, { useState } from 'react'
import { shuffleCard } from '../logic/shuffle'

import { Card } from './Card'

export const Table = () => {
    const [cards, setCards] = useState([])
    const callShuffle = () => {
        if(cards.length > 0) console.log("THe cards", cards)
        setCards(shuffleCard());
        // console.log("Shuffle called")
    }
  return (
    <div className='table'>
        <div className="wooden-part">
            <div className="table-inner">
                <button onClick={callShuffle}>Shuffle Card</button>
                {cards.length > 0 && <Card rank={cards[0].rank} suit={cards[0].suit}></Card>}
            </div>
        </div>
    </div>
  )
}
