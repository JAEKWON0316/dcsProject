import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Img from '../images/sub_visual6.jpg';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';  

const Notice = () => {
  const [boards, setBoards] = useState([]);  
  const [currentPage, setCurrentPage] = useState(0);  
  const [totalPages, setTotalPages] = useState(0);  
  const [maxId, setMaxId] = useState(0); 

  const itemsPerPage = 10; 
  const { role } = useParams();  
  const fetchBoards = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/board/role/${role}`);
         const sortedBoards = response.data
         .sort((a, b) => b.id - a.id) 
         .map((item, index) => ({
           ...item,
           displayNumber: response.data.length - index,  
         }));

     setBoards(sortedBoards);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage)); 
    } catch (error) {
      console.error('Failed to fetch boards: ', error.response ? error.response.data : error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentBoards = boards.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  useEffect(() => {
    fetchBoards();  
  }, [role]); 

  return (
    <div class="listbox">
    <div className='board'>
      <div className='main_wrap'>
        <div className='visual'>
          <span className='img'>
            <img src={Img} alt='' />
          </span>
        </div>

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
                  <td><a href={`/board/${role}/${board.id}`}>{board.title}</a></td>
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
        
        <div className="pagination">
          <a className="page-link" onClick={() => handlePageChange(0)} disabled={currentPage === 0}>first</a>
          <a className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 0}>prev</a>

          {Array.from({ length: totalPages }, (_, index) => (
            <a
              key={index}
              className={`page-link ${currentPage === index ? 'active' : ''}`}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </a>
          ))}
          <a className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1}>next</a>
          <a className="page-link" onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1}>last</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Notice;
