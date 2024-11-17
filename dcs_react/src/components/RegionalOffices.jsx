import React from 'react'
import Img from '../images/sub_visual7.jpg'

const RegionalOffices = () => {
  return (
    <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>지부</strong>
          <span className='img'>
              <img src={Img} alt="" />
          </span>
        </div>
      </div>
      <div>대전본부
본부장 홍성호 
(주)RPM 사내이사
(사)대한청년을세계로 발기인
(사)대한청년을세계로 부회장

세종지부
지부장 문찬우
전 국회 선임비서관
(사)대한청년을세계로 사외이사

서울지부
지부장 윤덕제
JUDDANG 사장
(사)대한청년을세계로 사외이사</div>
    </div>
  )
}

export default RegionalOffices
