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
            (사)대한청년을세계로
            </div>
            <div className='t-top-r'>
              <span><Link to='https://www.instagram.com/dae_cheong_se/?igsh=MWtraDk0emY0Mms0bg%3D%3D#'><FaInstagram /></Link></span>
              <span><Link to='/'><FaFacebookSquare /></Link></span>
              <span><Link to='/'><FaYoutube /></Link></span>
              <span><Link to='http://pf.kakao.com/_zxixeAn'><RiKakaoTalkFill /></Link></span>
            </div>
          </div>
          <div className='f-bottom'>
            <p>(35233) 대전광역시 서구 둔산로 63, 403-225</p>
            <span>대표 정민기</span>
            <span>TEL 042) 710-2177</span>
            {/* <span>FAX 042) 350-0353</span> */}
            <p className='pwr'>Powered by SmartCreator Inc.</p>
          </div>
          <div className='copyright'>
            Copyrights &copy; 2024 (사)대한청년을세계로. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer