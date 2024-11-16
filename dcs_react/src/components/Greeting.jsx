import React from 'react'
import Img from '../images/sub_visual7.jpg'
import Img2 from '../images/sign01.png'

const Greeting = () => {
  return (
    <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>이사장 인사말</strong>
          <span className='img'>
              <img src={Img} alt="" />
          </span>
        </div>
        <div> 이사장 인사말
안녕하세요.
(사)대한청년을세계로 이사장 정민기입니다.

우리 법인은 청년들이 변화의 물결 속에서 길을 잃지 않고 주도적으로 미래를 열어갈 수 있도록 돕기 위해 시작되었습니다. 국내외를 막론하고 청년들이 직면한 가장 큰 도전은 급변하는 기술과 환경 속에서 뒤처지지 않는 것입니다. 우리는 이러한 간극을 해소하고, 청년들에게 더 넓은 세상과 기회를 연결해주는 다리가 되고자 합니다.

국내에서는 청년들이 지역과 산업의 경계를 넘어 소통하고 협력할 수 있는 기반을 만들고, 글로벌 무대에서는 세계와의 교류를 통해 시야를 확장하며 자신감을 갖도록 돕고 있습니다. 우리가 추구하는 목표는 단순한 지원을 넘어, 청년 스스로가 변화를 이끌어낼 수 있는 리더로 성장하도록 함께하는 것입니다.

미래를 만들어가는 것은 결국 사람입니다. 청년 한 명 한 명이 자신의 가치를 발견하고 발휘할 수 있도록 지원하며, 나아가 우리 사회와 세계가 함께 발전할 수 있는 비전을 공유하겠습니다.

(사)대한청년을세계로는 청년과 함께, 국내와 세계를 잇는 연결점이자 변화의 중심이 되겠습니다. 많은 관심과 응원 부탁드립니다.

감사합니다.
정민기
(사)대한청년을세계로 이사장

Message from the Chairperson
Hello,
This is Jung Min-Ki, Chairperson of The Korea Youth to the World Foundation.

Our foundation was established to empower young people to navigate the waves of change and take the lead in shaping their own futures. Across both domestic and international contexts, one of the greatest challenges faced by today’s youth is keeping pace with rapidly evolving technologies and environments. We aim to bridge this gap and serve as a platform that connects young individuals with broader opportunities and a global perspective.

In Korea, we focus on fostering a foundation for communication and collaboration that transcends regional and industrial boundaries. On the global stage, we provide avenues for cultural exchange and networking to help young people broaden their horizons and gain confidence. Our ultimate goal is not only to support but also to inspire young individuals to become leaders who drive meaningful change.

The future is built by people. By helping each young person discover and realize their potential, we aim to contribute to a society and a world where everyone can grow together.

The Korea Youth to the World Foundation aspires to be a hub that connects Korea and the world, and a driving force for positive change. We sincerely ask for your continued interest and support in this journey.

Thank you.
Jung Min-Ki
Chairperson, The Korea Youth to the World Foundation</div>
      </div>
      <div className='vision_wrap'>
        <img src={Img2} alt="서명" style={{width:200, height: 100}} />
      </div>
    </div>
  )
}

export default Greeting
