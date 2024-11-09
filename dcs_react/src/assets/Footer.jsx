import React from 'react'
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiKakaoTalkFill } from "react-icons/ri";
const Footer = () => {
  return (
    <footer>
      <div className='footer'>
        <div className='main_wrap'>
          <div className='f-top'>
            <div className='t-top-l'>
            대한청년을세계로
            </div>
            <div className='t-top-r'>
              <span><Link to='/'><FaInstagram /></Link></span>
              <span><Link to='/'><FaFacebookSquare /></Link></span>
              <span><Link to='/'><FaYoutube /></Link></span>
              <span><Link to='/'><RiKakaoTalkFill /></Link></span>
            </div>
          </div>
          <div className='f-bottom'>
            <p>(34051)대전광역시 유성구 문지로 193 (KAIST 문자캠퍼스)F동 102호</p>
            <span>대표 장능인</span>
            <span>TEL 042) 350-0352</span>
            <span>FAX 042) 350-0353</span>
            <p className='pwr'>Powered by SmartCreator Inc.</p>
          </div>
          <div className='copyright'>
            Copyrights 2023 미담장학회. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer