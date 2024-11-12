import React from 'react'
import Img from '../images/sub_visual7.jpg';

const Summary = () => {
  return (
    <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>개요</strong>
          <span className='img'>
              <img src={Img} alt="" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Summary
