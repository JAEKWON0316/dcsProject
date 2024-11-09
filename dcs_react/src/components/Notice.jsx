import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Img from '../images/sub_visual6.jpg';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';  // useParams 추가

const Notice = () => {
  const [boards, setBoards] = useState([]);  // 전체 게시판 데이터
  const [currentPage, setCurrentPage] = useState(0);  // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(0);  // 전체 페이지 수
  const [maxId, setMaxId] = useState(0);  // 현재까지 최대 id 값을 추적

  const itemsPerPage = 10; // 한 페이지에 보여줄 게시글 수
  const { role } = useParams();  // URL에서 role 파라미터를 받아옴
  // 전체 게시판 데이터를 가져오는 함수 (초기 로드용)
  const fetchBoards = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/board/role/${role}`);
         // id 기준 내림차순 정렬
         const sortedBoards = response.data
         .sort((a, b) => b.id - a.id)  // id 기준 내림차순 정렬
         .map((item, index) => ({
           ...item,
           displayNumber: response.data.length - index,  // 내림차순 번호 부여 (4, 3, 2, 1...)
         }));

     setBoards(sortedBoards);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage)); // 전체 페이지 수 계산
    } catch (error) {
      console.error('Failed to fetch boards: ', error.response ? error.response.data : error.message);
    }
  };

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);  // 현재 페이지 업데이트
  };

  // 보여줄 게시판 데이터 (현재 페이지에 해당하는 10개 게시글)
  const currentBoards = boards.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // 컴포넌트가 처음 렌더링될 때 전체 데이터 가져오기
  useEffect(() => {
    fetchBoards();  // 게시판 데이터 가져오기
  }, [role]); // role이 변경될 때마다 fetchBoards 호출

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
            {currentBoards.length > 0 ? (
              currentBoards.map((board) => (
                <tr key={board.id}>
                  <td>{board.displayNumber}</td>
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

        {/* 페이지네이션 */}
        <div className="pagination">
          {/* 첫 페이지 */}
          <a className="page-link" onClick={() => handlePageChange(0)} disabled={currentPage === 0}>first</a>

          {/* 이전 페이지 */}
          <a className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 0}>prev</a>

          {/* 페이지 번호 */}
          {Array.from({ length: totalPages }, (_, index) => (
            <a
              key={index}
              className={`page-link ${currentPage === index ? 'active' : ''}`}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </a>
          ))}

          {/* 다음 페이지 */}
          <a className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1}>next</a>

          {/* 마지막 페이지 */}
          <a className="page-link" onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1}>last</a>
        </div>
      </div>
    </div>
  );
};

export default Notice;
