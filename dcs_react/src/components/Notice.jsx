import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Img from '../images/sub_visual6.jpg';
import { format } from 'date-fns';

const Notice = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // 데이터를 호출하는 함수 정의
    const fetchBoards = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/board/'); // 데이터 호출 경로 설정
        setBoards(response.data); // 데이터 상태에 저장
      } catch (error) {
        console.error('Failed to fetch boards:', error);
      }
    };

    fetchBoards(); // 컴포넌트 마운트 시 데이터 호출
  }, []);

  return (
    <div className='board'>
      <div className='main_wrap'>
        <div className='visual'>
          <span className='img'>
            <img src={Img} alt='' />
          </span>
        </div>

        {/* 게시판 시작 */}
        <table className="table table-striped">
          <colgroup>
            <col width="8%" />
            <col width="62%"/>
            <col width="10%" />
            <col width="10%" />
            <col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">글쓴이</th>
              <th scope="col">날짜</th>
              <th scope="col">조회수</th>
            </tr>
          </thead>
          <tbody>
            {boards.length > 0 ? (
              boards.map((board) => (
                <tr key={board.id}>
                  <td>{board.id}</td>
                  <td><a href={`/board/${board.id}`}>{board.title}</a></td>
                  <td>{board.writer}</td>
                  <td>{format(new Date(board.bbsCreatedTime), 'yyyy.MM.dd')}</td>
                  <td>{board.hit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No boards available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notice;
