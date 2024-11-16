import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [isDepth2Visible, setIsDepth2Visible] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [clcikButton, setClickButton] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

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
    setExpandedIndex(index);
  };
  
  const handleCombinedMouseLeave = () => {
    handleMouseLeave();
    setActiveIndex(null);
    setExpandedIndex(null)
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
  const menuData = [
    {
      depth1: '법인 소개',
      depth2: [
        { link: '/summary', label: '개요' },
        { link: '/history', label: '연혁' },
        { link: '/greeting', label: '이사장 인사말' },
        { link: '/vision', label: '목표와 비전' },
        { link: '/organizationChart', label: '조직 구조' },
        { link: '/boardMembers', label: '임원명단' },
        { link: '/regionaloffices', label: '시/도지부' },
      ],
    },
    {
      depth1: '프로그램',
      depth2: [
        { link: '/board/5', label: '미래전략포럼' },
        { link: '/board/6', label: 'AI혁신위원회' },
        { link: '/board/7', label: '지역 청년 네트워킹' },
        { link: '/board/8', label: 'ESG 청년 연합 봉사 활동' },
        { link: '/board/9', label: '글로벌 네트워킹' },
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
        { link: '/board/1', label: 'Q & A' },
        { link: '/board/2', label: '언론 보도' },
      ],
    },
    {
        depth1: '후원하기',
        depth2: [
          { link: '/sponsor', label: '후원하기' },
          { link: '/sponsor', label: '후원신청' },
        ],
      },
  ];
  return (
    <header>
    <div className={`header ${isFixed ? 'fixed' : ''} ${activeIndex !== null ? 'hover' : ''} ${isNotMain ? 'white' : ''} ${clcikButton ? 'click' : ''}`} onMouseLeave={handleCombinedMouseLeave}>
      <div className={`container ${isHover ? 'hover' : ''}`}>
        <div className="header-content">
          <Link to="/" className="logo"><img src="./logo03.png" alt="로고" /></Link>
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
                  <div className={`depth2 ${activeIndex === index ? 'hover' : ''}`}>
                    <ul>
                      {menu.depth2.map((subMenu, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subMenu.link}>{subMenu.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
          <button type='button' onClick={handleClick} className={`${clcikButton ? 'click' : ''}`}><IoMenu /></button>
        </div>
      </div>
    </div>
  </header>
  
  )
}

export default Header