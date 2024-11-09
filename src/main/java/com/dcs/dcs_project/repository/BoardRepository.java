package com.dcs.dcs_project.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.lang.NonNull;

import com.dcs.dcs_project.entity.BoardEntity;




public interface BoardRepository extends JpaRepository<BoardEntity, Long>{  //레포지토리에 entity이름(column 클래스) 과 key타입(id) 설정

    /* 조회수 증가 */
    @Modifying
    @Query(value = "update BoardEntity b set b.hit=b.hit+1 where b.id=:id")// update bboard set hits=hits+1 where id = ? 와 똑같다.  
    void updateHits(@Param("id") Long id);

    @NonNull List<BoardEntity> findAll(@NonNull Sort sort);
}
