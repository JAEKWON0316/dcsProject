import React, { useEffect, useState } from 'react';
import Img from '../images/sub_visual7.jpg';

const History = () => {
  const History = [
    { class: "right", year: "2023", month: "2", detail: "대전청년을세계로 설립" },
    { class: "left", year: "2024", month: "4", detail: "(사)대전청년을세계로 출범" },
    { class: "right", year: "2024", month: "9", detail: "세종청년을세계로(세종지부) 설립" },
    { class: "left", year: "2024", month: "10", detail: "서울청년을세계로(서울지부) 및 <br />충청청년을세계로(충청지부) 설립" },
    { class: "right", year: "2024", month: "11", detail: "대전청년을세계로(대전본부) 설립 및 (사)대한청년을세계로로 명칭 변경" },
  ];

  const [currentBlock, setCurrentBlock] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const blocks = document.querySelectorAll('.hitory_wrap .y_block');
      blocks.forEach((block, index) => {
        const rect = block.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setCurrentBlock(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>연혁</strong>
          <span className='img'>
            <img src={Img} alt="" />
          </span>
        </div>
      </div>

      <div className='hitory_wrap'>
        <p className='title'>
          대한청년을 세계로
          <span>2023 ~ 2024</span>
        </p>
        <ol className='list' data-active-block={currentBlock}>
          {History.map((history, index) => (
            <li key={index} className={`y_block ${index === currentBlock ? 'active' : ''}`}>
              <div className={`${history.class} txt`}>
                <strong className='year'>{history.year}</strong>
                <div className='detail'>
                  <p>
                    <em className='num'>{history.month}월</em>
                    <span dangerouslySetInnerHTML={{ __html: history.detail }} />
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default History;
