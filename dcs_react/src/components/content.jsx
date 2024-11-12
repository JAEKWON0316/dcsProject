import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const Content = () => {
  const { role, id } = useParams();
  
  const [board, setBoard] = useState(null);
  const [images, setImages] = useState([]);  // 이미지 데이터를 저장할 상태
  const [files, setFiles] = useState([]);    // 파일 데이터를 저장할 상태 추가
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          await axios.post(`http://localhost:8080/api/board/${id}/increment-hit`);
          viewedBoards[id] = currentTime;
          localStorage.setItem('viewedBoards', JSON.stringify(viewedBoards));
        }
        
        // 게시글 데이터 가져오기
        const boardResponse = await axios.get(`http://localhost:8080/api/board/role/${role}/${id}`);
        setBoard(boardResponse.data);

        // 이미지 데이터 가져오기
        const imageResponse = await axios.get(`http://localhost:8080/api/images/board/${id}`);
        setImages(imageResponse.data);

        // 파일 데이터 가져오기
        const fileResponse = await axios.get(`http://localhost:8080/api/files/board/${id}`);
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
      const response = await axios.post(`http://localhost:8080/api/files/board/${file.id}`);
      
      // 서버에서 카운트 증가 후, 업데이트된 카운트를 받아오기
      if (response.status === 200) {
        // 카운트 증가 성공 시 파일 카운트 업데이트
        const updatedFile = { ...file, count: file.count + 1 }; // 카운트 증가 반영
        // 업데이트된 파일 정보를 파일 리스트에서 변경
        setFiles(prevFiles => prevFiles.map(f => (f.id === updatedFile.id ? updatedFile : f)));
        
        // 파일 다운로드
        const downloadLink = `http://localhost:8080/uploads/${file.filePath}`;
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {board ? (
        <div className="listbox">
          <h3 className="mt-5"><i className="ri-arrow-right-double-line"></i> {board.title}</h3> 
          
          <div className="mt-2 mb-5 pt-2 border-top text-right">
            <span className="mr-4"><label className="font-italic">hit:</label> {board.hit}</span>
            <span className="mr-4 font-weight-bold">{board.writer}</span>
            <span className="mr-2">
              {format(new Date(board.bbsCreatedTime), 'yyyy.MM.dd')}
            </span>
          </div>

          {/* 이미지가 있을 경우 보여주기 */}
          {images.length > 0 && (
            <div className="image-gallery mt-3">
              {images.map((image) => (
                <img
                  key={image.id}
                  src={`http://localhost:8080/uploads/${image.imageUrl}`}
                  alt="게시글 이미지"
                  style={{ maxWidth: '100%', height: 'auto', marginBottom: '10px' }}
                />
              ))}
            </div>
          )}

          {/* 파일이 있을 경우 파일 목록 표시 */}
          {files.length > 0 && (
            <div className="mt-2 pt-2 border-top file-box">
              <h4>첨부 파일:</h4>
              <ul>
                {files.map((file) => (
                  <li key={file.id}>
                    <a  href={`http://localhost:8080/uploads/${file.filePath}`}
                        onClick={(e) => {
                          e.preventDefault();  // 기본 링크 동작 방지 (자동 다운로드 방지)
                        handleFileDownload(file); // 파일 다운로드 함수 호출

                      }}>

                      <span>{file.fileName}</span></a> <span>({file.fileSize})</span>
                    
                    <span> | 다운로드 횟수: {file.count}</span>
                    <span> DATE:{format(new Date(file.uploadDate), 'yyyy.MM.dd')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-3">
            {board.content.split('\\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>

          <div className="my-5 pt-5 text-right">
            <a href="#" className="btn btn-primary mr-3">목록</a>
            <a href="#" className="btn btn-primary">답글쓰기</a>
            <a href="#" className="btn btn-primary">수정</a>
            <a href="#" id="delete" className="btn btn-danger">삭제</a>                       
          </div>
        </div>
      ) : (
        <p>게시글이 존재하지 않습니다.</p>
      )}
    </div>
  );
};

export default Content;
