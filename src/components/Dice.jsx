import React from 'react'
import '../componentsStyle/Dice.css'

function Dice(props) {
  const style = {
    backgroundColor: props.isHeld ? '#59E391' : '#fff',
    color: props.isHeld ? '#fff' : '#000'
  }
  return (
    <div className='dice' style={style} onClick={props.holding}>
      <span>{props.number}</span>
    </div>
  )
}

export default Dice
