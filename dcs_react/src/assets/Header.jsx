import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import Logo from '../images/logo03.png';
import Logo2 from '../images/logo04.png';

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [isDepth2Visible, setIsDepth2Visible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [clcikButton, setClickButton] = useState(false);


  const location = useLocation();
  const isNotMain = location.pathname !== '/';

  const handleClick = () => {
    setClickButton((prevState) => !prevState)
  }

  const handleMouseEnter = () => {
    setIsDepth2Visible(true);
    setIsHover(true);
  }
  const handleMouseLeave = () => {
    setIsDepth2Visible(false);
    setIsHover(false);
  }
  const handleCombinedMouseEnter = (index) => {
    handleMouseEnter();
    setActiveIndex(index);
  };
  
  const handleCombinedMouseLeave = () => {
    handleMouseLeave();
    setActiveIndex(null);
  };
  
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
        document.documentElement.style.setProperty('--depth2-height', `${height + height2}px + 3.5rem`);
      }
    };

    window.addEventListener('resize', updateDepth2Height);
    updateDepth2Height();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDepth2Height);
    };
    
  }, []);
  const menuData = [
    {
      depth1: '소개',
      depth2: [
        { link: '/summary', label: '개요' },
        { link: '/history', label: '연혁' },
        { link: '/greeting', label: '인사말' },
        { link: '/organizationChart', label: '조직도' }
      ],
    },
    {
      depth1: '구성',
      depth2: [
        { link: '/boardMembers', label: '임원명단' },
        { link: '/vision', label: '위원회' },
        { link: '/regionaloffices', label: '지부' }
      ],
    },
    {
      depth1: '프로그램',
      depth2: [
        { link: '/board/5', label: '미래전략포럼' },
        { link: '/board/6', label: 'AI혁신위원회' },
        { link: '/board/7', label: '글로벌 네트워킹' },
        { link: '/board/8', label: '지역 청년 네트워킹' },
      ],
    },
    {
      depth1: '갤러리',
      depth2: [
        { link: '/board/3', label: '활동사진' },
        { link: '/board/4', label: '언론 보도' },
      ],
    },
    {
      depth1: '공지사항',
      depth2: [
        { link: '/board/1', label: '공지사항' },
        { link: '/board/2', label: 'Q & A' },
      ],
    },
    {
        depth1: '후원&문의',
        depth2: [
          { link: '/sponsor', label: '후원하기' },
          { link: '/sponsorappli', label: '문의하기' },
        ],
      },
  ];
  return (
    <header>
    <div className={`header ${isFixed ? 'fixed' : ''} ${activeIndex !== null ? 'hover' : ''} ${isNotMain ? 'white' : ''} ${clcikButton ? 'click' : ''}`} onMouseLeave={handleCombinedMouseLeave}>
      <div className={`container ${isHover ? 'hover' : ''}`}>
        <div className="header-content">
         
          <Link to="/" className="logo">
              <img src={isNotMain ? Logo2 : Logo} alt="로고" />
            </Link>
          <nav className="nav"> 
            <ul className={`gnb ${clcikButton ? 'click' : ''}`}>
              {menuData.map((menu, index) => (
                <li
                  key={index}
                  onMouseEnter={() => handleCombinedMouseEnter(index)}
                >
                  <Link
                    to={menu.depth2[0].link}
                    className={`depth1 ${activeIndex === index ? 'underline hover' : ''}`}
                    aria-haspopup="true"
                    aria-expanded={isDepth2Visible}
                  >
                    {menu.depth1}
                  </Link>
                  <div className={`depth2 `}>
                    <ul>
                      {menu.depth2.map((subMenu, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subMenu.link}>{subMenu.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button type='button' className={`depthbtn ${activeIndex === index ? 'underline hover' : ''}`}>
                    <IoIosArrowDown />
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <button type='button' onClick={handleClick} className={`${clcikButton ? 'click' : ''}`}><IoMenu className='headerbtn'/></button>
        </div>
      </div>
    </div>



  </header>
  
  )
}

export default Header