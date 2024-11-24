import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FcOpenedFolder } from 'react-icons/fc';
import proImg from '../images/pro.png';
import { Button, Spinner } from 'react-bootstrap';

const Content = () => {
  const { role, id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [board, setBoard] = useState(null);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousId, setPreviousId] = useState(null);
  const [nextId, setNextId] = useState(null);

  const generateNavigationUrl = (id) => {
    const urlParts = location.pathname.split('/');
    return urlParts.includes('role')
      ? `/board/role/${role}/${id}`
      : `/board/${role}/${id}`;
  };

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        setLoading(true);
        setError(null);

                // 로컬 스토리지 조회수 처리
        const viewedBoards = JSON.parse(localStorage.getItem('viewedBoards')) || {};
        const lastViewedTime = viewedBoards[id];
        const currentTime = new Date().getTime();
  
        if (!lastViewedTime || currentTime - lastViewedTime > 24 * 60 * 60 * 1000) {
          await axios.post(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/board/${id}/increment-hit`);
          viewedBoards[id] = currentTime;
          localStorage.setItem('viewedBoards', JSON.stringify(viewedBoards));
        }
  


        // 병렬로 데이터 요청
        const [boardRes, navRes, imageRes, fileRes] = await Promise.all([
          axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/board/role/${role}/${id}`),
          axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/board/${role}/${id}/btn`),
          axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/images/board/${id}`),
          axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/files/board/${id}`)
        ]);

        // 상태 업데이트
        setBoard(boardRes.data);
        setPreviousId(navRes.data.prev?.id || null);
        setNextId(navRes.data.next?.id || null);
        setImages(imageRes.data);
        setFiles(fileRes.data);
      } catch (err) {
        console.error(err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchBoardData();
  }, [role, id]);

  const handleFileDownload = async (file) => {
    try {
      const response = await axios.post(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/files/board/${file.id}`);
      if (response.status === 200) {
        // 파일 다운로드 처리
        const downloadLink = `${file.filePath}`;
        const link = document.createElement('a');
        link.href = downloadLink;
        link.download = file.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // 다운로드 카운트 업데이트
        setFiles((prevFiles) =>
          prevFiles.map((f) => (f.id === file.id ? { ...f, count: f.count + 1 } : f))
        );
      }
    } catch (err) {
      console.error('파일 다운로드 중 오류 발생:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date
        .getDate()
        .toString()
        .padStart(2, '0')}`;
    } catch {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="main_wrap">
        <div className="intro">
          <div className="visual">
            <strong className="title">
              {role === '1' && '공지사항'}
              {role === '2' && 'Q & A'}
              {role === '3' && '활동사진'}
              {role === '4' && '언론보도'}
              {role === '5' && '미래전략포럼'}
              {role === '6' && 'AI혁신위원회'}
              {role === '7' && '글로벌 네트워킹'}
              {role === '8' && '지역 청년 네트워킹'}
            </strong>
            <span className="img">
              <img src={proImg} alt="banner" />
            </span>
          </div>
        </div>
        <div className="loading-spinner">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="main_wrap">
      {/* 헤더와 배너 */}
      <div className="intro">
        <div className="visual">
          <strong className="title">
            {role === '1' && '공지사항'}
            {role === '2' && 'Q & A'}
            {role === '3' && '활동사진'}
            {role === '4' && '언론보도'}
            {role === '5' && '미래전략포럼'}
            {role === '6' && 'AI혁신위원회'}
            {role === '7' && '글로벌 네트워킹'}
            {role === '8' && '지역 청년 네트워킹'}
          </strong>
          <span className="img">
            <img src={proImg} alt="banner" />
          </span>
        </div>
      </div>
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
                    <a  href={`${file.filePath}`}
                        onClick={(e) => {
                          e.preventDefault();  
                        handleFileDownload(file); 

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
         
                      

        {/* 이미지 */}
          {images.length > 0 && (
            <div className="image-gallery">
              {images.map((image) => (
                <div>
                <img
                  key={image.id}
                  src={`${image.imageUrl}`}
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
