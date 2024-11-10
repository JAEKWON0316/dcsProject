// src/components/Content.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Content = () => {
  // URL에서 role과 id 파라미터 가져오기
  const { role, id } = useParams();
  
  // 게시글 데이터와 상태 관리
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 요청으로 게시글 데이터 가져오기
  useEffect(() => {
    const fetchBoard = async () => {
      try {
        setLoading(true);
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

  // 로딩 중인 상태 처리
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {board ? (
        <div>
          <h1>{board.title}</h1>
          <p><strong>작성자:</strong> {board.writer}</p>
          <p><strong>작성일:</strong> {new Date(board.bbsCreatedTime).toLocaleDateString()}</p>
          <p><strong>조회수:</strong> {board.hit}</p>
          <hr />
          <p>{board.content}</p>
        </div>
      ) : (
        <p>게시글이 존재하지 않습니다.</p>
      )}
    </div>
  );
};

export default Content;
