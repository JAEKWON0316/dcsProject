import React from 'react'
import Img from '../images/pro.png';

const SponsorAppli = () => {
  return (
    <div className='main_wrap'>
    <div className='intro'>
      <div className='visual'>
        <strong className='title'>후원신청</strong>
        <span className='img'>
            <img src={Img} alt="" />
        </span>
      </div>
    </div>
    <div className='sponseralli_wrap'>
      후원신청
    </div>
  </div>
  )
}

export default SponsorAppli
