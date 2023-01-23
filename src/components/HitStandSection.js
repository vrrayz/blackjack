import React from 'react'

export const HitStandSection = ({drawCards, stand}) => {
  return (
    <div className='draw-hit-section'>
        <button onClick={() => {stand()}}>Stand</button>
        <button onClick={drawCards} className="hit">Hit</button>
    </div>
  )
}
