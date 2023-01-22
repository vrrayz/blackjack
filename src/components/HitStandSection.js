import React from 'react'

export const HitStandSection = ({drawCards}) => {
  return (
    <div className='draw-hit-section'>
        <button>Stand</button>
        <button onClick={drawCards}>Hit</button>
    </div>
  )
}
