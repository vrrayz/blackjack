import React from 'react'

export const PlayButton = ({callShuffle}) => {
  return (
    <button onClick={callShuffle} className='play-btn'>Play</button>
  )
}
