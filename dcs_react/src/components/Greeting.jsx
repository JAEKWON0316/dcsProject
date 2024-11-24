import React from 'react'
import Img from '../images/pro.png';
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
            <p>안녕하십니까,</p>
            <p><span className=' tit blue'>(사)대한청년을세계로 이사장 정민기입니다.</span></p>

            <p>우리 법인은 AI 시대라는 거대한 변혁의 중심에서, 기술 혁신과 세대를 연결하는 다리 역할을 하고자 합니다. 특히, 장년 세대와 청년 세대, 그리고 미래 세대를 함께 소통하고 협력하며 새로운 가능성을 열어가는 가교 역할을 수행하고 있습니다.</p>

            <p>오늘날 우리는 산업화와 디지털화를 넘어 AI 혁명이라는 국가적 의제와 긴밀히 연결된 새로운 시대를 맞이하고 있습니다.  AI는 경제, 안보, 정책 등 모든 영역에서 핵심 전략으로 자리 잡고 있지만, 여전히 많은 사람들에게 낯설고 접근하기 어려운 과제로 느껴지고 있습니다.</p>

            <p>AI 기술의 발전은 제품화를 시작으로 본격화되었습니다. 기업들이 AI를 활용해 혁신적인 가치를 창출하며 산업과 소프트웨어에 통합하는 단계가 있었고, 이후 국가적 참여로 확장되면서 AI는 경제와 정책의 핵심 요소로 자리 잡았습니다. 마지막으로 초지능 단계에 이르러 기술이 인간의 창의성과 지성을 뛰어넘으며, 세대 간 사고와 협력의 패러다임도 새롭게 요구되고 있습니다.</p>

            <p>이 변화 속에서 중요한 점은 장년 세대의 경험과 통찰, 청년 세대의 혁신과 도전, 그리고 미래 세대의 잠재력과 가능성이 유기적으로 연결되어야 한다는 것입니다. 장년 세대는 풍부한 경험을 통해 방향성을 제시할 수 있으며, 청년 세대는 AI 기술을 활용해 혁신의 중심에 서야 합니다. 더 나아가 미래 세대는 이러한 환경 속에서 교육과 지원을 통해 새로운 시대를 준비할 수 있도록 해야 합니다.</p>

            <p>우리 (사)대한청년을세계로는 이 세 세대가 함께 협력하며 AI 시대의 혜택을 공평하게 나눌 수 있도록 다양한 방안과 기회를 마련하고 있습니다. 특히, 세대 간 단절을 극복하고 각 세대가 가진 강점을 결합해 지속 가능한 발전을 이루는 데 주력하고 있습니다.</p>

            <p>청년 세대의 도전과 성취, 장년 세대의 지혜, 그리고 미래 세대의 잠재력이 조화롭게 어우러질 때, 우리는 더 밝고 희망적인 미래를 만들어갈 수 있습니다. 저희는 앞으로도 여러분과 함께 AI 시대의 도전과 기회를 논의하며, 실질적이고 지속 가능한 해결책을 제시하기 위해 최선을 다하겠습니다.</p>
            <p>(사)대한청년을세계로 이사장</p> <img src={Img2} alt="서명" style={{width:200, height: 100}} />
<br />
<br />
<br />
            <p>Hello,</p>
            <p>I am Jeong Min Ki, the President of Korea Youth To The World (KYTW).</p>

            <p>Our organization aims to serve as a bridge connecting technological innovation and generational collaboration in the midst of a transformative era defined by AI. We strive to foster communication and cooperation among the older, younger, and future generations, opening new possibilities together.</p>

            <p>Today, we are entering a new era that extends beyond industrialization and digitalization into what can be called the AI Revolution—a national agenda deeply intertwined with our society. While AI has become a central strategy in economics, security, and policy, it still feels unfamiliar and inaccessible to many.</p>

            <p>The evolution of AI technology has unfolded through several stages. It began with commercialization, where companies leveraged AI to create value and integrate it into industries and software. Subsequently, it expanded into the national sphere, embedding AI as a key factor in the economy and policymaking. Finally, as we approach the superintelligence phase, where technology surpasses human creativity and intelligence, a new paradigm of intergenerational thinking and collaboration is required.</p>

            <p>In this era of transformation, it is crucial to connect the experience and insights of the older generation, the innovation and boldness of the younger generation, and the potential and possibilities of future generations. The older generation can provide direction through their vast experience, while the younger generation stands at the forefront of innovation, leveraging AI to lead the way. Moreover, future generations must be equipped with education and support to prepare for the challenges and opportunities of this new age.</p>

            <p>Korea Youth To The World (KYTW) is dedicated to creating opportunities and solutions that enable these three generations to collaborate and share the benefits of the AI era equitably. We are particularly focused on overcoming generational gaps and combining the strengths of each generation to achieve sustainable progress.</p>

            <p>When the younger generation's boldness and achievements, the older generation's wisdom, and the future generation's potential come together harmoniously, we can create a brighter and more hopeful future. Our organization remains committed to discussing the challenges and opportunities of the AI era with you and presenting practical and sustainable solutions.</p>

            <p>Thank you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Greeting

