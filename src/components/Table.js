import React from 'react'
import { shuffleCard } from '../logic/shuffle'

export const Table = () => {
  return (
    <div className='table'>
        <div className="wooden-part">
            <div className="table-inner">
                <button onClick={callShuffle}>Shuffle Card</button>
            </div>
        </div>
    </div>
  )
}
const callShuffle = () => {
    shuffleCard()
    // console.log("Shuffle called")
}
