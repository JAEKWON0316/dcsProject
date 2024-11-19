import React from 'react'
import Img from '../images/pro.png';

const Sponsor = () => {
  return (
    <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>후원하기</strong>
          <span className='img'>
              <img src={Img} alt="" />
          </span>
        </div>
      </div>
      <div className='sponser_wrap'>
        후원하기
      </div>
    </div>
  )
}

export default Sponsor
