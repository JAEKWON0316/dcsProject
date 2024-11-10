import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Img from '../images/img_sec1_1.png';
import Img2 from '../images/icon_sec1_2.png'

import Img3 from '../images/001.jpg';
import Img4 from '../images/002.jpg';
import Img5 from '../images/003.jpg';
import Img6 from '../images/004.jpg';

const Main = () => {
  const sectionRefs = useRef([]);
  const [isVisible, setIsVisible] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideInterval = useRef(null);
  const slide = [
    {'url' : Img3, 'content': '대전 평강의집에서 주최하는 ‘햇빛보기’에 참석'},
    {'url' : Img4, 'content': '법인 이사장님의 기조연설'},
    {'url' : Img5, 'content': '선화보틀 프로젝트 업무협약식에 참석'},
    {'url' : Img6, 'content': '(주)마라톤의 후원금 전달식'}
  ];

  useEffect(() => {
    const currentSections = sectionRefs.current; 
  
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
  
    if(!isPlaying){
      slideInterval.current = setInterval(nextSlide, 3000);
    } else {
      clearInterval(slideInterval.current);
    }
  
    return () => {
      observers.forEach((observer, index) => {
        if (currentSections[index]) {
          observer.unobserve(currentSections[index]);
        }
      });
      clearInterval(slideInterval.current);
    };
  }, [isPlaying]);
  
  const menuData = [
    { nav: '미래전략포럼', path: '/id=1-1', content: "청년을 위한 미래 전략 토론 및 발표" },
    { nav: 'AI 혁신위원회', path: '/id=1-2', content: "AI를 통한 청년 혁신과 역량 강화" },
    { nav: '지역청년네트워킹', path: '/id=1-3', content: "지역 청년 간 교류와 네트워크 형성" },
    { nav: '글로벌네트워킹', path: '/id=1-5', content: "국제 교류를 통한 글로벌 협력" },
  ];

  const handlePlayToggle = () => {
    setIsPlaying((prev) => !prev);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slide.length);
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slide.length) % slide.length);
  }
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
                <span className='blue'>급변하는</span> 기술혁신,<br />
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

        <section 
        ref={(el) => (sectionRefs.current[2] = el)}
        className={`section visual3 motion ${isVisible[2] ? 'action' : ''}`}
        >
          <div className='noitce'>
            <h4 className='visual3m'>Noitce</h4>
            <ul className='ul'>
              <li>
                <Link to='/'>
                  <em>공지</em>
                  <strong>한국토지주택공사 광주전남지역본부 기간제근로자</strong>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <em className='blue'>공모</em>
                  <strong>한국토지주택공사 광주전남지역본부 기간제근로자</strong>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <em>공지</em>
                  <strong>한국토지주택공사 광주전남지역본부 기간제근로자</strong>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <em>공지</em>
                  <strong>한국토지주택공사 광주전남지역본부 기간제근로자</strong>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <em>공지</em>
                  <strong>한국토지주택공사 광주전남지역본부 기간제근로자</strong>
                </Link>
              </li>
              <li>
                <Link to='/'>
                  <em className='blue'>공모</em>
                  <strong>한국토지주택공사 광주전남지역본부 기간제근로자</strong>
                </Link>
              </li>
            </ul>
          </div>

          <div className='actives'>
            <h4 className='visual3m'>Active</h4>
            <div className='popupzone'>
            {slide.map((image, index) => (
  <div key={index}>
    <div
      className={`swiper pop_slide ${currentIndex === index ? 'active' : 'inactive'}`}
      style={{
        backgroundImage: `url(${image.url})`,  // image.url로 경로 참조
        opacity: currentIndex === index ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
    </div>
    <div 
      className={`activecomment ${currentIndex === index ? 'active' : 'inactive'}`}
      style={{
        opacity: currentIndex === index ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        position: 'absolute',
        bottom : 0
      }}
    >
      {image.content}
    </div>
  </div>
))}



              <div className='controls'>
                <button type='button' className='arrow prev' onClick={prevSlide} tabIndex='0' aria-ralbel='Previous slide'>
                  <span className='sr-only'>이전</span>
                </button>
                <button 
                  type='button' 
                  className={`con_btn stop ${!isPlaying ? 'active' : ''}`} 
                  onClick={handlePlayToggle}
                >
                  <span className='sr-only'>정지</span>
                </button>
                <button 
                  type='button' 
                  className={`con_btn play ${isPlaying ? 'active' : ''}`} 
                  onClick={handlePlayToggle}
                >
                  <span className='sr-only'>재생</span>
                </button>
                <button type='button' className='arrow next' onClick={nextSlide}>
                  <span className='sr-only'>다음</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Main;
