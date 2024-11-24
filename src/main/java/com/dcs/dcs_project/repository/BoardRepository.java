package com.dcs.dcs_project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import com.dcs.dcs_project.entity.BoardEntity;




public interface BoardRepository extends JpaRepository<BoardEntity, Long>{  //레포지토리에 entity이름(column 클래스) 과 key타입(id) 설정
    
     // role을 기준으로 게시글 리스트 반환
     List<BoardEntity> findByRole(int role, Sort sort);
     
     //id, role로 content 뽑기
     Optional<BoardEntity> findByRoleAndId(int role, Long id); // role과 id로 조회
   
    /* 조회수 증가 */
    @Modifying
    @Query(value = "update BoardEntity b set b.hit=b.hit+1 where b.id=:id")// update bboard set hits=hits+1 where id = ? 와 똑같다.  
    void updateHits(@Param("id") Long id);

    @NonNull List<BoardEntity> findAll(@NonNull Sort sort);

    /* btn 네비게이션 */
    Optional<BoardEntity> findFirstByRoleAndIdLessThanOrderByIdDesc(int role, Long id);
    Optional<BoardEntity> findFirstByRoleAndIdGreaterThanOrderByIdAsc(int role, Long id);

    /*검색 기능추가 */
     
    List<BoardEntity> findByRoleAndTitleContaining(int role, String title );

      
    List<BoardEntity> findByRoleAndWriterContaining(int role, String writer);
   
     
    List<BoardEntity> findByRoleAndContentContaining(int role, String content);
}
