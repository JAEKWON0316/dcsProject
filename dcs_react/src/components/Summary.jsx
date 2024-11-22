import React from 'react'
import Img from '../images/pro.png';
import Img3 from '../images/intro_logo01.jpg'
import Img4 from '../images/vision.png'

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
      <div className='summary_wrap'>
        <div className='inner'>
          <div className='ask'>
          <h1 className='mb-5'>법인 개요</h1>
          (사)대한청년을세계로는 급변하는 기술 혁신과 글로벌 트렌드 속에서 청년들이 미래를 주도적으로 설계할 수 있도록 돕기 위해 설립된 비영리법인입니다.

          저희 법인은 미래전략포럼을 중심으로 국내외 네트워크를 구축하며, 청년들이 기술과 사회의 간극을 극복하고 글로벌 리더로 성장할 수 있는 기회를 제공합니다. 또한, 지역 사회와 연계된 다양한 프로젝트를 통해 국내에서의 경쟁력 강화와 함께 국제적 교류를 확대하고 있습니다.
          </div>
          <div className='img'>
          <img src={Img3} alt="" />
        </div>
        </div>
      </div>
      <div className='vision_wrap'>
        <img src={Img4} alt="목표와 경영비전" />
      </div>
    </div>
  )
}

export default Summary
