import React from 'react'
import Img from '../images/sub_visual7.jpg'
import Img2 from '../images/organic.png'

const OrganizationChart = () => {
  return (
    <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>조직도</strong>
          <span className='img'>
              <img src={Img} alt="" />
          </span>
        </div>
      </div>
      <div className='vision_wrap'>
        <img src={Img2} alt="조직도" />
      </div>
    </div>
  )
}

export default OrganizationChart
