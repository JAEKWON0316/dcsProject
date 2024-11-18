import React, { useEffect, useState } from 'react';
import axios from 'axios';
import proImg from '../images/pro.png';
import proImg2 from '../images/pro2.png';
import proImg3 from '../images/pro3.png';
import proImg4 from '../images/pro4.png';
import proImg5 from '../images/pro5.png';
import gallImag from '../images/gall.png';
import gallImag2 from '../images/gall2.png';
import notImg from '../images/not.png';
import notImg2 from '../images/not2.png';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';  
import { FcOpenedFolder } from "react-icons/fc";


const Notice = () => {
  const [boards, setBoards] = useState([]);  
  const [currentPage, setCurrentPage] = useState(0);  
  const [totalPages, setTotalPages] = useState(0);  
  const [totalPosts, setTotalPosts] = useState(0);  // 전체 게시글 수
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchType, setSearchType] = useState('title');
  const [filesExistence, setFilesExistence] = useState({});  // 파일 유무 상태 관리

  const itemsPerPage = 20; 
  const { role } = useParams();  

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  
  const fetchBoards = async () => {
    try {
      const response = await axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/board/role/${role}`);
      const sortedBoards = response.data
        .sort((a, b) => b.id - a.id) 
        .map((item, index) => ({
          ...item,
          displayNumber: response.data.length - index,  
        }));


      setBoards(sortedBoards);
      setTotalPosts(response.data.length);  // 전체 게시글 수 설정
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));      
      // 파일 유무 확인
      fetchFilesExistence(sortedBoards);
    } catch (error) {
      console.error('Failed to fetch boards: ', error.response ? error.response.data : error.message);
    }
  };

 // dcsBoardId를 이용해서 파일 유무를 확인
 const fetchFilesExistence = async (boards) => {
  const fileStatus = {};
  for (let board of boards) {
    try {
      const response = await axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/files/board/${board.id}/hasFile`);
      fileStatus[board.id] = response.data;  // 파일 유무 저장
    } catch (error) {
      fileStatus[board.id] = false;  // 오류가 나면 파일이 없다고 간주
    }
  }
  setFilesExistence(fileStatus);  // 파일 유무 상태 업데이트
};

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchType = document.getElementById("searchname").value;
    const searchValue = e.target.searchvalue.value;
  
    try {
      const response = await axios.get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/board/role/${role}/search`, {
        params: { searchType, searchValue },
      });

      const boardsWithNumbers = response.data.map((board, index) => ({
        ...board, 
        displayNumber: response.data.length - index, // 마지막 번호부터 역순으로 번호 매기기
      }));
      
      setBoards(boardsWithNumbers); 
      setTotalPosts(response.data.length); // 검색된 전체 게시글 수 업데이트
      setTotalPages(Math.ceil(response.data.length / itemsPerPage)); // 페이지 수 업데이트
      setCurrentPage(0); // 검색 후 첫 페이지로 이동
      fetchFilesExistence(response.data);  // 파일 유무 확인
      
    } catch (error) {
      console.error("Failed to search: ", error.response ? error.response.data : error.message);
    }
  };

  const currentBoards = boards.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  useEffect(() => {
    fetchBoards();  
  }, [role]); 

  return (
    <div className='container2'>
      <div className='main_wrap'>
      <div className='intro'>
        <div className='visual'>
          <strong className='title'>
            {role === '1' && '공지사항'}
            {role === '2' && 'Q & A'}
            {role === '3' && '활동사진'}
            {role === '4' && '언론보도'}
            {role === '5' && '미래전략포럼'}
            {role === '6' && 'AI혁신위원회'}
            {role === '7' && '글로벌 네트워킹'}
            {role === '8' && '지역 청년 네트워킹'}
            {role === '9' && 'ESG 청년 연합 봉사 활동'}
          </strong>
      <span className='img'>
      <img 
        src={
          role === '1' ? notImg : 
          role === '2' ? notImg2 : 
          role === '3' ? gallImag : 
          role === '4' ? gallImag2 : 
          role === '5' ? proImg : 
          role === '6' ? proImg2 : 
          role === '7' ? proImg3 : 
          role === '8' ? proImg4 : 
          role === '9' ? proImg5 : 
          '../images/default_visual.jpg' // 기본 이미지
        } 
      alt='' 
      />
        
      </span>
      </div>
      </div>
      <div className="listbox mt-5">
     <div className="total-pg-info">
          <p className='me-3'>전체 게시글 수: {totalPosts}</p>
          <p>총 페이지 수: {totalPages}</p>
        </div>
        <table className="table table-box">
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
                  <td>
                    <a href={`/board/${role}/${board.id}`}>{board.title}</a>
                    {filesExistence[board.id] && <span className='file_font'><FcOpenedFolder /></span>}
                  </td>
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
        
        <div className="pagination paging">
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
            
        <form name="searchform" id="searchform" className="searchform" method="get" onSubmit={handleSearch}>
          <div className="input-group my-3">
            <div className="input-group-prepend">
              <button 
                type="button" 
                className="btn btn-outline-secondary dropdown-toggle" 
                onClick={toggleDropdown}
              >
                {searchType === 'title' ? '제목검색' : searchType === 'writer' ? '이름검색' : '내용검색'}
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu show">
                  <a className="dropdown-item" onClick={() => { setSearchType('writer'); setDropdownOpen(false); }}>이름검색</a>
                  <a className="dropdown-item" onClick={() => { setSearchType('title'); setDropdownOpen(false); }}>제목검색</a>
                  <a className="dropdown-item" onClick={() => { setSearchType('content'); setDropdownOpen(false); }}>내용검색</a>
                </div>
              )}
            </div>
            <input type="hidden" name="searchname" id="searchname" value={searchType} />
            <input type="search" name="searchvalue" className="form-control" placeholder="검색" />
            <div className="input-group-append">
              <button className="btn btn-primary"><i className="ri-search-line"></i></button>
            </div>
          </div>
        </form>
      </div>
      </div>
      
    </div>
  );
};

export default Notice;
