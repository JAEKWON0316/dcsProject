import React, { useEffect, useState } from 'react';
import axios from 'axios';
import proImg from '../images/pro.png';
import { useParams } from 'react-router-dom';
import { FcOpenedFolder } from 'react-icons/fc';

const Notice = () => {
  const [boards, setBoards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchType, setSearchType] = useState('title');
  const [filesExistence, setFilesExistence] = useState({});
  const [loadingBoards, setLoadingBoards] = useState(false);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 20;
  const { role } = useParams();

  useEffect(() => {
    fetchBoards();
  }, [role]);

  const fetchBoards = async () => {
    setLoading(true); // 로딩 시작

    // 로컬 스토리지에서 캐시된 데이터 가져오기
    const cacheKey = `boards_role_${role}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { boards, totalPosts, totalPages, filesExistence } = JSON.parse(cachedData);
      setBoards(boards);
      setTotalPosts(totalPosts);
      setTotalPages(totalPages);
      setFilesExistence(filesExistence);
      setLoading(false); // 로딩 끝
      return; // 캐시된 데이터가 있을 경우 API 호출을 건너뜁니다.
    }

    // 캐시된 데이터가 없을 경우 서버에서 최신 데이터 가져오기
    try {
      const response = await axios.get(
        `https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/board/role/${role}`,
        { withCredentials: true }
      );

      const sortedBoards = response.data
        .sort((a, b) => b.id - a.id)
        .map((item, index) => ({
          ...item,
          displayNumber: response.data.length - index,
        }));

      const fileStatus = await fetchFilesExistence(sortedBoards);

      setBoards(sortedBoards);
      setTotalPosts(response.data.length);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      setFilesExistence(fileStatus);

      // 서버에서 데이터를 받은 후 로컬 스토리지에 저장
      localStorage.setItem(
        cacheKey,
        JSON.stringify({
          boards: sortedBoards,
          totalPosts: response.data.length,
          totalPages: Math.ceil(response.data.length / itemsPerPage),
          filesExistence: fileStatus,
        })
      );
    } catch (error) {
      console.error('게시판 데이터를 불러오는 데 실패했습니다: ', error.response ? error.response.data : error.message);
      alert('게시판 데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false); // 로딩 끝
    }
  };

  const fetchFilesExistence = async (boards) => {
    try {
      const results = await Promise.all(
        boards.map((board) =>
          axios
            .get(`https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/files/board/${board.id}/hasFile`, {
              withCredentials: true,
            })
            .then((response) => ({ [board.id]: response.data }))
            .catch(() => ({ [board.id]: false }))
        )
      );
      return Object.assign({}, ...results);
    } catch (error) {
      console.error('Failed to fetch file existence: ', error);
      return {};
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchValue = e.target.searchvalue.value;

    setLoadingBoards(true);
    try {
      const response = await axios.get(
        `https://dcs-site-5dccc5b2f0e4.herokuapp.com/api/board/role/${role}/search`,
        {
          params: { searchType, searchValue },
          withCredentials: true,
        }
      );

      const boardsWithNumbers = response.data.map((board, index) => ({
        ...board,
        displayNumber: response.data.length - index,
      }));

      setBoards(boardsWithNumbers);
      setTotalPosts(response.data.length);
      setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      setCurrentPage(0);
      await fetchFilesExistence(response.data);
    } catch (error) {
      console.error('Failed to search:', error.response?.data || error.message);
      alert('검색 중 오류가 발생했습니다.');
    } finally {
      setLoadingBoards(false);
    }
  };

  const currentBoards = boards.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);


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
            <img
              src={role ? proImg : '../images/default_visual.jpg'}
              alt="Role Image"
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
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>글쓴이</th>
              <th>날짜</th>
              <th>조회수</th>
            </tr>
          </thead>
                  <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </td>
            </tr>
          ) : currentBoards.length > 0 ? (
            currentBoards.map((board) => (
              <tr key={board.id}>
                <td>{board.displayNumber}</td>
                <td>
                  <a href={`/board/${role}/${board.id}`}>{board.title}</a>
                  {filesExistence[board.id] && <span className='file_font'><FcOpenedFolder /></span>}
                </td>
                <td>{board.writer}</td>
                <td>{board.bbsCreatedTime}</td>
                <td>{board.hit}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                게시글이 없습니다.
              </td>
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
  );
};

export default Notice;
