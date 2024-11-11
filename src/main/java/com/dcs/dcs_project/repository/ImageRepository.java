package com.dcs.dcs_project.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dcs.dcs_project.entity.ImageEntity;
public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
   

    List<ImageEntity> findByDcsBoardId(Long dcsBoardId);
}
