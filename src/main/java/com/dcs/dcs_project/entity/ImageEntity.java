package com.dcs.dcs_project.entity;

import com.dcs.dcs_project.dto.ImageDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name="images")
public class ImageEntity {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dcs_board_id")
    private Long dcsBoardId;

    @Column
    private String imageUrl;


     public static ImageEntity toImageEntity(ImageDto iDto){
        
        ImageEntity iEntity = new ImageEntity();

        iEntity.setId(iDto.getId());
        iEntity.setDcsBoardId(iDto.getDcsBoardId());
        iEntity.setImageUrl(iDto.getImageUrl());


        
        return iEntity;
    }
}
