import React, { useEffect, useState } from 'react'
import { shuffleCard } from '../logic/shuffle'

import { Card } from './Card'
import { PlayButtonOverlay } from './PlayButtonOverlay'

export const Table = () => {
    const [cards, setCards] = useState([])
    const [isGameRunning, setIsGameRunning] = useState(false)

    const callShuffle = () => {
        setCards(shuffleCard());
    }

    useEffect(()=>{
        if(cards.length > 0) setIsGameRunning(true)
    },[cards])
  return (
    <div className='table'>
        <div className="wooden-part">
            <div className="table-inner">
                {!isGameRunning && <PlayButtonOverlay callShuffle={callShuffle} />}
                {cards.length > 0 && <Card rank={cards[0].rank} suit={cards[0].suit}></Card>}
            </div>
        </div>
    </div>
  )
}
