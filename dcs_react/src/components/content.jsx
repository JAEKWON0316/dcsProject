import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const Content = () => {
  const { role, id } = useParams();
  
  const [board, setBoard] = useState(null);
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
          viewedBoards[id] = currentTime; // 현재 시간을 로컬 스토리지에 저장
          localStorage.setItem('viewedBoards', JSON.stringify(viewedBoards));
        }
        
        // 게시글 데이터 가져오기
        const response = await axios.get(`http://localhost:8080/api/board/role/${role}/${id}`);
        setBoard(response.data);
      } catch (err) {
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchBoard();
  }, [role, id]);

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

          <div className="mt-2 pt-2 border-top file-box">
            <span>
              <label className="font-italic">file :</label>
              <a href="#">asdf.gif</a> <a href="#">afdfd.asdf</a>
            </span>
          </div>

          <div className="mt-3">
          {board.content.split('\\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
        {console.log(board.content)}


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
