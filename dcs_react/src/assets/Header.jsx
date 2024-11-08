import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [isDepth2Visible, setIsDepth2Visible] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = (index) => {
    setIsDepth2Visible(true);
    setIsHover(true);
    
  }
  const handleMouseLeave = () => {
    setIsDepth2Visible(false);
    setIsHover(false);
  }

  useEffect(()=>{
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsFixed(true); 
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const updateDepth2Height = () => {
      const depth1Element = document.querySelector('.header .container');
      const depth2Element = document.querySelector('.header .depth2');
      if (depth2Element) {
        const height = depth2Element.offsetHeight;
        const height2 = depth1Element.offsetHeight;
        document.documentElement.style.setProperty('--depth2-height', `${height + height2}px`);
      }
    };

    window.addEventListener('resize', updateDepth2Height);
    updateDepth2Height();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDepth2Height);
    };
  }, []);
  return (
    <header>
      <div className={`header ${isFixed ? 'fixed' : ''} ${isHover ? 'hover' : ''}`} onMouseLeave={handleMouseLeave}>
        <div className={`container ${isHover ? 'hover' : ''}`}>
          <div className='header-content'>
          <Link to='/' className='logo'>로고</Link>
          <nav className='nav'>
            <ul className='gnb'>
              
              <li onMouseEnter={handleMouseEnter}>
                <Link 
                  to='/' 
                  className={`depth1`}
                  aria-haspopup="true"
                  aria-expanded={isDepth2Visible}
                >
                  <span>법인 소개</span>
                  
                </Link>
                <div className={`depth2 ${isHover ? 'hover' : ''}`}>
                  <ul>
                    <li>
                      <Link to='/'>개요</Link>
                    </li>
                    <li>
                      <Link to='/'>이사장 인사말</Link>
                    </li>
                    <li>
                      <Link to='/'>목표와 비전</Link>
                    </li>
                    <li>
                      <Link to='/'>조직 구조</Link>
                    </li>
                    <li>
                      <Link to='/'>임원명단</Link>
                    </li>
                    <li>
                      <Link to='/'>시/도지부</Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li onMouseEnter={handleMouseEnter}>
                <Link to='/' className='depth1'
                  aria-haspopup="true"
                  aria-expanded={isDepth2Visible}
                >
                  프로그램
                </Link>
                <div className={`depth2 ${isHover ? 'hover' : ''}`}>
                  <ul>
                    <li>
                      <Link to='/'>미래전략포럼</Link>
                    </li>
                    <li>
                      <Link to='/'>AI 혁신위원회</Link>
                    </li>
                    <li>
                      <Link to='/'>지역청년 네트워킹</Link>
                    </li>
                    <li>
                      <Link to='/'>ESG 청년연합봉사활동</Link>
                    </li>
                    <li>
                      <Link to='/'>글로벌네트워킹</Link>
                    </li>
                    <li>
                      <Link to='/'>교육/세미나</Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li onMouseEnter={handleMouseEnter}>
                <Link to='/' className='depth1'
                  aria-haspopup="true"
                  aria-expanded={isDepth2Visible}
                >
                  갤러리
                </Link>
                <div className={`depth2 ${isHover ? 'hover' : ''}`}>
                  <ul>
                    <li>
                      <Link to='/'>활동사진</Link>
                    </li>
                    <li>
                      <Link to='/'>언론 보도</Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li onMouseEnter={handleMouseEnter}>
                <Link to='/' className='depth1'
                    aria-haspopup="true"
                    aria-expanded={isDepth2Visible}
                >
                  공지사항
                </Link>
                <div className={`depth2 ${isHover ? 'hover' : ''}`}>
                  <ul>
                    <li>
                      <Link to='/notice'>공지사항</Link>
                    </li>
                    <li>
                      <Link to='/notice'>언론 보도</Link>
                    </li>
                  </ul>
                </div>
              </li>

            </ul>
          </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header