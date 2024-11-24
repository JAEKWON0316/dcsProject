import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


import Img from '../images/intro_logo01.jpg';

import Img3 from '../images/001.jpg';
import Img4 from '../images/002.jpg';
import Img5 from '../images/003.jpg';
import Img6 from '../images/004.jpg'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { RiSingleQuotesL } from "react-icons/ri";
import { RiSingleQuotesR } from "react-icons/ri";
import { SiComma } from "react-icons/si";
import { HiCube } from "react-icons/hi";


const KakaoMap = () => {
  const mapContainer = useRef(null); // 지도 요소를 참조할 ref
  const [map, setMap] = useState(null); // 지도 상태

  useEffect(() => {
    // 카카오 맵 API 로드
    const kakaoApiKey = process.env.REACT_APP_KAKAO_API_KEY;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = mapContainer.current;
        const options = {
          center: new window.kakao.maps.LatLng(36.3506, 127.3845), // 기본 위치 (대전)
          level: 3, // 지도 확대 수준
        };
        const newMap = new window.kakao.maps.Map(container, options);
        setMap(newMap);

        // 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(36.3506, 127.3845); // 마커 위치
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(newMap);

        // 확대/축소 컨트롤 추가
        const zoomControl = new window.kakao.maps.ZoomControl();
        newMap.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      });
    };

    return () => {
      document.head.removeChild(script); // 컴포넌트가 unmount 될 때 스크립트 제거
    };
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }}></div>;
};


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
  const menuData2 = [
    { title : '대한청년세계로 소개', content : '대한청년세계로 이사회 의장과 상임인사의 인사와 지역별 대한세계로 회장을 만날 수 있습니다.', path : '/', class :'profile'},
    { title : '대한청년세계로 연혁', content : '대한청년세계가 설립된 해부터 현재까지의 활동 발자취를 한눈에 볼 수 있습니다.', path : '/', class : 'story'},
    { title : '후원하기', content : '작은 나눔이 큰 힘이 됩니다.', path : '/', class: 'sponser'},
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
        playsInline
        src="/media/videos/1119.mov"
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
                <span className='blue'>급변하는</span> 기술혁신<SiComma  className='comma'/><br />
                <span className='blue'>뒤처지는</span> 인식의 간극
              </h1>
            </div>
            <div className='about'>
              <div className='about-img'>
                <img src={Img} alt="" />
              </div>
              <div className='about-text'>
                <h2>
                <RiSingleQuotesL className='quotes'/>
                  (사)대한청년을세계로
                <RiSingleQuotesR className='quotes'/>
                  는</h2>
                <p className='h6'>다가오는 미래 시대를 대비하여 청년들의 인지 격차를 해소하고, 역량 있는 글로벌 인재로 성장할 수 있도록 지원하는 단체입니다. </p>
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
                    <HiCube className='icon-img'/>
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
              <Link to=''>
                <div key={index}>
                  <div
                    className={`swiper pop_slide ${currentIndex === index ? 'active' : 'inactive'}`}
                    style={{
                      backgroundImage: `url(${image.url})`,  
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
                      transition: 'opacity 1s ease-in-out'
                    }}
                  >
                    {image.content}
                  </div>
                </div>
                </Link>
              ))}

              <div className='controls'>
                <button type='button' className='arrow prev' onClick={prevSlide} tabIndex='0' aria-label='Previous slide'>
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

        <section 
        ref={(el) => (sectionRefs.current[3] = el)}
        className={`section visual4 motion ${isVisible[3] ? 'action' : ''}`}
        >
          <div className='title'>
            <p>미래전략포럼 (Future Strategy Forum)</p>
            <span>우리는 급변하는 시대, 청년들의 인식 격차를 해소하고 미래를 함께 준비하기 위해 미래전략포럼을 개최합니다.</span><br />
            <p className='fs-5 fw-normal mt-2'><a href="https://www.daecheongse.co.kr">https://www.daecheongse.co.kr</a></p>
          </div>
          <div className='wrap'>
            <ul>
              {menuData2.map((nav, index) => (
                <li className={`wrap-menu ${nav.class}`}>
                  <Link to={nav.path}>
                    <div className='wrap-title'>
                      <p>{nav.title}</p>
                      <span>{nav.content}</span>
                      <p className='wrapLink'>
                        바로가기
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section 
        ref={(el) => (sectionRefs.current[4] = el)}
        className={`section visual5 motion ${isVisible[4] ? 'action' : ''}`}
        >
          <div className="footbanner">
              <Swiper
                className="swiper-container"
                modules={[Autoplay, Pagination, Navigation]}  
                slidesPerView={5} 
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false, // 터치 후 autoplay 유지
                }}
                loop={true}
                loopAdditionalSlides={5}
                navigation={true} 
                touchEventsTarget="wrapper" // 추가
                passiveListeners={true}    // 추가
                breakpoints={{
                  1024: { 
                    slidesPerView: 4, 
                  },
                  768: { 
                    slidesPerView: 3, 
                  },
                  480: {
                    slidesPerView: 1,
                  },
                  320: { slidesPerView: 1 },
                }}
              >
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img3} alt="slide1" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img4} alt="slide2" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img5} alt="slide3" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img6} alt="slide3" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img3} alt="slide1" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img4} alt="slide2" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img5} alt="slide3" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img6} alt="slide3" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img3} alt="slide3" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img4} alt="slide2" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img5} alt="slide3" />
                </Link>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <Link to="">
                  <img src={Img6} alt="slide3" />
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
  
        <section className="map-section mt-5">
        <div className='title'>
            <p className='road_underline'>찾아오시는 길</p>
          </div>       
        <KakaoMap />
      </section>
        
      </div>
    </div>
  );
};

export default Main;
