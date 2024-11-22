import React from 'react'
import Img from '../images/pro.png'
import Img2 from '../images/organics.png'

const OrganizationChart = () => {
  return (
    <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>조직도</strong>
          <span className='img'>
              <img src={Img} alt=''/>
          </span>
        </div>
      </div>
      <div className='oraniztion_wrap'>
        <p className='oraniztion_tit'>organization</p>
        <div className='ask'><span className='blue'>(사)대한청년을세계로</span>는 청년들의 미래 지향적 역량 강화를 목표로 AI 혁신과 글로벌 네트워크 구축을 지원합니다. 다양한 위원회를 통해 산업 혁신과 국제적 협력을 선도하고 있습니다.</div>
        <div className='vision_wrap'>
          <img src={Img2} alt="조직도" />
        </div>
      </div>
    </div>
  )
}

export default OrganizationChart
