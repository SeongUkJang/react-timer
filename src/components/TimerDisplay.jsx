import React from 'react'

const TimerDisplay = ({time}) => {
  return (
    <div className='timer-display'>
        <div className="time">{time}</div>
    </div>
  )
}

export default TimerDisplay