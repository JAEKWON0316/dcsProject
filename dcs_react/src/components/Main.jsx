import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Img from '../images/img_sec1_1.png';
import Img2 from '../images/icon_sec1_2.png'

const Main = () => {
  const sectionRefs = useRef([]);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const currentSections = sectionRefs.current; // sectionRefs.current를 변수에 복사
  
    const observers = currentSections.map((section, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible((prevState) => ({
            ...prevState,
            [index]: entry.isIntersecting,
          }));
        },
        { threshold: 0.1 }
      );
  
      if (section) {
        observer.observe(section);
      }
  
      return observer;
    });
  
    return () => {
      observers.forEach((observer, index) => {
        if (currentSections[index]) {
          observer.unobserve(currentSections[index]);
        }
      });
    };
  }, []);

  const menuData = [
    { nav: '미래전략포럼', path: '/id=1-1', content: "청년을 위한 미래 전략 토론 및 발표" },
    { nav: 'AI 혁신위원회', path: '/id=1-2', content: "AI를 통한 청년 혁신과 역량 강화" },
    { nav: '지역청년네트워킹', path: '/id=1-3', content: "지역 청년 간 교류와 네트워크 형성" },
    { nav: '글로벌네트워킹', path: '/id=1-5', content: "국제 교류를 통한 글로벌 협력" },
  ];

  return (
    <div className='main'>
      <video
        src="/media/videos/766463_Office Angry Rage Frozen Moment_By_MXR_Productions_Artlist_HD.mp4"
        autoPlay
        loop
        muted
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          objectFit: 'cover'
        }}
      />
      <div className='main_wrap'>
        
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          className={`section visual motion ${isVisible[0] ? 'action' : ''}`}
        >
          <div className='visual1'>
            <div className='about-l'>
              <h1>
                <span className='blue'>급변하는</span> 기술혁신,{' '}
                <span className='blue'>뒤처지는</span> 인식의 간극
              </h1>
            </div>
            <div className='about'>
              <div className='about-img'>
                <img src={Img} alt="" />
              </div>
              <div className='about-text'>
                <h2>대한청년세계로는?</h2>
                <p>국민주거생활 향상상과 국토의 효율적 이용을 도모하여 국민 경제 발전에 이바지 합니다.</p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          className={`section visual2 motion ${isVisible[1] ? 'action' : ''}`}
        >
          <ul>
            {menuData.map((nav, index) => (
              <li key={index}>
                <Link to={nav.path}>
                  <div className='item'>
                    <div className='icon'>
                      <img src={Img2} alt="" />
                    </div>
                    <div className='desc'>
                      <strong>
                          {nav.nav}
                      </strong>
                      <p>
                        {nav.content}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
};

export default Main;
