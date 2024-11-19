import React from 'react'
import Img from '../images/pro.png'
const BoardMembers = () => {
  return (
    <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>임원명단</strong>
          <span className='img'>
              <img src={Img} alt="" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default BoardMembers
