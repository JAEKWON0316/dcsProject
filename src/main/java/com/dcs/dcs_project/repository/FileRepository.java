package com.dcs.dcs_project.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dcs.dcs_project.entity.FileEntity;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long>{


      List<FileEntity> findByDcsBoardId(Long dcsBoardId);


       /* 다운로드 증가 */
    @Modifying
    @Query("UPDATE FileEntity f SET f.count = f.count + 1 WHERE f.id = :id")// update bboard set hits=hits+1 where id = ? 와 똑같다.  
    void incrementCount(@Param("id") Long fileId);

   
}
