import React from 'react'
import Img from '../images/pro.png'

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
      <div className='vision_wrap'>
        <div className='ask'>
        다가오는 AI 시대와 글로벌 네트워크 시대를 대비하여 저희 법인은 청년들의 역량 강화와 혁신을 지원하는 위원회를 운영하고 있습니다.

AI 혁신위원회는 각 산업 분야에서 활동하는 청년들에게 AI 기술 활용에 대한 실질적인 인사이트를 제공하며, 이를 통해 미래 지향적인 역량 강화와 산업 혁신을 도모합니다. 청년들이 AI 기술을 실질적으로 활용하여 새로운 가치를 창출할 수 있도록 돕는 것을 목표로 하고 있습니다.

글로벌위원회는 국내 외국인 청년들과의 교류 및 해외 청년들과의 협력을 통해 글로벌 네트워크를 구축하고, 문화와 지식을 공유하는 장을 제공합니다. 이를 통해 국제적 감각을 함양하고, 다문화 협력을 기반으로 지속 가능한 미래를 열어가고자 합니다.
        </div>
        <div className='table_wrap'>
          <div className='table'>
          <h4>지부</h4>
          <table>
            <caption>
              <p>지부</p>
              성명, 소속 및 직책을 포함합니다.
            </caption>
            <colgroup>
              <col style={{ width: "30%" }} />
              <col style={{ width: "35%" }} />
              <col style={{ width: "35%" }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">이름</th> 
                <th scope="col">직책</th> 
                <th scope="col">직업</th> 
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row" className="nam">홍길동</th> 
                <td>대학생AI혁신위원회</td>
                <td>뭘까용</td>
              </tr>
              <tr>
                <th scope="row" className="nam">홍길동</th> 
                <td>직장인AI혁신위원회</td>
                <td>뭘까용</td>
              </tr>
              <tr>
                <th scope="row" className="nam">홍길동</th> 
                <td>취창업AI혁신위원회</td>
                <td>뭘까용</td>
              </tr>
            </tbody>
          </table>

          </div>
        </div>
      </div>
      <div>
        대전본부
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
        (사)대한청년을세계로 사외이사
        
        Christian Faulkner
        Embry-Riddle Aeronautical University
        </div>
    </div>
  )
}

export default RegionalOffices
