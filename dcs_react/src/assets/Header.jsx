// import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  // const [isFixed, setIsFixed] = useState(false);

  // useEffect(()=>{
  //   const handleScroll = () => {
  //     if (window.scrollY > 10) {
  //       setIsFixed(true); 
  //     } else {
  //       setIsFixed(false);
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  return (
    <header>
    <div className='header'>
    {/* <div className={`header-background ${isFixed ? 'fixed' : ''}`}></div>  */}
      <div className='container'>
        <div className='header-content'>
        <Link to='/' className='logo'>로고</Link>
        <nav className='nav'>
          <ul className='gnb'>
            <li>
              <Link to='/' className='depth1'>법인 소개</Link>
              <div className='depth2'>
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

            <li>
              <Link to='/' className='depth1'>프로그램</Link>
              <div className='depth2'>
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

            <li>
              <Link to='/' className='depth1'>갤러리</Link>
              <div className='depth2'>
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

            <li>
              <Link to='/' className='depth1'>공지사항</Link>
              <div className='depth2'>
                <ul>
                  <li>
                    <Link to='/'>공지사항</Link>
                  </li>
                  <li>
                    <Link to='/'>언론 보도</Link>
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