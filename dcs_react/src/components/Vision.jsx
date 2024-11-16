import React from 'react'
import Img from '../images/sub_visual7.jpg'
import Img2 from '../images/vision.png'
const Vision = () => {
  return (
    <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>목표와 비전</strong>
          <span className='img'>
              <img src={Img} alt="" />
          </span>
        </div>
      </div>
      <img src={Img2} alt="" />
    </div>
  )
}

export default Vision
