import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import Img from '../images/sub_visual6.jpg';
import { FcOpenedFolder } from "react-icons/fc";

import { Button } from 'react-bootstrap';

const Content = () => {
  const { role, id } = useParams();
  const location = useLocation();
  const [board, setBoard] = useState(null);
  const navigate = useNavigate(); // navigate 함수 생성
  const [images, setImages] = useState([]);  // 이미지 데이터를 저장할 상태
  const [files, setFiles] = useState([]);    // 파일 데이터를 저장할 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousId, setPreviousId] = useState(null);
  const [nextId, setNextId] = useState(null);

  const generateNavigationUrl = (id) => {
    const urlParts = location.pathname.split('/');
    if (urlParts.includes('role')) {
      // URL에 'role'이 포함된 경우
      return `/board/role/${role}/${id}`;
    } else {
      // URL에 'role'이 포함되지 않은 경우
      return `/board/${role}/${id}`;
    }
  };

  useEffect(() => {
    const fetchBoard = async () => {
   
      try {
        setLoading(true);
        
        // 로컬 스토리지에서 조회 시간 확인
        const viewedBoards = JSON.parse(localStorage.getItem('viewedBoards')) || {};
        const lastViewedTime = viewedBoards[id];
        const currentTime = new Date().getTime();
        
        // 마지막 조회 시간이 24시간 이상 지났을 경우 조회수 증가
        if (!lastViewedTime || currentTime - lastViewedTime > 24 * 60 * 60 * 1000) {
          await axios.post(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/board/${id}/increment-hit`);
          viewedBoards[id] = currentTime;
          localStorage.setItem('viewedBoards', JSON.stringify(viewedBoards));
        }
        
        // 게시글 데이터 가져오기
        const boardResponse = await axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/board/role/${role}/${id}`);
        setBoard(boardResponse.data);


    
        // 이전/다음 게시글 ID 가져오기
        const response = await axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/board/${role}/${id}/btn`);
        setPreviousId(response.data.prev?.id || null);
        setNextId(response.data.next?.id || null);
      

        // 이미지 데이터 가져오기
        const imageResponse = await axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/images/board/${id}`);
        setImages(imageResponse.data);

        // 파일 데이터 가져오기
        const fileResponse = await axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/files/board/${id}`);
        setFiles(fileResponse.data);

      } catch (err) {
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [role, id]);

  const handleFileDownload = async (file) => {
    try {
      // 파일 다운로드 횟수 증가 요청 보내기 (POST 방식)
      const response = await axios.post(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/files/board/${file.id}`);
      
      // 서버에서 카운트 증가 후, 업데이트된 카운트를 받아오기
      if (response.status === 200) {
        // 카운트 증가 성공 시 파일 카운트 업데이트
        const updatedFile = { ...file, count: file.count + 1 }; // 카운트 증가 반영
        // 업데이트된 파일 정보를 파일 리스트에서 변경
        setFiles(prevFiles => prevFiles.map(f => (f.id === updatedFile.id ? updatedFile : f)));
        
        // 파일 다운로드
        const downloadLink = `https://dcs-site-5dccc5b2f0e4.herokuapp.com/uploads/${file.filePath}`;
        const link = document.createElement('a');
        link.href = downloadLink;
        link.download = file.fileName;  // 파일 이름을 다운로드로 설정
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);  // 다운로드 후 링크 제거
      }
    } catch (err) {
      console.error('파일 다운로드 중 오류 발생:', err);
    }
  };


  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString); // Safari와 호환되는 날짜 객체 생성
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}.${month}.${day}`;
    } catch (err) {
      console.error("Invalid date format:", dateString);
      return 'Invalid Date'; // 오류 처리
    }
  };

  if (loading) return 
        <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
        </div>;
  if (error) return <p>{error}</p>;

  return (
    <div className='container2'>
      
      <span className='img'>
            <img src={Img} alt='' />
          </span>

      {board ? (
        <div className="listbox">
       <div className="btn_box my-5 pt-5">
       <div className="btn_box1">
      {previousId !== null && (
        <Button variant="primary" onClick={() => navigate(generateNavigationUrl(previousId))}>
          이전글
        </Button>
      )}
      {nextId !== null && (
        <Button variant="primary" onClick={() => navigate(generateNavigationUrl(nextId))}>
          다음글
        </Button>
      )}
      </div>
      <Button variant="primary" onClick={() => navigate(`/board/${role}`)}>목록</Button>
    </div>

          <div className="mt-2 pt-2 board-box">
          <span className="ft-bold">작성자: {board.writer}</span>
          <span className="mr-2">
              등록일: {board.bbsCreatedTime}
            </span>
            <span className="mr-4"><label className="font-italic">조회</label> {board.hit}회</span>
          </div>
          
           <h5 className="mt-3 title_box p-3">{board.title}</h5> 
            {/* 파일이 있을 경우 파일 목록 표시 */}
            {files.length > 0 && (
            <div className="mt-2 pt-2 border-top file-box">
              <h5 className='fw-bold'>첨부 파일: <FcOpenedFolder /></h5>
              <ul>
                {files.map((file) => (
                  <li key={file.id}>
                    <a  href={`https://dcs-site-5dccc5b2f0e4.herokuapp.com/uploads/${file.filePath}`}
                        onClick={(e) => {
                          e.preventDefault();  // 기본 링크 동작 방지 (자동 다운로드 방지)
                        handleFileDownload(file); // 파일 다운로드 함수 호출

                      }}>
                      <span>{file.fileName}</span></a> <span>({file.fileSize})</span>
                    <br/>
                    <span> 다운로드 횟수: {file.count}</span>
                    <span> DATE:{formatDate(file.uploadDate)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
         
                      

        {/* 이미지가 있을 경우 보여주기 */}
          {images.length > 0 && (
            <div className="image-gallery">
              {images.map((image) => (
                <div>
                <img
                  key={image.id}
                  src={`https://dcs-site-5dccc5b2f0e4.herokuapp.com/uploads/${image.imageUrl}`}
                  alt="게시글 이미지"
                />
                </div>
              ))}
            </div>
          )}

        

          <div className="mt-3 content_box">
            {board.content.split('\\n').map((line, index) => (
              <p 
                key={index} 
                className="content-paragraph"
                style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}
              >
                {line}
              </p>
            ))}
          </div>

        <div className="btn_box my-5 pt-5">
          <div className="btn_box1">
      {previousId !== null && (
        <Button variant="primary" onClick={() => navigate(generateNavigationUrl(previousId))}>
          이전글
        </Button>
      )}
      {nextId !== null && (
        <Button variant="primary" onClick={() => navigate(generateNavigationUrl(nextId))}>
          다음글
        </Button>
      )}
      </div>
      <Button variant="primary" onClick={() => navigate(`/board/${role}`)}>목록</Button>
    </div>
        </div>
      ) : (
        <p>게시글이 존재하지 않습니다.</p>
      )}
    </div>
  );
};

export default Content;
