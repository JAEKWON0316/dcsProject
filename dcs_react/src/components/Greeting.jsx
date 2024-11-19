import React from 'react'
import Img from '../images/intro.png';
import Img2 from '../images/sign01.png';
import Img3 from '../images/mk01.jpg';


const Greeting = () => {
  return (
    <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>인사말</strong>
          <span className='img'>
              <img src={Img} alt=''/>
          </span>
        </div>
      </div>
      <div className='greeting_wrap'>
        <div className='flex'>
          <div className='img'>
          <p className='greeting_title'>인/사/말</p>
            <div className='img_top'>
              <img src={Img3} alt=''/>
            </div>
            <div className='img_bottom'>
              <p>(사)대한청년을세계로</p>
              <p>이사장 | 정 민 기</p>
              <p>Chairman | Jeong Min Ki</p>
            </div>
          </div>
          <div className='ask'> 
          <p className='greeting_title'>Introduction</p>
            <p>안녕하세요. <span className=' tit blue'>(사)대한청년을세계로 이사장 정민기입니다.</span></p>

            <p>오늘날 우리는 AI와 첨단 기술이 이끄는 혁신의 시대를 살아가고 있습니다. 그러나 이러한 기술의 급격한 발전은 청년들에게 새로운 기회를 열어주는 동시에, 그 속도와 격차로 인해 준비되지 못한 청년들에게 좌절감을 안겨주는 주요 요인이 되기도 합니다. 기술과 변화의 흐름에 대한 이해와 준비 부족은 단순히 기회를 놓치는 데 그치지 않고, 나아가 청년들의 불안과 우울감을 증폭시키고 있습니다. (사)대한청년을세계로는 이러한 간극을 해소하고, 청년들이 변화와 기술을 능동적으로 이해하고 주도적인 미래를 만들어갈 수 있도록 지원하는 데 최선을 다하고자 합니다.</p>

            <p>또한, 글로벌화와 AI 시대를 맞이한 오늘날, 우리 법인은 해외의 선도적인 문화, 트렌드, 그리고 혁신적인 아이디어가 대한민국에 성공적으로 정착하고 융합될 수 있도록 가교 역할을 하고자 합니다. 이는 단순히 경제적 진출에 머무르지 않고, 대한민국이 문화적·경제적, 그리고 기술적 중심지로 자리 잡는 데 기여하는 것을 목표로 합니다. 이를 통해 청년들이 세계와 연결된 대한민국의 무대에서 더 큰 가능성을 발견하고, 주도적으로 글로벌화에 참여할 수 있는 발판을 제공하고자 합니다.</p>

            <p>(사)대한청년을세계로는 기술과 청년, 그리고 세계를 연결하며, 대한민국이 글로벌 혁신의 중심에서 빛날 수 있도록 최선을 다하겠습니다. 앞으로도 많은 관심과 응원을 부탁드립니다.</p>

            <p>감사합니다.</p>
            <p>정민기</p>
            <p>(사)대한청년을세계로 이사장</p>
<br />
            <p>Hello.This is Jung Min-Ki, Chairperson of The Korea Youth to the World Foundation.</p>

            <p>Our foundation was established to empower young people to navigate the waves of change and take the lead in shaping their own futures. Across both domestic and international contexts, one of the greatest challenges faced by today’s youth is keeping pace with rapidly evolving technologies and environments. We aim to bridge this gap and serve as a platform that connects young individuals with broader opportunities and a global perspective.</p>

            <p>In Korea, we focus on fostering a foundation for communication and collaboration that transcends regional and industrial boundaries. On the global stage, we provide avenues for cultural exchange and networking to help young people broaden their horizons and gain confidence. Our ultimate goal is not only to support but also to inspire young individuals to become leaders who drive meaningful change.</p>

            <p>The future is built by people. By helping each young person discover and realize their potential, we aim to contribute to a society and a world where everyone can grow together.</p>

            <p>The Korea Youth to the World Foundation aspires to be a hub that connects Korea and the world, and a driving force for positive change. We sincerely ask for your continued interest and support in this journey.</p>

            <p>Thank you.</p>
            <p>Jung Min-Ki</p>
            <p>Chairperson, The Korea Youth to the World Foundation</p>
            <img src={Img2} alt="서명" style={{width:200, height: 100}} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Greeting

